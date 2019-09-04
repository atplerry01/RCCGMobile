import Styles from '@Screen/Public/PropertySearch/Style';
import Style from '@Theme/Style';
import { Button, Container, Content, Footer, FooterTab, Header, Icon, Label, Text, View } from 'native-base';
import React from 'react';
import { Dimensions, Picker, StatusBar, TextInput } from 'react-native';
import RadioGroup from 'react-native-custom-radio-group';




//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const propertyType = [{
    label: 'Buy',
    value: 'type_buy'
}, {
    label: 'Rent',
    value: 'type_rent'
}, {
    label: 'Projects',
    value: 'type_projects'
}];

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: undefined,
            sliderOneChanging: false,
            sliderOneValue: [10000],
            multiSliderValue: [100, 100000],
        };
    }
    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    sliderOneValuesChangeStart = () => {
        this.setState({
            sliderOneChanging: true,
        });
    }

    sliderOneValuesChange = (values) => {
        let newValues = [0];
        newValues[0] = values[0];
        this.setState({
            sliderOneValue: newValues,
        });
    }

    sliderOneValuesChangeFinish = () => {
        this.setState({
            sliderOneChanging: false,
        });
    }

    multiSliderValuesChange = (values) => {
        this.setState({
            multiSliderValue: values,
        });
    }



    render() {
        return <Container style={Style.bgMain}>
            <Header style={Style.navigation}>
                <StatusBar backgroundColor="#7E8BF5" animated barStyle="light-content" />

                <View style={Style.actionBarLeft}>
                    <Button transparent style={Style.actionBarBtn} onPress={() => {
                        this.props.navigation.navigate('PublicHome')
                    }}>
                        <Icon active name='arrow-left' style={Style.textWhite} type="MaterialCommunityIcons" />
                    </Button>
                </View>
                <View style={Style.actionBarMiddle}>
                    <Text style={Style.actionBarText}>{'Search'.toUpperCase()}</Text>
                </View>
                <View style={Style.actionBarRight}>
                </View>
            </Header>


            <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                <View style={Styles.section}>

                    <View style={Styles.type}>
                        <RadioGroup
                            containerStyle={Styles.typeBg}
                            initialValue={'type_buy'}
                            buttonContainerStyle={Styles.typeBtn}
                            buttonTextStyle={Styles.typeBtnText}
                            buttonContainerActiveStyle={Styles.typeBtnActive}
                            buttonContainerInactiveStyle={Styles.typeBtnInactive}
                            buttonTextActiveStyle={Styles.typeActiveText}
                            buttonTextInactiveStyle={Styles.typeInactiveText}
                            radioGroupList={propertyType} />
                    </View>
                    <View style={Styles.location}>
                        <Label style={Styles.label}>Location</Label>
                        <TextInput style={Styles.textInput} placeholder={'e.g. Brixton, NW3 or NW3 5TY'} />
                    </View>

                    <View style={Styles.col}>
                        <View style={Styles.bed}>
                            <Label style={Styles.label}>Bedrooms</Label>
                            <View style={Styles.add}>
                                <Button transparent style={Styles.addBtn}>
                                    <Icon active name='plus' style={Styles.addIcon} type="FontAwesome" />
                                </Button>
                                <Text style={Styles.addText}>3</Text>
                                <Button transparent style={Styles.addBtn}>
                                    <Icon active name='minus' style={Styles.addIcon} type="FontAwesome" />
                                </Button>
                            </View>
                        </View>
                        <View style={Styles.bed}>
                            <Label style={Styles.label}>Bathrooms</Label>
                            <View style={Styles.add}>
                                <Button transparent style={Styles.addBtn}>
                                    <Icon active name='plus' style={Styles.addIcon} type="FontAwesome" />
                                </Button>
                                <Text style={Styles.addText}>3</Text>
                                <Button transparent style={Styles.addBtn}>
                                    <Icon active name='minus' style={Styles.addIcon} type="FontAwesome" />
                                </Button>
                            </View>
                        </View>
                    </View>

                    <View style={Styles.price}>
                        <Label style={Styles.labelPrice}>Price</Label>
                        <View style={Styles.col}>
                            <View style={Styles.pricePicker}>
                                <Picker
                                    selectedValue={this.state.language}
                                    style={Styles.priceSelect}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                                    <Picker.Item label="Min" value="10" />
                                    <Picker.Item label="$1000" value="1000" />
                                    <Picker.Item label="$2000" value="2000" />
                                    <Picker.Item label="$3000" value="3000" />
                                    <Picker.Item label="$4000" value="4000" />
                                    <Picker.Item label="$5000" value="5000" />
                                    <Picker.Item label="$6000" value="6000" />
                                    <Picker.Item label="$7000" value="7000" />
                                    <Picker.Item label="$8000" value="8000" />
                                    <Picker.Item label="$9000" value="9000" />
                                    <Picker.Item label="$10000" value="10000" />
                                </Picker>
                            </View>
                            <View style={Styles.pricePicker}>
                                <Picker
                                    selectedValue={this.state.language}
                                    style={Styles.priceSelect}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                                    <Picker.Item label="Max" value="10" />
                                    <Picker.Item label="$1000" value="1000" />
                                    <Picker.Item label="$2000" value="2000" />
                                    <Picker.Item label="$3000" value="3000" />
                                    <Picker.Item label="$4000" value="4000" />
                                    <Picker.Item label="$5000" value="5000" />
                                    <Picker.Item label="$6000" value="6000" />
                                    <Picker.Item label="$7000" value="7000" />
                                    <Picker.Item label="$8000" value="8000" />
                                    <Picker.Item label="$9000" value="9000" />
                                    <Picker.Item label="$10000" value="10000" />
                                </Picker>
                            </View>
                        </View>
                    </View>

                    <View style={Styles.btnBg}>
                        <Button style={Styles.btn} onPress={() => {
                            this.props.navigation.navigate('PublicProperties')
                        }}>
                            <Text style={Styles.btnText}>{'Search'.toUpperCase()}</Text>
                            <Icon active name='search' type="FontAwesome" style={Styles.btnIcon} />
                        </Button>
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
                        <Icon name="search" type="Octicons" style={Style.textBlueActive} />
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
}