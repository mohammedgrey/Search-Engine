import axios from "./index";

export const getSearchResults = async (searchQuery) => {
  return (
    await axios.get(`/search`, {
      params: {
        q: searchQuery,
      },
    })
  ).data;
};
