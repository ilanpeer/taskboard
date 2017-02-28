const newListBtn = document.getElementById('btn-add-list');
const justLists = document.getElementById('justLists');
addEventCard();

// 'Add A List..' - Event Listener and Build Function together.

function buildDiv() {
  justLists.innerHTML += `<div class="listFull" id="listID">
      <div class="titleInput">
        <h3>Untitled</h3>
        <input value="Untitled" class="hiddenInput">
      </div>
      <ul>
        <li class="card">--</li>
      </ul>
      <div>
        <a href="#" class="add-card" type="button">Add a card...</a>
      </div>
    </div>`;
  addEventCard();
  addEventTitle();
  addEventInput();
  addEventInputBlur();

}

newListBtn.addEventListener('click', buildDiv);

// 'Add A Card..' - Event Listener (as a loop function that runs on page load) and Build Function

function addEventCard() {
  const newCard = document.getElementsByClassName('add-card');
  for (const card of newCard) {
    card.addEventListener('click', buildCard);
  }
}

function buildCard() {
  const parent = event.target.parentNode.parentNode;
  parent.querySelector('ul').innerHTML += `<li class="card">--</li>`;
}

// Edit list title

function addEventTitle() {
  const titleList = document.querySelectorAll('h3');
  // console.log(titleList);

  for (const title of titleList) {
    // console.log(title);

    title.addEventListener('click', (event) => {
      const target = event.target;

      // hide the title
      target.style.display = 'none';
      // show the input
      target.parentNode.querySelector('input').style.display = "inline-block";
      // console.log(target);
    });
  }
}
addEventTitle();


// Get value from input, listen to Enter

function addEventInput() {
  const inputList = document.querySelectorAll('input');
  // console.log(inputList);

  for (const input of inputList) {
    // console.log(input);
    input.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        const target = event.target;
        // console.log(target);

        // get value from input and close input
        const inputValue = target.value;
        // console.log(target.value);
        target.style.display = 'none';

        // show the title with new value
        target.parentNode.querySelector('h3').innerHTML = inputValue;
        target.parentNode.querySelector('h3').style.display = "inline-block";
      }
    });
  }
}
addEventInput();

function addEventInputBlur() {
  const inputList = document.querySelectorAll('input');
  // console.log(inputList);

  for (const input of inputList) {
    // console.log(input);
    input.addEventListener('blur', (event) => {
        const target = event.target;
        // console.log(target);

        // get value from input and close input
        const inputValue = target.value;
        // console.log(target.value);
        target.style.display = 'none';

        // show the title with new value
        target.parentNode.querySelector('h3').innerHTML = inputValue;
        target.parentNode.querySelector('h3').style.display = "inline-block";

    });
  }
}
addEventInputBlur();


















