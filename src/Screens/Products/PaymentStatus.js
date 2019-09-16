import TabNav from '@Component/Common/TabNav';
import colors from '@Constants/Colors';
import MESSAGES from '@Data/Common/Messages';
import Styles from '@Theme/MemberHome';
import Style from '@Theme/Style';
import axios from 'axios';
import { Button, Container, Content, Icon, Right, Text, View } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, FlatList, Image, ImageBackground, ToastAndroid, TouchableHighlight } from 'react-native';
import { config } from '../../helpers';

export default class PaymentStatus extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        gateway: 'flutterwave',
        payRef: '156198162631016674125',
        userID: '16674125',
        paymentTicket: {}
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const stackModelStr = navigation.getParam('stackModel', 'none');
        const amountStr = navigation.getParam('amount', 'none');
        const gatewayStr = navigation.getParam('gateway', 'none');

        // if (stackModelStr && stackModelStr !== 'none') {
        //     const stackModel = JSON.parse(stackModelStr);
        // }

        // if (userToken && userToken !== 'none') {
        //     const userStore = JSON.parse(userToken);
        //     this.setState({ userStore })
        // }

        const userToken = await this.getStorageItem('@userToken');

        if (userToken && stackModelStr) {
            const userStore = JSON.parse(userToken);
            const stackModel = JSON.parse(stackModelStr);
            
            this.getPaymentConfirmation(userStore, stackModel, gatewayStr);
        }

        this.getCartItemNumber();
    }

    async getCartItemNumber() {
        const productCartItemsStore = await this.getStorageItem('@productCartItemsStore');
        if (productCartItemsStore && productCartItemsStore !== 'none') {
            const productCartItems2 = JSON.parse(productCartItemsStore);
            const productCartItems = JSON.parse(productCartItems2);
            this.setState({ productCartItemNumber: productCartItems.length });
        }
    }

    renderContent() {
        return <View><Text>Sample</Text></View>
    }


    render() {

        const { paymentTicket, productCartItemNumber } = this.state;

        return (<Container style={Style.bgMain}>

            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <View style={[Styles.section]}>

                    <View style={[Styles.profile, { backgroundColor: colors.green01 }]}>
                        {/* <Image source={require('@Asset/images/avatar.png')} style={[Styles.avatar]} /> */}
                        <View>
                            <Text style={Styles.profileName}>Online Given</Text>
                            <Text style={Styles.profileLocation}>Contribution towards the development of the church</Text>
                        </View>
                    </View>

                    {/* source={require('@Asset/images/property-bg.png')} */}
                    <ImageBackground imageStyle={'cover'} style={[Styles.curve, { backgroundColor: colors.green01 }]} />

                    <View style={Styles.overview}>
                        <Text style={Styles.overviewTitle}>Payment Status</Text>
                    </View>
                    
                    <View>
                        <Text>Status: {paymentTicket.status}</Text>
                        <Text>Description: {paymentTicket.status_description}</Text>
                        <Text>Transaction Ref: {paymentTicket.transRef}</Text>
                    </View>

                    <View style={Styles.message}>
                        <View style={Styles.headerBg}>
                            <Icon name="envelope" type="FontAwesome" style={Styles.headerIcon} />
                            <Text style={Styles.sHeader}>{'Recent Contributions'.toUpperCase()}</Text>
                            <Right>
                                <Button small rounded style={Styles.sBtn} onPress={() => { this.props.navigation.navigate('MemberMessages') }}>
                                    <Text style={Styles.sLink} >See All</Text>
                                </Button>
                            </Right>
                        </View>
                        <FlatList
                            data={MESSAGES}
                            style={Styles.item}
                            renderItem={({ item, separators }) => (
                                <TouchableHighlight underlayColor='transparent' onPress={() => { this.props.navigation.navigate('MemberMessages') }}>
                                    <View style={Styles.record}>
                                        <Image source={{ uri: item.image }} style={Styles.itemImg} />
                                        <View style={Styles.itemInfo}>
                                            <Text style={Styles.itemTitle}>{item.name}</Text>
                                            <Text style={Styles.itemDesc}>{item.desc}</Text>
                                        </View>
                                        <Text style={Styles.itemDate}>{item.date}</Text>
                                    </View>
                                </TouchableHighlight>
                            )}
                        />
                    </View>

                </View>

            </Content>

  
            <TabNav navigation={this.props.navigation}
                    cartValue={productCartItemNumber? productCartItemNumber : 0} 
                    gotoCart={() => this.props.navigation.navigate('ProductCartReview')} 
                />
        </Container>
        );
    }


    getPaymentConfirmation(userModel, stackModel, gatewayStr) {
        const gateway = gatewayStr.replace(/"/g,"");

        var data = `userID=${userModel.userID}&flsPayRef=${stackModel.transRef}&gatewayName=${gateway}&gatewayAccountId=JocZgmP9Yo&pay_token=&token_exp_date=&card_type=&last_digits=&pay_type=`;
        
        return axios
            .post(config.apiBaseUrl + "/payment/offeringsRegisterConfirmation", data, {
                headers: {
                    "Authorization": `Bearer ${userModel.access_token}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(resp => {
                this.setState({ paymentTicket: resp.data.data })
            })
            .catch(error => {
                ToastAndroid.show(`An Error Occur - ${error.message}`, ToastAndroid.SHORT);
            });
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
    // TODO: Get all the trasaction done
}