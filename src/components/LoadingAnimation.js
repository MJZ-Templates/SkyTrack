import React from 'react';
import styled from 'styled-components';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../assets/loading.json';

const LoadingAnimation = () => {
  return (
    <AnimationContainer>
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: '250px', width: '250px' }}
      />
    </AnimationContainer>
  );
};

const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export default LoadingAnimation;
