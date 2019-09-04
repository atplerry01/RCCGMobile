import colors from '@Constants/Colors';
import transparentHeaderStyle from '@Constants/Styles/Navigation';
import Icon from '@expo/vector-icons/Ionicons';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import GODeskScreen from './GODeskScreen';
import GOMessageDetail from './GOMessageDetail';
import GOMessages from './GOMessages';
import GOProfile from './GOProfile';

const GODeskStack = createStackNavigator(
    {
        GODesk: {
            screen: GODeskScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'GO Desk',
                    headerStyle: {
                        backgroundColor: colors.green01,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: (
                        <Icon style={{ paddingLeft: 10 }}
                            onPress={() => navigation.openDrawer()}
                            name="md-menu"
                            color="#fff"
                            size={30}
                        />
                    ),
                    headerStyle: transparentHeaderStyle,
                    headerTransparent: true,
                    headerTintColor: colors.white,
                }
            }
        },
        GOMessages: {
            screen: GOMessages,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'GO Messages',
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
        GOMessageDetail: {
            screen: GOMessageDetail,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'GO Message Detail',
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
        GOProfile: {
            screen: GOProfile,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'GO Profile',
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

export default GODeskStack;