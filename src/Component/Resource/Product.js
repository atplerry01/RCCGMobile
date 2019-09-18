import FavStyles from '@Screen/Member/Favorites/Style';
import Styles from '@Theme/Favorite';
import { Button } from 'native-base';
import React, { PureComponent } from 'react';
import { AsyncStorage, Image, LayoutAnimation, Text, ToastAndroid, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Product extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            item_name: '',
            item_code: '',
            item_description: '',
            item_amount: '',
            quantity: '',
            image_url: '',
            favorite: false,
        };
    }

    componentWillMount() {
        const { id, item_name, item_code, item_description, item_amount, quantity, image_url, favorite } = this.props;
        this.setState({ id, item_name, item_code, item_description, item_amount, quantity, image_url, favorite });
    }

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    async processLS(id) {
        const { favorite } = this.state;
        const productCartItemsStore = await this.getStorageItem('@productCartItemsStore');

        if (favorite) {
            if (productCartItemsStore && productCartItemsStore !== 'none') {
                const productCartItems2 = JSON.parse(productCartItemsStore);
                const productCartItems = JSON.parse(productCartItems2);

                newItemList = productCartItems.filter(function (obj) {
                    return obj.productId !== id;
                });

                this.saveStorageItem('@productCartItemsStore', JSON.stringify(newItemList));
            }
        } else {
            // it false, add it 
            if (productCartItemsStore && productCartItemsStore !== 'none') {
                const productCartItems2 = JSON.parse(productCartItemsStore);
                const productCartItems = JSON.parse(productCartItems2);

                productCartItems.push({ favorite: true, productId: id });
                this.saveStorageItem('@productCartItemsStore', JSON.stringify(productCartItems));
            }
        }
    }

    async onHandleCartPress(obj) {
        this.setState({ favorite: !obj.favorite });
        const productCartItemsStore = await this.getStorageItem('@productCartItemsStore');

        console.log('productCartItemsStore', productCartItemsStore);
        
        if (obj.favorite) {
            if (productCartItemsStore && productCartItemsStore !== 'none') {
                const productCartItems2 = JSON.parse(productCartItemsStore);
                const productCartItems = JSON.parse(productCartItems2);

                newItemList = productCartItems.filter(function (objX) {
                    return objX.productId !== obj.id;
                });

                this.saveStorageItem('@productCartItemsStore', JSON.stringify(newItemList));
            }
        } else {
            // it false, add it             
            if (productCartItemsStore && productCartItemsStore !== 'none') {
                const productCartItems2 = JSON.parse(productCartItemsStore);
                const productCartItems = JSON.parse(productCartItems2);

                productCartItems.push({ favorite: true, productId: obj.id });
                this.saveStorageItem('@productCartItemsStore', JSON.stringify(productCartItems));
            } else {
                const productCartItems = [];
                productCartItems.push({ favorite: true, productId: obj.id });
                this.saveStorageItem('@productCartItemsStore', JSON.stringify(productCartItems));
            }
        }

        this.props.onAddOrRemoveItemCart(obj.favorite);
    }


    render() {
        const { id, item_name, item_code, item_description, item_amount, quantity, image_url, favorite } = this.state;

        return (
            <View style={FavStyles.record}>
                <Image source={{ uri: image_url }} resizeMode={'cover'} style={FavStyles.itemImg} />

                <View style={FavStyles.itemInfo}>
                    <Text style={FavStyles.itemTitle}>{item_name ? item_name.toUpperCase() : ''} - {item_amount}</Text>
                    <Text style={FavStyles.itemLocation}>{item_description}</Text>
                    <View style={FavStyles.itemRow}>
                        <View style={FavStyles.itemOverview}>
                            <Icon name="price-tag" type="Entypo" style={FavStyles.itemIcon} />
                            <Text style={FavStyles.itemNo}>{item_description} {}</Text>
                        </View>
                        <View style={FavStyles.itemOverview}>
                            <Icon name="sort-amount-desc" type="FontAwesome" style={FavStyles.itemIcon} />
                            <Text style={FavStyles.itemNo}>{}</Text>
                        </View>
                    </View>
                </View>
                <View style={Styles.trash}>
                    <Button transparent onPress={
                        this.onHandleCartPress.bind(this, { id, favorite })
                    }>
                        <Icon
                            name={favorite ? 'shopping-cart' : 'cart-plus'}
                            color={favorite ? '#F44336' : 'rgb(50, 50, 50)'}
                            size={30}
                            style={{ marginBottom: 10, marginTop: 20 }}
                        // onPress={() => {console.log('ok')}}
                        />
                    </Button>
                </View>
            </View>
        )
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
