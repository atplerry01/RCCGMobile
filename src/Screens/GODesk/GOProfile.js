import TabNav from '@Component/Common/TabNav';
import Styles from '@Theme/ProfileDetail';
import Style from '@Theme/Style';
import axios from 'axios';
import { Container, Content, Icon, List, ListItem, Tab, Tabs, Text, View } from 'native-base';
import React, { Component } from 'react';
import { Image, ImageBackground, StatusBar } from 'react-native';
import { config } from '../../helpers';

export default class GOProfile extends Component {

    state = {
        profileDetail: '',
        profileDetailFound: false
    }

    componentDidMount() {
        this.getGOProfileDetail();
    }

    renderContent = () => {
        const { profileDetail } = this.state;

        if (this.state.profileDetail) {
            return (
                <React.Fragment>


                    <View style={Styles.profile}>
                        <ImageBackground source={{ uri: (`${profileDetail.bgImagePath}`) }} imageStyle={'cover'} style={Styles.coverImg}>
                        </ImageBackground>

                        <View style={Styles.bgBlue}>
                        </View>

                        <View style={Styles.owner}>
                            <Image source={{ uri: (`${profileDetail.imagePath}`) }} style={Styles.ownerAvatarImg} />
                            <View style={Styles.ownerInfo}>
                                <Text style={Styles.ownerName}>{profileDetail.name}</Text>
                                <Text style={Styles.ownerLocation}>{profileDetail.position}</Text>
                            </View>
                        </View>

                    </View>


                    <Tabs tabBarUnderlineStyle={Styles.tabBorder}>
                        <Tab tabStyle={Styles.tabGrey} textStyle={Styles.tabTextActive} activeTabStyle={Styles.tabGrey} activeTextStyle={Styles.tabTextActive} heading="Intro">
                            <View style={Styles.overview}>
                                <Text style={Styles.overviewDesc}>
                                    {profileDetail.intro}

                                </Text>

                            </View>
                        </Tab>
                        <Tab tabStyle={Styles.tabGrey} textStyle={Styles.tabTextActive} activeTabStyle={Styles.tabGrey} activeTextStyle={Styles.tabTextActive} heading="Contact">
                            <List style={Styles.infoTab}>
                                <ListItem style={Styles.infoItem}>
                                    <Icon name="map-marker-radius" type="MaterialCommunityIcons" style={Styles.infoIcon} />
                                    <View>
                                        <Text style={Styles.infoHeader}>{'Address'.toUpperCase()}</Text>
                                        <Text style={Styles.infoDesc}>{profileDetail.address}, {"\n"}{profileDetail.region}</Text>
                                    </View>
                                </ListItem>
                                <ListItem style={Styles.infoItem}>
                                    <Icon name="phone" type="FontAwesome" style={Styles.infoIcon} />
                                    <View>
                                        <Text style={Styles.infoHeader}>{'Phone'.toUpperCase()}</Text>
                                        <Text style={Styles.infoDesc}>{profileDetail.phone}</Text>
                                    </View>
                                </ListItem>
                                <ListItem style={Styles.infoItem}>
                                    <Icon name="mail" type="Entypo" style={Styles.infoIcon} />
                                    <View>
                                        <Text style={Styles.infoHeader}>{'Email'.toUpperCase()}</Text>
                                        <Text style={Styles.infoDesc}>{profileDetail.email}</Text>
                                    </View>
                                </ListItem>
                                <ListItem style={[Styles.infoItem, Styles.infoItemLast]}>
                                    <Icon name="web" type="MaterialCommunityIcons" style={Styles.infoIcon} />
                                    <View>
                                        <Text style={Styles.infoHeader}>{'Website'.toUpperCase()}</Text>
                                        <Text style={Styles.infoDesc}>{profileDetail.website}</Text>
                                    </View>
                                </ListItem>
                            </List>
                        </Tab>

                    </Tabs>

                </React.Fragment>

            )
        } else {
            return <View><Text>Loading ...</Text></View>
        }
    }

    render() {
        return <Container style={Style.bgMain}>
            <StatusBar backgroundColor="#7E8BF5" animated barStyle="light-content" />

            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>
                {this.renderContent()}
            </Content>

            <TabNav navigation={this.props.navigation} />

        </Container>
    }


    getGOProfileDetail = (id) => {
        axios.get(config.apiUrl + `/api/GODesk/Profile`).then(res => {
            var data = res.data ? res.data : false;

            if (data) {
                this.setState({ profileDetail: data });
            }
        }).catch(err => {
            this.setState({ profileDetailFound: false });
        })
    }
}