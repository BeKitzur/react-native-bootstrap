import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, ActivityIndicator} from 'react-native';

export default class InfiniteScroll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            dataSource: null,
            page: 1,
            isLoadingMore: false,
            couldLoadMore: true
        };
        this.loadMore = this.loadMore.bind(this);
        this._fetchItems = this._fetchItems.bind(this);
    }

    componentDidMount() {
        this._fetchItems();
    }

    loadMore() {
        if (this.state.isLoadingMore || !this.state.couldLoadMore) return;

        this.setState({ isLoadingMore: true });
        this._fetchItems();
    }

    _fetchItems() {
        fetch({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/comments?&_page=' + this.state.page
        })
            .then((res) => {
                res.json().then(data => {
                    if (data.length) {
                        data = this.state.items ? [...this.state.items, ...data] : data;

                        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                        this.setState({
                            items: data,
                            dataSource: ds.cloneWithRows(data),
                            isLoadingMore: false,
                            page: this.state.page + 1
                        });
                    } else {
                        this.setState({
                            couldLoadMore: false,
                            isLoadingMore: false
                        });
                    }
                });
            })
            .catch((err) => console.log(err));
    }

    renderItem(item) {
        return (
            <View style={styles.listItem}>
                <Text style={styles.listItemHeading}>{ item.name }</Text>
                <Text>{ item.body }</Text>
            </View>
        );
    }

    _showActivityIndicator(isInitial) {
        let style = isInitial ? { flex: 1 } : {};

        return (
            <View style={[styles.activityIndicator, style]}>
                <ActivityIndicator color="#00ADEF" />
            </View>
        );
    }

    render() {
        if (this.state.dataSource === null) return this._showActivityIndicator(true);

        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={10}
                    renderRow={(item) => this.renderItem(item)}
                />

                { this.state.isLoadingMore ? this._showActivityIndicator() : null }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    activityIndicator: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    listItem: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 3,
        marginBottom: 15
    },
    listItemHeading: {
        fontSize: 16,
        fontWeight: "400",
        color: 'black',
        marginBottom: 10
    }
});

