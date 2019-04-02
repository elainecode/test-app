import React, { Fragment, Component } from 'react';
import { withRouter } from "react-router-dom";
import MaterialIcon, {colorPalette} from 'material-icons-react';


class Gif extends Component {


state = {
  fave: this.props.favorites.includes(this.props.gif.uid) 
}
  

viewGif = () => {
   const { gif }  = this.props
   const title = `/gifs/${gif.title.split(' ').join('-')}-${gif.uid}`
   this.props.history.push(title);
} 

toggleFaves = () => {
  this.setState({fave: !this.state.fave})
  this.props.SaveOrDeleteFavorites(this.props.gif.uid) 
}


handleClick = (e) => {
e.stopPropagation();
this.toggleFaves()
}


  render() {
    const { gif }  = this.props
    const { viewGif,  handleClick } = this
    return (
        <div  onClick={viewGif} class="card-image">
        <span  onClick={handleClick} class="heart">

    { 
      this.state.fave &&

        <MaterialIcon 
        size="small"
        icon='favorite'
        color={colorPalette.pink.A100} 
        />
    }
      {

      !this.state.fave &&

       <MaterialIcon 
        size="small"
        icon='favorite_border'
        color={colorPalette.pink.A100} 
        />

      }
    
    
         </span>
        
        
          <img  src={gif.url} alt="gif.title"/>
        </div>
    );
  }
}

export default withRouter(Gif);