import React, { Fragment, Component } from 'react';
import { withRouter } from "react-router-dom";
import MaterialIcon, {colorPalette} from 'material-icons-react';


class Gif extends Component {

viewGif = () => {
   const { gif }  = this.props
   const title = `/gifs/${gif.title.split(' ').join('-')}-${gif.uid}`
   this.props.history.push(title);
} 


  render() {
    const { gif }  = this.props
    const { viewGif } = this
    return (
        <div  onClick={viewGif} class="card-image">
        <span class="heart">
        <MaterialIcon 
        size="small"
        icon="favorite_border" 
        color={colorPalette.pink.A100} 
        />
         </span>
          <img  src={gif.url} alt="gif.title"/>
        </div>
    );
  }
}

export default withRouter(Gif);