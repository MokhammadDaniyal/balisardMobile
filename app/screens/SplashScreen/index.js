import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { getRequest, postRequest, postRequestResponse } from "../../network";
import { storeNews, storeAdminPosts } from "../../store/services/actions";
import LoadingOverlay from "../../components/LoadingOverlay";
import { fetchMasterSuccess } from "../../store/reservation/actions";
import { serverAddress } from "../../network/config";
import { donwloadAndCacheImage } from "../../utils/index";
const SHA1 = require("crypto-js/sha1");
const URL = require("url-parse");

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
      err => {
        alert(err);
      }
    );
    getRequest("services/news", news => {
      this.props.storeNews(news);
      this.props.navigation.navigate(this.props.user.id ? "Home" : "Login");
    });
    getRequest("services/retrieveallmasters", masters => {
      masters.forEach(master => {
        this.props.storeMasters(master);

        const uri =
          serverAddress + "services/retrievemasterimage?id=" + master.id;
        const url = new URL(uri, null, true);

        let cacheable = url.pathname;

        ["id"].forEach(function(k) {
          if (url.query.hasOwnProperty(k)) {
            cacheable = cacheable.concat(url.query[k]);
          }
        });
        const type = url.pathname.replace(/.*\.(.*)/, "$1");
        const cacheKey =
          SHA1(cacheable) +
          (type.length < url.pathname.length ? "." + type : "");
        console.log("SHA1__ " + cacheKey);
        donwloadAndCacheImage(uri, url.host, cacheKey);
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
