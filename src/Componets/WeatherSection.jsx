
export const WeatherSection = ({currentWeather}) => {
  return (
<div className=' text-center pb-10 border-b mb-3'>
<img src={`icons/${currentWeather.weatherIcon}.svg`} alt="" className="mx-auto w-45 h-45" />
  <h2 className='text-6xl mb-5'>{Math.floor(currentWeather.temperature)}<span className='text-4xl'>°C</span></h2>
  <p className='text-lg'>{currentWeather.description}</p>
</div>
  )
}

