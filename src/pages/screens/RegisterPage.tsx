import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, ImageBackground} from 'react-native';
import axios from 'axios';
import BlackButton from '../../components/WhiteButton';
import InputField from '../../components/InputField';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/NavigationTypes';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';

type RegisterPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

const RegisterPage: React.FC = () => {
  const [username, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const navigation = useNavigation<RegisterPageNavigationProp>();

  const handleRegister = async () => {
    // db에 아이디와 비밀번호 저장 후 홈 페이지로 이동하는 로직 구현
    // 로그인 후 홈 페이지로 이동하는 로직 구현

    console.log(API_URL);
    try {
      const response = await axios.post(
        `${API_URL}:3000/auth/register`,
        {
          username: username,
          userId: userId,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (
        response.data.accessToken &&
        (response.status == 200 || response.status == 201)
      ) {
        // 토큰 저장
        await AsyncStorage.setItem('accessToken', response.data.accessToken);
        Alert.alert('회원가입 성공', '환영합니다!', [
          {
            text: '확인',
            onPress: () => navigation.navigate('Home'),
          },
        ]);
      } else {
        console.log(response.data);
        console.log(response.data.accessToken);
        console.log(response.status);
        Alert.alert('회원가입 실패', '아이디 또는 비밀번호를 확인하세요');
      }
    } catch (error) {
      console.log(error);
      console.error(error);
      Alert.alert('회원가입 오류', '서버와의 통신에 문제가 있습니다');
    }
  };

  const secureTextEntry = true;

  return (
    <ImageBackground
      source={require('../../assets/Images/space_background.jpg')}
      style={styles.background}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>MoMenTum</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.text}>닉네임</Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor:
                  focusedInput === 'username'
                    ? 'rgba(255, 140, 185, 1)'
                    : '#fff',
              }, // 포커스에 따른 border 색 변경
            ]}
            value={username}
            onChangeText={setUserName}
            onFocus={() => setFocusedInput('username')}
            onBlur={() => setFocusedInput(null)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>아이디</Text>
          <TextInput
            style={[
              styles.input,
              {
                borderColor:
                  focusedInput === 'userId' ? 'rgba(255, 140, 185, 1)' : '#fff',
              }, // 포커스에 따른 border 색 변경
            ]}
            value={userId}
            onChangeText={setUserId}
            onFocus={() => setFocusedInput('userId')}
            onBlur={() => setFocusedInput(null)}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>비밀번호</Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor:
                    focusedInput === 'password'
                      ? 'rgba(255, 140, 185, 1)'
                      : '#fff',
                }, // 포커스에 따른 border 색 변경
              ]}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <BlackButton title="시작하기" onPress={handleRegister} />
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 250,
    height: 80,
    marginVertical: 10,
    backgroundColor: '#transparent',
    fontSize: 30,
    fontFamily: 'neodgm',
    color: '#fff',
    lineHeight: 30,
    borderColor: '#fff',
    borderWidth: 2.5,
    borderRadius: 30,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'neodgm',
    fontSize: 16,
    lineHeight: 16,
    color: '#fff',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  logoText: {
    fontFamily: 'neodgm',
    color: '#fff',
    fontSize: 40,
    lineHeight: 40,
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonContainer: {
    paddingTop: 30,
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
});

export default RegisterPage;
