import React, {useState} from 'react';
import {View, StyleSheet, Alert, ImageBackground} from 'react-native';
import LogoComponent from '../../components/LogoComponenet';
import BlackButton from '../../components/WhiteButton';
import RegisterButton from '../../components/RegisterButton';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/NavigationTypes';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomePage = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const gotoLogin = () => {
    navigation.navigate('Login');
  };

  const gotoRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <ImageBackground
      source={require('../../assets/Images/space_background.jpg')}
      style={styles.background}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <LogoComponent />
        </View>
        <View style={styles.buttonContainer}>
          <BlackButton title="로그인" onPress={gotoLogin} />
          <RegisterButton onPress={gotoRegister} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-around', // 공간을 균등하게 분배하여 배치
  },
  logoContainer: {
    marginLeft: -30,
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
});

export default HomePage;
