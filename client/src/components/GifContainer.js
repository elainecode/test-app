import React, { Fragment, Component } from 'react';
import GifList from './GifList'

class GifContainer extends Component {
  render() {
    const {gifs} = this.props
    return (
       <div class="column">
       <GifList 
        gifs={gifs}
       />
       </div>    
    );
  }
}

export default GifContainer;