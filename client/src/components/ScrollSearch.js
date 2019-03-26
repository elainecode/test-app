import React, { Fragment, Component } from 'react';
import './css/homeview.css'


class ScrollSearch extends Component {
  render() {
    const { tags } = this.props
    return (
       <div class="column is-1 is-offset-1">
        <ul id="tag-search">
          
         { tags.map( t => { 
          return (
          <li>
          <span id="search-tag" class="tag">
          {t.tagname}
           </span>
           </li>
           )
          })
       }
    
       </ul>
       </div>
    );
  }
}

export default ScrollSearch;