import { Product } from 'shared/types';

type ConvertPageToRowsArgs = {
  page: number;
  columnItemsNumber: number;
  limit: number;
  data: Product[];
};

export const convertPageToRows = ({
  page,
  columnItemsNumber,
  limit,
  data,
}: ConvertPageToRowsArgs) => {
  const rowItemsNumber = limit / columnItemsNumber;
  const startIndex = (page - 1) * columnItemsNumber;
  const stopIndex = startIndex + Math.ceil(data.length / rowItemsNumber);
  let itemsCounter = 0;
  let result: { [rowIndex: number]: Product[] } = {};

  for (let i = startIndex; i < stopIndex; i += 1) {
    result[i] = data.slice(itemsCounter, itemsCounter + rowItemsNumber);
    itemsCounter += rowItemsNumber;
  }

  return result;
};
