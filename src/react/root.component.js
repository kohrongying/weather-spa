import React from "react"
import WeatherApi from "./api/api"
import "./App.css"
import PSI from "./components/PSI/PSI"
import WeatherDetail from "./components/WeatherDetail/WeatherDetail"

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

        // let stations = []
        // for (let i=0;i<responses.length;i++) {
        //   stations = [...stations, ...responses[i].metadata.stations]
        // }
        // const removedDups = new Set(stations.map(station => station.id))
        // stations = [...removedDups].map(id => stations.find(s => s.id === id)).filter(station => station.id !== station.name)
        
        const stations = responses[0].metadata.stations
        stations.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)) 

        setStations(stations)
        setTemps(responses[0].items[0])
        setRainfall(responses[1].items[0])
        setHumidity(responses[2].items[0])
        setStationId(stations[0].id)
    }

    const handleSelectChange = (event) => {
        setStationId(event.target.value)
    }

    return(
        <>
            <div id="weather-container">
        
                {stationId && 
          <WeatherDetail
              stations={stations}
              temperature={temps?.readings?.find(obj => obj.station_id === stationId)?.value}
              rainfall={rainfall?.readings?.find(obj => obj.station_id === stationId)?.value}
              humidity={humidity?.readings?.find(obj => obj.station_id === stationId)?.value}
              timestamp={temps.timestamp}
              stationId={stationId}
              handleSelectChange={handleSelectChange}
          />
                }
            </div>
            <div id="psi-container">
                <PSI />
            </div>

      
            
        </>
    )

}

export default App