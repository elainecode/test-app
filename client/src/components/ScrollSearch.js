import React, { Fragment, Component } from 'react';
import './css/homeview.css'


class ScrollSearch extends Component {
    state = {
      filterByTag: false
    }
     handleClick = (e) => {
      e.preventDefault()
      this.setState({filterByTag: !this.state.filterByTag})
      this.props.tagOnlySearch(e)
    }
  render() {
    const { tags, tagOnlySearch} = this.props
    const { filterByTag } = this.state
    return (
       <div class="column is-1 is-offset-1">
        <ul id="tag-search">
         { 
          filterByTag
      ? <input type='submit' value='Remove Filter' onClick={this.handleClick}/>
      :  tags.map( t => { 
          return (
          <li onClick={this.handleClick}>
          <span id="search-tag">
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