import React, { Component } from "react";
import Card from "./Card";
import firebase from "firebase";
class Blogs extends Component {
  state = {
    isLoading: true,
    blogs: []
  };

  getBlogsFromFireBase = () => {
    firebase
      .database()
      .ref("/blogs")
      .once("value")
      .then(blogs => {
        let newBlogsList = [];

        const bolgsObject = blogs.val();

        for (const blog in bolgsObject) {
          newBlogsList = [...newBlogsList, bolgsObject[blog]];
        }

        this.setState({ blogs: newBlogsList, isLoading: false });
      });
  };
  onClickDelete = id => {
    firebase
      .database()
      .ref("blogs/" + id)
      .remove();
    this.getBlogsFromFireBase();
  };

  render() {
    if (this.state.isLoading == true) {
      return <div class="lds-dual-ring" />;
    }

    return (
      <div>
        {this.state.blogs.map(blog => {
          return (
            <Card key={blog.id} onClickDelete={this.onClickDelete} {...blog} />
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    this.getBlogsFromFireBase();
  }
}

export default Blogs;
