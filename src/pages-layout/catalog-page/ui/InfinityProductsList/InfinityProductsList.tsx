import {
  AutoSizer,
  InfiniteLoader,
  List,
  WindowScroller,
} from 'react-virtualized';
import React, { Fragment, useCallback } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { Product } from 'shared/types';
import { useAppSelector } from 'store';
import { catalogModel } from 'entities/catalog';
import { isBrowser, isServer } from 'shared/lib';
import { ListRowRenderer } from 'react-virtualized/dist/es/List';

type InfinityProductsListProps = {
  children: (item: Product, key: string) => React.ReactNode;
  rows: { [rowIndex: number]: Product[] };
  hasMore?: boolean;
  isFetching?: boolean;
  fetchItems?: Function;
  itemWidth: number;
  itemHeight: number;
  rowsCount: number;
  ssrListWidth: number;
  ssrListHeight: number;
  ssrRowsCount: number;
};

type IsRowLoadedArgs = {
  index: number;
};

const noRowsRenderer = () => (
  <Grid item>
    <Typography>No products found</Typography>
  </Grid>
);

const InfinityProductsList = ({
  isFetching,
  fetchItems = () => {},
  hasMore = false,
  itemWidth,
  itemHeight,
  rows = {},
  children,
  rowsCount,
  ssrListWidth,
  ssrRowsCount,
  ssrListHeight,
}: InfinityProductsListProps) => {
  const catalog = useAppSelector(catalogModel.selectors.catalog);
  const page = catalog.page;
  // TODO: В сторе не обновляется кол-во элементов в строке
  const columnItemsNumber = catalog.columnItemsNumber;

  const loadMoreRows = useCallback(async () => {
    if (!isFetching) {
      fetchItems();
    }
  }, [isFetching, fetchItems]);

  const isRowLoaded = useCallback(
    ({ index }: IsRowLoadedArgs) => rows.hasOwnProperty(index),
    [rows],
  );

  const rowRenderer: ListRowRenderer = useCallback(
    ({ index, style, key }) => {
      // TODO: тут периодически валят undefined, возможно отрегулировать?
      //  сейчас InfiniteLoader хочет загружать по 13 рядов вниз от верхнего
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
            <Fragment key={product._id}>{children(product, key)}</Fragment>
          ))}
        </Stack>
      );
    },
    [rows, children],
  );

  return (
    <AutoSizer disableHeight>
      {({ width: rowWidth }) => {
        return (
          <InfiniteLoader
            rowCount={rowsCount}
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            threshold={4}
            minimumBatchSize={4}
          >
            {({ onRowsRendered, registerChild }) => (
              <WindowScroller ref={registerChild}>
                {({ height, scrollTop, registerChild }) => (
                  <Box
                    ref={() => {
                      if (isBrowser) {
                        registerChild(document.body);
                      }
                    }}
                  >
                    <List
                      autoHeight
                      overscanRowCount={4}
                      className={'InfinityProductsList'}
                      scrollTop={scrollTop}
                      height={isServer ? ssrListHeight : height}
                      width={isServer ? ssrListWidth : rowWidth}
                      rowCount={isServer ? ssrRowsCount : rowsCount}
                      rowHeight={itemHeight}
                      onRowsRendered={onRowsRendered}
                      rowRenderer={rowRenderer}
                      noRowsRenderer={noRowsRenderer}
                    />
                  </Box>
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
