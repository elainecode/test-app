import React, { Fragment, Component } from 'react';


class Gif extends Component {
  render() {
    const { gif }  = this.props
    return (
        <div class="card-image">
         <div class="overlay"></div>
          { <img  src={gif.url} alt="gif.title"/> }
        </div>
    );
  }
}

export default Gif;