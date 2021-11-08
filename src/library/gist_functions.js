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

exports.getGistListOfFavorites = async(gistUsername) => {
  // When implemented it will just get all gists and then filter out the ones not favourited
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
