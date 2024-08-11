import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import FooterMenu from "../components/Menus/FooterMenu";

const Details = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
        setMovies(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.movieContainer}>
      <Image source={{ uri: item.show.image?.medium }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.show.name}</Text>
        <Text style={styles.summary}>{item.show.summary ? item.show.summary.replace(/<[^>]+>/g, '') : 'No summary available'}</Text>
        <Text style={styles.info}>Language: {item.show.language}</Text>
        <Text style={styles.info}>Genres: {item.show.genres.join(', ')}</Text>
        <Text style={styles.info}>Premiered: {item.show.premiered}</Text>
        <Text style={styles.info}>Rating: {item.show.rating.average || 'N/A'}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <FlatList
      data={movies}
      renderItem={renderItem}
      keyExtractor={(item) => item.show.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
    <View style={{ justifyContent: "flex-end" }}>
      <FooterMenu />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
    marginTop: 40,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  summary: {
    fontSize: 14,
    marginBottom: 5,
  },
  info: {
    fontSize: 12,
    color: '#555',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
});

export default Details;

