import mongoose from 'mongoose';

export const fetcher = (...args) => fetch(...args).then((res) => res.json());
// {
//   console.log(res),
//   res.json();
// });
export const swrOptions = {
  fetcher,
};

export const buildImageUrl = (path, size = 'original') =>
  `https://image.tmdb.org/t/p/${size}${path}`;
