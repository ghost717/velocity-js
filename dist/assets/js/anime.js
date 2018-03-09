var bouncing = anime({
    targets: '#bottom',
    translateY: '30px',
    duration: 300,
    loop: true,
    direction: 'alternate',
    easing: 'easeInCubic'
});

var fadeInLeft = anime({
    targets: ['.title', '.subtitle', 'article'],
    translateX: [{ value: '0vw', duration: 1000 }],
    duration: function() { return anime.random(800, 1600); },
    direction: 'alternate',
    easing: 'easeInCubic',
    loop: false,
    delay: '+=100',
    complete: function() {
        anime({
            targets: ['.subtitle'],
            translateX: '0vw',
            duration: 2000,
            delay: 300,
        });
    }
});

var fadeInRight = anime({
    targets: ['.title', '.subtitle', 'article'],
    translateX: [{ value: '0vw', duration: 1000 }],
    duration: function() { return anime.random(800, 1600); },
    direction: 'alternate',
    easing: 'easeInCubic',
    loop: false,
    delay: '+=100',
    complete: function() {
        anime({

        });
    }
});



console.log(anime.easings);

