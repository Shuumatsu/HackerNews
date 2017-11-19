import 'normalize.css'
import './app.less'
import 'react-virtualized/styles.css'
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './components/Header'
import Container from './components/Container'

export default () => (
    <BrowserRouter key='content'>
        <Route path='/:activeTab' render={({ match, location }) => {
            const { activeTab } = match.params
            return [
                <Header key='header' activeTab={activeTab} />,
                <Container key={activeTab} activeTab={activeTab} />
            ]
        }}>
        </Route>
    </BrowserRouter >
)
