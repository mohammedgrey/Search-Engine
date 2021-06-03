import axios from "./index";

export const getSearchResults = async (Queryparameters) => {
  return (
    await axios.get(`/search`, {
      params: Queryparameters,
    })
  ).data;
};
