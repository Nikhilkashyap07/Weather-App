import React, { useState } from 'react'


const Weather = () => {

  const api_key = import.meta.env.VITE_API_KEY

  
  const [city, setcity] = useState("");
  const [weatherdata, setweatherData] = useState("null");
  const [error, setError] = useState("");


  const handleweather =async()=>{

    try {
      setError("")
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`);
    if(!response.ok) throw new Error("City Not Found...😒")

  const livedata = await response.json();
  setweatherData(livedata);
  console.log(livedata); 
      
    } catch (error) {
      setweatherData("");
      setError(error.message);
      
    }
    
};
 

  return (
    <div className=' bg-image bg-cover min-h-screen flex flex-col items-center justify-center '> 
      <div className='w-full max-w-md bg-blue-300 bg-opacity-60 rounded-lg p-6'> 
        {city}
          <h1 className='text-5xl font-bold text-center my-4'>Weather App🌍</h1>
          <div className='flex flex-col gap-7'>
            <input type="text" placeholder='Enter City Name...'  className=' shadow-2xl p-3 rounded-xl text-black focus:outline-none' value={city} onChange={(e)=>{setcity(e.target.value)}} onKeyDown={(e)=>e.key === "Enter" && handleweather()}/>
            <button className='bg-white py-2 text-blue-800 font-bold rounded-xl hover:bg-blue-700 hover:text-white ' onClick={handleweather}>Search Weather🔍</button>
          </div>

          {
            error && <p className='text-red-800 text-center font-bold pt-2'>{error}</p>
          }
          {
            weatherdata && (
            <div className='mt-6 text-center'>
            <img src={` https://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`} alt="Cloud" className='mx-auto h-32 w-32 object-contain mb-4' />
            <h2 className='text-3xl font-bold'>{weatherdata.name}/{weatherdata.sys.country}</h2>
            <p className='text-xl capitalize'>{weatherdata.weather[0].description}</p>
            <p className='text-5xl font-semibold mt-2  '>{weatherdata.main.temp}°C</p>

            <div className='grid grid-cols-3 gap-4 mt-6 text-sm text-black'>
              <div className='bg-black bg-opacity-25 rounded-xl p-2'>
                <p className='font-semibold'>Humidity</p>
                <p>{weatherdata.main.humidity}%</p>
              </div>
              <div className='bg-black bg-opacity-25 rounded-xl p-2'>
                <p className='font-semibold'>Wind</p>
                <p>{weatherdata.wind.speed} M/S</p>
              </div>
              <div className='bg-black bg-opacity-25 rounded-xl p-2'>
                <p className='font-semibold'>Clouds</p>
                <p>{weatherdata.clouds.all}%</p>
              </div>
            </div>
          </div>

          )}
          

      </div>
    </div>
  )
}


export default Weather