import TabNav from '@Component/Common/TabNav';
import GALLERY from '@Data/Common/Gallery';
import Styles from '@Theme/ParishDetail';
import Style from '@Theme/Style';
import axios from 'axios';
import { Button, Container, Content, Icon, List, ListItem, Tab, Tabs, Text, View } from 'native-base';
import React, { Component } from 'react';
import { FlatList, Image, ImageBackground, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { config } from '../../helpers';


//const {width, height} = Dimensions.get('window')

export default class PrayerRoomDetail extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        prayerroomDetail: '',
        prayerroomDetailFound: false
    }

    componentDidMount() {
        this.getPrayerRoomDetail();
    }


    render() {
        const { prayerroomDetail } = this.state;

        return (
            <Container style={Style.bgMain}>
                <StatusBar backgroundColor="rgba(0,0,0,0)" animated barStyle="dark-content" />

                <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                    <ImageBackground source={{ uri: ('https://houseofhargrove.com/wp-content/uploads/2017/10/Beautiful-Exteriors1.jpg') }} imageStyle={'cover'} style={Styles.coverImg}>
                        <View style={Style.actionBarIn}>
                            {/* <Button transparent style={Style.actionBarBtn} onPress={() => {
                                this.props.navigation.navigate('PublicProperties')
                            }}>
                                <Icon active name='arrow-left' style={Style.textBlack} type="MaterialCommunityIcons" />
                            </Button> */}
                        </View>
                    </ImageBackground>

                    <View style={Styles.section}>
                        <Text style={Styles.price}>$2,850,000</Text>
                        <View style={Styles.locationTop}>
                            <Icon active name='map-marker-radius' style={Styles.locationTopIcon} type="MaterialCommunityIcons" />
                            <Text style={Styles.locationTopInfo}>Bristol, England</Text>
                        </View>
                    </View>

                    <ImageBackground source={require('@Asset/images/shadow.png')} imageStyle={'cover'} style={Styles.shadow} />

                    <View style={Styles.overview}>
                        <Text style={Styles.overviewTitle}>Overview</Text>
                        <Text style={Styles.overviewDesc}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales vitae ligula eu hendrerit. Donec in magna sodales, semper urna et, gravida enim.
                    {"\n\n"}Etiam sagittis turpis a ligula finibus dignissim. Fusce fermentum diam sed vulputate fringilla. Integer interdum, sem sed tincidunt iaculis, odio ante ultricies libero, non tempus nisl erat non enim.
                    {"\n\n"}Mauris dolor magna, sodales et finibus nec, feugiat nec enim. Nullam id arcu lacus.
                </Text>
                    </View>

                    <View style={Styles.gallery}>
                        <Text style={Styles.galleryTitle}>Photo Gallery</Text>
                        <View style={Styles.galleryImg}>
                            <FlatList
                                data={GALLERY}
                                horizontal
                                style={Styles.slider}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, separators }) => (
                                    <TouchableOpacity underlayColor='transparent' onPress={() => { this.props.navigation.navigate('StudentActivities') }}>
                                        <View>
                                            <Image source={{ uri: item.image }} style={Styles.sliderImg} />
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />

                        </View>
                    </View>


                    <View style={Styles.location}>
                        <Text style={Styles.locationTitle}>Location</Text>
                        <View style={Styles.locationMap}>

                        </View>
                    </View>

                    <View style={Styles.owner}>
                        <Text style={Styles.ownerTitle}>Contact Pastor</Text>
                        <View style={Styles.ownerAvatar}>
                            <Image source={require('@Asset/images/avatar.png')} style={Styles.ownerAvatarImg} />
                        </View>
                        <View style={Styles.ownerInfo}>
                            <View>
                                <Text style={Styles.ownerName}>Charles S</Text>
                                <Text style={Styles.ownerLocation}>Liverpool, United Kingdom</Text>
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
                                        <Text style={Styles.infoDesc}>3-277-10, Susan Apartment, {"\n"}Liverpool, United Kingdoom</Text>
                                    </View>
                                </ListItem>
                                <ListItem style={Styles.infoItem}>
                                    <Icon name="phone" type="FontAwesome" style={Styles.infoIcon} />
                                    <View>
                                        <Text style={Styles.infoHeader}>{'Phone'.toUpperCase()}</Text>
                                        <Text style={Styles.infoDesc}>+01 1234567982 / +01 9874658231</Text>
                                    </View>
                                </ListItem>
                                <ListItem style={Styles.infoItem}>
                                    <Icon name="mail" type="Entypo" style={Styles.infoIcon} />
                                    <View>
                                        <Text style={Styles.infoHeader}>{'Email'.toUpperCase()}</Text>
                                        <Text style={Styles.infoDesc}>info@rccg.org</Text>
                                    </View>
                                </ListItem>
                                <ListItem style={[Styles.infoItem, Styles.infoItemLast]}>
                                    <Icon name="web" type="MaterialCommunityIcons" style={Styles.infoIcon} />
                                    <View>
                                        <Text style={Styles.infoHeader}>{'Website'.toUpperCase()}</Text>
                                        <Text style={Styles.infoDesc}>www.rccg.org</Text>
                                    </View>
                                </ListItem>
                            </List>
                        </Tab>
                        <Tab tabStyle={Styles.tabGrey} textStyle={Styles.tabText} activeTabStyle={Styles.tabGrey} activeTextStyle={Styles.tabText} heading="Enquire Now">
                            <View style={Styles.formBg}>
                                <View style={Styles.col}>
                                    <TextInput style={Styles.textInputHalf} placeholder={'First Name'} />
                                    <TextInput style={Styles.textInputHalf} placeholder={'Last Name'} />
                                </View>
                                <TextInput style={Styles.textInput} placeholder={'Your Email Address'} />
                                <TextInput style={Styles.textInput} placeholder={'Your Mobile No.'} />
                                <TextInput style={Styles.textInputMulti} multiline={true} numberOfLines={8} placeholder={'Your Message'} />
                                <Button style={Styles.btn} onPress={() => {
                                    this.props.navigation.navigate('MemberLogin')
                                }}>
                                    <Text style={Styles.formBtnText}>{'Send'.toUpperCase()}</Text>
                                    <Icon active name='envelope' type="FontAwesome" style={Styles.formBtnIcon} />
                                </Button>
                            </View>
                        </Tab>
                    </Tabs>


                </Content>

                <TabNav navigation={this.props.navigation} />
            </Container>
        );
    }

    
    getPrayerRoomDetail = () => {
        axios.get(config.apiUrl + '/prayerrooms/1').then(res => {
            var data = res.data ? res.data : false;

            if (data) {
                this.setState({ prayerroomDetail: data });
            }
        }).catch(err => {
            this.setState({prayerroomDetailFound: false });
        })
    }


}