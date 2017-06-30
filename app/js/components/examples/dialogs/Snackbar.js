import React, { Component, PropTypes } from 'react';
import { Container, Button, TextView } from '../../lib';
import { COLORS } from '../../../constants/Theme';
import Snackbar from 'react-native-snackbar';

export default class SnackbarExample extends Component {
	constructor(props) {
		super(props);
		this.showSimpleSnackbar = this.showSimpleSnackbar.bind(this);
		this.showSnackbarWithAction = this.showSnackbarWithAction.bind(this);
	}

	static contextTypes = {
		getCurrentTheme: PropTypes.func
	};

	showSnackbarWithAction() {
		let appTheme = this.context.getCurrentTheme();

		Snackbar.show({
		    backgroundColor: COLORS[appTheme].accent,
		    title: 'Snackbar with action',
		    duration: Snackbar.LENGTH_LONG,
		    action: {
		        title: 'UNDO',
		        color: 'green',
		        onPress: () => {},
		    },
		});
	}

	showSimpleSnackbar() {
		let appTheme = this.context.getCurrentTheme();

		Snackbar.show({
		    backgroundColor: COLORS[appTheme].accent,
		    title: 'Simple snackbar',
		    duration: Snackbar.LENGTH_SHORT
		});
	}

	render() {
		return (
			<Container>
				<Button onPress={this.showSimpleSnackbar}>
					<TextView>Simple snackbar</TextView>
				</Button>
				<Button onPress={this.showSnackbarWithAction}>
					<TextView>Snackbar with action</TextView>
				</Button>
			</Container>
		);
	}
}
