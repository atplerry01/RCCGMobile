import TabNav from '@Component/Common/TabNav';
import FavStyles from '@Screen/Member/Favorites/Style';
import Styles from '@Theme/Favorite';
import Style from '@Theme/Style';
import axios from 'axios';
import { Container, Content, Icon, Text } from 'native-base';
import React from 'react';
import { AsyncStorage, FlatList, Image, ImageBackground, ToastAndroid, TouchableHighlight, View } from 'react-native';
import { config } from '../../helpers';

export default class ParishScreen extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        parishes: {},
        parishesFound: false
    }

    async componentDidMount() {
        const userToken = await this.getStorageItem('@userToken');

        if (userToken && userToken !== 'none') {
            const userData = JSON.parse(userToken);
            this.getParishes(userData);
        }        
    }

    render() {
        const { parishes } = this.state;
        
        return <Container style={Style.bgMain}>
            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <ImageBackground source={require('@Asset/images/property-bg.png')} style={Styles.homeBg}>


                        <View style={FavStyles.section}>
                            <FlatList
                                data={parishes}
                                style={FavStyles.item}
                                renderItem={({ item, separators }) => (
                                    <TouchableHighlight underlayColor='transparent' onPress={() => { 
                                            this.props.navigation.navigate('ParishDetail', { itemId: item.divisionCode })
                                        }}>
                                        <View style={FavStyles.record}>
                                            <Image source={{ uri: item.imageThumbPath }} style={FavStyles.itemImg} />
                                            <View style={FavStyles.itemInfo}>
                                                <Text style={FavStyles.itemTitle}>{item.divisionName}</Text>
                                                <Text style={FavStyles.itemLocation}>{item.summary}</Text>
                                                <View style={FavStyles.itemRow}>
                                                    <View style={FavStyles.itemOverview}>
                                                        <Icon name="map-marker-multiple" type="MaterialCommunityIcons" style={FavStyles.itemIcon} />
                                                        <Text style={[FavStyles.itemNo1, { fontSize: 12 }]}>{item.divisionAddress}</Text>
                                                    </View>
                                                    {/* <View style={FavStyles.itemOverview}>
                                                        <Icon name="location" type="Entypo" style={FavStyles.itemIcon} />
                                                        <Text style={FavStyles.itemNo}>{item.province}</Text>
                                                    </View> */}
                                                </View>
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

    getParishes = (userStore) => {
        var data = `userID=${userStore.userID}&pageNum=1&pageSize=20`;

        return axios
            .post(config.apiBaseUrl + "/parish/getParishes", data, {
                headers: {
                    "Authorization": `Bearer ${userStore.access_token}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(resp => {
                this.setState({ parishes: resp.data.data, parishesFound: true });
            })
            .catch(error => {
                ToastAndroid.show(`An Error Occur - ${error.message}`, ToastAndroid.SHORT);
            });
    }

    // getParishes = () => {
    //     axios.get(config.apiUrl + '/api/parishes').then(res => {
    //         var data = res.data ? res.data : false;
    //         if (data) {
    //             this.setState({ parishes: data, parishesFound: true });
    //         }
    //     }).catch(err => {
    //         this.setState({ parishesFound: false });
    //     })
    // }

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