import Styles from '@Theme/ProfileDetail';
import Style from '@Theme/Style';
import { Container, Content, Icon, List, ListItem, Tab, Tabs, Text, View } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, Image, ImageBackground, StatusBar } from 'react-native';
import TabNav from '../../Component/Common/TabNav';
// import Modal from 'react-native-modal';

export default class MyProfileScreen extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        myprofile: {},
        myprofileFound: false,
        myParish: {},
        isParishSet: true
    }

    async componentDidMount() {
        const userProfileStore = await this.getStorageItem('@userProfileStore');

        if (userProfileStore && userProfileStore !== 'none') {
            const userProfile1 = JSON.parse(userProfileStore);
            const userProfile = JSON.parse(userProfile1);
            
            if (userProfile && userProfile.id) {
                this.setState({userProfile});
            } else {
                // TODO:
            }
        }

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
        let { userProfile, productCartItemNumber } = this.state;

        return <Container style={Style.bgMain}>
            <StatusBar backgroundColor="#7E8BF5" animated barStyle="light-content" />

            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <View style={Styles.profile}>
                    <ImageBackground source={{ uri: ('https://image.shutterstock.com/image-vector/male-default-placeholder-avatar-profile-260nw-387516178.jpg') }} imageStyle={'cover'} style={Styles.coverImg}>
                    </ImageBackground>

                    <View style={Styles.bgBlue}>
                    </View>

                    <View style={Styles.owner}>
                        <Image source={{ uri: ('https://image.shutterstock.com/image-vector/male-default-placeholder-avatar-profile-260nw-387516178.jpg') }} style={Styles.ownerAvatarImg} />
                        <View style={Styles.ownerInfo}>
                            {
                                userProfile && (
                                    <React.Fragment>
                                        <Text style={Styles.ownerName}>{userProfile.lastname} {userProfile.firstname}</Text>
                                        <Text style={Styles.ownerLocation}>{userProfile.address} {userProfile.country}</Text>
                                    </React.Fragment>
                                )
                            }


                        </View>
                    </View>

                </View>

                <Tabs tabBarUnderlineStyle={Styles.tabBorder}>
                    {/* <Tab tabStyle={Styles.tabGrey} textStyle={Styles.tabTextActive} activeTabStyle={Styles.tabGrey} activeTextStyle={Styles.tabTextActive} heading="Intro">
                        <View style={Styles.overview}>
                            <Text style={Styles.overviewDesc}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales vitae ligula eu hendrerit. Donec in magna sodales, semper urna et, gravida enim.
                                {"\n\n"}Mauris dolor magna, sodales et finibus nec, feugiat nec enim. Nullam id arcu lacus.
                            </Text>

                        </View>
                    </Tab> */}
                    <Tab tabStyle={Styles.tabGrey} textStyle={Styles.tabTextActive} activeTabStyle={Styles.tabGrey} activeTextStyle={Styles.tabTextActive} heading="Contact">
                        <List style={Styles.infoTab}>
                            <ListItem style={Styles.infoItem}>
                                <Icon name="map-marker-radius" type="MaterialCommunityIcons" style={Styles.infoIcon} />
                                <View>
                                    <Text style={Styles.infoHeader}>{'Address'.toUpperCase()}</Text>
                                    {userProfile && (
                                        <Text style={Styles.infoDesc}>{userProfile.address}, {"\n"} {userProfile.country}</Text>
                                    )}
                                </View>
                            </ListItem>
                            <ListItem style={Styles.infoItem}>
                                <Icon name="phone" type="FontAwesome" style={Styles.infoIcon} />
                                <View>
                                    <Text style={Styles.infoHeader}>{'Phone'.toUpperCase()}</Text>
                                    {userProfile && (<Text style={Styles.infoDesc}>{userProfile.phone}</Text>)}
                                    
                                </View>
                            </ListItem>
                            <ListItem style={Styles.infoItem}>
                                <Icon name="mail" type="Entypo" style={Styles.infoIcon} />
                                <View>
                                    <Text style={Styles.infoHeader}>{'Email'.toUpperCase()}</Text>
                                    {userProfile && (<Text style={Styles.infoDesc}>{userProfile.email}</Text>)}
                                    
                                </View>
                            </ListItem>

                            <ListItem style={Styles.infoItem}>
                                <Icon name="church" type="MaterialCommunityIcons" style={Styles.infoIcon} />
                                <View>
                                    <Text style={Styles.infoHeader}>{'Parish'.toUpperCase()}</Text>
                                    {userProfile && (<Text style={Styles.infoDesc}>{userProfile.division.name}</Text>)}
                                    
                                </View>
                            </ListItem>

                            {/* <ListItem style={[Styles.infoItem, Styles.infoItemLast]}>
                                <Icon name="web" type="MaterialCommunityIcons" style={Styles.infoIcon} />
                                <View>
                                    <Text style={Styles.infoHeader}>{'Website'.toUpperCase()}</Text>
                                    <Text style={Styles.infoDesc}>www.rccg.org</Text>
                                </View>
                            </ListItem> */}
                        </List>
                    </Tab>
                </Tabs>

            </Content>

  
            <TabNav navigation={this.props.navigation}
                    cartValue={productCartItemNumber? productCartItemNumber : 0} 
                    gotoCart={() => this.props.navigation.navigate('ProductCartReview')} 
                />
        </Container>
    }


    getStorageItem = async (key) => {
        let result = '';
        try {
            result = await AsyncStorage.getItem(key) || 'none';
        } catch (error) {
            
        }
        return result;
    }

    saveStorageItem = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            
        }
    };

}