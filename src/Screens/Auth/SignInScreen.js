
import colors from '@Constants/Colors';
import styles from '@Constants/Styles/LogIn';
import transparentHeaderStyle from '@Constants/Styles/Navigation';
import Styles from '@Screen/Public/AboutUs/Style';
import axios from 'axios';
import React, { Component } from 'react';
import { AsyncStorage, ImageBackground, KeyboardAvoidingView, ScrollView, Text, ToastAndroid, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavBarButton from '../../Component/buttons/NavBarButton';
import NextArrowButton from '../../Component/buttons/NextArrowButton';
import InputField from '../../Component/form/InputField';
import Notification from '../../Component/Notification';
import { config } from '../../helpers';

class SignInScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerRight: <NavBarButton
      handleButtonPress={() => navigation.navigate('ForgotPassword')}
      location="right"
      color={colors.white}
      text="Forgot Password"
    />,
    headerLeft: <NavBarButton
      handleButtonPress={() => navigation.goBack()}
      location="left"
      icon={<Icon name="angle-left" color={colors.white} size={30} />}
    />,
    headerStyle: transparentHeaderStyle,
    headerTransparent: true,
    headerTintColor: colors.white,
  });


  constructor(props) {
    super(props);

    this.state = {
      formValid: true,
      validEmail: false,
      emailAddress: '',
      password: '',
      validPassword: false,
      loadingVisible: false,
    };

    this.handleCloseNotification = this.handleCloseNotification.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleNextButtonState = this.toggleNextButtonState.bind(this);
  }

  async logInWithFacebook() {
    try {
      const { type, token, expires, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync('1403122253162651', { permissions: ['public_profile'], });

      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      ToastAndroid.show(`Facebook Login Error: ${message}`, ToastAndroid.SHORT);
    }
  }

  handleNextButton = async () => {
    this.setState({ loadingVisible: true });
    const { logIn, navigation } = this.props;
    const { navigate } = navigation;

    const { emailAddress, password } = this.state;
    var data = "grant_type=password&client_id=null&client_secret=null" + "&username=" + emailAddress + "&password=" + password;

    ToastAndroid.show(`Please wait ...`, ToastAndroid.SHORT);

    return axios
      .post(config.apiBaseUrl + "/auth/login", data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
      .then(resp => {
        AsyncStorage.setItem('@userToken', JSON.stringify(resp.data));
        this.getMyProfile(resp.data);
        // this.getParishes(resp.data);
        navigate('DashboardModule');
      })
      .catch(error => {
        const msg = 'Login error: Username/Password Incorrect';
        ToastAndroid.show(msg, ToastAndroid.SHORT);
      });
  }

  getMyProfile(userStore) {
    var data = `email=${userStore.email}`;

    return axios
      .get(config.apiBaseUrl + `/user/getUser?email=${userStore.email}`, {
        headers: {
          "Authorization": `Bearer ${userStore.access_token}`,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(resp => {
        if (!resp.data.data.user.division.code || resp.data.data.user.division.code === null) {
          ToastAndroid.show('You have no active Parish', ToastAndroid.SHORT);
          //TODO: this.props.navigation.navigate('ParishSelector');
        } else {
          this.saveStorageItem('@parishCodeStore', JSON.stringify(resp.data.data.user.division.code));
          this.saveStorageItem('@userProfileStore', JSON.stringify(resp.data.data.user));
          console.log('resp.data.data.user', resp.data.data.user);
          // this.getParishDetail(userStore, resp.data.data.user.division.code);
        }
      })
      .catch(error => {
        ToastAndroid.show('My Parish: ' + error.message, ToastAndroid.SHORT);
      });
  }

  getParishDetail(userData, parishCode) {
    const pcode = parishCode.replace(/"/g, "");
    var data = `userID=${userData.userID}&parishCode=${pcode}&pageNum=1&pageSize=1`;

    return axios
      .post(config.apiBaseUrl + "/parish/getParish", data, {
        headers: {
          "Authorization": `Bearer ${userData.access_token}`,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(resp => {
        this.saveStorageItem('@myParishDetailStore', JSON.stringify(resp.data.data));
        this.getParishItems(userData, resp.data.data.divisionCode);
      })
      .catch(error => {
        ToastAndroid.show(`An Error Occur - ${error.message}`, ToastAndroid.SHORT);
      });

  }

  getParishItems(userStore, parishCode) {
    const pcode = parishCode.replace(/"/g, "");
    var data = `userID=${userStore.userID}&parishCode=${pcode}`;

    return axios
      .post(config.apiBaseUrl + "/parish/getOfferings", data, {
        headers: {
          "Authorization": `Bearer ${userStore.access_token}`,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(resp => {
        const parishItems = resp.data.data;

        if (parishItems.length < 1) {
          // ToastAndroid.show('There is no Parish Item', ToastAndroid.SHORT);
          // this.props.navigation.navigate('ParishSelector');
        } else {
          this.saveStorageItem('@myParishItemsStore', JSON.stringify(resp.data.data));
        }
      })
      .catch(error => {
        ToastAndroid.show('Parish Items: ' + error.message, ToastAndroid.SHORT);
      });
  }

  getParishes(userStore) {
    var data = `userID=${userStore.userID}&pageNum=1&pageSize=20`;

    return axios
      .post(config.apiBaseUrl + "/parish/getParishes", data, {
        headers: { "Authorization": `Bearer ${userStore.access_token}`, "Content-Type": "application/x-www-form-urlencoded" }
      })
      .then(resp => {
        this.saveStorageItem('@parishesStore', JSON.stringify(resp.data.data));
      })
      .catch(error => {
        ToastAndroid.show('Parish: ' + error.message, ToastAndroid.SHORT);
      });
  }


  handleCloseNotification() {
    this.setState({ formValid: true });
  }

  handleEmailChange(email) {
    // eslint-disable-next-line
    const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validEmail } = this.state;
    this.setState({ emailAddress: email });

    if (!validEmail) {
      if (emailCheckRegex.test(email)) {
        this.setState({ validEmail: true });
      }
    } else if (!emailCheckRegex.test(email)) {
      this.setState({ validEmail: false });
    }
  }

  handlePasswordChange(password) {
    const { validPassword } = this.state;

    this.setState({ password });

    if (!validPassword) {
      if (password.length > 4) {
        this.setState({ validPassword: true });
      }
    } else if (password <= 4) {
      this.setState({ validPassword: false });
    }
  }

  toggleNextButtonState() {
    const { validEmail, validPassword } = this.state;
    if (validEmail && validPassword) {
      return false;
    }
    return true;
  }

  render() {
    const {
      formValid, loadingVisible, validEmail, validPassword,
    } = this.state;
    const showNotification = !formValid;
    const background = formValid ? colors.green01 : colors.darkOrange;
    const notificationMarginTop = showNotification ? 10 : 0;

    return (
      <KeyboardAvoidingView
        style={[{ backgroundColor: background }, styles.wrapper]}
        behavior="padding"
      >
        <ImageBackground source={require('@Asset/images/common/top-bg.jpeg')} imageStyle={'cover'} style={[Styles.page, { backgroundColor: colors.green01 }]}>


          <View style={styles.scrollViewWrapper}>

            <ScrollView style={styles.scrollView}>
              <Text style={styles.loginHeader}>
                Log In
            </Text>
              <InputField
                labelText="EMAIL ADDRESS"
                labelTextSize={14}
                labelColor={colors.white}
                textColor={colors.white}
                borderBottomColor={colors.white}
                inputType="email"
                customStyle={{ marginBottom: 30 }}
                onChangeText={this.handleEmailChange}
                showCheckmark={validEmail}
                autoFocus
              />
              <InputField
                labelText="PASSWORD"
                labelTextSize={14}
                labelColor={colors.white}
                textColor={colors.white}
                borderBottomColor={colors.white}
                inputType="password"
                customStyle={{ marginBottom: 30 }}
                onChangeText={this.handlePasswordChange}
                showCheckmark={validPassword}
              />
            </ScrollView>
            <NextArrowButton
              handleNextButton={this.handleNextButton}
              disabled={this.toggleNextButtonState()}
            />


          </View>
        </ImageBackground>

        {/* TODO: <Loader
          modalVisible={loadingVisible}
          animationType="fade"
        /> */}
        <View style={[styles.notificationWrapper, { marginTop: notificationMarginTop }]}>
          <Notification
            showNotification={showNotification}
            handleCloseNotification={this.handleCloseNotification}
            type="Error"
            firstLine="Those credentials don't look right."
            secondLine="Please try again."
          />
        </View>
      </KeyboardAvoidingView>
    );
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

export default SignInScreen;
