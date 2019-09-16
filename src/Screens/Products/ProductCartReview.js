import TabNav from '@Component/Common/TabNav';
import FavStyles from '@Screen/Member/Favorites/Style';
import Styles from '@Theme/Favorite';
import Style from '@Theme/Style';
import axios from 'axios';
import { Button, Container, Content, Icon } from 'native-base';
import React from 'react';
import { AsyncStorage, FlatList, ImageBackground, Text, ToastAndroid, View } from 'react-native';
import ProductCartRev from '../../Component/Resource/ProductCartRev';
import { config } from '../../helpers';

export default class ProductCartReview extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        parishes: {},
        parishesFound: false
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

    onRemove = async (item, index) => {
        const { productItemLists } = this.state;

        newItemList = productItemLists.filter(function (obj) {
            return obj.id !== item.id;
        });

        // Update LS Cart
        let finalResult2 = [];
        newItemList.map(p => { finalResult2.push({ favorite: true, productId: p.id }) });

        this.saveStorageItem('@productCartItemsStore', JSON.stringify(finalResult2));
        this.setState({ productCartItemNumber: finalResult2.length, productItemLists: newItemList });
    }

    async componentDidMount() {
        const productCartItemsStore = await this.getStorageItem('@productCartItemsStore');

        if (productCartItemsStore && productCartItemsStore !== 'none') {
            const productCartItems2 = JSON.parse(productCartItemsStore);
            const productCartItems = JSON.parse(productCartItems2);
            this.setState({ productCartItems });
        }

        // Get ParishCode
        this.getParisheProducts();

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


    gotoProductDetails = (item, index) => {
        this.props.navigation.navigate('ProductDetail', { item: JSON.stringify(item) });
    }

    onlinePaymentPlatform() {
        this.registerPayment();
    }

    render() {

        const { productItemLists, productCartItemNumber } = this.state;

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

                        <Text>Total Quantity: {totalQuantity}</Text>
                        <Text>Total Price: {totalPrice}</Text>

                        <FlatList
                            data={productItemLists}
                            style={FavStyles.item}
                            renderItem={({ item, index }) => (
                                <ProductCartRev
                                    item={item}
                                    onSubtract={() => this.onSubtract(item, index)}
                                    onAdd={() => this.onAdd(item, index)}
                                    onRemove={() => this.onRemove(item, index)}
                                    gotoProductDetails={() => this.gotoProductDetails(item, index)}
                                />
                            )}
                            keyExtractor={item => item.id}
                        />

                        <Text>Total Quantity: {totalQuantity}</Text>
                        <Text>Total Price: {totalPrice}</Text>


                        <Button style={Styles.btn} titleColor='white' onPress={() => {
                            this.onlinePaymentPlatform()
                        }}>
                            <Text style={Styles.formBtnText}>{'Process Payment'.toUpperCase()}</Text>
                            <Icon active name="payment" type="MaterialIcons" style={Styles.formBtnIcon} />
                        </Button>

                    </View>

                </ImageBackground>

            </Content>


            <TabNav navigation={this.props.navigation}
                cartValue={productCartItemNumber ? productCartItemNumber : 0}
                gotoCart={() => this.props.navigation.navigate('ProductCartReview')}
            />
        </Container>
    }

    // userStore, amount, parishCode, itemId
    registerPayment() {
        // const pcode = parishCode.replace(/"/g, "");
        // var data = `userID=${userStore.userID}&currency=NGN&amount=${amount}&parishCode=${pcode}&itemID=${itemId}&channel=app`;
        var data = "code=01&itemCodes=222346521700000_s01,222346521600000_s01&currency=NGN&amount=220000&channel=web&email=chuka%40hotmail.com&quantities=1%2C1&type=1&address1=&address2=&region=&postal_code=&city=&country=&delivery_notes=&deliever_time=&delivery_date=";

        return axios
            .post(config.apiBaseUrl + "/transaction/add", data, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(resp => {
                const stackValue = resp.data.data.data;
                this.props.navigation.navigate('StackSelection', { paydetail: JSON.stringify(resp.data.data.data) })
            })
            .catch(error => {
                ToastAndroid.show('Register Payment: ' + error.message, ToastAndroid.SHORT);
            });
    }


    getParisheProducts() {
        const { productCartItems } = this.state;

        return axios
            .get(config.apiBaseUrl + `/product/allProducts?code=01&pageNum=1&pageSize=10&currency=NGN`)
            .then(resp => {

                const productEntity = resp.data.data;
                let finalResult = [];

                productCartItems.map(c => {
                    var entIndx = productCartItems.indexOf(c);
                    productCartItems[entIndx].selQuantity = 1;

                    const indx = productEntity.findIndex(p => p.id === c.productId);

                    if (indx !== -1) {
                        const mergeData = { ...c, ...productEntity[indx] };
                        finalResult.push(mergeData);
                    }

                });

                this.setState({ productItemLists: finalResult })

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