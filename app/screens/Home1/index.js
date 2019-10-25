import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Linking
} from "react-native";
import { connect } from "react-redux";
import { Header } from "react-navigation";

import defaultStyles from "../../styles";
import { RouteNames } from "../../navigation/routes";
import { navigate } from "../../navigation/NavigationService";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { Icon } from "native-base";

const { width: screenWidth } = Dimensions.get("window");

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Icon
            type="AntDesign"
            name="menuunfold"
            style={{ margin: 10, fontSize: 25, color: "black" }}
          />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(RouteNames.Profile);
          }}
        >
          <Icon
            type="AntDesign"
            name="user"
            style={{ margin: 10, fontSize: 25, color: "black" }}
          />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
  }

  renderNews = () => {
    return this.props.news.map(newsObj => {
      return (
        <View
          style={[styles.newsView, defaultStyles.shadowView]}
          key={newsObj.id}
        >
          <Text style={styles.newsTitle}>{newsObj.title}</Text>
          <Text style={styles.newsText}>{newsObj.text}</Text>
        </View>
      );
    });
  };

  _renderItem({ item, index }, parallaxProps) {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          const url = (Platform.OS = "ios"
            ? "instagram://user?username=balisard"
            : "intent://instagram.com/_u/balisard/#Intent;package=com.instagram.android;scheme=https;end");
          Linking.canOpenURL(url)
            .then(supported => {
              if (!supported) {
                alert("Приложение инстаграм не установлено");
              } else {
                return Linking.openURL(url);
              }
            })
            .catch(err => alert(err + "Произошла ошибка"));
        }}
      >
        <View key={index} style={styles.item}>
          <ParallaxImage
            source={{ uri: item }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={1}
            {...parallaxProps}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Последние новости</Text>
          {this.renderNews()}
          <Text style={styles.title}>Подпишитесь на наш Инстаграм!</Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={this.props.adminPosts}
              renderItem={this._renderItem}
              sliderWidth={screenWidth}
              sliderHeight={screenWidth}
              itemWidth={screenWidth - 60}
              autoplay={true}
              autoplayInterval={2000}
              hasParallaxImages={true}
              loop={true}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            navigate(RouteNames.ServiceType);
          }}
          style={styles.registerButton}
        >
          <Text>Онлайн Запись</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Header.HEIGHT
  },
  title: {
    margin: 15,
    marginLeft: 20,
    fontSize: 20
  },
  newsTitle: {
    fontSize: 18,
    margin: 5
  },
  newsText: {
    fontSize: 15,
    margin: 5
  },
  newsView: {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: "column",
    alignItems: "center"
  },
  registerButton: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    height: 50,
    width: "90%",
    height: 55,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: {
          width: 0,
          height: 2
        }
      },
      android: {
        elevation: 5
      }
    }),
    borderColor: "#d2d1d150",
    borderWidth: 1,
    backgroundColor: "#D7BF76",
    zIndex: 0
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8
  },
  image: {
    // ...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
    width: "100%",
    height: "100%"
  }
});

const mapStateToProps = state => {
  adminPosts = state.services.adminPosts.map(key => key.uri);

  return {
    news: state.services.news,
    adminPosts: adminPosts
  };
};
export default connect(mapStateToProps)(HomeScreen);
