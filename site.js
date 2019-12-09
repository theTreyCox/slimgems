console.log('Hello from site.js');

for (i = 1; i < 11; i++) {
  let albumCover = document.querySelectorAll(`.album${i}`);
  albumCover.forEach(function(cover) {
    cover.style.backgroundImage = `url('assets/album${i}.png')`;
    cover.style.backgroundSize = 'contain';
    cover.style.backgroundPosition = 'center';
    cover.style.backgroundRepeat = 'no-repeat';
    cover.style.backgroundColor = 'transparent';
  });
}
