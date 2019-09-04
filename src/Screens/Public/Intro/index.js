import Style from '@Theme/Style';
import { Container } from 'native-base';
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';




const styles = StyleSheet.create({
    image: {
      width: 250,
      height: 250,
    }
  });

const slides = [
    {
      title: 'Search Property',
      text: 'Find and select your suitable property',
      image: require('@Asset/images/1.png'),
      imageStyle: styles.image,
    },
    {
      title: 'Home Loan',
      text: 'We can help you find a loan. Call us on +123 456789',
      image: require('@Asset/images/2.png'),
      imageStyle: styles.image,
    },
    {
      title: 'Sell or Stay?',
      text: 'Decide if it\'s time for you to sell with our expert advice',
      image: require('@Asset/images/3.png'),
      imageStyle: styles.image,
    },
  ];

export default class extends React.Component {
    onDone = () => {
        this.props.navigation.navigate('PublicHome')
    }
    onSkip = () => {
        this.props.navigation.navigate('PublicHome')
    }
    render () {
        return <Container style={Style.bgMainIntro}>
                <StatusBar backgroundColor="#7E8BF5" animated barStyle="light-content" />
                <AppIntroSlider
                    slides={slides}
                    onDone={this.onDone}
                    onSkip={this.onSkip}
                    showSkipButton
                />
      </Container>
    }
}