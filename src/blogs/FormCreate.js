import React, { Component } from "react";
import _ from "lodash";
import InputErrorMessage from "../UI/InputErrorMessage";
import { generateUniqueId } from "../utilities/utilities";
import firebase from "firebase";

class FormCreate extends Component {
  state = {
    title: "",
    description: "",
    imageUrl: "",
    errors: null
  };

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  verifyFormInputs = fromValues => {
    let errors = {};

    if (fromValues.title == "") {
      errors.title = "empty title !";
    }
    if (fromValues.description == "") {
      errors.description = "empty description !";
    }
    if (fromValues.imageUrl == "") {
      errors.imageUrl = "empty imageUrl !";
    }
    if (_.isEmpty(errors)) return null;
    else return errors;
  };

  onFormSubmit = event => {
    event.preventDefault();

    const verificationResult = this.verifyFormInputs(
      _.pick(this.state, ["title", "description", "imageUrl"])
    );

    if (!verificationResult) {
      const id = generateUniqueId();
      firebase
        .database()
        .ref("blogs/" + id)
        .set({
          id: id,
          title: this.state.title,
          description: this.state.description,
          imageUrl: this.state.imageUrl
        });
      // this.props.history.push("/blogs");
    }
    this.setState({ errors: verificationResult });
  };

  render() {
    const { errors } = this.state;
    console.log("render !", this.state, this.props);
    return (
      <form onSubmit={this.onFormSubmit}>
        <label>
          title:
          <input
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.onInputChange}
          />
          <InputErrorMessage errors={errors} inputName="title" />
        </label>
        <br />
        <label>
          description:
          <input
            name="description"
            type="text"
            value={this.state.description}
            onChange={this.onInputChange}
          />
          <InputErrorMessage errors={errors} inputName="description" />
        </label>
        <br />
        <label>
          imageUrl:
          <input
            name="imageUrl"
            type="text"
            value={this.state.imageUrl}
            onChange={this.onInputChange}
          />
          <InputErrorMessage errors={errors} inputName="imageUrl" />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default FormCreate;
