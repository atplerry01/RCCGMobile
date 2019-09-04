import colors from '@Constants/Colors';
import Icon from '@expo/vector-icons/Ionicons';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import PastorScreen from './Pastor';
import PastorDetail from './PastorDetail';

const PastorStack = createStackNavigator(
    {
        Pastors: {
            screen: PastorScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Pastor',
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
        PastorDetail: {
            screen: PastorDetail,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Pastor Details',
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

export default PastorStack;