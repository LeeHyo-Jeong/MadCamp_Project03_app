import {createStackNavigator} from '@react-navigation/stack';
import {statsByTopic} from './TopicTypes';

// 공통 타입을 관리하는 모듈
export type RootStackParamList = {
  // StackNavigation 관리하는 화면들
  Home: undefined;
  Login: undefined;
  Register: undefined;
  GameHome: {shouldRefresh?: boolean};
  GameTopicSelection: undefined;
  SelectInitialStats: {topic: keyof typeof statsByTopic; roomTitle: string};
  GameTitle: {topic: keyof typeof statsByTopic; keywords: string[]};

  SelectMedievalKeyword: {topic: keyof typeof statsByTopic};
  SelectFutureKeyword: {topic: keyof typeof statsByTopic};
  SelectHorrorKeyword: {topic: keyof typeof statsByTopic};
  SelectSpaceKeyword: {topic: keyof typeof statsByTopic};

  SelectInitialStatsMedieval: {
    topic: keyof typeof statsByTopic;
    keywords: string[];
    roomTitle: string;
  };
  SelectInitialStatsFuture: {
    topic: keyof typeof statsByTopic;
    keywords: string[];
    roomTitle: string;
  };
  SelectInitialStatsHorror: {
    topic: keyof typeof statsByTopic;
    keywords: string[];
    roomTitle: string;
  };
  SelectInitialStatsSpace: {
    topic: keyof typeof statsByTopic;
    keywords: string[];
    roomTitle: string;
  };

  GamePlay: {initialStats?: string[], theme: string; roomId: string; gameState?: GameState};
  //NextScreen: { stats: { [key: string]: number } };
};

const Stack = createStackNavigator<RootStackParamList>();

const stats = ['공격력', '방어력', '이동속도', '지혜', '운'];

export type Stats = {[key in (typeof stats)[number]]: number};

export interface GameState {
  script: string;
  score: number;
  hp: number;
  option1: string;
  option2: string;
  option3: string;
}

export interface Room {
  id: string;
  room: string; // 방 이름
  userId: string;
  score?: number;
  gameState?: GameState;

  //userId: string; // 방 생성 유저 ID
  //settings: GameSettings,
  //userStats: UserStats,
}
