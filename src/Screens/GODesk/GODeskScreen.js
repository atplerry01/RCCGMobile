import TabNav from '@Component/Common/TabNav';
import colors from '@Constants/Colors';
import transparentHeaderStyle from '@Constants/Styles/Navigation';
import Styles from '@Theme/MemberHome';
import Style from '@Theme/Style';
import axios from 'axios';
import { Button, Container, Content, Icon, Right, Text, View } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, FlatList, Image, ImageBackground, TouchableHighlight, TouchableOpacity } from 'react-native';
import { config } from '../../helpers';

export default class GODeskScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerStyle: transparentHeaderStyle,
        headerTransparent: true,
        headerTintColor: colors.white,
    });

    state = {
        GODeskMessages: {},
        GODeskMessagesFound: false,
        recentMessages: {},
        recentMessagesFound: false
    }
    
    componentDidMount() {
        this.getGOMessages();
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
        const {GODeskMessages, productCartItemNumber} = this.state;
        
        return (
            <Container style={Style.bgMain}>

                <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                    <View style={[Styles.section]}>
                        <ImageBackground source={require('@Asset/images/common/top-bg.jpeg')} 
                        imageStyle={'cover'} style={[Styles.curve, { backgroundColor: colors.green01 }]} />

                        <View style={[Styles.profile]}>
                            <Image source={require('@Asset/images/avatar.png')} style={[Styles.avatar]} />
                            <View>
                                <Text style={Styles.profileName}>Pastor E.A Adeboye</Text>
                                <Text style={Styles.profileLocation}>G.O RCCG</Text>
                            </View>
                        </View>

                        <View style={Styles.btnLayout}>

                            <TouchableOpacity style={Styles.btnBox} onPress={() => {
                                this.props.navigation.navigate('GOMessages')
                            }}>
                                <Image source={require('@Asset/images/btn-messages.png')} style={Styles.btnImg} />
                                <Text style={Styles.btnText}>Messages</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={Styles.btnBox} onPress={() => {
                                this.props.navigation.navigate('GOProfile')
                            }}>
                                <Image source={require('@Asset/images/btn-boy.png')} style={Styles.btnImg} />
                                <Text style={Styles.btnText}>GO Profile</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={Styles.btnBox}>
                            </TouchableOpacity>
                        </View>

                        <View style={Styles.message}>
                            <View style={Styles.headerBg}>
                                <Icon name="envelope" type="FontAwesome" style={Styles.headerIcon} />
                                <Text style={Styles.sHeader}>{'Recent GO Messages'.toUpperCase()}</Text>
                                <Right>
                                    <Button small rounded style={Styles.sBtn} 
                                    onPress={() => { this.props.navigation.navigate('GOMessages') }}>
                                        <Text style={Styles.sLink} >See All</Text>
                                    </Button>
                                </Right>
                            </View>
                            {/* TODO:  DataLists*/}
                            <FlatList
                                data={GODeskMessages}
                                style={Styles.item}
                                renderItem={({ item, separators }) => (
                                    <TouchableHighlight key={item.id} underlayColor='transparent' 
                                    onPress={() => { this.props.navigation.navigate('GOMessageDetail', {itemId: item.id}) }}>
                                        <View style={Styles.record}>
                                            <Image source={{ uri: item.imageThumbPath }} style={Styles.itemImg} />
                                            <View style={Styles.itemInfo}>
                                                <Text style={Styles.itemTitle}>{item.topic}</Text>
                                                <Text style={Styles.itemDesc}>{item.summary}</Text>
                                            </View>
                                            <Text style={Styles.itemDate}>{item.createdOn}</Text>
                                        </View>
                                    </TouchableHighlight>
                                )}
                            />
                        </View>

                    </View>

                </Content>

  
                <TabNav navigation={this.props.navigation}
                    cartValue={productCartItemNumber? productCartItemNumber : 0} 
                    gotoCart={() => this.props.navigation.navigate('ProductCartReview')} 
                />
            </Container>
        );
    }

    getGOMessages = () => {
        axios.get(config.apiUrl + '/api/godesk/messages/latest').then(res => {
            var data = res.data ? res.data : false;
            if (data) {
                this.setState({ GODeskMessages: data });
            }
        }).catch(err => {
            this.setState({ GODeskMessagesFound: false });
        })
    }

    
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