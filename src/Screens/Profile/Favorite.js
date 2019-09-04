import TabNav from '@Component/Common/TabNav';
import colors from '@Constants/Colors';
import Styles from '@Theme/About';
import Style from '@Theme/Style';
import { Container, Content, Text, View } from 'native-base';
import React, { Component } from 'react';
import { Image, ImageBackground } from 'react-native';

//const {width, height} = Dimensions.get('window')

export default class MyFavoriteScreen extends Component {

    state = {
        about: []
    }

    render() {
      return (
        <Container style={Style.bgMain}>
        
            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
                {/* source={require('@Asset/images/property-bg@2x.png')} */}
                <ImageBackground  source={require('@Asset/images/property-bg.png')}  imageStyle={'cover'} style={[Styles.page, {backgroundColor: colors.green01}]}>
                    <View style={Styles.pageCol}>
                        <Image source={require('@Asset/images/btn-aboutus.png')} style={Styles.pageIcon} />
                    </View>
                </ImageBackground>
                <View style={Styles.overview}>
                    <Text style={Styles.overviewDesc}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales vitae ligula eu hendrerit. Donec in magna sodales, semper urna et, gravida enim.
                        {"\n\n"}Mauris dolor magna, sodales et finibus nec, feugiat nec enim. Nullam id arcu lacus.
                    </Text>

                </View>

            </Content>

            <TabNav navigation={this.props.navigation} />
            
        </Container>
      );
    }


  }