import TabNav from '@Component/Common/TabNav';
import colors from '@Constants/Colors';
import transparentHeaderStyle from '@Constants/Styles/Navigation';
import Styles from '@Theme/About';
import Style from '@Theme/Style';
import axios from 'axios';
import { Container, Content, Text } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, Image, ImageBackground, StyleSheet, View } from 'react-native';
import { config } from '../../helpers';

export default class AboutScreen extends Component {

    constructor(props) {
        super(props);
    }
    
    state = {
        about: {},
        aboutFound: false
    }

    static navigationOptions = ({ navigation }) => ({
        headerStyle: transparentHeaderStyle,
        headerTransparent: true,
        headerTintColor: colors.white,
    });
    
    
    async getCartItemNumber() {
        const productCartItemsStore = await this.getStorageItem('@productCartItemsStore');
        if (productCartItemsStore && productCartItemsStore !== 'none') {
            const productCartItems2 = JSON.parse(productCartItemsStore);
            const productCartItems = JSON.parse(productCartItems2);
            this.setState({ productCartItemNumber: productCartItems.length });
        }
    }

    async componentDidMount() {
        this.getAboutPage();
        this.getCartItemNumber();
    }

    renderContent = () => {
        
        if (this.state.about) {
            return (
                <View style={[Styles.overview, { padding:10, flex: 1, flexWrap: 'wrap' }]}>
                    <Text style={Styles.overviewTitle}>{this.state.about.summary}</Text>
                    <Text style={[Styles.overviewDesc, { padding:10, flex: 1, flexWrap: 'wrap' }]}>{this.state.about.description}</Text>
                </View>
            )
        } else {
            return (
                <View><Text>Loading...</Text></View>
            )
        }
    }

    render() {
        const { productCartItemNumber } = this.state;
        
        return (
            <Container style={Style.bgMain}>

                <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
                    <ImageBackground source={require('@Asset/images/common/top-bg.jpeg')} imageStyle={'cover'} style={[Styles.page, { backgroundColor: colors.green01 }]}>
                        <View style={Styles.pageCol}>
                            <Image source={require('@Asset/images/btn-aboutus.png')} style={Styles.pageIcon} />
                        </View>
                    </ImageBackground>

                    <View style={Styles.overview}>
                        {this.renderContent()}
                    </View>
                </Content>
                
                <TabNav navigation={this.props.navigation}
                    cartValue={productCartItemNumber? productCartItemNumber : 0} 
                    gotoCart={() => this.props.navigation.navigate('ProductCartReview')} 
                />
            </Container>
        );
    }

    getAboutPage = () => {
        axios.get(config.apiUrl + '/api/about').then(res => {
            var data = res.data ? res.data : false;
            if (data) {
                this.setState({ about : data, aboutFound: true });
            }
        }).catch(err => {
            this.setState({ aboutFound: false });
        })
    }

    getStorageItem = async (key) => {
        let result = '';
        try {
            result = await AsyncStorage.getItem(key) || 'none';
        } catch (error) {
            ToastAndroid.showWithGravityAndOffset(error.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        }

        return result;
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    }
  })