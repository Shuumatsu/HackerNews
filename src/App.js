import 'normalize.css'
import './app.less'
import 'react-virtualized/styles.css'
import React, { PureComponent } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import Header from './components/Header'
import Container from './components/Container'
import LoadingIndicator from './components/LoadingIndicator'
import { autobind } from 'core-decorators'

@autobind
export default class extends PureComponent {

    state = { loading: false }

    loadingManager = status => this.setState({ loading: status })

    static childContextTypes = {
        loadingManager: PropTypes.func
    }

    getChildContext() {
        return { loadingManager: this.loadingManager }
    }

    render() {
        const loading = this.state.loading

        return (
            <BrowserRouter key='content'>
                <Route path='/:activeTab' render={({ match, location }) => {
                    const { activeTab } = match.params
                    return [
                        <Header key='header' activeTab={activeTab} />,
                        <Container key={activeTab} activeTab={activeTab} />,
                        <LoadingIndicator key='loading' loading={loading} />
                    ]
                }}>
                </Route>
            </BrowserRouter >
        )
    }
}

