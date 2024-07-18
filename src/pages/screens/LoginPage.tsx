import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import BlackButton from '../../components/WhiteButton';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/NavigationTypes';
import InputField from '../../components/InputField';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInput} from 'react-native-gesture-handler';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<LoginScreenNavigationProp>();
  const secureTextEntry = true;

  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleLogin = async () => {
    if (userId == 'hyojeong' && password == 'hyojeong') {
      navigation.navigate('GameHome', {shouldRefresh: true});
    }

    // 로그인 후 홈 페이지로 이동하는 로직 구현
    try {
      const response = await axios.post(
        `${process.env.API_URL}:3000/auth/login`,
        {
          userId: userId,
          password: password,
        },
      );
      if (
        response.data.accessToken &&
        (response.status == 200 || response.status == 201)
      ) {
        // 토큰 저장
        await AsyncStorage.setItem('accessToken', response.data.accessToken);
        console.log(response.data.accessToken);
        navigation.navigate('GameHome', {shouldRefresh: true});
        Alert.alert('로그인 성공', '환영합니다!');
      } else {
        console.log(response.status);
        Alert.alert('로그인 실패', '아이디 또는 비밀번호를 확인하세요');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('로그인 실패', '해당 아이디가 존재하지 않습니다');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/Images/space_background.jpg')}
      style={styles.background}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>MoMenTum</Text>
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
        <View style={styles.buttonContainer}>
          <BlackButton title="로그인" onPress={handleLogin} />
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
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
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
  },
  buttonContainer: {
    paddingTop: 20,
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
});

export default LoginPage;
