import React, { Component } from "react";

import { withRouter, Link } from "react-router-dom";

class Card extends Component {
  constructor(props) {
    super(props);
  }

  onClickShowUpdateForm = id => {
    this.props.history.push(`/blogs/update/${id}`);
  };

  render() {
    const { title, description, imageUrl, id } = this.props;
    return (
      <div className="card">
        <div className="card-img-container">
          <img className="card-img" src={imageUrl} />
        </div>
        <h1>{title}</h1>
        <p>{description}</p>

        <button
          onClick={() => {
            this.onClickShowUpdateForm(id);
          }}
        >
          update
        </button>

        <button
          onClick={() => {
            this.props.onClickDelete(id);
          }}
        >
          delete
        </button>
      </div>
    );
  }
}

export default withRouter(Card);
