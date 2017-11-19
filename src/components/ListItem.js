import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Metas, ItemLink, Extra, } from './Item.styled'
import { Card, Tag } from 'antd'

export default ({ item }) => {
    if (!item)
        return (
            <Card loading style={{ height: '150px', marginBottom: '16px' }} />
        )

    const { id, type, by, title, url, time, score, kids } = item
    let extra
    if (type === 'job')
        extra = (
            <Extra>job</Extra>
        )
    else
        extra = (
            <Extra >
                <Link to={`/item/${id}`}>
                    {`${(kids || []).length} comments`}
                </Link>
            </Extra>
        )

    return (
        <Card
            extra={extra}
            title={title}
            style={{ height: '150px', marginBottom: '16px' }}>
            {url && <ItemLink href={url}>{url}</ItemLink>}
            <Metas>
                <Tag color='cyan'>{score} points</Tag>
                <Tag color='cyan'>{`@${by}`}</Tag>
                <Tag color='cyan'>{moment(time * 1000).calendar()}</Tag>
            </Metas>
        </Card>
    )
}