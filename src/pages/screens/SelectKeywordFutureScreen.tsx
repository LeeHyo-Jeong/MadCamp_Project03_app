import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/NavigationTypes';

type FutureKeywordSelectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SelectFutureKeyword'
>;

type FutureKeywordSelectionScreenRouteProp = RouteProp<
  RootStackParamList,
  'SelectFutureKeyword'
>;

const SelectKeywordFutureScreen: React.FC = () => {
  const futureKeywords = ['로봇', '과학', '사회', '나노 기술', '가상 현실'];

  const navigation =
    useNavigation<FutureKeywordSelectionScreenNavigationProp>();
  const route = useRoute<FutureKeywordSelectionScreenRouteProp>();
  const {topic} = route.params;
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const handleKeywordPress = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(prev =>
        prev.includes(keyword)
          ? prev.filter(k => k !== keyword)
          : [...prev, keyword],
      );
    } else {
      if (selectedKeywords.length < 3) {
        setSelectedKeywords(prev => [...prev, keyword]);
      }
    }
  };

  const handleConfirm = () => {
    navigation.navigate('GameTitle', {topic, keywords: selectedKeywords});
  };

  return (
    <ImageBackground
      source={require('../../assets/Images/space_background.jpg')}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>키워드 3개를 선택하세요</Text>
        <View style={styles.keywordsContainer}>
          {futureKeywords.map(keyword => (
            <TouchableOpacity
              key={keyword}
              style={[
                styles.keywordButton,
                selectedKeywords.includes(keyword) &&
                  styles.selectedKeywordButton,
              ]}
              onPress={() => handleKeywordPress(keyword)}>
              <Text style={styles.keywordText}>{keyword}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirm}
          disabled={selectedKeywords.length !== 3}>
          <Text style={styles.confirmButtonText}>확인</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 30,
    lineHeight: 30,
    marginBottom: 20,
    color: '#fff',
    fontFamily: 'neodgm',
  },
  keywordsContainer: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  keywordButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 30,
    padding: 10,
    margin: 10,
    width: 300,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  selectedKeywordButton: {
    backgroundColor: 'rgba(255, 140, 185, 0.68)',
  },
  keywordText: {
    fontSize: 20,
    lineHeight: 20,
    color: '#000',
    fontFamily: 'neodgm',
    textShadowColor: 'rgba(255, 255, 255, 1)', // 네온 효과
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 15, // 네온 효과의 강도
    shadowColor: 'rgba(255, 122, 179, 1)', // 네온 효과
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 20, // 네온 효과의 강도
  },
  confirmButton: {
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
  confirmButtonText: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 30,
    fontFamily: 'neodgm',
    textShadowColor: 'rgba(255, 255, 255, 1)', // 네온 효과
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 15, // 네온 효과의 강도
    shadowColor: 'rgba(255, 122, 179, 1)', // 네온 효과
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 20, // 네온 효과의 강도
  },
});

export default SelectKeywordFutureScreen;
