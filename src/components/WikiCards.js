import React from 'react';
import {
  Card, Button, CardImg, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody
} from 'reactstrap';

const WMPROJ = process.env.REACT_APP_WMPROJ;

const wpurl = (lang, title) => (
  `https://${lang}.${WMPROJ}.org/wiki/${encodeURI(title)}`
);

const wcurl = (lang, category) => (
  `https://${lang}.${WMPROJ}.org/wiki/Category:${encodeURI(category)}`
);

const InfoButton = ({caption, url, index}) => (
  <Button
    key={ index }
    href={ url }
    color="info"
    style={{
      margin: "4px"
    }}
    target="_blank"
  >
    { caption }
  </Button>
);

class WikiCards extends React.Component {

  renderCard(doc, thumbnails, index) {
    const { title, opening_text, language, category} = doc._source;
    const img = thumbnails[title];
    return (
      <Card key={ index } >
        {
          (!!img)
          ? <CardImg top width="100%" src={ img } alt={ title } />
          : <span></span>
        }
        <CardBody>
          <CardTitle>{ title }</CardTitle>
          <CardText>{ (opening_text || "").slice(0, 140) }{ '...' }</CardText>
          <div>
            <InfoButton
              key={ 0 }
              url={ wpurl(language, title) }
              caption="W"
            />
            {
              category.map((cat, index) => (
                <InfoButton
                  key={ index + 1 }
                  url={ wcurl(language, cat) }
                  caption={ cat }
                />
              ))
            }
          </div>
        </CardBody>
      </Card>
    );
  }

  render() {
    const thumbnails = this.props.thumbnails;
    const documents = this.props.documents;
    return (
      <CardColumns>
        {
          documents.map((doc, index) => (this.renderCard(doc, thumbnails, index)))
        }
      </CardColumns>
    );
  }

}

export default WikiCards;

