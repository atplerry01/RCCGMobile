import Styles from '@Screen/Public/Properties/Style';
import Style from '@Theme/Style';
import { Button, Container, Content, Footer, FooterTab, Header, Icon, Text, View } from 'native-base';
import React from 'react';
import { Dimensions, FlatList, Image, StatusBar, TouchableOpacity } from 'react-native';
import FEATURED from './Featured';





//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class extends React.Component {
    render() {
        return <Container style={Style.bgMain}>
            <Header style={Style.navigation}>
                <StatusBar backgroundColor="#7E8BF5" animated barStyle="light-content" />

                <View style={Style.actionBarLeft}>
                    <Button transparent style={Style.actionBarBtn} onPress={() => {
                        this.props.navigation.navigate('PublicHome')
                    }}>
                        <Icon active name='arrow-left' style={Style.textWhite} type="MaterialCommunityIcons" />
                    </Button>
                </View>
                <View style={Style.actionBarMiddle}>
                    <Text style={Style.actionBarText}>{'Properties'.toUpperCase()}</Text>
                </View>
                <View style={Style.actionBarRight}>
                    <Button transparent style={Style.actionBtnRight} onPress={() => {
                        this.props.navigation.navigate('PublicPropertySearch')
                    }}>
                        <Icon active name='search' style={Style.actionIcon} type="FontAwesome" />
                    </Button>
                </View>
            </Header>


            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <View style={Styles.section}>
                    <FlatList
                        data={FEATURED}
                        showsHorizontalScrollIndicator={false}
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
                                        <View style={Styles.itemOverview}>
                                            <Icon name="expand" type="FontAwesome" style={Styles.itemIcon} />
                                            <Text style={Styles.itemNo}>{item.area}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>

            </Content>

            <Footer style={Style.greyTopLine}>
                <FooterTab style={Style.bgFilter}>
                    <Button style={Style.bgFilter} onPress={() => {
                        this.props.navigation.navigate('PublicProperties')
                    }}>
                        <Icon name="sort-amount-asc" type="FontAwesome" style={Style.textBlue} />
                        <Text style={Style.textBlack}>Sort by</Text>
                    </Button>
                    <Button style={Style.bgFilter} onPress={() => {
                        this.props.navigation.navigate('PublicPropertySearch')
                    }}>
                        <Icon name="filter" type="FontAwesome" style={Style.textBlue} />
                        <Text style={Style.textBlack}>Filter</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    }
}