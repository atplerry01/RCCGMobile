import TabNav from '@Component/Common/TabNav';
import FavStyles from '@Screen/Member/Favorites/Style';
import Styles from '@Theme/Favorite';
import Style from '@Theme/Style';
import axios from 'axios';
import { Container, Content } from 'native-base';
import React from 'react';
import { AsyncStorage, FlatList, ImageBackground, ToastAndroid, View } from 'react-native';
import Product from '../../Component/Resource/Product';
import { config } from '../../helpers';
import { ProductCartItems, ProductLists } from './_product-data';

export default class ProductList extends React.Component {

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
            ProductLists.map(p => {
                const indx = ProductCartItems.findIndex(c => c.productId === p.id);
                if (indx !== -1) {
                    const mergeData = { ...p, ...ProductCartItems[indx] };
                    finalResult.push(mergeData);
                }
            })
        }

        // this.setState({ productItemLists: finalResult });
        const productItemLists = [...ProductLists, ...finalResult]
        this.setState({ productItemLists })
        // console.log(productItemLists);

    }

    addToCart(entity) {
        const finalResult = [];

        if (ProductLists && ProductLists.length) {
            ProductCartItems.map(c => {
                const indx = ProductList.findIndex(p => p.id === c.productId);
                if (indx !== -1) {
                    const mergeData = { ...c, ...ProductLists[indx] };
                    finalResult.push(mergeData);
                }
            })
        }

        // get the cartItems from LS
        // Add the selected from the LS
        // On Deselection, remove from the LS
    }



    render() {

        const { productItemLists } = this.state;

        return <Container style={Style.bgMain}>
            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <ImageBackground source={require('@Asset/images/property-bg.png')} style={Styles.homeBg}>

                    <View style={FavStyles.section}>
                        <FlatList
                            data={productItemLists}
                            style={FavStyles.item}
                            renderItem={({ item, separators }) => (
                                <Product
                                    item_name={item.item_name}
                                    image_url={item.image_url}
                                    item_code = {item.item_code} 
                                    item_description = {item.item_description}
                                    item_amount = {item.item_amount}
                                    quantity = {item.quantity}
                                    favorite = {item.favorite ? true : false}
                                />
                            )}
                        />
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