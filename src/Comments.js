import React, { PureComponent } from 'react'
import { fetchItem, fetchItems } from './firebase'
import PropTypes from 'prop-types'
import { Card, Tag } from 'antd'
import { Metas, ItemLink, } from './Item.styled'
import { twitterLong } from './utils/formatDate'
import moment from 'moment'

const postCache = new Map()
const commentCache = new Map()

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
            return
        }

        try {
            this.loadingManager(true)
            const post = await fetchItem(id)
            postCache.set(id, post)
            this.mounted && this.setState({ post })
            const comments = await fetchItems(post.kids || [])
            console.log(post, comments)
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
                style={{ margin: '16px' }}>
                {url && <ItemLink href={url}>{url}</ItemLink>}
                <p >{text}</p>
                <Metas>
                    <Tag color='cyan'>{score} points</Tag>
                    <Tag color='cyan'>{`@${by}`}</Tag>
                    <Tag color='cyan'>{twitterLong(moment(time))}</Tag>
                </Metas>
            </Card>
        )
    }

    renderComments() {
        if (!this.state.comments)
            return this.state.post.kids.map((commentId, index) =>
                <Card key={index} loading style={{ margin: '8px 16px' }} />
            )

        return this.state.comments.map((comment, index) => {
            return (
                <Card
                    style={{ margin: '8px 16px' }}
                    title={`${comment.by} commented on ${twitterLong(moment(comment.time))}`}
                    key={index}>
                    <p dangerouslySetInnerHTML={{ __html: comment.text }} />
                </Card>
            )
        })
    }

    render() {
        if (!this.state.post)
            return (
                <Card loading style={{ margin: '16px' }} />
            )

        return [
            this.renderPost(`/post/${this.state.id}`),
            this.renderComments()
        ]
    }
}