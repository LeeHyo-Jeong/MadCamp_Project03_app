import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/NavigationTypes';
import BlackButton from '../../components/WhiteButton';

type GameTitleScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GameTitle'
>;

type GameTitleScreenRouteProp = RouteProp<RootStackParamList, 'GameTitle'>;

const GameTitlePage: React.FC = () => {
  const navigation = useNavigation<GameTitleScreenNavigationProp>();
  const route = useRoute<GameTitleScreenRouteProp>();
  const {topic, keywords} = route.params;
  const [roomTitle, setRoomTitle] = useState('');

  const handleConfirm = async () => {
    if (topic === '미래') {
      //console.log('future');
      navigation.navigate('SelectInitialStatsFuture', {
        topic,
        keywords,
        roomTitle,
      });
    } else if (topic === '중세') {
      navigation.navigate('SelectInitialStatsMedieval', {
        topic,
        keywords,
        roomTitle,
      });
    } else if (topic === '공포') {
      navigation.navigate('SelectInitialStatsHorror', {
        topic,
        keywords,
        roomTitle,
      });
    } else if (topic === '우주') {
      navigation.navigate('SelectInitialStatsSpace', {
        topic,
        keywords,
        roomTitle,
      });
    }
    //navigation.navigate('SelectInitialStats', {topic, roomTitle});
  };

  return (
    <ImageBackground
      source={require('../../assets/Images/space_background.jpg')}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>방 제목을 입력하세요</Text>
        <TextInput
          style={styles.input}
          value={roomTitle}
          onChangeText={setRoomTitle}
        />
        <BlackButton title="확인" onPress={handleConfirm}></BlackButton>
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
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'neodgm',
    fontSize: 30,
    lineHeight: 30,
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    fontFamily: 'neodgm',
    fontSize: 30,
    lineHeight: 30,
    color: '#fff',
    width: '100%',
    height: 60, // 높이 조정
    borderColor: '#fff', // 밑줄 색상
    borderBottomWidth: 1, // 밑줄만 보이게
    paddingVertical: 5, // 세로 패딩 조정
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default GameTitlePage;
