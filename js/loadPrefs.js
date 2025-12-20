// Load light/dark mode
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

// Load writing script
$(document).ready(function() {
  const script = localStorage.getItem("script");
  if (script == "tok-Zzzz") {
    $("[lang='tok-Latn'].alt").css("display", "none");
    $("[lang='tok-Zzzz'].alt").css("display", "contents");
    
    $(".sptoggle [lang='tok-Latn'].alt").css("display", "contents");
    $(".sptoggle [lang='tok-Zzzz'].alt").css("display", "none");

    localStorage.setItem("script", "tok-Zzzz");
    $('html').attr('lang', 'tok-Zzzz');
  } else {
    $("[lang='tok-Zzzz'].alt").css("display", "none");
    $("[lang='tok-Latn'].alt").css("display", "contents");

    $(".sptoggle [lang='tok-Latn'].alt").css("display", "none");
    $(".sptoggle [lang='tok-Zzzz'].alt").css("display", "contents");

    localStorage.setItem("script", "tok-Latn");
    $('html').attr('lang', 'tok-Latn');
  }
});
