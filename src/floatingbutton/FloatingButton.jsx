import React, { useState, useEffect } from 'react';
import './FloatingButton.css';
import { State, City } from 'country-state-city';

const FloatingButton = () => {
  const apiurl = import.meta.env.VITE_API_URL;

  const [visible, setVisible] = useState(false);
  const [manualLocationMode, setManualLocationMode] = useState(true);

  const [formData, setFormData] = useState({
    name: '', dob: '', mobile: '', email: '',
    insurance_type: '', city: '', state: '', pincode: '', consent_share: false
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

const quotes = [
  "Insurance starts from 599/-",
];
const [quoteIndex, setQuoteIndex] = useState(0);

// useEffect(() => {
//   const interval = setInterval(() => {
//     setQuoteIndex(prev => (prev + 1) % quotes.length);
//   }, 4000); // Change every 4 seconds
//   return () => clearInterval(interval);
// }, []);

  useEffect(() => {
    const indianStates = State.getStatesOfCountry('IN');
    setStates(indianStates);
  }, []);
  useEffect(() => {
    if (formData.pincode.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${formData.pincode}`)
        .then(res => res.json())
        .then(data => {
          const info = data[0]?.PostOffice?.[0];
          if (info) {
            setFormData(prev => ({
              ...prev,
              state: info.State,
              city: info.District
            }));
            setManualLocationMode(false);
          } else {
            setManualLocationMode(true);
          }
        })
        .catch(() => setManualLocationMode(true));
    } else {
      setManualLocationMode(true);
    }
  }, [formData.pincode]);


  useEffect(() => {
    const selectedState = states.find(s => s.name === formData.state);
    if (selectedState) {
      const stateCities = City.getCitiesOfState('IN', selectedState.isoCode);
      setCities(stateCities);
    } else {
      setCities([]);
    }
  }, [formData.state, states]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validate = () => {
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      alert('Please enter a valid 10-digit mobile number.');
      return false;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert('Please enter a valid email address.');
      return false;
    }
    const dobDate = new Date(formData.dob);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dobDate >= today) {
      alert('Date of Birth must be in the past.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch(`${apiurl}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, consent_share: true })
      });

      const result = await res.json();
      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setFormData({
            name: '', dob: '', mobile: '', email: '',
            insurance_type: '', city: '', state: '', consent_share: false
          });
          setVisible(false);
        }, 1500);
      } else {
        alert('Error: ' + (result.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Network error: Could not connect to the server.');
      console.error(err);
    }
  };

  return (
    <>
    <div id="floating-button" onClick={() => setVisible(!visible)}>
  <span className="button-icon">📄</span>
  <div className="button-text">
    <div className="quote-text">{quotes[quoteIndex]}</div>
    {/* <div className="action-text">Insurance</div> */}
  </div>
</div>
      {visible && (
        <div id="form-popup">
          <span id="close-popup" onClick={() => setVisible(false)}>✖</span>
          <h3>Insurance Lead Form</h3>
          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <label>Date of Birth</label>
            <input name="dob" placeholder="Date of Birth" type="date" value={formData.dob} onChange={handleChange} required />
            <input name="mobile" placeholder='Mobile Number' value={formData.mobile} onChange={handleChange} maxLength={10} required />
            <input name="email" placeholder='Email' type="email" value={formData.email} onChange={handleChange} />

            <label>Insurance Type</label>
            <select name="insurance_type" value={formData.insurance_type} onChange={handleChange}>
              <option value="">Select Insurance Type</option>
              <option>Health</option>
              <option>Life</option>
              <option>Critical Illness</option>
            </select>
            <input
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              maxLength={6}
              required
            />


            <label>State</label>
            <input
              name="state"
              value={formData.state}
              readOnly
            />
            <label>City</label>
            <select name="city" value={formData.city} onChange={handleChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city.name} value={city.name}>{city.name}</option>
              ))}
            </select>



            <label className="consent-label">
              <input type="checkbox" name="consent_share" checked={formData.consent_share} onChange={handleChange} required />
              I consent to share my data
            </label>

            <button type="submit">Submit</button>
          </form>

          {showSuccess && (
            <div className="success-animation">
              <div className="checkmark">✔</div>
              <p>Submitted Successfully!</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FloatingButton;
