import Styles from '@Screen/Member/SignIn/Style';
import Style from '@Theme/Style';
import { Button, Container, Content, Header, Icon, Text, View } from 'native-base';
import React from 'react';
import { Dimensions, Image, ImageBackground, StatusBar, TextInput } from 'react-native';



//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class extends React.Component {
    render() {
        return <Container style={Style.bgMain}>
            <ImageBackground source={require('@Asset/images/bg.png')} imageStyle={'cover'} style={Styles.bgCover}>

                <Header style={Style.navigationTransparent}>
                    <StatusBar backgroundColor="#7E8BF5" animated barStyle="light-content" />

                    <View style={Style.actionBarLeft}>
                        <Button transparent style={Style.actionBarBtn} onPress={() => {
                            this.props.navigation.navigate('PublicHome')
                        }}>
                            <Icon active name='arrow-left' style={Style.textWhite} type="MaterialCommunityIcons" />
                        </Button>
                    </View>
                    <View style={Style.actionBarMiddle}>
                        <Text style={Style.actionBarText}>{'Sign In'.toUpperCase()}</Text>
                    </View>
                    <View style={Style.actionBarRight}>
                    </View>
                </Header>

                <Content style={Style.layoutInner}>

                    <View style={Styles.section}>
                        <View style={Styles.logo}>
                            <Image source={require('@Asset/images/logo.png')} />
                        </View>
                        <View style={Styles.signBg}>
                            <TextInput style={Styles.textInput} placeholder={'Email Address or Mobile No.'} />
                            <TextInput style={Styles.textInput} placeholder={'Password'} />
                            <Button style={Styles.btn} onPress={() => {
                                this.props.navigation.navigate('MemberHome')
                            }}>
                                <Text style={Styles.loginBtnText}>{'Login'.toUpperCase()}</Text>
                                <Icon active name='arrow-right' type="MaterialCommunityIcons" style={Styles.loginBtnIcon} />
                            </Button>
                        </View>
                        <View style={Styles.forgot}>
                            <Text style={Styles.btnForgot}>Forgot Password?</Text>
                        </View>
                        <View style={Styles.login}>
                            <Text style={Styles.account}>Don't have an account yet?</Text>
                            <Button transparent onPress={() => {
                                this.props.navigation.navigate('MemberSignUp')
                            }}>
                                <Text style={Styles.btnLogin}>Sign Up Now!</Text>
                            </Button>
                        </View>
                    </View>

                </Content>

            </ImageBackground>
        </Container>
    }
}