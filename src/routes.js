import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Home from './pages/Home';
import List from './pages/List';
import Dates from './pages/Dates';
import TripList from './pages/TripList';
import Viagem from './pages/Viagem';

const Routes = createAppContainer(
    createSwitchNavigator({
        Home,
        List,
        Dates,
        TripList,
        Viagem
    })
);

export default Routes;