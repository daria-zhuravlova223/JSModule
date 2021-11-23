let event1 = window.document.getElementsByClassName("event")[0];
console.log(event1);
let addButton = window.document.getElementsByClassName("add-btn")[0];
console.log(addButton);
addButton.addEventListener("click", event=>{
    event1.classList.toggle("hidden");
    event.preventDefault();
});