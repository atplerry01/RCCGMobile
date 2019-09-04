import TabNav from '@Component/Common/TabNav';
import Styles from '@Theme/Favorite';
import Style from '@Theme/Style';
import axios from 'axios';
import { Container, Content, Icon, Text } from 'native-base';
import React from 'react';
import { FlatList, Image, ImageBackground, TouchableHighlight, View } from 'react-native';
import { config } from '../../helpers';

export default class NewsScreen extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        news: {},
        newsFound: false
    }

    componentDidMount() {
        this.getNews();
    }

    render() {
        const { news } = this.state;

        return <Container style={Style.bgMain}>
            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <ImageBackground source={require('@Asset/images/property-bg.png')} style={Styles.homeBg}>

                    <View style={Styles.section}>
                        <FlatList
                            data={news}
                            style={Styles.item}
                            renderItem={({ item, separators }) => (
                                <TouchableHighlight underlayColor='transparent'
                                    onPress={() => { this.props.navigation.navigate('NewsDetail', {itemId: item.id}) }}>
                                    <View style={Styles.record}>
                                        <Image source={{ uri: item.imageThumbPath }} style={Styles.itemImg} />
                                        <View style={Styles.itemInfo}>
                                            <Text style={Styles.itemTitle}>{item.summary}</Text>
                                            <Text style={Styles.itemLocation}>{item.summary}</Text>
                                            <View style={Styles.itemRow}>
                                                <View style={Styles.itemOverview}>
                                                    <Icon name="eye" type="FontAwesome" style={Styles.itemIcon} />
                                                    <Text style={Styles.view}>{item.viewCount}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            )}
                        />
                    </View>


                </ImageBackground>

            </Content>

            <TabNav navigation={this.props.navigation} />

        </Container>
    }


    getNews = () => {
        axios.get(config.apiUrl + '/api/news').then(res => {
            var data = res.data ? res.data : false;

            if (data) {
                this.setState({ news: data, newsFound: true });
            }
        }).catch(err => {
            this.setState({ newsFound: false });
        })
    }

}