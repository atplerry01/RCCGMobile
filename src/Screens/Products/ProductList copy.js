import TabNav from '@Component/Common/TabNav';
import FavStyles from '@Screen/Member/Favorites/Style';
import Styles from '@Theme/Favorite';
import Style from '@Theme/Style';
import axios from 'axios';
import { Button, Container, Content, Icon, Text } from 'native-base';
import React from 'react';
import { AsyncStorage, FlatList, Image, ImageBackground, ToastAndroid, TouchableHighlight, View } from 'react-native';
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
                    const mergeData = {...p, ...ProductCartItems[indx]};
                    finalResult.push(mergeData);
                }
            })
        }

        const productItemLists = {...ProductLists, ...finalResult}
        console.log(productItemLists);  

    }

    addToCart(entity) {
        console.log('add to cart');
        console.log('entity: ', entity);

        // merge product with fav
        console.log(ProductLists);
        console.log(ProductCartItems);

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

        console.log(finalResult);


        // get the cartItems from LS
        // Add the selected from the LS
        // On Deselection, remove from the LS
    }



    render() {
        const { parishProducts, parishCode } = this.state;

        return <Container style={Style.bgMain}>
            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <ImageBackground source={require('@Asset/images/property-bg.png')} style={Styles.homeBg}>

                    <View style={FavStyles.section}>
                        <FlatList
                            data={ProductLists}
                            style={FavStyles.item}
                            renderItem={({ item, separators }) => (
                                <TouchableHighlight underlayColor='transparent' onPress={() => {
                                    this.props.navigation.navigate('ProductDetail', { itemId: item.id, item: JSON.stringify(item), parishCode: JSON.stringify(parishCode) })
                                }}>
                                    <View style={FavStyles.record}>
                                        <Image source={{ uri: item.imageUrl }} style={FavStyles.itemImg} />
                                        <View style={FavStyles.itemInfo}>
                                            <Text style={FavStyles.itemTitle}>{item.itemName}</Text>
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
                                        <View style={Styles.trash}>
                                            <Button transparent onPress={() => {
                                                this.addToCart(item)
                                            }}>
                                                <Icon name="local-grocery-store" type="MaterialIcons" style={Styles.itemIcon} />
                                            </Button>
                                        </View>
                                    </View>
                                </TouchableHighlight>
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