import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

interface BlackButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: object;
}

const BlackButton: React.FC<BlackButtonProps> = ({title, onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: '#fff',
    borderWidth: 1.5,
    borderStyle: 'dotted',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 30,
    width: 350, // 버튼의 너비를 고정
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
    textShadowColor: 'rgba(255, 255, 255, 1)', // 네온 효과
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 15, // 네온 효과의 강도
    shadowColor: 'rgba(255, 122, 179, 1)', // 네온 효과
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 20, // 네온 효과의 강도
  },
});

export default BlackButton;
