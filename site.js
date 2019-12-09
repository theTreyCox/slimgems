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
        showAlbumCoverOnAlbumBtnClick(albumBtn, cover, i);
    });
}

addCDSpinesToButtons();
flipAlbumCover();

function flipAlbumCover() {
    for (i = 1; i < 11; i++) {
        let albums = document.querySelectorAll(`.album${i}`);
        albums.forEach(function(album) {
            album.addEventListener('mouseover', function(e) {
                console.log(e.target);
                e.target.style.transform = 'rotateY(180deg)';
                e.target.style.transformStyle = 'preserve-3d';
                e.target.style.transition = 'all 0.3s ease-in-out';
                window.setTimeout(function() {
                    e.target.style.backgroundImage = `url('assets/album${i - 1}')`;
                }, 150)
            });
            album.addEventListener('mouseout', function(e) {
                console.log(e.target);
                e.target.style.transform = 'rotateY(0)';
                e.target.style.transformStyle = 'preserve-3d';
                e.target.style.transition = 'all 0.3s ease-in-out';
                window.setTimeout(function() {
                    e.target.style.backgroundImage = `url('assets/album${i}')`;
                }, 150)
            });
        })
    }
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
            if (e.target.parentElement.classList.contains(`e${i}`)) {
                for (x = 1; x < 11; x++) {
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