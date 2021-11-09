#sample project

UNIMPLEMENTED - I ran out of time, i did not implement the library function to return
favourited gists

create a .env file in the root of the project with the following entries:

NODE_ENV=development
LOCAL_CORS_ORIGINS=['http://localhost:4000','https://studio.apollographql.com']
GITHUB_GIST_API=https://api.github.com

It is important to note that due to time restrictions, it is assumed you will
run the build on a windows machine.. i developed it on a windows machine and
didn't have time to mess with that

After you have cloned the repository you would open it up and

1). npm install
2). npm run build
3). npm run start:production

in postman you can send the requests

1). With the username variable of your choice

query Query($username: String!) {
  allGists(username: $username) {
    id
    files {
      filename
      content
    }
  }
}

2). With the gist id of your choice

query Query($gistId: ID!) {
  Gist(id: $gistId) {
      id
    files {
      filename
    content
    }
  }
}

3). Add gist to favorites with gist id

mutation AddGistToFavouritesMutation($addGistToFavouritesId: ID!) {
  addGistToFavourites(id: $addGistToFavouritesId) 
}

4). Remove gists from favourites with gist id

mutation RemoveGistFromFavouritesMutation($removeGistFromFavouritesId: ID!) {
  removeGistFromFavourites(id: $removeGistFromFavouritesId) 
}




