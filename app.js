document.addEventListener('DOMContentLoaded', function (event) {
    'use strict';
    const second = document.querySelector('.second-hand'),
        minutes = document.querySelector('.min-hand'),
        hours = document.querySelector('.hour-hand'),
        hand = document.querySelector('.hand'),
        getHandTransition = getComputedStyle(hand).transition;

    function clock() {
        const now = new Date();

        //Seconds
        const getSeconds = now.getSeconds();
        const secondDegre = ((getSeconds / 60) * 360) + 90;

        //Minutes
        const getMins = now.getMinutes();
        const minDegre = ((getMins / 60) * 360) + 90;

        //Hours
        const getHours = now.getHours();
        const hourDegre = ((getHours / 12) * 360) + 90;
        
        //Randomize 6 chars hex color
        function randomizeColor() {
            const chars = '0123456789abcdef';
            let color = '#';
            
            for (var i = 0; i < 6; i++) {
                let setChar = chars[Math.floor(Math.random() * chars.length)];
                color += setChar;
            }
            return color;
        }
        
        //Remove transition when any pointer it is on top (90 deg)
        function removeTrans(selectorDeg, number, selector) {
            if (selectorDeg === number) {
                selector.style.transition = `all 0s`;
            } else {
                selector.style.transition = getHandTransition;
            }
        }
        
        //Rotate and change background color SECOND ponter
        second.style.transform = `rotate(${secondDegre}deg)`;
        second.style.background = randomizeColor();
        removeTrans(secondDegre, 90, second);

        //Rotate MINUTES pointer
        minutes.style.transform = `rotate(${minDegre}deg)`;
        removeTrans(minDegre, 90, minutes);

        //Rotate HOURS pointer
        hours.style.transform = `rotate(${hourDegre}deg)`;
        removeTrans(hourDegre, 12, hours);
    }
    
    clock();
    setInterval(clock, 1000);
});