const createNewListBtn = document.getElementById('btn-add-list');
createNewListBtn.addEventListener('click', () => {
  const emptyList = {
    "title": "New List",
    "tasks": []
  };
  createNewList(emptyList);
});

let appData = {};

/**
 * Create a new list, add listeners to relevant elements in that list.
 */
function createNewList(list) {
  // console.log(list);

  const justListsDiv = document.getElementById('justLists');

  // Creating HTML elements of empty list. Adding a UUID to every new list.
  const listFull = document.createElement('div');
  listFull.setAttribute('data-id', uuid());
  const listInput = document.createElement('div');

  listFull.className = 'listFull';
  listInput.className = 'titleInput';

  const titleH3 = document.createElement('h3');
  titleH3.innerHTML += `${list.title}`;

  const inputField = document.createElement('input');
  inputField.className = 'hiddenInput';

  const listDropdown = document.createElement('div');
  listDropdown.className = 'dropdown';

  const titleDropdown = document.createElement('button');
  titleDropdown.className = 'de-list btn btn-default dropdown-toggle';
  titleDropdown.setAttribute('type', 'button');

  const titleCaret = document.createElement('span');
  titleCaret.className = 'caret';

  const headerUl = document.createElement('ul');
  headerUl.className = 'dropdown-menu dropdown-menu-right';
  headerUl.setAttribute('display', 'none');

  const headerLi = document.createElement('li');
  headerLi.className = 'delete-link';

  const headerLink = document.createElement('a');
  headerLink.setAttribute('href', '#');
  headerLink.innerHTML = 'Delete List?';

  const listBodyUl = document.createElement('ul');
  listBodyUl.className = 'list-body panel-body';

  const listFooter = document.createElement('div');
  listFooter.className = 'panel-footer';

  const addCardBtn = document.createElement('button');
  addCardBtn.className = 'add-card';
  addCardBtn.innerHTML = 'Add a card...';
  listFooter.appendChild(addCardBtn);

  // Add listener to delete list dropdown, bring confirm with title name and remove list.
  titleDropdown.addEventListener('click', (event) => {
    headerUl.style.display = 'block';
  });
  headerLi.addEventListener('click', (event) => {
    const target = event.target;
    const parent = target.closest('.listFull');
    const titleText = parent.querySelector('h3').innerHTML;
    const dropDown = parent.querySelector('.dropdown-menu');
    // Show confirm message with the titleText name.
    const confirmMsg = confirm(`Deleting ${titleText} list. Are you sure?`);

    // Delete this list.
    if (confirmMsg) {
      parent.remove();
    }
    // Close confirm, close delete list dropdown.
    else {
      dropDown.style.display = 'none';
    }
  });


  // Extract list tasks from JSON/appData data.
  // console.log(appData[0].tasks[0]);


  // Add listener on 'Add a Card' button, and create new card inside its own list.
  addCardBtn.addEventListener('click', (event) => {
    const cardsParent = event.target.parentNode.parentNode;
    // console.log(cardsParent);

    cardsParent.querySelector('.list-body').innerHTML +=
      `<li class="card" data-id=${uuid()}>
      <button type="button" class="btn btn-xs btn-edit-task btn-info btn-default">Edit card</button>
      <p>Get the text content of the first element in the document</p>
      <div class="cardLabels">
        <span title="666" class="label label-primary card-label">1</span>
        <span title="667" class="label label-primary card-label">2</span>
      </div>
     </li>`;
  });

  // Appending elements to nest amongst.
  listInput.appendChild(titleH3);
  listInput.appendChild(inputField);
  listDropdown.appendChild(titleDropdown).appendChild(titleCaret);
  listDropdown.appendChild(headerUl).appendChild(headerLi).appendChild(headerLink);
  listInput.appendChild(listDropdown);

  listFull.appendChild(listInput);
  listFull.appendChild(listBodyUl);
  listFull.appendChild(listFooter);

  // Append the created list in pre-coded HTML.
  justListsDiv.appendChild(listFull);

  addListenerH3Title();
  addListenerInput();
  addListenerInputBlur();

}

// Check if both JSON are loaded, it's ok to build app UI.
function isLoadingDone() {
  if (appData.lists.length && appData.members.length) {
    console.log(appData.members.length);
    return true;
  } else {
    return false;
  }
}

/**
 * Edit list title.
 */
function addListenerH3Title() {
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
function addListenerInput() {
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
function addListenerInputBlur() {
  const listOfInputs = document.querySelectorAll('div.flexContainer input');
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
 * Add listener for hashchange (changes in the URL hash name).
 */
window.addEventListener('hashchange', (evt) => {
  initPageByHash();
});

/**
 * Main function - build the UI according to hash in URL.
 */
function initPageByHash() {
  const hash = window.location.hash;
  const navBar = document.querySelector('.navbar-nav');
  const membersPage = document.querySelector('.members-page');
  const boardPage = document.querySelector('.boards-page');
  const currentActive = navBar.querySelector('.main-nav');
  if (hash === undefined || hash !== '#Members' && hash !== '#Board') {
    console.log('--hash here--');
    window.location.hash = '#board';
  }

  if (hash === '#board') {
    console.log('ola');
    membersPage.classList.add('hidden');
    boardPage.classList.remove('hidden');
    currentActive.classList.toggle('active');
    for (let list of appData.lists) {
      createNewList(list);
    }
  }

  if (hash === '#members') {
    boardPage.classList.add('hidden');
    membersPage.classList.remove('hidden');
    currentActive.classList.toggle('active');
    // should be function of building member page.
    // createMembersPage(members-data);
  }
}


/**
 * Functions call.
 */
addListenerH3Title();
addListenerInput();
addListenerInputBlur();

/**
 * XMLHttpRequest GET JSON
 */

// Initialize (Init) the Ajax BOARD! request.
function getBoardData() {
  const xhr = new XMLHttpRequest();
// Setup the request - event listener when the server starts loading data.
  xhr.addEventListener("load", boardDataHandle);
// Open the data transaction.
  xhr.open("GET", "assets/board.json");
//z
  xhr.send();
}

// Function checks the type and content of data from server, and parsing the JSON data to a JS Object.
function boardDataHandle(event) {
  // Look! it's an object.
  const myXhr = event.target;
  // console.log(myXhr);

  // BTW, if you want to check the content-type from the server response-header, do this:
  // const contentType = myXhr.getResponseHeader('content-type');

  // Parsing the JSON string into a workable JS object.
  const myData = JSON.parse(myXhr.responseText);

  // Insert all JSON data to local object 'appData'.
  appData.lists = myData.board;

  // Checks if the board data is loaded, then creates the lists.
  if (isLoadingDone()) {
    initPageByHash();
  }
}

// Initialize (Init) the Ajax MEMBERS! request.
function getMembersData() {
  const xhrM = new XMLHttpRequest();
// Setup the request - event listener when the server starts loading data.
  xhrM.addEventListener("load", membersDataHandle);
// Open the data transaction.
  xhrM.open("GET", "assets/members.json");
//z
  xhrM.send();
}

// Function checks the type and content of data from server, and parsing the JSON data to a JS Object.
function membersDataHandle(event) {
  // Look! it's an object.
  const myXhr = event.target;
  // console.log(myXhr);

  // BTW, if you want to check the content-type from the server response-header, do this:
  // const contentType = myXhr.getResponseHeader('content-type');

  // Parsing the JSON string into a workable JS object.
  const myData = JSON.parse(myXhr.responseText);

  // Insert all JSON data to local object 'appData'.
  appData.members = myData.members;

  // Checks if the members data is loaded, then creates the lists.
  if (isLoadingDone()) {
    initPageByHash();
  }
}

// Once all data is loaded, run
function getAppData() {
  getBoardData();
  getMembersData();
}

getAppData();

/**
 * UUID Functions.
 */
uuid.v1(); // -> v1 UUID
uuid.v4(); // -> v4 UUID
// console.log(uuid.v4());
