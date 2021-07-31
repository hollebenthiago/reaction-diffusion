slider = document.getElementById("sliderfeed");
selector = document.getElementById("selector");
SelectValue = document.getElementById("SelectValue");
ProgressBar = document.getElementById("ProgressBar");

SelectValue.innerHTML = slider.value;

slider.oninput = function(){
    SelectValue.innerHTML = this.value;
    selector.style.left = this.value + "%";
    ProgressBar.style.width = this.value + "%";
}