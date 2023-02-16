import { useEffect, useState } from 'react';
import API from '../../middleware';
import './styles.scss';
import arrow from '../../images/arrow-back-outline.svg';
import searchIcon from '../../images/search-outline.svg';
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

  const onSubmitHandler = (e) => {
    e.preventDefault();
    getCountries(`name/${countryToSearch}`, false);
  };

  const getCountries = (countries, multiple) => {
    const config = {
      method:'get',
      url:countries
    };
    API(config)
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        if (multiple) {
          setCountriesFound(response.data);
        } else {
          setCountryFound(response.data);
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
            <form action="" onSubmit={(e) => onSubmitHandler(e)}>
              <input type="text" className="search-input" placeholder="Search for a country..." onChange={(e) => setCountryToSearch(e.target.value)}/>
            </form>
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
        <>
          <button className="back-button" onClick={backButtonHandler}>
            <img src={arrow} alt="" />
            Back</button>
          <div className="specific-country">
          <div className="specific-country-left">
            <img src={countryFound[0].flags.svg} alt="Country flag" />
          </div>
          <div className="specific-country-details">
            <h2 className="specific-country-name">{countryFound[0].name.common}</h2>
            <div className="details">
              <div className="details-list">
                <ul>
                  <li><span className="semi-bold">Native Name:</span> {Object.values(Object.values(countryFound[0].name.nativeName)[0])[0]}</li>
                  <li><span className="semi-bold">Population:</span> {countryFound[0].population}</li>
                  <li><span className="semi-bold">Region:</span> {countryFound[0].population}</li>
                  <li><span className="semi-bold">Sub Region:</span> {countryFound[0].subregion}</li>
                  <li><span className="semi-bold">Capital:</span> {countryFound[0].capital[0]}</li>
                </ul>
              </div>
              <div className="details-list">
                <ul>
                  <li><span className="semi-bold">Top Level Domain:</span> {countryFound[0].tld[0]}</li>
                  <li><span className="semi-bold">Currencies:</span> {Object.values(Object.values(countryFound[0].currencies)[0])[0]}</li>
                  <li><span className="semi-bold">Languages:</span> {Object.values(Object.values(countryFound[0].languages).map((lang) => lang + ", "))}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </>
        }
      </main>
    </div>
  );
}

export default App;
