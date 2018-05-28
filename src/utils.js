export const API_BASE_URI = 'https://canadian-music-week.cloudinary.auth0-extend.com/music-discovery-service';
export const ALPHABETS = 'abcdefghijklmnopqrstuvwxyz';
import cloudinary from 'cloudinary-core';



export const goTo = (router, path, data) => {


let query = {};

if(router.currentRoute.name === 'browse-alpha'){
    query = {artist:data};
}

if(router.currentRoute.name === 'album'){
    query = {album:data};
}

if(router.currentRoute.name === 'player'){
    query = {track:data};
}

console.log('query', query);
  router.push({
    query : query,
    data : query,
    path :path
  })
}


export const goTo_original = (router, path) => {
  router.push({
    path
  })
}



String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

export const normalizeTitle = (title) => {
      return title.replaceAll(':','-').replaceAll(' ','-').replaceAll('/','-').toUpperCase();
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

export const formatSlug = (str) => str.replace(/\//g, '-').replace(/ /g, '-').replace(/:/g,'').toLowerCase()



