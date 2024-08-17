const delay = ms => new Promise(res => setTimeout(res, ms));

document.querySelector('.searchTerm').value = "";
let search = document.querySelector('.searchTerm').value;
let filter = "all";

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

    if(filter == "all") {
    if (title.includes(search.toLowerCase()) || group == search.toLowerCase() || (isInt(search) && parseInt(search) == parseInt(year.substring(0, search.length)))) {
      if (element.classList.contains("card-hide")) {
        element.classList.remove("card-hide");

      }
    } else {
      if (!element.classList.contains("card-hide")) {
        element.classList.toggle("card-hide");
      }
    }
  } else {
    var likedList = getCookie("likedLocks") == "" ? [] : getCookie("likedLocks").split(",");
    var searchClass = search.replaceAll(" ", "").replaceAll(".", "").replaceAll(",", "").replaceAll("-", "").replaceAll("–", "");

    var likedString = likedList.toString().toLowerCase();
    var includes = likedList.some((x) => {return x.toLowerCase()===element.getAttribute("card-data").toLowerCase();});

    if (likedString.includes(searchClass.toLowerCase()) && includes && (title.includes(search.toLowerCase()) || group == search.toLowerCase() || (isInt(search) && parseInt(search) == parseInt(year.substring(0, search.length))))) {
      if (element.classList.contains("card-hide")) {
        element.classList.remove("card-hide");

      }
    } else {
      if (!element.classList.contains("card-hide")) {
        element.classList.toggle("card-hide");
      }
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

            var openclass = finalTitel.replaceAll(" ", "").replaceAll(".", "").replaceAll(",", "").replaceAll("-", "").replaceAll("–", "");
            var likedList = getCookie("likedLocks") == "" ? [] : JSON.parse(getCookie("likedLocks"));
            var liked = likedList.includes(openclass);

            toInsert2 += lockCard(finalTitel, year, group, type, logoLink, typeColor, groupColor, "rgb(122, 121, 121, 0.5)", piper, drums, audioLink, link, liked);
          }



        }




      }

      document.getElementById('newArea').innerHTML = toInsert2;


      document.querySelector(".newArea").addEventListener("click", (e) => {

        var element = e.target;

        if (element.getAttribute('to-open') != null || element.id.includes("plus")) {


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
        if (element.getAttribute('button-title') != null || element.parentElement.getAttribute("button-title") != null) {
          element = element.parentElement.getAttribute("button-title") != null ? element.parentElement : element;
          var cardContent = document.getElementById(element.getAttribute('button-title'));
          var likedList = getCookie("likedLocks") == "" ? [] : getCookie("likedLocks").split(",");
          if(likedList.includes(element.getAttribute('button-title').replaceAll("card-", ""))){
            likedList = likedList.filter((liked) => liked !== element.getAttribute('button-title').replaceAll("card-", ""));
            element.firstChild.setAttribute("fill", "rgba(114, 113, 113, 1)");
          }else{
            likedList.push(element.getAttribute('button-title').replaceAll("card-", ""));
            element.firstChild.setAttribute("fill", "rgba(255, 215, 0, 1)");

          }
          console.log(likedList.toString());
          setCookie("likedLocks", likedList.toString(), 100);
          cardContent.classList.toggle("cardcontent-liked");
          element.classList.toggle("thumbs-up-button-liked");
          updateTable();
          console.log(new Date());
        }
      });

      document.querySelector(".filter-all").addEventListener("click", (e) => {
        var element = e.target;
        if(!element.classList.contains("filter-active")){
          element.classList.toggle("filter-active");
            document.getElementById("filter-favourites").classList.remove("filter-active")
          
        }

        filter="all";
        search="";
        document.querySelector('.searchTerm').value ="";
        updateTable();
      });
      document.querySelector(".filter-favourites").addEventListener("click", (e) => {
        var element = e.target;
          element.classList.toggle("filter-active");
          document.getElementById("filter-all").classList.toggle("filter-active")
        
          filter=element.classList.contains("filter-active") ? "fav" : "all";
          search="";
          document.querySelector('.searchTerm').value ="";
        updateTable();
      });

      document.querySelector(".newArea").addEventListener("mouseover", (e) => {
        var element = e.target;
        if(element.classList.contains("path")){
          if(element.parentElement.classList.contains("thumbs-up-button-liked")){
            element.setAttribute("fill", "rgba(114, 113, 113, .6)");
          }else{
            element.setAttribute("fill", "rgba(255, 215, 0, .6)");

          }
        }
      });

      document.querySelector(".newArea").addEventListener("mouseout", (e) => {
        var element = e.target;
        if(element.classList.contains("path")){
          if(element.parentElement.classList.contains("thumbs-up-button-liked")){
            element.setAttribute("fill", "rgba(255, 215, 0, 1)");

          }else{
            element.setAttribute("fill", "rgba(114, 113, 113, 1)");

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
  updateTable();



}

function isInt(n) {
  return /^[+-]?\d+$/.test(n);
}

function lockCard(title, year, group, type, logoLink, typecolor, groupcolor, yearcolor, piper, drums, audioLink, link, liked) {
  var lockCard = "";

  link = (link == null || link == "") ? "rubentg11.github.io/LockSuche" : link;


  var buttonclass = liked ? "thumbs-up-button-liked" : "thumbs-up-button";
  var openclass = title.replaceAll(" ", "").replaceAll(".", "").replaceAll(",", "").replaceAll("-", "").replaceAll("–", "");

  lockCard += `<div class="card" card-data="`+openclass+`">
        <div class="avatar">
        <img class="avatarimg" src="`+ logoLink + `" loading="lazy" alt="oh no">
        </div>
        <div class="cardcontent `+ (liked ? "cardcontent-liked" : "") +`" id="card-`+ openclass + `">
            <div class="title">
                <p>
                        <a class="titletext" href="`+ link + `">` + title + `</a> 
                        <a class="jahrgang" style="background-color: ` + yearcolor + `;">` + year + `</a>
                        <a class="group" style="background-color: ` + groupcolor + `;">` + group + `</a>
                        <a class="type" style="background-color: ` + typecolor + `;">` + type + `</a>
                </p>
            </div>`


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

  lockCard += `<div class="button-wrapper ` + buttonclass + `">`+getSVG(buttonclass, openclass, liked)+`</div>`

  lockCard += `</div> </div>`

  return lockCard;
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function getSVG(buttonclass, openclass, liked){
  var backgroundColor = liked ? "gold" : "rgba(114, 113, 113, 1)";
  return `<?xml version="1.0" ?><svg class="tu ` + buttonclass + `" id="thumbs-up-button" button-title="card-` + openclass + `" height="45" viewBox="0 0 1792 1792" width="30" xmlns="http://www.w3.org/2000/svg"><path class="path" fill="`+backgroundColor+`" d="M320 1344q0-26-19-45t-45-19q-27 0-45.5 19t-18.5 45q0 27 18.5 45.5t45.5 18.5q26 0 45-18.5t19-45.5zm160-512v640q0 26-19 45t-45 19h-288q-26 0-45-19t-19-45v-640q0-26 19-45t45-19h288q26 0 45 19t19 45zm1184 0q0 86-55 149 15 44 15 76 3 76-43 137 17 56 0 117-15 57-54 94 9 112-49 181-64 76-197 78h-129q-66 0-144-15.5t-121.5-29-120.5-39.5q-123-43-158-44-26-1-45-19.5t-19-44.5v-641q0-25 18-43.5t43-20.5q24-2 76-59t101-121q68-87 101-120 18-18 31-48t17.5-48.5 13.5-60.5q7-39 12.5-61t19.5-52 34-50q19-19 45-19 46 0 82.5 10.5t60 26 40 40.5 24 45 12 50 5 45 .5 39q0 38-9.5 76t-19 60-27.5 56q-3 6-10 18t-11 22-8 24h277q78 0 135 57t57 135z"/></svg>`;
}