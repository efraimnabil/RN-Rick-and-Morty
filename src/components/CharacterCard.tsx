import React, { useState } from 'react';
import { LayoutChangeEvent, Pressable, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming, interpolate } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Character } from '@/types/api';
import { RootState } from '@/store/store';
import { toggleFavorite } from '@/store/slices/favoritesSlice';
import { AppText } from './AppText';

interface CharacterCardProps {
  character: Character;
  onPress: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onPress }) => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state: RootState) => state.favorites.favoriteIds);
  const isFavorite = favoriteIds.includes(character.id);

  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const animatedHeight = useSharedValue(0);
  const scale = useSharedValue(1);

  const onContentLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    if (height > 0 && contentHeight === 0) setContentHeight(height);
  };

  const handleToggleFavorite = () => {
    scale.value = withTiming(1.15, { duration: 100 }, () => {
      scale.value = withTiming(1, { duration: 100 });
    });
    dispatch(toggleFavorite(character.id));
  };

  const handleToggleQuickView = () => {
    const targetHeight = isExpanded ? 0 : contentHeight;
    animatedHeight.value = withTiming(targetHeight, { duration: 250 });
    setIsExpanded(!isExpanded);
  };

  const animatedStyle = useAnimatedStyle(() => ({ 
    height: animatedHeight.value,
    opacity: interpolate(
      animatedHeight.value, 
      [0, contentHeight * 0.5, contentHeight], 
      [0, 0.5, 1]
    ),
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Gradient colors based on character status
  const gradientColors = 
    character.status === 'Alive' 
      ? ['#667eea', '#764ba2'] 
      : character.status === 'Dead'
      ? ['#434343', '#000000']
      : ['#7F7FD5', '#86A8E7'];

  return (
    <CardContainer>
      <GradientBackground
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Pressable onPress={onPress}>
          <Header>
            <ImageContainer>
              <CardImage source={{ uri: character.image }} />
              <StatusIndicator status={character.status} />
            </ImageContainer>
            <InfoContainer>
              <Title numberOfLines={1}>{character.name}</Title>
              <SubtitleRow>
                <Badge variant="primary">
                  <BadgeText>{character.status}</BadgeText>
                </Badge>
                <Badge variant="secondary">
                  <BadgeText>{character.species}</BadgeText>
                </Badge>
              </SubtitleRow>
            </InfoContainer>
            <FavoriteButton onPress={handleToggleFavorite}>
              <Animated.View style={iconAnimatedStyle}>
                <Text style={{ fontSize: 22, color: isFavorite ? '#FF6B6B' : 'rgba(255, 255, 255, 0.7)' }}>
                  {isFavorite ? '♥' : '♡'}
                </Text>
              </Animated.View>
            </FavoriteButton>
          </Header>
        </Pressable>

        <QuickViewButton onPress={handleToggleQuickView}>
          <QuickViewButtonText>
            {isExpanded ? '▲ Hide Details' : '▼ Quick View'}
          </QuickViewButtonText>
        </QuickViewButton>

        <Animated.View style={animatedStyle}>
          <QuickViewContainer 
            onLayout={onContentLayout} 
            style={{ 
              position: contentHeight > 0 ? 'relative' : 'absolute', 
              opacity: contentHeight > 0 ? 1 : 0 
            }}
          >
            <DetailRow>
              <DetailLabel>Status:</DetailLabel>
              <DetailValue>{character.status}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Species:</DetailLabel>
              <DetailValue>{character.species}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Gender:</DetailLabel>
              <DetailValue>{character.gender}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Origin:</DetailLabel>
              <DetailValue numberOfLines={1}>{character.origin.name}</DetailValue>
            </DetailRow>
          </QuickViewContainer>
        </Animated.View>
      </GradientBackground>
    </CardContainer>
  );
};

const CardContainer = styled.View`
  margin: 12px 16px;
  border-radius: 20px;
  overflow: hidden;
  shadow-color: #000;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.15;
  shadow-radius: 12px;
  elevation: 8;
`;

const GradientBackground = styled(LinearGradient)`
  padding: 20px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const ImageContainer = styled.View`
  position: relative;
  margin-right: 16px;
`;

const CardImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  border-width: 3px;
  border-color: rgba(255, 255, 255, 0.3);
`;

const StatusIndicator = styled.View<{ status: string }>`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  border-width: 2px;
  border-color: #fff;
  background-color: ${({ status }: { status: string }) => 
    status === 'Alive' ? '#4CAF50' : 
    status === 'Dead' ? '#F44336' : '#9E9E9E'};
`;

const InfoContainer = styled.View`
  flex: 1;
`;

const Title = styled(AppText)`
  font-size: 20px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 4px;
  text-shadow-color: rgba(0, 0, 0, 0.3);
  text-shadow-offset: 0px 1px;
  text-shadow-radius: 3px;
`;

const SubtitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Badge = styled.View<{ variant?: 'primary' | 'secondary' }>`
  background-color: ${({ variant }: { variant?: 'primary' | 'secondary' }) => 
    variant === 'primary' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.15)'};
  padding: 4px 10px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

const BadgeText = styled(AppText)`
  font-size: 12px;
  font-weight: 600;
  color: #FFFFFF;
`;

const FavoriteButton = styled(Pressable)`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: rgba(255, 255, 255, 0.2);
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
`;

const FavoriteIcon = styled.Text`
  font-size: 22px;
`;

const QuickViewButton = styled(Pressable)`
  margin-top: 12px;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  align-items: center;
  backdrop-filter: blur(10px);
`;

const QuickViewButtonText = styled(AppText)`
  font-size: 14px;
  font-weight: 600;
  color: #FFFFFF;
`;

const QuickViewContainer = styled.View`
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-top: 12px;
  gap: 10px;
  backdrop-filter: blur(10px);
`;

const DetailRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DetailLabel = styled(AppText)`
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-right: 8px;
`;

const DetailValue = styled(AppText)`
  font-size: 14px;
  color: #FFFFFF;
  font-weight: 500;
`;
