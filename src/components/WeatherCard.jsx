import { useState } from "react"

const WeatherCard = ({weather,temp}) => {

    const [isCelsius, setIsCelsius] = useState(true)

    const handleChangeTemp = () => setIsCelsius(!isCelsius)

  return (
    <article className="weather">
        <header className="weatherHeader">
          <h2>{weather?.name}, {weather?.sys.country}</h2>
        </header>
        <section className="main">
          <div className="weatherIcon">
            <img src={weather && `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
          </div>
          <div className="weatherTemp">
              <h2 className="temp">{isCelsius ? `${temp?.celsius} °C` : `${temp?.farenheit} °F`}</h2>
              <h3>{weather?.weather[0].description}</h3>
              <button onClick={handleChangeTemp}>Change to {isCelsius ? '°F' : '°C'}</button>
          </div>
        </section>
        <footer className="footer">
            <ul>
              <li><b>Wind Speed:</b> {weather?.wind.speed}m/s</li>
              <li><b>Clouds:</b> {weather?.clouds.all}%</li>
              <li><b>Pressure:</b> {weather?.main.pressure}hPa</li>
            </ul>
        </footer>
    </article>
  )
}

export default WeatherCard
