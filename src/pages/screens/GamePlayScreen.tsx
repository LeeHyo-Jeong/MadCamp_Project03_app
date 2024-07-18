import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
  BackHandler,
} from 'react-native';
import axios from 'axios';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types/NavigationTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';
import {Image} from 'react-native';
import {Modal} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type GamePlayScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GamePlay'
>;
type GamePlayScreenRouteProp = RouteProp<RootStackParamList, 'GamePlay'>;

const GamePlayScreen: React.FC = () => {
  const route = useRoute<GamePlayScreenRouteProp>();
  const {theme, roomId, gameState, initialStats} = route.params;
  const [score, setScore] = useState(gameState?.score || 0);
  const [hp, setHp] = useState(gameState?.hp || 10);
  const [script, setScript] = useState(gameState?.script || '');
  const [option1, setOption1] = useState<string>(gameState?.option1 || '');
  const [option2, setOption2] = useState<string>(gameState?.option2 || '');
  const [option3, setoption3] = useState<string>(gameState?.option3 || '');
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [isFirst, setIsFirst] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userStats, setUserStats] = useState<any>(initialStats);

  const navigation = useNavigation<GamePlayScreenNavigationProp>();

  const cur_score = score;
  const cur_hp = hp;

  const statTranslations: {[key: string]: string} = {
    attack: '공격력',
    defense: '방어력',
    health: '체력',
    speed: '이동속도',
    intelligence: '지식, 지혜',
    luck: '운',
    magic: '마법',
    dexterity: '민첩성',
    constitution: '체질',
    charisma: '카리스마',
    swordsmanship: '검술',
    riding: '승마',
    technology: '기술',
    hacking: '해킹',
    stealth: '은신',
    piloting: '조종',
    spaceshipPiloting: '우주선 조종',
    spaceshipEngineering: '우주선 공학',
    spaceshipCombat: '우주선 전투',
    spaceshipStealth: '우주선 은신',
    spaceshipNavigation: '우주선 항해',
    spaceshipRepair: '우주선 수리',
    invisibility: '투명화',
    possession: '빙의',
    fearResistance: '공포 저항',
  };

  useEffect(() => {
    const backAction = () => {
      console.log(API_URL);
      Alert.alert(
        '나가기',
        '정말로 게임을 나가시겠습니까?',
        [
          {
            text: '아니오',
            style: 'cancel',
          },
          {
            text: '예',
            onPress: async () => {
              try {
                const accessToken = await AsyncStorage.getItem('accessToken');
                if (!accessToken) {
                  throw new Error('No access token found');
                }
                navigation.navigate('GameHome', {shouldRefresh: true});
              } catch (error) {
                console.log(error);
                Alert.alert(
                  '오류',
                  '진행 상태를 저장하는 데 문제가 발생했습니다',
                );
              }
            },
          },
        ],
        {cancelable: false},
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [script, score, hp, selectedChoice]);

  useEffect(() => {
    if (!gameState && isFirst) {
      console.log(initialStats);
      setIsFirst(false);
      fetchInitialScript();
    }
  }, []);

  const fetchInitialScript = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      setLoading(true);
      const response = await axios.post(
        `${API_URL}:3000/generate/${roomId}`,
        {
          selectedOption: 'first start story!',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      console.log(response.data);

      setLoading(false);
      const {nextContent, option1, option2, option3, score, hp, changeOfStat} =
        response.data;

      setScript(nextContent);
      setOption1(option1);
      setOption2(option2);
      setoption3(option3);
      setScore(score);
      setHp(hp);

      if (changeOfStat) updateStats(changeOfStat);
    } catch (error) {
      setLoading(false);

      console.log(error);
      Alert.alert('오류', '서버와의 통신에 문제가 있습니다');
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const fetchScript = async (choice: string) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      setLoading(true);
      const response = await axios.post(
        `${API_URL}:3000/generate/${roomId}`,
        {selectedOption: choice},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setLoading(false);

      console.log(response.data);

      const {
        nextContent,
        option1,
        option2,
        option3,
        score,
        hp,
        changeOfStat,
        userStats,
      } = response.data;

      setScript(nextContent);
      setOption1(option1);
      setOption2(option2);
      setoption3(option3);
      setScore(cur_score + score); // score의 변화량만큼 더해준다
      setHp(cur_hp + hp); // hp의 변화량만큼 더해준다

      if (option1 == option2 && option2 == option3 && option3 == 'Go to main') {
        Alert.alert('게임 오버', '탈락하였습니다');
        navigation.navigate('GameHome', {shouldRefresh: true});
      }
    } catch (error) {
      setLoading(false);

      console.log(error);
      Alert.alert('오류', '서버와의 통신에 문제가 있습니다');
    }
  };

  const updateStats = (changeOfStat: any[]) => {
    const updatedStats = {...userStats};
    changeOfStat.forEach(({statName, changeValue}) => {
      if (updatedStats[statName] !== undefined) {
        updatedStats[statName] += changeValue;
      } else {
        updatedStats[statName] = changeValue;
      }
    });
    setUserStats(updatedStats);
  };

  const renderStats = () => {
    if (!userStats) return null;

    const {...stats} = userStats;
    const renderStatEntries = (statEntries: [string, number][]) =>
      statEntries.map(([stat, value]) => (
        <Text key={stat} style={styles.statText}>{`${
          statTranslations[stat] || stat
        }: ${value}`}</Text>
      ));

    switch (theme) {
      case 'medieval':
        return renderStatEntries(
          Object.entries(stats).filter(([stat]) =>
            [
              'attack',
              'defense',
              'health',
              'speed',
              'intelligence',
              'luck',
              'magic',
              'dexterity',
              'constitution',
              'charisma',
              'swordsmanship',
              'riding',
            ].includes(stat),
          ) as [string, number][],
        );
      case 'futuristic':
        return renderStatEntries(
          Object.entries(stats).filter(([stat]) =>
            [
              'attack',
              'defense',
              'health',
              'speed',
              'intelligence',
              'luck',
              'technology',
              'hacking',
              'stealth',
              'piloting',
            ].includes(stat),
          ) as [string, number][],
        );
      case 'ghost':
        return renderStatEntries(
          Object.entries(stats).filter(([stat]) =>
            [
              'attack',
              'defense',
              'health',
              'speed',
              'intelligence',
              'luck',
              'invisibility',
              'possession',
              'fearResistance',
            ].includes(stat),
          ) as [string, number][],
        );
      case 'space':
        return renderStatEntries(
          Object.entries(stats).filter(([stat]) =>
            [
              'attack',
              'defense',
              'health',
              'speed',
              'intelligence',
              'luck',
              'spaceshipPiloting',
              'spaceshipEngineering',
              'spaceshipCombat',
              'spaceshipStealth',
              'spaceshipNavigation',
              'spaceshipRepair',
            ].includes(stat),
          ) as [string, number][],
        );
      default:
        return renderStatEntries(Object.entries(stats) as [string, number][]);
    }
  };

  const handleChoiceSelect = (choice: string) => {
    setSelectedChoice(choice);
    fetchScript(choice);
  };

  return (
    <ImageBackground
      source={require('../../assets/Images/우주2.jpg')}
      style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.score}>Score: {score}</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Image
              source={require('../../assets/Images/person.png')}
              style={styles.userIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.scriptOuterContainer}>
          {loading ? (
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                width="100%"
                height={385}
                borderRadius={30}
                marginBottom={20}
              />
            </SkeletonPlaceholder>
          ) : (
            <ScrollView>
              <View style={styles.scriptContainer}>
                <Text style={styles.script}>{script}</Text>
              </View>
            </ScrollView>
          )}
        </View>
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceButton}
            onPress={() => handleChoiceSelect(option1)}
            disabled={loading}>
            <Text style={styles.choiceText}>{option1}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.choiceButton}
            onPress={() => handleChoiceSelect(option2)}
            disabled={loading}>
            <Text style={styles.choiceText}>{option2}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.choiceButton}
            onPress={() => handleChoiceSelect(option3)}
            disabled={loading}>
            <Text style={styles.choiceText}>{option3}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>캐릭터 정보</Text>
            <View style={styles.userInfoContainer}>{renderStats()}</View>
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  statText: {
    fontSize: 20,
    lineHeight: 25,
    fontFamily: 'neodgm',
    color: '#000',
  },
  scriptOuterContainer: {
    flex: 1,
    width: '100%',
    height: 200,
  },
  userInfoContainer: {
    borderRadius: 30,
    width: '95%',
    height: '70%',
    marginBottom: 20,
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    fontFamily: 'neodgm',
    fontSize: 20,
    lineHeight: 20,
    color: '#000',
  },
  userIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    height: '80%',
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    lineHeight: 24,
    fontFamily: 'neodgm',
    color: '#000',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    lineHeight: 18,
    fontFamily: 'neodgm',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'rgba(255, 140, 185, 1)',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'neodgm',
    lineHeight: 18,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  score: {
    fontFamily: 'neodgm',
    lineHeight: 30,
    fontSize: 30,
    color: '#fff',
    textShadowColor: 'rgba(255, 255, 255, 1)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 15,
    shadowColor: 'rgba(255, 122, 179, 1)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  hp: {
    fontFamily: 'neodgm',
    lineHeight: 30,
    fontSize: 30,
    color: '#fff',
  },
  scriptContainer: {
    flex: 1,
    width: '100%',
    height: 385,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'center',
  },
  script: {
    fontFamily: 'neodgm',
    lineHeight: 23,
    fontSize: 20,
    color: '#000',
  },
  choicesContainer: {
    width: '100%',
  },
  choiceButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 30,
    padding: 15,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  choiceText: {
    color: '#000',
    fontSize: 18,
    lineHeight: 18,
    fontFamily: 'neodgm',
  },
});

export default GamePlayScreen;
