import {
  AutoSizer,
  InfiniteLoader,
  List,
  WindowScroller,
} from 'react-virtualized';
import React, { Fragment, useCallback } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { Product } from 'shared/types';
import { useAppSelector } from 'store';
import { catalogModel } from 'entities/catalog';

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
  itemWidth = 200,
  itemHeight = 410,
  rows = {},
  children,
  rowsCount,
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
