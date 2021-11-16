import React, {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [city, updateCity] = useState("Toronto");
    const [weather, setWeather] = useState('');
    const [temperature, setTemperature] = useState(0);
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState("");

    function handleChange(event) {
        updateCity(event.target.value);
    }

    const apiKey = "a6f518ae0425bd5d7402196d38873879";
    const units = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + units;
    
    const fetchWeather = async () => {
        try {
            const res = await axios.get(url);
            setWeather(res.data.weather[0].main);
            setTemperature(Math.round(res.data.main.temp));
            setDescription(res.data.weather[0].description);
            setIcon("http://openweathermap.org/img/wn/" + res.data.weather[0].icon + "@2x.png")
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchWeather();
    }, [])

    return (
    <div>
        <form className="choose-city">
            <input name="city" onChange={handleChange} value={city} placeholder="City"/>
            <button type="submit" onClick={(event) => {
                event.preventDefault();
                fetchWeather();
                }
            }>Submit</button>
        </form>
        <div>
        <img src={icon}/>
            {weather}, {temperature}, {description}
        </div>
    </div>);
}

export default App;