import DrawerContent from '@Component/Menu/Left';
import { createDrawerNavigator } from 'react-navigation';
import colors from '../Constants/Colors';
import IntroScreen from '../Screens/IntroScreen';
import PaymentStatus from '../Screens/Payment/PaymentStatus';
import LogOutScreen from '../Screens/Shared/LogoutScreen';
import AboutStackNavigator from './AboutStackNavigator';
import DashboardStackNavigator from './DashboardStackNavigator';
import EventStackNavigator from './EventStackNavigator';
import GODeskStackNavigator from './GODeskStackNavigator';
import NewsStackNavigator from './NewsStackNavigator';
import OnlineGivenStackNavigator from './OnlineGivenStackNavigator';
import ParishStackNavigator from './ParishStackNavigator';
import PastorStackNavigator from './PastorStackNavigator';
import PaymentStackNavigator from './PaymentStackNavigator';
import PrayerRoomStackNavigator from './PrayerRoomStackNavigator';
import ProductStackNavigator from './ProductStackNavigator';
import RelocateStackNavigator from './RelocateStackNavigator';
import UserProfileStackNavigator from './UserProfileStackNavigator';

const AppDrawerNavigator = createDrawerNavigator({
    IntroModule: {
      screen: IntroScreen
    },
    DashboardModule: {
      screen: DashboardStackNavigator
    },
    AboutModule: {
      screen: AboutStackNavigator
    },
    EventModule: {
      screen: EventStackNavigator
    },
    GODeskModule: {
      screen: GODeskStackNavigator
    },
    NewsModule: {
      screen: NewsStackNavigator
    },
    OnlineGivenModule: {
      screen: OnlineGivenStackNavigator
    },
    ParishModule: {
      screen: ParishStackNavigator
    },
    ProductModule: {
      screen: ProductStackNavigator
    },
    PaymentModule: {
      screen: PaymentStackNavigator
    },
    PaymentStatusModule: {
      screen: PaymentStatus
    },
    PrayerRoomModule: {
      screen: PrayerRoomStackNavigator
    },
    ResourceModule: {
      screen: ParishStackNavigator
    },
    VirtualTourModule: {
      screen: ParishStackNavigator 
    },
    PastorModule: {
      screen: PastorStackNavigator 
    },
    UserProfileModule: {
      screen: UserProfileStackNavigator 
    },
    RelocateModule: {
      screen: RelocateStackNavigator 
    },
    LogOutModule: {
      screen: LogOutScreen
    }
  },
  {
    contentComponent: DrawerContent,
    contentOptions: {
      activeTintColor: colors.green01
    },
    headerMode: "none",
    initialRouteName:  "DashboardModule",
  });

export default AppDrawerNavigator;