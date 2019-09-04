import TabNav from '@Component/Common/TabNav';
import Styles from '@Theme/ParishDetail';
import Style from '@Theme/Style';
import axios from 'axios';
import { MapView } from 'expo';
import { Button, Container, Content, Icon, Text, View } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, ImageBackground, StatusBar, ToastAndroid } from 'react-native';
import { config } from '../../helpers';


//const {width, height} = Dimensions.get('window')

export default class ProductDetail extends Component {

    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.amountRef = this.updateRef.bind(this, 'amount');
        this.onChangeText = this.onChangeText.bind(this);
    }

    state = {
        parishDetail: '',
        parishDetailFound: false,
        latitude: null,
        longitude: null,
        amount: 1
    }


    onSubmit() {
        let errors = {};

        ['firstname', 'lastname', 'email', 'password']
            .forEach((name) => {
                let value = this[name].value();

                if (!value) {
                    errors[name] = 'Should not be empty';
                } else {
                    if ('password' === name && value.length < 6) {
                        errors[name] = 'Too short';
                    }
                }
            });

        this.setState({ errors });
    }

    onChangeText(text) {
        ['currencyCode', 'amount', 'parish', 'parishItem']
            .map((name) => ({ name, ref: this[name] }))
            .filter(({ ref }) => ref && ref.isFocused())
            .forEach(({ name, ref }) => {
                this.setState({ [name]: text });
            });
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    componentDidMount = async () => {
        const userToken = await this.getStorageItem('@userToken');
        const { navigation } = this.props;

        const itemIdRaw = navigation.getParam('itemId', 'NO-ID');
        const itemRaw = navigation.getParam('item', 'NO-ITEM');
        const parishCodeRaw = navigation.getParam('parishCode', 'NO-ITEM');

        if (userToken  && userToken !== 'none') {
            const userData = JSON.parse(userToken);
            this.setState({ userData });
        }

        if (parishCodeRaw && parishCodeRaw !== 'NO-ITEM') {
            parishCode = JSON.parse(parishCodeRaw);
            this.setState({ parishCode });
        }

        if (itemRaw && itemRaw !== 'NO-ITEM') {
            item = JSON.parse(itemRaw);
            this.setState({ itemDetails: item });
        }

    }


    renderMapView() {
        const { longitude, latitude } = this.state;

        if (latitude) {
            return (<MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}>
            </MapView>)
        }
    }

    renderContent() {
        const { itemDetails, parishDetail, amount, errors = {} } = this.state;
        
        if (this.state.itemDetails) {
            return (
                <React.Fragment>
                    <ImageBackground source={{ uri: (`${itemDetails.imageUrl}`) }} imageStyle={'cover'} style={Styles.coverImg}>
                        <View style={Style.actionBarIn}>
                            {/* <Button transparent style={Style.actionBarBtn} onPress={() => {
                                this.props.navigation.navigate('PublicProperties')
                            }}>
                                <Icon active name='arrow-left' style={Style.textBlack} type="MaterialCommunityIcons" />
                            </Button> */}
                        </View>
                    </ImageBackground>

                    <View style={Styles.section}>
                        <Text style={Styles.price}>{item.itemName} - {itemDetails.currency}{itemDetails.itemAmount}</Text>
                        <View style={Styles.locationTop}>
                            <Icon active name='map-marker-radius' style={Styles.locationTopIcon} type="MaterialCommunityIcons" />
                            <Text style={Styles.locationTopInfo}>{parishDetail.region} - {parishDetail.province}</Text>
                        </View>
                    </View>

                    {/* <View style={Styles.count}>
                        <View style={[Styles.countItem, Styles.countFirst]}>
                            <View style={Styles.countCol}>
                                <Icon name="bed" type="FontAwesome" style={Styles.countIcon} />
                                <View>
                                    <Text style={Styles.countNo}>5</Text>
                                    <Text style={Styles.countText}>Beds</Text>
                                </View>
                            </View>
                        </View>
                        <View style={Styles.countItem}>
                            <View style={Styles.countCol}>
                                <Icon name="bathtub" type="FontAwesome" style={Styles.countIcon} />
                                <View>
                                    <Text style={Styles.countNo}>5</Text>
                                    <Text style={Styles.countText}>Baths</Text>
                                </View>
                            </View>
                        </View>
                        <View style={Styles.countItem}>
                            <View style={Styles.countCol}>
                                <Icon name="bathtub" type="FontAwesome" style={Styles.countIcon} />
                                <View>
                                    <Text style={Styles.countNo}>4,700</Text>
                                    <Text style={Styles.countText}>Sq.ft</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.container}>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <TextField
                                    ref={this.amountRef}
                                    value={amount}
                                    autoCorrect={false}
                                    enablesReturnKeyAutomatically={true}
                                    onFocus={this.onFocus}
                                    onChangeText={this.onChangeText}
                                    onSubmitEditing={this.onSubmitAmount}
                                    returnKeyType='next'
                                    label='Amount'
                                    error={errors.amount}
                                />
                            </View>
                        </View>
                    </View> */}

                    <View>
                        <Text style={{ display: "none" }}>Last Refresh: {this.state.lastRefresh}</Text>
                    </View>

                    <Button style={Styles.btn} titleColor='white' onPress={() => {
                        this.onlinePaymentPlatform()
                    }}>
                        <Text style={Styles.formBtnText}>{'Process Payment'.toUpperCase()}</Text>
                        <Icon active name="payment" type="MaterialIcons" style={Styles.formBtnIcon} />
                    </Button>

                    <ImageBackground source={require('@Asset/images/shadow.png')} imageStyle={'cover'} style={Styles.shadow} />

                    <View style={Styles.overview}>
                        <Text style={Styles.overviewTitle}>Overview</Text>
                        <Text style={Styles.overviewDesc}>
                            {parishDetail.summary}
                        </Text>
                    </View>
                </React.Fragment>)

        } else {
            return (<React.Fragment>
                <View>
                    <Text>Loading</Text>
                </View>
            </React.Fragment>)
        }
    }

    render() {

        return (
            <Container style={Style.bgMain}>
                <StatusBar backgroundColor="rgba(0,0,0,0)" animated barStyle="dark-content" />

                <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                    {this.renderContent()}
                </Content>

                <TabNav navigation={this.props.navigation} />
            </Container>

        );
    }

    onlinePaymentPlatform() {
        const { itemDetails, userData, parishCode } = this.state;
        this.registerPayment(userData, itemDetails, parishCode);
    }

    registerPayment(userStore, itemDetails, parishCode) {        
        const pcode = parishCode.replace(/"/g, "");
        var data = `userID=${userStore.userID}&currency=${itemDetails.currency}&amount=${itemDetails.itemAmount}&parishCode=${pcode}&itemID=${itemDetails.id}&channel=app`;

        return axios
            .post(config.apiBaseUrl + "/payment/offeringsRegister", data, {
                headers: {
                    "Authorization": `Bearer ${userStore.access_token}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(resp => {
                this.props.navigation.navigate('PaymentStack', { paydetail: JSON.stringify(resp.data.data), amount: itemDetails.itemAmount })
            })
            .catch(error => {                
                ToastAndroid.show('Register Payment: ' + error.message, ToastAndroid.SHORT);
            });
    }





    getParishDetail = (userStore, parishCode) => {
        var data = `userID=${userStore.userID}&parishCode=${parishCode}&pageNum=1&pageSize=1`;

        return axios
            .post(config.apiBaseUrl + "/parish/getParish", data, {
                headers: {
                    "Authorization": `Bearer ${userStore.access_token}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(resp => {
                this.setState({ parishDetail: resp.data.data, parishesFound: true });
            })
            .catch(error => {
                ToastAndroid.show(`An Error Occur - ${error.message}`, ToastAndroid.SHORT);
            });
    }

    getParishDetail2 = (parishCode) => {
        axios.get(config.apiUrl + `/api/parishes/${parishCode}`).then(res => {
            var data = res.data ? res.data : false;

            if (data) {
                this.setState({ parishDetail: data });
            }
        }).catch(err => {
            this.setState({ parishDetailFound: false });
        })
    }


    saveStorageItem = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            ToastAndroid.showWithGravityAndOffset(error.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        }
    };

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

const styles = {

    scroll: {
        backgroundColor: '#E8EAF6',
    },

    contentContainer: {
        padding: 8,
    },

    screen: {
        flex: 1,
        padding: 4,
        paddingTop: 56,
        backgroundColor: '#E8EAF6',
    },

    container: {
        marginHorizontal: 4,
        marginVertical: 8,
        paddingHorizontal: 8,
    },

    text: {
        textAlign: 'center',
    },

    textContainer: {
        backgroundColor: 'white',
        borderRadius: 2,
        padding: 16,
        elevation: 1,
        shadowRadius: 1,
        shadowOpacity: 0.3,
        justifyContent: 'center',
        shadowOffset: {
            width: 0,
            height: 1,
        },
    },

};
