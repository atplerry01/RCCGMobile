import Icon from '@expo/vector-icons/Ionicons';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import colors from '../Constants/Colors';
// import DashboardTabNavigator from './DashboardTabNavigator';
import Dashboard from '../Screens/Dashboard/Dashboard';

const DashboardStackNavigator = createStackNavigator(
    {
      DashboardTabNavigator: Dashboard // DashboardTabNavigator
    }, {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Dashboard',
        headerStyle: {
          backgroundColor: colors.green01
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
      };
    }
  }
  );
  
  export default DashboardStackNavigator;