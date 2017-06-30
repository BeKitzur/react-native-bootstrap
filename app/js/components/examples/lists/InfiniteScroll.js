import React, { Component } from 'react';
import { Container, Spinner, TextView } from '../../lib';
import { View, Text, StyleSheet, ListView} from 'react-native';

import api from '../../../api';

export default class InfiniteScroll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            dataSource: null,
            page: 45,
            isLoadingMore: false,
            couldLoadMore: true
        };
        this.loadMore = this.loadMore.bind(this);
        this.showActivityIndicator = this.showActivityIndicator.bind(this);
        this._fetchItems = this._fetchItems.bind(this);
    }

    componentDidMount() {
        this._fetchItems();
    }

    loadMore() {
        if (this.state.isLoadingMore) return;

        this.setState({ isLoadingMore: true });

        this.state.couldLoadMore ?
            this._fetchItems() :
            setTimeout(() => this.setState({ isLoadingMore: false }), 1500);
    }

    _fetchItems() {
        api.getComments(this.state.page).then((res) => {
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
            <Container style={styles.listItem}>
                <TextView style={styles.listItemHeading}>{ item.name }</TextView>
                <TextView>{ item.body }</TextView>
            </Container>
        );
    }

    showActivityIndicator(isInitial) {
        let style = isInitial ? { flex: 1 } : {},
            size = isInitial ? 'large' : 'small';

        if (this.state.couldLoadMore) {
            return (
                <View style={[styles.activityIndicator, style]}>
                    <Spinner size={size} />
                </View>
            );
        } else {
            return (
                <TextView style={styles.allLoadedText}>All items loaded</TextView>
            );
        }
    }

    render() {
        if (this.state.dataSource === null) return this.showActivityIndicator(true);

        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <ListView
                        dataSource={this.state.dataSource}
                        onEndReached={this.loadMore}
                        onEndReachedThreshold={10}
                        renderRow={(item) => this.renderItem(item)}
                    />
                </View>

                <View style={styles.loaderContainer}>
                    { this.state.isLoadingMore ? this.showActivityIndicator() : null }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: -20,
        flex: 1
    },
    listContainer: {
        flex: 1
    },
    activityIndicator: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 20
    },
    listItem: {
        padding: 15,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.25)',
        borderRadius: 3,
        marginHorizontal: 10,
        marginVertical: 5
    },
    listItemHeading: {
        fontSize: 22,
        fontWeight: "400",
        marginBottom: 10
    },
    allLoadedText: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 20
    }
});
