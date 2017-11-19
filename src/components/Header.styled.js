import styled from 'styled-components'
import { toSvg } from 'feather-icons'
const menuIcon = btoa(toSvg('menu', { color: '#66757f' }))

export const Header = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;

    width: 100%;
    height: 3rem;

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

    overflow: hidden;
`

export const NavTab = styled.div`
    position: relative;
    margin: 0 .5rem;

    float: left;

    width: 4rem;
    height: 100%;

    line-height: 3rem;
    text-align: center;
    font-weight: bold;

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
