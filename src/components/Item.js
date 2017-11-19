import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { twitterLong } from '../utils/formatDate'
import { ItemAuthor, ItemTitle, Item, ItemLink, ItemCommentsLink, ItemTime } from './Item.styled'

export default ({ item }) => {
    const { id, type, by, title, url, time, comments, kids } = item

    return (
        <Item>
            <ItemTitle>
                <a href={url}>{title}</a>
            </ItemTitle>
            <ItemAuthor key='author'>
                {`@${by}`}
            </ItemAuthor>
            <ItemTime key='time'>
                {twitterLong(moment(time))}
            </ItemTime>
            {type !== 'job' ?
                (
                    <ItemCommentsLink key='comments'>
                        <Link to={`/item/${id}`}>
                            {`${(kids || []).length} comments`}
                        </Link>
                    </ItemCommentsLink>
                ) : (
                    <ItemCommentsLink key='comments'>
                        {type}
                    </ItemCommentsLink>
                )}
        </Item>
    )
}