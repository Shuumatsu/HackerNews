import styled, { keyframes } from 'styled-components'

const circleAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

export const indicator = styled.span`
    transition: opacity 0.225s;
    opacity: ${props => props.loading ? 1 : 0};

    position: fixed;
    bottom: 1rem;
    right: 1rem; 

    z-index: 2;

    width: 50px;
    height: 50px;

    vertical-align: middle;
    border-radius: 50px;
    border: 6px solid #e6ecf0;

    color: #1DA1F2;

    &:after {
        content: '';
        position: absolute;
        top: -6px;
        right: -6px;
        bottom: -6px;
        left: -6px;
        border-radius: 50px;
        border: 6px solid transparent;
        border-top-color: #1DA1F2;
        animation: ${circleAnimation} 1s linear infinite;
    }
`

export default indicator 