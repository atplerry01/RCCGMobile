import TabNav from '@Component/Common/TabNav';
import FavStyles from '@Screen/Member/Favorites/Style';
import Styles from '@Theme/Favorite';
import Style from '@Theme/Style';
import axios from 'axios';
import { Container, Content } from 'native-base';
import React from 'react';
import { AsyncStorage, FlatList, ImageBackground, ToastAndroid, TouchableHighlight, View } from 'react-native';
import Product from '../../Component/Resource/Product';
import { config } from '../../helpers';

export default class ProductList extends React.Component {

    constructor(props) {
        super(props)

    }

    state = {
        parishes: {},
        parishesFound: false,
        refresh: false
    }

    async getCartItemNumber() {
        const productCartItemsStore = await this.getStorageItem('@productCartItemsStore');
        if (productCartItemsStore && productCartItemsStore !== 'none') {
            const productCartItems2 = JSON.parse(productCartItemsStore);
            const productCartItems = JSON.parse(productCartItems2);
            this.setState({ productCartItemNumber: productCartItems.length });
        }
    }

    async componentDidMount() {
        // categoryId
        const categoryId = this.props.navigation.getParam('categoryId', 'NO-ID');
        const productCartItemsStore = await this.getStorageItem('@productCartItemsStore');
        const code = this.props.navigation.getParam('divisionCode', 'NO-ID');

        if (categoryId && categoryId !== 'NO-ID') {
            this.setState({ categoryId });
        }

        if (productCartItemsStore && productCartItemsStore !== 'none') {
            const productCartItems2 = JSON.parse(productCartItemsStore);
            const productCartItems = JSON.parse(productCartItems2);
            this.setState({ productCartItems });
        }

        this.getParisheProducts(code);
        this.getCartItemNumber();
    }

    onAddOrRemoveItemCart(entity, index) {
        this.getCartItemNumber();
    }

    render() {

        const { productItemLists, productCartItemNumber } = this.state;

        return <Container style={Style.bgMain}>
            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
                <ImageBackground source={require('@Asset/images/property-bg.png')} style={Styles.homeBg}>
                    <View style={FavStyles.section}>
                        <FlatList
                            data={productItemLists}
                            style={FavStyles.item}

                            renderItem={({ item, index }) => (
                                <TouchableHighlight underlayColor='transparent'
                                    onPress={() => { this.props.navigation.navigate('ProductDetail', { itemId: item.item_code }) }}>
                                    <Product
                                        id={item.id}
                                        item_name={item.item_name}
                                        image_url={item.image_url}
                                        item_code={item.item_code}
                                        item_description={item.item_description}
                                        item_amount={item.item_amount}
                                        quantity={item.quantity}
                                        favorite={item.favorite ? true : false}
                                        onAddOrRemoveItemCart={() => this.onAddOrRemoveItemCart(item, index)}
                                    />
                                </TouchableHighlight>


                            )}
                        />
                    </View>
                </ImageBackground>
            </Content>

            <TabNav navigation={this.props.navigation}
                cartValue={productCartItemNumber ? productCartItemNumber : 0}
                gotoCart={() => this.props.navigation.navigate('ProductCartReview')}
            />
        </Container>
    }

    getParisheProducts(code) {
        const { productCartItems, categoryId } = this.state;

        return axios
            .get(config.apiBaseUrl + `/product/productsByCategory?code=${code}&categoryID=${categoryId}&pageNum=1&pageSize=1&currency=NGN`)
            .then(resp => {
                
                const productEntity = resp.data.data[0]; // There are 2 object pick the first
                
                if (resp.data.data !== 'products not found') {
                    productEntity.map(p => {
                        var entIndx = productEntity.indexOf(p);
                        productEntity[entIndx].favorite = false;

                        if (productCartItems && productCartItems.length > 0) {
                            const indx = productCartItems.findIndex(c => c.productId === p.id);

                            if (indx !== -1) {
                                productEntity[entIndx].favorite = true;
                            }
                        }
                    });
    
                    this.setState({ productItemLists: productEntity })
                } else {
                    this.setState({ productItemLists: [] })
                }

            })
            .catch(error => {
                ToastAndroid.show(error.message, ToastAndroid.SHORT);
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