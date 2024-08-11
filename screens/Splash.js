import { View, Text, StyleSheet, Image, Animated,TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showSplash, setShowSplash] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    // Start the fade animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    // Hide splash screen and navigate to Home after 5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
      
      navigation.navigate('Home');
        
    }, 5000);

    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Image 
          source={{ uri: 'https://tse3.mm.bing.net/th?id=OIP.6rVpI82N80mdle3E18Yb8wHaHa&pid=Api&P=0&h=180' }} // Replace with your logo image URL
          style={styles.logo}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', 
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  logoContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200, // Adjust the width as needed
    height: 100, // Adjust the height as needed
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default Splash;




