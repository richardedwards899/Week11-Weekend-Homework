/*
My objective in this homework is to get more comfortable with scope, and
the passing of functions as arguments.

I chose to work with the Pokemon API because it has lots of nested URLs,
which will give me practice at working with Http requests.
*/



var loadObjects = function(){
  makeRequest('http://pokeapi.co/api/v2/pokemon/', app);
}//loadObjects


var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.send();

  request.addEventListener('load', function(){
    var jsonString = this.responseText;
    var dataObjects = JSON.parse(jsonString);
    callback(dataObjects); //equivalent to 'function(dataObjects)'
  });
}//makeRequest


var app = function(data){

  console.log("data: ", data);

  var pokemons = data.results;
  console.log("data.results: ", pokemons);

  var container = document.getElementById('poke-container');

  //for each result, build a poke-panel
  pokemons.forEach(function(pokemon){
    var pokeFigure = createPokeFigure(pokemon);
    container.appendChild(pokeFigure);
    // console.log(pokemon.name);
  });
}//app


var createPokeFigure = function(pokemon){

  var pokeFigure = document.createElement('figure');
  pokeFigure.classList.add('poke-picture-figure');

  var caption = document.createElement('figcaption');
  caption.innerText = pokemon.name;

  pokeFigure.appendChild(caption);

  return pokeFigure;
}



window.addEventListener('load', loadObjects);
