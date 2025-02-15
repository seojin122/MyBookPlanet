const axios = require('axios');
require('dotenv').config();

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const GOOGLE_GEOCODING_API_KEY = process.env.GOOGLE_GEOCODING_API_KEY;

const getWeatherData = async (req, res) => {
    let { address } = req.query;

    // 기본 좌표 (서울)
    let lat = "37.5665";
    let lon = "126.9780";
    let formattedAddress = "서울시";

    // 주소가 입력되면 Google Geocoding API를 사용해 위도, 경도로 변환
    if (address) {
        const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&language=ko&key=${GOOGLE_GEOCODING_API_KEY}`;
        try {
            const geoResponse = await axios.get(geoUrl);
            const geoData = geoResponse.data;
            if (geoData.status === 'OK') {
                lat = geoData.results[0].geometry.location.lat;
                lon = geoData.results[0].geometry.location.lng;
                formattedAddress = geoData.results[0].formatted_address;
            } else {
                return res.status(400).json({ error: '주소를 찾을 수 없습니다.' });
            }
        } catch (error) {
            return res.status(500).json({ error: `Geocoding API 요청 실패: ${error.message}` });
        }
    }

    // OpenWeather API로 날씨 데이터 요청
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=kr`;

    try {
        const weatherResponse = await axios.get(weatherUrl);
        const weatherData = weatherResponse.data;
        weatherData.formatted_address = formattedAddress;

        // 📌 날씨 기반 책 추천 함수 실행
        const bookRecommendation = recommendBook(weatherData);

        return res.json({
            weather: weatherData,
            book_recommendation: bookRecommendation
        });
    } catch (error) {
        return res.status(500).json({ error: `날씨 정보를 가져오는데 실패했습니다: ${error.message}` });
    }
};

module.exports = { getWeatherData };



//책 추천 함수
const recommendBook = (weatherData) => {
    const temp = weatherData.main.temp; // 현재 기온
    const weatherCondition = weatherData.weather[0].main.toLowerCase(); // 날씨 상태

    // 📌 날씨 조건별 추천 도서 목록
    const bookList = {
        rain: {
            title: "우산 없이 온 하루",
            author: "이도우",
            description: "비 오는 날 감성을 담은 따뜻한 소설",
            reason: "비 오는 날엔 잔잔한 감성이 담긴 소설이 어울려요!"
        },
        cloud: {
            title: "구름 속의 산책",
            author: "무라카미 하루키",
            description: "우울한 날씨에 위로가 되는 이야기",
            reason: "흐린 날엔 잔잔한 산책 같은 소설이 좋아요!"
        },
        clear: {
            title: "햇살 속으로",
            author: "존 그린",
            description: "밝은 날씨에 잘 어울리는 따뜻한 이야기",
            reason: "햇살이 가득한 날엔 가벼운 소설이 딱이에요!"
        },
        cold: {
            title: "겨울에 읽는 따뜻한 이야기",
            author: "히가시노 게이고",
            description: "추운 날씨에 따뜻한 감동을 주는 소설",
            reason: "추운 날엔 따뜻한 감성이 담긴 이야기가 좋아요!"
        },
        hot: {
            title: "여름의 문",
            author: "로버트 하인라인",
            description: "여름을 배경으로 한 흥미진진한 소설",
            reason: "더운 날엔 시원한 SF 소설이 제격이에요!"
        },
        default: {
            title: "어떤 날이든 좋은 책",
            author: "파울로 코엘료",
            description: "날씨에 상관없이 감동을 주는 이야기",
            reason: "특별한 날이 아니어도, 좋은 책은 언제나 함께할 수 있어요!"
        }
    };

    // 📌 날씨 조건에 맞는 책 추천
    if (weatherCondition.includes("rain")) {
        return bookList.rain;
    } else if (weatherCondition.includes("cloud")) {
        return bookList.cloud;
    } else if (weatherCondition.includes("clear")) {
        return bookList.clear;
    } else if (temp < 5) {
        return bookList.cold;
    } else if (temp > 25) {
        return bookList.hot;
    } else {
        return bookList.default;
    }
};
