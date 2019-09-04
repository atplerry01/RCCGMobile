import colors from '@Constants/Colors';
import Icon from '@expo/vector-icons/Ionicons';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import OnlineGivenScreen from './OnlineGiven';
import OnlinePay from './OnlinePay';
import OnlinePayDetail from './OnlinePayDetail';
import OnlinePayNational from './OnlinePayNational';
import PayDetail from './PayDetail';
import PaymentStatus from './PaymentStatus';
import StackSelection from './StackSelection';

const OnlineGivenStack = createStackNavigator(
    {
        OnlineGiven: {
            screen: OnlineGivenScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Online Given',
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
        OnlinePay: {
            screen: OnlinePay,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Online Pay',
                    headerStyle: {
                        backgroundColor: colors.green01,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                    // ,
                    // headerRight: (
                    //     <Icon style={{ paddingRight: 10 }}
                    //         onPress={() => navigation.navigate('ParishSelector')}
                    //         name="refresh" 
                    //         type="EvilIcons"
                    //         color="#fff"
                    //         size={30}
                    //     />
                    // )
                }
            }
        },
        OnlinePayNational: {
            screen: OnlinePayNational,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'National Payment',
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
        StackSelection: {
            screen: StackSelection,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'StackSelection',
                    headerStyle: {
                        backgroundColor: colors.hash,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }
            }
        },
        PaymentStatus: {
            screen: PaymentStatus,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Payment Status',
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
        OnlinePayDetail: {
            screen: OnlinePayDetail,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Online Pay Detail',
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
        PayDetail: {
            screen: PayDetail,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Online Pay Detail',
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

export default OnlineGivenStack;