'use strict';

// ALL DOM ELEMENTS

const headerTime = document.querySelector("[data-header-time]");
const menuTogglers = document.querySelectorAll("[data-menu-toggler]");
const menu = document.querySelector("[data-menu]");
const themeBtns = document.querySelectorAll("[data-theme-btn]");
const modalTogglers = document.querySelectorAll("[data-modal-toggler]");
const welcomeNote = document.querySelector("[data-welcome-note]");
const taskList = document.querySelector("[data-task-list]");
const taskInput = document.querySelector("[data-task-input]");
const modal = document.querySelector("[data-info-modal]");
let taskItem = {};
let taskRemove = {};

// store current date from build-in date object

const date = new Date();

// import task complete sound

const taskCompleteSound = new Audio("/sounds/task-complete.mp3");

/* 
*convert weekday number to weekday name
*totalParameter: 1;
*/

const getWeekDayName = function (dayNumber) {
    switch (dayNumber) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Not a valid day";
    }
};

/* 
*convert month number to month name
*totalParameter: 1;
*parameterValue: <number> 0-11
*/

const getMonthName = function (monthNumber) {
    switch (monthNumber) {
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Apr";
        case 4:
            return "May";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec";
        default:
            return "Not a valid month";

    }
};

// store weekday name, month name & month-of-day number

const weekDayName = getWeekDayName(date.getDay());
const MonthName = getMonthName(date.getMonth());
const monthOfDay = date.getDate();

// update headerTime date

headerTime.textContent = weekDayName + ", " + MonthName + " " + monthOfDay;


/* 
*toggle active class on element
*totalParanmeter: 1;
*parameterValue: <object> elementNode;
*/

const elemToggler = function (elem) {
    elem.classList.toggle("active");
}

/* 
*toggle active class on multiple elements
*totalParanmeter: 2;
*parameterValue: <object> elementNode, <function> any;
*/

const addEventOnMultiElem = function (elems, event) {
    for (let i = 0; i < elems.length; i++) {
        elems[i].addEventListener("click", event);
    }
};

/* 
*cretae taskItem elementNode and return it
*totalParameter: 1;
*parameterValue: <string> any;
*/

const taskItemNode = function (taskText) {
    const createTaskItem = document.createElement("li");
    createTaskItem.classList.add("task-item");
    createTaskItem.setAttribute("data-task-item", "");

    createTaskItem.innerHTML = `
    <button class="item-icon" data-task-remove="complete">
        <span class="check-icon"></span>
    </button>

    <p class="item-text">${taskText}</p>

    <button class="item-action-btn" aria-label="Remove task" data-task-remove>
        <ion-icon name="trash-outline" aria-hidden="true"></ion-icon>
    </button>
    
    `;

    return createTaskItem;
};

/* 
*task input validation
*totalParameter:1;
*parameterValue: <string> any
*/

const taskInputValidation = function (taskIsValid) {
    if (taskIsValid) {

        if (taskList.childElementCount > 0) {
            taskList.insertBefore(taskItemNode(taskInput.value), taskItem[0])
        } else {
            taskList.appendChild(taskItemNode(taskInput.value));
        }

        // after adding task on taskList, input field should be empty
        taskInput.value = "";

        // hide the welcome note
        welcomeNote.classList.add("hide");

        // update taskItem DOM selection
        taskItem = document.querySelectorAll("[data-task-item]");
        taskRemove = document.querySelectorAll("[data-task-remove]")

    }
    else {
        // if user pass any falsy value like(0, "", undefined, null, NaN)
        alert("please write something");
    }
};


/* 
*if there is an existng task
*the welcome note will be hidden
*/

const removeWelcomeNote = function () {
    if (taskList.childElementCount > 0) {
        welcomeNote.classList.add("hide");
    } else {
        welcomeNote.classList.remove("hidden");
    }
};

/* 
*removeTask when click on delete button or check button
*/
const removeTask = function () {

    const parentElement = this.parentElement;

    /*  
    *if the task is completed: the taskItem would be remove after 250ms
    *if deleted than taskItem remove instant
    */

    if (this.dataset.taskRemove === "complete") {

        parentElement.classList.add("complete");
        taskCompleteSound.play();

        setTimeout(function () {
            parentElement.remove();
            removeWelcomeNote();
        }, 250);

    } else {
        parentElement.remove();
        removeWelcomeNote();
    }

}

/* 
*addTask function
*/

const addTask = function () {
    taskInputValidation(taskInput.value);

    addEventOnMultiElem(taskRemove, removeTask);
}

/* 
*add keypress listener on taskInput
*/

taskInput.addEventListener("keypress", function (e) {
    switch (e.key) {
        case "Enter":
            addTask();
            break;
    }
});

// toggle active class on menu when click onmenuBtn or dropdownLink

const toggleMenu = function () {
    elemToggler(menu);
}
addEventOnMultiElem(menuTogglers, toggleMenu);

const toggleModal = function () {
    elemToggler(modal);
}

addEventOnMultiElem(modalTogglers, toggleModal);

window.addEventListener("load", function () {
    document.body.classList.add("loaded");
});

// change body background when click on any themeBtn

const themeChanger = function () {
    const hueValue = this.dataset.hue;


    document.documentElement.style.setProperty("--hue", hueValue);

    for (let i = 0; i < themeBtns.length; i++) {
        if (themeBtns[i].classList.contains("active")) {
            themeBtns[i].classList.remove("active");
        }
        this.classList.add("active");

    }
};

addEventOnMultiElem(themeBtns, themeChanger);

