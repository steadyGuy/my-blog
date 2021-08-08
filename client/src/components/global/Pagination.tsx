import { ChangeEvent, FC, useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { useHistory } from 'react-router-dom';

type PaginationProps = {
  total: number;
  callback: any;
}

const CustomPagination: FC<PaginationProps> = ({ total, callback }) => {

  const [page, setPage] = useState(1);
  const history = useHistory();

  const handleChange = (e: ChangeEvent<any>, value: any) => {
    setPage(value);
    history.push(`?page=${value}`);
    callback(Number(value));
  };

  useEffect(() => {

    const num = history.location.search.slice(6) || 1;
    setPage(Number(num));

  }, [history.location.search, callback])

  return (
    total > 1 ?
      <Pagination
        count={total}
        page={page}
        variant="outlined"
        onChange={handleChange}
        color="primary"
      /> : null
  );
}

export default CustomPagination;
