import { IconButton, makeStyles, TextField, Theme } from '@material-ui/core'
import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(({ palette }: Theme) => ({
  search: {
    color: '#fff',
    '& .MuiInputBase-root::before': {
      borderBottom: `solid 1px ${palette.grey[300]}`,
    }
  },
  multilineColor: {
    color: palette.grey[400],
  },
  searchForm: {
    color: palette.grey[300],
  }
}));

const Search = () => {
  const [search, setSearch] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);

  const handleSearchVisibility = () => {
    setSearchVisible(prev => !prev);
  }

  const classes = useStyles();
  return (
    <>
      <form className={classes.searchForm}>
        <TextField
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          size="small"
          className={classes.search}
          InputProps={{
            className: classes.multilineColor
          }}
          InputLabelProps={{
            className: classes.searchForm,
          }}
        />
      </form>
      <IconButton color="inherit" onClick={handleSearchVisibility}>
        <SearchIcon />
      </IconButton>
    </>


    // <form className="search w-100 me-3">
    //   <input
    //     className="form-control w-100"
    //     type="search"
    //     placeholder="Введите текст для поиска..."
    //     value={search} aria-label="Search"
    //     onChange={e => setSearch(e.target.value)}
    //   />
    // </form>
  )
}

export default Search
