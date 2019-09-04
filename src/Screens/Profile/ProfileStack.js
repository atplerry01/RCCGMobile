import colors from '@Constants/Colors';
import { Icon } from 'native-base';
// import Icon from '@expo/vector-icons/Ionicons';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MyParishScreen from './Parish';
import ParishSelectorScreen from './ParishSelector';
import MyProfileScreen from './Profile';
import ProfileSettings from './Settings';

const ProfileStack = createStackNavigator(
    {
        MyProfile: {
            screen: MyProfileScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'My Profile',
                    headerStyle: {
                        backgroundColor: colors.green01,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }
            }
        },
        MyParish: {
            screen: MyParishScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'My Parish',
                    headerStyle: {
                        backgroundColor: colors.green01,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerRight: (
                        <Icon onPress={() => navigation.navigate('ParishSelector')}
                            name="edit"
                            type="AntDesign"
                            style={{ paddingRight: 16, color: 'white' }}
                            size={30}
                        />
                    )
                }
            }
        },
        ProfileSettings: {
            screen: ProfileSettings,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Profile Setting',
                    headerStyle: {
                        backgroundColor: colors.green01,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }
            }
        },
        ParishSelector: {
            screen: ParishSelectorScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Select Default Parish',
                    headerStyle: {
                        backgroundColor: colors.green01,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }
            }
        }
    }
);

export default ProfileStack;