let sliderfeed;
let outputfeed;

let sliderkill;
let outputkill;

sliderfeed = document.getElementById('myRangeFeed');
outputfeed = document.getElementById('valueFeed');

sliderkill = document.getElementById('myRangeKill');
outputkill = document.getElementById('valueKill');

outputfeed.innerHTML = sliderfeed.value;
outputkill.innerHTML = sliderkill.value;

sliderfeed.oninput = function() {
    outputfeed.innerHTML = this.value;
}

sliderkill.oninput = function() {
    outputkill.innerHTML = this.value;
}

sliderfeed.addEventListener("mousemove", function() {
    let x = sliderfeed.value;
    let color = 'linear-gradient(90deg, rgb(66, 139, 202) ' + (x - 0.01) * 1110 + '%, rgb(214, 214, 214) ' + (x - 0.01) * 1110 + '%)'; 
    sliderfeed.style.background = color;
})

sliderkill.addEventListener("mousemove", function() {
    let x = sliderkill.value;
    let color = 'linear-gradient(90deg, rgb(66, 139, 202) ' + (x - 0.045) * 3999 + '%, rgb(214, 214, 214) ' + (x - 0.045) * 3999 + '%)'; 
    sliderkill.style.background = color;
})