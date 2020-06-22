import React from "react"
import WeatherApi from "../../api/api"
import "./PSI.css"

const INDICATOR = [
  { minVal: 0, maxVal: 50, descriptor: 'Good', color: '#6FCF97'},
  { minVal: 51, maxVal: 100, descriptor: 'Moderate', color: '#56CCF2'},
  { minVal: 101, maxVal: 200, descriptor: 'Unhealthy', color: '#F2C94C'},
  { minVal: 201, maxVal: 300, descriptor: 'Very unhealthy', color: '#F2994A'},
  { minVal: 300, maxVal: null, descriptor: 'Hazardous', color: '#EB5757'},
]

const PSI = () => {
  const [data, setData] = React.useState(null)
  const [qualityIndex, setQualityIndex] = React.useState(0)

  React.useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await WeatherApi.getPSI()
    const data = response.items[0]
    setData(data)
    renderQuality(data.readings.psi_twenty_four_hourly.national)
  }

  const renderReading = () => {
    return (
      <div className="reading-wrapper">
        <div className="reading-detail">
          <div className="descriptor">{INDICATOR[qualityIndex]?.descriptor}</div>
          <p><i>{new Date(data?.timestamp).toLocaleString()}</i></p>

          <a href="/psi">View more</a>
        </div>
        <span className="reading">
          {data?.readings.psi_twenty_four_hourly.national}
        </span>
      </div>
    )
  }

  const renderQuality = (reading) => {
    if (reading) {
      for(let i=0; i< INDICATOR.length;i++) {
        if (reading > INDICATOR[i].minVal && reading < INDICATOR[i].maxVal) {
          setQualityIndex(i)
          return
        }
      }
    }
    setQualityIndex(4)
  }

  return(
    <React.Fragment>
      <div className="psi" style={{ backgroundColor: INDICATOR[qualityIndex].color}}>
        <h2>PSI</h2>
        {renderReading()}
        
      </div>
      <div className="indicator">
        {INDICATOR.map((indicator, index) => (
          <div 
            key={indicator.descriptor} 
            style={{ 
              backgroundColor: indicator.color, border: qualityIndex === index ? 'none' : '1px soild white'
            }}
          >
            {indicator.maxVal ? `${indicator.minVal} - ${indicator.maxVal}` : `${indicator.minVal} >`} 
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}

export default PSI;