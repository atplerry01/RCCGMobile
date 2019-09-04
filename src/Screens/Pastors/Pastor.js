import Style from '@Theme/Style';
import Styles from '@Theme/Users';
import axios from 'axios';
import { Button, Container, Content, Footer, FooterTab, Icon, Text } from 'native-base';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { config } from '../../helpers';

export default class PastorScreen extends React.Component {
    
    constructor(props) {
        super(props)
    }

    state = {
        pastors: {},
        pastorsFound: false
    }

    componentDidMount() {
        this.getPastors();
    }

    render() {
        const { pastors } = this.state;

        return <Container style={Style.bgMain}>

            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <View style={Styles.sectionGrey}>
                    <View style={Styles.agent}>
                        <TouchableOpacity style={Styles.btnAgent} onPress={() => {
                            this.props.navigation.navigate('PastorDetail')
                        }}>
                            <Image source={{ uri: 'https://cdn.stocksnap.io/img-thumbs/960w/ZUAZ22R9AL.jpg' }} resizeMode={'cover'} style={Styles.btnAgentImg} />
                            <View style={Styles.btnAgentLocation}>
                                <Text style={Styles.btnAgentText}>Kent</Text>
                                <Text style={Styles.btnAgentCity}>London</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.btnAgent} onPress={() => {
                            this.props.navigation.navigate('PublicAgentDetail')
                        }}>
                            <Image source={{ uri: 'https://marketplace.canva.com/MACZWXFzQLQ/1/screen/canva-young-man%2C-portrait%2C-beard%2C-young%2C-man%2C-male-MACZWXFzQLQ.jpg' }} resizeMode={'cover'} style={Styles.btnAgentImg} />
                            <View style={Styles.btnAgentLocation}>
                                <Text style={Styles.btnAgentText}>George</Text>
                                <Text style={Styles.btnAgentCity}>Manchester</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.btnAgent} onPress={() => {
                            this.props.navigation.navigate('PublicAgentDetail')
                        }}>
                            <Image source={{ uri: 'https://marketplace.canva.com/MACZiQ5lL7Y/1/screen/canva-woman%2C-autumn%2C-young%2C-female%2C-pretty%2C-young-woman-MACZiQ5lL7Y.jpg' }} resizeMode={'cover'} style={Styles.btnAgentImg} />
                            <View style={Styles.btnAgentLocation}>
                                <Text style={Styles.btnAgentText}>Aberesh</Text>
                                <Text style={Styles.btnAgentCity}>London</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.btnAgent} onPress={() => {
                            this.props.navigation.navigate('PublicAgentDetail')
                        }}>
                            <Image source={{ uri: 'https://marketplace.canva.com/MACZWQeM4XI/1/screen/canva-human%2C-man%2C-portrait%2C-young-man%2C-migration%2C-afghan-MACZWQeM4XI.jpg' }} resizeMode={'cover'} style={Styles.btnAgentImg} />
                            <View style={Styles.btnAgentLocation}>
                                <Text style={Styles.btnAgentText}>Jack</Text>
                                <Text style={Styles.btnAgentCity}>Manchester</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.btnAgent} onPress={() => {
                            this.props.navigation.navigate('PublicAgentDetail')
                        }}>
                            <Image source={{ uri: 'https://marketplace.canva.com/MACZWa0bp_w/1/screen/canva-woman%2C-escorca%2C-pride%2C-spain%2C-model%2C-white-and-black-MACZWa0bp_w.jpg' }} resizeMode={'cover'} style={Styles.btnAgentImg} />
                            <View style={Styles.btnAgentLocation}>
                                <Text style={Styles.btnAgentText}>Ainsley</Text>
                                <Text style={Styles.btnAgentCity}>London</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.btnAgent} onPress={() => {
                            this.props.navigation.navigate('PublicAgentDetail')
                        }}>
                            <Image source={{ uri: 'https://marketplace.canva.com/MACVcuGGqe8/1/screen/canva-travel-guide%2C-tourist%2C-man%2C-belfast%2C-people-MACVcuGGqe8.jpg' }} resizeMode={'cover'} style={Styles.btnAgentImg} />
                            <View style={Styles.btnAgentLocation}>
                                <Text style={Styles.btnAgentText}>Noah</Text>
                                <Text style={Styles.btnAgentCity}>Manchester</Text>
                            </View>
                        </TouchableOpacity>

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

    getPastors = () => {
        axios.get(config.apiUrl + '/pastors').then(res => {
            var data = res.data[0] ? res.data[0] : false;
            if (data) {
                this.setState({ pastors: data, pastorsFound: true });
            }
        }).catch(err => {
            this.setState({ pastorsFound: false });
        })
    }

}