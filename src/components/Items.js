import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import Header from '../components/Header'
import { Container } from './Container.styled'
import { isEmpty } from 'ramda'
import { fetchPagination } from '../service/firebase'
import Contents from '../components/Contents'

@withRouter
export default class extends PureComponent {

    state = { ids: [] }

    componentDidMount() {
        const { activeTab } = this.props
        fetchPagination(activeTab).then(pagination => {
            this.setState({ ids: pagination })
        })
    }

    render() {
        const { activeTab } = this.props
        const { ids } = this.state

        return (
            <Container>
            </Container>
        )
    }
}
