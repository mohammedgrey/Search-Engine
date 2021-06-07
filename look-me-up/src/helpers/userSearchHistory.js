export const addToSearchHistory = (_id) => {
  let searchHistory = JSON.parse(localStorage.getItem("search-history") || "[]");
  if (searchHistory.findIndex((sent) => sent._id === _id) !== -1) return;
  searchHistory = [...searchHistory, { _id: _id.trim() }];
  localStorage.setItem("search-history", JSON.stringify(searchHistory));
};

export const getSearchHistory = () => {
  const shistory = JSON.parse(localStorage.getItem("search-history") || "[]");
  return shistory.length > 10 ? shistory.slice(0, 10) : shistory;
};

export const clearSearchHistory = () => {
  localStorage.removeItem("search-history");
};
