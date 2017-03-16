/**
 * Model
 */

const appData = {
  lists: [],
  members: []
};

// Once all data is loaded, run
getAppData();

function getAppData() {
  getBoardData();
  getMembersData();
}

// Initialize (Init) the Ajax BOARD! request.
function getBoardData() {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", boardDataHandle);
  xhr.open("GET", "assets/board.json");
  xhr.send();
}

// Function checks the type and content of data from server, and parsing the JSON data to a JS Object.
function boardDataHandle(event) {
  // Look! it's an object.
  const myXhr = event.target;
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

function getMembersData() {
  const xhrM = new XMLHttpRequest();
  xhrM.addEventListener("load", membersDataHandle);
  xhrM.open("GET", "assets/members.json");
  xhrM.send();
}

function membersDataHandle(event) {
  const myXhr = event.target;
  // const contentType = myXhr.getResponseHeader('content-type');
  const myData = JSON.parse(myXhr.responseText);
  appData.members = myData.members;
  if (isLoadingDone()) {
    initPageByHash();
  }
}

// Check if both JSON are loaded, then ok to build app UI.
function isLoadingDone() {
  if (appData.lists.length && appData.members.length) {
    return true;
  } else {
    return false;
  }
}


/**
 * Adding to appData.
 */
// function newListToAppData(UUID id) {
//   const newList = {
//     title: 'New list',
//     tasks: [],
//     id: id
//   };
//   appData.lists.push(newList);
// }

/**
 * View
 */


/**
 * Edit list title.
 */
function addListenerH3Title() {
  const listOfTitles = document.querySelectorAll('h3');

  for (const title of listOfTitles) {
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

  for (const input of listOfInputs) {
    input.addEventListener('keydown', (event) => {
      // If Enter key pressed.
      if (event.keyCode === 13) {
        const target = event.target;
        // Get value from input and close input.
        const inputValue = target.value;
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

  for (const input of listOfInputs) {
    input.addEventListener('blur', (event) => {
      const target = event.target;

      // get value from input and close input.
      const inputValue = target.value;
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
window.addEventListener('hashchange', initPageByHash);

/**
 * Main function - build UI by hash in URL.
 */
function initPageByHash() {
  const hash = window.location.hash;
  const justLists = document.querySelector('.justLists');
  const membersPage = document.querySelector('.members-page');
  const addListDiv = document.querySelector('.add-list');


  if (hash === '#board' || hash === '') {

    addListDiv.innerHTML = `<button id="btn-add-list" type="button" class="btn btn-add-list btn-default">Add a list...</button>`;

    const createNewListBtn = document.querySelector('#btn-add-list');
    createNewListBtn.addEventListener('click', createNewList);

    /**
     * BUILD MODAL .addEventListener('click', FUNCTION) here.
     */
    // const modal = document.querySelector('.modal');
    // const xBtn = modal.querySelector('span');
    // const closeEditBtn = modal.querySelector('.close-modal-btn');
    // const saveChangesBtn = modal.querySelector('.save-changes-btn');
    // const deleteCardBtn = modal.querySelector('.delete-card-btn');

    //1 modalHide - button
    //2 modalHide - X
    //3 modalSave
    //4 modalDelete
    createListTitles();
  }

  if (hash === '#members') {
    membersPage.innerHTML = `<div class="members-page hidden">
  <h2>Taskboard Members</h2>
  <ul class="list-group">
    <li class="list-group-item">Gil Tayar
      <input type="text" class="" value="" placeholder='Add new member'>
      <div class="members-btns pull-right">
        <button class="btn btn-info btn-sm">Edit</button>
        <button class="btn btn-danger btn-sm">Delete</button>
      </div>
      <div class="members-edit-btns pull-right">
        <button class="btn btn-deafult btn-sm">Cancel</button>
        <button class="btn btn-success btn-sm">Save</button>
      </div>
    </li>
    <li class="list-group-item">Dima Vishnevetsky
      <input type="text" class="" value="" placeholder='Add new member'>
      <div class="members-btns pull-right">
        <button class="btn btn-info btn-sm">Edit</button>
        <button class="btn btn-danger btn-sm">Delete</button>
      </div>
      <div class="members-edit-btns pull-right">
        <button class="btn btn-deafult btn-sm">Cancel</button>
        <button class="btn btn-success btn-sm">Save</button>
      </div>
    </li>
    <li class="list-group-item">Alex Ilyaev
      <input type="text" class="" value="" placeholder='Add new member'>
      <div class="members-btns pull-right">
        <button class="btn btn-info btn-sm">Edit</button>
        <button class="btn btn-danger btn-sm">Delete</button>
      </div>
      <div class="members-edit-btns pull-right">
        <button class="btn btn-deafult btn-sm">Cancel</button>
        <button class="btn btn-success btn-sm">Save</button>
      </div>
    </li>
    <li class="list-group-item">
      Bob
      <input type="text" class="" value="" placeholder='Add new member'>
      <div class="members-btns pull-right">
        <button class="btn btn-info btn-sm">Edit</button>
        <button class="btn btn-danger btn-sm">Delete</button>
      </div>
      <div class="members-edit-btns pull-right">
        <button class="btn btn-deafult btn-sm">Cancel</button>
        <button class="btn btn-success btn-sm">Save</button>
      </div>
    </li>
    <li class="list-group-item">
      <input type="text" class="new-member-input form-control" value="Add new member">
      <button class="btn btn-primary">Add</button>
    </li>
  </ul>
</div>`;
  }

}


// Create new list, add listeners to elements.
function createNewList(list) {
  const justListsDiv = document.getElementById('justLists');
  let title4List = list.title || 'New List';

  // Creating HTML elements of empty list. Adding a UUID to every new list.
  const listTemplate = `<div data-id='${uuid()}' class="listFull">
    <div class="titleInput"><h3>${title4List}</h3><input class="hiddenInput">
      <div class="dropdown">
        <button class="de-list btn btn-default dropdown-toggle" type="button"><span class="caret"></span></button>
        <ul class="dropdown-menu dropdown-menu-right" display="none">
          <li class="delete-link"><a href="#">Delete List?</a></li>
        </ul>
      </div>
    </div>
    <ul class="list-body panel-body"></ul>
    <div class="panel-footer">
      <button class="add-card">Add a card...</button>
    </div>
  </div>`;

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
    if (confirmMsg) {
      parent.remove();
    }
    // Close confirm, close delete list dropdown.
    else {
      dropDown.style.display = 'none';
    }
  });

  // Add listener on 'Add a Card' button, and create new card inside its own list.
  addCardBtn.addEventListener('click', (event) => {
    const cardsParent = event.target.parentNode.parentNode;

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

function createListTitles() {
  for (const list of appData.lists) {
    createNewList(list);
  }
}
/**
 * Functions call.
 */
// addListenerH3Title();
// addListenerInput();
// addListenerInputBlur();


/**
 * UUID Functions.
 */
// uuid.v1(); // -> v1 UUID
uuid.v4(); // -> v4 UUID
