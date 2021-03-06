'use strict';
// ----------------------------------------
(function(){

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function isEmpty(n) {
    return n.length == 0 || n == 0;
  }

  function generateTemplate(data) {
    var template = document.getElementById('country-template').innerHTML;
    var element = document.getElementById('countries');
    Mustache.parse(template);
    element.innerHTML+= Mustache.render(template, data);
  }

  function searchCountries() {
    var country = document.getElementById('search-name').value;
    var url = 'https://restcountries.eu/rest/v2/name/';
    if (!isNumber(country) && !isEmpty(country)) {
      fetch(url + country)
      .then(res => res.json())
      .catch(error => document.getElementById('countries').innerHTML = 'Error: ' + error)
      .then( resp => showCountriesList(resp) );
    } else {
      document.getElementById('countries').innerHTML = 'Incorrect input';
    }
  }

  function showCountriesList(resp) {
    var country = document.getElementById('search-name').value;
    document.getElementById('countries').innerHTML = '';
    if (resp.length > 0) {
      resp.filter(
        cntry => cntry.name.toLowerCase().indexOf(country.toLowerCase()) !== -1
    )
      .forEach(
        item => {
        generateTemplate({
          name: item.name,
          capital: item.capital,
          area: item.area,
          population: item.population,
          flagImg: item.flag,
          languages: getLanguages(item.languages),
          currencies: getCurrencies(item.currencies)
        });
      });
    } else {
      document.getElementById('countries').innerHTML = 'No results';
    }

    function getLanguages(arr) {
      var languages = '';
      arr.forEach(lang => languages += lang.name + ' (' + lang.nativeName + ') ');
      return languages;
    }

    function getCurrencies(arr) {
      var currencies = '';
      arr.forEach(curr => currencies += curr.name + ' (' + curr.code + ') ');
      return currencies;
    }
  }
  document.getElementById('search').addEventListener('click', searchCountries);

// ----------------------------------------
}());
