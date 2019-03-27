import React, { Fragment, Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import Gif from './Gif'
import ScrollSearch from './ScrollSearch'
import './css/homeview.css'
import MaterialIcon, {colorPalette} from 'material-icons-react';

class HomeView extends Component {

  render() {
    const { gifs, tags, favorites, SaveOrDeleteFavorites, updateInput, tagOnlySearch }  = this.props
    return (
    <>
  <div id="home-header"class="columns home-header-parent">
      <div  class='column is-4 is-offset-1'>

      <div class="hero-header">
      <h1 class="title">Shade Gifs</h1>
    <h2 class="subtitle">The <em>best</em> reaction gifs in one place</h2>
    <div class="header-form">
     <form onSubmit={(e) => e.preventDefault()}>
       <div class="field has-addons">
      <div class="control">
    <input class="input" onChange={updateInput} type="text" placeholder="Search Gifs"/>
       </div>
      <div class="control">
      <input id='header-button' type='submit' class="button" value='search'/>
  </div>
</div>
  </form>
  </div>
  </div>
      </div>
      <div id="img-header" class='column'>
      </div>
      </div>
    <div class="columns">
       <ScrollSearch
        tags={tags}
        tagOnlySearch={tagOnlySearch}
       />
         <div class="column is-10">
           <div id="list">
     { 
        gifs.map(gif => 
          <Gif 
          gif={gif} 
          favorites={favorites} 
          SaveOrDeleteFavorites={SaveOrDeleteFavorites}
          />
          )
       }
      </div>
         </div>
       </div> 
       </>   
    );
  }
}

export default HomeView;