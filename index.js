let search = document.querySelector('.searchTerm').value;


addEventListener("input", (event) => {
    search = document.querySelector('.searchTerm').value;

    fillTable();    
});

fillTable();



  function fillTable() {
    fetch("./data.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
  
      var toInsert = "";
  
      for(var i = 0; i < data.length; i++)
      {
        
        if(!data[i].hasOwnProperty("Titel")){
            console.log("Loool");
            console.log(data[i]);
            
        }else {
        

          var titel = data[i].Titel.toLowerCase();
          var titelTable = data[i].Titel;

  
          if(data[i].Typ == "Locks" && (titelTable.charAt(1) == "." || titelTable.charAt(2) == ".")){
            titelTable = titelTable.substring(3, titel.length)
        }
        
        var typeColor = 'rgba(255, 255, 4, 0.5)';

        if(data[i].Typ != "Lock"){
          typeColor = 'rgba(255, 119, 0, 0.5)';
        }

        var groupColor;

        if(data[i].Trommlergruppe == "Landsknechte"){
          groupColor = 'rgba(0, 0, 241, 0.5)';
        }else if(data[i].Trommlergruppe == "Turmfalken"){
          groupColor = 'rgba(186, 49, 179, 0.5)';
        }else{
          groupColor = 'rgba(71, 26, 26, 0.5)';
        }
        

        if(titel.includes(search.toLowerCase()) || data[i].Trommlergruppe.toLowerCase() == search.toLowerCase() || (isInt(search) && parseInt(search) == parseInt(data[i].Jahrgang.toString().substring(0, search.length))))
        {
          if(data[i].Trommlergruppe == "Landsknechte"){
            var link = data[i].Link;
            toInsert += 
            '<tr> <th scope="row"><a class="link" href="'+link+'">'+titelTable+'</a></th> <td><a id="year">'+data[i].Jahrgang+'</a> <a id="Trommlergruppe" style="background-color: '+groupColor+';">'+data[i].Trommlergruppe+'</a> <a id="type" style="background-color: '+typeColor+';">'+(data[i].Typ == "Locks" ? "Lock" : data[i].Typ)+'</a> </td> </tr>';
          }else {
             toInsert += 
            '<tr> <th scope="row"><a>'+titelTable+'</a></th> <td><a id="year">'+data[i].Jahrgang+'</a> <a id="Trommlergruppe" style="background-color: '+groupColor+';">'+data[i].Trommlergruppe+'</a> <a id="type" style="background-color: '+typeColor+';">'+data[i].Typ+'</a> </td> </tr>';
          }
          } 
      }
    }
  
      
    
    document.getElementById('tableInsert').innerHTML = toInsert;
    })
    .catch(function(error) {
      console.error(error); 
    });
  }

  function isInt(n) {
    return /^[+-]?\d+$/.test(n);
  }
