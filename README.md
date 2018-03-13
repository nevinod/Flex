# S3

---


![screen shot 2018-03-12 at 4 40 59 pm](https://user-images.githubusercontent.com/26920351/37314979-46f7258c-2614-11e8-803a-fd3dc66a78dd.png)



Live Site: https://spotifysongselector.herokuapp.com/

Spotify Song Selector, S3, recommends songs based on a users' Spotify playlist. S3 aims to provide the user with new and refreshing sound waves with a click of a button. After the user chooses a playlist from their profile, S3 provides a list of songs for the user to listen to that is similar in sound.

---

## Technology

Built with ...
* Express.js on the backend

  <img src="https://user-images.githubusercontent.com/26920351/37314780-44c3c85c-2613-11e8-9081-18264368deb1.png" height="30">

* HTML, CSS, and React.js on the frontend

  <img src="https://user-images.githubusercontent.com/26920351/36052477-a6e7e416-0da2-11e8-813a-1ee556d4d8b0.png" width="30">  <img src="https://user-images.githubusercontent.com/26920351/36052488-b2fb00b2-0da2-11e8-995b-aeac3b9e68bb.png" height="30">  <img src="https://user-images.githubusercontent.com/26920351/36052718-a5709848-0da3-11e8-8a16-bf47966d3f63.png" width="25">

* Node.js for the runtime environment

  <img src="https://user-images.githubusercontent.com/26920351/37314897-e2bb395a-2613-11e8-8eee-f83dd3b838f5.png" width="70">

* Spotify web API to grab the playlist and recommended songs data

    <img src="https://user-images.githubusercontent.com/26920351/37314729-ecd6dc7e-2612-11e8-9cd6-f810de67b187.png" width="30">
---
## Features & Implementation

### Spotify Open Authorization
A user can give S3 permission to access their Spotify data. Express.js enables the connection of our website to the Spotify user database through redirecting routes and callbacks.

<img src="https://user-images.githubusercontent.com/26920351/37315702-39dfad7a-2618-11e8-9d97-8e1323b966ae.png" width="700">

If not logged in, the user will be redirected to Spotify's login page.

<img src="https://user-images.githubusercontent.com/26920351/37315782-a57a9180-2618-11e8-8db3-eed7f723622d.png" width="700">

Once logged in, the playlist's of the logged in user are displayed.

<img src="https://user-images.githubusercontent.com/26920351/37316194-f14acd30-261a-11e8-90bc-3a0f1088503c.png" width="400">

Furthermore, the top 10 recommended songs will be shown after a playlist has been clicked.

<img src="https://user-images.githubusercontent.com/26920351/37316263-4baff5f2-261b-11e8-968c-1ce61d2a971c.png" width="700">

---

## Code Examples and Challenges

One of the challenges we spent too much time on was being confused on how to utilize API requests that were dependent on information received from previous API requests. An example would be rendering recommended songs before the browser received the actual playlists. To compensate for this, we took advantage of the "async" and "await" keywords to specify the order in which the promises were called and data was saved.
```javascript
//server.js
async getPlaylistSongs() {
  let parsed = queryString.parse(window.location.search)
  let accessToken = parsed.access_token
  if(this.state.playlists.items) {
    for(let i = 0; i < this.state.playlists.items.length; i++) {
      await fetch(`https://api.spotify.com/v1/users/${this.state.playlists.items[i].owner.id}/playlists/${this.state.playlists.items[i].id}/tracks`, {
        headers: { 'Authorization': 'Bearer ' + accessToken }
      }).then(response => response.json())
        .then(data => this.setState({songs: data}))
    }
  }
}
```
"async" and "await" are needed in these lines of code because "async" guarantees a promise will be returned, and the logic after "await" runs after the promise is received. If these words were not used, the setState logic would happen before grabbing the actual playlist songs.

On the CSS side, we ran into the problem of our nav bar buttons and logo running into each other if the window got too small. To compensate for this, we used media queries to change the positioning and styling of the elements.
 ```css
 /* App.css */
 @media (max-width: 820px) {
   #spotifyBox {
     display: none;
   }

   #logo-container {
     position: absolute;
     left: 23px;
     top: -8px;
   }

   #navbar {
     /* height: 70px; */
   }
 }
 ```
---

## Ideas for Future Work

### Song Preview

We cannot provide song suggestions without including one of its' most important aspects - listening to the suggested song. This is key for creating the user interaction and experience. This seems challenging, because we will need to make sure that the Spotify API provides the data for the songs. We are excited to take on that challenge.


### Add To Playlist

Another key aspect of Spotify is the ability to add songs to playlists. Ideally, we would want the option to add the recommended songs with a click of a button and update the playlist in real time. We have to take into account what we can use in the API calls to create this functionality.
