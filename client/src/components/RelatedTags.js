import React, { Fragment, Component } from 'react';



class RelatedTags extends Component {
  render() {
    const { tags } = this.props
    return (
        <>
         {
            tags.map( tag =><a class="button is-info">{tag.tagname}</a>)
          }
     </>
    );
  }
}

export default RelatedTags;

