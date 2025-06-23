import { useState, useRef, useEffect } from "react";
import { SearchSection } from "./Componets/SearchSection";
import { WeatherSection } from "./Componets/WeatherSection";
import { HourlyForcest } from "./Componets/HourlyForcest";
import { weatherCodes } from "./constants";
import { NoResultDiv } from "./Componets/NoResultDiv";

function App() {
    const [currentWeather, setCurrentWeather] = useState({});
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const searchInputRef = useRef(null);
    const [noResult, setNoResult] = useState(false);

    const filterHourlyForecast = (hourlyData) => {
        const currentTime = new Date().setMinutes(0, 0, 0);

        const startIndex = hourlyData.findIndex(({ time }) =>
            new Date(time).getTime() >= currentTime
        );

        const next24HoursData = hourlyData.slice(startIndex, startIndex + 24);
        setHourlyForecast(next24HoursData);
    };

    const getWeatherDetalis = async (API_URL) => {
        setNoResult(false);

        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            const temperature = data.current.temp_c;
            const description = data.current.condition.text;
            const weatherIcon = Object.keys(weatherCodes).find((icon) =>
                weatherCodes[icon].includes(data.current.condition.code)
            );

            setCurrentWeather({ temperature, description, weatherIcon });

            const combineHourlyData = [
                ...data.forecast.forecastday[0].hour,
                ...data.forecast.forecastday[1].hour,
            ];

            setSearchValue(data.location.name);

            filterHourlyForecast(combineHourlyData);

        } catch {
            setNoResult(true);
        }
    };

    useEffect(() => {

        console.log("useEffect running...");


        const defaultCity = 'New York'
        const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=e462fcc5ba8c474d8e2172505252405&q=${defaultCity}&days=2`;
        getWeatherDetalis(API_URL);

    }, [])

    return (
        <div className="
        relative
        flex
        items-center
        justify-center
        min-h-screen
        h-auto
        bg-gradient-to-b from-[var(--app-first-gradient-color)] to-[var(--app-second-gradient-color)]
        after:content-['']
        after:absolute
        after:inset-0
        after:w-full
        after:h-full
        after:bg-[url('/weather-app/clouds.png')]
        after:bg-cover
        after:bg-no-repeat
        after:z-0
">

            <div className="
                relative
                w-full
                max-w-lg
                text-white
                border-4
                border-white
                p-5
                h-full
                costum-s-size
                rounded-3xl	
                "
            >
                <SearchSection
                    getWeatherDetalis={getWeatherDetalis}
                    searchInputRef={searchInputRef}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />

                {noResult ? (
                    <NoResultDiv />
                ) : (

                    <>
                        <WeatherSection currentWeather={currentWeather} />

                        <div className="w-full relative z-10">
                            <ul className="flex overflow-x-auto custom-scrollbar px-4 w-full pb-4">
                                {hourlyForecast.map((hourlyWeather) => (
                                    <HourlyForcest
                                        key={hourlyWeather.time_epoch}
                                        hourlyWeather={hourlyWeather}
                                    />
                                ))}
                            </ul>
                        </div>
                    </>

                )}
            </div>
        </div>
    );
}

export default App;
