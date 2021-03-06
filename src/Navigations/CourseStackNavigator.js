import Icon from '@expo/vector-icons/Ionicons';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import CourseScreen from '../Screens/Course/CourseScreen';

const CourseStackNavigator = createStackNavigator(
    {
      CourseTabNavigator: CourseScreen
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
  
  export default CourseStackNavigator;