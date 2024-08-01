import { useState, useEffect } from 'react';
import './App.css';

function CountryInfos() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [error, setError] = useState('')
  const [weather, setWeather] = useState(null)

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://studies.cs.helsinki.fi/restcountries/api/all');
        if (!response.ok) {
          throw new Error('Network response is not right');
        }
        const data = await response.json()
        setCountries(data)
      } catch (error) {
        setError('There was an error fetching data: ' + error.message);
        setCountries([])
      }
    }

    fetchData()
  }, []);

  useEffect(() => {
    if (query.length === 0) {
      setFilteredCountries([])
      setError('')
      setSelectedCountry(null)
      return
    }

    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    )

    if (filtered.length > 10) {
      setFilteredCountries([]);
      setError('Too many matches, please specify another filter.');
      setSelectedCountry(null)
    } else if (filtered.length === 1) {
      setFilteredCountries(filtered)
      setSelectedCountry(filtered[0])
      setError('');
    } else {
      setFilteredCountries(filtered)
      setSelectedCountry(null)
      setError('');
    }
  }, [query, countries])

  useEffect(() => {
    const fetchWeather = async (capital) => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(`Error ${response.status}: ${errorData.message}`);
        }
        const data = await response.json()
        setWeather(data)
      } catch (error) {
        console.error('Error while fetching the weather data: ', error);
      }
    }

    if (selectedCountry && selectedCountry.capital) {
      fetchWeather(selectedCountry.capital)
    }
  }, [selectedCountry, apiKey])

  // Event handling when the "Show Details" button is clicked
  const viewDetails = (country) => {
    setSelectedCountry(country)
    setWeather(null)
  }

  return (
    <div className="container">
      <h1>Country Information</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter country name"
      />
      {error && <p className="error">{error}</p>}
      <ul>
        {filteredCountries.map((country, index) => (
          <li key={index}>
            {country.name.common}
            <button onClick={() => viewDetails(country)}>Show Details</button>
          </li>
        ))}
      </ul>
      {selectedCountry && (
        <div className="country-details">
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital} </p>
          <p>Population: {selectedCountry.population} </p>
          <p>Languages:</p>
          <ul>
            {Object.values(selectedCountry.languages).map((lang, index) => (
              <li key={index}>{lang}</li>
            ))}
          </ul>
          <img 
            src={selectedCountry.flags.png}
            alt={`Flag of ${selectedCountry.name.common}`}
            style={{ width: '150px' }} 
          />
          {weather && (
            <div>
              <h3>Weather in {selectedCountry.capital}</h3>
              <p>Temperature: {weather.main.temp} Celsius </p>
              <p>Weather: {weather.weather[0].description}</p>
              <img
                className="weather-icon"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather icon"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CountryInfos;
