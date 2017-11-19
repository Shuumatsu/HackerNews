import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { Header, NavTabs, NavTab } from './Header.styled'
import { autobind } from 'core-decorators'

const tabs = ['new', 'top', 'ask', 'show', 'best']

@withRouter
export default class extends PureComponent {

    @autobind
    changeActiveTab(tab) {
        const { activeTab, history } = this.props
        if (activeTab === tab)
            return

        history.push(`/${tab}`)
    }

    render() {
        const { activeTab } = this.props

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