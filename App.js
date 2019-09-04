import * as Icon from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AppDrawerNavigator from './src/Navigations/AppDrawerNavigator';
import AuthStackNavigator from './src/Navigations/AuthStackNavigator';
import IntroScreen from './src/Screens/IntroScreen';

// , Asset, Font, Icon
class App extends Component {

  state = {
    isLoadingComplete: false,
  };

  // TODO:
  loadApp = async () => {
    const token = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(token ? 'Instagram' : 'Auth')
  }

  render() {
    console.disableYellowBox = true;

    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <AppContainer />
      );
    }
  }

  // Load Needed Resource Files

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        // require('./assets/images/robot-dev.png'),
        require('@Asset/images/common/welcome.png'),
        require('@Asset/images/common/top-bg.jpeg')
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'Roboto_medium': require('./assets/fonts/Roboto_medium.ttf'),
        'MaterialCommunityIcons': require('./assets/fonts/MaterialCommunityIcons.ttf'),
        'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
        'Octicons': require('./assets/fonts/Octicons.ttf'),
        'rubicon-icon-font': require('./assets/fonts/rubicon-icon-font.ttf'),
        'Zocial': require('./assets/fonts/Zocial.ttf'),

      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

export default App;
const AppSwitchNavigator = createSwitchNavigator({  
  IntroModule: { screen: IntroScreen },
  Auth: { screen: AuthStackNavigator },
  Dashboard: { screen: AppDrawerNavigator }
}, {
    headerMode: 'none'
  });

const AppContainer = createAppContainer(AppSwitchNavigator);
