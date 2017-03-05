/**
 * Create a new list, add listeners to relevant elements in that list.
 */
const createNewListBtn = document.getElementById('btn-add-list');
createNewListBtn.addEventListener('click', () => {
  const emptyList = {
    "title": "New List",
    "tasks": []
  };

  createNewList(emptyList);
});

function createNewList(list) {
  //console.log(list);

  const justListsDiv = document.getElementById('justLists');

  const listFull = document.createElement('div');
  listFull.className = 'listFull';

  const listInfo = document.createElement('div');
  listInfo.className = 'titleInput';

  const titleH3 = document.createElement('h3');
  titleH3.innerHTML = 'New List';

  const titleInput = document.createElement('input');
  titleInput.className = 'hiddenInput';

  const listDropdown = document.createElement('div');
  listDropdown.className = 'dropdown';

  const titleDropdown = document.createElement('button');
  titleDropdown.className = 'de-list btn btn-default dropdown-toggle';
  titleDropdown.setAttribute('id', 'KKK');
  titleDropdown.setAttribute('type', 'button');

  const titleCaret = document.createElement('span');
  titleCaret.className = 'caret';

  const headerUl = document.createElement('ul');
  headerUl.className = 'dropdown-menu dropdown-menu-right';

  const headerLi = document.createElement('li');
  headerLi.className = 'delete-link';

  const headerLink = document.createElement('a');
  headerLink.setAttribute('href', '#');


  listInfo.appendChild(listDropdown).appendChild(titleDropdown).appendChild(titleCaret).appendChild(headerUl).appendChild(headerLi).appendChild(headerLink);
  console.log(listInfo);

  const listBodyUl = document.createElement('ul');
  listBodyUl.className = 'list-body panel-body';

  const listFooter = document.createElement('div');
  listFooter.className = 'panel-footer';

  const addCardBtn = document.createElement('button');
  addCardBtn.className = 'add-card';
  listFooter.appendChild(addCardBtn);

  // listFull.appendChild(listBodyUl).appendChild()


  // console.log(listFull);
  // justListsDiv.innerHTML += listFull;


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

  cardsParent.querySelector('.list-body').innerHTML +=
    `<li class="card">
      <button type="button" class="btn btn-xs btn-edit-card btn-info btn-default">Edit card</button>
      <p>Get the text content of the first element in the document</p>
      <div class="cardLabels">
        <span title="666" class="label label-primary card-label">1</span>
        <span title="667" class="label label-primary card-label">2</span>
      </div>
     </li>`;
  // console.log(event);

  // add listener on "Edit Card" btn
  const editCardsBtns = document.getElementsByClassName('btn-edit-card');
  // console.log(editCardsBtns);
  editCardsBtns.addEventListener('click', showEditCardModal);
}

/**
 * Show and hide card edit modal.
 */
function showEditCardModal() {
  const cardModal = document.getElementsByClassName('edit-card-modal');
  // console.log(cardModal);
  cardModal.display.style = 'block';
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
      // show the input with focus and pick current value from h3
      target.parentNode.querySelector('input').style.display = "inline-block";
      target.parentNode.querySelector('input').focus();
      target.parentNode.querySelector('input').value = title.textContent;
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
      // target.parentNode.querySelector('h3').innerHTML = inputValue;
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
addEventTitle();
addEventInput();
addEventInputBlur();
addEventCaret();
addEventLi();


/**
 * XMLHttpRequest GET JSON
 */

// function checks the type and content of data from server, the event type is 'load'.
function xhrLoadListener(event) {
  // look! it's an object.
  const myXhr = event.target;

  // this is the raw data in that object.
  // console.log(myXhr.response);

  // btw, if you want to check the content-type from the server response-header, do this:
  // const contentType = myXhr.getResponseHeader('content-type');

  // parsing the JSON string into a workable JS object.
  const myData = JSON.parse(myXhr.responseText);

  // console.log(myData.board);

  for (let list of myData.board) {
    // console.log(list);
    createNewList(list);
  }
}

// Initialize (Init) the Ajax request.
const xhr = new XMLHttpRequest();
// Setup the request - event listener when the server starts loading data.
xhr.addEventListener("load", xhrLoadListener);
// Open the data transaction.
xhr.open("GET", "assets/board.json");
//z
xhr.send();
