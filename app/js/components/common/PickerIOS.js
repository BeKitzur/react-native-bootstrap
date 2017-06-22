import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Picker,
    Dimensions,
    TouchableOpacity,
    Modal
} from 'react-native';
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
            selectedValue: value
        });
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.showPicker}>
                    <Text style={this.props.textLabelStyles}>{this.props.selectedItem.label}</Text>
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

PickerIOS.propTypes = {
    items: PropTypes.array.isRequired,
    selectedItem: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    textLabelStyles: PropTypes.object
};

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