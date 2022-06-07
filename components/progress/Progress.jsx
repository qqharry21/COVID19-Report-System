/** @format */

import React from 'react';
import { useNProgress } from '@tanem/react-nprogress';
import { Bar, Container } from './';

const Progress = ({ isAnimating }) => {
  const { progress, animationDuration, isFinished } = useNProgress({ isAnimating });
  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
    </Container>
  );
};

export default Progress;
