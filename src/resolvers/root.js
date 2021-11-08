import fetch from 'node-fetch';
import { getGistListForUser,
  getGistByIdForUser,
  getGistListOfFavorites,
  removeGistFromFavourites,
  addGistToFavourites
} from '../library/gist_functions';

const resolvers = {
  Query: {
    Gist: async(_parent, args, { context }, info) => {
      const result = await getGistByIdForUser(args.id);
      return result.data;
    },
    allGists: async(_parent, args, { context }, info) => {
      const { username, filter } = args;
      let result;
      try {
        if (!filter || filter.starred === false) {
          result = await getGistListForUser(username);
        } else {
          result = await getGistListOfFavorites(username);
        }
      }catch(err){
        console.log(err);
        return err;
      }
      return result.data;
    }
  },
  Mutation:{
    addGistToFavourites: async(_parent, args, { context, dataSources }, info) => {
      const { database } = dataSources;
      try {
        const result =  await addGistToFavourites(args.id, database);
        return result;
      }
      catch (e){
        // just console log the error for now and send it on
        console.log(e);
        return e;
      }
    },
    removeGistFromFavourites: async(_parent, args, { context, dataSources }, info) => {
      try {
        const { database } = dataSources;
        return removeGistFromFavourites(args.id, database);
      }
      catch (e){
        // just console log the error for now and send it on
        console.log(e);
        return e;
      }
    },
  },
  Gist:{
    files(parent) {
      let fileArray = [];
      if (parent && parent.files) {
        // Take the files object and put the keys in an array
        const temp = parent.files;
        const filenames = Object.keys(temp);
        // create an array of file objects to pass back
        fileArray = filenames.map((name) => temp[name]);

        // We have to check to see if content is undefined, it doesn't come back with allGists
        fileArray = fileArray.map(async (arrayItem) => {
          if(!arrayItem.content && arrayItem.raw_url) {
            // We have the url to the content, so go get it
            const response = await fetch(arrayItem.raw_url);
            const responseText = await response.text();
            return {...arrayItem, content: responseText};
          }else{
            // content is populated just return the original object
            return arrayItem;
          }
        });
      }
      return fileArray;
    },
  },

};

export default resolvers;
