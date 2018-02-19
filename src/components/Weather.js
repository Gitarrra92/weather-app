import React from 'react'
import '../App.css'
import moment from 'moment'
import entities from 'html-entities'

class Weather extends React.Component {

    state = {
        weather: null,
        quote: null,
        geo: null

    }

    componentWillMount() {
        this.getGeoData()

        this.getQuoteData()

    }


    getWeatherData = () => {
        //const city = this.state.geo.city ? this.state.geo.city : "Lublin"; //if your IP is banned on ip-api hardcode "Lublin" :)
        //const countryCode = this.state.geo.countryCode ? this.state.geo.countryCode : "pl";
        const lat = this.state.geo.lat ? this.state.geo.lat : "51.2441";
        const lon = this.state.geo.lon ? this.state.geo.lon : "22.513";
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&&lang=en&APPID=dabd8394d3f47226e331477d5ccf265e`)
            .then(response => response.json())
            .then(dataWeather => this.setState({
                weather: dataWeather
            }))
            .catch((err) => console.log(err))
    }


    getGeoData = () => {
        fetch("http://ip-api.com/json")
            .then(response => response.json())
            .then(dataGeo => {this.setState ({
                geo : dataGeo
            })
                this.getWeatherData()
            })
            .catch((err) => console.log(err))
    }

    getQuoteData = () => {
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        let targetUrl = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'
        fetch(proxyUrl + targetUrl)
            .then(response => response.json())
            .then(dataQuote => this.setState({
                quote: dataQuote
            }))
            .catch((err) => console.log(err))
    }

    render() {

        //console.log(this.state.geo)
        return (
            <div className={
                this.state.weather
                &&
                this.state.weather.main.temp < 0 ?
                    " main cold"
                    :
                    "main warm"
            }>
                <div className="icon">
                    {
                        <img
                            src={`${process.env.PUBLIC_URL}/img/${this.state.weather && this.state.weather.weather[0].icon}.svg`}
                            alt={""}
                        />
                    }
                </div>
                <div className="city">
                    {
                        this.state.geo
                        &&
                        this.state.geo.city
                    }
                </div>
                <div className="temperature">{
                    this.state.weather
                    &&
                    this.state.weather.main.temp
                } &deg;
                </div>
                <div className="description">
                    {
                        this.state.weather
                        &&
                        this.state.weather.weather[0].description
                    }
                </div>
                <div className="quote"> {
                    this.state.quote
                    &&
                    entities.AllHtmlEntities.decode(this.state.quote[0].content.replace('<p>','').replace('</p>',''))
                }
                </div>
                <div className="quote-title">{
                    this.state.quote
                    &&
                    this.state.quote[0].title
                }
                </div>
                <div className="datetime">
                    {
                        moment().format("dddd, MMMM Do YYYY")
                    }
                </div>
            </div>

        )
    }
}

export default Weather