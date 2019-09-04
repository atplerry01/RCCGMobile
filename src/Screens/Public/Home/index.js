import Styles from '@Screen/Public/Home/Style';
import NavigationService from '@Service/Navigation';
import Style from '@Theme/Style';
import { Badge, Button, Container, Content, Footer, FooterTab, Header, Icon, Right, Text, View } from 'native-base';
import React from 'react';
import { Dimensions, FlatList, Image, ImageBackground, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import RadioGroup from 'react-native-custom-radio-group';
import AGENTS from './Agents';
import FEATURED from './Featured';





//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const btnType = [{
    label: 'BUY',
    value: 'btn_buy'
}, {
    label: 'RENT',
    value: 'btn_rent'
}, {
    label: 'PROJECTS',
    value: 'btn_project'
}];

export default class extends React.Component {
    render() {
        return <Container style={Style.bgMain}>
            <Header style={Style.navigation}>
                <StatusBar backgroundColor="#7E8BF5" animated barStyle="light-content" />

                <View style={Style.actionBarLeft}>
                    <Button transparent style={Style.actionMenu} onPress={() => {
                        NavigationService.openDrawer()
                    }}>
                        <Image source={require('@Asset/images/menu.png')} />
                    </Button>
                </View>
                <View style={Style.actionBarMiddle}>
                    <Text style={Style.actionBarText}>{'Home'.toUpperCase()}</Text>
                </View>
                <View style={Style.actionBarRight}>
                </View>
            </Header>


            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <View style={Styles.btnLayout}>
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


                <View style={Styles.search}>
                    <TextInput placeholder={'e.g. Brixton, NW3 or NW3 5TY'} style={Styles.textInput} />
                    <Button transparent style={Styles.searchBtn} onPress={() => {
                        this.props.navigation.navigate('PublicProperties')
                    }}>
                        <Icon active name='search' type="FontAwesome" style={Styles.searchBtnIcon} />
                    </Button> 
                </View>

                <ImageBackground source={require('@Asset/images/property-bg.png')} imageStyle={'cover'} style={Styles.slider}>
                    <FlatList
                        data={FEATURED}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={Styles.flatList}
                        renderItem={({ item, separators }) => (
                            <TouchableOpacity style={Styles.itemBig} underlayColor='transparent' onPress={() => { this.props.navigation.navigate('PublicPropertyDetail') }}>
                                <View>
                                    <View>
                                        <Image source={{ uri: item.image }} style={Styles.itemImgBig} />
                                        <View style={Styles.itemNoCrv}></View>
                                        <Icon name="heart" type="MaterialCommunityIcons" style={Styles.itemFavorite} />
                                    </View>
                                    <View style={Styles.itemBg}>
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
                                            <View style={Styles.itemOverview}>
                                                <Icon name="expand" type="FontAwesome" style={Styles.itemIcon} />
                                                <Text style={Styles.itemNo}>{item.area}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </ImageBackground>

                <View style={Styles.sectionGrey}>
                    <View style={Styles.headerBg}>
                        <Icon name="map-marker-multiple" type="MaterialCommunityIcons" style={Styles.headerIcon} />
                        <Text style={Styles.sHeader}>{'Popular Cities'.toUpperCase()}</Text>
                        <Right>
                            <Button small rounded style={Styles.sBtn} onPress={() => { this.props.navigation.navigate('PublicProperties') }}>
                                <Text style={Styles.sLink} >See All</Text>
                            </Button>
                        </Right>
                    </View>
                    <View style={Styles.city}>
                        <TouchableOpacity style={Styles.btnCity} onPress={() => {
                            this.props.navigation.navigate('PublicProperties')
                        }}>
                            <Image source={{ uri: 'https://cdn.londonandpartners.com/visit/london-organisations/houses-of-parliament/63950-640x360-london-icons2-640.jpg' }} resizeMode={'cover'} style={Styles.btnCityImg} />
                            <View style={Styles.btnCityLocation}>
                                <Text style={Styles.btnCityText}>London</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.btnCity} onPress={() => {
                            this.props.navigation.navigate('PublicProperties')
                        }}>
                            <Image source={{ uri: 'https://www.visitbritain.com/sites/default/files/consumer_destinations/teaser_images/manchester_town_hall.jpg' }} resizeMode={'cover'} style={Styles.btnCityImg} />
                            <View style={Styles.btnCityLocation}>
                                <Text style={Styles.btnCityText}>Manchester</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.btnCity} onPress={() => {
                            this.props.navigation.navigate('PublicProperties')
                        }}>
                            <Image source={{ uri: 'https://i2-prod.birminghampost.co.uk/business/commercial-property/article13376659.ece/ALTERNATES/s615/Hotel-la-Tour-1.jpg' }} resizeMode={'cover'} style={Styles.btnCityImg} />
                            <View style={Styles.btnCityLocation}>
                                <Text style={Styles.btnCityText}>Birmingham</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.btnCity} onPress={() => {
                            this.props.navigation.navigate('PublicProperties')
                        }}>
                            <Image source={{ uri: 'https://calvium.com/calvium/wp-content/uploads/2014/07/shutterstock_129753212.jpg' }} resizeMode={'cover'} style={Styles.btnCityImg} />
                            <View style={Styles.btnCityLocation}>
                                <Text style={Styles.btnCityText}>Bristol</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.btnCity} onPress={() => {
                            this.props.navigation.navigate('PublicProperties')
                        }}>
                            <Image source={{ uri: 'https://media-cdn.tripadvisor.com/media/photo-s/12/1e/c7/71/mann-island-pier-head.jpg' }} resizeMode={'cover'} style={Styles.btnCityImg} />
                            <View style={Styles.btnCityLocation}>
                                <Text style={Styles.btnCityText}>Liverpool</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.btnCity} onPress={() => {
                            this.props.navigation.navigate('PublicProperties')
                        }}>
                            <Image source={{ uri: 'https://media-cdn.tripadvisor.com/media/photo-s/0f/4a/fe/6e/edinburgh-from-calton.jpg' }} resizeMode={'cover'} style={Styles.btnCityImg} />
                            <View style={Styles.btnCityLocation}>
                                <Text style={Styles.btnCityText}>Edinburgh</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={Styles.section}>
                    <View style={Styles.headerBg}>
                        <Icon name="clock" type="Feather" style={Styles.headerIcon} />
                        <Text style={Styles.sHeader}>{'Recent Properties'.toUpperCase()}</Text>
                        <Right>
                            <Button small rounded style={Styles.sBtn} onPress={() => { this.props.navigation.navigate('PublicProperties') }}>
                                <Text style={Styles.sLink} >See All</Text>
                            </Button>
                        </Right>
                    </View>
                    <FlatList
                        data={FEATURED}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={Styles.flatList}
                        renderItem={({ item, separators }) => (
                            <TouchableOpacity style={Styles.item} underlayColor='transparent' onPress={() => { this.props.navigation.navigate('PublicPropertyDetail') }}>
                                <View>
                                    <View>
                                        <Image source={{ uri: item.image }} style={Styles.itemImg} />
                                        <View style={Styles.itemNoCrv}></View>
                                        <Icon name="heart" type="MaterialCommunityIcons" style={Styles.itemFavorite} />
                                    </View>
                                    <Text style={Styles.itemPriceSm}>{item.price}</Text>
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

                <View style={Styles.sectionGrey}>
                    <View style={Styles.headerBg}>
                        <Icon name="group" type="FontAwesome" style={Styles.headerIcon} />
                        <Text style={Styles.sHeader}>{'Meet Our Agents'.toUpperCase()}</Text>
                        <Right>
                            <Button small rounded style={Styles.sBtn} onPress={() => { this.props.navigation.navigate('PublicAgents') }}>
                                <Text style={Styles.sLink} >See All</Text>
                            </Button>
                        </Right>
                    </View>
                    <FlatList
                        data={AGENTS}
                        horizontal
                        style={Styles.agents}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, separators }) => (
                            <TouchableOpacity style={Styles.itemAgent} underlayColor='transparent' onPress={() => { this.props.navigation.navigate('PublicAgentDetail') }}>
                                <View>
                                    <Image source={{ uri: item.image }} style={Styles.itemAgentImg} />
                                    <Text style={Styles.itemAgentName}>{item.name.toUpperCase()}</Text>
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
                    <Button badge vertical style={Style.bgBot} onPress={() => {
                        this.props.navigation.navigate('MemberMessages')
                    }}>
                        <Badge><Text>1</Text></Badge>
                        <Icon name="bell" type="Entypo" style={Style.textBlue} />
                    </Button>
                </FooterTab>
            </Footer>

        </Container>
    }
}