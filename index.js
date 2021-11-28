const obj = {
  title: "event 1",
  start: 0,
  duration: 25,
};

function createEvent({ title, start, duration }, color) {
  let newEvent = document.createElement("div");
  newEvent.classList.add("event");
  if (title.length > 20) {
    title = title.substring(0, 20) + "...";
  }
  newEvent.textContent = title;
  newEvent.style.height = `${duration * 2}px`;
  newEvent.style.cursor = "pointer";

  if (color) {
    newEvent.style.backgroundColor = `${color.substring(0, color.length - 2)}.5)`;
    newEvent.style.borderLeftColor = color;
  }

  if (start + duration > 300 && start < 300) {
    newEvent.style.height = `${(300 - start) * 2}px`;
  }

  let leftoverTime = start % 30;
  if (leftoverTime != 0) {
    start = start - leftoverTime;
  }
  newEvent.style.top = `${leftoverTime * 2}px`;

  newEvent.addEventListener("click", () => {
    let isDelete = window.confirm("realy remove?");
    if (isDelete) {
      newEvent.remove();
      changeWidth({title, start, duration }, newEvent, 200);
    }
  });

  //edit event 
  newEvent.addEventListener("contextmenu", (evt) => {
    evt.preventDefault();
    let title = prompt("Enter new title");
    let start = +prompt("Enter new start time");
    let duration = +prompt("Enter new duration");

    let editedEvent = createEvent({ title, start, duration });
    changeWidth({title, start, duration }, newEvent, 200);
    let elem = window.document.getElementById(start);
    elem.appendChild(editedEvent);
    newEvent.remove();
  });

  changeWidth({title, start, duration }, newEvent, 100);

  return newEvent;
}



//change width function

function changeWidth({title, start, duration}, newEvent, width) {
    let foundSections = Array.from(
        window.document.getElementsByClassName("content")
      ).filter(
        (element) =>
          element.id < start + duration + 29 && element.id >= start - 29
      );
      let allChildElements = [];
      for (let section of foundSections) {
        let childEvents = section.getElementsByClassName("event");
        allChildElements = allChildElements.concat(...childEvents);
      }
      if (allChildElements.length > 0) {
        for (let eventEl of allChildElements) {
          eventEl.style.width = `${width}px`;
          if (width == 200) {
            eventEl.style.left = `${200-width}px`;
          }
        }
        newEvent.style.width = `${width}px`;
        newEvent.style.left = `${200-width}px`;
      }
  
}

//add event button
document.getElementById("add").addEventListener("click", (event) => {
  let title = prompt("add a title");
  if (!title) {
    title = "untitled event";
  }
  let start = +prompt("add start time");
  let duration = +prompt("add duration");
  let color = prompt("add rgba color (optional)");
  if (start + duration > 540) {
    start = +prompt(
      "Error. Can't create events past 5pm. Enter a new start time!"
    );
    duration = +prompt("add duration");
  }
  let newEvent = createEvent({ title, start, duration}, color);
  // if it starts between times
  let leftoverTime = start % 30;
    if (leftoverTime != 0) {
      start = start - leftoverTime;
    }
    newEvent.style.top = `${leftoverTime * 2}px`;
  let elem = window.document.getElementById(start);
  elem.appendChild(newEvent);

  let secondCol = document.getElementById("300");
    //if it goes over to second column
  if (start + duration > 300 && start < 300) {
    duration = duration - (300 - start);
    start = 300;
    let event2 = createEvent({ title, start, duration });
    secondCol.appendChild(event2);
    newEvent.addEventListener("click", ()=>{
        event2.remove();
    })
    event2.addEventListener("click", ()=>{
        newEvent.remove();
    })
    event2.addEventListener("contextmenu", ()=>{
        event2.remove();
        newEvent.remove();
    })
    newEvent.addEventListener("contextmenu", ()=>{
        event2.remove();
    })
  }
});

//add default event
document.getElementById("0").appendChild(createEvent(obj));

// проверка на время - алерт
let intervalId = setInterval(() => {
  let date = new Date();
  let hours = date.getHours() - 8;
  let minutes = +date.getMinutes();
  let eventTime = hours * 60 + minutes;

  let foundSections = Array.from(
    window.document.getElementsByClassName("content")
  ).filter((element) => element.id == eventTime);

  for (const section of foundSections) {
    let foundEvents = section.getElementsByClassName("event");
    if (foundEvents.length != 0) {
      for (const eventEl of foundEvents) {
        if (section.id == eventTime) {
          alert(eventEl.textContent);
          clearInterval(intervalId);
        }
      }
    }
  }
}, 2000);
