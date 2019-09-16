import colors from '@Constants/Colors';
import styles from '@Constants/Styles/LoggedOut';
import transparentHeaderStyle from '@Constants/Styles/Navigation';
import StyleBg from '@Screen/Public/AboutUs/Style';
import React, { Component } from 'react';
import { AsyncStorage, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavBarButton from '../Component/buttons/NavBarButton';
import RoundedButton from '../Component/buttons/RoundedButton';

const airbnbLogo = require('../../assets/airbnb-logo.png');

class IntroScreen extends Component {

  constructor(props) {
    super(props)
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight: <NavBarButton handleButtonPress={() => navigation.navigate('SignIn')} location="right" color={colors.white} text="Log In" />,
    headerStyle: transparentHeaderStyle,
    headerTransparent: true,
    headerTintColor: colors.white,
  });

  componentDidMount = async () => {
    const userToken = await this.getStorageItem('@userToken');
    if (userToken && userToken !== 'none') {
      // TODO: pull basic information here
      this.props.navigation.navigate('RelocateModule'); // DashboardModule
    } else {
      this.props.navigation.navigate('Auth');
    }
  }

  render() {
    return (
      <ScrollView style={styles.wrapper}>

        {/* source={require('@Asset/images/common/top-bg.jpeg')} */}
        <ImageBackground source={require('@Asset/images/common/welcome.png')}
          resizeMode='stretch'
          style={[StyleBg.page, styleMain.imgBackground,
          { backgroundColor: colors.green01, flex: 1, width: '100%', height: '100%' }]}>
          <View>
            <Image source={require('@Asset/images/btn-aboutus.png')} style={[StyleBg.pageIcon]} />
          </View>

          <View style={styles.welcomeWrapper}>
            <Image
              source={airbnbLogo}
              style={styles.logo}
            />
            <Text style={styles.welcomeText}>
              Welcome to RCCG.
            </Text>


            <RoundedButton
              text="Continue with Facebook"
              textColor={colors.green01}
              background={colors.white}
              icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
              handleOnPress={() => this.onLogInWithFacebook()}
            />
            <RoundedButton
              text="Create Account"
              textColor={colors.white}
              handleOnPress={() => {
                this.props.navigation.navigate('SignUp');
              }}
            />

            <TouchableHighlight
              style={styles.moreOptionsButton}
              onPress={this.onMoreOptionsPress}
            >
              <Text style={styles.moreOptionsButtonText}>
                More options
            </Text>
            </TouchableHighlight>
            <View style={styles.termsAndConditions}>
              <Text style={styles.termsText}>
                By tapping Continue, Create Account or More
            </Text>
              <Text style={styles.termsText}>
                {' options,'}
              </Text>
              <Text style={styles.termsText}>
                {"I agree to RCCG's "}
              </Text>
              <TouchableHighlight style={styles.linkButton}>
                <Text style={styles.termsText}>
                  Terms of Service
              </Text>
              </TouchableHighlight>
              <Text style={styles.termsText}>
                ,
            </Text>
              <TouchableHighlight style={styles.linkButton}>
                <Text style={styles.termsText}>
                  Payments Terms of Service
              </Text>
              </TouchableHighlight>
              <Text style={styles.termsText}>
                ,
            </Text>
              <TouchableHighlight style={styles.linkButton}>
                <Text style={styles.termsText}>
                  Privacy Policy
              </Text>
              </TouchableHighlight>
              <Text style={styles.termsText}>
                , and
            </Text>
              <TouchableHighlight style={styles.linkButton}>
                <Text style={styles.termsText}>
                  Nondiscrimination Policy
              </Text>
              </TouchableHighlight>
              <Text style={styles.termsText}>
                .
            </Text>
            </View>
          </View>

        </ImageBackground>

      </ScrollView>
    );
  }

  removeStorageItem = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      // Error retrieving data

    }
  }

  saveStorageItem = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Error retrieving data

    }
  };

  getStorageItem = async (key) => {
    let result = '';
    try {
      result = await AsyncStorage.getItem(key) || 'none';
    } catch (error) {
      // Error retrieving data

    }
    return result;
  }

}

export default IntroScreen;


const styleMain = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  },
});