import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {GameState, Room, RootStackParamList} from '../../types/NavigationTypes';
import {API_URL} from '@env';

type GameHomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GameHome'
>;

const GameHomePage = () => {
  const [loading, setLoading] = useState(true);
  const [highScore, setHighScore] = useState<number>(0);
  const [myRooms, setMyRooms] = useState<Room[]>([]);
  const navigation = useNavigation<GameHomeScreenNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'GameHome'>>();

  const fetchGameState = async (
    accessToken: string,
    roomId: string,
  ): Promise<GameState> => {
    const response = await axios.get(`${API_URL}/s-rooms/${roomId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  };

  const fetchData = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const response = await axios.get(`${API_URL}:3000/s-rooms/user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log(response.data);

        const myRooms: Room[] = response.data;

        // 58번~64번째줄에서 문제생김 지피티확인~
        setMyRooms(myRooms);

        // 최고 점수 계산
        const maxScore = myRooms.reduce((max: number, room: Room) => {
          const roomScore = room.score ?? 0;
          return roomScore > max ? roomScore : max;
        }, 0);
        setHighScore(maxScore);
      } catch (error) {
        console.error('Error fetching rooms: ', error);
      }
    }
  };

  const handleGameClick = async (roomId: string) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const gameState = await fetchGameState(accessToken, roomId);
        navigation.navigate('GamePlay', {
          roomId: roomId,
          gameState: gameState,
          theme: 'futuristic',
        });
      } catch (error) {
        console.error('Error fetching game state: ', error);
      }
    }
  };

  const deleteRoom = async (roomId: string) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      try {
        await axios.delete(`${API_URL}:3000/s-rooms/${roomId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        fetchData();
      } catch (error) {
        console.error('Error deleting room: ', error);
        Alert.alert('Error', 'Failed to delete room');
      }
    }
  };

  const handleLongPress = (roomId: string) => {
    Alert.alert(
      '게임 삭제',
      '정말로 게임을 삭제하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => deleteRoom(roomId),
        },
      ],
      {cancelable: true},
    );
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [route?.params?.shouldRefresh]),
  );

  return (
    <ImageBackground
      source={require('../../assets/Images/space.jpg')}
      style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>최고 기록</Text>
              <Text style={styles.scoreText}>{highScore}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.newGameCard}
            onPress={() => navigation.navigate('GameTopicSelection')}>
            <Text style={styles.newGameCardText}>새로운 게임</Text>
            <Text style={styles.newGameCardText}>생성</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.section, styles.myGamesSection]}>
          <Text style={styles.sectionTitle}>나의 게임</Text>
          {myRooms.map((room, index) => (
            <TouchableOpacity
              onLongPress={() => handleLongPress(room.id)}
              key={index}
              style={styles.gameCard}
              onPress={() =>
                navigation.navigate('GamePlay', {
                  theme: 'futuristic',
                  roomId: room.id,
                  gameState: room.gameState,
                })
              }>
              <Text style={styles.gameTitle}>{room.room}</Text>
              {room.score !== undefined && (
                <Text style={styles.gameScore}>스코어 {room.score}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    width: '100%',
    marginBottom: 10, // 간격 조정
    justifyContent: 'center',
    alignItems: 'center',
  },
  myGamesSection: {
    marginTop: 0, // "나의 게임"과 목록 간의 간격 줄이기
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10, // 간격 조정
    height: 350,
    width: 350,
  },
  cardContent: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    textAlign: 'center',
    fontSize: 32,
    color: '#000',
    fontFamily: 'neodgm',
    marginBottom: 0,
    lineHeight: 40,
  },
  newGameCardText: {
    textAlign: 'center',
    fontSize: 32,
    color: '#fff',
    fontFamily: 'neodgm',
    marginBottom: 0,
    lineHeight: 40,
    textShadowColor: 'rgba(255, 122, 179, 1)', // 네온 효과
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 15, // 네온 효과의 강도
    shadowColor: 'rgba(255, 122, 179, 1)', // 네온 효과
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 20, // 네온 효과의 강도
  },
  scoreText: {
    textAlign: 'center',
    fontSize: 40,
    color: 'rgba(255, 140, 185, 1)',
    fontFamily: 'neodgm',
    marginTop: 0,
    lineHeight: 40,
    textShadowColor: 'rgba(255, 255, 255, 1)', // 네온 효과
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 15, // 네온 효과의 강도
    shadowColor: 'rgba(255, 122, 179, 1)', // 네온 효과
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 20, // 네온 효과의 강도
  },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 32,
    lineHeight: 32,
    color: '#fff',
    fontFamily: 'neodgm',
  },
  gameCard: {
    justifyContent: 'space-between',
    alignItems: 'center', // 텍스트 정렬
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 30,
    padding: 10,
    marginBottom: 10, // 간격 조정
    width: 350,
    height: 60,
    flexDirection: 'row',
  },
  gameTitle: {
    fontSize: 28,
    lineHeight: 28,
    color: '#000',
    fontFamily: 'neodgm',
  },
  gameScore: {
    lineHeight: 28,
    fontSize: 28,
    color: '#000',
    fontFamily: 'neodgm',
  },
  newGameCard: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 140, 185, 0.68)',
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
    width: 350,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000',
    //borderStyle: 'dotted',
  },
});

export default GameHomePage;
