import React from 'react';
import {
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

const rainbow = (index, size = 7) => {
  index = (index % size);
  const d = Math.floor(index * 360 / size);
  return 'hsl(' + d.toString() + ',60%,40%)';
};

const AutoCol = (props) => (
  <div
    style={{
      width: "auto",
      display: "flex",
      flexDirection: "column",
      color: 'white',
      backgroundColor: rainbow(props.level),
      borderRadius: "4px",
      margin: "2px",
      padding: "4px",
      verticalAlign: 'bottom'
    }}
  >
    { props.children }
  </div>
);

const Explanation = ({explanation, level}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row"
    }}
  >
    <AutoCol level={ level } ><b>{ explanation.value }</b></AutoCol>
    <AutoCol level={ level } >{ '=' }{ explanation.description }</AutoCol>
    {
      (explanation.details.length > 0)
      && <AutoCol level={ level }>{
        explanation.details.sort((d, e) => (e.value - d.value)).map((detail, index) => (
          <Explanation key={ index } explanation={ detail } level={ level + 1 }/>
        ))
      }</AutoCol>
    }
  </div>
);

class Scoreboard extends React.Component {

  renderItem(doc, index) {
    const { title, opening_text, language, category} = doc._source;
    return (
      <ListGroupItem key={ index } >
        <h3>{ title }</h3>
        <div
        >
          <Explanation explanation={ doc._explanation } level={ 0 } />
        </div>
      </ListGroupItem>
    );
  }

  render() {
    const thumbnails = this.props.thumbnails;
    const documents = this.props.documents;
    return (
      <ListGroup>
        {
          documents.map((doc, index) => (this.renderItem(doc, index)))
        }
      </ListGroup>
    );
  }

}

export default Scoreboard;

