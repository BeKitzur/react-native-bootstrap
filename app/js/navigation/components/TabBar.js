import React, { Component } from 'react';
import { TabBarBottom } from 'react-navigation';
import { connect } from 'react-redux';
import { COLORS } from '../../constants/Theme';

class TabBar extends Component {
    render() {
        let { appTheme } = this.props.global;

        return (
            <TabBarBottom
                {...this.props}
                activeTintColor={COLORS[appTheme].foreground}
                inactiveTintColor={COLORS[appTheme].foreground}
                style={[this.props.style, { backgroundColor: COLORS[appTheme].accent }]}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        global: state.Global
    };
}

export default connect(mapStateToProps)(TabBar);