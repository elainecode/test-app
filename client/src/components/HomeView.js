import React, { Fragment, Component } from 'react';
import GifContainer from './GifContainer'
import ScrollSearch from './ScrollSearch'

class HomeView extends Component {

state = {
  gifs:  [],
  tags: []
}

fetchGifs = ()  => {
  return fetch('/api/v1/gifs')
  .then(response => response.json())
}

fetchTags = ()  => {
  return fetch('/api/v1/tags')
  .then(response => response.json())
}

componentDidMount = () => {
  this.fetchGifs()
  .then(gifs => this.setState({gifs}))
  this.fetchTags()
  .then(tags => this.setState({tags}))  
}

  render() {
    const { gifs, tags }  = this.state
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