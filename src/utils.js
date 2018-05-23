export const API_BASE_URI = 'https://canadian-music-week.cloudinary.auth0-extend.com/music-discovery-service';
export const ALPHABETS = 'abcdefghijklmnopqrstuvwxyz';
import cloudinary from 'cloudinary-core';

export const goTo = (router, path) => {
  router.push({
    path
  })
}

export const fetchFilteredItems = async function (
  filterType,
  filterTerm,
  page = 1,
  pageSize = 6
) {
  const response = await fetch(
    `${API_BASE_URI}/${filterType}/${encodeURI(
      filterTerm
    )}?page=${page}&pageSize=${pageSize}`
  );
  const data = await response.json();
  return data;
}

export const cl = cloudinary.Cloudinary.new({
  cloud_name: 'christekh',
  secure: true
})