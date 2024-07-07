// Search page
import React from "react";
import _ from "lodash";
// @mui/material
import Pagination from "@mui/material/Pagination";
// components
import SearchCard from './SearchCard';
import SearchBar from './SearchBar';
// service + store
import { useAppDispatch } from "../../store";
import { useAppSelector } from "../../hooks/hooks";
import { GetSearchResults } from "../../services/SearchService";
// config
import { SearchItem } from "./interfaceType";
import { pageSize } from "../../config/variables";
// css
import styles from "../../assets/css/search/search.module.scss";
import { setValues } from "./store";
import { filterParam, filterUrl } from "../../config/functions";

const SearchPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.search.filter);
  const totalCount = useAppSelector(state => state.search.totalCount);
  const result: SearchItem[] = useAppSelector(state => state.search.result);

  const noOfPage = totalCount/pageSize;
  
  const handleChangePage = (e: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setValues({filter: {...filter, page: value}}));
  };

  // get search result when search text change (on enter/click)
  React.useEffect(() => {
    window.history.pushState({}, '', filterUrl(filter));
    if (location.search && !_.isEmpty(_.omitBy(filter, _.isNil))) {
      dispatch(GetSearchResults(filter));
      window.scrollTo({top: 0});  // scroll page to top
    }
  },[filter]);

  React.useEffect(() => {
    dispatch(setValues({filter: {...filterParam({page: '1', searchText: ''})}}));
  },[]);

  return (
    <div>
      <div className={styles.searchContainer}>
        <SearchBar />
      </div>
      <div className={styles.resultContainer}>
        {result.length ? <span className={styles.resultText}>Showing {((filter.page as number-1)*10)+1}-{filter.page as number*pageSize} of {totalCount} results</span> : null}
        {result.map((item, index) => {
          return <SearchCard key={index} item={item} />
        })}
        {/* pagination */}
        {noOfPage > 1 ? <Pagination className={styles.pageContainer} count={noOfPage} page={Number(filter.page)} onChange={handleChangePage} /> : null}
      </div>
    </div>
  )
}

export default SearchPage;
