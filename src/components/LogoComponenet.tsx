import React from 'react';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const LogoComponent = () => {
  return (
    <View style={styles.container}>
      <FastImage
        source={require('../assets/Images/logo.gif')}
        style={styles.logo}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: '100%',
    height: 100,
  },
});

export default LogoComponent;
