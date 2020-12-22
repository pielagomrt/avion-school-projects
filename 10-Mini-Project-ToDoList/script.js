/*-------------------accessing html-------------------*/
let dateToday = document.querySelector('#date');
let input = document.getElementById("input");
let list = document.querySelector('ul');
let addBtn = document.querySelector('#addBtn');

/*-------------------event listeners-------------------*/
list.addEventListener('click', crossedOut);
addBtn.addEventListener('click', addItem);

/*-------------------functions-------------------*/

// current date
(function currentDate () {
  let today = new Date();
  let date = `${today.getMonth()+1} / ${today.getDate()} / ${today.getFullYear()}`;
  dateToday.textContent = date;
})();

// creating a new item
function addItem() {
  let li = document.createElement("li");
  let span = document.createElement("SPAN");
  let task = document.createTextNode(input.value);
  let x = document.createTextNode("\u00D7");

  li.appendChild(task);
  li.appendChild(span);
  span.appendChild(x);

  // appending elements
  if (input.value !== '') {
    list.appendChild(li);
  } else {
    alert("Please enter a task.");
  }
  input.value = "";
 
  // close button
  span.className = "remove";
  let removeBtn = document.querySelectorAll(".remove");
  
  removeBtn.forEach(items => items.addEventListener('click', () => {
      let itemDiv = items.parentElement;
      itemDiv.style.display = 'none';
  }));
}

// crossing out an item on the list
function crossedOut (e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('done');
  }
};