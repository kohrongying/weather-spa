import React from "react"
import PropTypes from "prop-types"
import "./WeatherDetail.css"

const TEMPERATURE_TABLE = [
    { maxVal: 26, descriptor: "cool" },
    { maxVal: 30, descriptor: "warm" },
    { maxVal: 32, descriptor: "hot" },
    { maxVal: 36, descriptor: "sibeh hot" },
]

const RAINFALL_TABLE = [
    { maxVal: 0, descriptor: "no rain" },
    { maxVal: 0.5, descriptor: "slight drizzle" },
    { maxVal: 2, descriptor: "light showers" },
    { maxVal: 100, descriptor: "heavy rain" },
]

const getTempDescriptor = (temperature) => {
    for (let item of TEMPERATURE_TABLE) {
        if (item.maxVal >= temperature) {
            return item.descriptor
        }
    }
}

const getRainfallDescriptor = (rainfall) => {
    for (let item of RAINFALL_TABLE) {
        if (item.maxVal >= rainfall) {
            return item.descriptor
        }
    }
}


const WeatherDetail = ({
    temperature,
    rainfall,
    humidity,
    timestamp,
    location
}) => {
    return (
        <React.Fragment>
            <div className="weather-detail">
      
                <div className="two-columns">
                    <h2>It is {getTempDescriptor(temperature)} with {getRainfallDescriptor(rainfall)} at {location}</h2>
                    <div className="reading">
                        <div>{temperature} °C</div>
                        <div>{rainfall} mm</div>
                        <div>H: {humidity} %</div>
                    </div>
                </div>
      
                <div className="footnote">
                    <div><i>Retrieved on {new Date(timestamp).toLocaleString()}</i></div>
                </div>
      
            </div>
        </React.Fragment>
    )
}

WeatherDetail.propTypes = {
    temperature: PropTypes.string,
    rainfall: PropTypes.number,
    humidity: PropTypes.number,
    timestamp: PropTypes.string,
    location: PropTypes.string,
}

export default WeatherDetail