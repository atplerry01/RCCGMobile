import TabNav from '@Component/Common/TabNav';
import Styles from '@Theme/ParishDetail';
import Style from '@Theme/Style';
import axios from 'axios';
import { Container, Content, Icon, Text, View } from 'native-base';
import React, { Component } from 'react';
import { ImageBackground, StatusBar } from 'react-native';
import { config } from '../../helpers';

//const {width, height} = Dimensions.get('window')

export default class GOMessageDetail extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        messageDetail: '',
        messageDetailFound: false
    }

    componentDidMount() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        this.getGOMessageDetail(itemId);
    }

    renderContent() {
        const { messageDetail } = this.state;
        
        if (this.state.messageDetail) {
            return (<React.Fragment>

                <ImageBackground source={{ uri: (`${messageDetail.imagePath}`) }} imageStyle={'cover'} style={Styles.coverImg}>
                    <View style={Style.actionBarIn}>
                        {/* <Button transparent style={Style.actionBarBtn} onPress={() => {
                                this.props.navigation.navigate('PublicProperties')
                            }}>
                                <Icon active name='arrow-left' style={Style.textBlack} type="MaterialCommunityIcons" />
                            </Button> */}
                    </View>
                </ImageBackground>

                <View style={Styles.section}>
                    <Text style={Styles.price}> {messageDetail.topic}</Text>
                    <View style={Styles.locationTop}>
                        <Icon active name='map-marker-radius' style={Styles.locationTopIcon} type="MaterialCommunityIcons" />
                        <Text style={Styles.locationTopInfo}>{messageDetail.createdOn}</Text>
                    </View>
                </View>

                <ImageBackground source={require('@Asset/images/shadow.png')} imageStyle={'cover'} style={Styles.shadow} />

                <View style={Styles.overview}>
                    <Text style={Styles.overviewTitle}>{messageDetail.summary}</Text>
                    <Text style={Styles.overviewDesc}>
                        {messageDetail.detail}
                    </Text>
                </View>

            </React.Fragment>)
        }
    }

    render() {
        const { messageDetail } = this.state;
        
        return (
            <Container style={Style.bgMain}>
                <StatusBar backgroundColor="rgba(0,0,0,0)" animated barStyle="dark-content" />

                <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                    {this.renderContent()}

                </Content>

                <TabNav navigation={this.props.navigation} />

            </Container>
        );
    }


    getGOMessageDetail = (id) => {
        axios.get(config.apiUrl + `/api/GODesk/Messages/${id}`).then(res => {
            var data = res.data ? res.data : false;
            
            if (data) {
                this.setState({ messageDetail: data });
            }
        }).catch(err => {
            this.setState({ messageDetailFound: false });
        })
    }


}