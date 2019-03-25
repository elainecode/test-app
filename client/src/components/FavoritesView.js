import React, { Fragment, Component } from 'react';
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Gif from './Gif'
import 'bulma/css/bulma.css'
// import './css/gifview.css'
import MaterialIcon, {colorPalette} from 'material-icons-react';


class FavoritesView extends Component {
  
  getFavorites = () => {
    if(!this.props.isLoggedIn){
      this.props.history.push('/');
    }
   else {
   }
} 

  
  render() {
    return (   
        <div class="columns">
        <h1>FAVORITES PAGE</h1>
          <div class="column"></div>
            <div class="column is-three-fifths"></div>
          <div class="column"> </div>
       </div>

    );
  }
}


export default FavoritesView;