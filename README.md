# Hack-Idea Project

- UI is built using React.JS with TypeScript
- Data handling and API is built using `firebase`
- Demo is hosted on firebase hosting [Here](https://hack-idea-6dfbb.web.app/)

## Running the project:
```
npm install
npm start
```

## Running the unit tests
```
npm run test
```


## Assumptions:
- During login it is expected that Employee ID is existing in the database. No validation check.
- Can use any random string as Employee ID.

- Employee cannot upvote their own challenge posts.
- Employee can upvote other's challenge posts multiple times (No-limit).
- Employee can only edit their own challenge post fully. Employee can only edit tags associated with other's post.

## Backend structure on firebase
- Collection name: `ideas`
```
Document Structure 
{
    id: # auto generated id from firebase
    createdAt: # post creation time
    title: # post title
    description: # post description
    tags: # array of user defined tags
    userId: # employee id of the post owner
    upvotes: # upvote count of the post
}
```

## Extra features:
- Added search functionality for posts (only post's title)
- Added a 404 page for any non existing paths.

## Project structure
- Top level directory `/src`
- All components are present inside `Components` folder
- All firebase functions are present inside `functions` folder
- Custom hooks for React are present inside `hooks` folder
- Generic interfaces for typings are present inside `interfaces` folder
- Tests are present inside `__tests__` folder

## Packages used for development:
- bootstrap and react-bootstrap (UI components and development)
- firebase (API hosting and backend)
- formik and yup (Form validation)
- react-router-dom (Page routes)
