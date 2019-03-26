import React, { Fragment, Component } from 'react';
import GifList from './GifList'

class GifContainer extends Component {
  render() {
    const {gifs, favorites, SaveOrDeleteFavorites} = this.props
    return (
       <div class="column is-10">
       <GifList 
        gifs={gifs}
        favorites={favorites}
        SaveOrDeleteFavorites={SaveOrDeleteFavorites}

       />
       </div>    
    );
  }
}

export default GifContainer;