import TabNav from '@Component/Common/TabNav';
import Styles from '@Screen/Member/Favorites/Style';
import Style from '@Theme/Style';
import axios from 'axios';
import { Container, Content, Text } from 'native-base';
import React from 'react';
import { AsyncStorage, FlatList, Image, ImageBackground, TouchableHighlight, View } from 'react-native';
import { config } from '../../helpers';

export default class EventScreen extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    events: {},
    eventsFound: false
  }

  componentDidMount() {
    this.getEvents();
    this.getCartItemNumber();
  }


  async getCartItemNumber() {
    const productCartItemsStore = await this.getStorageItem('@productCartItemsStore');
    if (productCartItemsStore && productCartItemsStore !== 'none') {
      const productCartItems2 = JSON.parse(productCartItemsStore);
      const productCartItems = JSON.parse(productCartItems2);
      this.setState({ productCartItemNumber: productCartItems.length });
    }
  }


  render() {
    const { events, productCartItemNumber } = this.state;

    return <Container style={Style.bgMain}>

      <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

        <ImageBackground source={require('@Asset/images/property-bg.png')} style={Styles.homeBg}>

          <View style={Styles.section}>
            <FlatList
              data={events}
              style={Styles.item}
              renderItem={({ item, separators }) => (
                <TouchableHighlight underlayColor='transparent'
                  onPress={() => { this.props.navigation.navigate('EventDetail', { itemId: item.id }) }}>
                  <View style={Styles.record}>
                    <Image source={{ uri: item.imageThumbPath }} style={Styles.itemImg} />
                    <View style={Styles.itemInfo}>
                      <Text style={Styles.itemTitle}>{item.title}</Text>
                      <Text style={Styles.itemLocation}>{item.summary}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              )}
            />
          </View>

        </ImageBackground>

      </Content>

      <TabNav navigation={this.props.navigation}
        cartValue={productCartItemNumber ? productCartItemNumber : 0}
        gotoCart={() => this.props.navigation.navigate('ProductCartReview')}
      />

    </Container>
  }


  getEvents = () => {
    axios.get(config.apiUrl + '/api/events').then(res => {
      var data = res.data ? res.data : false;

      if (data) {
        this.setState({ events: data, eventsFound: true });
      }
    }).catch(err => {
      this.setState({ eventsFound: false });
    })
  }

  getStorageItem = async (key) => {
    let result = '';
    try {
      result = await AsyncStorage.getItem(key) || 'none';
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(error.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    }

    return result;
  }

}