import TabNav from '@Component/Common/TabNav';
import colors from '@Constants/Colors';
import Styles from '@Screen/Public/AboutUs/Style';
import Style from '@Theme/Style';
import { Container, Content, Text, View } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, Image, ImageBackground } from 'react-native';

//const {width, height} = Dimensions.get('window')

export default class LogOutScreen extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        about: []
    }

    componentDidMount = async() => {
        // TODO: Remove Cart System
        await this.removeStorageItem('@productCartItemsStore');
        
        await this.removeStorageItem('@userToken');
        await this.removeStorageItem('@basicStore');
        await this.removeStorageItem('@latestParishStore');
        await this.removeStorageItem('@userParishStore');
        await this.removeStorageItem('@parishCodeStore');

        await this.removeStorageItem('@userProfileStore');
        await this.removeStorageItem('@myParishDetailStore');
        await this.removeStorageItem('@myParishItemsStore');
        await this.removeStorageItem('@myPaymentHistoryStore');
        await this.removeStorageItem('@myParishChangeStore');
        await this.removeStorageItem('@myParishItemsChangeStore');
        
        this.props.navigation.navigate('IntroModule');
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