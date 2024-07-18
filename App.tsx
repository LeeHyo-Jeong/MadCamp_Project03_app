import React, {useEffect, useRef, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './src/types/NavigationTypes';
import LoginPage from './src/pages/screens/LoginPage';
import RegisterPage from './src/pages/screens/RegisterPage';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import HomePage from './src/pages/screens/HomePage';
import GameHomePage from './src/pages/screens/GameHomePage';
import GameTopicSelectionPage from './src/pages/screens/GameTopicSelectionPage';
import SelectInitialStatsScreen from './src/pages/screens/SelectInitialStatsPage';
import GameTitlePage from './src/pages/screens/GameTitlePage';
import SelectInitialStatsHorrorScreen from './src/pages/screens/SelectInitialStatsHorrorScreen';
import SelectInitialStatsSpaceScreen from './src/pages/screens/SelectInitialStatsSpaceScreen';
import SelectInitialStatsMedievalScreen from './src/pages/screens/SelectInitialStatsMedievalScreen';
import SelectInitialStatsFutureScreen from './src/pages/screens/SelectInitialStatsFutureScreen';
import SelectKeywordFutureScreen from './src/pages/screens/SelectKeywordFutureScreen';
import SelectKeywordMedievalScreen from './src/pages/screens/SelectKeywordMedievalScreen';
import SelectKeywordHorrorScreen from './src/pages/screens/SelectKeywordHorrorScreen';
import SelectKeywordSpaceScreen from './src/pages/screens/SelectKeywordSpaceScreen';
import GamePlayScreen from './src/pages/screens/GamePlayScreen';
import FastImage from 'react-native-fast-image';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamList>>(null);
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000); // 스플래시 화면을 3초간 표시
  }, []);

  if (isSplashVisible) {
    return (
      <View style={styles.splashContainer}>
        <FastImage
          style={styles.image}
          source={require('./android/app/src/main/res/drawable/splash.gif')}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{
            headerShown: true, // 헤더를 보이게 설정
            title: '', // 타이틀을 빈 문자열로 설정하여 숨김
            headerBackTitleVisible: false, // 뒤로가기 버튼 텍스트 숨김
            headerTransparent: true, // 헤더를 투명하게 설정
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={{
            headerShown: true, // 헤더를 보이게 설정
            title: '', // 타이틀을 빈 문자열로 설정하여 숨김
            headerBackTitleVisible: false, // 뒤로가기 버튼 텍스트 숨김
            headerTransparent: true, // 헤더를 투명하게 설정
          }}
        />
        <Stack.Screen
          name="GameHome"
          component={GameHomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GameTopicSelection"
          component={GameTopicSelectionPage}
          options={{
            headerShown: true, // 헤더를 보이게 설정
            title: '', // 타이틀을 빈 문자열로 설정하여 숨김
            headerBackTitleVisible: false,
            headerTransparent: true, // 헤더를 투명하게 설정
          }}
        />
        <Stack.Screen
          name="SelectInitialStats"
          component={SelectInitialStatsScreen}
          options={{
            headerShown: true, // 헤더를 보이게 설정
            title: '', // 타이틀을 빈 문자열로 설정하여 숨김
            headerBackTitleVisible: false, // 뒤로가기 버튼 텍스트 숨김
            headerTransparent: true, // 헤더를 투명하게 설정
          }}
        />
        <Stack.Screen
          name="SelectInitialStatsFuture"
          component={SelectInitialStatsFutureScreen}
          options={{
            headerShown: true, // 헤더를 보이게 설정
            title: '', // 타이틀을 빈 문자열로 설정하여 숨김
            headerBackTitleVisible: false, // 뒤로가기 버튼 텍스트 숨김
            headerTransparent: true, // 헤더를 투명하게 설정
          }}
        />
        <Stack.Screen
          name="SelectInitialStatsMedieval"
          component={SelectInitialStatsMedievalScreen}
          options={{
            headerShown: true, // 헤더를 보이게 설정
            title: '', // 타이틀을 빈 문자열로 설정하여 숨김
            headerBackTitleVisible: false, // 뒤로가기 버튼 텍스트 숨김
            headerTransparent: true, // 헤더를 투명하게 설정
          }}
        />
        <Stack.Screen
          name="SelectInitialStatsHorror"
          component={SelectInitialStatsHorrorScreen}
          options={{
            headerShown: true, // 헤더를 보이게 설정
            title: '', // 타이틀을 빈 문자열로 설정하여 숨김
            headerBackTitleVisible: false, // 뒤로가기 버튼 텍스트 숨김
            headerTransparent: true, // 헤더를 투명하게 설정
          }}
        />
        <Stack.Screen
          name="SelectInitialStatsSpace"
          component={SelectInitialStatsSpaceScreen}
          options={{
            headerShown: true, // 헤더를 보이게 설정
            title: '', // 타이틀을 빈 문자열로 설정하여 숨김
            headerBackTitleVisible: false, // 뒤로가기 버튼 텍스트 숨김
            headerTransparent: true, // 헤더를 투명하게 설정
          }}
        />
        <Stack.Screen
          name="GameTitle"
          component={GameTitlePage}
          options={{
            headerShown: true,
            title: '',
            headerBackTitleVisible: false,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="SelectFutureKeyword"
          component={SelectKeywordFutureScreen}
          options={{
            headerShown: true, // 헤더를 보이게 설정
            title: '', // 타이틀을 빈 문자열로 설정하여 숨김
            headerBackTitleVisible: false,
            headerTransparent: true, // 헤더를 투명하게 설정
          }}
        />
        <Stack.Screen
          name="SelectMedievalKeyword"
          component={SelectKeywordMedievalScreen}
          options={{
            headerShown: true, // 헤더를 보이게 설정
            title: '', // 타이틀을 빈 문자열로 설정하여 숨김
            headerBackTitleVisible: false,
            headerTransparent: true, // 헤더를 투명하게 설정
          }}
        />
        <Stack.Screen
          name="SelectHorrorKeyword"
          component={SelectKeywordHorrorScreen}
          options={{
            headerShown: true, // 헤더를 보이게 설정
            title: '', // 타이틀을 빈 문자열로 설정하여 숨김
            headerBackTitleVisible: false,
            headerTransparent: true, // 헤더를 투명하게 설정
          }}
        />
        <Stack.Screen
          name="SelectSpaceKeyword"
          component={SelectKeywordSpaceScreen}
          options={{
            headerShown: true, // 헤더를 보이게 설정
            title: '', // 타이틀을 빈 문자열로 설정하여 숨김
            headerBackTitleVisible: false,
            headerTransparent: true, // 헤더를 투명하게 설정
          }}
        />
        <Stack.Screen
          name="GamePlay"
          component={GamePlayScreen}
          options={{
            headerShown: false, // 헤더를 보이게 설정
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // 배경색
  },
  image: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
});

export default App;
