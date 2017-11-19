import React, { PureComponent } from 'react'
import { List, InfiniteLoader, WindowScroller } from 'react-virtualized'
import { autobind } from 'core-decorators'
import { Container, Item, Tombstone } from './TabContainer.styled'
import { fetchAllIdsByType, fetchItems } from '../firebase'

@autobind
export default class extends PureComponent {

    state = {
        allItemsIds: [],
        fetchAllItemsIdsStatus: 'pending',
        itemEntities: [],
    }

    async loadMoreRows({ startIndex, stopIndex }) {
        const allItemsIds = this.state.allItemsIds
        const idsInThisRange = allItemsIds.slice(startIndex, stopIndex)
        const entities = await fetchItems(idsInThisRange)
        this.setState(prev => ({
            itemEntities: [...prev.itemEntities, ...entities]
        }))
    }

    isRowLoaded({ index }) {
        return !!this.state.itemEntities[index]
    }

    rowRenderer({ index, key, style }) {
        const { itemEntities } = this.state

        const entity = itemEntities[index]

        if (entity)
            return (
                <Item key={key} style={{ ...style }}>
                    {JSON.stringify(entity).slice(0, 140)}
                </Item>
            )

        return <Tombstone key={key} style={{ ...style }} />
    }

    async componentDidMount() {
        const { activeTab } = this.props
        try {
            this.setState({ fetchAllItemsIdsStatus: 'pending' })
            const allItemsIds = await fetchAllIdsByType(activeTab)
            this.setState({ allItemsIds, fetchAllItemsIdsStatus: 'done' })
        } catch (err) {
            this.setState({ fetchAllItemsIdsStatus: 'failed' })
            console.log(err)
        }
    }

    render() {
        const activeTab = this.props.activeTab
        const { allItemsIds, fetchAllItemsIdsStatus } = this.state
        const { isRowLoaded, loadMoreRows, rowRenderer } = this

        if (fetchAllItemsIdsStatus !== 'done')
            return <div>Loading...</div>

        return (
            <Container>
                <InfiniteLoader
                    isRowLoaded={isRowLoaded}
                    loadMoreRows={loadMoreRows}
                    rowCount={allItemsIds.length}>
                    {({ onRowsRendered, registerChild }) => (
                        <WindowScroller>
                            {({ height, width, isScrolling, onChildScroll, scrollTop }) => (
                                <List
                                    style={{ outline: 'none' }}
                                    ref={registerChild}
                                    height={height}
                                    width={960}
                                    rowCount={allItemsIds.length}
                                    onScroll={onChildScroll}
                                    scrollTop={scrollTop}
                                    rowHeight={400}
                                    rowRenderer={rowRenderer}
                                    onRowsRendered={onRowsRendered}
                                />
                            )}
                        </WindowScroller>
                    )}
                </InfiniteLoader>
            </Container>
        )
    }
}
