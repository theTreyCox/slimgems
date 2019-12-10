console.log('Hello from site.js');

generateCovers();
addCDSpinesToButtons();
flipAllAlbumCovers();
closeAlbum();

function generateCovers() {
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
            showAlbumCoverOnAlbumBtnClick(albumBtn, cover, i);
        });
    }
}

function flipAllAlbumCovers() {
    for (i = 1; i < 11; i++) {
        flipAlbumCover(i);
    }
}

function flipAlbumCover(num) {
    let album = document.querySelectorAll(`.album${num}`);
    album.forEach(function(album) {
        album.addEventListener('click', function() {
            if (this.style.transform == 'rotateY(180deg)') {
                let closeAlbumBtn = document.querySelector('.close-album-btn');
                closeAlbumBtn.classList.add('animated', 'rubberBand', 'fast');
                setTimeout(function() {
                    closeAlbumBtn.classList.remove('animated', 'rubberBand', 'fast');
                }, 600);
                flipImageToFront(this, num);
            } else {
                let closeAlbumBtn = document.querySelector('.close-album-btn');
                closeAlbumBtn.classList.add('animated', 'rubberBand', 'fast');
                setTimeout(function() {
                    closeAlbumBtn.classList.remove('animated', 'rubberBand', 'fast');
                }, 600);
                flipImageToBack(this, num);
            }
        });
    });
}

function flipImageToBack(element, num) {
    element.style.transform = 'rotateY(180deg)';
    element.style.transformStyle = 'preserve-3d';
    element.style.transition = 'all 0.3s ease-in-out';
    element.style.backgroundImage = `url('assets/album${num - 1}.png')`;
}

function flipImageToFront(element, num) {
    element.style.transform = 'rotateY(0)';
    element.style.transformStyle = 'preserve-3d';
    element.style.transition = 'all 0.3s ease-in-out';
    element.style.backgroundImage = `url('assets/album${num}.png')`;
}

// add spine background images to album link buttons
function addCDSpinesToButtons() {
    for (i = 1; i < 11; i++) {
        let imgBtn = document.querySelectorAll(`.album-btn-${i} > span`);
        imgBtn.forEach(function(btn) {
            btn.style.backgroundImage = `url('assets/spine${i}.png')`;
            btn.style.backgroundRepeat = 'no-repeat';
            btn.style.backgroundSize = 'contain';
        })
    }
}

// function for showing or hiding album cover on album button click
function showAlbumCoverOnAlbumBtnClick(albumBtn, albumCover, i) {
    albumBtn.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            let albumsContainer = document.querySelector('.albums-container');
            let closeAlbumBtn = document.querySelector('.close-album-btn');
            albumsContainer.style.opacity = '1';
            albumsContainer.style.pointerEvents = 'all';
            closeAlbumBtn.style.opacity = '1';
            closeAlbumBtn.style.pointerEvents = 'all';
            closeAlbumBtn.classList.add('animated', 'rubberBand', 'fast');
            setTimeout(function() {
                closeAlbumBtn.classList.remove('animated', 'rubberBand', 'fast');
            }, 600);
            if (e.target.parentElement.classList.contains(`e${i}`)) {
                for (x = 1; x < 11; x++) {
                    setAppleMusicPlaylistSidebar(x);
                    let albumCovClasses = document.querySelectorAll(`.album.e${x}`);
                    albumCovClasses.forEach(function(cl) {
                        cl.style.opacity = '0';
                        cl.style.pointerEvents = 'none';
                        cl.classList.remove('animated', 'pulse', 'faster');
                        showHideElement(cl, i);
                    })
                }
            }
        });
    });
}

// function for showing and hiding an element via opacity
function showHideElement(element, i) {
    if (element.style.opacity == '0' && element.classList.contains(`e${i}`)) {
        element.style.opacity = '1';
        element.style.pointerEvents = 'all';
        element.classList.add('animated', 'pulse', 'faster');
        setTimeout(function() {
            element.classList.remove('animated', 'pulse', 'faster');
        }, 350);
    } else {
        element.style.opacity = '0';
        element.style.pointerEvents = 'none';
        element.classList.remove('animated', 'pulse', 'faster');
    }
}

function closeAlbum() {
    let albumsContainer = document.querySelector('.albums-container');
    let closeAlbumBtn = document.querySelector('.close-album-btn');
    let albums = document.querySelectorAll('.album');
    closeAlbumBtn.addEventListener('click', function() {
        albumsContainer.style.opacity = '0';
        albumsContainer.style.pointerEvents = 'none';
        this.style.opacity = '0';
        this.style.pointerEvents = 'none';
        this.classList.remove('animated', 'rubberBand', 'fast');
        albums.forEach(album => {
            album.style.pointerEvents = 'none'
        });
    });
}

function setAppleMusicPlaylistSidebar(num) {
    let appleMusicEmbed = document.querySelector('.album-apple-music-embed');
    let appleMusiciFrame = document.querySelectorAll('.apple-music-iframe');
    appleMusiciFrame.forEach(function(iframe) {
        switch (num) {
            case 1:
                iframe.src = '';
                iframe.parentElement.children[1].className = 'apple-music-listen-link album-color-1';
                iframe.parentElement.children[1].href = '';
                iframe.parentElement.className = 'album-apple-music-embed album-embed album-color-1';
                break;
            case 2:
                iframe.src = '';
                iframe.parentElement.children[1].className = 'apple-music-listen-link album-color-2';
                iframe.parentElement.children[1].href = '';
                iframe.parentElement.className = 'album-apple-music-embed album-embed album-color-2';
                break;
            case 3:
                iframe.src = '';
                iframe.parentElement.children[1].className = 'apple-music-listen-link album-color-3';
                iframe.parentElement.children[1].href = '';
                iframe.parentElement.className = 'album-apple-music-embed album-embed album-color-3';
                break;
            case 4:
                iframe.src = '';
                iframe.parentElement.children[1].className = 'apple-music-listen-link album-color-4';
                iframe.parentElement.children[1].href = '';
                iframe.parentElement.className = 'album-apple-music-embed album-embed album-color-4';
                break;
            case 5:
                iframe.src = '';
                iframe.parentElement.children[1].className = 'apple-music-listen-link album-color-5';
                iframe.parentElement.children[1].href = '';
                iframe.parentElement.className = 'album-apple-music-embed album-embed album-color-5';
                break;
            case 6:
                iframe.src = '';
                iframe.parentElement.children[1].className = 'apple-music-listen-link album-color-6';
                iframe.parentElement.children[1].href = '';
                iframe.parentElement.className = 'album-apple-music-embed album-embed album-color-6';
                break;
            case 7:
                iframe.src = '';
                iframe.parentElement.children[1].className = 'apple-music-listen-link album-color-7';
                iframe.parentElement.children[1].href = '';
                iframe.parentElement.className = 'album-apple-music-embed album-embed album-color-7';
                break;
            case 8:
                iframe.src = '';
                iframe.parentElement.children[1].className = 'apple-music-listen-link album-color-8';
                iframe.parentElement.children[1].href = '';
                iframe.parentElement.children[1].className = 'album-apple-music-embed album-embed album-color-8';
                break;
            case 9:
                iframe.src = '';
                iframe.parentElement.children[1].className = 'apple-music-listen-link album-color-9';
                iframe.parentElement.children[1].href = '';
                iframe.parentElement.className = 'album-apple-music-embed album-embed album-color-9';
                break;
            case 10:
                iframe.src = 'https://embed.music.apple.com/us/album/kamikaze/1434770366?app=music&amp;itsct=music_box&amp;itscg=30200';
                iframe.parentElement.children[1].className = 'apple-music-listen-link album-color-10';
                iframe.parentElement.children[1].href = 'https://geo.music.apple.com/us/album/kamikaze/1434770366?itsct=music_box&itscg=30200';
                iframe.parentElement.className = 'album-apple-music-embed album-embed album-color-10';
                break;
            default:
                iframe.src = 'https://embed.music.apple.com/us/album/kamikaze/1434770366?app=music&amp;itsct=music_box&amp;itscg=30200';
                iframe.parentElement.children[1].className = 'apple-music-listen-link album-color-10';
                iframe.parentElement.children[1].href = 'https://geo.music.apple.com/us/album/kamikaze/1434770366?itsct=music_box&itscg=30200';
                iframe.parentElement.className = 'album-apple-music-embed album-embed album-color-10';
                break;
        }

    });
}

window.onload = function() {
    let albumsContainer = document.querySelector('.albums-container');
    albumsContainer.classList.remove('page-loading');
};