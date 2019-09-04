import TabNav from '@Component/Common/TabNav';
import colors from '@Constants/Colors';
import Styles from '@Theme/MemberHome';
import Style from '@Theme/Style';
import axios from 'axios';
import { Container, Content, Text, View } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, Image, ImageBackground, ToastAndroid, TouchableOpacity } from 'react-native';
// import uuid from 'react-native-uuid';
import { config } from '../../helpers';

export default class ProductType extends Component {

    constructor(props) {
        super(props);
    }

    state = {

    }


    renderContent() {
        const { productTypes } = this.state;

        if(productTypes && productTypes.length > 0) {
            return productTypes.map((entity, key) => {
                return (
                    <TouchableOpacity style={Styles.btnBox} onPress={() => {
                        this.props.navigation.navigate('ProductSubType', { itemId: entity.id })
                    }}>
                        <Image source={require('@Asset/images/btn-property.png')} resizeMode={'cover'} style={Styles.btnImg} />
                        <Text style={Styles.btnText}>{entity.slug}</Text>
                    </TouchableOpacity>
                )
            })
        } else {
            return (<View><Text>No Product Type</Text></View>)
        }
        
    }

    async componentDidMount() {
        const itemId = this.props.navigation.getParam('itemId', 'NO-ID');
        // const code = navigation.getParam('code', 'NO-ID'); // TODO:
        this.getProductTypes(itemId);
    }

    render() {

        const { myPaymentHistory } = this.state;

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

            <TabNav navigation={this.props.navigation} />

        </Container>
        );
    }

    getProductTypes(parentId) {
        return axios
            .get(config.apiBaseUrl + `/product/parents?code=01&parentId=${parentId}`)
            .then(resp => {
                const entity = resp.data.data;
                console.log('entity: ', entity);
                this.setState({ productTypes: entity })
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
