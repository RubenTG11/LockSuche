const delay = ms => new Promise(res => setTimeout(res, ms));

document.querySelector('.searchTerm').value = "";
let search = document.querySelector('.searchTerm').value;


addEventListener("input", (event) => {
  search = document.querySelector('.searchTerm').value;

  updateTable();
});



fillTable();

async function updateTable() {
  var elements = document.getElementsByClassName("card");

  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    var parent = element.children[1].children[0].children[0];

    var title = parent.children[0].textContent.toLowerCase();
    var year = parent.children[1].textContent;
    var group = parent.children[2].textContent.toLowerCase();

    if (title.includes(search.toLowerCase()) || group == search.toLowerCase() || (isInt(search) && parseInt(search) == parseInt(year.substring(0, search.length)))) {
      if (element.classList.contains("card-hide")) {
        element.classList.remove("card-hide");

      }
    } else {
      if (!element.classList.contains("card-hide")) {
        element.classList.toggle("card-hide");
        console.log(title);
      }
    }


  }

}





async function fillTable() {


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
            var logoLink = "";
            var piper = (data[i].Pferferstimme == null || data[i].Pferferstimme == "") ? null : data[i].Pferferstimme;
            var drums = (data[i].Trommlerstimme == null || data[i].Trommlerstimme == "") ? null : data[i].Trommlerstimme;
            var audioLink = (data[i].audioLink == null || data[i].audioLink == "") ? null : data[i].audioLink
            var link = (data[i].Link == null || data[i].Link == "") ? "https://rubentg11.github.io/LockSuche" : data[i].Link;

            if (data[i].imgLink == "") {
              logoLink = "./img/Logo_dummy.jpg";
            } else if (group == "FSG") {
              logoLink = "./img/Logo_FSG.jpg";
            } else if (group == "Turmfalken") {
              logoLink = "./img/Logo_Tufas.jpg";
            } else {
              logoLink = "./img/Logo_" + year + ".jpg";
            }

            toInsert2 += lockCard(finalTitel, year, group, type, logoLink, typeColor, groupColor, "rgb(122, 121, 121, 0.5)", piper, drums, audioLink, link);
          }



        }




      }

      document.getElementById('newArea').innerHTML = toInsert2;


      document.querySelector(".newArea").addEventListener("click", (e) => {

        var element = e.target;

        if (element.nodeName == "BUTTON" || element.id.includes("plus")) {


          var content = document.getElementById(element.getAttribute('to-open'));
          var button = content == null ? element : element.firstChild;

          content = content == null ? document.getElementById(element.parentElement.getAttribute('to-open')) : content;

          if (content.style.display === "block") {
            content.style.display = "none";
            button.innerHTML = "&#10133";
          } else {
            content.style.display = "block";
            button.innerHTML = "&#10134";
          }
        }
      });










    })
    .catch(function (error) {
      console.error(error);
    });

  await delay(2000);
  document.querySelector('.loadingImg').classList.toggle("card-hide");
  document.querySelector('.wrapper').classList.remove("card-hide");



}

function isInt(n) {
  return /^[+-]?\d+$/.test(n);
}

function lockCard(title, year, group, type, logoLink, typecolor, groupcolor, yearcolor, piper, drums, audioLink, link) {
  var lockCard = "";

  link = (link == null || link == "") ? "rubentg11.github.io/LockSuche" : link;


  lockCard += `<div class="card">
        <div class="avatar">
        <img class="avatarimg" src="`+ logoLink + `" loading="lazy" alt="oh no">
        </div>
        <div class="cardcontent" id="cardcontent">
            <div class="title">
                <p>
                        <a class="titletext" href="`+ link + `">` + title + `</a> 
                        <a class="jahrgang" style="background-color: ` + yearcolor + `;">` + year + `</a>
                        <a class="group" style="background-color: ` + groupcolor + `;">` + group + `</a>
                        <a class="type" style="background-color: ` + typecolor + `;">` + type + `</a>
                </p>
            </div>`

  var openclass = title.replaceAll(" ", "").replaceAll(".", "").replaceAll(",", "").replaceAll("-", "").replaceAll("–", "");

  if (drums != null) {

    lockCard += `<div class="drums">

                  <p class="drumstitle">
                      <button type="button" class="collapsible drumsbutton" to-open="drum-`+ openclass + `" id="drumsbutton"><a id="plus-drum-` + openclass + `">&#10133</a> Trommeln</button>
                  </p>

                  <p class="drumstext" id="drum-`+ openclass + `">
                  `+ drums + `
                  </p>
              </div>`
  }

  if (piper != null) {
    lockCard += `<div class="piper">
                  <p class="pipertitle" id="pipertitle"><button type="button" class="collapsible2 piperbutton" id="piperbutton" to-open="piper-`+ openclass + `"><a id="plus2-piper-` + openclass + `">&#10133</a> Pfeifen</button></p>
                  <p id="piper-`+ openclass + `" class="pipertext">
                  `+ piper + `
                  </p>
              </div>`
  }

  if (audioLink != null) {
    lockCard += `<div class="audio">
                <p class="audioTitle">
                    <button type="button" class="collapsible3 audiobutton" id="audiobutton" to-open="audio-`+ openclass + `"><a id="plus3-audio-` + openclass + `">&#10133</a> Audio</button>
                </p>
                <audio id="audio-`+ openclass + `" class="audioelement" controls="controls" preload="none" data-preload="metadata"><source src="` + audioLink + `" type="audio/mpeg"><span style="color: red;">Dein Browser unterstützt das Audio-Element leider nicht.</span></audio>
            </div>`
  }
  lockCard += `</div> </div>`

  return lockCard;
} 
