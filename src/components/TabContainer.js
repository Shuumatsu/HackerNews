import React, { PureComponent } from 'react'
import { List, InfiniteLoader, WindowScroller, AutoSizer } from 'react-virtualized'
import { autobind } from 'core-decorators'
import PropTypes from 'prop-types'
import { Container, Tombstone, PageLoading } from './TabContainer.styled'
import Item from './Item'
import { fetchAllIdsByType, fetchItems } from '../firebase'

@autobind
export default class extends PureComponent {

    static contextTypes = {
        loadingManager: PropTypes.func
    }

    get loadingManager() {
        return this.context.loadingManager
    }

    state = {
        allItemsIds: null,
        fetchAllItemsIdsStatus: 'pending',
        itemEntities: [],
    }

    async loadMoreRows({ startIndex, stopIndex }) {
        const allItemsIds = this.state.allItemsIds
        const idsInThisRange = allItemsIds.slice(startIndex, stopIndex)
        const entities = await fetchItems(idsInThisRange)
        this.mounted && this.setState(prev => ({
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
                <div key={key} style={{ ...style }} >
                    <Item item={entity} />
                </div>
            )

        return <Tombstone key={key} style={{ ...style }} />
    }

    async componentDidMount() {
        this.mounted = true
        const { activeTab } = this.props
        this.loadingManager(true)
        try {
            const allItemsIds = await fetchAllIdsByType(activeTab)
            this.mounted && this.setState({ allItemsIds })
        } catch (err) {
            console.log(err)
        } finally {
            this.loadingManager(false)
        }
    }

    componentWillUnmount() {
        this.mounted = false
    }

    render() {
        const { allItemsIds } = this.state
        const { isRowLoaded, loadMoreRows, rowRenderer } = this

        if (!allItemsIds)
            return null

        return (
            <Container>
                <InfiniteLoader
                    isRowLoaded={isRowLoaded}
                    loadMoreRows={loadMoreRows}
                    rowCount={allItemsIds.length}>
                    {({ onRowsRendered, registerChild }) => (
                        <WindowScroller>
                            {({ height, isScrolling, onChildScroll, scrollTop }) => (
                                <AutoSizer disableHeight>
                                    {({ width }) => (
                                        <List
                                            style={{ outline: 'none' }}
                                            ref={registerChild}
                                            autoHeight
                                            height={height}
                                            width={width}
                                            isScrolling={isScrolling}
                                            onScroll={onChildScroll}
                                            scrollTop={scrollTop}
                                            rowCount={allItemsIds.length}
                                            rowHeight={240}
                                            rowRenderer={rowRenderer}
                                            onRowsRendered={onRowsRendered}
                                        />
                                    )}
                                </AutoSizer>
                            )}
                        </WindowScroller>
                    )}
                </InfiniteLoader>
            </Container>
        )
    }
}
