/*
My objective in this homework is to get more comfortable with scope, and
the passing of functions as arguments.

I chose to work with the Pokemon API because it has lots of nested URLs,
which will give me practice at working with multiple Http requests.

The makeRequest function is pretty cool. It reads a url, converts the json
found at that url into js objects, then passes them into a named function. It
might be *cool*, but it's a bugger to use because I can't return anything
from it! Maybe I should be using binds?
*/

var loadObjects = function(){
    makeRequest('http://pokeapi.co/api/v2/pokemon/', app);
}//loadObjects

//returns the result of the callback function, which operates over the js
//objects created from the json at 'url'.
var makeRequest = function(url, callback){
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();

    request.addEventListener('load', function(){
      var jsonString = this.responseText;
      var dataObjects = JSON.parse(jsonString);
      callback(dataObjects);
    });
}//makeRequest


var app = function(data){
    console.log("data: ", data);

    var pokemons = data.results;
    console.log("data.results: ", pokemons);

    var container = document.getElementById('poke-container');

    //for each result, build a poke-panel
    // pokemons.forEach(function(pokemon){
      var pokeFigure = createPokeFigure(pokemons[0]);
      container.appendChild(pokeFigure);
    // });
}//app


var createPokeFigure = function(pokemon){

  var pokeFigure = document.createElement('figure');
  pokeFigure.classList.add('poke-picture-figure');

  var caption = document.createElement('figcaption');
  caption.innerText = pokemon.name;

  //get image
  var img = document.createElement('img');
  img.classList.add('poke-picture');
  img.classList.add(pokemon.name);
  img.src = "images/loading.jpg";

  getImageURL(pokemon);

  pokeFigure.appendChild(caption);
  console.log("img: ", img);
  pokeFigure.appendChild(img);

  return pokeFigure;
}

var getImageURL = function(pokemon){
  makeRequest(pokemon.url, getImageURLs);
}

var getImageURLs = function(objects){
  console.log("objects: ", objects);

  //now we've got the objects, we can get the required URLS!
  var picURL = objects.sprites.front_shiny;
  console.log("picURL for "+objects.name, picURL);
}

window.addEventListener('load', loadObjects);
