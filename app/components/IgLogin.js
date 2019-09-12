import React, { Component } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import InstagramLogin from "react-native-instagram-login";
import CookieManager from "react-native-cookies";
class IgLogin extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <InstagramLogin
          ref={ref => (this.instagramLogin = ref)}
          clientId="7f39e8031a194049821011f4ffb86ead"
          redirectUrl="http://balisard.kz"
          scopes={["basic"]}
          onLoginSuccess={token => {
            this.props.igTokenSuccess(token);
          }}
          onLoginFailure={data => console.log(data)}
          cacheEnabled={false}
          incognito={true}
          thirdPartyCookiesEnabled={false}
          sharedCookiesEnabled={false}
          domStorageEnabled={false}
        />
        <TouchableWithoutFeedback onPress={() => this.instagramLogin.show()}>
          {this.props.child}
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default IgLogin;

export const igLogout = () => {
  CookieManager.getAll().then(res => {
    console.log("CookieManager.getAll =>", res);
  });
  CookieManager.clearAll().then(res => {
    console.log("CookieManager.clearAll =>", res);
  });
};
