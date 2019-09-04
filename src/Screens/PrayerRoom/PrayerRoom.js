
import TabNav from '@Component/Common/TabNav';
import PROPERTIES from '@Data/Common/Properties';
import Styles from '@Theme/Parish';
import Style from '@Theme/Style';
import axios from 'axios';
import { Container, Content, Icon } from 'native-base';
import React from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { config } from '../../helpers';

//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class PrayerRoomScreen extends React.Component {


  constructor(props) {
    super(props)
  }

  state = {
    prayerrooms: {},
    prayerroomsFound: false
  }

  componentDidMount() {
    this.getPrayerRooms();
  }

  render() {
    const { prayerrooms } = this.state;

    return <Container style={Style.bgMain}>

      <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

        <View style={Styles.section}>
          <FlatList
            data={PROPERTIES}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, separators }) => (
              <TouchableOpacity style={Styles.item} underlayColor='transparent'
                onPress={() => { this.props.navigation.navigate('PrayerRoomDetail') }}>
                <View>
                  <View>
                    <Image source={{ uri: item.image }} style={Styles.itemImg} />
                    <View style={Styles.itemImgBg} />
                    <Icon name="check-circle" type="MaterialIcons" style={Styles.itemFavorite} />
                  </View>
                  <View style={Styles.itemRow}>
                    <View style={Styles.itemOverview}>
                      <View>
                        <Text style={Styles.itemPrice}>{item.price}</Text>
                        <Text style={Styles.itemLocation}>{item.location}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

      </Content>

      <TabNav navigation={this.props.navigation} />

    </Container>
  }


  getPrayerRooms = () => {
    axios.get(config.apiUrl + '/prayerrooms').then(res => {
      var data = res.data[0] ? res.data[0] : false;
      if (data) {
        this.setState({ prayerrooms: data, prayerroomsFound: true });
      }
    }).catch(err => {
      this.setState({ prayerroomsFound: false });
    })
  }

}