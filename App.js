import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  Image,
  Alert,
  ImageBackground,
  TextInput,
  StyleSheet
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AsyncStorage } from "react-native"
import RtcPage from './app/pages/Rtc'

const Stack = createStackNavigator()

class HomePage extends Component {
  async componentDidMount() {
    try {
      const result = await AsyncStorage.getItem('@UserInfo:key')
      const { token } = JSON.parse(result)
      if (!token) {
        await this.props.navigation.navigate('Login')
        return
      }
    } catch (error) {
      await this.props.navigation.navigate('Login')
      return
    }
  }
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
    this.state = {
      username: '',
      password: ''
    }
  }
  handleLogin(navigation) {
    fetch('https://api.terminal.wulvshi.com/api-v2/user/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `action=manage&username=${this.state.username}&password=${this.state.password}`
    }).then((response) => response.json())
      .then(async (responseJson) => {
        const { result, status } = responseJson
        if (status !== 1) {
          Alert.alert('登录提示', responseJson.msg)
          return
        }
        try {
          await AsyncStorage.setItem('@UserInfo:key', JSON.stringify(result))
          navigation.navigate('Home')
        } catch (error) {
          console.error(error)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
  render() {
    const { navigation } = this.props
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
          style={{ width: '55%', height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, marginBottom: 10, paddingLeft: 10 }}
          onChangeText={(username)=>this.setState({username})}
        />
        <TextInput
          clearButtonMode
          textContentType="password"
          secureTextEntry={true}
          placeholder="请输入密码"
          style={{ width: '55%', height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, paddingLeft: 10 }}
          onChangeText={(password)=>this.setState({password})}
        />
        <Button
          title="登录"
          onPress={() => this.handleLogin(navigation)}
        />
      </View>
    )
  }
}

class SettingsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userinfo: '',
      version: '1.0.1'
    }
  }
  async componentDidMount() {
    const result = await AsyncStorage.getItem('@UserInfo:key')
    console.log(typeof JSON.parse(result).userInfo)
    this.setState({
      userinfo: JSON.parse(result).userInfo
    })
  }
  async handleLogout(navigation) {
    await AsyncStorage.removeItem('@UserInfo:key')
    await navigation.navigate('Login')
  }
  render() {
    const { navigation } = this.props
    const { username, roles } = this.state.userinfo
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -300 }}>
          <Image
            style={{ width: 100, height: 100, marginBottom: 20 }}
            source={require('./app/assets/logo.png')}
          />
          <Text style={{ marginBottom: 50 }}>{username}</Text>
          {/* {roles.length && roles.map(v => {
            return (
              <Text style={{ marginBottom: 50 }}>{v.name}</Text>
            )
          })} */}
          <Button title="退出登录" color="red" onPress={() => this.handleLogout(navigation)} style={{ marginBottom: 300 }} />
          <Text style={{ position: 'absolute', bottom: 50 }}>v_{this.state.version}</Text>
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
