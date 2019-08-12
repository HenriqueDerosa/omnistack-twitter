import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import api from '../services/api';

import socket from 'socket.io-client';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Tweet from '../components/Tweet';

export default class Timeline extends Component {
    static navigationOptions = ({ navigation })=>({
        title: 'Timeline',
        headerRight: (
            <TouchableOpacity onPress={()=> navigation.navigate("New")}>
                <Icon 
                style={{marginRight:20}}
                name="add-circle-outline"
                size={24}
                color="#4BB0EE"></Icon>
            </TouchableOpacity>
        )
    })

    state = {
        tweets: [],
    }

    subscribeToEvents = () => {
        const io = socket('https://limitless-plateau-12012.herokuapp.com');
    
        io.on('tweet', data => {
          this.setState({tweets: [data, ...this.state.tweets]})
        });
        
        io.on('like', data => {
          this.setState({tweets: this.state.tweets.map(t => t._id === data._id ? data : t)});
        });
      }

    async componentDidMount() {
        this.subscribeToEvents();
        const response = await api.get('tweets');

        this.setState({ tweets: response.data });
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList 
                    data={this.state.tweets}
                    keyExtractor={tweet => tweet._id}
                    renderItem={({item})=> <Tweet tweet={item}/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    }
});
