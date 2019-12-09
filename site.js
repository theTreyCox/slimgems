console.log('Hello from site.js');

for (i = 1; i < 11; i++) {
  // set album cover art for each album
  let albumCover = document.querySelectorAll(`.album${i}`);
  albumCover.forEach(function(cover) {
    // album cover size and position
    cover.style.backgroundImage = `url('assets/album${i}.png')`;
    cover.style.backgroundSize = 'contain';
    cover.style.backgroundPosition = 'center';
    cover.style.backgroundRepeat = 'no-repeat';
    cover.style.backgroundColor = 'transparent';
    // make album art transparent by default;
    cover.style.opacity = '0';
    cover.style.pointerEvents = 'none';
  });
}
