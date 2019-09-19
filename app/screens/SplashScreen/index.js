import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { getRequest } from "../../network";
import { storeNews, storeAdminPosts } from "../../store/services/actions";
import LoadingOverlay from "../../components/LoadingOverlay";

class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getRequest(
      "instagram/adminposts",
      posts => {
        this.props.storeAdminPosts(posts);
      },
      () => {}
    );
    getRequest("services/news", news => {
      this.props.storeNews(news);
      this.props.navigation.navigate(this.props.user.id ? "Home" : "Login");
    });
  }
  render() {
    return <LoadingOverlay />;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeNews: news => dispatch(storeNews(news)),
    storeAdminPosts: posts => dispatch(storeAdminPosts(posts))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen);
