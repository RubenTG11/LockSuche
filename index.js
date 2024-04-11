let search = document.querySelector('.searchTerm').value;


addEventListener("input", (event) => {
  search = document.querySelector('.searchTerm').value;

  fillTable();
});

fillTable();



function fillTable() {

  document.getElementById("container").classList.toggle("loading");
  fetch("./data.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      var toInsert = "";

      var toInsert2 = "";

      for (var i = 0; i < data.length; i++) {

        if (!data[i].hasOwnProperty("Titel") || data[i].Titel == "") {
        } else {


          var titel = data[i].Titel.toLowerCase();
          var titelTable = data[i].Titel;


          if (data[i].Typ == "Locks" && (titelTable.charAt(1) == "." || titelTable.charAt(2) == ".")) {
            titelTable = titelTable.substring(3, titel.length)
          }

          var typeColor = 'rgba(255, 255, 4, 0.5)';

          if (data[i].Typ != "Lock") {
            typeColor = 'rgba(255, 119, 0, 0.5)';
          }

          var groupColor;

          if (data[i].Trommlergruppe == "Landsknechte") {
            groupColor = 'rgba(0, 0, 241, 0.5)';
          } else if (data[i].Trommlergruppe == "Turmfalken") {
            groupColor = 'rgba(186, 49, 179, 0.5)';
          } else {
            groupColor = 'rgba(71, 26, 26, 0.5)';
          }

          if (titel.includes(search.toLowerCase()) || data[i].Trommlergruppe.toLowerCase() == search.toLowerCase() || (isInt(search) && parseInt(search) == parseInt(data[i].Jahrgang.toString().substring(0, search.length)))) {

        
            var finalTitel = titelTable;
            var year = data[i].Jahrgang;
            var group = data[i].Trommlergruppe;
            var type = (data[i].Typ == "Locks" ? "Lock" : data[i].Typ);
            var logoLink = (data[i].imgLink == null || data[i].imgLink == "") ? null : data[i].imgLink;
            var piper = (data[i].Pferferstimme == null || data[i].Pferferstimme == "")  ? null : data[i].Pferferstimme;
            var drums = (data[i].Trommlerstimme == null || data[i].Trommlerstimme == "") ? null : data[i].Trommlerstimme;
            var audioLink = (data[i].audioLink == null || data[i].audioLink == "") ? null : data[i].audioLink
            var link = (data[i].Link == null || data[i].Link == "") ? "https://rubentg11.github.io/LockSuche" : data[i].Link;
           
            toInsert2 += lockCard(finalTitel, year, group, type, typeColor, groupColor, "rgb(122, 121, 121, 0.5)", logoLink, piper, drums, audioLink, link);
          }


          
        }

        
  
        
      }

      document.getElementById('newArea').innerHTML = toInsert2;

      

var coll = document.getElementsByClassName("drumsbutton");

for (let i = 0; i < coll.length; i++) {
    const element = coll[i];

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



  var coll3 = document.getElementsByClassName("audiobutton");

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

    

      



    })
    .catch(function (error) {
      console.error(error);
    });

    document.getElementById("container").classList.remove("loading");

    
  

}

function isInt(n) {
  return /^[+-]?\d+$/.test(n);
}

function lockCard(title, year, group, type, typecolor, groupcolor, yearcolor, logoLink, piper, drums, audioLink, link){
  var lockCard = "";

  if(logoLink == null){
    logoLink = "https://landsknechte.org/wp-content/uploads/2021/03/LKV_LOGO_test_black.png";
  }

  lockCard += `<div class="card">
        <div class="avatar">
        <img class="avatarimg" src="`+logoLink+`" loading="lazy" alt="oh no">
        </div>
        <div class="cardcontent" id="cardcontent">
            <div class="title">
                <p>
                        <a class="titletext" href="`+link+`">`+title+`</a> 
                        <a class="jahrgang" style="background-color: ` + yearcolor + `;">`+year+`</a>
                        <a class="group" style="background-color: ` + groupcolor + `;">`+group+`</a>
                        <a class="type" style="background-color: ` + typecolor + `;">`+type+`</a>
                </p>
            </div>`

            var openclass = title.replaceAll(" ", "").replaceAll(".", "").replaceAll(",", "").replaceAll("-", "").replaceAll("–","");

            if(drums != null) {
              
              lockCard += `<div class="drums">

                  <p class="drumstitle">
                      <button type="button" class="collapsible drumsbutton" to-open="drum-`+openclass+`" id="drumsbutton"><a id="plus-drum-`+openclass+`">&#10133</a> Trommeln</button>
                  </p>

                  <p class="drumstext" id="drum-`+openclass+`">
                  `+drums+`
                  </p>
              </div>`
            }

            if(piper != null) {
              lockCard += `<div class="piper">
                  <p class="pipertitle" id="pipertitle"><button type="button" class="collapsible2 piperbutton" id="piperbutton" to-open="piper-`+openclass+`"><a id="plus2-piper-`+openclass+`">&#10133</a> Pfeifen</button></p>
                  <p id="piper-`+openclass+`" class="pipertext">
                  `+piper+`
                  </p>
              </div>`
            }

            if(audioLink != null) {
            lockCard += `<div class="audio">
                <p class="audioTitle">
                    <button type="button" class="collapsible3 audiobutton" id="audiobutton" to-open="audio-`+openclass+`"><a id="plus3-audio-`+openclass+`">&#10133</a> Audio</button>
                </p>
                <audio id="audio-`+openclass+`" class="audioelement" controls="controls" preload="none" data-preload="metadata"><source src="`+audioLink+`" type="audio/mpeg"><span style="color: red;">Dein Browser unterstützt das Audio-Element leider nicht.</span></audio>
            </div>`
            }
        lockCard += `</div> </div>`

  return lockCard;
} 
