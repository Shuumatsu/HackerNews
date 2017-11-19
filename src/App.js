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
            const page = new URLSearchParams(location.search).get('page') || 1
            return [
                <Header key='header' />,
                <Container key={activeTab} activeTab={activeTab} page={page} />
            ]
        }}>
        </Route>
    </BrowserRouter >
)
