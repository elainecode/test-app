import React, { Fragment, Component } from 'react';
import GifList from './GifList'

class GifContainer extends Component {
  render() {
    const {gifs, favorites, toggleFavorites} = this.props
    return (
       <div class="column">
       <GifList 
        gifs={gifs}
        favorites={favorites}
        toggleFavorites={toggleFavorites}

       />
       </div>    
    );
  }
}

export default GifContainer;