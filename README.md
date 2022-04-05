# How to deploy it

- After the git pull, you should install the packages with ```npm install```
- To run the app you should run ```npm start``` -> This should deploy a localhost:3000 with the app
- To run the tests you should run ```npm test```



NASA has revealed a public API for the image collection. We would like to explore the content
using the client side application.
API docs: https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf



# Libraries

- I used bootstrap for organizing the results from the query.
- I used axios to get the API.
- I took the pagination concept from here -> https://www.digitalocean.com/community/tutorials/how-to-build-custom-pagination-with-react-es -> I added some logic to refresh the pagination.


# Requirements

- Create a React single page application (it’s ok to use CRA).
- The application should consist of 2 pages: search and show (requirements below).
- Make sure the application is usable on mobile devices as well.
- Provide basic tests for your code.
- Feel free to style your application as you like.
- You can use any libraries you like.
# Search page requirements:
- The page must allow users to search the NASA Media Library.
- The search process must use the /search endpoint (API docs).
- The page should contain the required query input and 2 optional input filters: year start
and year end.
- The input data should have basic validations compliant with the API specification.
- There should be a search button that starts the search process.
- The search results should appear below the search section (inputs).
- Each search result item should include a thumbnail, title, location, and photographer's
name.
- The search result item should link to the show page - the more detailed page of a
specific search result item.
- Only search image collections (media_type=image).
# Show page requirements:
- The page should contain the details of the collection: title, location, photographer's
name, description, keywords, date, and images from the collection.
- Choose unique images from the collection, regardless of version. Most collections only
have one image. Decide which version suits your preferences.
- There should be a back button that takes you back to the search results page.