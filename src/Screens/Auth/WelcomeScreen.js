import colors from '@Constants/Colors';
import styles from '@Constants/Styles/LoggedOut';
import transparentHeaderStyle from '@Constants/Styles/Navigation';
import StyleBg from '@Screen/Public/AboutUs/Style';
import * as Facebook from 'expo-facebook';
import React, { Component } from 'react';
import { AsyncStorage, Image, ImageBackground, ScrollView, Text, ToastAndroid, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavBarButton from '../../Component/buttons/NavBarButton';
import RoundedButton from '../../Component/buttons/RoundedButton';

const airbnbLogo = require('../../../assets/airbnb-logo.png');

class WelcomeScreen extends Component {

  constructor(props) {
    super(props)
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight: <NavBarButton handleButtonPress={() => navigation.navigate('SignIn')} location="right" color={colors.white} text="Log In" />,
    headerStyle: transparentHeaderStyle,
    headerTransparent: true,
    headerTintColor: colors.white,
  });

  onCreateAccountPress() {
    this.props.navigation.navigate("SignUp")
  }

  async onLogInWithFacebook() {
    try {
      const { type, token, expires, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync('1403122253162651', { permissions: ['public_profile', 'email'], });

      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,email,name,birthday,picture.type(large)`);
        // TODO: 
        // this.props.navigation.navigate("Dashboard");
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      ToastAndroid.show(`Facebook Login Error: ${message}`, ToastAndroid.SHORT);
    }
  }

  componentDidMount = async () => {
    const userToken = await this.getStorageItem('@userToken');

    if (userToken !== 'none') {
      this.props.navigation.navigate('DashboardModule');
    }
  }

  render() {
    return (
      <ScrollView style={styles.wrapper}>

        <ImageBackground source={require('@Asset/images/common/welcome.png')} imageStyle={'cover'} style={[StyleBg.page, { backgroundColor: colors.green01, flex: 1, width: '100%', height: '100%' }]}>
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

export default WelcomeScreen;
