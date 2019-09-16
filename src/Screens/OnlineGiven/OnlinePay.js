import TabNav from '@Component/Common/TabNav';
import colors from '@Constants/Colors';
import Styles from '@Theme/ParishDetail';
import Style from '@Theme/Style';
import axios from 'axios';
import { Button, Container, Content, Icon, Right, Tab, Tabs, Text, View } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, Image, ImageBackground, ToastAndroid } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { config } from '../../helpers';

//const {width, height} = Dimensions.get('window')

export default class OnlinePay extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTransparent: true,
        headerTintColor: '#fff'
    });

    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            uniqueValue: 1,
            parishItems: [],
            parishItem: 'Select Payment Item',
            parish: 'National Parish 22',
            currencyCode: 'NGN',
            firstName: '',
            lastName: '',
            lastRefresh: Date(Date.now()).toString()
        };

        this.currencyCodeRef = this.updateRef.bind(this, 'currencyCode');
        this.parishRef = this.updateRef.bind(this, 'parish');
        this.refreshScreen = this.refreshScreen.bind(this)
        // parishItem

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.amountRef = this.updateRef.bind(this, 'amount');
        this.parishItemRef = this.updateRef.bind(this, 'parishItem');

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


    onlinePaymentPlatform() {
        // userProfile.division.code
        const { amount, parishItem, userProfile, myParishDetail, userData } = this.state;

        if (amount === undefined) {
            ToastAndroid.show('Please select Amount', ToastAndroid.SHORT);
        }

        if (parishItem && parishItem !== 'Select Payment Item') {
            this.registerPayment(userData, amount, userProfile.division.code, parishItem);
        } else {
            ToastAndroid.show('Please select parish Item', ToastAndroid.SHORT);
        }
    }

    // registerListener() {
    //     this._subscribe = this.props.navigation.addListener('didFocus', async () => {
    //         const userToken = await this.getStorageItem('@userToken');
    //         const parishCodeStore = await this.getStorageItem('@parishCodeStore');

    //     });
    // }

    _headerRightPressed() {
        this.refreshScreen();
    }


    registerListener() {
        this._subscribe = this.props.navigation.addListener('didFocus', async () => {
            const myParishChangeStore = await this.getStorageItem('@myParishChangeStore');
            const myParishItemsStore = await this.getStorageItem('@myParishItemsStore');

            if (myParishItemsStore && myParishItemsStore !== 'none' && myParishChangeStore && myParishChangeStore === 'true') {
                ToastAndroid.show('Parish Changed', ToastAndroid.SHORT);
                myParishItems = JSON.parse(myParishItemsStore);
                this.setState({ myParishItems });

                this.saveStorageItem('@myParishChangeStore', 'false');
            }
        });
    }

    async refreshScreen() {

        const userTokenStore = await this.getStorageItem('@userToken');
        const userProfileStore = await this.getStorageItem('@userProfileStore');

        if (userTokenStore && userTokenStore !== 'none' && userProfileStore && userProfileStore !== 'none') {
            userToken2 = JSON.parse(userTokenStore);
            this.setState({ userData: userToken2 });

            const userProfileStore0 = JSON.parse(userProfileStore);
            const userProfile = JSON.parse(userProfileStore0);

            if (userProfile.division.code === "") {
                ToastAndroid.show('You have no active Parish', ToastAndroid.SHORT);
                this.props.navigation.navigate('ParishSelector');
            } else {
                this.getParishItems(userToken2, userProfile.division.code);
            }
        }
    }

    async componentDidMount() {

        this.registerListener();

        const userTokenStore = await this.getStorageItem('@userToken');
        const userProfileStore = await this.getStorageItem('@userProfileStore');

        if (userTokenStore && userTokenStore !== 'none' && userProfileStore && userProfileStore !== 'none') {
            userToken2 = JSON.parse(userTokenStore);
            this.setState({ userData: userToken2 });

            const userProfileStore0 = JSON.parse(userProfileStore);
            const userProfile = JSON.parse(userProfileStore0);
            this.setState({ userProfile  });

            if (userProfile.division.code === "") {
                ToastAndroid.show('You have no active Parish', ToastAndroid.SHORT);
                this.props.navigation.navigate('ParishSelector');
            } else {
                // this.getParishDetail(userToken, userProfile.division.code);
                this.getParishItems(userToken2, userProfile.division.code);
            }
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
                    ToastAndroid.show('There is no Parish Item', ToastAndroid.SHORT);
                    // this.props.navigation.navigate('ParishSelector');
                } else {
                    // this.saveStorageItem('@myParishItemsStore', JSON.stringify(resp.data.data));
                    this.setState({ myParishItems: parishItems });
                }
            })
            .catch(error => {
                ToastAndroid.show('Parish Items: ' + error.message, ToastAndroid.SHORT);
            });
    }

    render() {
        let { errors = {}, parish, currencyCode, amount, parishItem, myParishItems, productCartItemNumber } = this.state;

        var parishItemLists = [];

        if (myParishItems) {
            myParishItems.map((item, key) => {
                parishItemLists.push({ label: item.item_desc, value: item.item_id });
            })
        }

        return (

            <Container style={Style.bgMain}>

                <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
                    {/* source={require('@Asset/images/property-bg@2x.png')} */}
                    <ImageBackground source={require('@Asset/images/property-bg.png')} imageStyle={'cover'} style={[Styles.page, { backgroundColor: colors.green01 }]}>
                        <View style={Styles.pageCol}>
                            <Image source={require('@Asset/images/btn-aboutus.png')} style={Styles.pageIcon} />
                        </View>
                    </ImageBackground>


                    <Tabs tabBarUnderlineStyle={Styles.tabBorder}>
                        <Tab tabStyle={Styles.tabGrey} textStyle={Styles.tabText} activeTabStyle={Styles.tabGrey} activeTextStyle={Styles.tabText} heading="Pay Now">
                            <View style={Styles.formBg}>


                                <View style={Styles.message}>
                                    <View style={Styles.headerBg}>
                                        {/* <Icon name="envelope" type="FontAwesome" style={Styles.headerIcon} />
                                        <Text style={Styles.sHeader}>{'Recent Contributions'.toUpperCase()}</Text> */}
                                        <Right>
                                            <Button small rounded style={Styles.sBtn} onPress={() => { this.refreshScreen() }}>
                                                <Text style={Styles.sLink} >Reload</Text>
                                            </Button>
                                        </Right>
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

                                        <View style={{ width: 96, marginLeft: 8 }}>
                                            <Dropdown
                                                ref={this.currencyCodeRef}
                                                value={currencyCode}
                                                onChangeText={this.onChangeText}
                                                label='Currency'
                                                data={currencyCodeData}
                                                propsExtractor={({ props }, index) => props}
                                            />
                                        </View>
                                    </View>

                                    <Dropdown
                                        ref={this.parishItemRef}
                                        value={parishItem}
                                        onChangeText={this.onChangeText}
                                        label='Parish Item'
                                        data={parishItemLists}
                                    />

                                </View>

                                <View>
                                    <Text style={{ display: "none" }}>Last Refresh: {this.state.lastRefresh}</Text>
                                </View>

                                <Button style={Styles.btn} titleColor='white' onPress={() => {
                                    this.onlinePaymentPlatform()
                                }}>
                                    <Text style={Styles.formBtnText}>{'Process Payment'.toUpperCase()}</Text>
                                    <Icon active name="payment" type="MaterialIcons" style={Styles.formBtnIcon} />
                                </Button>

                            </View>
                        </Tab>

                    </Tabs>


                </Content>

  
                <TabNav navigation={this.props.navigation}
                    cartValue={productCartItemNumber? productCartItemNumber : 0} 
                    gotoCart={() => this.props.navigation.navigate('ProductCartReview')} 
                />
            </Container>

        );
    }

    registerPayment(userStore, amount, parishCode, itemId) {
        const pcode = parishCode.replace(/"/g, "");
        var data = `userID=${userStore.userID}&currency=NGN&amount=${amount}&parishCode=${pcode}&itemID=${itemId}&channel=app`;

        return axios
            .post(config.apiBaseUrl + "/payment/offeringsRegister", data, {
                headers: {
                    "Authorization": `Bearer ${userStore.access_token}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(resp => {
                this.props.navigation.navigate('StackSelection', { paydetail: JSON.stringify(resp.data.data), amount: amount })
            })
            .catch(error => {
                ToastAndroid.show('Register Payment: ' + error.message, ToastAndroid.SHORT);
            });
    }


    removeStorageItem = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {

        }
    }

    saveStorageItem = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {

        }
    };

    getStorageItem = async (key) => {
        let result = '';
        try {
            result = await AsyncStorage.getItem(key) || 'none';
        } catch (error) {

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

const parishData = [
    { value: 'National Parish', label: 'National Parish' },
    { value: 'My Parish', label: 'My Parish' },
    { value: 'Other Parish', label: 'Other Parish' },
];

const currencyCodeData = [
    { value: 'NGN' },
    { value: 'USD' },
];
