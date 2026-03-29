import { weatherCodes } from "../constants";

export const HourlyForcest = ({ hourlyWeather }) => {

    const temperature = Math.floor(hourlyWeather.temp_c);
    const time = hourlyWeather.time.split(" ")[1].substring(0, 5);

    // 🔧 Fix: fallback icon nëse nuk gjendet match
    const weatherIcon = Object.keys(weatherCodes).find(icon =>
        weatherCodes[icon].includes(hourlyWeather.condition.code)
    ) || "clear";

    return (
        <li className="mr-15 flex-shrink-0 text-center last:mr-0">
            <p>{time}</p>

            <img
                src={`${import.meta.env.BASE_URL}icons/${weatherIcon}.svg`}
                alt="weather icon"
                className="w-10 h-10 mx-auto"
            />

            <p>{temperature}°</p>
        </li>
    );
};