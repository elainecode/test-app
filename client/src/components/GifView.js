import React, { Fragment, Component } from 'react';
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Gif from './Gif'
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
    const tags = this.findGif().tags || [" 404 "] 
    const uid  = this.findGif().uid  || "404"
    const { gifs } = this.props
    const related = []
    for(let i = 0; i < gifs.length; i++) {
      for(let j = 0; j < gifs[i].tags.length; j++){
        if(related.length >= 5) {
          return related;
        }
        if(tags.includes(gifs[i].tags[j]) && gifs[i].uid != uid) {
          if(!related.includes(gifs[i])){
          related.push(gifs[i])
        }
        }
      }
    }
    return related;

  }

  viewGif = (event) => {
   const {gifs} = this.props
   const alt = event.target.getAttribute('alt')
   const gif = {...gifs.find(gif => gif.title.includes(alt))}
   const title = `/gifs/${gif.title.split(' ').join('-')}-${gif.uid}`  
   this.props.history.push(title);
} 

  
  render() {

    const gif = this.findGif()
    const related = this.findRelatedGifs()
    return (   
        <div class="columns">
          <div class="column is-one-fifth"></div>
            <div class="column is-three-fifths">
            <h4 class="title spacer">{gif.title} gif</h4>
              <div id="gifselected" class="card-image">
                <img  src={gif.url} alt={gif.title}/>
            </div>
            <hr/>
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
            <a id="twitter" class="button is-medium">
            <span class="icon is-small">
             <FontAwesomeIcon 
              size="sm"
              icon={['fab', 'twitter']}
              color='white' 
              />
            </span>
            </a>
            <a id="tumblr" class="button is-medium">
            <span class="icon is-small">
             <FontAwesomeIcon 
              size="xs"
              icon={['fab', 'tumblr']}
              color='white'
              />
            </span>
            </a>
            <a id="facebook" class="button is-medium">
            <span class="icon is-small">
             <FontAwesomeIcon 
              size="xs"
              icon={['fab', 'facebook-f']}
              color='white'
              />
            </span>
            </a>
            </p>
            <hr/>

            <p class="buttons">
              { 
                gif.tags
                ? gif.tags.map( tag => {
                  return <a id="tagname"class="button is-info">{tag}</a>
                })
                : null
              }      
            </p>
              <hr/>
          </div>
          <div class="column">
          <h4 class="title spacer">Related</h4>
           <div class="related">
           { 
        related
        ? related.map(gif => { 
          return (
             <div class="related-img">
                <span class="heart">
        <MaterialIcon 
        size="small"
        icon="favorite_border" 
        color={colorPalette.pink.A100} 
        />
         </span>
              <img  onClick={this.viewGif} src={gif.url} alt={gif.title}/>
              </div>
            )
        })
        : null

       }</div>
          </div>
       </div>

    );
  }
}


export default GifView;