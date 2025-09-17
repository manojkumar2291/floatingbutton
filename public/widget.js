// public/widget.js
(function () {
  const mountPoint = document.createElement('div');
  document.body.appendChild(mountPoint);

  const script = document.createElement('script');
  script.src = 'https://floatingbutton-od31.vercel.app/static/js/main.js'; // adjust path if needed
  script.onload = () => {
    // React will mount itself here
  };
  document.body.appendChild(script);
})();
