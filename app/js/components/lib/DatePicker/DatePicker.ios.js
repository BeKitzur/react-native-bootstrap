import React, { Component, PropTypes } from 'react';
import {
    View,
    StyleSheet,
    DatePickerIOS,
    Dimensions,
    TouchableOpacity,
    Modal
} from 'react-native';
import TextView from '../TextView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../../constants/Theme';

const window = Dimensions.get('window');

export default class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.date,
            pickerIsVisible: false
        };
        this.showPicker = this.showPicker.bind(this);
        this.hidePicker = this.hidePicker.bind(this);
        this.submitChanges = this.submitChanges.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    static contextTypes = {
        getCurrentTheme: PropTypes.func
    };

    static propTypes = {
        date: PropTypes.object,
        onSubmit: PropTypes.func.isRequired,
        textLabelStyles: PropTypes.object
    };

    showPicker() {
        this.setState({
            pickerIsVisible: true
        });
    }

    hidePicker() {
        this.setState({
            pickerIsVisible: false
        });
    }

    submitChanges() {
        this.setState({
            pickerIsVisible: false
        }, this.props.onSubmit(this.state.date));
    }

    handleDateChange(date) {
        this.setState({ date });
    }

    render() {
        let appTheme = this.context.getCurrentTheme();
        console.log(this.refs.datepicker);

        return (
            <View>
                <TouchableOpacity onPress={this.showPicker}>
                    <TextView style={this.props.textLabelStyles}>
                        { this.props.date.toLocaleDateString() }
                    </TextView>
                </TouchableOpacity>

                <Modal visible={this.state.pickerIsVisible}
                       transparent={true}
                       animationType="slide"
                       style={styles.modal}>

                    <View style={styles.pickerWrapper}>

                        <View style={styles.pickerControls}>
                            <TouchableOpacity onPress={this.hidePicker}>
                                <Icon name="close" size={25} color="#666" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.submitChanges}>
                                <Icon name="check" size={25} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <DatePickerIOS
                            ref="datepicker"
                            date={this.state.date}
                            mode="date"
                            itemStyle={{color: COLORS[appTheme].foreground}}
                            onDateChange={this.handleDateChange}
                        />

                    </View>

                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative'
    },
    pickerControls: {
        height: 32,
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    pickerWrapper: {
        position: 'absolute',
        bottom: 0,
        width: window.width,
        height: 200,
        backgroundColor: '#ccc'
    }
});