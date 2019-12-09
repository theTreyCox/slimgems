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
    // run show album cover on button click function
    let albumBtn = document.querySelectorAll(`.album-btn-${i}`);
    showAlbumCoverOnAlbumBtnClick(albumBtn, albumCover);
  });
}

// function for showing or hiding album cover on album button click
function showAlbumCoverOnAlbumBtnClick(albumBtn, albumCover) {
  albumBtn.forEach(function(btn) {
    btn.addEventListener('click', function(_) {
      showHideElement(albumCover);
    });
  });
}

// function for showing and hiding an element via opacity
function showHideElement(element) {
  if (element.style.opacity = '0') {
    element.style.opacity = '1';
    element.style.pointerEvents = 'all';
  } else {
    element.style.opacity = '0';
    element.style.pointerEvents = 'none';
  }
}
