import React, { Component } from 'react'
import {
  View,
  Text,
  ImageBackground,
} from 'react-native'

export default class HomePage extends Component {
    render() {
      const { navigation } = this.props
      return (
        <View>
          <ImageBackground source={require('./app/assets/home_bg.png')} style={{ width: '100%', height: '100%', resizeMode: 'cover' }}>
            <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{ fontSize: 20, marginTop: 200, marginBottom: 10, backgroundColor: 'grey', padding: 10, color: '#fff' }}
                onPress={() => navigation.navigate('Rtc')}
              >RTC Test</Text>
              <Text
                style={{ fontSize: 20, backgroundColor: 'grey', marginBottom: 10, padding: 10, color: '#fff' }}
                onPress={() => navigation.navigate('Login')}
              >登录</Text>
              <Text
                style={{ fontSize: 20, backgroundColor: 'grey', padding: 10, color: '#fff' }}
                onPress={() => navigation.navigate('Settings')}
              >设置</Text>
            </View>
          </ImageBackground>
        </View>
      )
    }
}
  