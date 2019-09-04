import TabNav from '@Component/Common/TabNav';
import colors from '@Constants/Colors';
import transparentHeaderStyle from '@Constants/Styles/Navigation';
import Styles from '@Theme/Home';
import Style from '@Theme/Style';
import axios from 'axios';
import { Button, Container, Content, Icon, Right } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, FlatList, Image, ImageBackground, Linking, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import RadioGroup from 'react-native-custom-radio-group';
import { config } from '../../helpers';

export const btnType = [{
    label: 'PRAYER',
    value: 'btn_buy'
}, {
    label: 'THANKSGIVEN',
    value: 'btn_rent'
}, {
    label: 'PROJECTS',
    value: 'btn_project'
}];

const Toast = (props) => {
    if (props.visible) {
        ToastAndroid.showWithGravityAndOffset(
            props.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
        );
        return null;
    }
    return null;
};

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            connection: false,
            url: 'https://google.com',
            latestParishes: [],
            cartNo: 2
        }
    }

    hideToast = () => { this.setState({ visible: false }) };

    static navigationOptions = ({ navigation }) => ({
        headerStyle: transparentHeaderStyle,
        headerTransparent: true,
        headerTintColor: colors.white,
    });

    checkInternt = () => {
        Linking.canOpenURL(this.state.url).then(connection => {
            if (!connection) {
                ToastAndroid.show('No Connection', ToastAndroid.SHORT);
                this.setState({ connection: false });
            } else {
                fetch(this.state.url).then(res => {
                    // ToastAndroid.show('Connection Available', ToastAndroid.SHORT);
                    this.setState({ connection: res.status !== 200 ? false : true })
                }

                );
            }
        });
    };

    async componentDidMount() {
        this.checkInternt();
        const userToken = await this.getStorageItem('@userToken');
        const parishCodeStore = await this.getStorageItem('@parishCodeStore');

        // New Account and No Parish
        if (parishCodeStore && parishCodeStore !== 'none') {
            const parseVal = JSON.parse(parishCodeStore);
            if (parseVal === null || parseVal === 'null' || parseVal === "null") {
                ToastAndroid.show('You have no active Parish', ToastAndroid.SHORT);
            }
        }

        if (userToken && userToken !== 'none') {
            const userData = JSON.parse(userToken);
            this.getLatestParishes(userData);
        } else {
            this.props.navigation.navigate('Auth');
        }

    }

    searchClick() {
        const { search } = this.state;
        this.props.navigation.navigate('ParishSearch', { 'parishItem': search });
    }

    increaseCart() {
        this.setState(prevState => {
            return { cartNo: prevState.cartNo + 1 }
        })
        // this.setState({ cartNo: cartNo + 1});
    }

    
    gotoCart = (item, index) => {
        this.props.navigation.navigate('ProductCartReview');
    }

    render() {
        const { latestParishes, cartNo } = this.state;

        return (
            <Container>

                <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                    <ImageBackground source={require('@Asset/images/common/top-bg.jpeg')} imageStyle={'cover'} style={[Styles.slider, { backgroundColor: colors.green01 }]}>
                        <View style={[Styles.btnLayout, { paddingTop: 80 }]}>

                            <RadioGroup
                                containerStyle={Styles.typeBg}
                                initialValue={'btn_buy'}
                                buttonContainerStyle={Styles.typeBtn}
                                buttonTextStyle={Styles.typeBtnText}
                                buttonContainerActiveStyle={Styles.typeBtnActive}
                                buttonContainerInactiveStyle={Styles.typeBtnInactive}
                                buttonTextActiveStyle={Styles.typeActiveText}
                                buttonTextInactiveStyle={Styles.typeInactiveText}
                                radioGroupList={btnType} />
                        </View>

                        <View style={[Styles.search]}>
                            <TextInput placeholder={'e.g. Find Parish Near you'}
                                onChangeText={(search) => this.setState({ search })}
                                value={this.state.search}
                                style={Styles.textInput} />
                            <Button transparent style={Styles.searchBtn} onPress={() => {
                                // this.props.navigation.navigate('ParishSearch')
                                this.searchClick();
                            }}>
                                <Icon active name='search' type="FontAwesome" style={Styles.searchBtnIcon} />
                            </Button>
                        </View>

                        {latestParishes &&
                            <FlatList
                                data={latestParishes}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={Styles.flatList}
                                renderItem={({ item, separators }) => (
                                    <TouchableOpacity style={Styles.itemBig} underlayColor='transparent'
                                        onPress={() => { this.props.navigation.navigate('ParishDetail', { itemId: item.divisionCode }) }}>
                                        <View>
                                            <View>
                                                <Image source={{ uri: item.imageThumbPath }} style={Styles.itemImgBig} />
                                                <View style={Styles.itemNoCrv}></View>
                                                <Icon name="heart" type="MaterialCommunityIcons" style={Styles.itemFavorite} />
                                            </View>
                                            <View style={Styles.itemBg}>
                                                <Text numberOfLines={2} style={Styles.itemPrice}>{item.divisionName}</Text>
                                                <Text numberOfLines={1} style={Styles.itemLocation}>{item.divisionAddress}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        }

                    </ImageBackground>

                    <View style={Styles.sectionGrey}>

                        <View style={Styles.headerBg}>
                            <Icon name="map-marker-multiple" type="MaterialCommunityIcons" style={Styles.headerIcon} />
                            <Text style={Styles.sHeader}>{'Popular City Parish'.toUpperCase()}</Text>
                            <Right>
                                {/* onPress={() => { this.props.navigation.navigate('ParishDetail') }} */}
                                <Button small rounded style={Styles.sBtn}
                                    onPress={() => { this.props.navigation.navigate('Parish'); }}>
                                    <Text style={Styles.sLink} >See All</Text>
                                </Button>
                            </Right>
                        </View>

                        <View style={Styles.city}>
                            <TouchableOpacity style={Styles.btnCity} onPress={() => {
                                this.props.navigation.navigate('FeedDetails')
                            }}>
                                <Image source={{ uri: 'https://travel.jumia.com/blog/ng/wp-content/uploads/2018/08/Lekki-Ikoyi-Bridge-600x400.jpg' }} resizeMode={'cover'} style={Styles.btnCityImg} />
                                <View style={Styles.btnCityLocation}>
                                    <Text style={Styles.btnCityText}>Lagos Parishes</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.btnCity} onPress={() => {
                                this.props.navigation.navigate('FeedDetails')
                            }}>
                                <Image source={{ uri: 'https://www.nairaland.com/attachments/2004702_bfrKakM_jpg2289fa9e0cc8452c4464b98c020f09c0' }} resizeMode={'cover'} style={Styles.btnCityImg} />
                                <View style={Styles.btnCityLocation}>
                                    <Text style={Styles.btnCityText}>Kano Parishes</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.btnCity} onPress={() => {
                                this.props.navigation.navigate('FeedDetails')
                            }}>
                                <Image source={{ uri: 'https://connectnigeria.com/articles/wp-content/uploads/2016/07/Abuja-City-Gate.jpg' }} resizeMode={'cover'} style={Styles.btnCityImg} />
                                <View style={Styles.btnCityLocation}>
                                    <Text style={Styles.btnCityText}>Abuja Parishes</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.btnCity} onPress={() => {
                                this.props.navigation.navigate('FeedDetails')
                            }}>
                                <Image source={{ uri: 'https://live.staticflickr.com/2842/13814590494_d26aae0d74_b.jpg' }} resizeMode={'cover'} style={Styles.btnCityImg} />
                                <View style={Styles.btnCityLocation}>
                                    <Text style={Styles.btnCityText}>Ogun Parishes</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.btnCity} onPress={() => {
                                this.props.navigation.navigate('FeedDetails')
                            }}>
                                <Image source={{ uri: 'https://www.nairaland.com/attachments/1152739_aregbe_jpgf7efb83309892e773109c9984399ae78' }} resizeMode={'cover'} style={Styles.btnCityImg} />
                                <View style={Styles.btnCityLocation}>
                                    <Text style={Styles.btnCityText}>Osun Parish</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.btnCity} onPress={() => {
                                this.props.navigation.navigate('FeedDetails')
                            }}>
                                <Image source={{ uri: 'https://media-cdn.tripadvisor.com/media/photo-s/0f/4a/fe/6e/edinburgh-from-calton.jpg' }} resizeMode={'cover'} style={Styles.btnCityImg} />
                                <View style={Styles.btnCityLocation}>
                                    <Text style={Styles.btnCityText}>Oyo Parish</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Content>

                <TabNav cartValue={cartNo} 
                    navigation={this.props.navigation}
                    gotoCart={() => this.gotoCart()} />

            </Container>
        );
    }

    getLatestParishes(userStore) {
        var data = `userID=${userStore.userID}&pageNum=1&pageSize=5`;

        return axios
            .post(config.apiBaseUrl + "/parish/getParishes", data, {
                headers: { "Authorization": `Bearer ${userStore.access_token}`, "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then(resp => {
                ToastAndroid.show('Latest Parish Loaded', ToastAndroid.SHORT);
                this.setState({ latestParishes: resp.data.data });
            })
            .catch(error => {
                ToastAndroid.show('Parish: ' + error.message, ToastAndroid.SHORT);
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
