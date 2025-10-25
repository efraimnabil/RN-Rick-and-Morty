import React from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { AppText } from '@/components/AppText';
import { DefaultTheme } from 'styled-components/native';

const { width } = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.background};
`;

const ImageContainer = styled.View`
  position: relative;
  width: 100%;
  height: 400px;
`;

const CharacterImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const ImageOverlay = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 150px;
  justify-content: flex-end;
  padding: 24px;
`;

const StatusBadgeContainer = styled.View`
  position: absolute;
  top: 20px;
  right: 20px;
  flex-direction: row;
  gap: 8px;
`;

const StatusBadge = styled.View<{ status: string }>`
  background-color: ${({ status }: { status: string }) => 
    status === 'Alive' ? 'rgba(76, 175, 80, 0.9)' : 
    status === 'Dead' ? 'rgba(244, 67, 54, 0.9)' : 'rgba(158, 158, 158, 0.9)'};
  padding: 8px 16px;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const StatusDot = styled.View<{ status: string }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #FFFFFF;
  margin-right: 6px;
`;

const StatusText = styled(AppText)`
  font-size: 14px;
  font-weight: 600;
  color: #FFFFFF;
`;

const NameTitle = styled(AppText)`
  font-size: 32px;
  font-weight: 700;
  color: #FFFFFF;
  text-shadow-color: rgba(0, 0, 0, 0.5);
  text-shadow-offset: 0px 2px;
  text-shadow-radius: 4px;
`;

const ContentContainer = styled.View`
  padding: 24px;
`;

const SectionCard = styled(LinearGradient)`
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 16px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 8px;
  elevation: 6;
`;

const SectionTitle = styled(AppText)`
  font-size: 18px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 16px;
  text-shadow-color: rgba(0, 0, 0, 0.2);
  text-shadow-offset: 0px 1px;
  text-shadow-radius: 2px;
`;

const DetailRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 12px;
  border-radius: 12px;
`;

const DetailIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const DetailIconText = styled.Text`
  font-size: 20px;
`;

const DetailContent = styled.View`
  flex: 1;
`;

const DetailLabel = styled(AppText)`
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2px;
`;

const DetailValue = styled(AppText)`
  font-size: 16px;
  font-weight: 500;
  color: #FFFFFF;
`;

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;  
type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

interface Props {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
}

export default function DetailsScreen({ route }: Props) {
  const { character } = route.params;

  // Gradient colors based on character status
  const gradientColors = 
    character.status === 'Alive' 
      ? ['#667eea', '#764ba2'] 
      : character.status === 'Dead'
      ? ['#434343', '#000000']
      : ['#7F7FD5', '#86A8E7'];

  return (
    <ScrollView>
      <Container>
        <ImageContainer>
          <CharacterImage source={{ uri: character.image }} />
          <ImageOverlay
            colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <NameTitle>{character.name}</NameTitle>
          </ImageOverlay>
          <StatusBadgeContainer>
            <StatusBadge status={character.status}>
              <StatusDot status={character.status} />
              <StatusText>{character.status}</StatusText>
            </StatusBadge>
          </StatusBadgeContainer>
        </ImageContainer>

        <ContentContainer>
          <SectionCard
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <SectionTitle>Basic Information</SectionTitle>
            <DetailRow>
              <DetailIcon>
                <DetailIconText>🧬</DetailIconText>
              </DetailIcon>
              <DetailContent>
                <DetailLabel>Species</DetailLabel>
                <DetailValue>{character.species}</DetailValue>
              </DetailContent>
            </DetailRow>
            <DetailRow>
              <DetailIcon>
                <DetailIconText>{character.gender === 'Male' ? '👨' : character.gender === 'Female' ? '👩' : '⚧'}</DetailIconText>
              </DetailIcon>
              <DetailContent>
                <DetailLabel>Gender</DetailLabel>
                <DetailValue>{character.gender}</DetailValue>
              </DetailContent>
            </DetailRow>
          </SectionCard>

          <SectionCard
            colors={['#11998e', '#38ef7d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <SectionTitle>Location Details</SectionTitle>
            <DetailRow>
              <DetailIcon>
                <DetailIconText>🏠</DetailIconText>
              </DetailIcon>
              <DetailContent>
                <DetailLabel>Origin</DetailLabel>
                <DetailValue>{character.origin.name}</DetailValue>
              </DetailContent>
            </DetailRow>
            <DetailRow>
              <DetailIcon>
                <DetailIconText>📍</DetailIconText>
              </DetailIcon>
              <DetailContent>
                <DetailLabel>Last Known Location</DetailLabel>
                <DetailValue>{character.location.name}</DetailValue>
              </DetailContent>
            </DetailRow>
          </SectionCard>
        </ContentContainer>
      </Container>
    </ScrollView>
  );
}