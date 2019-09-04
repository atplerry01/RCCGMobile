import Styles from '@Screen/Member/SignUp/Style';
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
                        <Text style={Style.actionBarText}>{'Sign Up!'.toUpperCase()}</Text>
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
                            <View style={Styles.col}>
                                <TextInput style={Styles.textInputHalf} placeholder={'First Name'} />
                                <TextInput style={Styles.textInputHalf} placeholder={'Last Name'} />
                            </View>
                            <TextInput style={Styles.textInput} placeholder={'Email Address'} />
                            <TextInput style={Styles.textInput} placeholder={'Mobile Number'} />
                            <TextInput style={Styles.textInput} placeholder={'Password'} />
                            <Button style={Styles.btn} onPress={() => {
                                this.props.navigation.navigate('MemberSignIn')
                            }}>
                                <Text style={Styles.loginBtnText}>{'Sign Up!'.toUpperCase()}</Text>
                                <Icon active name='arrow-right' type="MaterialCommunityIcons" style={Styles.loginBtnIcon} />
                            </Button>
                        </View>
                        <View style={Styles.login}>
                            <Text style={Styles.account}>Do you have an account?</Text>
                            <Button transparent onPress={() => {
                                this.props.navigation.navigate('MemberSignIn')
                            }}>
                                <Text style={Styles.btnLogin}>Login</Text>
                            </Button>
                        </View>
                    </View>

                </Content>

            </ImageBackground>
        </Container>
    }
}