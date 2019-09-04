import TabNav from '@Component/Common/TabNav';
import colors from '@Constants/Colors';
import transparentHeaderStyle from '@Constants/Styles/Navigation';
import FavStyles from '@Screen/Member/Favorites/Style';
import Styles from '@Theme/Home';
import Style from '@Theme/Style';
import axios from 'axios';
import { Button, Container, Content, Icon } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, FlatList, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { config } from '../../helpers';

export const btnType = [{
    label: 'PRAYER',
    value: 'btn_buy'
}, {
    label: 'THANKSGIVEN',
    value: 'btn_rent'
}, {
    label: 'PROJECTS',
    value: 'btn_project'
}];

export default class ParishSearch extends Component {

    constructor(props) {
        super(props);
        // this.loadApp();

        this.state = {
            latestParishes: []
        }

        this.searchRef = this.updateRef.bind(this, 'search');
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    static navigationOptions = ({ navigation }) => ({
        headerStyle: transparentHeaderStyle,
        headerTransparent: true,
        headerTintColor: colors.white,
    });

    async componentDidMount() {
        const { navigation } = this.props;
        const { parishesFound } = this.state;

        const search = navigation.getParam('parishItem', 'none');
        
        if (search && search !== 'none') {
            this.setState({ search });
            this.getParishes(search);
        } else  {
            this.getParishes();
        }
        
    }

    searchClick() {
        const { search, parishes } = this.state;

        let filteredSearch = [];

        if (search === '') {
            this.setState({ filteredList: parishes });
            return null;
        }

        parishes.forEach( x => {
            if (x.name.toLowerCase().includes(search.toLowerCase())) {
                filteredSearch.push(x);
            }
        });

        this.setState({ filteredList: filteredSearch });
    }

    onChangeText(text) {
        ['search']
            .map((name) => ({ name, ref: this[name] }))
            .filter(({ ref }) => ref && ref.isFocused())
            .forEach(({ name, ref }) => {
                this.setState({ [name]: text });
            });
    }
    
    onSubmit() {
        let errors = {};

        ['search']
            .forEach((name) => {
                let value = this[name].value();

                if (!value) {
                    errors[name] = 'Should not be empty';
                } else {
                    // if ('password' === name && value.length < 6) {
                    //     errors[name] = 'Too short';
                    // }
                }
            });

        this.setState({ errors });
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    render() {
        const { parishes, filteredList, search, errors = {} } = this.state;

        return (

            <Container>

                <Content style={Style.layoutInner} contentContainerStyle={Style.layoutContent}>

                    <ImageBackground source={require('@Asset/images/common/top-bg.jpeg')} imageStyle={'cover'} style={[Styles.slider, { backgroundColor: colors.green01 }]}>

                        <View style={[Styles.search, { paddingTop: 80 }]}>
                            <TextInput placeholder={'e.g. Arena, new Auditorium'} 
                                style={Styles.textInput} 
                                onChangeText={(search) => this.setState({search})}
                                value={this.state.search}
                            />

                            <Button transparent style={Styles.searchBtn} onPress={() => {
                                this.searchClick();
                            }}>
                                <Icon active name='search' type="FontAwesome" style={Styles.searchBtnIcon} />
                            </Button>
                        </View>

                    </ImageBackground>

                    <View style={Styles.sectionGrey}>

                        {!filteredList && <View><Text>Loading ...</Text></View>}
                        <View style={FavStyles.section}>
                            <FlatList
                                data={filteredList}
                                style={FavStyles.item}
                                renderItem={({ item, separators }) => (
                                    <TouchableHighlight underlayColor='transparent' onPress={() => { 
                                            this.props.navigation.navigate('ParishDetail', { itemId: item.id })
                                        }}>
                                        <View style={FavStyles.record}>
                                            <Image source={{ uri: item.imageThumbPath }} style={FavStyles.itemImg} />
                                            <View style={FavStyles.itemInfo}>
                                                <Text style={FavStyles.itemTitle}>{item.name}</Text>
                                                <Text style={FavStyles.itemLocation}>{item.summary}</Text>
                                                <View style={FavStyles.itemRow}>
                                                    <View style={FavStyles.itemOverview}>
                                                        <Icon name="map-marker-multiple" type="MaterialCommunityIcons" style={FavStyles.itemIcon} />
                                                        <Text style={FavStyles.itemNo}>{item.region}</Text>
                                                    </View>
                                                    <View style={FavStyles.itemOverview}>
                                                        <Icon name="location" type="Entypo" style={FavStyles.itemIcon} />
                                                        <Text style={FavStyles.itemNo}>{item.province}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                )}
                            />
                        </View>

                    </View>

                </Content>

                <TabNav navigation={this.props.navigation} />

            </Container>
        );
    }


    getParishes = (searchValue) => {

        axios.get(config.apiUrl + '/api/parishes').then(res => {
            var data = res.data ? res.data : false;
            if (data) {
                this.setState({ 
                    parishes: data, 
                    parishesFound: true,
                    filteredList: data,
                });
            }            
        }).catch(err => {
            this.setState({ parishesFound: false });
        })
    }

    updateUserParish = async (userStore, ParishStore) => {
        const parishCode = ParishStore.parishCode;
        var data = `userID=${userStore.userID}&parishCode=${parishCode}`;

        return axios
            .post(config.apiBaseUrl + "/parish/updateUserParish", data, {
                headers: {
                    "Authorization": `Bearer ${userStore.access_token}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(resp => {
                this.getUserParish(userStore, ParishStore);
            })
            .catch(error => {
                ToastAndroid.show(`An Error Occur - ${error.message}`, ToastAndroid.SHORT);
            });
    }
    
    getUserParish(userStore, ParishStore){
        const parishCode = ParishStore.parishCode;
        var data = `userID=${userStore.userID}&parishCode=${parishCode}`;
        return axios
            .post(config.apiBaseUrl + "/parish/getParish", data, {
                headers: {
                    "Authorization": `Bearer ${userStore.access_token}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(resp => {
                // get the updated user data
                const saveResult = this.saveStorageItem('@userParishStore', JSON.stringify(resp.data.data));                
                
                if (saveResult) {
                    this.props.navigation.navigate('OnlineGivenModule');
                }
            })
            .catch(error => {
                ToastAndroid.show(`An Error Occur - ${error.message}`, ToastAndroid.SHORT);
            });
    }
    

    removeStorageItem = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            // Error retrieving data
            
        }
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
        return result;
    }
    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});