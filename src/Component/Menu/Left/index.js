import { Badge, Container, Content, Icon, Left, List, ListItem, Right, Text, View } from "native-base";
import React, { Component } from "react";
import { AsyncStorage, Image } from "react-native";
import styles from "./Style";

const drawerCover = require("@Asset/images/bg.png");
const drawerImage = require("@Asset/images/avatar.png");

const datas1 = [
  {
    name: "Home",
    route: "DashboardModule",
    icon: "home",
  },
  {
    name: "About RCCG",
    route: "AboutModule",
    icon: "building",
  },
  {
    name: "GO Desk",
    route: "GODeskModule",
    icon: "building-o",
  },
  {
    name: "National Events",
    route: "EventModule",
    icon: "event-available",
    type: "MaterialIcons"
  },
  {
    name: "Products",
    route: "ProductModule",
    icon: "local-grocery-store",
    type: "MaterialIcons"
  },
  {
    name: "News",
    route: "NewsModule",
    icon: "news",
    type: "Entypo"
  },
  {
    name: "Parishes",
    route: "ParishModule",
    icon: "church",
    type: "MaterialCommunityIcons"
  },
  {
    name: "Online Given",
    route: "OnlineGivenModule",
    icon: "card-giftcard",
    type: "MaterialIcons"
  },
  
];
const datas2 = [
  {
    name: "Profile",
    route: "UserProfileModule",
    icon: "user-circle-o",
  },
  {
    name: "Logout",
    route: "LogOutModule",
    icon: "logout",
    type: "MaterialCommunityIcons",
  }
];

class MenuLeft extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  componentDidMount = async () => {
    const userToken = await this.getStorageItem('@userToken');

    if (userToken && userToken !== 'none') {
      userData = JSON.parse(userToken);
      this.setState({ userData });
    }
  }

  renderList(datas) {
    return (
      <List
        dataArray={datas}
        renderRow={data =>
          <ListItem
            button
            noBorder
            onPress={() => this.props.navigation.navigate(data.route)}
          >
            <Left>
              <Icon
                active
                name={data.icon}
                style={{ color: "#333", fontSize: 24, width: 30 }}
                type={data.type || 'FontAwesome'}
              />
              <Text style={styles.text}>
                {data.name}
              </Text>
            </Left>
            {
              data.types &&
              <Right style={{ flex: 1 }}>
                <Badge>
                  <Text
                    style={styles.badgeText}
                  >{`${data.types}`}</Text>
                </Badge>
              </Right>
            }
          </ListItem>}
      />
    )
  }

  renderName() {
    const { userData } = this.state;

    if (userData) {
      return (<Text style={styles.drawerText}>{userData.fullName}</Text>)
    }
  }

  render() {
    const { userData } = this.state;

    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, top: -1 }}
          render
        >
          <Image source={drawerCover} style={styles.drawerCover} />
          <View style={styles.drawerBg}>
            <Image square style={styles.drawerImage} source={drawerImage} />
            <Text style={styles.drawerText}>{this.renderName()}</Text>
          </View>

          <View style={styles.divider}>
            {this.renderList(datas1)}
          </View>

          <View>
            {this.renderList(datas2)}
          </View>

        </Content>
      </Container>
    );
  }

  saveStorageItem = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Error retrieving data
    }
  };

  getStorageItem = async (key) => {
    let result = '';
    try {
      result = await AsyncStorage.getItem(key) || 'none';
    } catch (error) {
      // Error retrieving data
    }
  }

}

export default MenuLeft;
