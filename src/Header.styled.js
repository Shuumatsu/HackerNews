import styled from 'styled-components'
import { toSvg } from 'feather-icons'
const backIcon = btoa(toSvg('arrow-left', { color: '#1DA1F2' }))

export const Header = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;

    width: 100%;
    height: calc(3rem + 1px);

    line-height: 2rem;

    background-color: white;

    display: flex;
    align-item: center;
    justify-content: center;

    border-bottom: 1px solid #e6ecf0;
    box-shadow: 0 0 1px #063c5d;
`

export const NavTabs = styled.nav`
    width: 100%;
    max-width: 960px;
    height: 100%;

    overflow: visible;
`

export const NavTab = styled.div`
    position: relative;
    margin: 0 .5rem;

    float: left;

    width: 4rem;
    height: 100%;

    font-size: 1rem;
    line-height: 3rem;
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;

    color: ${props => props.active ? '#1DA1F2' : '#66757f'};
    background-color: white;

    &:after {
        content: '';
        display: block;

        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);

        height: 4px;
        width: 100%;

        background-color: ${props => props.active ? '#1DA1F2' : 'white'};
    }

`

export const BackButton = styled.p`
    background-image: url("data:image/svg+xml;base64,${backIcon}");
    background-size: 100% 100%;

    float: left;

    height: 2rem;
    width: 2rem;
    line-height: 2rem;
    margin: .5rem;
`