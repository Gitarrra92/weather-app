import React from 'react'
import '../App.css'

class Weather extends React.Component {

    state = {
        weather: null

    }

    componentWillMount() {
        this.getWeatherData()
    }

    getWeatherData = () => {
        fetch("http://api.openweathermap.org/data/2.5/weather?q=Lublin,pl&units=metric&lang=pl&APPID=0b3d75e5a49f2a267f054a0a60bed6f3")
            .then(response => response.json())
            .then(dataWeather => this.setState({
                weather: dataWeather

            }))
            .catch((err) => console.log(err))
    }

    render() {
        console.log(this.state.weather)
        return (
            <div>
                <div>
                    {
                        this.state.weather
                        &&
                        this.state.weather.name
                    }
                </div>
            </div>

        )
    }
}

export default Weather