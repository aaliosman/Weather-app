import React, { useState, useEffect } from 'react';
const axios = require('axios');

const WheatherApp = () => {
    
  const [location, setLocation] = useState('');
    const [apiData, setApiData] = useState('');
    const [input, setInput] = useState('berlin'); 
    
    const getLocation = () => {

      axios.get('https://geolocation-db.com/json/d802faa0-10bd-11ec-b2fe-47a0872c6708')
      .then(res => setLocation(res))
      console.log(location)
    }
    useEffect(() => {
      getLocation()
    }, []);
    

    const getData = () => {
      
      const api = {
  
        key: "08aaac1c333ae525706d3277afad236a",
        base: "https://api.openweathermap.org/data/2.5/"
    }
    axios.get(`${api.base}weather?q=${input.toUpperCase()}&units=metric&APPID=${api.key}`)
     .then((response) => {
         setApiData(response.data); 
     })
}

    useEffect(() => {
      getData();
    }, []);

  return (
    <div className='container'>
       <div className="info">
         
       <input type="text"
       placeholder='Select City name'
       defaultValue={input}
       onKeyPress={(e) => {
         if(e.code === 'Enter'){
          getData()
         }
       }}
       onChange={(e) => {setInput(e.target.value)}}
       />   

       {
           console.log(apiData)
       }
       
       <div className="weather-info">
          {
              apiData !== '' ?
              
              <div className="city">
                  <h1> {apiData.name}  </h1>
                   <div className="temp">
                        <span className="main-deg">  {Math.ceil(apiData.main.temp)}°  </span>
                        <p className="fells-like"> feels like <br/> {parseInt(apiData.main.feels_like)}°  </p>
                        <h1> {apiData.weather[0].main} </h1>
                        
                        <div className="temp-child">
                           <span> max {Math.ceil(apiData.main.temp_max)} </span>
                           <span> min {Math.floor(apiData.main.temp_min)}  </span>
                        </div>
                        
                    </div>
                     <div className="wind">
                     <span className="main-wind">  wind </span>
                       <div className="wind-child">
                       <p>deg {apiData.wind.deg} </p> 
                        <p>speed {apiData.wind.speed} km/h </p> 
                        </div>
                        </div>
                </div>
                :
                null
          }
        </div>
        </div>
    </div>
  )
}

export default WheatherApp;