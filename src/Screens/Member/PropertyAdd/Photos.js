import Styles from '@Screen/Member/PropertyAdd/Style';
import Style from '@Theme/Style';
import { Button, Container, Content, Footer, FooterTab, Header, Icon, Label, Text } from 'native-base';
import React from 'react';
import { Dimensions, Image, StatusBar, View } from 'react-native';
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
                        initialValue={'add_photos'}
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
                        <Label style={Styles.label}>Upload Photos</Label>

                        <View style={Styles.photoUpload}>
                            <Button iconLeft transparent style={Styles.photoUploadBtn} onPress={() => {
                                this.props.navigation.navigate('MemberPropertyAddAmenities')
                            }}>
                                <Icon name="upload" type="FontAwesome" style={Styles.photoUploadIcon} />
                                <Text style={Styles.photoUploadText}>Select Photos</Text>
                            </Button>
                        </View>

                    </View>

                    <View style={Styles.row}>
                        <Label style={Styles.label}>Photos</Label>

                        <View style={Styles.photo}>
                            <View style={Styles.photoItem}>
                                <Image source={{ uri: 'https://houseofhargrove.com/wp-content/uploads/2017/10/Beautiful-Exteriors1.jpg' }} style={Styles.photoIcon} />
                                <Button style={Styles.photoDelete}>
                                    <Icon name="trash" type="FontAwesome" style={Styles.photoDeleteIcon} />
                                </Button>
                            </View>
                            <View style={Styles.photoItem}>
                                <Image source={{ uri: 'https://marketplace.canva.com/MACViAoaMik/1/screen/canva-kitchen%2C-home%2C-house%2C-interior%2C-modern%2C-room%2C-floor-MACViAoaMik.jpg' }} style={Styles.photoIcon} />
                                <Button style={Styles.photoDelete}>
                                    <Icon name="trash" type="FontAwesome" style={Styles.photoDeleteIcon} />
                                </Button>
                            </View>
                            <View style={Styles.photoItem}>
                                <Image source={{ uri: 'https://marketplace.canva.com/MACV3QT96xw/1/screen/canva-interior-design%2C-home%2C-house%2C-design%2C-room%2C-furniture-MACV3QT96xw.jpg' }} style={Styles.photoIcon} />
                                <Button style={Styles.photoDelete}>
                                    <Icon name="trash" type="FontAwesome" style={Styles.photoDeleteIcon} />
                                </Button>
                            </View>
                            <View style={Styles.photoItem}>
                                <Image source={{ uri: 'https://marketplace.canva.com/MAC3YeUwhqQ/1/screen/canva-furniture%2C-chair%2C-interior%2C-modern%2C-room%2C-home%2C-table-MAC3YeUwhqQ.jpg' }} style={Styles.photoIcon} />
                                <Button style={Styles.photoDelete}>
                                    <Icon name="trash" type="FontAwesome" style={Styles.photoDeleteIcon} />
                                </Button>
                            </View>
                            <View style={Styles.photoItem}>
                                <Image source={{ uri: 'https://marketplace.canva.com/MAC4hLqI8bY/1/screen/canva-interior%2C-living-room%2C-living-room-interior%2C-living-MAC4hLqI8bY.jpg' }} style={Styles.photoIcon} />
                                <Button style={Styles.photoDelete}>
                                    <Icon name="trash" type="FontAwesome" style={Styles.photoDeleteIcon} />
                                </Button>
                            </View>
                            <View style={Styles.photoItem}>
                                <Image source={{ uri: 'https://i.pinimg.com/736x/17/48/86/1748869b10e305dfd5403c84fff02d22--zen-bedrooms-luxury-bedrooms.jpg' }} style={Styles.photoIcon} />
                                <Button style={Styles.photoDelete}>
                                    <Icon name="trash" type="FontAwesome" style={Styles.photoDeleteIcon} />
                                </Button>
                            </View>
                        </View>

                    </View>

                    <View style={Styles.itemFooter}>
                        <Button iconLeft transparent style={Styles.itemBtn} onPress={() => {
                            this.props.navigation.navigate('MemberPropertyAddAmenities')
                        }}>
                            <Icon name="arrow-back" type="MaterialIcons" style={Styles.itemIcon} />
                            <Text style={Styles.itemText}>PREVIOUS</Text>
                        </Button>
                        <Button iconRight transparent style={Styles.itemBtnActive} onPress={() => {
                            this.props.navigation.navigate('MemberPropertyAddPublished')
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