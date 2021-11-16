import React, {useEffect, useState} from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";

function WeatherForm(props) {
    // setting all the states
    const [city, updateCity] = useState("City, Country");
    const [weather, setWeather] = useState('');
    const [temperature, setTemperature] = useState(0);
    const [description, setDescription] = useState('');
    const [pressure, setPressure] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [hi, setHi] = useState(0);
    const [lo, setLo] = useState(0);
    const [icon, setIcon] = useState("");
    
    const apiKey = "a6f518ae0425bd5d7402196d38873879";
    const units = "metric";

    // building URL
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + units;
    
    // handling the change for the input. This saves the state of the input value
    function handleChange(event) {
        updateCity(event.target.value);
    }
    // when input is clicked, this empties the input
    function handleClick(){
        updateCity("");
    }
    
    // gets the weather from the API
    const fetchWeather = async () => {
        try {
            const res = await axios.get(url);
            
            //setting the states of the variables
            setWeather(res.data.weather[0].main);
            setTemperature(Math.round(res.data.main.temp));
            setDescription(res.data.weather[0].description);
            setPressure(res.data.main.pressure);
            setHumidity(res.data.main.humidity);
            setHi(Math.round(res.data.main.temp_max));
            setLo(Math.round(res.data.main.temp_min));
            setIcon("http://openweathermap.org/img/wn/" + res.data.weather[0].icon + "@2x.png")
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchWeather();
    },["Toronto, CA"]) // need the dependancy array []

    return (
        <div className="center">
        
                <form>

                <div className="justify-content-center input-group">
                <input className="form-control-sm" name="city" type="text" onClick={handleClick} onChange={handleChange} value={city} placeholder="City, Country" autoComplete="off"/>
                <button className="btn btn-dark" type="submit" onClick={(event) => {
                        event.preventDefault();
                        fetchWeather();
                        }
                    }>Submit</button>
                </div>
                </form>
            <div>
                <WeatherInfo
                icon={icon}
                location={city}
                weather={weather}
                temperature={temperature}
                description={description}
                humidity={humidity}
                pressure={pressure}
                hi={hi}
                lo={lo}
                />
            </div>
        </div>

    );
}

export default WeatherForm;