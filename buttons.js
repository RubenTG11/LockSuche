

var coll = document.getElementsByClassName("drumsbutton");

for (let i = 0; i < coll.length; i++) {
    const element = coll[i];

    console.log(element.getAttribute("to-open"))

    element.addEventListener("click", function() {
        this.classList.toggle("active");
        var content = document.getElementById(element.getAttribute('to-open'));
        if (content.style.display === "block") {
          content.style.display = "none";
          document.getElementById("plus-"+element.getAttribute('to-open')).innerHTML = "&#10133";
        } else {
          content.style.display = "block";
          document.getElementById("plus-"+element.getAttribute('to-open')).innerHTML = "&#10134";
        } 
      });
    
}
  

  var coll2 = document.getElementsByClassName("piperbutton");

  for (let i = 0; i < coll2.length; i++) {
    const element = coll2[i];

    element.addEventListener("click", function() {
        this.classList.toggle("active");
        var content = document.getElementById(element.getAttribute('to-open'));
        if (content.style.display === "block") {
          content.style.display = "none";
          document.getElementById("plus2-"+element.getAttribute('to-open')).innerHTML = "&#10133";
        } else {
          content.style.display = "block";
          document.getElementById("plus2-"+element.getAttribute('to-open')).innerHTML = "&#10134";
        }
      });
    
  }



  var coll3 = document.getElementsByClassName("audioelement");

  for (let i = 0; i < coll3.length; i++) {
    const element = coll3[i];
    
    element.addEventListener("click", function() {
        this.classList.toggle("active");
        var content = document.getElementById(element.getAttribute('to-open'));
        if (content.style.display === "block") {
          content.style.display = "none";
          document.getElementById("plus3-"+element.getAttribute('to-open')).innerHTML = "&#10133";
        } else {
          content.style.display = "block";
          document.getElementById("plus3-"+element.getAttribute('to-open')).innerHTML = "&#10134";
        }
      });
  }

