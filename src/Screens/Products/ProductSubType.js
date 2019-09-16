import TabNav from '@Component/Common/TabNav';
import colors from '@Constants/Colors';
import FavStyles from '@Screen/Member/Favorites/Style';
import Styles from '@Theme/MemberHome';
import Style from '@Theme/Style';
import axios from 'axios';
import { Container, Content, Text, View } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, Image, ImageBackground, ToastAndroid, TouchableOpacity } from 'react-native';
// import uuid from 'react-native-uuid';
import { config } from '../../helpers';

export default class ProductSubType extends Component {

    constructor(props) {
        super(props);
        // this.registerListener();
    }

    state = {

    }


    renderContent() {
        const { productSubTypes } = this.state;

        if(productSubTypes && productSubTypes.length > 0) {
            return productSubTypes.map((entity, key) => {
                return (
                    <TouchableOpacity style={Styles.btnBox} onPress={() => {
                        this.props.navigation.navigate('ProductList', { itemId: entity.id })
                    }}>
                        <Image source={{ uri: entity.image_url }} resizeMode={'cover'} style={FavStyles.itemImg} />
                        <Text style={Styles.btnText}>{entity.slug}</Text>
                    </TouchableOpacity>
                )
            })
        } else {
            return (<View><Text>Loading ...</Text></View>)
        }
    }

    async componentDidMount() {
        const itemId = this.props.navigation.getParam('itemId', 'NO-ID');
        // const code = navigation.getParam('code', 'NO-ID'); // TODO:
        this.getProductSubTypes(itemId);
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

    render() {

        const { myPaymentHistory, productCartItemNumber } = this.state;

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

                    <View style={Styles.btnLayout}>

                        {this.renderContent()}

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

    getProductSubTypes(typeId) {
        return axios
            .get(config.apiBaseUrl + `/product/parents?code=01&typeId=${typeId}`)
            .then(resp => {
                const entity = resp.data.data;
                this.setState({ productSubTypes: entity })
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
