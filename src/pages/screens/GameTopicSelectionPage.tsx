import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/NavigationTypes';
import {statsByTopic} from '../../types/TopicTypes';

type GameTopicSelectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GameTopicSelection'
>;

const GameTopicSelectionPage = () => {
  const navigation = useNavigation<GameTopicSelectionScreenNavigationProp>();

  const handleTopicSelect = async (topic: keyof typeof statsByTopic) => {
    switch (topic) {
      case '미래':
        navigation.navigate('SelectFutureKeyword', {topic});
        break;
      case '중세':
        navigation.navigate('SelectMedievalKeyword', {topic});
        break;
      case '공포':
        navigation.navigate('SelectHorrorKeyword', {topic});
        break;
      case '우주':
        navigation.navigate('SelectSpaceKeyword', {topic});
        break;
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/Images/space_background.jpg')}
      style={styles.background}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>플레이 주제를</Text>
          <Text style={styles.title}>선택 해주세요</Text>
        </View>
        <View style={styles.topicButtonTextContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.topicButton}
              onPress={() => handleTopicSelect('미래')}>
              <Text style={styles.topicButtonText}>미래</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.topicButton}
              onPress={() => handleTopicSelect('중세')}>
              <Text style={styles.topicButtonText}>중세</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.topicButton}
              onPress={() => handleTopicSelect('공포')}>
              <Text style={styles.topicButtonText}>공포</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.topicButton}
              onPress={() => handleTopicSelect('우주')}>
              <Text style={styles.topicButtonText}>우주</Text>
            </TouchableOpacity>
          </View>
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
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'neodgm',
    lineHeight: 32,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  topicButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 30,
    padding: 20,
    margin: 10,
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  topicButtonText: {
    color: '#000',
    fontSize: 32,
    lineHeight: 32,
    fontFamily: 'neodgm',
    textAlignVertical: 'center',
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 1)', // 네온 효과
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 15, // 네온 효과의 강도
    shadowColor: 'rgba(255, 122, 179, 1)', // 네온 효과
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 20, // 네온 효과의 강도
  },
  topicButtonTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameTopicSelectionPage;
