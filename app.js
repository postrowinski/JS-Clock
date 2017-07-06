document.addEventListener('DOMContentLoaded', function (event) {
    'use strict';
    const second = document.querySelector('.second-hand'),
          minutes = document.querySelector('.min-hand'),
          hours = document.querySelector('.hour-hand'),
          hand = document.querySelector('.hand'),
          getHandTransition = getComputedStyle(hand).transition,
          getMinutesGrandier = getComputedStyle(minutes).backgroundImage,
          getHoursGrandier = getComputedStyle(hours).backgroundImage,
          setMinutesGrandier = `linear-gradient(-90deg, ${randomizeColor()} 80%, transparent 20%)`,
          setHoursGrandier = `linear-gradient(-90deg, ${randomizeColor()} 80%, transparent 20%)`;
    
    //Remove transition when any pointer it is on top (90 deg)
    function removeTrans(selectorDeg, number, selector) {
        if (selectorDeg === number) {
            selector.style.transition = `all 0s`;
        } else {
            selector.style.transition = getHandTransition;
        }
    }
    
    //Randomize hex color 
    function randomizeColor() {
        let chars = '0123456789abcdef';
        let color = '#';
        
        for (let i = 0; i < 6; i++) {
            let setChar = chars[Math.floor(Math.random() * chars.length)];
            color += setChar;
        }
        return color;
    }
        
    //Rotate clock pointer 
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
        
        //Rotate and change background color SECOND ponter
        second.style.transform = `rotate(${secondDegre}deg)`;
        second.style.background = randomizeColor();
        removeTrans(secondDegre, 90, second);

        //Rotate MINUTES pointer
        minutes.style.transform = `rotate(${minDegre}deg)`;
        if (secondDegre === 90) {
            minutes.style.backgroundImage = setMinutesGrandier;
        }
        removeTrans(minDegre, 90, minutes);

        //Rotate HOURS pointer
        hours.style.transform = `rotate(${hourDegre}deg)`;
        if (minDegre === 90) {
            hourDegre.style.backgroundImage = getHoursGrandier;
        }
        removeTrans(hourDegre, 12, hours);
    }
      
    //IFFE Randomize all starting pointer color
    (function () {
        second.style.background = randomizeColor();
        minutes.style.backgroundImage = setMinutesGrandier;
        hours.style.backgroundImage = setHoursGrandier;
    })();
    
    //invoke clock function to set degre all pointers after webpage is loaded
    clock();
    //invoke clock function for every second to change time (all three pointers) 
    setInterval(clock, 1000);
});