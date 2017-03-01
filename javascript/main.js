/**
 * Create a new list, add listeners to relevant elements in that list.
 */
function createNewList() {
  const justListsDiv = document.getElementById('justLists');

  justListsDiv.innerHTML += `<div class="listFull" id="listID">
      <div class="titleInput">
        <h3>New List</h3>
        <input value="New List" class="hiddenInput">
        <div class="dropdown">
          <button class="de-list btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li class="delete-link"><a href="#">Delete List?</a></li>
          </ul>
        </div>
      </div>
      <ul class="list-body">
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
  addEventCaret();
  addEventLi();
}

/**
 * Add click listener on 'Add a Card' button, and create new card inside its own list.
 */
function addEventCard() {
  const addCardBtn = document.getElementsByClassName('add-card');

  for (const card of addCardBtn) {
    card.addEventListener('click', createNewCard);
    // console.log(addCardBtn);
  }
}
function createNewCard(event) {
  const cardsParent = event.target.parentNode.parentNode;
  // console.log(cardsParent);

  cardsParent.querySelector('.list-body').innerHTML += `<li class="card">--</li>`;
  // console.log(event);
}

/**
 * Edit list title.
 */
function addEventTitle() {
  const listOfTitles = document.querySelectorAll('h3');
  // console.log(listOfTitles);

  for (const title of listOfTitles) {
    // console.log(title);

    title.addEventListener('click', (event) => {
      const target = event.target;

      // hide the title.
      target.style.display = 'none';
      // show the input with focus.
      target.parentNode.querySelector('input').style.display = "inline-block";
      target.parentNode.querySelector('input').focus();
      // console.log(target);
    });
  }
}

/**
 * Add key listener on input field, return value.
 */
function addEventInput() {
  const listOfInputs = document.querySelectorAll('input');
  // console.log(listOfInputs);

  for (const input of listOfInputs) {
    // console.log(input);
    input.addEventListener('keydown', (event) => {
      // If Enter key pressed.
      if (event.keyCode === 13) {
        const target = event.target;
        // console.log(target);

        // Get value from input and close input.
        const inputValue = target.value;
        // console.log(target.value);
        target.style.display = 'none';

        // Show title with new value.
        target.parentNode.querySelector('h3').innerHTML = inputValue;
        target.parentNode.querySelector('h3').style.display = "block";
      }
    });
  }
}

/**
 * Add blur/focus listener on input field, return value.
 */
function addEventInputBlur() {
  const listOfInputs = document.querySelectorAll('input');
  // console.log(listOfInputs);

  for (const input of listOfInputs) {
    // console.log(input);
    input.addEventListener('blur', (event) => {
      const target = event.target;
      // console.log(target);

      // get value from input and close input.
      const inputValue = target.value;
      // console.log(target.value);
      target.style.display = 'none';

      // show title with new value.
      target.parentNode.querySelector('h3').innerHTML = inputValue;
      target.parentNode.querySelector('h3').style.display = "block";

    });
  }
}

/**
 * Delete lists - part 1: add listeners on closed dropdowns and toggle menu visibility.
 */
function addEventCaret() {
  const listOfCarets = document.getElementsByClassName('de-list');
  // console.log(listOfCarets);

  for (const caret of listOfCarets) {
    caret.addEventListener('click', (event) => {
      const target = event.target;
      // console.log(target);

      // Open dropdown menu, toggle visibility.
      const dropDown = target.parentNode.parentNode.querySelector('ul');
      // console.log(dropDown);
      if (dropDown.style.display === 'none' || !dropDown.style.display) {
        dropDown.style.display = "inline-block";
      } else {
        dropDown.style.display = 'none';
      }
    });
  }
}

/**
 * Delete lists - part 2: add listeners on opened dropdowns, get title from list, show confirm message, delete lists.
 */
function addEventLi() {
  const listDropDeletes = document.querySelectorAll('.delete-link');
  // console.log(listDropDeletes);

  for (const dropDelete of listDropDeletes) {
    dropDelete.addEventListener('click', (event) => {
      const target = event.target;
      // console.log(target);
      const parent = target.closest('.listFull');
      // console.log(parent);
      const titleText = parent.querySelector('h3').innerHTML;
      // console.log(titleText);
      const dropDown = parent.querySelector('.dropdown-menu');

      // Show confirm message with the titleText name.
      const confirmMsg = confirm(`Deleting ${titleText} list. Are you sure?`);
      // console.log(confirmMsg);

      // Delete this list.
      if (confirmMsg) {
        parent.remove();
      }
      // Close confirm, close delete list dropdown.
      else {
        dropDown.style.display = 'none';
      }
    })
  }
}

/**
 * Functions call.
 */
addEventCard();
const createNewListBtn = document.getElementById('btn-add-list');
createNewListBtn.addEventListener('click', createNewList);
addEventTitle();
addEventInput();
addEventInputBlur();
addEventCaret();
addEventLi();
