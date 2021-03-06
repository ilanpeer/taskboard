/**
 * Created by NEXUS on 26/02/2017.
 */

/**
 * ---------------------Model (data manipulation)-------------------------
 */

const appData = {
  lists: [],
  members: []
};
const isAjaxReady = [];
let taskCounter = 0;

getAppData();

function getAppData() {
  getBoardData();
  getMembersData();
}

function getBoardData() {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', xhrBoardLoadHandler);

  xhr.open('GET', 'assets/board.json');
  xhr.send();
}
function getMembersData() {
  const xhr2 = new XMLHttpRequest();
  xhr2.addEventListener('load', xhrMemLoadHandler);

  xhr2.open('GET', 'assets/members.json');
  xhr2.send();
}

function xhrMemLoadHandler(event) {
  const myXhr = event.target;
  const contentType = myXhr.getResponseHeader('content-type');

  let data;
  if (contentType.includes('json')) {
    data = JSON.parse(myXhr.response);
  }
  else {
    data = myXhr.response;
  }
  appData.members = data.members;
  for (const appDataMem of appData.members) {
    appDataMem.relatedCards = [];
    appDataMem.relatedCardsId = [];
  }

  //
  //
  updateAjaxState();
}
function xhrBoardLoadHandler(event) {
  const myXhr = event.target;
  const contentType = myXhr.getResponseHeader('content-type');

  let data;
  if (contentType.includes('json')) {
    data = JSON.parse(myXhr.response);
  }
  else {
    data = myXhr.response;
  }

  appData.lists = data.board;
  updateAjaxState();
}

function updateAjaxState() {
  isAjaxReady.push('true');

  if (isAjaxReady.length === 2) {
    initPageByHash();
  }
}

// members
function addNewMemberToAppData(newUser) {
  const newAppDataMember = {
    name: newUser
  };
  newAppDataMember.id = uuid();
  const id = newAppDataMember.id;
  appData.members.push(newAppDataMember);
  return id;
}

function deleteMemberFromAppData(index) {
  appData.members.splice(index, 1);
}

function editMemberNameInAppData(appDataRelevantMember, newName) {
  appDataRelevantMember.name = newName;
}

//list
function newListAddedToAppData(id) {
  const newList = {
    title: 'New list',
    tasks: [],
    id: id
  };
  appData.lists.push(newList);
}

function AppDataListTitleEdit(id, newName) {
  let appDataRelevantList = appData.lists.find((list) => {
    return list.id === id;
  });

  appDataRelevantList.title = newName;
}

function deleteListFromAppData(id) {
  let appDataRelevantList = appData.lists.find((list) => {
    return list.id === id;
  });
  const index = appData.lists.indexOf(appDataRelevantList);
  appData.lists.splice(index, 1);
}

//card
function addMemberRelatedCardNumbersToAppData(appDataMem, taskCounter, id) {
  appDataMem.relatedCards.push(taskCounter);
  appDataMem.relatedCardsId.push(id);
}

/**
 * --------------------VIew (UI manipulation)-------------------
 */

// no hash checked + corrected => create UI function was called.
function initPageByHash() {
  if (window.location.hash === '') {
    window.location.hash = '#board';
  }
  changeMainView();
}

//---------------------creating basic UI--------------------------------------
window.addEventListener('hashchange', changeMainView);

function changeMainView() {
  const hash = window.location.hash;
  const navbar = document.querySelector('.navbar-nav');
  const main = document.querySelector('main');

  if (hash === '#board') {
    main.innerHTML = `<button class="add-list panel panel-info panel-heading" id="list-btn"><h3 class="panel-title">Add a list...</h3>
    </button>
    <div class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Edit card</h4>
          </div>
          <div class="modal-body">
            <form class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-2 control-label">Card text:</label>
                <div class="col-sm-10">
                  <textarea class="form-control card-text" rows="3"></textarea>
                  <span class="relevent-card-number"></span>
                  <span class="relevent-list-title"></span>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">Move to:</label>
                <div class="col-sm-10">
                  <select class="form-control lists-options">
                    
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">Members:</label>
                <div class="col-sm-10">
                  <div class="panel panel-default panel-for-members">
                    <div class="panel-body card-members-list">
                      
                    </div>

                  </div>
                </div>
              </div>
            </form>
            <button type="button" class="btn btn-danger delete-card-btn">Delete card</button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default close-modal-btn" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary save-changes-btn">Save changes</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->`;
    navbar.innerHTML = `<li class="active board-btn"><a href="#board">Board <span class="sr-only">(current)</span></a></li><li class="members-btn"><a href="#members">Members</a></li>`;
    // initListsFromData(appData.lists);

    let addListBtn = document.getElementById('list-btn');
    addListBtn.addEventListener('click', addList);

    const modal = document.querySelector('.modal');
    const xBtn = modal.querySelector('span');
    const closeEditBtn = modal.querySelector('.close-modal-btn');
    const saveChangesBtn = modal.querySelector('.save-changes-btn');
    const deleteCardBtn = modal.querySelector('.delete-card-btn');

    closeEditBtn.addEventListener('click', editModalHide);
    xBtn.addEventListener('click', editModalHide);
    saveChangesBtn.addEventListener('click', editCardSaved);
    deleteCardBtn.addEventListener('click', deleteCard);


// loop over the lists
    for (const list of appData.lists) {
      addList(list);
    }
  }

  if (hash === '#members') {
    navbar.innerHTML = `<li class="board-btn"><a href="#board">Board </a></li><li class="members-btn active"><a href="#members">Members<span class="sr-only">(current)</span></a></li>`;
    main.innerHTML = `<section id="member-section">
  <h1>Taskboard Members</h1>
  <ul class="list-group members-group">
    <li class="list-group-item add-member input-group-lg">
      <input type="text" maxlength="30" placeholder="Add new member" class="add-member-input form-control">
      <button type="button" class="btn btn-primary add-member-btn" data-toggle="button" aria-pressed="false" autocomplete="off">
        Add
      </button>
    </li>
  </ul>
</section>`;

    initMembersFromData(appData.members);
  }
  console.log(appData);
}

function addList(list) {
  let title = list.title || 'New list';
  let id = list.id || uuid();

  const listTemplate = `<div class="list panel panel-default" data-id="${id}">
      <div class="list-header panel-heading">
        <h3 class="panel-title" >${title}</h3>
        <input type="text" maxlength="30">
        <div class="dropdown">
          <button class="list-arrow btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li class="delete-list"><a href="#">Delete List</a></li>
          </ul>
        </div>
      </div>
      <div class="panel-body">
  <ul class="card-list">
  </ul>
  </div>
  <button class="card-btn add-card panel-footer">Add a card...</button>
</div>`;

  const addListBtn = document.getElementById('list-btn');
  let parent = addListBtn.closest('main');
  let helper = document.createElement('div');
  helper.innerHTML = listTemplate;

  const newList = parent.insertBefore(helper.firstChild, addListBtn);
  const addCardBtn = newList.querySelector('.card-btn');
  addCardBtn.addEventListener('click', addEmptyNewCard);

  initListTitles();

  if (list.title) {
    if (list.tasks.length > 0) {
      for (const task of list.tasks) {
        addCard(task, newList);
      }
    }
  }
// // loop over list.tasks
//   for (const task of list.tasks) {
//     addCard(task, newList);
//   }

  if (!list.title) {
    newListAddedToAppData(id);
  }
}

function initListTitles(targetList) {
  const targetParent = targetList || document;

  // const addCardBtn = targetParent.getElementsByClassName('card-btn');
  // // for (const card of addCardBtn) {
  // //   card.addEventListener('click', function (e) {
  // //     const emptyCard = {
  // //       "text": "",
  // //       "members": []
  // //     };
  // //     addCard(emptyCard, e.target.closest('.list'));
  // //   });
  // // }

  const titleElem = targetParent.querySelectorAll('.list-header h3');
  for (const title of titleElem) {
    title.addEventListener('click', titleClickHandler);

  }
  const titleInputElem = targetParent.querySelectorAll('.list-header input');
  for (const titleInput of titleInputElem) {
    titleInput.addEventListener('keydown', titleInputKeyHandler);
    titleInput.addEventListener('blur', titleInputBlurHandler);
  }

  const titleEditElem = targetParent.querySelectorAll('.list-arrow');
  for (const titleEdit of titleEditElem) {
    titleEdit.addEventListener('click', titleDeleteClickHandler);
  }

  const EditBtnElem = targetParent.querySelectorAll('.delete-list');
  for (const EditBtn of EditBtnElem) {
    EditBtn.addEventListener('click', deleteListHandler);
  }
}

function titleClickHandler() {

  const target = event.target;
  target.style.display = 'none';
  const inputElm = target.parentNode.querySelector('input');
  inputElm.value = target.textContent;
  inputElm.style.display = 'inline-block';
  inputElm.focus();
}

function titleInputKeyHandler() {
  const target = event.target;
  const list = target.closest('.list');
  const id = list.getAttribute('data-id');
  if (event.keyCode === 13) {
    const value = event.target.value;
    const titleElm = target.parentNode.querySelector('h3');

    AppDataListTitleEdit(id, value);
    titleElm.innerHTML = value;
    target.style.display = 'none';
    titleElm.style.display = 'inline-block';
  }
}

function titleInputBlurHandler() {
  const target = event.target;
  const list = target.closest('.list');
  const id = list.getAttribute('data-id');
  const value = target.value;
  const titleElm = target.parentNode.querySelector('h3');
  AppDataListTitleEdit(id, value);
  titleElm.innerHTML = value;
  target.style.display = 'none';
  titleElm.style.display = 'inline-block';
}

function titleDeleteClickHandler() {
  const target = event.target;
  const editElm = target.closest('.dropdown').querySelector('.dropdown-menu');
  editElm.style.display = 'inline-block';
  const parentElm = target.parentNode;
  parentElm.blur();
  editElm.focus();
}

function deleteListHandler() {
  const target = event.target;
  const list = target.closest('.list');
  const id = list.getAttribute('data-id');
  const titleElm = target.closest('.list-header').querySelector('h3');
  const listName = titleElm.innerHTML;
  let answer = confirm(`Deleting ${listName} list. Are you sure?`);

  const listElm = target.closest('.list');
  if (answer) {
    listElm.parentNode.removeChild(listElm);
    deleteListFromAppData(id);

  } else {
    const editElm = listElm.querySelector('.dropdown-menu');
    editElm.style.display = 'none';
  }
}

function addCard(task, target) {
  let ulElm = target.querySelector('.card-list');
  let helper = document.createElement('div');
  let newCard;
  const idTask = task.id;

  if (!task.taskCounter) {
    taskCounter++;
    task.taskCounter = taskCounter;
    helper.innerHTML = `<li class="card taskCounter-${taskCounter}" data-id="${idTask}">
      <button type="button" class="edit-card btn btn-info btn-xs" data-toggle="modal" data-target="#myModal">Edit card</button>
      <p class="card-content">${task.text}</p>
      <div class="member-list-on-card"></div>
  </li>`;

    newCard = ulElm.appendChild(helper.querySelector('.card'));
    const memberList = newCard.querySelector('div');
    const members = task.members;

    if (members.length > 0) {
      for (let mem of members) {
        for (const appDataMem of appData.members) {
          if (mem.id == appDataMem.id) {
            addMemberRelatedCardNumbersToAppData(appDataMem, taskCounter, idTask);
          }
        }
        const memberName = mem;
        const nameArray = mem.split(' ');
        const memId = mem.id;

        const inital = nameArray[0].split('')[0] + nameArray[1].split('')[0];

        memberList.innerHTML += `<span class="member-inital-on-card label label-primary" title="${memberName}" data-id="${memId}">${inital}</span>`;
      }
    }
  }
  else {
    cardNumber = task.taskCounter;
    helper.innerHTML = `<li class="card taskCounter-${cardNumber}">
      <button type="button" class="edit-card btn btn-info btn-xs" data-toggle="modal" data-target="#myModal">Edit card</button>
      <p class="card-content">${task.text}</p>
      <div class="member-list-on-card"></div>
  </li>`;

    newCard = ulElm.appendChild(helper.querySelector('.card'));
    const memberList = newCard.querySelector('div');
    const members = task.members;

    if (members.length > 0) {
      for (let mem of members) {
        for (const appDataMem of appData.members) {
          if (mem == appDataMem.name && !appDataMem.relatedCards.includes(cardNumber)) {
            appDataMem.relatedCards.push(cardNumber);
          }
        }
        const memberName = mem;
        const nameArray = mem.split(' ');

        const inital = nameArray[0].split('')[0] + nameArray[1].split('')[0];

        memberList.innerHTML += `<span class="member-inital-on-card label label-primary" title="${memberName}">${inital}</span>`;
      }
    }
  }

  let editBtn = newCard.querySelector('.edit-card');
  editBtn.addEventListener('click', editModalShow);
}

function addEmptyNewCard(event) {
  const list = event.target.closest('.list');
  let ulElm = list.querySelector('.card-list');
  let helper = document.createElement('div');

  helper.innerHTML = `<li class="card taskCounter-${taskCounter}">
      <button type="button" class="edit-card btn btn-info btn-xs" data-toggle="modal" data-target="#myModal">Edit card</button>
      <p class="card-content">?</p>
      <div class="member-list-on-card"></div>
  </li>`;

  const newCard = ulElm.appendChild(helper.querySelector('.card'));
  let editBtn = newCard.querySelector('.edit-card');
  editBtn.addEventListener('click', editModalShow);

  const cardData = {
    text: '?',
    members: [],
    taskCounter: taskCounter
  };


  const title = list.querySelector('.panel-title').textContent;
  let appDataRelevantList = appData.lists.find((list) => {
    return list.title === title;
  });

  appDataRelevantList.tasks.push(cardData);
}

function editModalShow() {
  const modal = document.querySelector('.modal');
  modal.style.display = 'block';
  modal.style.opacity = 1;

  const card = event.target.closest('.card');
  const getCardNumber = card.classList.value.split('-');
  const cardNumber = Number(getCardNumber[1]);
  const list = card.closest('.list');
  const listTitle = list.querySelector('.panel-title').textContent;
  const editContent = modal.querySelector('.card-text');
  const moveToList = modal.querySelector('.lists-options');
  const lists = appData.lists;
  modal.querySelector('.relevent-card-number').innerHTML = cardNumber;
  modal.querySelector('.relevent-list-title').innerHTML = listTitle;
  for (const list of lists) {
    if (list.title === listTitle) {
      moveToList.innerHTML += `<option value="${list.title}" selected>${list.title}</option>`;
    }
    else {
      moveToList.innerHTML += `<option value="${list.title}">${list.title}</option>`;
    }
  }
  const appDataRelevantList = appData.lists.find((list) => {
    return list.title === listTitle;
  });
  const appDataRelevantCard = appDataRelevantList.tasks.find((task) => task.taskCounter === cardNumber);
  editContent.textContent = appDataRelevantCard.text;
  editContent.value = appDataRelevantCard.text;

  const cardMemberList = modal.querySelector('.card-members-list');
  const membersList = appData.members;
  for (const mem of membersList) {
    if (mem.relatedCards.includes(cardNumber)) {
      cardMemberList.innerHTML += `<div class="checkbox">
                        <label>
                          <input type="checkbox" value="${mem.name}" checked>
                          ${mem.name}
                        </label>
                      </div>`;
    }
    else {
      cardMemberList.innerHTML += `<div class="checkbox">
                        <label>
                          <input type="checkbox" value="${mem.name}">
                          ${mem.name}
                        </label>
                      </div>`;
    }
  }
}

function editModalHide() {
  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
  modal.style.opacity = 0;
  const cardMemberList = modal.querySelector('.card-members-list');
  cardMemberList.innerHTML = '';
  const moveToList = modal.querySelector('.lists-options');
  moveToList.innerHTML = '';
  const editContent = modal.querySelector('.card-text');
  editContent.textContent = '';
  editContent.value = '';

}

function editCardSaved() {
  const modal = event.target.closest('.modal');
  const cardText = modal.querySelector('.card-text');

  editModalHide();
}

function deleteCard() {
  const modal = event.target.closest('.modal');
  const cardNumber = modal.querySelector('.relevent-card-number').textContent;
  const oldListTitle = modal.querySelector('.relevent-list-title').textContent;
  const releventPageLists = document.querySelectorAll('.list');
  let releventPageListforDelete;

  for (const releventPageList of releventPageLists) {
    if (releventPageList.querySelector('.panel-title').textContent === oldListTitle) {
      releventPageListforDelete = releventPageList;
    }
  }

  const cardNumToDelete = Number(cardNumber);
  const cardsInReleventList = releventPageListforDelete.querySelectorAll('.card');
  let cardToDelete;
  for (const card of cardsInReleventList) {
    const cardNumCheck = card.classList[1];
    if (cardNumCheck.endsWith(cardNumber)) {
      cardToDelete = card;
    }
  }

  cardToDelete.remove();

  const oldAppDataList = appData.lists.find((list) => list.title === oldListTitle);

  let indexOfAppDataToDelete;
  for (const i in oldAppDataList.tasks) {
    if (oldAppDataList.tasks[i].taskCounter === cardNumToDelete) {
      indexOfAppDataToDelete = i;
    }
  }

  oldAppDataList.tasks.splice(indexOfAppDataToDelete, 1);

  editModalHide();
}


//----------------------members UI functions----------------------------

function initMembersFromData(members) {

  for (const member of members) {

    addMember(member.name, member.id);
  }
  const addMemberBtn = document.querySelector('.add-member-btn');
  addMemberBtn.addEventListener('click', addMemberByUser);

  // const liElm = event.target.closest('.member-item');
  // liElm.classList.toggle('edit-mode');
}

function addMember(member, id) {
  const membersGroup = document.querySelector('.members-group');
  const addMemberSection = document.querySelector('.add-member');
  const helper = document.createElement('div');
  helper.innerHTML += `<li class="list-group-item member-item" data-id="${id}"><h3 class="member-name">${member}</h3>
<input type="text" class="edit-input-mem form-control">
<div class="edit-member-btn">
<button type="button" class="btn btn-default cancel-edit-mem">Cancel</button>
<button type="button" class="btn btn-success save-edit-mem">Save</button>
</div>
<div class="member-btns">
<button type="button" class="btn btn-info edit-member">Edit</button>
<button type="button" class="btn btn-danger delete-member">Delete</button>
</div></li>`;
  const newMember = membersGroup.insertBefore(helper.firstChild, addMemberSection);
  newMember.querySelector('.delete-member').addEventListener('click', deleteMember);
  newMember.querySelector('.edit-member').addEventListener('click', editMemberModeToggle);
  newMember.querySelector('.cancel-edit-mem').addEventListener('click', editMemberModeToggle);
  newMember.querySelector('.save-edit-mem').addEventListener('click', editMemberSave);
}

function addMemberByUser() {
  const membersGroup = document.querySelector('.members-group');
  const addMemberSection = document.querySelector('.add-member');
  const helper = document.createElement('div');
  const newUser = document.querySelector('.add-member-input').value;

  if (newUser !== '') {
    const id = addNewMemberToAppData(newUser);
    helper.innerHTML += `<li class="list-group-item member-item" data-id="${id}"><h3 class="member-name">${newUser}</h3>
<input type="text" class="edit-input-mem form-control">
<div class="edit-member-btn">
<button type="button" class="btn btn-default cancel-edit-mem">Cancel</button>
<button type="button" class="btn btn-success save-edit-mem">Save</button>
</div>
<div class="member-btns">
<button type="button" class="btn btn-info edit-member">Edit</button>
<button type="button" class="btn btn-danger delete-member">Delete</button>
</div></li>`;
    const newMember = membersGroup.insertBefore(helper.firstChild, addMemberSection);
    document.querySelector('.add-member-input').value = '';
    newMember.querySelector('.delete-member').addEventListener('click', deleteMember);
    newMember.querySelector('.edit-member').addEventListener('click', editMemberModeToggle);
    newMember.querySelector('.cancel-edit-mem').addEventListener('click', editMemberModeToggle);
    newMember.querySelector('.save-edit-mem').addEventListener('click', editMemberSave);
    return newMember;
  }
}

function deleteMember() {
  const target = event.target;
  const liElm = target.closest('.member-item');

  const id = liElm.getAttribute('data-id');
  let appDataRelevantMember = appData.members.find((member) => {
    return member.id === id;
  });
  const index = appData.members.indexOf(appDataRelevantMember);
  deleteMemberFromAppData(index);
  liElm.remove();
}

function editMemberModeToggle() {
  const liElm = event.target.closest('.member-item');
  liElm.classList.toggle('edit-mode');
  const name = liElm.querySelector('.member-name').innerHTML;
  const editInput = liElm.querySelector('.edit-input-mem');
  editInput.value = name;
}

function editMemberSave() {
  const target = event.target;
  const liElm = target.closest('.member-item');
  const inputName = liElm.querySelector('.edit-input-mem').value;
  const name = liElm.querySelector('.member-name');
  const id = liElm.getAttribute('data-id');

  name.textContent = inputName;

  let appDataRelevantMember = appData.members.find((member) => {
    return member.id === id;
  });

  editMemberNameInAppData(appDataRelevantMember, inputName);
  console.log(appData);
  liElm.classList.toggle('edit-mode');
}


// let num = uuid.v4();
// console.log(num);
