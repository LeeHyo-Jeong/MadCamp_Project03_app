import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

interface RegisterButtonProps {
  onPress: (event: GestureResponderEvent) => void;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>회원가입</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderRadius: 30,
    width: 360, // 버튼의 너비를 고정
    height: 50, // 버튼의 높이를 고정
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 20,
    fontFamily: 'neodgm',
    alignItems: 'center', // 수평 중앙
    justifyContent: 'center', // 수직 중앙
    textDecorationLine: 'underline',
  },
});

export default RegisterButton;
