import React, { Component } from 'react'
import {
    View,
    Text
} from 'react-native'

export default class Rtc extends Component {
    render() {
        const { navigation } = this.props
        return (
            <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
                <Text onPress={() => navigation.goBack() }>RTC</Text>
            </View>
        )
    }
}
