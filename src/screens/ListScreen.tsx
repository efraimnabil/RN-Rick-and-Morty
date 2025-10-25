import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useGetCharactersQuery } from '@/services/rickAndMortyApi';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { CharacterCard } from '@/components/CharacterCard';
import { Character } from '@/types/api';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function ListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [page, setPage] = useState(1);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const { data, isLoading, isFetching } = useGetCharactersQuery(page);

  const hasNextPage = !!data?.info?.next;

  // Accumulate characters when new data arrives
  useEffect(() => {
    if (data?.results) {
      setAllCharacters((prev) => {
        const newCharacters = data.results;
        // Avoid duplicates by checking if characters already exist
        const existingIds = new Set(prev.map(c => c.id));
        const uniqueNewCharacters = newCharacters.filter(c => !existingIds.has(c.id));
        return [...prev, ...uniqueNewCharacters];
      });
    }
  }, [data]);

  const loadMore = () => {
    if (hasNextPage && !isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (isLoading && page === 1) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <FlatList<Character>
      data={allCharacters}
      renderItem={({ item }) => (
        <CharacterCard
          character={item}
          onPress={() => navigation.navigate('Details', { character: item })}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={loadMore}
      onEndReachedThreshold={0.7}
      ListFooterComponent={isFetching ? <ActivityIndicator /> : null}
    />
  );
}