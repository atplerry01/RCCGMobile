import TabNav from '@Component/Common/TabNav';
import colors from '@Constants/Colors';
import MESSAGES from '@Data/Common/Messages';
import Styles from '@Theme/MemberHome';
import Style from '@Theme/Style';
import { Button, Container, Content, Icon, Right, Text, View } from 'native-base';
import React, { Component } from 'react';
import { FlatList, Image, ImageBackground, TouchableHighlight, TouchableOpacity } from 'react-native';

export default class ParishPayment extends Component {

    async componentDidMount() {
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
        return (<Container style={Style.bgMain}>

            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <View style={[Styles.section]}>

                    <View style={[Styles.profile, { backgroundColor: colors.green01 }]}>
                        <View>
                            <Text style={Styles.profileName}>Online Given</Text>
                            <Text style={Styles.profileLocation}>Contribution towards the development of the church</Text>
                        </View>
                    </View>

                    <ImageBackground imageStyle={'cover'} style={[Styles.curve, { backgroundColor: colors.green01 }]} />

                    <View style={Styles.btnLayout}>
                        <TouchableOpacity style={Styles.btnBox} onPress={() => {
                            this.props.navigation.navigate('OnlinePay')
                        }}>
                            <Image source={require('@Asset/images/btn-property.png')} resizeMode={'cover'} style={Styles.btnImg} />
                            <Text style={Styles.btnText}>My Parish Payment</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={Styles.btnBox} onPress={() => {
                            this.props.navigation.navigate('Partner')
                        }}>
                            <Image source={require('@Asset/images/btn-messages.png')} style={Styles.btnImg} />
                            <Text style={Styles.btnText}>Other Online Pay</Text>
                        </TouchableOpacity>


                    </View>


                    <View style={Styles.overview}>
                        <Text style={Styles.overviewTitle}>Overview</Text>
                        <Text style={Styles.overviewDesc}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales vitae ligula eu hendrerit. Donec in magna sodales, semper urna et, gravida enim.
                    {"\n\n"}Etiam sagittis turpis a ligula finibus dignissim. Fusce fermentum diam sed vulputate fringilla. Integer interdum, sem sed tincidunt iaculis, odio ante ultricies libero, non tempus nisl erat non enim.
                    {"\n\n"}Mauris dolor magna, sodales et finibus nec, feugiat nec enim. Nullam id arcu lacus.
                        </Text>
                    </View>

                    <View style={Styles.message}>
                        <View style={Styles.headerBg}>
                            <Icon name="envelope" type="FontAwesome" style={Styles.headerIcon} />
                            <Text style={Styles.sHeader}>{'Recent Contributions'.toUpperCase()}</Text>
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
                cartValue={productCartItemNumber ? productCartItemNumber : 0}
                gotoCart={() => this.props.navigation.navigate('ProductCartReview')}
            />
        </Container>
        );
    }
}