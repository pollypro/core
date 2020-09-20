// imports from vendors
import _ from 'lodash/fp';

export type PaginationParams = {
  page?: number;
  perPage?: number;
  order?: 'ASC' | 'DESC';
  sortBy?: string;
};

type MongoPagination = {
  limit: number;
  skip: number;
  sort: { [key: string]: 1 | -1 };
};

const defaultSortBy = 'createdAt';
const defaultOrder = -1;
const defaultMongoPagination: MongoPagination = {
  limit: 25,
  skip: 0,
  sort: { [defaultSortBy]: defaultOrder },
};

export const getMongoPagination = (params: PaginationParams = {}): MongoPagination => {
  const paramsOrder = _.upperCase(params.order);

  const limit = params.perPage || defaultMongoPagination.limit;
  const skip = _.isNumber(params.page)
    ? (params.page - 1) * limit
    : defaultMongoPagination.skip;

  const sortBy = params.sortBy || defaultSortBy;
  const order =
    paramsOrder && (paramsOrder === 'ASC' || paramsOrder === 'DESC')
      ? paramsOrder === 'ASC'
        ? 1
        : -1
      : defaultOrder;

  return {
    limit,
    skip,
    sort: { [sortBy]: order },
  };
};
