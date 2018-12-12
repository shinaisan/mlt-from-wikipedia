import React from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap';
import api from '../api';
import MltFormContainer from '../containers/MltFormContainer';
import WikiCardsContainer from '../containers/WikiCardsContainer';
import Scoreboard from '../components/Scoreboard';
import qs from 'querystring';
import classnames from 'classnames';

const MAX_TEXT_LENGTH = 1024;

const INITIAL_STATE = {
  mlt: {
    documents: [],
    thumbnails: {}
  },
  activeTab: 'main'
};

class MltContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.toggle = this.toggle.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  handleSubmit(formValues) {
    const freeText = formValues.freeText.slice(0, MAX_TEXT_LENGTH);
    const query = {
      freeText,
      size: 10
    };
    const apiPath = '/api/mlt?' + qs.encode(query);
    return api(apiPath, {}).then((data) => {
      this.setState({
        mlt: {
          documents: data.documents,
          thumbnails: this.getThumbnails(data)
        }
      });
    }).catch((e) => {
      console.error(e);
      this.setState(INITIAL_STATE);
    });
  }

  getThumbnails(mlt) {
    const thumbnails = mlt.thumbnails;
    return Object.values(thumbnails).reduce((dict, page) => (
      dict[page.title] = (page.thumbnail && page.thumbnail.source), dict
    ), {});
  }

  render() {
    const handleSubmit = this.handleSubmit.bind(this);
    const mlt = this.state.mlt;
    return (
      <div>
        <MltFormContainer
          onSubmit={ handleSubmit }
        />
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'main' })}
                onClick={() => { this.toggle('main'); }}
              >
                Main
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'score' })}
                onClick={() => { this.toggle('score'); }}
              >
                Score
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={ this.state.activeTab }>
            <TabPane tabId="main">
              <WikiCardsContainer
                documents={ mlt.documents }
                thumbnails={ mlt.thumbnails }
              />
            </TabPane>
            <TabPane tabId="score">
              <Scoreboard
                documents={ mlt.documents }
              />
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }

}

export default MltContainer;

