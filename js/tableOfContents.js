// ToC Button Click
  function tocClick() {
    $(".toc").toggle();
  }
  
// ToC Generation
  var ToC = 
    "<div class='toc'>" +
      "<ul style='padding: 0px 20px;'>";
  var newLine, el, title, link;
  
  $("main h1, main h2").each(function() {
    title = $(this).text();
    latn_title = $(this).children("span[lang='tok-Latn']").text();
    sp_title = $(this).children("span[lang='tok-Zzzz']").text()
    link = "#" + $(this).attr("id");
    
    if (!$(this).is(".toc-ignore")){
      if ($(this).is("h1")) {
        if ($(this).children("span[lang='tok-Latn']").length != 0 && $(this).children("span[lang='tok-Zzzz']").length != 0){
          newLine =
            "<li style='font-size: larger;'><a href='" + link + "'><span lang='tok-Latn' class='alt'>" + latn_title + "</span><span lang='tok-Zzzz' class='alt'>" + sp_title + "</span></a></li>";
          ToC += newLine;
        } else {    
          newLine =
            "<li style='font-size: larger;'><a href='" + link + "'>" + title + "</a></li>";
          ToC += newLine;
        }
      }
      if ($(this).is("h2")) {
        if ($(this).children("span[lang='tok-Latn']").length != 0 && $(this).children("span[lang='tok-Zzzz']").length != 0){
          newLine =
              "<li><a href='" + link + "'><span lang='tok-Latn' class='alt'>" + latn_title + "</span><span lang='tok-Zzzz' class='alt'>" + sp_title + "</span></a></li>"
          ToC += newLine;
        } else {
          newLine =
              "<li><a href='" + link + "'>" + title + "</a></li>"
          ToC += newLine;
        }
      }
    }
  });
  
  ToC += "</ul>" + "</div>";

  $(".bar").append(ToC);
