(function () {
  const mountPoint = document.createElement('div');
  mountPoint.id = 'floating-button-root';
  document.body.appendChild(mountPoint);

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://floatingbutton-od31.vercel.app/assets/index-BSKJhFR0.css'; // full path to your CSS
  document.head.appendChild(link);

  const script = document.createElement('script');
  script.src = 'https://floatingbutton-od31.vercel.app/assets/index-D3S9AK0d.js'; // full path to your JS
  script.type = 'module';
  document.body.appendChild(script);
})();
