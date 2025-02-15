const axios = require('axios');

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getWeather = async (city) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: OPENWEATHER_API_KEY,
                units: 'metric', // 섭씨 온도
                lang: 'kr' // 한국어 응답
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        return null;
    }
};

module.exports = { getWeather };