import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';
import getApiKey from './utils/getApiKey';
import WeatherCard from './components/WeatherCard';
import Loading from './components/Loading';

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [hasError, setHasError] = useState(false)
  const objStyle = { backgroundImage: `url('fondo-${weather?.weather[0].icon}.jpg')` }

  useEffect(() => {
    const success = pos => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(obj)
    }
    const error = err => {
      console.log(err);
      setHasError(true)
    }
    navigator.geolocation.getCurrentPosition(success,error)
  }, [])

  useEffect(() => {
    if (coords != undefined) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=${getApiKey()}`
    axios.get(url)
      .then(res => {
        setWeather(res.data)
        const objTemp = {
          celsius: (res.data.main.temp - 273.15).toFixed(1),
          farenheit: ((res.data.main.temp - 273.15) * 9/5 + 32).toFixed(1)
        }
        setTemp(objTemp)
        setHasError(false)
      })
      .catch(err => {
        console.log(err)
        setHasError(true)
      })
    }
  }, [coords])
  
  
  return (
    <div style={objStyle} className='container'>
      <h1 className='title'>Weather App</h1>
      <div className='app'>
        {hasError 
        ? (<h2 className='error'> Sin la autorización de geolocalización no es posible obtener los datos del clima 😢</h2>) 
        : ( weather 
            ? (<WeatherCard 
                weather = {weather}
                temp = {temp}/>)
            : (<Loading />)
          )
        }
      </div>
    </div>
  )
}

export default App
