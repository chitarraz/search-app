import _ from "lodash";

// filter function
export interface Filter {
  [key: string]: string | number | undefined
}

export const filterUrl = (filter: Filter) => {
  let filterBy = _.omitBy(filter, _.isNil);
  filterBy = _.omitBy(filterBy, (item) => _.isArray(item) && _.isEmpty);
  if (!_.isEmpty(filterBy)) {
    let path = location.pathname+"?";
    Object.keys(filterBy).forEach((key,index) => {
      if (index>0) path+="&";
      path += key+"="+filter[key];
    })
    return path;
  } 
  // else {
  //   return location.pathname;
  // }
}

export const filterParam = (filterParam: Filter) => {
  const keys = new Set(Object.keys(filterParam));
  const params = new URLSearchParams(window.location.search);
  const result: Filter = {};
  for(const [key, value] of params) {
    if (keys.has(key) && !_.isNil(value)) {
      result[key] = value;
    }
  }
  return result;
}