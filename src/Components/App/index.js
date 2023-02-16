import { useEffect, useState } from 'react';
import API from '../../middleware';
import './styles.scss';

function App() {

  const [countriesToSearch, setCountriesToSearch] = useState("region/africa");
  const [countriesFound, setCountriesFound] = useState([]);
  const [specificCountry, setSpecificCountry] = useState(false);
  // name/{name}
  const getCountries = () => {
    const config = {
      method:'get',
      url:countriesToSearch
    };
    API(config)
    .then((response) => {
      console.log(response.data);
      if (response.status === 200) {
        setCountriesFound(response.data);
      };
    });
  };

  useEffect(() => {
    getCountries();
  }, [countriesToSearch]);

  const countriesJsx = countriesFound.map((country) => 
    <div className="country-container" key={country.fifa}>
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
  )

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
        {!specificCountry &&
        <div className="body-container-countries">
          {countriesJsx}
        </div>}
      </main>
    </div>
  );
}

export default App;
