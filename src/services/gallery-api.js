import axios from "axios";

const API_KEY = "19023232-35be833f55f428d8b0eb36710";

export default async function fetchImage(searchQuery, page) {
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=15`
    )
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }

      return Promise.reject(new Error(`Images are not found.`));
    });
}
