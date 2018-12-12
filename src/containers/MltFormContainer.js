import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
  Button,
  Form
} from 'reactstrap';

class MltFormContainer extends React.Component {

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <Form onSubmit={ handleSubmit }>
        <Field
          name="freeText" type="text" component="textarea"
          rows="10"
          style={ { width: "100%" } } />
        <div>
          <Button type="submit" color="primary"
            disabled={ submitting } >
            More Like This!
          </Button>
          <Button type="button" color="link"
            disabled={ pristine || submitting }
            onClick={ reset } >
            Clear
          </Button>
        </div>
      </Form>
    );
  }

}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
MltFormContainer = reduxForm({
  form: 'mltForm' // a unique identifier for this form
})(MltFormContainer);

MltFormContainer = connect(
  (state, ownProps) => ({
    initialValues: {
      freeText: 'こんにちは世界。'
    }
  })
)(MltFormContainer);

export default MltFormContainer;

