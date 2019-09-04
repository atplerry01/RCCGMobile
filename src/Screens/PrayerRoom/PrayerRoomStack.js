import colors from '@Constants/Colors';
import Icon from '@expo/vector-icons/Ionicons';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import PrayerRoomScreen from './PrayerRoom';
import PrayerRoomDetail from './PrayerRoomDetail';

const PrayerRoomStack = createStackNavigator(
    {
        PrayerRoom: {
            screen: PrayerRoomScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Prayer Room',
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
        PrayerRoomDetail: {
            screen: PrayerRoomDetail,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Prayer Room Details',
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

export default PrayerRoomStack;