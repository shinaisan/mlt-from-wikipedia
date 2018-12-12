import React from 'react';
import WikiCards from '../components/WikiCards';

class WikiCardsContainer extends React.Component {

  render() {
    const thumbnails = this.props.thumbnails;
    const documents = this.props.documents;
    return (
      <WikiCards
        thumbnails={ thumbnails }
        documents={ documents }
      />
    );
  }

}

export default WikiCardsContainer;

