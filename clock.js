function init() {
    setInterval(getTime,1000);
}
init();
const time = document.querySelector(".time"),
realTime = time.querySelector("#realTime");

function getTime() {
    let date = new Date();
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();

    realTime.innerText =
        `${hours <10 ? `0${hours}` : hours}:${minutes<10? `0${minutes}` : minutes}:${seconds<10 ? `0${seconds}` : seconds}`;


}