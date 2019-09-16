import Styles from '@Theme/ProfileDetail';
import Style from '@Theme/Style';
import axios from 'axios';
import { Button, Container, Content, Icon, List, ListItem, Tab, Tabs, Text, View } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, StatusBar } from 'react-native';
// import Modal from 'react-native-modal';
import TabNav from '../../Component/Common/TabNav';
import { config } from '../../helpers';

export default class PayDetail extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        myprofile: {},
        myprofileFound: false,
        myParish: {},
        isParishSet: true
    }

    async componentDidMount() {
        const userToken = await this.getStorageItem('@userToken');
        const myProfileStore = await this.getStorageItem('@myProfileStore');

        if (userToken) {
            const userData = JSON.parse(userToken);
            this.getMyProfile(userData);
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


    openSetting = () => {
        this.props.navigation.navigate('ProfileSettings', { paramId: 'parish' });
    }

    render() {
        let { userProfile, productCartItemNumber } = this.state;

        return <Container style={Style.bgMain}>
            <StatusBar backgroundColor="#7E8BF5" animated barStyle="light-content" />

            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <Tabs tabBarUnderlineStyle={Styles.tabBorder}>
                    {/* <Tab tabStyle={Styles.tabGrey} textStyle={Styles.tabTextActive} activeTabStyle={Styles.tabGrey} activeTextStyle={Styles.tabTextActive} heading="Intro">
                        <View style={Styles.overview}>
                            <Text style={Styles.overviewDesc}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales vitae ligula eu hendrerit. Donec in magna sodales, semper urna et, gravida enim.
                                {"\n\n"}Mauris dolor magna, sodales et finibus nec, feugiat nec enim. Nullam id arcu lacus.
                            </Text>

                        </View>
                    </Tab> */}
                    <Tab tabStyle={Styles.tabGrey} textStyle={Styles.tabTextActive} activeTabStyle={Styles.tabGrey} activeTextStyle={Styles.tabTextActive} heading="Contact">
                        <List style={Styles.infoTab}>
                            <ListItem style={Styles.infoItem}>
                                <Icon name="map-marker-radius" type="MaterialCommunityIcons" style={Styles.infoIcon} />
                                <View>
                                    <Text style={Styles.infoHeader}>{'Address'.toUpperCase()}</Text>
                                    {userProfile && (
                                        <Text style={Styles.infoDesc}>{userProfile.address}, {"\n"} {userProfile.country}</Text>
                                    )}
                                </View>
                            </ListItem>
                            <ListItem style={Styles.infoItem}>
                                <Icon name="phone" type="FontAwesome" style={Styles.infoIcon} />
                                <View>
                                    <Text style={Styles.infoHeader}>{'Phone'.toUpperCase()}</Text>
                                    {userProfile && (<Text style={Styles.infoDesc}>{userProfile.phone}</Text>)}

                                </View>
                            </ListItem>
                            <ListItem style={Styles.infoItem}>
                                <Icon name="mail" type="Entypo" style={Styles.infoIcon} />
                                <View>
                                    <Text style={Styles.infoHeader}>{'Email'.toUpperCase()}</Text>
                                    {userProfile && (<Text style={Styles.infoDesc}>{userProfile.email}</Text>)}

                                </View>
                            </ListItem>

                            <ListItem style={Styles.infoItem}>
                                <Icon name="church" type="MaterialCommunityIcons" style={Styles.infoIcon} />
                                <View>
                                    <Text style={Styles.infoHeader}>{'Parish'.toUpperCase()}</Text>
                                    {userProfile && (<Text style={Styles.infoDesc}>{userProfile.division.name}</Text>)}

                                </View>
                            </ListItem>

                            {/* <ListItem style={[Styles.infoItem, Styles.infoItemLast]}>
                                <Icon name="web" type="MaterialCommunityIcons" style={Styles.infoIcon} />
                                <View>
                                    <Text style={Styles.infoHeader}>{'Website'.toUpperCase()}</Text>
                                    <Text style={Styles.infoDesc}>www.rccg.org</Text>
                                </View>
                            </ListItem> */}

                            <Button style={Styles.btn} titleColor='white' onPress={() => {
                                this.props.navigation.navigate('PayFlutterGateway');
                            }}>
                                <Text style={Styles.formBtnText}>{'Process Payment'.toUpperCase()}</Text>
                                <Icon active name="payment" type="MaterialIcons" style={Styles.formBtnIcon} />
                            </Button>
                        </List>
                    </Tab>
                </Tabs>

            </Content>

  
            <TabNav navigation={this.props.navigation}
                    cartValue={productCartItemNumber? productCartItemNumber : 0} 
                    gotoCart={() => this.props.navigation.navigate('ProductCartReview')} 
                />
        </Container>
    }

    flutterGateway() {
        this.props.navigation.navigate('');
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
                // this.saveStorageItem('@myProfileStore', JSON.stringify(resp.data.data.user));
                this.setState({ userProfile: resp.data.data.user });
            })
            .catch(error => {
                ToastAndroid.show(`An Error Occur - ${error.message}`, ToastAndroid.SHORT);
            });
    }


    getStorageItem = async (key) => {
        let result = '';
        try {
            result = await AsyncStorage.getItem(key) || 'none';
        } catch (error) {
            
        }
        return result;
    }

    saveStorageItem = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            
        }
    };

}