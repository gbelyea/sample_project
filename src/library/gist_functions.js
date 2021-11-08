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
