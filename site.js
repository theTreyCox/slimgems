console.log('Hello from site.js');

var playlistlock = false;

lockUnlockPlaylist();
generateCovers();
addCDSpinesToButtons();
flipAllAlbumCovers();
closeAlbum();
changeThemeOnButtonPress();
lockUnlockSVG();
fetchEminemNewsFromNewsAPI();
hideImageIfBlank();
makeResizableDiv('.resizable');
// add button to press and call reloadNews();


function fetchEminemNewsFromNewsAPI() {
    fetch('https://newsapi.org/v2/everything?qInTitle=eminem&sortBy=publishedAt&language=en&apiKey=e06ae732db4a4d5ea5f814b0acfe2105')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let emNews = document.querySelector('.em-news');
            let emArticles = data.articles;
            console.log(emArticles);
            emArticles.forEach(function(article) {
                emNews.insertAdjacentHTML('beforeend', `
        <div class="em-news-feed">
            <a class="article-source-link" target="_blank" href="http://www.${article.source.name}"><p class="article-source">${article.source.name}</p></a>
            <a class="article-link" target="_blank" href="${article.url}">
                <img class="article-image" src="${article.urlToImage == null ? "" : article.urlToImage}" alt=""/>
                <p class="article-title">${article.title}</p>
                <p class="article-description">${article.description}</p>
            </a>
            <p class="article-author">by ${article.author == null ? "Ken Kaniff" : article.author}</p>
            <p class="article-date">${formatDate(article.publishedAt)}</p>
        </div>
       `)
            });
        })
        .then(_ => {
            hideImageIfBlank();
        })
        .catch(error => console.error(error))
}


function hideImageIfBlank() {
    setTimeout(function() {
        let articleImage = document.querySelectorAll('.article-image');
        articleImage.forEach(function(image) {
            if (image.src == '' || image.src == 'null' || image.src == null || image.src == "" || image.src == "https://www.illustratemyalbumcover.com/slimgemz/") {
                image.style.display = 'none';
            }
        });
    }, 1000)
}

function reloadNews() {
    let emNews = document.querySelector('.em-news');
    emNews.innerHTML = "";
    fetchEminemNewsFromNewsAPI();
    hideImageIfBlank();
};


function getFormattedDate(date) {
    let start = new Date(date);
    let year = start.getFullYear();
    let month = (1 + start.getMonth()).toString().padStart(2, '0');
    let day = start.getDate().toString().padStart(2, '0');

    return month + '/' + day + '/' + year;
}

function formatDate(date) {
    let start = new Date(date);
    var hours = start.getHours();
    var minutes = start.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return start.getMonth() + 1 + "/" + start.getDate() + "/" + start.getFullYear() + "  " + "•" + " " + strTime;
}

function lockUnlockPlaylist() {
    let lockUnlockBtn = document.querySelector('.lock-unlock-playlist');
    lockUnlockBtn.onclick = () => {
        playlistlock = !playlistlock;
        lockUnlockSVG();
        console.log(playlistlock);
    }
}

function lockUnlockSVG() {
    let lockUnlockPlaylistIcon = document.querySelector('.lock-unlock-playlist');
    if (playlistlock == false) {
        lockUnlockPlaylistIcon.style.maskImage = `url('assets/unlock.svg')`;
    } else {
        lockUnlockPlaylistIcon.style.maskImage = `url('assets/lock.svg')`;
    }
}

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
    setTimeout(function() {
        element.style.backgroundImage = `url('assets/back-album${num}.png')`;
    }, 125);   
}

function flipImageToFront(element, num) {
    element.style.transform = 'rotateY(0)';
    element.style.transformStyle = 'preserve-3d';
    element.style.transition = 'all 0.3s ease-in-out';
    setTimeout(function() {
        element.style.backgroundImage = `url('assets/album${num}.png')`;
    }, 125);
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

function makeResizableDiv(div) {
    const element = document.querySelector(div);
    const resizers = document.querySelectorAll(div + ' .resizer')
    const minimum_size = 100;
    let original_width = 292;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;
    for (let i = 0; i < resizers.length; i++) {
        const currentResizer = resizers[i];
        currentResizer.addEventListener('mousedown', function(e) {
            e.preventDefault()
            original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
            original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
            original_x = element.getBoundingClientRect().left;
            original_y = element.getBoundingClientRect().top;
            original_mouse_x = e.pageX;
            original_mouse_y = e.pageY;
            window.addEventListener('mousemove', resize)
            window.addEventListener('mouseup', stopResize)
        })

        function resize(e) {
            if (currentResizer.classList.contains('bottom-right')) {
                const width = original_width + (e.pageX - original_mouse_x);
                const height = original_height + (e.pageY - original_mouse_y)
                if (width > minimum_size) {
                    element.style.width = width + 'px'
                }
                // if (height > minimum_size) {
                //     element.style.height = height + 'px'
                // }
            } else if (currentResizer.classList.contains('bottom-left')) {
                const height = original_height + (e.pageY - original_mouse_y)
                const width = original_width - (e.pageX - original_mouse_x)
                // if (height > minimum_size) {
                //     element.style.height = height + 'px'
                // }
                if (width > minimum_size) {
                    element.style.width = width + 'px'
                    element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                }
            } else if (currentResizer.classList.contains('top-right')) {
                const width = original_width + (e.pageX - original_mouse_x)
                const height = original_height - (e.pageY - original_mouse_y)
                if (width > minimum_size) {
                    element.style.width = width + 'px'
                }
                // if (height > minimum_size) {
                //     element.style.height = height + 'px'
                //     element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                // }
            } else {
                const width = original_width - (e.pageX - original_mouse_x)
                const height = original_height - (e.pageY - original_mouse_y)
                if (width > minimum_size) {
                    element.style.width = width + 'px'
                    element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                }
                //   if (height > minimum_size) {
                //     element.style.height = height + 'px'
                //     element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                //   }
            }
            let resetSidebarBtn = document.querySelector('.reset-sidebar-width');
            resetSidebarBtn.onclick = () => {
                element.style.width = '292px';
                element.style.left = window.innerWidth - 292 + 'px';
            }
        }

        function stopResize() {
            window.removeEventListener('mousemove', resize)
        }
    }
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

window.onload = function() {
    let albumsContainer = document.querySelector('.albums-container');
    albumsContainer.classList.remove('page-loading');
};

function changeThemeOnButtonPress() {
    const appleMusicEmbedWrapper = document.querySelector('.album-apple-music-embed');
    const appleMusiciFrame = document.querySelector('.apple-music-iframe');
    const appleMusicLink = document.querySelector('.apple-music-listen-link');
    const backgroundVideo = document.getElementById('bg-video');
    const backgroundVideoSource = document.querySelector('#bg-video > source');
    const pageContainer = document.querySelector('.page-container');
    const albumYear = document.querySelector('#album-year > span');
    const albumYearWrapper = document.getElementById('album-year');

    // btn 1
    albumBtn1 = document.querySelectorAll('.album-btn-1');
    
    albumBtn1.forEach(function(btn) {
        btn.onclick = () => {
            backgroundVideo.className = 'album1-styling';
            pageContainer.className = 'page-container album1-styling'
            backgroundVideo.innerHTML = `
            <source src="assets/mainbg-album1.mp4" type="video/mp4">
            `;
            albumYear.innerText = '1996';
            albumYearWrapper.className = 'album1-styling';
            if (playlistlock == false) {
                appleMusiciFrame.src = 'https://embed.music.apple.com/us/album/infinite-single/1176507476?app=music&amp;itsct=music_box&amp;itscg=30200';
                appleMusicLink.href = 'https://geo.music.apple.com/us/album/infinite-single/1176507476?itsct=music_box&itscg=30200';
                appleMusicEmbedWrapper.className = 'album-apple-music-embed album-embed album-color-1';
                appleMusicLink.className = 'apple-music-listen-link album-color-1'
                appleMusiciFrame.classList.remove('fadeInRight')
                appleMusiciFrame.classList.add('animated', 'fadeOutRight', 'faster');
                setTimeout(function() {
                    appleMusiciFrame.classList.remove('fadeOutRight');
                    appleMusiciFrame.classList.add('fadeInRight')
                }, 600)
            }
        }
    })

    // btn 2
    albumBtn2 = document.querySelectorAll('.album-btn-2');
    albumBtn2.forEach(function(btn) {
        btn.onclick = () => {
            backgroundVideo.className = 'album2-styling';
            pageContainer.className = 'page-container album2-styling'
            backgroundVideo.innerHTML = `
            <source src="assets/mainbg-album2.mp4" type="video/mp4">
            `;
            albumYearWrapper.className = 'album2-styling';
            albumYear.innerText = '1999';
            if (playlistlock == false) {
                appleMusiciFrame.src = 'https://embed.music.apple.com/us/album/the-slim-shady-lp/1440871441?app=music&amp;itsct=music_box&amp;itscg=30200';
                appleMusicLink.href = 'https://geo.music.apple.com/us/album/the-slim-shady-lp/1440871441?itsct=music_box&itscg=30200';
                appleMusicEmbedWrapper.className = 'album-apple-music-embed album-embed album-color-2';
                appleMusicLink.className = 'apple-music-listen-link album-color-2'
                appleMusiciFrame.classList.remove('fadeInRight')
                appleMusiciFrame.classList.add('animated', 'fadeOutRight', 'faster');
                setTimeout(function() {
                    appleMusiciFrame.classList.remove('fadeOutRight');
                    appleMusiciFrame.classList.add('fadeInRight')
                }, 600)
            }
        }
    })

    // btn 3
    albumBtn3 = document.querySelectorAll('.album-btn-3');
    albumBtn3.forEach(function(btn) {
        btn.onclick = () => {
            backgroundVideo.className = 'album3-styling';
            pageContainer.className = 'page-container album3-styling'
            backgroundVideoSource.src = 'assets/mainbg-album3.mp4';
            albumYearWrapper.className = 'album3-styling';
            albumYear.innerText = '2000';
            if (playlistlock == false) {
                appleMusiciFrame.src = 'https://embed.music.apple.com/us/album/the-marshall-mathers-lp/1440866782?app=music&amp;itsct=music_box&amp;itscg=30200';
                appleMusicLink.href = 'https://embed.music.apple.com/us/album/the-marshall-mathers-lp/1440866782?app=music&amp;itsct=music_box&amp;itscg=30200';
                appleMusicEmbedWrapper.className = 'album-apple-music-embed album-embed album-color-3';
                appleMusicLink.className = 'apple-music-listen-link album-color-3'
                appleMusiciFrame.classList.remove('fadeInRight')
                appleMusiciFrame.classList.add('animated', 'fadeOutRight', 'faster');
                setTimeout(function() {
                    appleMusiciFrame.classList.remove('fadeOutRight');
                    appleMusiciFrame.classList.add('fadeInRight')
                }, 600)
            }
        }
    })

    // btn 4
    albumBtn4 = document.querySelectorAll('.album-btn-4');
    albumBtn4.forEach(function(btn) {
        btn.onclick = () => {
            backgroundVideo.className = 'album4-styling';
            pageContainer.className = 'page-container album4-styling'
            backgroundVideoSource.src = 'assets/mainbg-album4.mp4';
            albumYearWrapper.className = 'album4-styling';
            albumYear.innerText = '2002';
            if (playlistlock == false) {
                appleMusiciFrame.src = 'https://embed.music.apple.com/us/album/the-eminem-show/1440903530?app=music&amp;itsct=music_box&amp;itscg=30200';
                appleMusicLink.href = 'https://geo.music.apple.com/us/album/the-eminem-show/1440903530?itsct=music_box&itscg=30200';
                appleMusicEmbedWrapper.className = 'album-apple-music-embed album-embed album-color-4';
                appleMusicLink.className = 'apple-music-listen-link album-color-4'
                appleMusiciFrame.classList.remove('fadeInRight')
                appleMusiciFrame.classList.add('animated', 'fadeOutRight', 'faster');
                setTimeout(function() {
                    appleMusiciFrame.classList.remove('fadeOutRight');
                    appleMusiciFrame.classList.add('fadeInRight')
                }, 600)
            }
        }
    })

    // btn 5
    albumBtn5 = document.querySelectorAll('.album-btn-5');
    albumBtn5.forEach(function(btn) {
        btn.onclick = () => {
            backgroundVideo.className = 'album5-styling';
            pageContainer.className = 'page-container album5-styling'
            backgroundVideoSource.src = 'assets/mainbg-album5.mp4';
            albumYear.innerText = '2004';
            albumYearWrapper.className = 'album5-styling';
            if (playlistlock == false) {
                appleMusiciFrame.src = 'https://embed.music.apple.com/us/album/encore-deluxe-version/1452852431?app=music&amp;itsct=music_box&amp;itscg=30200';
                appleMusicLink.href = 'https://geo.music.apple.com/us/album/encore-deluxe-version/1452852431?itsct=music_box&itscg=30200';
                appleMusicEmbedWrapper.className = 'album-apple-music-embed album-embed album-color-5';
                appleMusicLink.className = 'apple-music-listen-link album-color-5'
                appleMusiciFrame.classList.remove('fadeInRight')
                appleMusiciFrame.classList.add('animated', 'fadeOutRight', 'faster');
                setTimeout(function() {
                    appleMusiciFrame.classList.remove('fadeOutRight');
                    appleMusiciFrame.classList.add('fadeInRight')
                }, 600)
            }
        }
    })

    // btn 6
    albumBtn6 = document.querySelectorAll('.album-btn-6');
    albumBtn6.forEach(function(btn) {
        btn.onclick = () => {
            backgroundVideo.className = 'album6-styling';
            pageContainer.className = 'page-container album6-styling'
            backgroundVideoSource.src = 'assets/mainbg-album6.mp4';
            albumYear.innerText = '2009';
            albumYearWrapper.className = 'album6-styling';
            if (playlistlock == false) {
                appleMusiciFrame.src = 'https://embed.music.apple.com/us/album/relapse-deluxe-version/1440558626?app=music&amp;itsct=music_box&amp;itscg=30200';
                appleMusicLink.href = 'https://geo.music.apple.com/us/album/relapse-deluxe-version/1440558626?itsct=music_box&itscg=30200';
                appleMusicEmbedWrapper.className = 'album-apple-music-embed album-embed album-color-6';
                appleMusicLink.className = 'apple-music-listen-link album-color-6'
                appleMusiciFrame.classList.remove('fadeInRight')
                appleMusiciFrame.classList.add('animated', 'fadeOutRight', 'faster');
                setTimeout(function() {
                    appleMusiciFrame.classList.remove('fadeOutRight');
                    appleMusiciFrame.classList.add('fadeInRight')
                }, 600)
            }
        }
    })

    // btn 7
    albumBtn7 = document.querySelectorAll('.album-btn-7');
    albumBtn7.forEach(function(btn) {
        btn.onclick = () => {
            backgroundVideo.className = 'album7-styling';
            pageContainer.className = 'page-container album7-styling'
            backgroundVideoSource.src = 'assets/mainbg-album7.mp4';
            albumYear.innerText = '2010';
            albumYearWrapper.className = 'album7-styling';
            if (playlistlock == false) {
                appleMusiciFrame.src = 'https://embed.music.apple.com/us/album/recovery-deluxe-edition/1446625834?app=music&amp;itsct=music_box&amp;itscg=30200';
                appleMusicLink.href = 'https://geo.music.apple.com/us/album/recovery-deluxe-edition/1446625834?itsct=music_box&itscg=30200';
                appleMusicEmbedWrapper.className = 'album-apple-music-embed album-embed album-color-7';
                appleMusicLink.className = 'apple-music-listen-link album-color-7'
                appleMusiciFrame.classList.remove('fadeInRight')
                appleMusiciFrame.classList.add('animated', 'fadeOutRight', 'faster');
                setTimeout(function() {
                    appleMusiciFrame.classList.remove('fadeOutRight');
                    appleMusiciFrame.classList.add('fadeInRight')
                }, 600)
            }
        }
    })

    // btn 8
    albumBtn8 = document.querySelectorAll('.album-btn-8');
    albumBtn8.forEach(function(btn) {
        btn.onclick = () => {
            backgroundVideo.className = 'album8-styling';
            pageContainer.className = 'page-container album8-styling'
            backgroundVideoSource.src = 'assets/mainbg-album8.mp4';
            albumYear.innerText = '2013';
            albumYearWrapper.className = 'album8-styling';
            if (playlistlock == false) {
                appleMusiciFrame.src = 'https://embed.music.apple.com/us/album/the-marshall-mathers-lp2-deluxe/1440862963?app=music&amp;itsct=music_box&amp;itscg=30200';
                appleMusicLink.href = 'https://geo.music.apple.com/us/album/the-marshall-mathers-lp2-deluxe/1440862963?itsct=music_box&itscg=30200';
                appleMusicEmbedWrapper.className = 'album-apple-music-embed album-embed album-color-8';
                appleMusicLink.className = 'apple-music-listen-link album-color-8'
                appleMusiciFrame.classList.remove('fadeInRight')
                appleMusiciFrame.classList.add('animated', 'fadeOutRight', 'faster');
                setTimeout(function() {
                    appleMusiciFrame.classList.remove('fadeOutRight');
                    appleMusiciFrame.classList.add('fadeInRight')
                }, 600)
            }
        }
    })

    // btn 9
    albumBtn9 = document.querySelectorAll('.album-btn-9');
    albumBtn9.forEach(function(btn) {
        btn.onclick = () => {
            backgroundVideo.className = 'album9-styling';
            pageContainer.className = 'page-container album9-styling'
            backgroundVideoSource.src = 'assets/mainbg-album9.mp4';
            albumYear.innerText = '2017';
            albumYearWrapper.className = 'album9-styling';
            if (playlistlock == false) {
                appleMusiciFrame.src = 'https://embed.music.apple.com/us/album/revival/1440901083?app=music&amp;itsct=music_box&amp;itscg=30200';
                appleMusicLink.href = 'https://geo.music.apple.com/us/album/revival/1440901083?itsct=music_box&itscg=30200';
                appleMusicEmbedWrapper.className = 'album-apple-music-embed album-embed album-color-9';
                appleMusicLink.className = 'apple-music-listen-link album-color-9'
                appleMusiciFrame.classList.remove('fadeInRight')
                appleMusiciFrame.classList.add('animated', 'fadeOutRight', 'faster');
                setTimeout(function() {
                    appleMusiciFrame.classList.remove('fadeOutRight');
                    appleMusiciFrame.classList.add('fadeInRight')
                }, 600)
            }
        }
    })

    // btn 10
    albumBtn10 = document.querySelectorAll('.album-btn-10');
    albumBtn10.forEach(function(btn) {
        btn.onclick = () => {
            backgroundVideo.className = 'album10-styling';
            pageContainer.className = 'page-container album10-styling'
            backgroundVideoSource.src = 'assets/mainbg-album10.mp4';
            albumYear.innerText = '2018';
            albumYearWrapper.className = 'album10-styling';
            if (playlistlock == false) {
                appleMusiciFrame.src = 'https://embed.music.apple.com/us/album/kamikaze/1434770366?app=music&amp;itsct=music_box&amp;itscg=30200';
                appleMusicLink.href = 'https://geo.music.apple.com/us/album/kamikaze/1434770366?itsct=music_box&itscg=30200';
                appleMusicEmbedWrapper.className = 'album-apple-music-embed album-embed album-color-10';
                appleMusicLink.className = 'apple-music-listen-link album-color-10'
                appleMusiciFrame.classList.remove('fadeInRight')
                appleMusiciFrame.classList.add('animated', 'fadeOutRight', 'faster');
                setTimeout(function() {
                    appleMusiciFrame.classList.remove('fadeOutRight');
                    appleMusiciFrame.classList.add('fadeInRight')
                }, 600)
            }
        }
    })
}