import Styles from '@Screen/Member/PropertyAdd/Style';
import Style from '@Theme/Style';
import { Button, Container, Content, Footer, FooterTab, Header, Icon, Text } from 'native-base';
import React from 'react';
import { Dimensions, StatusBar, View } from 'react-native';



//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


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
                        this.props.navigation.navigate('MemberPropertyAddPhotos')
                    }}>
                        <Icon active name='arrow-left' style={Style.textWhite} type="MaterialCommunityIcons" />
                    </Button>
                </View>
                <View style={Style.actionBarMiddle}>
                    <Text style={Style.actionBarText}>{'Published'.toUpperCase()}</Text>
                </View>
                <View style={Style.actionBarRight}>
                </View>
            </Header>

            <Content style={Styles.layoutInner} contentContainerStyle={Style.layoutContent}>


                <View style={Styles.publish}>
                    <Icon active name='ios-checkmark-circle-outline' style={Styles.publishIcon} type="Ionicons" />
                    <Text style={Styles.publishTitle}>Congratulations</Text>
                    <Text style={Styles.publishDesc}>Your property has been published</Text>
                    <View style={Styles.publishPreview}>
                        <Button iconLeft transparent style={Styles.publishBtn} onPress={() => {
                            this.props.navigation.navigate('PublicPropertyDetail')
                        }}>
                            <Icon name="eye" type="FontAwesome" style={Styles.publishBtnIcon} />
                            <Text style={Styles.publishBtnText}>Preview</Text>
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