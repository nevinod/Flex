# S3 - Spotify Song Selector

### S3 will allow the user to loginto their Spotify account, select one of their playlists, and receive song recommendations based on the content in their playlist.

## Background and Overview

It is often a struggle to find a good new song. S3 will compare the user's playlist to other similar playlists with similar songs and will recommend other songs the user may like.

This problem breaks down into a few sub-problems:
* Effectively using oAuth to log the user into their Spotify account
* Fetching the user's playslist and song data
* Recommending new songs

## Functionality and MVP

- [ ] We will be able to login Spotify users
- [ ] We will use API calls to get the user's playlist data
- [ ] S3 will be able to suggest songs based on the received data

### Bonus features
- [ ] Visual notification of the new song selections
- [ ] Web player to play the songs in our app

## Technologies and Technical Challenges

Frontend: React / Express

### Retreiving the data

* Accessing playlist data
  * Spotify API calls
* Feature Manipulation
  * Get access to individual songs in playlists

### Training the Model
* Find the most suitable machine learning algorithm for our data
* Feed our data into the algorithm

## UX
* Frontend Interface
  * Our page will have a login and a list of suggested songs
  * We will request access from the user's account permissions
  * Clean menu and visual cue to show new apps


## Project Flowchart

![flex project](https://user-images.githubusercontent.com/26920351/36368730-7e382306-150d-11e8-9ab6-1ffb07730130.png)

## Accomplish over the Weekend
* Learn basics of Django
* Learn Python syntax
* Learn basics of Tensorflow

## Group Members and Work Breakdown
#### Neil Vinod and Winston Galas

### Day 1
* Start writing the user interface
* Make API call to Spotify

### Day 2
* Finish making API calls to Spotify
 
### Day 3
* Styled login page

### Day 4
* Use data from API call to find top song in same genre


### Day 5
* Completely finish functionality

### Day 6 - 7
* Complete styling
* Start bonus features
