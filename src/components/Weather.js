import React from 'react'
import '../App.css'

class Weather extends React.Component {

    state = {
        weather: null,
        quote: null

    }

    componentWillMount() {
        this.getWeatherData()
        this.getQuoteData()
    }

    getWeatherData = () => {
        fetch("http://api.openweathermap.org/data/2.5/weather?q=Lublin,pl&units=metric&lang=pl&APPID=0b3d75e5a49f2a267f054a0a60bed6f3")
            .then(response => response.json())
            .then(dataWeather => this.setState({
                weather: dataWeather

            }))
            .catch((err) => console.log(err))
    }

    getQuoteData = () => {
        fetch("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1")
            .then(response => response.json())
            .then(dataQuote => this.setState({
                quote: dataQuote
            }))
            .catch((err) => console.log(err))
    }

    render() {
        //console.log(this.state.weather)
        console.log(this.state.quote)
        return (
            <div>
                <div>
                    {
                        <img
                            src={`http://openweathermap.org/img/w/${this.state.weather && this.state.weather.weather[0].icon}.png`}
                            alt={""}
                        />
                    }
                    {
                        this.state.weather
                        &&
                        this.state.weather.name
                    }
                </div>
                <div>{
                    this.state.weather
                    &&
                    this.state.weather.main.temp
                } &deg;C
                </div>
                <div>
                    {
                        this.state.weather
                        &&
                        this.state.weather.weather[0].description
                    }
                </div>
                <div>{
                    this.state.quote
                    &&
                    this.state.quote[0].content
                }
                </div>
                <div>{
                    this.state.quote
                    &&
                    this.state.quote[0].title
                }
                </div>
            </div>

        )
    }
}

export default Weather