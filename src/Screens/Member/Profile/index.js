import Styles from '@Screen/Member/Profile/Style';
import Style from '@Theme/Style';
import { Accordion, Button, Container, Content, Footer, FooterTab, Icon, Text, View } from 'native-base';
import React from 'react';
import { Dimensions, Image, ImageBackground, Picker, StatusBar, TextInput } from 'react-native';




//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            gender: null
        }

        this.renderAccordionHeader = this.renderAccordionHeader.bind(this)
        this.renderAccordionContent = this.renderAccordionContent.bind(this)
        this.renderAccordionContentBasic = this.renderAccordionContentBasic.bind(this)
        this.renderAccordionContentAddress = this.renderAccordionContentAddress.bind(this)
        this.renderAccordionContentContact = this.renderAccordionContentContact.bind(this)
        this.renderAccordionContentSocial = this.renderAccordionContentSocial.bind(this)
    }
    renderAccordionHeader(item, expanded) {
        return (
            <View style={Styles.accordionTab}>
                <Text style={Styles.accordionTabText}>
                    {" "}{item.title}
                </Text>
                {expanded
                    ? <Icon style={Styles.accordionTabIcon} name="minus" type="Foundation" />
                    : <Icon style={Styles.accordionTabIcon} name="plus" type="Foundation" />}
            </View>
        );
    }
    renderAccordionContent(item) {
        var fn = 'renderAccordionContent' + (item.type.charAt(0).toUpperCase() + item.type.substr(1));
        return <View style={Styles.accordionContent}>
            {this[fn]()}
        </View>
    }
    renderAccordionContentBasic() {
        return <View>
            <View style={Styles.col}>
                <TextInput style={Styles.textInputHalf} placeholder={'First Name'} />
                <TextInput style={Styles.textInputHalf} placeholder={'Last Name'} />
            </View>
            <View style={Styles.formPicker}>
                <Picker
                    selectedValue={this.state.gender}
                    onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}>
                    <Picker.Item label="Male" value="male" style={Styles.pickerText} />
                    <Picker.Item label="Female" value="female" />
                </Picker>
            </View>
            <TextInput style={Styles.textInputMulti} multiline={true} numberOfLines={8} placeholder={'About You'} />
            <Button style={Styles.btn} onPress={() => {
                this.props.navigation.navigate('MemberHome')
            }}>
                <Text style={Styles.formBtnText}>{'Save'.toUpperCase()}</Text>
                <Icon active name='arrow-right' type="Feather" style={Styles.formBtnIcon} />
            </Button>
        </View>
    }
    renderAccordionContentAddress() {
        return <View>
            <TextInput style={Styles.textInputMulti} multiline={true} numberOfLines={2} placeholder={'Address'} />
            <View style={Styles.col}>
                <TextInput style={Styles.textInputHalf} placeholder={'City'} />
                <TextInput style={Styles.textInputHalf} placeholder={'State'} />
            </View>
            <TextInput style={Styles.textInput} placeholder={'Country'} />
            <TextInput style={Styles.textInput} placeholder={'Postcode'} />
            <Button style={Styles.btn} onPress={() => {
                this.props.navigation.navigate('MemberHome')
            }}>
                <Text style={Styles.formBtnText}>{'Save'.toUpperCase()}</Text>
                <Icon active name='arrow-right' type="Feather" style={Styles.formBtnIcon} />
            </Button>
        </View>
    }
    renderAccordionContentContact() {
        return <View>
            <TextInput style={Styles.textInput} placeholder={'Your Mobile No.'} />
            <TextInput style={Styles.textInput} placeholder={'Your Telephone No.'} />
            <TextInput style={Styles.textInput} placeholder={'Your Email Address'} />
            <TextInput style={Styles.textInput} placeholder={'Your Website url'} />
            <Button style={Styles.btn} onPress={() => {
                this.props.navigation.navigate('MemberHome')
            }}>
                <Text style={Styles.formBtnText}>{'Save'.toUpperCase()}</Text>
                <Icon active name='arrow-right' type="Feather" style={Styles.formBtnIcon} />
            </Button>
        </View>
    }
    renderAccordionContentSocial() {
        return <View>
            <TextInput style={Styles.textInput} placeholder={'Facebook'} />
            <TextInput style={Styles.textInput} placeholder={'Twitter'} />
            <TextInput style={Styles.textInput} placeholder={'YouTube'} />
            <TextInput style={Styles.textInput} placeholder={'Google+'} />
            <Button style={Styles.btn} onPress={() => {
                this.props.navigation.navigate('MemberHome')
            }}>
                <Text style={Styles.formBtnText}>{'Save'.toUpperCase()}</Text>
                <Icon active name='arrow-right' type="Feather" style={Styles.formBtnIcon} />
            </Button>
        </View>
    }

    render() {
        return <Container style={Style.bgMain}>
            <StatusBar backgroundColor="#7E8BF5" animated barStyle="light-content" />

            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <View style={Styles.profile}>
                    <ImageBackground source={{ uri: ('https://cdn.stocksnap.io/img-thumbs/960w/ZUAZ22R9AL.jpg') }} imageStyle={'cover'} style={Styles.coverImg}>
                    </ImageBackground>

                    <View style={Styles.bgBlue}>
                    </View>

                    <View style={[Styles.owner, Style.actionBarIn]}>
                        <View style={Styles.ownerBg}>
                            <Image source={{ uri: ('https://cdn.stocksnap.io/img-thumbs/960w/ZUAZ22R9AL.jpg') }} style={Styles.ownerAvatarImg} />
                            <Button transparent style={Styles.profleEdit} onPress={() => {
                                this.props.navigation.navigate('MemberHome')
                            }}>
                                <Icon active name='edit' style={Style.textWhite} type="FontAwesome" />
                            </Button>
                        </View>
                        <View style={Styles.ownerInfo}>
                            <Text style={Styles.ownerName}>Kent Parker</Text>
                            <Text style={Styles.ownerLocation}>Liverpool, United Kingdom</Text>
                        </View>
                    </View>

                    <View style={[Styles.back, Style.actionBarIn]}>
                        <Button transparent style={Style.actionBarBtn} onPress={() => {
                            this.props.navigation.navigate('MemberHome')
                        }}>
                            <Icon active name='arrow-left' style={Style.textWhite} type="MaterialCommunityIcons" />
                        </Button>
                    </View>
                </View>

                <View style={Styles.formBg}>
                    <Accordion
                        style={Styles.accordion}
                        dataArray={[
                            {
                                type: 'basic',
                                title: 'Basic',
                            },
                            {
                                type: 'address',
                                title: 'Address Informations'
                            },
                            {
                                type: 'contact',
                                title: 'Contact Informations',
                            },
                            {
                                type: 'social',
                                title: 'Social Media'
                            },
                        ]}
                        expanded={-1}
                        renderHeader={this.renderAccordionHeader}
                        renderContent={this.renderAccordionContent}
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