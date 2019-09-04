
import colors from '@Constants/Colors';
import styles from '@Constants/Styles/LogIn';
import transparentHeaderStyle from '@Constants/Styles/Navigation';
import Styles from '@Screen/Public/AboutUs/Style';
import axios from 'axios';
import React, { Component } from 'react';
import { ImageBackground, KeyboardAvoidingView, ScrollView, Text, ToastAndroid, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavBarButton from '../../Component/buttons/NavBarButton';
import NextArrowButton from '../../Component/buttons/NextArrowButton';
import InputField from '../../Component/form/InputField';
import Notification from '../../Component/Notification';
import { config } from '../../helpers';


class SignUpScreen extends Component {

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
      firstName: '',
      lastName: '',
      phoneNumber: '',
      emailAddress: '',
      password: '',
      validPassword: false,
      validEmail: false,
      validFirstName: false,
      validLastName: false,
      validPhoneNumber: false,
      loadingVisible: false,
    };

    this.handleCloseNotification = this.handleCloseNotification.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handlePhone = this.handlePhone.bind(this);

    this.toggleNextButtonState = this.toggleNextButtonState.bind(this);
  }

  handleNextButton() {
    this.setState({ loadingVisible: true });
    const { logIn, navigation } = this.props;
    const { navigate } = navigation;

    this.setState({ formValid: true, loadingVisible: false });
    const { emailAddress, password, firstName, lastName, phoneNumber } = this.state;
    var data = "lastname=" + lastName + "&firstname=" + firstName + "&email=" + emailAddress + "&password=" + password + "&phone=" + phoneNumber;
    
    return axios
      .post(config.apiBaseUrl + "/auth/registerUser", data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      })
      .then(resp => {
        navigate('SignIn');
      })
      .catch(error => {
        const msg = error.response.data.message;
        ToastAndroid.show(msg, ToastAndroid.SHORT);
      });
  }


  handleCloseNotification() {
    this.setState({ formValid: true });
  }

  handleFirstName(firstName) {
    const { validFirstName } = this.state;
    this.setState({ firstName });

    if (!validFirstName) {
      if (firstName.length > 1) {
        // firstName has to be at least 4 characters long
        this.setState({ validFirstName: true });
      }
    } else if (firstName <= 1) {
      this.setState({ validFirstName: false });
    }
  }

  handleLastName(lastName) {
    const { validLastName } = this.state;
    this.setState({ lastName });

    if (!validLastName) {
      if (lastName.length > 1) {
        // firstName has to be at least 4 characters long
        this.setState({ validLastName: true });
      }
    } else if (lastName <= 1) {
      this.setState({ validLastName: false });
    }
  }

  handlePhone(phoneNumber) {
    const { validPhoneNumber } = this.state;
    this.setState({ phoneNumber });

    if (!validPhoneNumber) {
      if (phoneNumber.length > 10) {
        // firstName has to be at least 4 characters long
        this.setState({ validPhoneNumber: true });
      }
    } else if (phoneNumber <= 10) {
      this.setState({ validPhoneNumber: false });
    }
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
        // Password has to be at least 4 characters long
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
      formValid, loadingVisible, validEmail, validPassword, validFirstName, validLastName, validPhoneNumber
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
                Sign Up
            </Text>

              <InputField
                labelText="FIRST NAME"
                labelTextSize={14}
                labelColor={colors.white}
                textColor={colors.white}
                borderBottomColor={colors.white}
                inputType="text"
                customStyle={{ marginBottom: 30 }}
                onChangeText={this.handleFirstName}
                showCheckmark={validFirstName}
                autoFocus
              />

              <InputField
                labelText="LAST NAME"
                labelTextSize={14}
                labelColor={colors.white}
                textColor={colors.white}
                borderBottomColor={colors.white}
                inputType="text"
                customStyle={{ marginBottom: 30 }}
                onChangeText={this.handleLastName}
                showCheckmark={validLastName}
              />
              <InputField
                labelText="PHONE"
                labelTextSize={14}
                labelColor={colors.white}
                textColor={colors.white}
                borderBottomColor={colors.white}
                inputType="email"
                customStyle={{ marginBottom: 30 }}
                onChangeText={this.handlePhone}
                showCheckmark={validPhoneNumber}
              />
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
}

export default SignUpScreen;
