import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Button, TextView, Container } from '../../lib';

export default class AlertExample extends Component {
	showAlert() {
		Alert.alert(
			'Alert title',
			'Alert message'
		);
	}

	showConfirmationDialog() {
		Alert.alert(
			'Confirmation title',
			'Confirm or dissmiss action',
			[
				{
					text: 'Confirm',
					onPress: () => {}
				},
				{
					text: 'Dissmiss',
					onPress: () => {},
					style: 'cancel'
				}
			]
		);
	}

	render() {
		return (
			<Container>
				<Button onPress={this.showAlert}>
					<TextView>Alert</TextView>
				</Button>
				<Button onPress={this.showConfirmationDialog}>
					<TextView>Confirmation dialog</TextView>
				</Button>
			</Container>
		);
	}
}
