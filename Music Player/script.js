const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButon = document.getElementById("shuffle");

const allSongs = [{
    id: 0,
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    artist: "Quincy Larson",
    duration: "4:15",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
  },];

const audio = new Audio();

let userData = {
    songs : [...allSongs],
    currentSong : null,
    songCurrentTime : 0
};

const playSong = (id) => {
    const song = userData?.songs.find((song) => song.id === id);
    
     audio.src = song.src;
     audio.title = song.title;

     if(!userData?.currentSong || userData?.currentSong.id !== song.id){
        audio.currentTime = 0;
     }else {
        audio.currentTime = userData?.songCurrentTime;
     }
     userData.currentSong = song;
     playButton.classList.add("playing");
     highlight()
     audio.play();
    
  
}



const pauseSong = () => {
    userData.songCurrentTime = audio.currentTime;
    playButton.classList.remove("playing");
    audio.pause();
}



const playNextSong = () => {
  if(userData?.currentSong === null){
    playSong(userData?.songs[0].id)
  }else{
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];
    playSong(nextSong.id);
    
  }  
}

nextButton.addEventListener("click",playNextSong);





const playPreviousSong = () => {
  if(userData?.currentSong === null) return;
  else{
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];
    playSong(previousSong.id);
  }
}

previousButton.addEventListener("click",playPreviousSong);

const highlight = () => {
  const playlistSongElement = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`);

  playlistSongElement.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  })

  if(songToHighlight){
    songToHighlight.setAttribute("aria-current","true")
  }
}



const renderSongs = (array) => {
  const songHTML = array.map((song) => {
    return ` 
            <li id="song-${song.id}" class="playlist-song"></li>
            <button class="playlist-song-info" onclick="playSong(${song.id})">
            <span class="playlist-song-title">${song.title}</span>
            <span class="playlist-song-artist">${song.artist}</span>
            <span class="playlist-song-duration">${song.duration}</span>
            </button>
            <button class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/></button>
    `
  }).join("");
  playlistSongs.innerHTML = songHTML;
}

const getCurrentSongIndex = () => {
    return userData?.songs.indexOf(userData?.currentSong)
}

playButton.addEventListener("click",()=>{
    if(!userData?.currentSong){

        playSong(userData?.songs[0].id)
    }else {
        playSong(userData?.currentSong)
    }
    
})


pauseButton.addEventListener("click", pauseSong)
const sortSongs = () => {
    userData?.songs.sort((a,b) => {
        if(a.title < b.title){
            return -1
        }
        if(a.title > b.title){
            return 1
        }
        return 0;
    });
    return userData?.songs

}

// renderSongs(userData?.songs);
renderSongs(sortSongs());