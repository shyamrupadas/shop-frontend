import {
  AutoSizer,
  InfiniteLoader,
  List,
  WindowScroller,
} from 'react-virtualized';
import React, { Fragment, useRef } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { Product } from 'shared/types';

const noRowsRenderer = () => (
  <Grid item>
    <Typography>No products found</Typography>
  </Grid>
);

const getProductsInCurrentRow = (
  rowIndex: number,
  products: Product[],
): Product[] => {
  let productsInRow = [];
  const numberOfItemsPerLine = 5; // TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const startIndex = rowIndex * numberOfItemsPerLine;

  for (
    let i = startIndex;
    i < Math.min(startIndex + numberOfItemsPerLine, products?.length);
    i++
  ) {
    productsInRow.push(products[i]);
  }

  return productsInRow;
};

type InfinityProductsListProps = {
  children: (item: Product, key: string) => React.ReactNode;
  products?: Product[];
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
  products = [],
  children,
  rowsCount,
}: InfinityProductsListProps) => {
  const infiniteLoaderRef = useRef<InfiniteLoader>(null);

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
              return index + 1 <= products?.length / 5;
            }}
            loadMoreRows={loadMoreRows}
            threshold={1}
            minimumBatchSize={10}
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
                      const productsInRow = getProductsInCurrentRow(
                        index,
                        products,
                      );

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
