import TabNav from '@Component/Common/TabNav';
import colors from '@Constants/Colors';
import transparentHeaderStyle from '@Constants/Styles/Navigation';
import FavStyles from '@Screen/Member/Favorites/Style';
import Styles from '@Theme/Home';
import Style from '@Theme/Style';
import axios from 'axios';
import { Button, Container, Content, Icon, Right } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, FlatList, Image, ImageBackground, StyleSheet, Text, TextInput, ToastAndroid, TouchableHighlight, View } from 'react-native';
import RadioGroup from 'react-native-custom-radio-group';
import NavBarButton from '../../Component/buttons/NavBarButton';
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

export default class ParishSelectorScreen extends Component {

    constructor(props) {
        super(props);
        // this.loadApp();

        this.state = {
            latestParishes: []
        }

        this.searchRef = this.updateRef.bind(this, 'search');
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    static navigationOptions = ({ navigation }) => ({
        headerRight: <NavBarButton
            handleButtonPress={() => navigation.navigate('ForgotPassword')}
            location="right"
            color={colors.white}
        // icon={<Icon name="search" type="FontAwesome" color="#fff" size={30} />}
        />,
        headerStyle: transparentHeaderStyle,
        headerTransparent: true,
        headerTintColor: colors.white,
    });

    async componentDidMount() {
        const userToken = await this.getStorageItem('@userToken');
        // const parishesStore = await this.getStorageItem('@parishesStore');

        // if (parishesStore && parishesStore !== 'none') {
        //     const parishes1 = JSON.parse(parishesStore);
        //     const parishes = JSON.parse(parishes1);

        //     this.setState({ parishes });
        // }

        if (userToken && userToken !== 'none') {
            const userData = JSON.parse(userToken);
            this.setState({ userData });
            this.getParishes(userData);
            this.getCartItemNumber();
        }
    }

    
    async getCartItemNumber() {
        const productCartItemsStore = await this.getStorageItem('@productCartItemsStore');
        if (productCartItemsStore && productCartItemsStore !== 'none') {
            const productCartItems2 = JSON.parse(productCartItemsStore);
            const productCartItems = JSON.parse(productCartItems2);
            this.setState({ productCartItemNumber: productCartItems.length });
        }
    }


    searchClick() {
        const { search, parishes } = this.state;

        let filteredSearch = [];

        if (search === '') {
            this.setState({ filteredList: parishes });
            return null;
        }

        parishes.forEach(x => {
            if (x.divisionName.toLowerCase().includes(search.toLowerCase())) {
                filteredSearch.push(x);
            }
        });

        this.setState({ filteredList: filteredSearch });

    }

    addParishToUser = async (entity) => {
        const userTokenStore = await this.getStorageItem('@userToken');

        if (userTokenStore && userTokenStore !== 'none') {
            const userToken = JSON.parse(userTokenStore);
            this.updateUserParish(userToken, entity.divisionCode);
            this.props.navigation.navigate('MyParish');
        }
    }

    onChangeText(text) {
        ['search']
            .map((name) => ({ name, ref: this[name] }))
            .filter(({ ref }) => ref && ref.isFocused())
            .forEach(({ name, ref }) => {
                this.setState({ [name]: text });
            });
    }

    onSubmit() {
        let errors = {};

        ['search']
            .forEach((name) => {
                let value = this[name].value();

                if (!value) {
                    errors[name] = 'Should not be empty';
                } else {
                    // if ('password' === name && value.length < 6) {
                    //     errors[name] = 'Too short';
                    // }
                }
            });

        this.setState({ errors });
    }

    updateRef(name, ref) {
        this[name] = ref;
    }


    render() {
        const { parishes, filteredList, search, errors = {}, productCartItemNumber } = this.state;

        return (

            <Container>

                <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                    <ImageBackground source={require('@Asset/images/common/top-bg.jpeg')} imageStyle={'cover'} style={[Styles.slider, { backgroundColor: colors.green01 }]}>

                        <View style={[Styles.btnLayout, { paddingTop: 45 }]}>

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
                            <TextInput placeholder={'e.g. Arena, new Auditorium'}
                                style={Styles.textInput}
                                onChangeText={(search) => this.setState({ search })}
                                value={this.state.search}
                            />

                            {/*                             
                            <TextField
                                style={Styles.textInput}
                                ref={this.searchRef}
                                value={search}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                // onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onSubmit}
                                returnKeyType='next'
                                label='Search'
                                error={errors.search}
                            /> */}

                            <Button transparent style={Styles.searchBtn} onPress={() => {
                                // this.props.navigation.navigate('FeedDetails')
                                this.searchClick();
                            }}>
                                <Icon active name='search' type="FontAwesome" style={Styles.searchBtnIcon} />
                            </Button>
                        </View>

                    </ImageBackground>

                    <View style={Styles.sectionGrey}>

                        <View style={Styles.headerBg}>
                            <Icon name="map-marker-multiple" type="MaterialCommunityIcons" style={Styles.headerIcon} />
                            <Text style={Styles.sHeader}>{'Search for Parish'.toUpperCase()}</Text>
                            <Right>
                                <Button small rounded style={Styles.sBtn}
                                    onPress={() => { this.props.navigation.navigate('Parish') }}>
                                    <Text style={Styles.sLink} >See All</Text>
                                </Button>
                            </Right>
                        </View>

                        {!filteredList && <View style={FavStyles.section}><Text>Loading Parishes...</Text></View>}
                        <View style={FavStyles.section}>
                            <FlatList
                                data={filteredList}
                                style={FavStyles.item}
                                renderItem={({ item, separators }) => (
                                    <TouchableHighlight underlayColor='transparent' onPress={() => {
                                        // this.props.navigation.navigate('ParishDetail', { itemId: item.id })
                                        this.addParishToUser(item)
                                    }}>
                                        <View style={FavStyles.record}>
                                            <Image source={{ uri: item.imageThumbPath }} style={FavStyles.itemImg} />
                                            <View style={FavStyles.itemInfo}>
                                                <Text style={FavStyles.itemTitle}>{item.divisionName}</Text>
                                                <Text style={FavStyles.itemLocation}>{item.summary}</Text>
                                                <View style={FavStyles.itemRow}>
                                                    <View style={FavStyles.itemOverview}>
                                                        <Icon name="map-marker-multiple" type="MaterialCommunityIcons" style={FavStyles.itemIcon} />
                                                        <Text style={FavStyles.itemNo}>{item.region}</Text>
                                                    </View>
                                                    <View style={FavStyles.itemOverview}>
                                                        <Icon name="location" type="Entypo" style={FavStyles.itemIcon} />
                                                        <Text style={FavStyles.itemNo}>{item.province}</Text>
                                                    </View>
                                                </View>
                                            </View>
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


    getParishes(userData) {
        var data = `userID=${userData.userID}&pageNum=1&pageSize=50`;

        return axios
            .post(config.apiBaseUrl + "/parish/getParishes", data, {
                headers: {
                    "Authorization": `Bearer ${userData.access_token}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(resp => {
                var data = resp.data.data ? resp.data.data : false;

                if (data) {
                    this.setState({
                        parishes: data,
                        parishesFound: true,
                        filteredList: data,
                    });
                }
            })
            .catch(error => {
                ToastAndroid.show(`An Error Occur - ${error.message}`, ToastAndroid.SHORT);
            });
    }


    updateUserParish = async (userStore, parishCode) => {
        var data = `userID=${userStore.userID}&parishCode=${parishCode}`;

        return axios
            .post(config.apiBaseUrl + "/parish/updateUserParish", data, {
                headers: {
                    "Authorization": `Bearer ${userStore.access_token}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(resp => {
                this.getMyProfile(userStore);
                // this.getUserParish(userStore, parishCode);
            })
            .catch(error => {
                ToastAndroid.show(`An Error Occur - ${error.message}`, ToastAndroid.SHORT);
            });
    }

    getMyProfile(userStore) {
        var data = `email=${userStore.email}`;

        return axios
            .post(config.apiBaseUrl + "/user/getUser", data, {
                headers: {
                    "Authorization": `Bearer ${userStore.access_token}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(resp => {
                if (!resp.data.data.user.division.code || resp.data.data.user.division.code === null) {
                    ToastAndroid.show('You have no active Parish', ToastAndroid.SHORT);
                    //TODO: this.props.navigation.navigate('ParishSelector');
                } else {
                    // this.saveStorageItem('@parishCodeStore', JSON.stringify(resp.data.data.user.division.code));
                    ToastAndroid.show(`Parish Updated - Please reload to update`, ToastAndroid.SHORT);
                    this.saveStorageItem('@userProfileStore', JSON.stringify(resp.data.data.user));
                    // this.getParishDetail(userStore, resp.data.data.user.division.code);
                }
            })
            .catch(error => {
                ToastAndroid.show('My Parish: ' + error.message, ToastAndroid.SHORT);
            });
    }


    // getUserParish = async (userStore, parishCode) => {
    //     var data = `userID=${userStore.userID}&parishCode=${parishCode}`;

    //     return axios
    //         .post(config.apiBaseUrl + "/parish/getParish", data, {
    //             headers: {
    //                 "Authorization": `Bearer ${userStore.access_token}`,
    //                 "Content-Type": "application/x-www-form-urlencoded"
    //             }
    //         })
    //         .then(resp => {
    //             this.saveStorageItem('@myParishDetailStore', JSON.stringify(resp.data.data));
    //             this.saveStorageItem('@myParishChangeStore', 'true');

    //             this.getParishItems(userStore, resp.data.data.divisionCode);
    //         })
    //         .catch(error => {
    //             ToastAndroid.show(`An Error Occur - ${error.message}`, ToastAndroid.SHORT);
    //         });
    // }

    // getParishItems(userStore, parishCode) {
    //     const pcode = parishCode.replace(/"/g, "");
    //     var data = `userID=${userStore.userID}&parishCode=${pcode}`;

    //     return axios
    //         .post(config.apiBaseUrl + "/parish/getOfferings", data, {
    //             headers: {
    //                 "Authorization": `Bearer ${userStore.access_token}`,
    //                 "Content-Type": "application/x-www-form-urlencoded"
    //             }
    //         })
    //         .then(resp => {
    //             const parishItems = resp.data.data;

    //             if (parishItems.length > 1) {
    //                 ToastAndroid.show(parishItems.length + ' payment items found', ToastAndroid.SHORT);
    //                 this.saveStorageItem('@myParishItemsStore', JSON.stringify(resp.data.data));
    //                 this.saveStorageItem('@myParishItemsChangeStore', 'true');
    //             }
    //         })
    //         .catch(error => {
    //             ToastAndroid.show('Parish Items: ' + error.message, ToastAndroid.SHORT);
    //         });
    // }



    removeStorageItem = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            // Error retrieving data

        }
    }

    saveStorageItem = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            // Error retrieving data

        }
    };

    getStorageItem = async (key) => {
        let result = '';
        try {
            result = await AsyncStorage.getItem(key) || 'none';
        } catch (error) {
            // Error retrieving data

        }
        return result;
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});