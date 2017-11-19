import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
    position: relative;

    height: 100vh;
    width: 100%;

    display: flex;
    flex-direction: column;
    border: 1px solid #e6ecf0;
    box-shadow: 0 0 1px #063c5d 0 0 1px #063c5d 0 0 1px #063c5d 0 0 1px #063c5d;
`

export const Tombstone = styled.div`
    height: 3rem;
    width: 100%;
    background-color: red;
`

const circleAnimation = keyframes`
    0% {
        tranform: rotate(0deg);
    }
    100% {
        tranform: rotate(360deg);
    }
`

export const PageLoading = styled.span`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

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
