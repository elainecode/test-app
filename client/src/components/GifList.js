import React, { Fragment, Component } from 'react';
import Gif from './Gif'
import './css/homeview.css'

class GifList extends Component {
  render() {
    const { gifs } = this.props
    return (
      <div id="list">
     { 
        gifs.map(gif => <Gif gif={gif}/>)

       }
      </div>
    );
  }
}

export default GifList;