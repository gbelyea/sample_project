import axios from 'axios';

const githubRest = process.env.GITHUB_GIST_API;

exports.getGistByIdForUser = async (gistId) => {
  try {
    return await axios.get(`${githubRest}/gists/${gistId}`);
  } catch (error) {
    console.error(error);
  }
};

exports.getGistListForUser = async(gistUsername) => {
  try {
    return await axios.get(`${githubRest}/users/${gistUsername}/gists`);
  } catch (error) {
    console.error(error);
  }
};

exports.getGistListOfFavorites = async(gistUsername, database) => {
  const gists = await axios.get(`${githubRest}/users/${gistUsername}/gists`);
  const favs = await database.get('favourites').value();
  const result = await gists.data.filter((gist) => {
    if (favs.some((fav) => fav.id === gist.id)){
        return gist;
    }
    return null;
  });
  return result;
};

exports.addGistToFavourites = async (gistId, database) => {
  const list = await database.get('favourites').value();
  if (list.some(e => e.id === gistId)) {
    throw new Error('Record already exists!');
  }
  else{
    list.push({ id: gistId});
    database.save();
    return true;
  }
};

exports.removeGistFromFavourites = async (gistId, database) => {
  const list = await database.get('favourites').value();
  if (list.some(e => e.id === gistId)) {
    database.get('favourites').filter(obj => obj.id !== gistId);
    database.save();
  }
  else {
    throw new Error('Record does not exist');
  }
  return true;
};
