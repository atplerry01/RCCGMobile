import FavStyles from '@Screen/Member/Favorites/Style';
import Styles from '@Theme/Favorite';
import { Button } from 'native-base';
import React, { PureComponent } from 'react';
import { Image, LayoutAnimation, Text, TouchableHighlight, View } from 'react-native';
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
        const { item_name, item_code, item_description, item_amount, quantity, image_url, favorite } = this.props;
        this.setState({ item_name, item_code, item_description, item_amount, quantity, image_url, favorite });
    }

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    toggleCartInput = (entity, favorite) => {
        console.log(entity);
        this.setState({ favorite: !favorite });
    }
    
    render() {
        const { item_name, item_code, item_description, item_amount, quantity, image_url, favorite } = this.state;

        console.log(image_url);
        
        return (
            <TouchableHighlight underlayColor='transparent' onPress={() => {
                this.props.navigation.navigate('ProductDetail', { itemId: item.id, item: JSON.stringify(item), parishCode: JSON.stringify(parishCode) })
            }}>
                <View style={FavStyles.record}>
                    <Image source={{ uri: image_url }} resizeMode={'cover'} style={FavStyles.itemImg} />
                    <View style={FavStyles.itemInfo}>
                        <Text style={FavStyles.itemTitle}>{item_name ? item_name.toUpperCase() : ''}</Text>
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
                        <Button transparent onPress={() => {
                            this.toggleCartInput(item_code, favorite)
                        }}>
                            <Icon
                                name={favorite ? 'shopping-cart' : 'cart-plus'}
                                color={favorite ? '#F44336' : 'rgb(50, 50, 50)'}
                                size={30}
                                style={{ marginBottom: 10, marginTop: 20 }}
                                onPress={() => this.toggleCartInput(item_code, favorite)}
                            />
                        </Button>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}
