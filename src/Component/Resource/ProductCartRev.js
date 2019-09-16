import FavStyles from '@Screen/Member/Favorites/Style';
import Styles from '@Theme/Favorite';
import { Button, Icon } from 'native-base';
import React, { PureComponent } from 'react';
import { Image, LayoutAnimation, Text, TouchableHighlight, View } from 'react-native';

export default class ProductCartRev extends PureComponent {
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
            selectedQuantity: 1,
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
        this.setState({ favorite: !favorite });
    }

    render() {
        // const { item_name, item_code, item_description, item_amount, quantity, image_url, favorite, selectedQuantity } = this.state;
        const { item } = this.props;

        return (
            <TouchableHighlight underlayColor='transparent' onPress={this.props.gotoProductDetails}>
                <View style={FavStyles.record}>
                    <Image source={{ uri: item.image_url }} resizeMode={'cover'} style={FavStyles.itemImg} />
                    
                    <View style={FavStyles.itemInfo}>
                        <Text style={FavStyles.itemTitle}>{item.item_name ? item.item_name.toUpperCase() : ''}</Text>
                        <Text style={FavStyles.itemLocation}>{item.item_description}</Text>
                        <View style={FavStyles.itemRow}>
                            <View style={FavStyles.itemOverview}>
                                <Icon name="price-tag" type="Entypo" style={FavStyles.itemIcon} />
                                <Text style={FavStyles.itemNo}>{item.item_amount}</Text>
                            </View>
                            <View style={[FavStyles.itemOverview, { fontSize: 30 }]}>
                                <Icon name="minuscircleo" type="AntDesign" onPress={this.props.onSubtract} style={FavStyles.itemIcon} />
                                <Text style={FavStyles.itemNo}>{item.selQuantity}</Text>
                                <Icon name="pluscircleo" type="AntDesign" onPress={this.props.onAdd} style={FavStyles.itemIcon} />
                            </View>
                        </View>
                        {/* <View style={{ flex: 1, alignItems: 'flex-end'}}>
                            <Text>Unit Price: {item_amount}</Text>
                            <Text>Sub Total: {item_amount * selectedQuantity}</Text>
                        </View> */}
                    </View>
                    <View style={Styles.trash}>
                        <Button transparent onPress={() => {
                            this.props.onRemove
                        }}>
                            <Icon
                                name='trash'
                                color='rgb(50, 50, 50)' // {favorite ? '#F44336' : 'rgb(50, 50, 50)'}
                                size={30}
                                style={{ marginBottom: 10, marginTop: 20 }}
                                onPress={this.props.onRemove}
                            />
                        </Button>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}
