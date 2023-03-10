import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const timeUpdate = function (time) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(time));
};

player.on('timeupdate', throttle(timeUpdate, 1000));

const saveTime = localStorage.getItem(STORAGE_KEY);
console.log(saveTime);
const timeStop = JSON.parse(saveTime);
console.log(timeStop.seconds);

player.setCurrentTime(timeStop.seconds || 0);
