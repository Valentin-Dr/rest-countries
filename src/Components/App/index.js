import { useEffect, useState } from 'react';
import API from '../../middleware';
import './styles.scss';

function App() {

  const [countriesToSearch, setCountriesToSearch] = useState("region/africa");
  const [countriesFound, setCountriesFound] = useState([]);
  const [specificCountry, setSpecificCountry] = useState(false);
  const [countryToSearch, setCountryToSearch] = useState("");
  const [countryFound, setCountryFound] = useState([]);

  const countryOnClickHandler = (e) => {
    getCountries(`name/${e.querySelector(".country-name").innerText}`, false);
  };

  const backButtonHandler = () => {
    setSpecificCountry(false);
  };

  const getCountries = (countries, multiple) => {
    const config = {
      method:'get',
      url:countries
    };
    API(config)
    .then((response) => {
      if (response.status === 200) {
        if (multiple) {
          setCountriesFound(response.data);
        } else {
          setCountryFound(response.data);
          console.log(response.data);
          console.log(countryFound);
          setSpecificCountry(true);
        }
      };
    });
  };

  useEffect(() => {
    getCountries(countriesToSearch, true);
  }, [countriesToSearch]);

  const countriesJsx = countriesFound.map((country) => 
    <div className="country-container" key={country.fifa} onClick={(e) => countryOnClickHandler(e.currentTarget)}>
      <img className="country-flag" src={country.flags.svg} alt="Country flag" />
      <div className="country-container-bottom">
        <p className="country-name">
          {country.name.common}
        </p>
        <ul className="country-details">
          <li><span className="semi-bold">Population:</span> {country.population}</li>
          <li><span className="semi-bold">Region:</span> {country.region}</li>
          <li><span className="semi-bold">Capital:</span> {country.capital[0]}</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="App">
      <header className="header">
        <h1 className="header-title">Where in the world?</h1>
        <div className="header-dark-mode">
          <p className="header-dark-mode-p">
            Dark Mode
          </p>
        </div>
      </header>
      <main>
        {!specificCountry && 
        <>
          <div className="body-container-top">
            <input type="text" className="search-input" placeholder="Search for a country..." />
            <select name="regions" id="region" className="search-regions" onChange={(e) => setCountriesToSearch(`region/${e.target.value}`)}>
              <option value="africa">Africa</option>
              <option value="america">America</option>
              <option value="asia">Asia</option>
              <option value="europe">Europe</option>
              <option value="oceania">Oceania</option>
            </select>
          </div>
          <div className="body-container-countries">
            {countriesJsx}
          </div>
        </>}
        {specificCountry && countryFound &&
          <div className="specific-country">
          <div className="specific-country-left">
            <button className="back-button" onClick={backButtonHandler}>Back</button>
            <img src={countryFound[0].flags.svg} alt="Country flag" />
          </div>
          <div className="specific-country-details">
            <h2 className="specific-country-name">{countryFound[0].name.common}</h2>
            <ul>
              <li>Native Name: {Object.values(Object.values(countryFound[0].name.nativeName)[0])[0]}</li>
              <li>Population: {countryFound[0].population}</li>
              <li>Region: {countryFound[0].population}</li>
              <li>Sub Region: {countryFound[0].subregion}</li>
              <li>Capital: {countryFound[0].capital[0]}</li>
              <li>Top Level Domain: {countryFound[0].tld[0]}</li>
              <li>Currencies: {Object.values(Object.values(countryFound[0].currencies)[0])[0]}</li>
              <li>Languages: {Object.values(Object.values(countryFound[0].languages)[0])}</li>
            </ul>
          </div>
        </div>
        }
      </main>
    </div>
  );
}

export default App;
