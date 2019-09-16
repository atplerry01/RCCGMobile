import TabNav from '@Component/Common/TabNav';
import colors from '@Constants/Colors';
import MESSAGES from '@Data/Common/Messages';
import Styles from '@Theme/MemberHome';
import Style from '@Theme/Style';
import { Button, Container, Content, Icon, Right, Text, View } from 'native-base';
import React, { Component } from 'react';
import { FlatList, Image, ImageBackground, TouchableHighlight, TouchableOpacity } from 'react-native';

export default class PaymentScreen extends Component {

    async componentDidMount() {
        const productCartItemsStore = await this.getStorageItem('@productCartItemsStore');
       this.getCartItemNumber(productCartItemsStore);
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
        const { productCartItemNumber} = this.state;

        return (<Container style={Style.bgMain}>

            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <View style={[Styles.section]}>

                    <View style={[Styles.profile, { backgroundColor: colors.green01 }]}>
                        {/* <Image source={require('@Asset/images/avatar.png')} style={[Styles.avatar]} /> */}
                        <View>
                            <Text style={Styles.profileName}>Ultilities & Bills Payment</Text>
                            {/* <Text style={Styles.profileLocation}>Liverpool, United Kingdom</Text> */}
                        </View>
                    </View>

                    {/* source={require('@Asset/images/property-bg.png')} */}
                    <ImageBackground imageStyle={'cover'} style={[Styles.curve, { backgroundColor: colors.green01 }]} />

                    <View style={Styles.btnLayout}>
                        <TouchableOpacity style={Styles.btnBox} onPress={() => {
                            this.props.navigation.navigate('MemberProperties')
                        }}>
                            <Image source={require('@Asset/images/btn-property.png')} resizeMode={'cover'} style={Styles.btnImg} />
                            <Text style={Styles.btnText}>Properties</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={Styles.btnBox} onPress={() => {
                            this.props.navigation.navigate('MemberMessages')
                        }}>
                            <Image source={require('@Asset/images/btn-messages.png')} style={Styles.btnImg} />
                            <Text style={Styles.btnText}>Messages</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={Styles.btnBox} onPress={() => {
                            this.props.navigation.navigate('MemberProfile')
                        }}>
                            <Image source={require('@Asset/images/btn-boy.png')} style={Styles.btnImg} />
                            <Text style={Styles.btnText}>Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={Styles.btnBox} onPress={() => {
                            this.props.navigation.navigate('MemberFavorites')
                        }}>
                            <Image source={require('@Asset/images/btn-favorites.png')} style={Styles.btnImg} />
                            <Text style={Styles.btnText}>Favorites</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={Styles.btnBox} onPress={() => {
                            this.props.navigation.navigate('MemberSettings')
                        }}>
                            <Image source={require('@Asset/images/btn-settings.png')} style={Styles.btnImg} />
                            <Text style={Styles.btnText}>Settings</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={Styles.btnBox}>
                        </TouchableOpacity>
                    </View>

                    <View style={Styles.message}>
                        <View style={Styles.headerBg}>
                            <Icon name="envelope" type="FontAwesome" style={Styles.headerIcon} />
                            <Text style={Styles.sHeader}>{'Recent Payment'.toUpperCase()}</Text>
                            <Right>
                                <Button small rounded style={Styles.sBtn} onPress={() => { this.props.navigation.navigate('MemberMessages') }}>
                                    <Text style={Styles.sLink} >See All</Text>
                                </Button>
                            </Right>
                        </View>
                        <FlatList
                            data={MESSAGES}
                            style={Styles.item}
                            renderItem={({ item, separators }) => (
                                <TouchableHighlight underlayColor='transparent' onPress={() => { this.props.navigation.navigate('MemberMessages') }}>
                                    <View style={Styles.record}>
                                        <Image source={{ uri: item.image }} style={Styles.itemImg} />
                                        <View style={Styles.itemInfo}>
                                            <Text style={Styles.itemTitle}>{item.name}</Text>
                                            <Text style={Styles.itemDesc}>{item.desc}</Text>
                                        </View>
                                        <Text style={Styles.itemDate}>{item.date}</Text>
                                    </View>
                                </TouchableHighlight>
                            )}
                        />
                    </View>

                </View>

            </Content>

  
            <TabNav navigation={this.props.navigation}
                    cartValue={productCartItemNumber? productCartItemNumber : 0} 
                    gotoCart={() => this.props.navigation.navigate('ProductCartReview')} 
                />

        </Container>
        );
    }
}