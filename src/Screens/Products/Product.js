import TabNav from '@Component/Common/TabNav';
import colors from '@Constants/Colors';
import FavStyles from '@Screen/Member/Favorites/Style';
import Styles from '@Theme/MemberHome';
import Style from '@Theme/Style';
import axios from 'axios';
import { Container, Content, Tab, Tabs, Text, View } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, Image, ImageBackground, ToastAndroid, TouchableOpacity } from 'react-native';
// import uuid from 'react-native-uuid';
import { config } from '../../helpers';

export default class ProductScreen extends Component {

    constructor(props) {
        super(props);
        // this.registerListener();
    }

    state = {

    }


    async componentDidMount() {
        // get user ParishCode
        // parishCodeStore
        // parishCategoryStore
        // nationalCategoryStore

        const parishCodeStore = await this.getStorageItem('@parishCodeStore');
        if (parishCodeStore && parishCodeStore !== 'none') {
            const parishCode = JSON.parse(parishCodeStore);
            this.getParishProductCategory();
            // this.getNationalProductCategory(); //TODO:
        }

        this.getParishProductCategory();
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

    renderParishContent() {
        const { parishProductCategory } = this.state;
    
        if (parishProductCategory && parishProductCategory.length > 0) {
            return parishProductCategory.map((entity, key) => {
                return (
                    <TouchableOpacity style={Styles.btnBox} onPress={() => {
                        this.props.navigation.navigate('ProductType', { itemId: entity.id })
                    }}>
                        <Image source={{ uri: entity.image_url }} resizeMode={'cover'} style={FavStyles.itemImg} />
                        <Text style={Styles.btnText}>{entity.slug}</Text>
                    </TouchableOpacity>
                )
            })
        } else {
            <View><Text>No Category Found</Text></View>
        }

    }

    renderNationalContent() {
        const { nationalProductCategory } = this.state;

        if (nationalProductCategory && nationalProductCategory.length > 0) {
            return nationalProductCategory.map((entity, key) => {
                return (
                    <TouchableOpacity style={Styles.btnBox} onPress={() => {
                        this.props.navigation.navigate('ProductType', { itemId: entity.id })
                        // this.props.navigation.navigate('StackSelection')
                    }}>
                        <Image source={{ uri: entity.image_url }} resizeMode={'cover'} style={Styles.btnImg} />
                        <Text style={Styles.btnText}>{entity.slug}</Text>
                    </TouchableOpacity>
                )
            })
        } else {
            <View><Text>No Category Found</Text></View>
        }

    }

    render() {
        const { productCartItemNumber } = this.state;
        
        return (<Container key={this.state.compKey} style={Style.bgMain}>

            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <View style={[Styles.section]}>

                    <View style={[Styles.profile, { backgroundColor: colors.green01 }]}>
                        {/* <Image source={require('@Asset/images/avatar.png')} style={[Styles.avatar]} /> */}
                        <View>
                            <Text style={Styles.profileName}>RCCG Store</Text>
                            <Text style={Styles.profileLocation}>Contribution towards the development of the church</Text>
                        </View>
                    </View>

                    {/* source={require('@Asset/images/property-bg.png')} */}
                    <ImageBackground imageStyle={'cover'} style={[Styles.curve, { backgroundColor: colors.green01 }]} />

                    <Tabs tabBarUnderlineStyle={Styles.tabBorder}>
                        <Tab tabStyle={Styles.tabGrey} textStyle={Styles.tabTextActive} activeTabStyle={Styles.tabGrey} activeTextStyle={Styles.tabTextActive} heading="Parish Products">
                            <View style={Styles.btnLayout}>
                                {this.renderParishContent()}
                            </View>
                        </Tab>
                        <Tab tabStyle={Styles.tabGrey} textStyle={Styles.tabTextActive} activeTabStyle={Styles.tabGrey} activeTextStyle={Styles.tabTextActive} heading="National Products">
                            <View style={Styles.btnLayout}>
                                {this.renderNationalContent()}
                            </View>
                        </Tab>

                    </Tabs>

                </View>

            </Content>

  
            <TabNav navigation={this.props.navigation}
                    cartValue={productCartItemNumber? productCartItemNumber : 0} 
                    gotoCart={() => this.props.navigation.navigate('ProductCartReview')} 
                />
        </Container>
        );
    }

    getParishProductCategory() {
        // const pcode = parishCode.replace(/"/g, "");
        return axios
            .get(config.apiBaseUrl + `/product/parents?code=01`)
            .then(resp => {
                const productCat = resp.data.data;
                this.setState({ parishProductCategory: productCat })
            })
            .catch(error => {
                ToastAndroid.show(error.message, ToastAndroid.SHORT);
            });
    }

    getNationalProductCategory() {
        // const pcode = parishCode.replace(/"/g, "");

        return axios
            .get(config.apiTestUrl + `/product/parents?code=01`)
            .then(resp => {
                const productCat = resp.data.data;
                this.setState({ nationalProductcategory: productCat })
            })
            .catch(error => {
                ToastAndroid.show(error.message, ToastAndroid.SHORT);
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
