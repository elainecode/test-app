import React, { Fragment, Component } from 'react';
import './css/homeview.css'


class ScrollSearch extends Component {
  render() {
    return (
       <div class="column is-one-quarter">
        <ul id="tag-search">
          <li>
          <span id="search-tag" class="tag">
            Test
           </span>
          </li>
       </ul>
       </div>
    );
  }
}

export default ScrollSearch;