import React from "react"
import WeatherApi from "./api/api"
import "./App.css"
import PSI from "./components/PSI/PSI"

const App = () => {
  const [stations, setStations] = React.useState([])
  const [temps, setTemps] = React.useState({})
  const [rainfall, setRainfall] = React.useState({})
  const [humidity, setHumidity] = React.useState({})
  const [stationId, setStationId] = React.useState(null)

  React.useEffect(() => {
    fetchData()    
  }, [])

  const fetchData = async () => {
    const responses = await Promise.all([
      WeatherApi.getTemperature(),
      WeatherApi.getRainfall(),
      WeatherApi.getHumidity()
    ])

    let stations = []
    for (let i=0;i<responses.length;i++) {
      stations = [...stations, ...responses[i].metadata.stations]
    }
    const removedDups = new Set(stations.map(station => station.id))
    stations = [...removedDups].map(id => stations.find(s => s.id === id)).filter(station => station.id !== station.name)

    setStations(stations)
    setTemps(responses[0].items[0])
    setRainfall(responses[1].items[0])
    setHumidity(responses[2].items[0])
  }

  const renderStationData = () => {
    if (stationId) {
      const station = stations.find(station => station.id === stationId)
      return (
        <React.Fragment>
          <p><i>{station.name}</i></p>
          <p>Temperature: {temps?.readings?.find(obj => obj.station_id === stationId)?.value} deg C</p>
          <p>Rainfall: {rainfall?.readings?.find(obj => obj.station_id === stationId)?.value} mm</p>
          <p>humidity: {humidity?.readings?.find(obj => obj.station_id === stationId)?.value} %</p>
        </React.Fragment>
      )
    } else {
      return (
          <p><i>Please click on item</i></p>
      )
    }
  }

  return(
    <>
    <h1>Weather SG</h1>
    <div className="grid-container">
      <div className="left">
        {stations.map(station => (
          <li key={station.id} onClick={() => setStationId(station.id)}>
            {station.name} ({station.id})
          </li>
        ))}
      </div>

      <div className="right">
        
        <div className="weatherDetail">
          <h3>Weather</h3>
          {renderStationData()}
        </div>

        <PSI />
      </div>

      
    </div>
    </>
  )

}

export default App;