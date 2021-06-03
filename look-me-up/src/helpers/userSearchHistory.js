export const addToSearchHistory = (sentence) => {
  const searchHistory = [...JSON.parse(localStorage.getItem("search-history") || "[]"), { sentence }];
  localStorage.setItem("search-history", JSON.stringify(searchHistory));
};

export const getSearchHistory = () => {
  return JSON.parse(localStorage.getItem("search-history") || "[]");
};

export const clearSearchHistory = () => {
  localStorage.removeItem("search-history");
};
