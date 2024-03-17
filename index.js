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
            console.log(data[i].Titel);
            
        }else {

        console.log(i);
        

          var titel = data[i].Titel.toLowerCase();
          var titelTable = data[i].Titel;
          console.log(titelTable); 

  
          if(data[i].Typ == "Lock" && (titelTable.charAt(1) == "." || titelTable.charAt(2) == ".")){
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
        

        if(titel.includes(search.toLowerCase()))
        {
             toInsert += 
            '<tr> <th scope="row">'+titelTable+'</th> <td><a id="year">'+data[i].Jahrgang+'</a> <a id="Trommlergruppe" style="background-color: '+groupColor+';">'+data[i].Trommlergruppe+'</a> <a id="type" style="background-color: '+typeColor+';">'+data[i].Typ+'</a> </td> </tr>';
        } 
      }
    }
  
      
    
    document.getElementById('tableInsert').innerHTML = toInsert;
    })
    .catch(function(error) {
      console.error(error); 
    });
  }
