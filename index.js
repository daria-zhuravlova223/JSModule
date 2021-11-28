const obj = {
    title: "fasjl",
    start: 0,
    duration: 25    
}

function createEvent({title, start, duration}, color) {
    let eventsArr= [];
    let newEvent = document.createElement("div");
    newEvent.classList.add("event");
    if (title.length > 10) {
        title = title.substring(0,10)+"...";
    }
    newEvent.textContent = title;
    newEvent.style.height = `${duration * 2}px`;
    newEvent.style.cursor = "pointer";
    if (color) {
        newEvent.style.backgroundColor = `${color.substring(0, color.length-2)}.5)`;
        newEvent.style.borderLeftColor = color;
    }
    
    let event2 = document.createElement("div");
    
    if ((start + duration)>300 && start<300) {
        newEvent.style.height = `${(300-start)*2}px`;
        duration = duration-(300-start);  
        event2.classList.add("event");
        if (title.length > 10) {
        title = title.substring(0,20)+"...";
        }
        event2.textContent = title;
        event2.style.height = `${duration * 2}px`;
        event2.style.cursor = "pointer";
        event2.addEventListener("click", () => {
            let isDelete = window.confirm("realy remove?");
            if (isDelete) {
                newEvent.remove();
                event2.remove();
                let foundSections = Array.from(window.document.getElementsByClassName("content")).filter(element =>( element.id < start+duration) && (element.id >= start));
                let allChildElements = [];
                for (let section of foundSections) {
                    let childEvents = section.getElementsByClassName("event");
                    allChildElements = allChildElements.concat(...childEvents);
                }
                if (allChildElements.length > 0){
                for (let eventEl of allChildElements) {
                    console.log("change width");
                    eventEl.style.width = `200px`;
                    eventEl.style.left = "0px";
                }
            }  
            }
            });
        eventsArr[1] = event2;
    }else{
        event2.remove();
    }
     
    newEvent.addEventListener("click", () => {
        let isDelete = window.confirm("realy remove?");
        if (isDelete) {
            newEvent.remove();
            event2.remove();
            let foundSections = Array.from(window.document.getElementsByClassName("content")).filter(element => (element.id < start+duration+29) && (element.id >= start-29));
        let allChildElements = [];
        for (let section of foundSections) {
            let childEvents = section.getElementsByClassName("event");
            allChildElements = allChildElements.concat(...childEvents);
            console.log(allChildElements)
        }
        if (allChildElements.length > 0){
            console.log(allChildElements)
        for (let eventEl of allChildElements) {
            console.log("change width");
            eventEl.style.width = `200px`;
            eventEl.style.left = "0px";
        }
    }   
        }
        });

    newEvent.addEventListener("contextmenu", (evt)=>{
        newEvent.textContent = prompt("Enter new title");
        let newStart = +prompt("Enter new start time");
        newEvent.style.height = `${+prompt("Enter new duration")*2}px`;
        newEvent.remove();
        let leftoverTime = newStart%30;
        if (leftoverTime !=0) {
            newStart = newStart-leftoverTime;
        }
        newEvent.style.top = `${leftoverTime*2}px`;
        let elem = window.document.getElementById(newStart);
            elem.appendChild(newEvent)
            evt.preventDefault();
        })

        let foundSections = Array.from(window.document.getElementsByClassName("content")).filter(element => (element.id < start+duration+29) && (element.id >= start-29));

        console.log(foundSections);
        let allChildElements = [];
        for (let section of foundSections) {
            let childEvents = section.getElementsByClassName("event");
            allChildElements = allChildElements.concat(...childEvents);
        }
        if (allChildElements.length > 0){
            console.log("allChildElements",allChildElements)
        for (let eventEl of allChildElements) {
            eventEl.style.width = "100px";
            console.log("change width");
        }
        newEvent.style.width = "100px";
        newEvent.style.left = "100px";
    } 
        
        eventsArr[0] = newEvent;


        return eventsArr;
    }


document.getElementById("add").addEventListener("click", event=>{
    let title = prompt("add a title");
    if (!title) {
        title = "untitled event";
    }
    let start = +prompt("add start time");
    let duration = +prompt("add duration");
    let color = prompt("add rgba color (optional)");
    if ((start+duration )>540) {
        start = +prompt("Error. You can't create events past 5pm. Enter a new start time!");
        duration = +prompt("add duration");
    }
    let newEvent = createEvent({ title, start, duration }, color);
    let leftoverTime = start%30;
    if (leftoverTime !=0) {
        start = start-leftoverTime;
    }
    newEvent[0].style.top = `${leftoverTime*2}px`;
    let elem = window.document.getElementById(start);
    elem.appendChild(newEvent[0]);
    let secondCol = document.getElementById("300");
    if (newEvent[1]) {
        secondCol.appendChild(newEvent[1]);
    }
})

document.getElementById("0").appendChild(createEvent(obj)[0]);


let intervalId = setInterval(() => {
    let date = new Date();
    let hours = date.getHours() - 8;
    let minutes = +date.getMinutes();
    let eventTime = hours*60 + minutes;
    
    let foundSections = Array.from(window.document.getElementsByClassName("content")).filter(element => (element.id == eventTime));
    
        for (const section of foundSections) {
            
            let foundEvents = section.getElementsByClassName("event");
            if (foundEvents.length != 0){
                for (const eventEl of foundEvents) {
                    
                    if (section.id == eventTime) {
                        
                        alert(eventEl.textContent);
                        clearInterval(intervalId);
                    }
                }
            }
        }
}, 2000);

