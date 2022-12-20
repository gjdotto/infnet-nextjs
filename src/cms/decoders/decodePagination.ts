export type PaginationData = {
  page: number;
  pageCount: number;
  total: number;
};

export function decodePagination(data: any): PaginationData {
  const {
    page = 0,
    pageCount = 0,
    total = 0,
  } = data && data.dataPosts.meta ? data.dataPosts.meta.pagination : {};

  return {
    page,
    pageCount,
    total,
  };
}
