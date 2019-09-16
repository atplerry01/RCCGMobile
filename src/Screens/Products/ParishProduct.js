import TabNav from '@Component/Common/TabNav';
import FavStyles from '@Screen/Member/Favorites/Style';
import Styles from '@Theme/Favorite';
import Style from '@Theme/Style';
import axios from 'axios';
import { Container, Content, Icon, Text } from 'native-base';
import React from 'react';
import { AsyncStorage, FlatList, Image, ImageBackground, ToastAndroid, TouchableHighlight, View } from 'react-native';
import { config } from '../../helpers';

export default class ParishProduct extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        parishes: {},
        parishProducts: {},
        parishesFound: false
    }

    async componentDidMount() {
        const userToken = await this.getStorageItem('@userToken');
        const parishCodeStore = await this.getStorageItem('@parishCodeStore');

        if (userToken && userToken !== 'none' && parishCodeStore && parishCodeStore !== 'none') {
            const userData = JSON.parse(userToken);
            const parishCode = JSON.parse(parishCodeStore);

            this.setState({ parishCode });
            this.getParisheProducts(userData, parishCode);
        } else {
            //
        }

        // Get ParishCode
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
        const { parishProducts, parishCode, productCartItemNumber } = this.state;

        return <Container style={Style.bgMain}>
            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <ImageBackground source={require('@Asset/images/property-bg.png')} style={Styles.homeBg}>

                    <View style={FavStyles.section}>
                        {parishProducts &&
                            <FlatList
                                data={parishProducts}
                                style={FavStyles.item}
                                renderItem={({ item, separators }) => (
                                    <TouchableHighlight underlayColor='transparent' onPress={() => {
                                        this.props.navigation.navigate('ProductDetail', { itemId: item.id, item: JSON.stringify(item), parishCode: JSON.stringify(parishCode) })
                                    }}>
                                        <View style={FavStyles.record}>
                                            <Image source={{ uri: item.imageUrl }} style={FavStyles.itemImg} />
                                            <View style={FavStyles.itemInfo}>
                                                <Text style={FavStyles.itemTitle}>{item.itemName.toUpperCase()}</Text>
                                                <Text style={FavStyles.itemLocation}>{item.itemDesc}</Text>
                                                <View style={FavStyles.itemRow}>
                                                    <View style={FavStyles.itemOverview}>
                                                        <Icon name="price-tag" type="Entypo" style={FavStyles.itemIcon} />
                                                        <Text style={FavStyles.itemNo}>{item.currency} {item.itemAmount}</Text>
                                                    </View>
                                                    <View style={FavStyles.itemOverview}>
                                                        <Icon name="sort-amount-desc" type="FontAwesome" style={FavStyles.itemIcon} />
                                                        <Text style={FavStyles.itemNo}>{item.totalQuantity}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                )}
                            />
                        }
                    </View>


                </ImageBackground>

            </Content>

  
            <TabNav navigation={this.props.navigation}
                    cartValue={productCartItemNumber? productCartItemNumber : 0} 
                    gotoCart={() => this.props.navigation.navigate('ProductCartReview')} 
                />
        </Container>
    }

    getParisheProducts = (userStore, parishCode) => {
        const pcode = parishCode.replace(/"/g, "");
        var data = `userID=${userStore.userID}&parishCode=${pcode}&pageNum=1&pageSize=20&currency=NGN`;

        return axios
            .post(config.apiBaseUrl + "/product/getAllProducts", data, {
                headers: {
                    "Authorization": `Bearer ${userStore.access_token}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(resp => {
                this.setState({ parishProducts: resp.data.data, parishProductFound: true });
            })
            .catch(error => {
                ToastAndroid.show(`An Error Occur - ${error.message}`, ToastAndroid.SHORT);
            });
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