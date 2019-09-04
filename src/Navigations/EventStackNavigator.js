import Icon from '@expo/vector-icons/Ionicons';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import colors from '../Constants/Colors';
import EventStack from '../Screens/Event/EventStack';

const EventStackNavigator = createStackNavigator(
    {
      EventTabNavigator: EventStack
    },
    {
      defaultNavigationOptions: ({ navigation }) => {
        const { routeName } = navigation.state.routes[navigation.state.index];

        return {
          header: null,
          headerTitle: routeName,

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
  
  export default EventStackNavigator;