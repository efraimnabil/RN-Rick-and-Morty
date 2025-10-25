import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useGetCharactersQuery } from '@/services/rickAndMortyApi';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { CharacterCard } from '@/components/CharacterCard';
import { Character } from '@/types/api';

type ListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'List'>;

interface Props {
  navigation: ListScreenNavigationProp;
}

export default function ListScreen({ navigation }: Props) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useGetCharactersQuery(page);

  const characters = data?.results??[];
  const hasNextPage =!!data?.info?.next;

  const loadMore = () => {
    if (hasNextPage &&!isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (isLoading && page === 1) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <FlatList<Character>
      data={characters}
      renderItem={({ item }) => (
        <CharacterCard
          character={item}
          onPress={() => navigation.navigate('Details', { character: item })}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={loadMore}
      onEndReachedThreshold={0.7}
      ListFooterComponent={isFetching? <ActivityIndicator /> : null}
    />
  );
}