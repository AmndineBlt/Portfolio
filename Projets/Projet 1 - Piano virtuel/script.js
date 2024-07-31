const keyContainer = document.getElementById("piano");
const key = document.getElementById("key");
const whiteNotes = document.querySelectorAll(".whiteNote");

const solfege = (key) => {
    const audio = new Audio();
    audio.src = key + ".mp3";
    audio.play();
}

document.addEventListener("keypress", (e) => {
    key.textContent = e.key;
    solfege(e.key);
});


whiteNotes.addEventListener("click", () => {
    whiteNote.style.background = "#CCC";
});