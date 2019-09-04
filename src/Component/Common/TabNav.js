import Style from '@Theme/Style';
import { Badge, Button, Footer, FooterTab, Icon, Text } from 'native-base';
import React, { Component } from 'react';

class TabNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartValue: 5
        };
    }

    componentDidMount() {
        console.log('info from NavTab')
    }

    render() {
        const { cartValue } =  this.props;

        return (
            <Footer style={Style.greyTopLine}>
                <FooterTab style={Style.bgBot}>
                    <Button style={Style.bgBot} onPress={() => {
                        this.props.navigation.navigate('DashboardModule')
                    }}>
                        <Icon name="home" type="FontAwesome" style={Style.textBlue} />
                    </Button>

                    <Button style={Style.bgBot}
                        onPress={() => { this.props.navigation.navigate('MyParish') }}>

                        <Icon name="church" type="MaterialCommunityIcons" style={Style.textBlue} />
                    </Button>
                    
                    <Button style={Style.bgBot} onPress={() => {
                        this.props.navigation.navigate('MyProfile')
                    }}>
                        <Icon name="user" type="FontAwesome" style={Style.textActiveX} />
                    </Button>
                    <Button style={Style.bgBot} onPress={() => {
                        this.props.navigation.navigate('OnlineGiven')
                    }}>
                        <Icon name="payment" type="MaterialIcons" style={Style.textBlue} />
                    </Button>

                    <Button badge vertical style={Style.bgBot} onPress={this.props.gotoCart}>
                        <Badge><Text>{cartValue}</Text></Badge>
                        <Icon name="local-grocery-store" type="MaterialIcons" style={Style.textBlue} />
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}

export default TabNav;
