import colors from '@Constants/Colors';
import Icon from '@expo/vector-icons/Ionicons';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import EventScreen from './Event';
import EventDetail from './EventDetail';

const EventStack = createStackNavigator(
    {
        Event: {
            screen: EventScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'National Events',
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
        EventDetail: {
            screen: EventDetail,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Event Details',
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

export default EventStack;