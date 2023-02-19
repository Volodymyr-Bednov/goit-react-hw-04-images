import axios from 'axios';

export const getImageList = async (searchValue, page, per_page) => {
  const httpApi = axios.create({
    baseURL: `https://pixabay.com/api/?key=32131448-3a2109ffe1ebf52f926fc3134&image_type=photo&orientation=horizontal`,
    params: { q: searchValue, page, per_page },
  });
  return await httpApi.post();
};
