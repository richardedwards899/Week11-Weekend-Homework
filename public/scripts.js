/*
My objective in this homework is to get more comfortable with scope, and
the passing of functions as arguments.

I chose to work with the Pokemon API because it has lots of nested URLs,
which will give me practice at working with multiple Http requests.

The makeRequest function is pretty cool. It reads a url, converts the json
found at that url into js objects, then passes them into a named function. While
might be *cool*, it's a bugger to use because I can't return anything
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
    pokemons.forEach(function(pokemon){
      var pokeFigure = createPokeFigure(pokemon);
      container.appendChild(pokeFigure);
    });
}//app


var createPokeFigure = function(pokemon){

  var pokeFigure = document.createElement('figure');
  pokeFigure.classList.add('poke-picture-figure');

  var caption = document.createElement('figcaption');
  caption.innerText = pokemon.name;

  var imageDiv = document.createElement('div');
  imageDiv.classList.add('poke-panel');

  var imgFront = document.createElement('img');
  imgFront.classList.add('poke-picture');
  imgFront.id = pokemon.name+"-front";
  imgFront.src = "images/loading.jpg";

  var imgBack = document.createElement('img');
  imgBack.classList.add('poke-picture');
  imgBack.id = pokemon.name+"-back";
  imgBack.src = "images/loading.jpg";

  var description = document.createElement('p');
  description.id = pokemon.name+"-description";
  description.innerText = "Description loading - please wait! It'll be worth it.";

  makeRequest(pokemon.url, overwriteDefaultImages);

  console.log("imgFront: ", imgFront);
  imageDiv.appendChild(imgFront);

  console.log("imgBack: ", imgBack);
  imageDiv.appendChild(imgBack);

  pokeFigure.appendChild(caption);
  pokeFigure.appendChild(imageDiv);
  pokeFigure.appendChild(description);

  return pokeFigure;
}

var overwriteDefaultImages = function(pokemonObjects){
  console.log("pokemonObjects: ", pokemonObjects);

  //now we've got the objects, we can get the required URL!
  var picURLFront = pokemonObjects.sprites.front_shiny;
  console.log("picURLFront for "+pokemonObjects.name, picURLFront);

  var picURLBack = pokemonObjects.sprites.back_shiny;
  console.log("picURLBack for "+pokemonObjects.name, picURLBack);

  //we now have the URL. Just need to find the right object in the DOM
  //and write to it.
  var imgToOverwriteFront = document.getElementById(pokemonObjects.name+"-front");
  imgToOverwriteFront.src = picURLFront;

  var imgToOverwriteBack = document.getElementById(pokemonObjects.name+"-back");
  imgToOverwriteBack.src = picURLBack;

  makeRequest(pokemonObjects.species.url, overwriteDescription);
}

var overwriteDescription = function(speciesInfo){
  console.log("overwriteDescription:", speciesInfo);

  var description = speciesInfo.flavor_text_entries[1].flavor_text;
  console.log("description", description);

  var defaultDescription = document.getElementById(speciesInfo.name+"-description");
  defaultDescription.innerText = description;
}

window.addEventListener('load', loadObjects);
