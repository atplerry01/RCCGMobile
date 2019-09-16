import TabNav from '@Component/Common/TabNav';
import colors from '@Constants/Colors';
import Styles from '@Theme/ParishDetail';
import Style from '@Theme/Style';
import axios from 'axios';
import { Button, Container, Content, Icon, Tab, Tabs, Text, View } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, Image, ImageBackground, ToastAndroid } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import variable from '../../Constants/shared/variable';
import { config } from '../../helpers';

//const {width, height} = Dimensions.get('window')

export default class OnlinePayNational extends Component {
    constructor(props) {
        super(props);

        this.state = {
            parishItems: [],
            parishItem: 'Select Payment Item',
            parish: 'National Parish 22',
            currencyCode: 'NGN',
            firstName: '',
            lastName: ''
        };

        this.currencyCodeRef = this.updateRef.bind(this, 'currencyCode');
        this.parishRef = this.updateRef.bind(this, 'parish');
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
        const { amount, parishItem, userToken } = this.state;
        
        if (amount === undefined) {
            ToastAndroid.show('Please enter Amount', ToastAndroid.SHORT);
        }
        
        if (parishItem && parishItem !== 'Select Payment Item') {
            this.registerPayment(userToken, amount, variable.nationalParishCode, parishItem);
        } else {
            ToastAndroid.show('Please select parish Item', ToastAndroid.SHORT);
        }
    }

    async componentDidMount() {
        const userToken = await this.getStorageItem('@userToken');
        let userStore = {};

        if (userToken) {
            userStore = JSON.parse(userToken);
            this.setState({ userToken: JSON.parse(userToken) });
        }

        this.getParishItems(variable.nationalParishCode, userStore);   
        this.getCartItemNumber();   
    }

    
    async getCartItemNumber() {
        const productCartItemsStore = await this.getStorageItem('@productCartItemsStore');
        if (productCartItemsStore && productCartItemsStore !== 'none') {
            const productCartItems = JSON.parse(productCartItemsStore);
            this.setState({ productCartItemNumber: productCartItems.length });
        }
    }


    render() {
        let { errors = {}, parish, currencyCode, amount, parishItem, parishItems, productCartItemNumber } = this.state;

        var parishItemLists = [];

        if (parishItems) {
            parishItems.map((item, key) => {
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

    getParishItems(parishCode, userStore) {

        var data = `userID=${userStore.userID}`;
        
        return axios
            .post(config.apiBaseUrl + "/national/getOfferings", data, {
                headers: {
                    "Authorization": `Bearer ${userStore.access_token}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(resp => {
                this.setState({ parishItems: resp.data.data });
            })
            .catch(error => {
                ToastAndroid.show(`An Error Occur - ${error.message}`, ToastAndroid.SHORT);
            });
    }


    registerPayment(userStore, amount, parishCode, itemId) {
        var data = `userID=${userStore.userID}&currency=NGN&amount=${amount}&parishCode=${parishCode}&itemID=${itemId}&channel=app`;
        
        return axios
            .post(config.apiBaseUrl + "/payment/offeringsRegister", data, {
                headers: {
                    "Authorization": `Bearer ${userStore.access_token}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(resp => {
                this.props.navigation.navigate('StackSelection',  { paydetail: JSON.stringify(resp.data.data), amount: amount })
            })
            .catch(error => {
                ToastAndroid.show(`An Error Occur - ${error.message}`, ToastAndroid.SHORT);
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
