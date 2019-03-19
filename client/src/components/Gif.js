import React, { Fragment, Component } from 'react';
import MaterialIcon, {colorPalette} from 'material-icons-react';


class Gif extends Component {
  render() {
    const { gif }  = this.props
    return (
        <div class="card-image">
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

export default Gif;