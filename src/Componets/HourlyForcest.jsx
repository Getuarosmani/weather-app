import { weatherCodes } from "../constants"


export const HourlyForcest = ({hourlyWeather}) => {

    const temperature = Math.floor(hourlyWeather.temp_c);
    const time = hourlyWeather.time.split(' ')[1].substring(0, 5);
    const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(hourlyWeather.condition.code));


    return (
        <li className="mr-15 flex-shrink-0 text-center last:mr-0">
            <p>{time}</p>
            <img src={`icons/${weatherIcon}.svg`} alt="cloud" className="w-10 h-10 mx-auto" />
            <p>{temperature}°</p>
        </li>
    )
}