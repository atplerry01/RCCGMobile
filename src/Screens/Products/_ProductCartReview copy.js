import TabNav from '@Component/Common/TabNav';
import FavStyles from '@Screen/Member/Favorites/Style';
import Styles from '@Theme/Favorite';
import Style from '@Theme/Style';
import axios from 'axios';
import { Container, Content } from 'native-base';
import React from 'react';
import { AsyncStorage, FlatList, ImageBackground, Text, ToastAndroid, View } from 'react-native';
import ProductCartRev from '../../Component/Resource/ProductCartRev';
import { config } from '../../helpers';
import { ProductCartItems, ProductLists } from './_product-data';

export default class ProductCartReview extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        parishes: {},
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
        }

        // Get ParishCode

        const finalResult = [];

        if (ProductLists && ProductLists.length) {

            ProductCartItems.map(c => {
                var entIndx = ProductCartItems.indexOf(c);
                ProductCartItems[entIndx].selQuantity = 1;

                const indx = ProductLists.findIndex(p => p.id === c.productId);

                if (indx !== -1) {
                    const mergeData = { ...c, ...ProductLists[indx] };
                    finalResult.push(mergeData);
                }

            });

            console.log('############## ', finalResult);
            // ProductLists.map(p => {
            //     // Add default selQuantity
            //     var entIndx = ProductLists.indexOf(p);
            //     ProductLists[entIndx].selQuantity = 1;

            //     const indx = ProductCartItems.findIndex(c => c.productId === p.id);
            //     if (indx !== -1) {
            //         const mergeData = { ...p, ...ProductCartItems[indx] };
            //         finalResult.push(mergeData);
            //     }
            // })

            // const productItemLists = [...ProductLists, ...finalResult];
            // console.log('productItemLists', productItemLists);
            this.setState({ productItemLists: finalResult });
        }
    }

    onSubtract = (item, index) => {
        const products = [...this.state.productItemLists];
        if (products[index].selQuantity > 1) {
            products[index].selQuantity -= 1;
            this.setState({ productItemLists: products });
        }
    }

    onAdd = (item, index) => {
        const products = [...this.state.productItemLists];
        products[index].selQuantity += 1;
        this.setState({ productItemLists: products });
    }

    onRemove = (item, index) => {
        const { productItemLists } = this.state;

        newItemList = productItemLists.filter(function (obj) {
            return obj.id !== item.id;
        });

        this.setState({ productItemLists: newItemList });
    }

    render() {

        const { productItemLists } = this.state;

        let totalQuantity = 0;
        let totalPrice = 0;

        if (productItemLists) {
            productItemLists.forEach((item) => {
                selQuantity = 1;
                totalQuantity += item.selQuantity;
                totalPrice += item.selQuantity * item.item_amount;
            })
        }

        return <Container style={Style.bgMain}>
            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <ImageBackground source={require('@Asset/images/property-bg.png')} style={Styles.homeBg}>

                    <View style={FavStyles.section}>
                        <FlatList
                            data={productItemLists}
                            style={FavStyles.item}
                            renderItem={({ item, index }) => (
                                <ProductCartRev
                                    item={item}
                                    onSubtract={() => this.onSubtract(item, index)}
                                    onAdd={() => this.onAdd(item, index)}
                                    onRemove={() => this.onRemove(item, index)}
                                />
                            )}
                            keyExtractor={item => item._id}
                        />

                        <Text>Total Quantity: {totalQuantity}</Text>
                        <Text>Total Price: {totalPrice}</Text>
                    </View>

                </ImageBackground>

            </Content>

            <TabNav navigation={this.props.navigation} />

        </Container>
    }

    getParisheProducts = (userStore, parishCode) => {
        const pcode = parishCode.replace(/"/g, "");
        var data = `userID=${userStore.userID}&parishCode=01&pageNum=1&pageSize=20&currency=NGN`;

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