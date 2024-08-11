import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import FooterMenu from "../components/Menus/FooterMenu";

const Search = () => {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term
  const navigation = useNavigation();

  const fetchShows = (query) => {
    axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then(response => {
        setShows(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  };

  const handleSearch = () => {
    fetchShows(searchTerm);
  };

  useEffect(() => {
    fetchShows('all'); // Default search term to load some initial data
  }, []);

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
              style={styles.showImage}
            />
          )}
          <Text style={styles.showTitle}>{show.name}</Text>
          <Text style={styles.showSummary}>{show.summary ? show.summary.replace(/<\/?[^>]+(>|$)/g, "") : 'No summary available'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a show..."
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
      />
      <Button title="Search" onPress={handleSearch} />

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
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
    marginTop: 40,
  },
  showSummary: {
    fontSize: 14,
    color: '#555',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default Search;

