import Styles from '@Screen/Member/PropertyAdd/Style';
import Style from '@Theme/Style';
import { Button, Container, Content, Footer, FooterTab, Header, Icon, Label, Text } from 'native-base';
import React from 'react';
import { Dimensions, Image, StatusBar, TouchableOpacity, View } from 'react-native';
import RadioGroup from 'react-native-custom-radio-group';



//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const propertyWizard = [{
    label: 'Overview',
    value: 'add_overview'
}, {
    label: 'Location',
    value: 'add_location'
}, {
    label: 'Amenities',
    value: 'add_amenities'
}, {
    label: 'Photos',
    value: 'add_photos'
}];

export const propertyNo = [{
    label: '1',
    value: 'no_1'
}, {
    label: '2',
    value: 'no_2'
}, {
    label: '3',
    value: 'no_3'
}, {
    label: '4',
    value: 'no_4'
}, {
    label: '5+',
    value: 'no_5'
}];

export default class extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            country: null
        }

    }
    render() {
        return <Container style={Style.bgMain}>
            <Header style={Style.navigation}>
                <StatusBar backgroundColor="#7E8BF5" animated barStyle="light-content" />

                <View style={Style.actionBarLeft}>
                    <Button transparent style={Style.actionBarBtn} onPress={() => {
                        this.props.navigation.navigate('MemberProperties')
                    }}>
                        <Icon active name='arrow-left' style={Style.textWhite} type="MaterialCommunityIcons" />
                    </Button>
                </View>
                <View style={Style.actionBarMiddle}>
                    <Text style={Style.actionBarText}>{'Create'.toUpperCase()}</Text>
                </View>
                <View style={Style.actionBarRight}>
                </View>
            </Header>

            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <View style={Styles.type}>
                    <RadioGroup
                        containerStyle={Styles.typeBg}
                        initialValue={'add_amenities'}
                        buttonContainerStyle={Styles.typeBtn}
                        buttonTextStyle={Styles.typeBtnText}
                        buttonContainerActiveStyle={Styles.typeBtnActive}
                        buttonContainerInactiveStyle={Styles.typeBtnInactive}
                        buttonTextActiveStyle={Styles.typeActiveText}
                        buttonTextInactiveStyle={Styles.typeInactiveText}
                        radioGroupList={propertyWizard} />
                </View>

                <View style={Styles.section}>

                    <View style={Styles.row}>
                        <Label style={Styles.label}>External Facilities</Label>

                        <View style={Styles.amenity}>
                            <TouchableOpacity style={Styles.amenityItem}>
                                <Image source={require('@Asset/images/garden.png')} style={Styles.amenityIcon} />
                                <Text style={Styles.amenityText}>Garden</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.amenityItem}>
                                <Image source={require('@Asset/images/parking.png')} style={Styles.amenityIcon} />
                                <Text style={Styles.amenityText}>Car Parking</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.amenityItem}>
                                <Image source={require('@Asset/images/swimmingpool.png')} style={Styles.amenityIcon} />
                                <Text style={Styles.amenityText}>Swimming Pool</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.amenityItem}>
                                <Image source={require('@Asset/images/playground.png')} style={Styles.amenityIcon} />
                                <Text style={Styles.amenityText}>Play Area</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.amenityItem}>
                                <Image source={require('@Asset/images/amenity-gym.png')} style={Styles.amenityIcon} />
                                <Text style={Styles.amenityText}>Gym</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.amenityItem}>
                                <Image source={require('@Asset/images/amenity-balcony.png')} style={Styles.amenityIcon} />
                                <Text style={Styles.amenityText}>Balcony</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={Styles.row}>
                        <Label style={Styles.label}>Internal Facilities</Label>

                        <View style={Styles.amenity}>
                            <TouchableOpacity style={Styles.amenityItem}>
                                <Image source={require('@Asset/images/computer.png')} style={Styles.amenityIcon} />
                                <Text style={Styles.amenityText}>Computer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.amenityItem}>
                                <Image source={require('@Asset/images/microwave.png')} style={Styles.amenityIcon} />
                                <Text style={Styles.amenityText}>Microwave oven</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.amenityItem}>
                                <Image source={require('@Asset/images/tv.png')} style={Styles.amenityIcon} />
                                <Text style={Styles.amenityText}>TV</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.amenityItem}>
                                <Image source={require('@Asset/images/wifi.png')} style={Styles.amenityIcon} />
                                <Text style={Styles.amenityText}>WI-FI</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.amenityItem}>
                                <Image source={require('@Asset/images/airconditioner.png')} style={Styles.amenityIcon} />
                                <Text style={Styles.amenityText}>AC</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Styles.amenityItem}>
                                <Image source={require('@Asset/images/amenity-fireplace.png')} style={Styles.amenityIcon} />
                                <Text style={Styles.amenityText}>Fireplace</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={Styles.itemFooter}>
                        <Button iconLeft transparent style={Styles.itemBtn} onPress={() => {
                            this.props.navigation.navigate('MemberPropertyAddLocation')
                        }}>
                            <Icon name="arrow-back" type="MaterialIcons" style={Styles.itemIcon} />
                            <Text style={Styles.itemText}>PREVIOUS</Text>
                        </Button>
                        <Button iconRight transparent style={Styles.itemBtnActive} onPress={() => {
                            this.props.navigation.navigate('MemberPropertyAddPhotos')
                        }}>
                            <Text style={Styles.itemText}>NEXT</Text>
                            <Icon name="arrow-forward" type="MaterialIcons" style={Styles.itemIcon} />
                        </Button>
                    </View>

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