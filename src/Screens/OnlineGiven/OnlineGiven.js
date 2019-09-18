import TabNav from '@Component/Common/TabNav';
import colors from '@Constants/Colors';
import Styles from '@Theme/MemberHome';
import Style from '@Theme/Style';
import axios from 'axios';
import moment from 'moment';
import { Button, Container, Content, Icon, Right, Text, View } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, FlatList, Image, ImageBackground, ToastAndroid, TouchableHighlight, TouchableOpacity } from 'react-native';
// import uuid from 'react-native-uuid';
import { config } from '../../helpers';

export default class OnlineGivenScreen extends Component {

    constructor(props) {
        super(props);
        // this.registerListener();
    }

    state = {

    }

    registerListener() {
        this._subscribe = this.props.navigation.addListener('didFocus', async() => {
            const userToken = await this.getStorageItem('@userToken');
            
            if (this.state.userData) {
                var data = `email=${this.state.userData.email}`;
                axios
                .post(config.apiBaseUrl + "/user/getUser", data, { headers: { "Authorization": `Bearer ${this.state.userData.access_token}`, "Content-Type": "application/x-www-form-urlencoded" } })
                .then(resp => {
                    // sucess
                })
                .catch(error => {
                    ToastAndroid.show('My Profile: ' + error.message, ToastAndroid.SHORT);
                });
            }
        });
    }

    async componentDidMount() {

        // this.registerListener();
        const userToken = await this.getStorageItem('@userToken');
        const myPaymentHistoryStore = await this.getStorageItem('@myPaymentHistoryStore');

        if (userToken) {
            const userData = JSON.parse(userToken);
            this.getPaymentHistory(userData);
            this.getCartItemNumber();
        }

    }
    
    async getCartItemNumber() {
        const productCartItemsStore = await this.getStorageItem('@productCartItemsStore');
        if (productCartItemsStore && productCartItemsStore !== 'none') {
            const productCartItems2 = JSON.parse(productCartItemsStore);
            const productCartItems = JSON.parse(productCartItems2);
            this.setState({ productCartItemNumber: productCartItems.length });
        }
    }


    render() {

        const { myPaymentHistory, productCartItemNumber } = this.state;

        return (<Container key={this.state.compKey} style={Style.bgMain}>

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

                    <View style={Styles.btnLayout}>
                        <TouchableOpacity style={Styles.btnBox} onPress={() => {
                            this.props.navigation.navigate('OnlinePay')
                        }}>
                            <Image source={require('@Asset/images/btn-property.png')} resizeMode={'cover'} style={Styles.btnImg} />
                            <Text style={Styles.btnText}>My Parish Payment</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={Styles.btnBox} onPress={() => {
                            this.props.navigation.navigate('OnlinePayNational')
                        }}>
                            <Image source={require('@Asset/images/btn-messages.png')} style={Styles.btnImg} />
                            <Text style={Styles.btnText}>National Payment</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={Styles.overview}>
                        <Text style={Styles.overviewTitle}>Payment History</Text>
                    </View>

                    <View style={Styles.message}>
                        <View style={Styles.headerBg}>
                            <Icon name="envelope" type="FontAwesome" style={Styles.headerIcon} />
                            <Text style={Styles.sHeader}>{'Recent Payment'.toUpperCase()}</Text>
                            <Right>
                                <Button small rounded style={Styles.sBtn} onPress={() => { this.props.navigation.navigate('MemberMessages') }}>
                                    <Text style={Styles.sLink} >See All</Text>
                                </Button>
                            </Right>
                        </View>
                        <FlatList
                            data={myPaymentHistory}
                            style={Styles.item}
                            renderItem={({ item, separators }) => (
                                <TouchableHighlight underlayColor='transparent' onPress={() => { this.props.navigation.navigate('MemberMessages') }}>
                                    <View style={Styles.record}>
                                        {/* item.image */}
                                        <Image source={{ uri: 'https://image.shutterstock.com/image-vector/male-default-placeholder-avatar-profile-260nw-387516178.jpg' }} style={Styles.itemImg} />
                                        <View style={Styles.itemInfo}>
                                            <Text style={Styles.itemTitle}>{item.itemName}</Text>
                                            <Text style={Styles.itemDesc}>Amount: {item.currency}{item.amount}</Text>
                                            <Text style={Styles.itemDesc}>Status: {item.status}</Text>
                                        </View>
                                        <Text style={Styles.itemDate}>{moment(item.transDate).format('MMMM Do YYYY')}</Text>
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

    // TODO: 
    getPaymentHistory = (userStore) => {
        var data = `userID=${userStore.userID}&pageNum=1&pageSize=5`;

        return axios
            .post(config.apiBaseUrl + `/parish/getOfferingPayments`, {
                headers: {
                    "Authorization": `Bearer ${userStore.access_token}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(resp => {
                this.setState({myPaymentHistory:  resp.data.data});
                this.saveStorageItem('@myPaymentHistoryStore', JSON.stringify(resp.data.data));
            })
            .catch(error => {
                ToastAndroid.show('Payment History: ' + error.message, ToastAndroid.SHORT);
            });
    }

    getMyProfile(userStore) {
        var data = `email=${userStore.email}`;
        
        return axios
            .post(config.apiBaseUrl + "/user/getUser", data, {
                headers: {
                    "Authorization": `Bearer ${userStore.access_token}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(resp => {
                if (resp.data.data.user.division.code) {
                    this.saveStorageItem('@parishCodeStore', JSON.stringify(resp.data.data.user.division.code));
                } else {
                    this.props.navigation.navigate('ParishSelector');
                }
            })
            .catch(error => {
                ToastAndroid.show('My Profile: ' + error.message, ToastAndroid.SHORT);
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
