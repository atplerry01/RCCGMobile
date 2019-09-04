import Styles from '@Screen/Member/Favorites/Style';
import Style from '@Theme/Style';
import { Button, Container, Content, Footer, FooterTab, Header, Icon, Text } from 'native-base';
import React from 'react';
import { Dimensions, FlatList, Image, ImageBackground, StatusBar, TouchableHighlight, View } from 'react-native';
import PROPERTIES from './Properties';

//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class extends React.Component {
    render() {
        return <Container style={Style.bgMain}>
            <Header style={Style.navigation}>
                <StatusBar backgroundColor="#7E8BF5" animated barStyle="light-content" />

                <View style={Style.actionBarLeft}>
                    <Button transparent style={Style.actionBarBtn} onPress={() => {
                        this.props.navigation.navigate('MemberHome')
                    }}>
                        <Icon active name='arrow-left' style={Style.textWhite} type="MaterialCommunityIcons" />
                    </Button>
                </View>
                <View style={Style.actionBarMiddle}>
                    <Text style={Style.actionBarText}>{'Favorites'.toUpperCase()}</Text>
                </View>
                <View style={Style.actionBarRight}>
                </View>
            </Header>

            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <ImageBackground source={require('@Asset/images/property-bg.png')} style={Styles.homeBg}>

                    <View style={Styles.section}>
                        <FlatList
                            data={PROPERTIES}
                            style={Styles.item}
                            renderItem={({ item, separators }) => (
                                <TouchableHighlight underlayColor='transparent' onPress={() => { this.props.navigation.navigate('PublicPropertyDetail') }}>
                                    <View style={Styles.record}>
                                        <Image source={{ uri: item.image }} style={Styles.itemImg} />
                                        <View style={Styles.itemInfo}>
                                            <Text style={Styles.itemTitle}>{item.price}</Text>
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
                                        <View style={Styles.trash}>
                                            <Button transparent onPress={() => {
                                                this.props.navigation.navigate('MemberFavorites')
                                            }}>
                                                <Icon name="trash-o" type="FontAwesome" style={Styles.itemIcon} />
                                            </Button>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            )}
                        />
                    </View>


                </ImageBackground>

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
                        <Icon name="heart" type="FontAwesome" style={Style.textBlueActive} />
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