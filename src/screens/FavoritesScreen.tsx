import React from 'react';
import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import styled, { DefaultTheme } from 'styled-components/native';
import { useGetCharactersQuery } from '@/services/rickAndMortyApi';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { CharacterCard } from '@/components/CharacterCard';
import { Character } from '@/types/api';
import { RootState } from '@/store/store';
import { AppText } from '@/components/AppText';
import { LinearGradient } from 'expo-linear-gradient';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function FavoritesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const favoriteIds = useSelector((state: RootState) => state.favorites.favoriteIds);
  const { data } = useGetCharactersQuery(1);
  
  // Filter characters to only show favorites
  const favoriteCharacters = (data?.results ?? []).filter((character: Character) =>
    favoriteIds.includes(character.id)
  );

  if (favoriteIds.length === 0) {
    return (
      <EmptyStateContainer>
        <GradientBackground
          colors={['#667eea', '#764ba2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <EmptyIconContainer>
            <EmptyIcon>💜</EmptyIcon>
          </EmptyIconContainer>
          <EmptyTitle>No Favorites Yet</EmptyTitle>
          <EmptyMessage>
            Start adding characters to your favorites by tapping the heart icon on any character card!
          </EmptyMessage>
        </GradientBackground>
      </EmptyStateContainer>
    );
  }

  return (
    <Container>
      <FlatList<Character>
        data={favoriteCharacters}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onPress={() => navigation.navigate('Details', { character: item })}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.background};
`;

const EmptyStateContainer = styled.View`
  flex: 1;
  margin: 16px;
  border-radius: 20px;
  overflow: hidden;
  shadow-color: #000;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.15;
  shadow-radius: 12px;
  elevation: 8;
`;

const GradientBackground = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const EmptyIconContainer = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: rgba(255, 255, 255, 0.2);
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

const EmptyIcon = styled.Text`
  font-size: 60px;
`;

const EmptyTitle = styled(AppText)`
  font-size: 28px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 12px;
  text-align: center;
  text-shadow-color: rgba(0, 0, 0, 0.3);
  text-shadow-offset: 0px 2px;
  text-shadow-radius: 4px;
`;

const EmptyMessage = styled(AppText)`
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  line-height: 24px;
`;
