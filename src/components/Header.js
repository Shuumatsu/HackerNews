import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'

@withRouter
export default class extends PureComponent {

    render() {
        return (
            <header>header</header>
        )
    }
}