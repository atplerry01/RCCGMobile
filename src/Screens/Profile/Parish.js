import TabNav from '@Component/Common/TabNav';
import Styles from '@Theme/ParishDetail';
import Style from '@Theme/Style';
import axios from 'axios';
import { Container, Content, Icon, Text, View } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, ImageBackground, StatusBar, ToastAndroid, TouchableHighlight } from 'react-native';
import { config } from '../../helpers';

export default class MyParishScreen extends Component {

    constructor(props) {
        super(props)
        // this.registerListener();
    }

    state = {
        parishDetail: '',
        parishDetailFound: false,
        latitude: null,
        longitude: null,
        lastRefresh: Date(Date.now()).toString()
    }

    // registerListener() {
    //     this._subscribe = this.props.navigation.addListener('didFocus', async () => {
    //         const myParishChangeStore = await this.getStorageItem('@myParishChangeStore');
    //         const myParishDetailStore = await this.getStorageItem('@myParishDetailStore');

    //         if (myParishDetailStore && myParishDetailStore !== 'none' && myParishChangeStore && myParishChangeStore === 'true') {
    //             ToastAndroid.show('Parish Changed', ToastAndroid.SHORT);
    //             this.saveStorageItem('@myParishChangeStore', 'false');
    //         }
    //     });
    // }

    registerListener() {
        this._subscribe = this.props.navigation.addListener('didFocus', async () => {
            const userTokenStore = await this.getStorageItem('@userToken');
            const userProfileStore = await this.getStorageItem('@userProfileStore');

            if (userTokenStore && userTokenStore !== 'none' && userProfileStore && userProfileStore !== 'none') {
                const userToken = JSON.parse(userTokenStore);

                const userProfileStore0 = JSON.parse(userProfileStore);
                const userProfile = JSON.parse(userProfileStore0);

                if (userProfile.division.code === "") {
                    ToastAndroid.show('You have no active Parish', ToastAndroid.SHORT);
                    this.props.navigation.navigate('ParishSelector');
                } else {
                    this.getParishDetail(userToken, userProfile.division.code);
                }
            } else {
                ToastAndroid.show('You have no active Parish', ToastAndroid.SHORT);
                this.props.navigation.navigate('ParishSelector');
            }
        });
    }

    async componentDidMount() {

        this.registerListener();

        const userTokenStore = await this.getStorageItem('@userToken');
        const userProfileStore = await this.getStorageItem('@userProfileStore');

        if (userTokenStore && userTokenStore !== 'none' && userProfileStore && userProfileStore !== 'none') {
            const userToken = JSON.parse(userTokenStore);

            const userProfileStore0 = JSON.parse(userProfileStore);
            const userProfile = JSON.parse(userProfileStore0);

            if (userProfile.division.code === "") {
                ToastAndroid.show('You have no active Parish', ToastAndroid.SHORT);
                this.props.navigation.navigate('ParishSelector');
            } else {
                this.getParishDetail(userToken, userProfile.division.code);
            }
        } else {
            ToastAndroid.show('You have no active Parish', ToastAndroid.SHORT);
            this.props.navigation.navigate('ParishSelector');
        }
    }

    async reloadParish() {

        const userTokenStore = await this.getStorageItem('@userToken');
        const userProfileStore = await this.getStorageItem('@userProfileStore');

        if (userTokenStore && userTokenStore !== 'none' && userProfileStore && userProfileStore !== 'none') {
            const userToken = JSON.parse(userTokenStore);

            const userProfileStore0 = JSON.parse(userProfileStore);
            const userProfile = JSON.parse(userProfileStore0);

            if (userProfile.division.code === "") {
                ToastAndroid.show('You have no active Parish', ToastAndroid.SHORT);
                this.props.navigation.navigate('ParishSelector');
            } else {
                this.getParishDetail(userToken, userProfile.division.code);
            }
        }
    }


    renderMapView() {
        const { longitude, latitude } = this.state;

        if (latitude) {
            return (<MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}>
            </MapView>)
        }
    }

    renderContent() {
        const { myParishDetail } = this.state;

        if (this.state.myParishDetail) {
            return (
                <React.Fragment>
                    <View>
                        <Text style={{ display: 'none' }}>Last Refresh: {this.state.lastRefresh}</Text>
                    </View>
                    <ImageBackground source={{ uri: (`${myParishDetail.imageThumbPath}`) }} imageStyle={'cover'} style={Styles.coverImg}>
                        <View style={Style.actionBarIn}>
                            {/* <Button transparent style={Style.actionBarBtn} onPress={() => {
                                this.props.navigation.navigate('PublicProperties')
                            }}>
                                <Icon active name='arrow-left' style={Style.textBlack} type="MaterialCommunityIcons" />
                            </Button> */}
                        </View>
                    </ImageBackground>

                    <View style={Styles.section}>

                        <TouchableHighlight underlayColor='transparent' onPress={() => {
                            // this.props.navigation.navigate('ParishDetail', { itemId: item.id })
                            this.reloadParish()
                        }}>
                            <Text style={Styles.price}>
                                {myParishDetail.divisionName}

                            </Text>
                        </TouchableHighlight>

                        <View style={Styles.locationTop}>
                            <Icon active name='map-marker-radius' style={Styles.locationTopIcon} type="MaterialCommunityIcons" />
                            <Text style={Styles.locationTopInfo}>{myParishDetail.region} - {myParishDetail.province}</Text>
                        </View>
                    </View>

                    <ImageBackground source={require('@Asset/images/shadow.png')} imageStyle={'cover'} style={Styles.shadow} />

                    <View style={Styles.overview}>
                        <Text style={Styles.overviewTitle}>Overview</Text>
                        <Text style={Styles.overviewDesc}>
                            {myParishDetail.summary}
                        </Text>
                    </View>

                </React.Fragment>)

        } else {
            return (<React.Fragment>
                <View>
                    <Text>Loading Parish ...</Text>
                </View>
            </React.Fragment>)
        }
    }

    render() {

        return (
            <Container style={Style.bgMain}>
                <StatusBar backgroundColor="rgba(0,0,0,0)" animated barStyle="dark-content" />

                <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
                    {this.renderContent()}
                </Content>

                <TabNav navigation={this.props.navigation} />
            </Container>

        );
    }

    // async reloadParish() {

    //     const myParishDetailStore = await this.getStorageItem('@myParishDetailStore');

    //     if (myParishDetailStore) {
    //         const myParishDetail1 = JSON.parse(myParishDetailStore);
    //         const myParishDetail = JSON.parse(myParishDetail1);

    //         if (myParishDetail && myParishDetail.id) {
    //             this.setState({ myParishDetail })
    //         } else {
    //             ToastAndroid.show('You have no active Parish', ToastAndroid.SHORT);
    //             // this.props.navigation.navigate('ParishSelector');
    //         }
    //     }
    // }

    getParishDetail(userData, parishCode) {
        const pcode = parishCode.replace(/"/g, "");
        var data = `userID=${userData.userID}&parishCode=${pcode}&pageNum=1&pageSize=1`;

        return axios
            .post(config.apiBaseUrl + "/parish/getParish", data, {
                headers: {
                    "Authorization": `Bearer ${userData.access_token}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(resp => {
                this.setState({ myParishDetail: resp.data.data })
                // this.saveStorageItem('@myParishDetailStore', JSON.stringify(resp.data.data));
            })
            .catch(error => {
                ToastAndroid.show(`An Error Occur - ${error.message}`, ToastAndroid.SHORT);
            });

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