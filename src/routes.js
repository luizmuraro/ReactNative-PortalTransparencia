import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Home from './pages/Home';
import List from './pages/List';
import Dates from './pages/Dates';
import TripList from './pages/TripList';
import Trip from './pages/Trip';

const Routes = createAppContainer(
    createSwitchNavigator({
        Trip,
        Home,
        List,
        Dates,
        TripList,
    })
);

export default Routes;