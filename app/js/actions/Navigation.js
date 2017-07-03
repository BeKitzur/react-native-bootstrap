import { SET_INITIAL_ROUTE } from '../constants/Navigation';
import { NavigationActions } from 'react-navigation';
import AppNavigator from '../navigation/AppNavigator';

export function setInitialRoute(routeName) {
	let state = AppNavigator.router.getStateForAction(
	    NavigationActions.reset({
	    	index: 0,
	    	actions: [
	    	  NavigationActions.navigate({
	    		routeName: routeName,
	    	  }),
	    	],
	    })
	);

	return {
		type: SET_INITIAL_ROUTE,
		payload: state
	};
}
