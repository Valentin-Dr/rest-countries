import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import API from '../../middleware';
import './styles.scss';
import arrow from '../../images/arrow-back-outline.svg';
import lightModeIcon from '../../images/LightMode.svg';
import darkModeIcon from '../../images/DarkMode.svg';
function App() {
  
  
  const [countriesToSearch, setCountriesToSearch] = useState("region/africa");
  const [countriesFound, setCountriesFound] = useState([]);
  const [specificCountry, setSpecificCountry] = useState(false);
  const [countryToSearch, setCountryToSearch] = useState("");
  const [countryFound, setCountryFound] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [darkModeText, setDarkModeText] = useState("Dark Mode");

  const countryOnClickHandler = (e) => {
    getCountries(`name/${e.querySelector(".country-name").innerText}`, false);
  };

  const borderCountryOnClickHandler = (e) => {
    getCountries(`alpha?codes=${e.innerText}`, false);
  }

  const backButtonHandler = () => {
    setSpecificCountry(false);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    getCountries(`name/${countryToSearch}`, false);
  };

  const darkModeHandler = () => {
    setDarkMode(!darkMode);
    setDarkModeText(!darkMode ? "Light Mode" : "Dark Mode");
    const root = document.documentElement;
    root.style.setProperty("--primary-color", !darkMode ? "hsl(207, 26%, 17%)" : "hsl(0, 0%, 98%)");
    root.style.setProperty("--secondary-color", !darkMode ? "hsl(209, 23%, 22%)" : "hsl(0, 0%, 100%)");
    root.style.setProperty("--text-color", !darkMode ? "hsl(0, 0%, 100%)" : "hsl(200, 15%, 8%)");
    root.style.setProperty("--box-shadow-color", !darkMode ? "hsl(0, 0%, 10%)" : "hsl(0, 0%, 52%)");
    root.style.setProperty("--icon-filter", !darkMode ? "invert(100%)" : "invert(0%)");
  }

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
          setSpecificCountry(true);
        }
      };
    });
  };

  const countriesJsx = countriesFound.map((country) => 
  <div className="country-container" key={uuidv4()} onClick={(e) => countryOnClickHandler(e.currentTarget)}>
      <img className="country-flag" src={country.flags.svg} alt="Country flag" />
      <div className="country-container-bottom">
        <p className="country-name">
          {country.name.common}
        </p>
        <ul className="country-details">
          <li><span className="semi-bold">Population:</span> {country.population}</li>
          <li><span className="semi-bold">Region:</span> {country.region}</li>
          <li><span className="semi-bold">Capital:</span> {country.capital ? country.capital[0] : "None found"}</li>
        </ul>
      </div>
    </div>
  );

  useEffect(() => {
    getCountries(countriesToSearch, true);
  }, [countriesToSearch]);

  return (
    <div className="App">
      <header className="header">
        <h1 className="header-title">Where in the world?</h1>
        <div className="header-dark-mode" onClick={darkModeHandler}>
          <img src={darkMode ? lightModeIcon : darkModeIcon} alt="" />
          <p className="header-dark-mode-p">
            {darkModeText}
          </p>
        </div>
      </header>
      <main>
        {!specificCountry && 
        <>
          <div className="body-container-top">
            <form className="search-form" action="" onSubmit={(e) => onSubmitHandler(e)}>
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
                  <li><span className="semi-bold">Region:</span> {countryFound[0].region}</li>
                  <li><span className="semi-bold">Sub Region:</span> {countryFound[0].subregion}</li>
                  <li><span className="semi-bold">Capital:</span> {countryFound[0].capital ? countryFound[0].capital[0] : "None found"}</li>
                </ul>
              </div>
              <div className="details-list">
                <ul>
                  <li><span className="semi-bold">Top Level Domain:</span> {countryFound[0].tld[0]}</li>
                  <li><span className="semi-bold">Currencies:</span> {Object.values(Object.values(countryFound[0].currencies)[0])[0]}</li>
                  <li><span className="semi-bold">Languages:</span> {Object.values(Object.values(countryFound[0].languages).map((lang) => (lang + ", "))).join("").slice(0,-2)}</li>
                </ul>
              </div>
            </div>
            <div className="details-borders">
              <ul>
                <li className="semi-bold">Border Countries:</li>
                {countryFound[0].borders ? Object.values(Object.values(countryFound[0].borders).map((country) =>
                <li className="details-borders-country" onClick={(e) => borderCountryOnClickHandler(e.currentTarget)}>{country}</li>
                )) : "None found"}
              </ul>
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
