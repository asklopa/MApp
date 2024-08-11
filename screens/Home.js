import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList,ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation} from "@react-navigation/native";
import axios from 'axios';
import FooterMenu from "../components/Menus/FooterMenu";

const Home = () => {
  const [shows, setShows] = useState([]);
  const navigation = useNavigation();
  // const route = useRoute();

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => {
        setShows(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  // Render each show in the FlatList
  const renderShowItem = ({ item }) => {
    const { show } = item;
    return (
      
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate('Details', { show })}
        >
          <View style={styles.itemContainer}>
            {show.image && (
              <Image
                source={{ uri: show.image.medium }}
                style={styles.showImage} />
            )}
            <Text style={styles.showTitle}>{show.name}</Text>
            <Text style={styles.showSummary}>{show.summary ? show.summary.replace(/<\/?[^>]+(>|$)/g, "") : 'No summary available'}</Text>
          </View>
        </TouchableOpacity>
        
    );
  };

  return (
    <View style={styles.container}>
    <FlatList
      data={shows}
      renderItem={renderShowItem}
      keyExtractor={item => item.show.id.toString()}
    />
    <View style={{ justifyContent: "flex-end" }}>
      <FooterMenu />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
    marginTop: 40,
  },
  showImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  showTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  showSummary: {
    fontSize: 14,
    color: '#555',
  },
});

export default Home;

