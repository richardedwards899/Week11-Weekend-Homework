var app = function(){
  console.log("The window has totally loaded! Let's get us some pokemon!");

  var url = 'http://pokeapi.co/api/v2/pokemon/';
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.send();

  request.addEventListener('load', function(){
    var jsonString = request.responseText;
    var pokemon = JSON.parse(jsonString);
    console.log(pokemon);
  });



  

}//app

window.addEventListener('load', app);
