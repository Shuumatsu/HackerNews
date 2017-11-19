import React, { PureComponent } from 'react'
import { fetchItem, fetchItems } from '../utils/firebase'
import PropTypes from 'prop-types'
import { Card, Tag } from 'antd'
import { Metas, ItemLink, } from './Item.styled'
import moment from 'moment'
import { itemCache as postCache, commentsCache } from '../utils/cache'
export default class extends PureComponent {

    static contextTypes = {
        loadingManager: PropTypes.func
    }

    get loadingManager() {
        return this.context.loadingManager
    }

    state = { post: null }

    async componentDidMount() {
        this.mounted = true

        const { id } = this.props
        if (postCache.has(id)) {
            const post = postCache.get(id)
            this.setState({ post })
            if (commentsCache.has(id)) {
                const comments = commentsCache.get(id)
                this.setState({ comments })
            }
            return
        }

        try {
            this.loadingManager(true)

            const post = await fetchItem(id)
            postCache.set(id, post)
            this.mounted && this.setState({ post })

            const comments = await fetchItems(post.kids || [])
            commentsCache.set(id, comments)
            this.mounted && this.setState({ comments })
        } catch (err) {
            alert(err)
        } finally {
            this.loadingManager(false)
        }
    }

    componentWillUnmount() {
        this.mounted = false
    }

    renderPost(key) {
        const { post } = this.state
        const { title, url, time, score, by, text } = post

        return (
            <Card
                key={key}
                title={title}
                style={{ marginBottom: '16px' }}>
                {url && <ItemLink href={url}>{url}</ItemLink>}
                <p >{text}</p>
                <Metas>
                    <Tag color='cyan'>{score} points</Tag>
                    <Tag color='cyan'>{`@${by}`}</Tag>
                    <Tag color='cyan'>{moment(time * 1000).calendar()}</Tag>
                </Metas>
            </Card>
        )
    }

    renderComments() {
        if (!this.state.comments)
            return (this.state.post.kids || []).map((commentId, index) =>
                <Card key={index} loading style={{ margin: '8px 16px' }} />
            )

        return this.state.comments.map((comment, index) => {
            return (
                <Card
                    style={{ marginBottom: '8px' }}
                    key={index}>
                    <p dangerouslySetInnerHTML={{ __html: comment.text }} />
                    <Metas>
                        <Tag color='cyan'>{`@${comment.by}`}</Tag>
                        <Tag color='cyan'>{moment(comment.time * 1000).calendar()}</Tag>
                    </Metas>
                </Card>
            )
        })
    }

    render() {
        if (!this.state.post)
            return (
                <Card loading style={{ marginBottom: '16px' }} />
            )

        return [
            this.renderPost(`/post/${this.state.id}`),
            this.renderComments()
        ]
    }
}