import React from 'react';
import { ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { AppText } from '@/components/AppText';
import { DefaultTheme } from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  padding: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.md}px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.background};
`;
const CharacterImage = styled.Image`
  width: 100%;
  height: 300px;
  border-radius: ${({ theme }: { theme: DefaultTheme }) => theme.radii.md}px;
  margin-bottom: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.md}px;
`;
const Title = styled(AppText)`
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fontSizes.detail_header}px;
  font-weight: ${({ theme }: { theme: DefaultTheme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.sm}px;
`;
const DetailRow = styled(AppText)`
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fontSizes.body}px;
  margin-bottom: ${({ theme }: { theme: DefaultTheme }) => theme.spacing.sm}px;
`;

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;  
type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

interface Props {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
}

export default function DetailsScreen({ route }: Props) {
  const { character } = route.params;

  return (
    <ScrollView>
      <Container>
        <CharacterImage source={{ uri: character.image }} />
        <Title>{character.name}</Title>
        <DetailRow>Status: {character.status}</DetailRow>
        <DetailRow>Species: {character.species}</DetailRow>
        <DetailRow>Gender: {character.gender}</DetailRow>
        <DetailRow>Origin: {character.origin.name}</DetailRow>
        <DetailRow>Last Known Location: {character.location.name}</DetailRow>
      </Container>
    </ScrollView>
  );
}