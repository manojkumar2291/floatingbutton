(function () {
  const mountPoint = document.createElement('div');
  mountPoint.id = 'floating-button-root';
  document.body.appendChild(mountPoint);

  const script = document.createElement('script');
  script.src = 'https://floatingbutton-od31.vercel.app/assets/index-DWWN5cal.js'; // use actual hashed filename
  script.type = 'module';
  document.body.appendChild(script);

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://floatingbutton-od31.vercel.app/assets/index-BSKJhFR0.css'; // use actual hashed CSS
  document.head.appendChild(link);
})();
