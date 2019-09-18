import colors from '@Constants/Colors';
import Icon from '@expo/vector-icons/Ionicons';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import PaymentStack from './PaymentStack';
import PaymentStatus from './PaymentStatus';
import ProductScreen from './Product';
import ProductCartReview from './ProductCartReview';
import ProductDetail from './ProductDetail';
import ProductList from './ProductList';
import ProductSubType from './ProductSubType';
import ProductType from './ProductType';
import StackSelection from './StackSelection';
// StackSelection

const ProductStack = createStackNavigator(
    {
        Product: {
            screen: ProductScreen,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Products category',
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
        ProductList: {
            screen: ProductList,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Product Lists',
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
        
        ProductCartReview: {
            screen: ProductCartReview,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Product Cart Review',
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
        ProductType: {
            screen: ProductType,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Product Type',
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
        ProductSubType: {
            screen: ProductSubType,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Product Sub Type',
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
        ProductDetail: {
            screen: ProductDetail,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Product Details',
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
        ProductPaymentStack: {
            screen: PaymentStack,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Product Payment Stack',
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
        PaymentStatus: {
            screen: PaymentStatus,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: 'Product Status',
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
        }
    }
);

export default ProductStack;