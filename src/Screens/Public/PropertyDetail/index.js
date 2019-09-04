import Styles from '@Screen/Public/PropertyDetail/Style';
import Style from '@Theme/Style';
import { Button, Container, Content, Footer, FooterTab, Icon, List, ListItem, Right, Tab, Tabs, Text, View } from 'native-base';
import React from 'react';
import { Dimensions, FlatList, Image, ImageBackground, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import AMENITIES from './Amenities';
import GALLERY from './Gallery';
import SIMILAR from './Similar';






//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class extends React.Component {
    render() {
        return <Container style={Style.bgMain}>
            <StatusBar backgroundColor="rgba(0,0,0,0)" animated barStyle="dark-content" />

            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <ImageBackground source={{ uri: ('https://houseofhargrove.com/wp-content/uploads/2017/10/Beautiful-Exteriors1.jpg') }} imageStyle={'cover'} style={Styles.coverImg}>
                    <View style={Style.actionBarIn}>
                        <Button transparent style={Style.actionBarBtn} onPress={() => {
                            this.props.navigation.navigate('PublicProperties')
                        }}>
                            <Icon active name='arrow-left' style={Style.textBlack} type="MaterialCommunityIcons" />
                        </Button>
                    </View>
                </ImageBackground>

                <View style={Styles.section}>
                    <Text style={Styles.price}>$2,850,000</Text>
                    <View style={Styles.locationTop}>
                        <Icon active name='map-marker-radius' style={Styles.locationTopIcon} type="MaterialCommunityIcons" />
                        <Text style={Styles.locationTopInfo}>Bristol, England</Text>
                    </View>
                </View>

                <View style={Styles.count}>
                    <View style={[Styles.countItem, Styles.countFirst]}>
                        <View style={Styles.countCol}>
                            <Icon name="bed" type="FontAwesome" style={Styles.countIcon} />
                            <View>
                                <Text style={Styles.countNo}>5</Text>
                                <Text style={Styles.countText}>Beds</Text>
                            </View>
                        </View>
                    </View>
                    <View style={Styles.countItem}>
                        <View style={Styles.countCol}>
                            <Icon name="bathtub" type="FontAwesome" style={Styles.countIcon} />
                            <View>
                                <Text style={Styles.countNo}>5</Text>
                                <Text style={Styles.countText}>Baths</Text>
                            </View>
                        </View>
                    </View>
                    <View style={Styles.countItem}>
                        <View style={Styles.countCol}>
                            <Icon name="bathtub" type="FontAwesome" style={Styles.countIcon} />
                            <View>
                                <Text style={Styles.countNo}>4,700</Text>
                                <Text style={Styles.countText}>Sq.ft</Text>
                            </View>
                        </View>
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

                <View style={Styles.amenities}>
                    <Text style={Styles.amenityTitle}>Amenities</Text>
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

                <View style={Styles.location}>
                    <Text style={Styles.locationTitle}>Location</Text>
                    <View style={Styles.locationMap}>

                    </View>
                </View>

                <View style={Styles.owner}>
                    <Text style={Styles.ownerTitle}>Contact Agent</Text>
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

                <View style={Styles.sectionGrey}>
                    <View style={Styles.headerBg}>
                        <Text style={Styles.sHeader}>{'Similar Properties'.toUpperCase()}</Text>
                        <Right>
                            <Button small rounded style={Styles.sBtn} onPress={() => { this.props.navigation.navigate('PublicProperties') }}>
                                <Text style={Styles.sLink} >See All</Text>
                            </Button>
                        </Right>
                    </View>
                    <FlatList
                        data={SIMILAR}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={Styles.flatList}
                        renderItem={({ item, separators }) => (
                            <TouchableOpacity style={Styles.item} underlayColor='transparent' onPress={() => { this.props.navigation.navigate('PublicPropertyDetail') }}>
                                <View>
                                    <View>
                                        <Image source={{ uri: item.image }} style={Styles.itemImg} />
                                        <Icon name="heart" type="MaterialCommunityIcons" style={Styles.itemFavorite} />
                                    </View>
                                    <Text style={Styles.itemPrice}>{item.price}</Text>
                                    <Text style={Styles.itemLocation}>{item.location}</Text>
                                    <View style={Styles.itemRow}>
                                        <View style={Styles.itemOverview}>
                                            <Icon name="bed" type="FontAwesome" style={Styles.itemIcon} />
                                            <Text style={Styles.itemNo}>{item.bedroom}</Text>
                                        </View>
                                        <View style={Styles.itemOverview}>
                                            <Icon name="bathtub" type="FontAwesome" style={Styles.itemIcon} />
                                            <Text style={Styles.itemNo}>{item.bathroom}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>



            </Content>

            <Footer style={Style.greyTopLine}>
                <FooterTab style={Style.bgBot}>
                    <Button style={Style.bgBot} onPress={() => {
                        this.props.navigation.navigate('PublicHome')
                    }}>
                        <Icon name="home" type="FontAwesome" style={Style.textBlue} />
                    </Button>
                    <Button style={Style.bgBot} onPress={() => {
                        this.props.navigation.navigate('PublicPropertySearch')
                    }}>
                        <Icon name="search" type="Octicons" style={Style.textBlue} />
                    </Button>
                    <Button style={Style.bgBot} onPress={() => {
                        this.props.navigation.navigate('MemberHome')
                    }}>
                        <Icon name="user" type="FontAwesome" style={Style.textActive} />
                    </Button>
                    <Button style={Style.bgBot} onPress={() => {
                        this.props.navigation.navigate('MemberFavorites')
                    }}>
                        <Icon name="heart" type="FontAwesome" style={Style.textBlue} />
                    </Button>
                    <Button style={Style.bgBot} onPress={() => {
                        this.props.navigation.navigate('MemberMessages')
                    }}>
                        <Icon name="bell" type="Entypo" style={Style.textBlue} />
                    </Button>
                </FooterTab>
            </Footer>

        </Container>
    }
}