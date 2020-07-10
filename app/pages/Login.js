import React, { Component } from 'react'
import {
  View,
  Button,
  Image,
  TextInput
} from 'react-native'

export default class LoginPage extends Component {
    render() {
      const { navigation, value } = this.props
      return (
        <View style={style.container}>
          <Image
            style={{ width: 100, height: 100, marginBottom: 30 }}
            source={require('./app/assets/logo.png')}
          />
          <TextInput
            placeholder="请输入账号"
            clearButtonMode="while-editing"
            style={{ width: '55%', height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 10 }}
            value={value}
          />
          <TextInput
            clearButtonMode
            placeholder="请输入密码"
            style={{ width: '55%', height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5 }}
            value={value}
          />
          <Button
            title="登录"
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      )
    }
}
