import React from 'react';
import {View, TextInput, StyleSheet, Platform} from 'react-native';

interface InputFieldProps {
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  secureTextEntry,
  onChangeText,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#fff"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: 360,
    //height: 80,
    marginVertical: 10,
    backgroundColor: '#transparent',
    fontSize: 30,
    lineHeight: 30,
  },
  input: {
    borderColor: '#fff',
    borderWidth: 2.5,
    borderRadius: 30,
    backgroundColor: 'transparent',
    fontFamily: 'neodgm',
    fontSize: 30,
    lineHeight: 30,
    color: '#fff',
    height: 100,
    paddingLeft: 20, // Increased padding for better placeholder visibility
    textAlignVertical: 'center',
    paddingVertical: 30,
    textAlign: 'left',
  },
});

export default InputField;
