import React from 'react'
import styled, { keyframes } from 'styled-components'

const BALL_DIAMETER = '20px'
const BOUNCE_HEIGHT = 2
const SPREAD = 2

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6rem;
`
const Anchor = styled.div`
  height: ${BALL_DIAMETER};
  width: ${BALL_DIAMETER};
  background: transparent;
  position: relative;
`
const bounce = keyframes`
0%, 100% {
  transform: translateY(calc(${BALL_DIAMETER} * ${BOUNCE_HEIGHT}));
} 
50% {
  transform: translateY(calc(${BALL_DIAMETER} * -${BOUNCE_HEIGHT}));
}
`
const colorize = keyframes`
0%, 20% {
  background: #ddd;
}
10% {
  background: #c62828;
}
`
const Ball = styled.span`
  display: block;
  height: ${BALL_DIAMETER};
  width: ${BALL_DIAMETER};
  background: #ccc;
  border-radius: 50%;
  position: absolute;
  top: 0;
  transform-origin: center;
  &:nth-child(1) {
    left: calc(${BALL_DIAMETER} * -${SPREAD} * 2);
    animation: ${bounce} 0.8s ease-in-out -0.2s infinite,
      ${colorize} 0.8s ease-in-out -0.2s infinite;
  }
  &:nth-child(2) {
    left: calc(${BALL_DIAMETER} * -${SPREAD});
    animation: ${bounce} 0.8s ease-in-out -0.1s infinite,
      ${colorize} 0.8s ease-in-out -0.1s infinite;
  }
  &:nth-child(3) {
    animation: ${bounce} 0.8s ease-in-out 0s infinite,
      ${colorize} 0.8s ease-in-out 0s infinite;
  }
  &:nth-child(4) {
    left: calc(${BALL_DIAMETER} * ${SPREAD});
    animation: ${bounce} 0.8s ease-in-out 0.1s infinite,
      ${colorize} 0.8s ease-in-out 0.1s infinite;
  }
  &:nth-child(5) {
    left: calc(${BALL_DIAMETER} * ${SPREAD} * 2);
    animation: ${bounce} 0.8s ease-in-out 0.2s infinite,
      ${colorize} 0.8s ease-in-out 0.2s infinite;
  }
`

export default () => (
  <div className='container'>
    <Wrapper>
      <Anchor>
        <Ball />
        <Ball />
        <Ball />
        <Ball />
        <Ball />
      </Anchor>
    </Wrapper>
  </div>
)
