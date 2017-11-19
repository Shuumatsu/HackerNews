import React from 'react'
import styled, { keyframes } from 'styled-components'

const bounce = keyframes`
    0 {
        transform: translate(0,0);
    }
    50% {
        transform: translate(0,15px);
    }
    100% {
        transform: translate(0,0);
    }
`

const BouncingBall = styled.div`
    display: inline-block;
    width: 16px;
    height: 16px;

    border-radius: 16px;
    margin: 8px;

    background-color: #1DA1F2;

    animation: ${bounce} .6s ${props => props.delay}s linear infinite;
`

const Wrapper = styled.div`
    width: 100%;
    height: 100px;
    text-align: center;
    position
`

export default () => (
    <Wrapper>
        <BouncingBall delay={0.3} />
        <BouncingBall delay={0.2} />
        <BouncingBall delay={0.1} />
    </Wrapper>
)
