import 'normalize.css'
import './app.less'
import 'react-virtualized/styles.css'
import React, { PureComponent } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import Header from './Header'
import List from './List'
import Comments from './Comments'
import ContentAreaWrapper from './ContentAreaWrapper'
import LoadingIndicator from './LoadingIndicator'
import { autobind } from 'core-decorators'

@autobind
export default class extends PureComponent {

    state = { loading: false, entities: {} }

    loadingManager = status => this.setState({ loading: status })

    static childContextTypes = {
        loadingManager: PropTypes.func
    }

    getChildContext() {
        return { loadingManager: this.loadingManager }
    }

    render() {
        const loading = this.state.loading

        return [
            <BrowserRouter key='content'>
                <Switch>
                    <Route path='/item/:id' render={({ match, location }) => {
                        const { id } = match.params
                        return [
                            <Header key='header' back={true} />,
                            <ContentAreaWrapper key={`/item/${id}`}>
                                <Comments id={id} />
                            </ContentAreaWrapper>
                        ]
                    }} />
                    <Route path='/:activeTab' render={({ match, location }) => {
                        const { activeTab } = match.params
                        return [
                            <Header key='header' activeTab={activeTab} />,
                            <ContentAreaWrapper key={activeTab}>
                                <List key={activeTab} activeTab={activeTab} />
                            </ContentAreaWrapper>
                        ]
                    }}>
                    </Route>
                </Switch>
            </BrowserRouter >,
            <LoadingIndicator key='loading' loading={loading} />
        ]
    }
}

