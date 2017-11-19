import React, { PureComponent } from 'react'
import { Container, Main } from './Container.styled'
import TabContainer from './TabContainer'

export default class extends PureComponent {

    render() {
        const activeTab = this.props.activeTab

        return (
            <Container>
                <Main>
                    <TabContainer activeTab={activeTab} />
                </Main>
            </Container>
        )
    }
}