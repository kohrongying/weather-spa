import axios from "axios"

const baseURL = 'https://api.data.gov.sg/v1/environment'

const WeatherApi = {
    getTemperature: async () => {
        const response = await axios.get(`${baseURL}/air-temperature`)
        return response.data;
    },

    getRainfall: async () => {
        const response = await axios.get(`${baseURL}/rainfall`)
        return response.data;
    },

    getHumidity: async () => {
        const response = await axios.get(`${baseURL}/relative-humidity`)
        return response.data;
    },
    
    getPSI: async () => {
        const response = await axios.get(`${baseURL}/psi`)
        return response.data;
    },
}

export default WeatherApi