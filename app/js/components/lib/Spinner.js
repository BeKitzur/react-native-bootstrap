import React, { Component, PropTypes } from 'react';
import Container from './Container';
import { COLORS } from '../../constants/Theme';
import { ActivityIndicator, StyleSheet } from 'react-native';

export default class Spinner extends Component {
	static contextTypes = {
		getCurrentTheme: PropTypes.func
	};

	render() {
		let appTheme = this.context.getCurrentTheme();

		return (
			<Container style={styles.container}>
				<ActivityIndicator {...this.props} color={COLORS[appTheme].foreground} />
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center'
	}
});
