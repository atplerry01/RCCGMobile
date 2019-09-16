import TabNav from '@Component/Common/TabNav';
import AMENITIES from '@Data/Common/Amenities';
import Styles from '@Screen/Public/PropertyDetail/Style';
import Style from '@Theme/Style';
import axios from 'axios';
import { Container, Content, Icon, List, ListItem, Tab, Tabs, Text, View } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, FlatList, Image, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import { config } from '../../helpers';


//const {width, height} = Dimensions.get('window')

export default class EventDetail extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        eventDetail: '',
        eventDetailFound: false
    }

    componentDidMount() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        this.getEventDetail(itemId);
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


    renderContent() {
        const { eventDetail } = this.state;

        var gallaryLists = [];
        var contactLists = [];
        var sponsorList = [];

        if (eventDetail) {

            eventDetail.eventGalleryLists.forEach(val => {
                gallaryLists.push({ image: val.imagePath });
            });

            eventDetail.eventSponsorLists.forEach(val => {
                sponsorList.push({ image: val.imagePath });
            });
        }

        if (this.state.eventDetail) {
            return (
                <React.Fragment>
                    <ImageBackground source={{ uri: (`${eventDetail.imagePath}`) }} imageStyle={'cover'} style={Styles.coverImg}>
                        <View style={Style.actionBarIn}></View>
                    </ImageBackground>

                    <View style={Styles.section}>
                        <Text style={Styles.price}>{eventDetail.title}</Text>
                        <View style={Styles.locationTop}>
                            <Icon active name='map-marker-radius' style={Styles.locationTopIcon} type="MaterialCommunityIcons" />
                            <Text style={Styles.locationTopInfo}>{eventDetail.venue}</Text>
                        </View>
                    </View>

                    <ImageBackground source={require('@Asset/images/shadow.png')} imageStyle={'cover'} style={Styles.shadow} />

                    <View style={Styles.overview}>
                        <Text style={Styles.overviewTitle}>Overview</Text>
                        <Text style={Styles.overviewDesc}>
                            {eventDetail.detail}

                        </Text>
                    </View>

                    <View style={Styles.gallery}>
                        <Text style={Styles.galleryTitle}>Photo Gallery</Text>
                        <View style={Styles.galleryImg}>
                            <FlatList
                                data={gallaryLists}
                                horizontal
                                style={Styles.slider}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, separators }) => (
                                    <TouchableOpacity underlayColor='transparent' onPress={() => { this.props.navigation.navigate('StudentActivities') }}>
                                        <View>
                                            <Image source={{ uri: item.imagePath }} style={Styles.sliderImg} />
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />

                        </View>
                    </View>

                    <View style={Styles.amenities}>
                        <Text style={Styles.amenityTitle}>Sponsors</Text>
                        <View>

                            <FlatList
                                data={AMENITIES}
                                horizontal
                                renderItem={({ item, separators }) => (
                                    <View style={Styles.amenity}>
                                        <Image source={item.icon} style={Styles.amenityIcon} />
                                        <Text style={Styles.amenityItem}>{item.amenity}</Text>
                                    </View>
                                )}
                            />

                        </View>
                    </View>

                    {eventDetail.eventContactLists[0] &&

                        <React.Fragment>
                            <View style={Styles.owner}>
                                <Text style={Styles.ownerTitle}>Contact Agent</Text>
                                <View style={Styles.ownerAvatar}>
                                    <Image source={require('@Asset/images/avatar.png')} style={Styles.ownerAvatarImg} />
                                </View>
                                <View style={Styles.ownerInfo}>
                                    <View>
                                        <Text style={Styles.ownerName}>{eventDetail.eventContactLists[0].name}</Text>
                                        <Text style={Styles.ownerLocation}>{eventDetail.eventContactLists[0].location}</Text>
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
                                                <Text style={Styles.infoDesc}>{eventDetail.eventContactLists[0].address}, {"\n"} {eventDetail.eventContactLists[0].region}</Text>
                                            </View>
                                        </ListItem>
                                        <ListItem style={Styles.infoItem}>
                                            <Icon name="phone" type="FontAwesome" style={Styles.infoIcon} />
                                            <View>
                                                <Text style={Styles.infoHeader}>{'Phone'.toUpperCase()}</Text>
                                                <Text style={Styles.infoDesc}>{eventDetail.eventContactLists[0].phone}</Text>
                                            </View>
                                        </ListItem>
                                        <ListItem style={Styles.infoItem}>
                                            <Icon name="mail" type="Entypo" style={Styles.infoIcon} />
                                            <View>
                                                <Text style={Styles.infoHeader}>{'Email'.toUpperCase()}</Text>
                                                <Text style={Styles.infoDesc}>{eventDetail.eventContactLists[0].email}</Text>
                                            </View>
                                        </ListItem>
                                        <ListItem style={[Styles.infoItem, Styles.infoItemLast]}>
                                            <Icon name="web" type="MaterialCommunityIcons" style={Styles.infoIcon} />
                                            <View>
                                                <Text style={Styles.infoHeader}>{'Website'.toUpperCase()}</Text>
                                                <Text style={Styles.infoDesc}>{eventDetail.eventContactLists[0].website}</Text>
                                            </View>
                                        </ListItem>
                                    </List>
                                </Tab>

                            </Tabs>
                        </React.Fragment>

                    }

                </React.Fragment>
            )
        }
    }

    render() {
        const { productCartItemNumber} = this.state;
        return (
            <Container style={Style.bgMain}>
                <StatusBar backgroundColor="rgba(0,0,0,0)" animated barStyle="dark-content" />

                <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
                    {this.renderContent()}
                </Content>

  
                <TabNav navigation={this.props.navigation}
                    cartValue={productCartItemNumber? productCartItemNumber : 0} 
                    gotoCart={() => this.props.navigation.navigate('ProductCartReview')} 
                />            
            </Container>

        );
    }

    getEventDetail = (id) => {
        axios.get(config.apiUrl + `/api/events/${id}`).then(res => {
            var data = res.data ? res.data : false;

            if (data) {
                this.setState({ eventDetail: data });
            }
        }).catch(err => {
            this.setState({ eventDetailFound: false });
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