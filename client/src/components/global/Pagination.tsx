import React, { ChangeEvent, FC, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';

type PaginationProps = {
  total: number;
}

const CustomPagination: FC<PaginationProps> = ({ total }) => {

  const [page, setPage] = useState(1);

  const handleChange = (e: ChangeEvent<any>, value: any) => {
    setPage(value);
  };

  return (
    <Pagination
      count={total}
      page={page}
      variant="outlined"
      onChange={handleChange}
      color="primary"
    />
  );
}

export default CustomPagination;
