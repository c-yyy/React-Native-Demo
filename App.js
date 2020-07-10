import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  Image,
  ImageBackground,
  TextInput,
  StyleSheet
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import RtcPage from './app/pages/Rtc'

const Stack = createStackNavigator()

class HomePage extends Component {
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

class LoginPage extends Component {
  constructor(props) {
    super(props)
  }
  handleLogin() {
    fetch('https://api.terminal.wulvshi.com/api-v2/user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({
        action: 'manage',
        username: '临时测试',
        password: '123456'
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        return responseJson
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    const { navigation, username, password } = this.props
    return (
      <View style={style.container}>
        <Image
          style={{ width: 100, height: 100, marginBottom: 30 }}
          source={require('./app/assets/logo.png')}
        />
        <TextInput
          placeholder="请输入账号"
          textContentType="username"
          clearButtonMode="while-editing"
          style={{ width: '55%', height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 10 }}
          value={username}
        />
        <TextInput
          clearButtonMode
          textContentType="password"
          secureTextEntry={true}
          placeholder="请输入密码"
          style={{ width: '55%', height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5 }}
          value={password}
        />
        <Button
          title="登录"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    )
  }
}

class SettingsPage extends Component {
  render() {
    return (
      <View style={style.container}>
          <Image
            style={{ width: 100, height: 100, marginBottom: 20 }}
            source={require('./app/assets/logo.png')}
          />
          <Text style={{ marginBottom: 100 }}>张三</Text>
          <Button title="退出登录" color="red" />
      </View>
    )
  }
}

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator mode="modal">
          <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
          <Stack.Screen name="Rtc" component={RtcPage} options={{ headerShown: false }} />
          <Stack.Screen name="Settings" component={SettingsPage} options={{ title: '设置' }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 300
  }
})
