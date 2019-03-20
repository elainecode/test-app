import React, { Fragment, Component } from 'react';
import { Route, Link } from "react-router-dom";
import RelatedTags from './RelatedTags'
import 'bulma/css/bulma.css'
import './css/gifview.css'
import MaterialIcon, {colorPalette} from 'material-icons-react';


class GifView extends Component {

  findGif = () => {
    const {gifs} = this.props
    const {title} = this.props.match.params
    let id = title.slice(title.search(/\d/))
    console.log("id:", id)
    return {...gifs.find(gif => gif.uid.includes(id))}
  }

  findRelatedGifs = () => {
    
  }

  
  render() {

    const gif = this.findGif()
 
    return (   
        <div class="columns">
        <div class="column"></div>
          <div class="column is-two-thirds">
            <div id="gifselected" class="card-image">
              <img  src={gif.url} alt={gif.title}/>
         </div>
            <hr></hr>
            <p class="buttons">
             <a class="button is-medium">
            <span class="icon is-small">
             <MaterialIcon 
        size="small"
        icon="save_alt" 
        color="#000" 
        />
        </span>
        </a>
        <a class="button is-medium">
            <span class="icon is-small">
             <MaterialIcon 
        size="small"
        icon="link" 
        color="#000" 
        />
        </span>
        </a>
            </p>
            <hr></hr>
            <p class="buttons">
            <RelatedTags tags={gif.tags} />
            </p>
          </div>
          <div class="column">
         
          
          </div>
       </div>

    );
  }
}


export default GifView;