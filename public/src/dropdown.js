console.log("LOADED DROPDOWN.JS");

function populateCitiesDropdown() {
  
  console.log("populating cities dropdown...");

  const middleware = require('./middleware.js');
  
  cities = middleware.getCities();
  console.log(cities);
  
  var dropdown = document.getElementById('citiesDropdown');
  
  for (var i = 0; i < cities.length; ++i) {
    addOption(dropdown, cities[i], cities[i]);
  }
    
  addOption = function(selectbox, text, value) {
    var optn = document.createElement('OPTION');
    optn.text = text;
    optn.value = value;
    selectbox.options.add(optn);
  };
  
}

