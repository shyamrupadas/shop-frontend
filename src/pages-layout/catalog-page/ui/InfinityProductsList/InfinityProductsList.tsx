import {
  AutoSizer,
  InfiniteLoader,
  List,
  WindowScroller,
} from 'react-virtualized';
import React, { Fragment, useRef } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { Product } from 'shared/types';
import { useAppSelector } from 'store';
import { catalogModel } from 'entities/catalog';

const noRowsRenderer = () => (
  <Grid item>
    <Typography>No products found</Typography>
  </Grid>
);

type InfinityProductsListProps = {
  children: (item: Product, key: string) => React.ReactNode;
  rows: { [rowIndex: number]: Product[] };
  hasMore?: boolean;
  isFetching?: boolean;
  fetchItems?: Function;
  itemWidth?: number;
  itemHeight?: number;
  rowsCount: number;
};

const InfinityProductsList = ({
  isFetching,
  fetchItems = () => {},
  hasMore = false,
  itemWidth = 200,
  itemHeight = 410,
  rows = {},
  children,
  rowsCount,
}: InfinityProductsListProps) => {
  const infiniteLoaderRef = useRef<InfiniteLoader>(null);
  const catalog = useAppSelector(catalogModel.selectors.catalog);
  const page = catalog.page;
  const columnItemsNumber = catalog.columnItemsNumber;

  const loadMoreRows = async () => {
    if (!isFetching) {
      fetchItems();
    }
  };

  return (
    <AutoSizer disableHeight>
      {({ width: rowWidth }) => {
        return (
          <InfiniteLoader
            ref={infiniteLoaderRef}
            rowCount={rowsCount}
            isRowLoaded={({ index }) => {
              // TODO: !!!!!!!!!
              return index + columnItemsNumber < page * columnItemsNumber;
            }}
            loadMoreRows={loadMoreRows}
            threshold={1}
            minimumBatchSize={3}
          >
            {({ onRowsRendered, registerChild }) => (
              <WindowScroller>
                {({ height, scrollTop }) => (
                  <List
                    className={'InfinityProductsList'}
                    autoHeight
                    ref={registerChild}
                    height={height}
                    scrollTop={scrollTop}
                    width={rowWidth}
                    rowCount={rowsCount}
                    rowHeight={itemHeight}
                    onRowsRendered={onRowsRendered}
                    rowRenderer={({ index, style, key }) => {
                      console.log(index, rows[index]);
                      // тут периодически валят undefined, возможно отрегулировать?
                      // сейчас InfiniteLoader хочет загружать по 13 рядов вниз от верхнего
                      const productsInRow = rows[index] ? rows[index] : [];

                      return (
                        <Stack
                          direction="row"
                          justifyContent="center"
                          spacing={5}
                          style={style}
                          key={key}
                        >
                          {productsInRow.map((product, itemIndex) => (
                            <Fragment key={product._id}>
                              {children(product, key)}
                            </Fragment>
                          ))}
                        </Stack>
                      );
                    }}
                    noRowsRenderer={noRowsRenderer}
                  />
                )}
              </WindowScroller>
            )}
          </InfiniteLoader>
        );
      }}
    </AutoSizer>
  );
};

export default InfinityProductsList;
