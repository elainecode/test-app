import React, { Fragment, Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import GifContainer from './GifContainer'
import ScrollSearch from './ScrollSearch'

class HomeView extends Component {

  render() {
    const { gifs, tags }  = this.props
    return (
    <div class="columns">
       <ScrollSearch
        tags={tags}
       />
       <GifContainer
        gifs={gifs}
        />
       </div>    
    );
  }
}

export default HomeView;