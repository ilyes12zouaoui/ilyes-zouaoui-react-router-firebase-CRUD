import React, { Component } from "react";
import _ from "lodash";
import InputErrorMessage from "../UI/InputErrorMessage";
import firebase from "firebase";

class FormUpdate extends Component {
  state = {
    isLoading: true,
    id: "",
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

  onCancel = () => {
    this.props.history.push("/blogs/create");
  };

  onFormSubmit = event => {
    event.preventDefault();

    const verificationResult = this.verifyFormInputs(
      _.pick(this.state, ["title", "description", "imageUrl"])
    );
    if (!verificationResult) {
      let newBlog = {
        id: this.state.id,
        title: this.state.title,
        description: this.state.description,
        imageUrl: this.state.imageUrl
      };

      firebase
        .database()
        .ref("blogs/" + this.state.id)
        .set(newBlog);

      this.props.history.push("/blogs");
    }

    this.setState({ errors: verificationResult });
  };

  componentDidMount() {
    firebase
      .database()
      .ref("/blogs/" + this.props.match.params.id)
      .once("value")
      .then(blogs => {
        const bolgObject = blogs.val();

        this.setState({ ...bolgObject, isLoading: false });
      });
  }

  render() {
    const { errors } = this.state;
    if (this.state.isLoading == true) {
      return <div class="lds-dual-ring" />;
    }
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
        <input type="submit" value="update" />
        <button onClick={this.onCancel}>cancel</button>
      </form>
    );
  }
}

export default FormUpdate;
