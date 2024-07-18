import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  ImageBackgroundBase,
} from 'react-native';
import {Slider} from '@react-native-assets/slider';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/NavigationTypes';
import {TouchableOpacity} from 'react-native-gesture-handler';

type SelectInitialStatsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SelectInitialStats'
>;

type SelectInitialStatsScreenRouteProp = RouteProp<
  RootStackParamList,
  'SelectInitialStats'
>;

const statsByTopic = {
  미래: [
    '공격력',
    '방어력',
    '체력',
    '이동속도',
    '지혜',
    '운',
  ],
  중세: [
    '공격력',
    '방어력',
    '체력',
    '이동속도',
    '지혜',
    '운',
    '검술',
    '마법',
    '승마',
  ],
  공포: [
    '공격력',
    '방어력',
    '체력',
    '이동속도',
    '지혜',
    '운',
    '공포 저항',
    '정신력',
    '은신',
  ],
  우주: [
    '공격력',
    '방어력',
    '체력',
    '이동속도',
    '지혜',
    '운',
    '우주항법',
    '외계어',
    '기술',
    '탐사력',
  ],
};

type StatsByTopic = typeof statsByTopic;
type Topic = keyof StatsByTopic;
type Stat = string;
type Stats = {[key in Stat]: number};

const SelectInitialStatsScreen: React.FC = () => {
  const navigation = useNavigation<SelectInitialStatsScreenNavigationProp>();
  const route = useRoute<SelectInitialStatsScreenRouteProp>();
  const {topic} = route.params;

  const initialStats = statsByTopic[topic].reduce((acc, stat) => {
    acc[stat] = 0;
    return acc;
  }, {} as Stats);

  const [stats, setStats] = useState<Stats>(initialStats);
  const [remainingPoints, setRemainingPoints] = useState(10);

  const handleConfirm = () => {
    // 선택한 능력치를 저장하고 다음 화면으로 이동
    console.log('선택한 능력치:', stats);
    //navigation.navigate('NextScreen', { stats });
  };

  const handleChange = (key: Stat, value: number) => {
    const currentTotal = Object.values(stats).reduce((a, b) => a + b, 0);
    const newTotal = currentTotal - stats[key] + value;

    if (newTotal <= 10) {
      setStats({
        ...stats,
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
          {Object.keys(stats).map(key => (
            <View key={key} style={styles.sliderContainer}>
              <Text style={styles.statText}>{key}</Text>
              <Slider
                style={styles.slider}
                value={stats[key]}
                minimumValue={0}
                maximumValue={10}
                step={1}
                onValueChange={value => handleChange(key, value)}
                minimumTrackTintColor="grey"
                maximumTrackTintColor="grey"
                thumbTintColor="white"
              />
              <Text style={styles.numberText}>{stats[key]}</Text>
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
    lineHeight: 30, // 글씨 높이 조정
  },
  statText: {
    lineHeight: 20,
    fontSize: 20,
    width: 60,
    //marginTop: -93,
    //marginRight: -10,
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
    width: 360, // 버튼의 너비를 고정
    height: 80, // 버튼의 높이를 고정
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 30,
    fontFamily: 'neodgm',
    alignItems: 'center', // 수평 중앙
    justifyContent: 'center', // 수직 중앙
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
    width: '80%',
  },
  sliderContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slider: {
    width: 200,
    height: 40,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default SelectInitialStatsScreen;
