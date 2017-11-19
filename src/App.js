import 'normalize.css'
import './app.less'
import 'react-virtualized/styles.css'
import React, { PureComponent } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Header from './components/Header'
import ContentAreaWrapper from './components/ContentAreaWrapper'
import LoadingIndicator from './components/LoadingIndicator'
import { autobind } from 'core-decorators'
// import Comments from './components/Comments'
// import List from './components/List'
import asyncComponent from './utils/asyncComponent'

const Comments = asyncComponent(() => import('./components/Comments'))
const List = asyncComponent(() => import('./components/List'))

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
            <BrowserRouter key='content' basename={process.env.PUBLIC_URL}>
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
                    <Redirect to='/new' />
                </Switch>
            </BrowserRouter >,
            <LoadingIndicator key='loading' loading={loading} />
        ]
    }
}

