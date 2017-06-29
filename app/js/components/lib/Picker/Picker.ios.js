import React, { Component, PropTypes } from 'react';
import {
    View,
    StyleSheet,
    Picker,
    Dimensions,
    TouchableOpacity,
    Modal
} from 'react-native';
import TextView from '../TextView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const window = Dimensions.get('window');

export default class PickerIOS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: props.selectedItem,
            pickerIsVisible: false
        };
        this.showPicker = this.showPicker.bind(this);
        this.hidePicker = this.hidePicker.bind(this);
        this.submitChanges = this.submitChanges.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    static propTypes = {
        items: PropTypes.array.isRequired,
        selectedItem: PropTypes.number.isRequired,
        onSubmit: PropTypes.func.isRequired,
        textLabelStyles: PropTypes.object
    };

    renderOptions() {
        return this.props.items.map((option, index) => (
            <Picker.Item
                key={index}
                label={option.label}
                value={option.value}
            />
        ));
    }

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
        this.props.onSubmit(this.state.selectedValue);
        this.setState({ pickerIsVisible: false });
    }

    handleValueChange(value, index) {
        this.setState({
            selectedValue: index
        });
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.showPicker}>
                    <TextView style={this.props.textLabelStyles}>{this.props.items[this.state.selectedValue].label}</TextView>
                </TouchableOpacity>

                <Modal visible={this.state.pickerIsVisible}
                       transparent={true}
                       animationType="slide"
                       style={styles.modal}>

                    <View style={styles.pickerWrapper}>

                        <View style={styles.pickerControls}>
                            <TouchableOpacity onPress={this.hidePicker}>
                                <Icon name="close" size={25} color="#00ADEF" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.submitChanges}>
                                <Icon name="check" size={25} color="#00ADEF" />
                            </TouchableOpacity>
                        </View>

                        <Picker selectedValue={this.state.selectedValue}
                                onValueChange={this.handleValueChange}>
                            { this.renderOptions() }
                        </Picker>

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
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eaeaea'
    }
});