import React, { Fragment, Component } from 'react';
import Gif from './Gif'
import './css/homeview.css'

class GifList extends Component {
  render() {
    const {gifs, favorites, toggleFavorites} = this.props
    return (
      <div id="list">
     { 
        gifs.map(gif => <Gif gif={gif} favorites={favorites} toggleFavorites={toggleFavorites}/>)

       }
      </div>
    );
  }
}

export default GifList;