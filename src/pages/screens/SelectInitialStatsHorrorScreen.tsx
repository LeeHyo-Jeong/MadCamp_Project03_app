import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Slider} from '@react-native-assets/slider';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/NavigationTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_URL} from '@env';
import GamePlayScreen from './GamePlayScreen';

type SelectInitialStatsScreenHorrorNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SelectInitialStatsHorror'
>;

type SelectInitialStatsScreenHorrorRouteProp = RouteProp<
  RootStackParamList,
  'SelectInitialStatsHorror'
>;

const stats = ['공격력', '방어력', '이동속도', '지혜', '운'];

type Stats = {[key in (typeof stats)[number]]: number};

const SelectInitialStatsHorrorScreen: React.FC = () => {
  const navigation =
    useNavigation<SelectInitialStatsScreenHorrorNavigationProp>();
  const route = useRoute<SelectInitialStatsScreenHorrorRouteProp>();
  const {roomTitle, keywords, topic} = route.params;

  const initialStats = stats.reduce((acc, stat) => {
    acc[stat] = 0;
    return acc;
  }, {} as Stats);

  const [statsValues, setStatsValues] = useState<Stats>(initialStats);
  const [remainingPoints, setRemainingPoints] = useState(10);

  const handleConfirm = async () => {
    // 서버에 만든 게임 전송
    console.log('선택한 능력치:', statsValues);

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log(accessToken);

      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await axios.post(
        `${API_URL}:3000/s-rooms/`,
        {
          room: roomTitle,
          theme: 'ghost', //공포
          keywords: keywords,
          userStats: {
            attack: statsValues['공격력'],
            defense: statsValues['방어력'],
            speed: statsValues['이동속도'],
            intelligence: statsValues['지혜'],
            luck: statsValues['운'],
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.status === 200) {
        const {id: roomId, userStats} = response.data;

        Alert.alert('성공', '방 생성이 완료되었습니다.');
        // 생성된 게임으로 이동
        navigation.navigate('GamePlay', {initialStats: userStats, theme: "ghost", roomId: roomId});
      } else {
        Alert.alert('오류', '방 생성 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error creating room:', error);
      Alert.alert('오류', '방 생성 중 오류가 발생했습니다.');
    }
  };

  const handleChange = (key: keyof Stats, value: number) => {
    const currentTotal = Object.values(statsValues).reduce((a, b) => a + b, 0);
    const newTotal = currentTotal - statsValues[key] + value;

    if (newTotal <= 10) {
      setStatsValues({
        ...statsValues,
        [key]: value,
      });
      setRemainingPoints(10 - newTotal);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/Images/space_background.jpg')}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>초기 능력치를 선택하세요</Text>
        <Text style={styles.remainingPoints}>
          남은 포인트: {remainingPoints}
        </Text>
        <View style={styles.sliders}>
          {Object.keys(statsValues).map(key => (
            <View key={key} style={styles.sliderContainer}>
              <Text style={styles.statText}>{key}</Text>
              <Slider
                style={styles.slider}
                value={statsValues[key]}
                minimumValue={0}
                maximumValue={10}
                step={1}
                onValueChange={value => handleChange(key as keyof Stats, value)}
                minimumTrackTintColor="grey"
                maximumTrackTintColor="grey"
                thumbTintColor="white"
              />
              <Text style={styles.numberText}>{statsValues[key]}</Text>
            </View>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleConfirm} style={styles.button}>
            <Text style={styles.buttonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  numberText: {
    paddingTop: 15,
    color: '#fff',
    fontFamily: 'neodgm',
    width: 30,
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 30,
  },
  statText: {
    lineHeight: 20,
    fontSize: 20,
    width: 60,
    color: '#fff',
    fontFamily: 'neodgm',
    flex: 1,
  },
  button: {
    borderColor: '#fff',
    borderWidth: 1.5,
    borderStyle: 'dotted',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 30,
    width: 360,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 30,
    fontFamily: 'neodgm',
    alignItems: 'center',
    justifyContent: 'center',
    textShadowColor: 'rgba(255, 255, 255, 1)', // 네온 효과
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 15, // 네온 효과의 강도
    shadowColor: 'rgba(255, 122, 179, 1)', // 네온 효과
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 20, // 네온 효과의 강도
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
  },
  title: {
    lineHeight: 24,
    color: '#fff',
    fontFamily: 'neodgm',
    fontSize: 24,
  },
  remainingPoints: {
    lineHeight: 25,
    fontFamily: 'neodgm',
    fontSize: 25,
    color: 'red',
  },
  sliders: {
    paddingTop: 20,
    width: '80%',
  },
  sliderContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slider: {
    width: 170,
    height: 40,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default SelectInitialStatsHorrorScreen;
