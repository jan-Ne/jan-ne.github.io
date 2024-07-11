// Open Menu
function menuClick() {
  if (window.innerWidth <= 593) {
    $(".smalldropdown").toggle(30);
  }
  $(".bigdropdown").toggle(30);
}

// Toggle Color Scheme
function modeToggle() {
  var prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-mode");
    if (localStorage.getItem("mode") == "light") {
      localStorage.setItem("mode", "dark");
    } else {
      localStorage.setItem("mode", "light");
    }
  } else {
    document.body.classList.toggle("dark-mode");
    if (localStorage.getItem("mode") == "dark") {
      localStorage.setItem("mode", "light");
    } else {
      localStorage.setItem("mode", "dark");
    }
  }
  if (document.getElementById("modeBtn").innerHTML == "pimeja") {
    document.getElementById("modeBtn").innerHTML = "walo";
  } else {
    document.getElementById("modeBtn").innerHTML = "pimeja";
  }
}

// Toggle sitelen pona
function sitelenpona() {
    $("[lang='tok-Zzzz']").each(function() {
      if ($(this).css("display") == "none"){
        $(this).css("display", "contents");
      } else {
        $(this).css("display", "none");
      }
    });
    $("[lang='tok-Latn']").each(function() {
      if ($(this).css("display") == "none"){
        $(this).css("display", "contents");
      } else {
        $(this).css("display", "none");
      }
    });
    if (localStorage.getItem("script") != "tok-Zzzz") {
      localStorage.setItem("script", "tok-Zzzz");
      $('html').attr('lang', 'tok-Zzzz');
    } else {
      localStorage.setItem("script", "tok-Latn");
      $('html').attr('lang', 'tok-Latn');
    }
  }
