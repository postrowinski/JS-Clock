document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    const second = document.querySelector('.second-hand'),
        minutes = document.querySelector('.min-hand'),
        hours = document.querySelector('.hour-hand'),
        hand = document.querySelector('.hand'),
        getHandTransitionTime = getComputedStyle(hand).transitionDuration,
        getHandTransitionFun = getComputedStyle(hand).transitionTimingFunction;

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

        //Remove transition when any pointer it is on top (90 deg)
        function removeTrans(selectorDeg, number, selector) {
            if (selectorDeg === number) {
                selector.style.transition = 'all 0s';
            } else {
                selector.style.transition = `all ${getHandTransitionTime} ${getHandTransitionFun}`;
            }
        }

        //Rotate second pointer
        second.style.transform = `rotate(${secondDegre}deg)`;
        removeTrans(secondDegre, 90, second);

        //Rotate minutes pointer
        minutes.style.transform = `rotate(${minDegre}deg)`;
        removeTrans(minDegre, 90, minutes);

        //Rotate hours pointer
        hours.style.transform = `rotate(${hourDegre}deg)`;
        removeTrans(hourDegre, 12, hours);
    }

    setInterval(clock, 1000);
});