import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { getRequest, postRequest, postRequestResponse } from "../../network";
import { storeNews, storeAdminPosts } from "../../store/services/actions";
import LoadingOverlay from "../../components/LoadingOverlay";
import { fetchMasterSuccess } from "../../store/reservation/actions";

class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  getMasterImage = master => {
    return new Promise((resolve, reject) => {
      postRequestResponse(
        "services/retrievemasterimage",
        { id: master.id },
        response => {
          response.json().then(responseJson => {
            master.image = responseJson.image;
            resolve(this.props.storeMasters(master));
          });
        }
      );
    });
  };
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
    getRequest("services/retrieveallmasters", masters => {
      masters.forEach(master => {
        this.props.storeMasters(master);
        // this.getMasterImage(master);
      });
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
    storeAdminPosts: posts => dispatch(storeAdminPosts(posts)),
    storeMasters: masters => dispatch(fetchMasterSuccess(masters))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
