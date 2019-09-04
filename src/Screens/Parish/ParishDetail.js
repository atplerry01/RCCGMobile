import TabNav from '@Component/Common/TabNav';
import Styles from '@Theme/ParishDetail';
import Style from '@Theme/Style';
import axios from 'axios';
import { MapView } from 'expo';
import { Container, Content, Icon, Text, View } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, ImageBackground, StatusBar } from 'react-native';
import { config } from '../../helpers';

//const {width, height} = Dimensions.get('window')

export default class ParishDetail extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        parishDetail: '',
        parishDetailFound: false,
        latitude: null,
        longitude: null
    }

    componentDidMount = async() => {
        const userToken = await this.getStorageItem('@userToken');
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');

        if (userToken && userToken !== 'none') {
            const userData = JSON.parse(userToken);
            this.getParishDetail(userData, itemId);
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
        const { parishDetail } = this.state;

        // if (parishDetail) {
        //     parishDetail.parishGalleryLists.forEach(val => {
        //         gallaryLists.push({ image: val.imagePath });
        //     });

        //     parishDetail.parishSponsorLists.forEach(val => {
        //         sponsorList.push({ image: val.imagePath });
        //     });
        // }

        if (this.state.parishDetail) {
            return (
                <React.Fragment>
                    <ImageBackground source={{ uri: (`${parishDetail.imageThumbPath}`) }} imageStyle={'cover'} style={Styles.coverImg}>
                        <View style={Style.actionBarIn}>
                            {/* <Button transparent style={Style.actionBarBtn} onPress={() => {
                                this.props.navigation.navigate('PublicProperties')
                            }}>
                                <Icon active name='arrow-left' style={Style.textBlack} type="MaterialCommunityIcons" />
                            </Button> */}
                        </View>
                    </ImageBackground>

                    <View style={Styles.section}>
                        <Text style={Styles.price}>{parishDetail.divisionName}</Text>
                        <View style={Styles.locationTop}>
                            <Icon active name='map-marker-radius' style={Styles.locationTopIcon} type="MaterialCommunityIcons" />
                            <Text style={Styles.locationTopInfo}>{parishDetail.region} - {parishDetail.province}</Text>
                        </View>
                    </View>

                    <ImageBackground source={require('@Asset/images/shadow.png')} imageStyle={'cover'} style={Styles.shadow} />

                    <View style={Styles.overview}>
                        <Text style={Styles.overviewTitle}>Overview</Text>
                        <Text style={Styles.overviewDesc}>
                            {parishDetail.summary}
                        </Text>
                    </View>
                    {/* 
                    <View style={Styles.location}>
                        <Text style={Styles.locationTitle}>Parish Map Location</Text>
                        <View style={Styles.locationMap}>
                            {this.renderMapView()}
                        </View>
                    </View> */}
{/* 
                    {parishDetail.parishContactLists[0] &&
                        <React.Fragment>
                            <View style={Styles.owner}>
                                <Text style={Styles.ownerTitle}>Contact Pastor</Text>
                                <View style={Styles.ownerAvatar}>
                                    <Image source={require('@Asset/images/avatar.png')} style={Styles.ownerAvatarImg} />
                                </View>
                                <View style={Styles.ownerInfo}>
                                    <View>
                                        <Text style={Styles.ownerName}>{parishDetail.parishContactLists[0].name}</Text>
                                        <Text style={Styles.ownerLocation}>{parishDetail.parishContactLists[0].location}</Text>
                                    </View>
                                </View>
                            </View>
                            <Tabs tabBarUnderlineStyle={Styles.tabBorder}>
                                <Tab tabStyle={Styles.tabGrey} textStyle={Styles.tabTextActive} activeTabStyle={Styles.tabGrey} activeTextStyle={Styles.tabTextActive} heading="Informations">
                                    <List style={Styles.infoTab}>
                                        <ListItem style={Styles.infoItem}>
                                            <Icon name="map-marker-radius" type="MaterialCommunityIcons" style={Styles.infoIcon} />
                                            <View>
                                                <Text style={Styles.infoHeader}>{'Address'.toUpperCase()}</Text>
                                                <Text style={Styles.infoDesc}>{parishDetail.parishContactLists[0].address}</Text>
                                            </View>
                                        </ListItem>
                                        <ListItem style={Styles.infoItem}>
                                            <Icon name="phone" type="FontAwesome" style={Styles.infoIcon} />
                                            <View>
                                                <Text style={Styles.infoHeader}>{'Phone'.toUpperCase()}</Text>
                                                <Text style={Styles.infoDesc}>{parishDetail.parishContactLists[0].phone}</Text>
                                            </View>
                                        </ListItem>
                                        <ListItem style={Styles.infoItem}>
                                            <Icon name="mail" type="Entypo" style={Styles.infoIcon} />
                                            <View>
                                                <Text style={Styles.infoHeader}>{'Email'.toUpperCase()}</Text>
                                                <Text style={Styles.infoDesc}>{parishDetail.parishContactLists[0].email}</Text>
                                            </View>
                                        </ListItem>
                                        <ListItem style={[Styles.infoItem, Styles.infoItemLast]}>
                                            <Icon name="web" type="MaterialCommunityIcons" style={Styles.infoIcon} />
                                            <View>
                                                <Text style={Styles.infoHeader}>{'Website'.toUpperCase()}</Text>
                                                <Text style={Styles.infoDesc}>{parishDetail.parishContactLists[0].website}</Text>
                                            </View>
                                        </ListItem>
                                    </List>
                                </Tab>
                            </Tabs>
                        </React.Fragment>
                    } */}


                </React.Fragment>)

        } else {
            return (<React.Fragment>
                <View>
                    <Text>Loading</Text>
                </View>
            </React.Fragment>)
        }
    }

    render() {
        const { parishDetail, longitude, latitude } = this.state;
      
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

    
    getParishDetail = (userStore, parishCode) => {
        var data = `userID=${userStore.userID}&parishCode=${parishCode}&pageNum=1&pageSize=1`;

        return axios
            .post(config.apiBaseUrl + "/parish/getParish", data, {
                headers: {
                    "Authorization": `Bearer ${userStore.access_token}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(resp => {
                this.setState({ parishDetail: resp.data.data, parishesFound: true });
            })
            .catch(error => {
                ToastAndroid.show(`An Error Occur - ${error.message}`, ToastAndroid.SHORT);
            });
    }

    getParishDetail2 = (parishCode) => {
        axios.get(config.apiUrl + `/api/parishes/${parishCode}`).then(res => {
            var data = res.data ? res.data : false;

            if (data) {
                this.setState({ parishDetail: data });
            }
        }).catch(err => {
            this.setState({ parishDetailFound: false });
        })
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