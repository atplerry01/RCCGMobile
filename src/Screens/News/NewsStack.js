import colors from '@Constants/Colors';
import Icon from '@expo/vector-icons/Ionicons';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import NewsScreen from './News';
import NewsDetail from './NewsDetail';

const NewsStack = createStackNavigator(
    {
        News: {
            screen: NewsScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'News',
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
        NewsDetail: {
            screen: NewsDetail,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'News Details',
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

export default NewsStack;