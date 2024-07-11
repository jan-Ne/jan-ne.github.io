// Load Light/Dark Mode
$(document).ready(function() {
  var prefersLightScheme = window.matchMedia("(prefers-color-scheme: light)");
  var prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  if (prefersLightScheme.matches) {
    document.getElementById("modeBtn").innerHTML = "pimeja";
    if (localStorage.getItem("mode") == "dark") {
      document.body.classList.toggle("dark-mode", true);
      document.getElementById("modeBtn").innerHTML = "walo";
    }
    if (localStorage.getItem("mode") == "light") {
      document.body.classList.toggle("dark-mode", false);
      document.getElementById("modeBtn").innerHTML = "pimeja";
    }
  }
  if (prefersDarkScheme.matches) {
    document.getElementById("modeBtn").innerHTML = "walo";
    if (localStorage.getItem("mode") == "light") {
      document.body.classList.toggle("light-mode", true);
      document.getElementById("modeBtn").innerHTML = "pimeja";
    }
    if (localStorage.getItem("mode") == "dark") {
      document.body.classList.toggle("light-mode", false);
      document.getElementById("modeBtn").innerHTML = "walo";
    }
  }
});
