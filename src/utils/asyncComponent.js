import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const getComponent = dynamicImport => dynamicImport().then(resp => resp.default)

export default dynamicImport => class extends PureComponent {

    static contextTypes = {
        loadingManager: PropTypes.func
    }

    get loadingManager() {
        return this.context.loadingManager
    }

    state = {
        component: null
    }
    mouted = false

    async componentDidMount() {
        this.loadingManager(true)
        this.mouted = true
        try {
            const component = await getComponent(dynamicImport)
            this.mouted && this.setState({ component })
        } catch (err) {
            this.mouted && this.setState({ component: <h1>err</h1> })
        }
    }

    componentWillUnmount() {
        this.mouted = false
    }

    render() {
        if (!this.state.component)
            return null

        return <this.state.component {...this.props} />
    }
}
