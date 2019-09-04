import Styles from '@Screen/Public/AgentDetail/Style';
import Style from '@Theme/Style';
import { Button, Container, Content, Footer, FooterTab, Icon, List, ListItem, Tab, Tabs, Text, View } from 'native-base';
import React from 'react';
import { Dimensions, Image, ImageBackground, StatusBar, TextInput } from 'react-native';




//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class extends React.Component {
    render() {
        return <Container style={Style.bgMain}>
            <StatusBar backgroundColor="#7E8BF5" animated barStyle="light-content" />

            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <View style={Styles.profile}>
                    <ImageBackground source={{ uri: ('https://cdn.stocksnap.io/img-thumbs/960w/ZUAZ22R9AL.jpg') }} imageStyle={'cover'} style={Styles.coverImg}>
                    </ImageBackground>

                    <View style={Styles.bgBlue}>
                    </View>

                    <View style={Styles.owner}>
                        <Image source={{ uri: ('https://cdn.stocksnap.io/img-thumbs/960w/ZUAZ22R9AL.jpg') }} style={Styles.ownerAvatarImg} />
                        <View style={Styles.ownerInfo}>
                            <Text style={Styles.ownerName}>Kent</Text>
                            <Text style={Styles.ownerLocation}>Liverpool, United Kingdom</Text>
                        </View>
                    </View>

                    <View style={[Styles.back, Style.actionBarIn]}>
                        <Button transparent style={Style.actionBarBtn} onPress={() => {
                            this.props.navigation.navigate('PublicAgents')
                        }}>
                            <Icon active name='arrow-left' style={Style.textWhite} type="MaterialCommunityIcons" />
                        </Button>
                    </View>
                </View>

                <Tabs tabBarUnderlineStyle={Styles.tabBorder}>
                    <Tab tabStyle={Styles.tabGrey} textStyle={Styles.tabTextActive} activeTabStyle={Styles.tabGrey} activeTextStyle={Styles.tabTextActive} heading="Intro">
                        <View style={Styles.overview}>
                            <Text style={Styles.overviewDesc}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales vitae ligula eu hendrerit. Donec in magna sodales, semper urna et, gravida enim.
                                {"\n\n"}Mauris dolor magna, sodales et finibus nec, feugiat nec enim. Nullam id arcu lacus.
                            </Text>

                        </View>
                    </Tab>
                    <Tab tabStyle={Styles.tabGrey} textStyle={Styles.tabTextActive} activeTabStyle={Styles.tabGrey} activeTextStyle={Styles.tabTextActive} heading="Contact">
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
                    <Tab tabStyle={Styles.tabGrey} textStyle={Styles.tabText} activeTabStyle={Styles.tabGrey} activeTextStyle={Styles.tabText} heading="Message">
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