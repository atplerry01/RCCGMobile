import colors from '@Constants/Colors';
import transparentHeaderStyle from '@Constants/Styles/Navigation';
import Icon from '@expo/vector-icons/Ionicons';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ParishScreen from './Parish';
import ParishDetail from './ParishDetail';
import ParishSearch from './ParishSearch';

const ParishStack = createStackNavigator(
    {
        Parish: {
            screen: ParishScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Parishes',
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
                    )
                }
            }
        },
        ParishDetail: {
            screen: ParishDetail,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Parish Detail',
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
        ParishSearch: {
            screen: ParishSearch,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Parish Search',
                    headerStyle: {
                        backgroundColor: colors.green01,
                    },
                    headerStyle: transparentHeaderStyle,
                    headerTransparent: true,
                    headerTintColor: colors.white,
                }
            }
        }
    }
);

export default ParishStack;