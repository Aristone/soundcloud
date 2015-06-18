"use strict";


// es5 polyfills, powered by es5-shim
require("es5-shim")
// es6 polyfills, powered by babel
require("babel/register")

var Promise = require('es6-promise').Promise
// just Node?
// var fetch = require('node-fetch')
// Browserify?
// require('whatwg-fetch') //--> not a typo, don't store as a var

// other stuff that we don't really use in our own code
// var Pace = require("../bower_components/pace/pace.js")

// require your own libraries, too!
// var Router = require('./app.js')

// window.addEventListener('load', app)

// function app() {
    // start app
    // new Router()
// }

// SC.initialize({
//   client_id: "5b8f3d60c3820482bc3fdef04ffdde6f",
//   redirect_uri: "http://example.com/callback",
// });

// SC.get("/users/{210097699}/tracks", {limit: 1}, function(tracks){
//   alert("Latest track: " + tracks[0].title);
// });

  SC.initialize({
    client_id: "5b8f3d60c3820482bc3fdef04ffdde6f",
    redirect_uri: "http://example.com/callback",
  });




var Backbone = require('backbone')
var React = require('react')
var apikey = '5b8f3d60c3820482bc3fdef04ffdde6f'
var qs = (s, d) => (d || document).querySelector(s)


var SoundcloudCollection = Backbone.Collection.extend({
    url: `https://api.soundcloud.com/tracks?client_id=${apikey}&limit=1`
})

class SoundcloudItem extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        var url = this.props.item.get('permalink_url'),
            artwork_url = this.props.item.get('artwork_url');
            console.log(artwork_url);
            if(!(artwork_url)){ 
                artwork_url = 'https://developers.soundcloud.com/assets/powered_by_large_black-64fec369eec44b7ee75119f288c6d010.png';
            }
            // img = artwork_url ? (<img src={artwork_url} />) : '';
            var img = <img src={artwork_url} size= "200"  />

            var track_title = this.props.item.get('title'),
            title = this.props.item.get('title');

            var favorites = this.props.item.get('favoritings_count'),
            favorites = this.props.item.get('favoritings_count');


            var username = this.props.item.get('user').username,
            username = this.props.item.get('user').username;

            var plays = this.props.item.get('playback_count'),
            plays = this.props.item.get('playback_count');

            // var player = this.props.item.get()

        return (
            <div>
                <div className="art" >
                    <a href={url}>{img}</a>
                </div>
                    <div className="soundbar"> 
                    {track_title} {username} 
                </div>
                //     <div player="player">
                //     {          }
                // </div>    
                    <div className="bottom_bar"> 
                    {plays} {favorites} 
                </div>

            </div>                 
        )
    }
}

class SoundcloudItems extends React.Component {
    constructor(props){
        super(props)
        this.props.items.on('sync', () => this.forceUpdate()) //--> Backbone.Collection
    }

    render() {
        return (<div>
            { this.props.items.map((model) => <SoundcloudItem item={model} key={model.id}/>) }
            </div>)
    }
}

// class Bottom_bar extends React.Component {
//        constructor(props){
//         super(props)
//     }
//     render(){
//         var  = this.props.item.get('permalink_url'),
//             artwork_url = this.props.item.get('artwork_url'),
//             img = artwork_url ? (<img src={artwork_url} />) : '';

//         return (
//             <a href={url}>
//                 {img}
//             </a>
//         )
//     }
// }

var collection = new SoundcloudCollection()
React.render(<SoundcloudItems  items={collection} />, qs('.container'))
collection.fetch().then(() => {
    console.log(collection)
})

