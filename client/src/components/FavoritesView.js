import React, { Fragment, Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Gif from './Gif'
import 'bulma/css/bulma.css'
import './css/homeview.css'
import MaterialIcon, {colorPalette} from 'material-icons-react';

class FavoritesView extends Component {

  
  getAuth = () => {
    if(this.props.isLoggedIn === false){
      this.props.history.push('/');
    } 
}

componentDidMount = () => {
 this.getAuth()
}

  render() {
    const {gifs, favorites, SaveOrDeleteFavorites} = this.props
    return (
        <div class="columns">
          <div class="column is-1 is-offset-1">
          </div>
            <div class="column is-10">
      
      <div id="list">
  
     { 
      gifs

      ? gifs.map(gif => {
       return (
         <Gif 
          gif={gif} 
          favorites={favorites} 
          SaveOrDeleteFavorites={SaveOrDeleteFavorites}
        />
       )
       })

      : null

       }

              </div>
            </div>
          <div class="column">
           </div>
       </div>
     

    );
  }
}


export default FavoritesView;