import Icon from '@expo/vector-icons/Ionicons';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ResourceScreen from '../Screens/Resource/ResourceScreen';

const ResourceStackNavigator = createStackNavigator(
    {
      ResourceTabNavigator: ResourceScreen
    },
    {
      defaultNavigationOptions: ({ navigation }) => {
        return {
          // headerStyle: {
          //   backgroundColor: colors.green01,
          //   elevation: 0,
          //   shadowOpacity: 0
          // },
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10 }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={30}
            />
          )
        };
      }
    }
  );
  
  export default ResourceStackNavigator;