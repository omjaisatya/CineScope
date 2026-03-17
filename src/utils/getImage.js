export const getImage = (path, width = "w200") =>
  path
    ? `https://image.tmdb.org/t/p/${width}${path}`
    : `https://dummyimage.com/${width.replace("w", "")}x300/000/009de6.png&text=No+Image`;
