import TabNav from '@Component/Common/TabNav';
import colors from '@Constants/Colors';
import Styles from '@Theme/ParishDetail';
import Style from '@Theme/Style';
import { Button, Container, Content, Icon, Tab, Tabs, Text, View } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, Image, ImageBackground } from 'react-native';

//const {width, height} = Dimensions.get('window')

export default class OnlinePayDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
       
        };

    }


    fluterPaymentPlatform(user, paySwich, amount) {
        this.props.navigation.navigate('FlutterwavePlatform', { userdata: JSON.stringify(user), paySwichDetail: JSON.stringify(paySwich), amount: amount });
    }

    interswitchPaymentPlatform(paySwich, amount) {
        this.props.navigation.navigate('InterswichPlatform', { userdata: JSON.stringify(user), paySwichDetail: JSON.stringify(paySwich), amount: amount });
    }


    async componentDidMount() {

        const userToken = await this.getStorageItem('@userToken');
        const { navigation } = this.props;
        const paydetail = navigation.getParam('paydetail', 'NO-ID');
        const amount = navigation.getParam('amount', 'NO-ID');

        let userStore = {};

        if (userToken === 'none') {
            this.props.navigation.navigate('Auth');
        } else {
            userStore = JSON.parse(userToken);
            this.setState({ userToken: JSON.parse(userToken) });
        }

        if (paydetail && paydetail !== 'NO-ID') {
            const p = JSON.parse(paydetail);
            this.setState({ paydetail: p, amount });
        }
    }

    render() {
        const { amount, paydetail, userToken } = this.state;
        
        return (
            <Container style={Style.bgMain}>

                <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
                    <ImageBackground source={require('@Asset/images/property-bg.png')} imageStyle={'cover'} style={[Styles.page, { backgroundColor: colors.green01 }]}>
                        <View style={Styles.pageCol}>
                            <Image source={require('@Asset/images/btn-aboutus.png')} style={Styles.pageIcon} />
                        </View>
                    </ImageBackground>


                    <Tabs tabBarUnderlineStyle={Styles.tabBorder}>
                        <Tab tabStyle={Styles.tabGrey} textStyle={Styles.tabText} activeTabStyle={Styles.tabGrey} activeTextStyle={Styles.tabText} heading="Pay Now">
                            <View style={Styles.formBg}>

                                <View>
                                    {
                                        userToken && <Text style={{ fontSize: 22, paddingBottom: 20 }}>Name: {userToken.fullName}</Text>
                                    }
                                    
                                    {
                                        paydetail &&
                                        <View>
                                            <Text style={{ fontSize: 22, paddingBottom: 20 }}>Parish: {paydetail.churchName}</Text>
                                            <Text style={{ fontSize: 22, paddingBottom: 20 }}>Item: {paydetail.itemName}</Text>
                                        </View>
                                    }

                                    

                                    <Text style={{ fontSize: 22, paddingBottom: 20 }}>Amount: {amount}</Text>
                                </View>
                                {
                                    paydetail && paydetail.gatewayInterswitch[0] &&
                                    (
                                        <Button style={Styles.btn} titleColor='white' onPress={() => {

                                            this.interswitchPaymentPlatform(userToken, paydetail, amount)
                                        }}>
                                            <Text style={Styles.formBtnText}>{'Payment with Interswitch'.toUpperCase()}</Text>
                                            <Icon active name="payment" type="MaterialIcons" style={Styles.formBtnIcon} />
                                        </Button>
                                    )
                                }

                                {
                                    paydetail && paydetail.gatewayFlutterwave[0] && (
                                        <Button style={Styles.btn} titleColor='white' onPress={() => {

                                            this.fluterPaymentPlatform(userToken, paydetail, amount)
                                        }}>
                                            <Text style={Styles.formBtnText}>{'Payment with Flutter'.toUpperCase()}</Text>
                                            <Icon active name="payment" type="MaterialIcons" style={Styles.formBtnIcon} />
                                        </Button>
                                    )
                                }


                            </View>
                        </Tab>

                    </Tabs>


                </Content>

                <TabNav navigation={this.props.navigation} />

            </Container>

        );
    }

    
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
