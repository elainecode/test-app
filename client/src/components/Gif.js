import React, { Fragment, Component } from 'react';
import { withRouter } from "react-router-dom";
import MaterialIcon, {colorPalette} from 'material-icons-react';


class Gif extends Component {

constructor(props) {
super(props)
  this.state = {
      fave: this.props.favorites.includes(this.props.gif.uid) ? 'favorite' : 'favorite_border'
  }
}

viewGif = () => {
   const { gif }  = this.props
   const title = `/gifs/${gif.title.split(' ').join('-')}-${gif.uid}`
   this.props.history.push(title);
} 

toggleFaves = (fave_value) => {
  this.saveChanges(fave_value)
  this.props.SaveOrDeleteFavorites(this.props.gif.uid) 
}

saveChanges = (fave_value) => {
switch(fave_value) {
  case 'favorite_border':
        this.setState({fave: 'favorite'})
    break;
  case 'favorite':
    this.setState({fave: 'favorite_border'})
    break;
  default:
}
}


handleClick = (e) => {
e.stopPropagation();
console.log(this.props.favorites.includes(this.props.gif.uid))
this.toggleFaves(this.state.fave)
}


  render() {
    const { gif }  = this.props
    const { viewGif,  handleClick } = this
    return (
        <div  onClick={viewGif} class="card-image">
        <span  onClick={handleClick} class="heart">

       { this.state.fave === 'favorite_border' &&
        <MaterialIcon 
        size="small"
        icon='favorite_border'
        color={colorPalette.pink.A100} 
        />
      }

      { this.state.fave === 'favorite' &&
         <MaterialIcon 
        size="small"
        icon='favorite'
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