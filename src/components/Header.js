import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { Header, NavTabs, NavTab, BackButton } from './Header.styled'
import { autobind } from 'core-decorators'

const tabs = ['new', 'top', 'ask', 'show', 'best', 'job']

@withRouter
@autobind
export default class extends PureComponent {

    changeActiveTab(tab) {
        const { activeTab, history } = this.props
        if (activeTab === tab)
            return

        history.push(`/${tab}`)
    }

    navBack() {
        const { history } = this.props

        if (history.length > 2) {
            history.goBack()
            return
        }

        history.push('/')
    }

    render() {
        const { activeTab, back } = this.props
        if (back)
            return (
                <Header>
                    <NavTabs>
                        <BackButton onClick={() => this.navBack()} />
                        <NavTab>Back</NavTab>
                    </NavTabs>
                </Header >
            )

        return (
            <Header>
                <NavTabs>
                    {tabs.map(tab => (
                        <NavTab
                            key={tab}
                            onClick={() => this.changeActiveTab(tab)}
                            active={tab === activeTab}>
                            {tab}
                        </NavTab>
                    ))}
                </NavTabs>
            </Header>
        )
    }
}