import styled from 'styled-components'

export const Container = styled.div`
    position: relative;

    height: 100vh;
    width: 100%;

    display: flex;
    flex-direction: column;
    border: 1px solid #e6ecf0;
    box-shadow: 0 0 1px #063c5d 0 0 1px #063c5d 0 0 1px #063c5d 0 0 1px #063c5d;
`

export const Tombstone = styled.li`
    height: 3rem;
    width: 100%;
    background-color: red;
`

export const Item = styled.li`
    height: 3rem;
    width: 100%;
    background-color: white;
    border-bottom: 1px solid #e6ecf0;
`
