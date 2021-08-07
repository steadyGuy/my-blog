import React, { FC, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';

type PaginationProps = {
  total: number;
}

const CustomPagination: FC<PaginationProps> = ({ total }) => {

  const [page, setPage] = useState(1);

  return (
    <Pagination count={total} variant="outlined" color="primary" />
  );
}

export default CustomPagination;
