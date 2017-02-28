const listTemplate = `
  <header class="list-title">
    <span>New List</span>
    <input type="text" style="display: none">
  </header>
  <div class="cards"></div>
  <footer>
    Add a card...
  </footer>
`;

function titleClickHandler(event) {
  const target = event.target;

  // Hide the clicked title
  target.style.display = 'none';
  // Show the input next to it
  const inputElm       = target.parentNode.querySelector('input');

  inputElm.value         = target.textContent;
  inputElm.style.display = 'inline-block';
  inputElm.focus();
}

function titleInputKeyHandler(event) {
  const target = event.target;

  // Catch Enter key only
  if (event.keyCode === 13) {
    // Take the value from the input
    const value    = target.value;
    // Update the title with that value
    const titleElm = target.parentNode.querySelector('span');

    titleElm.innerHTML = value;

    // Hide the input; Show the title
    target.style.display   = 'none';
    titleElm.style.display = 'inline-block';
  }
}

function initListTitles(targetList) {
  const targetParent = targetList === undefined ? document : targetList;

  const titleElms = targetParent.querySelectorAll('.list-title span');

  for (const title of titleElms) {
    title.addEventListener('click', titleClickHandler);
  }

  const titleInputElms = targetParent.querySelectorAll('.list-title input');

  for (const titleInput of titleInputElms) {
    titleInput.addEventListener('keydown', titleInputKeyHandler);
  }
}

function addList(event) {
  const target = event.target;

  // Create a list element
  const list = document.createElement('div');

  list.className = 'list';
  list.innerHTML = listTemplate;

  // Insert it at the end of the lists
  const main = target.closest('main');

  main.insertBefore(list, target.parentNode);

  initListTitles(list);
}

const addListBtn = document.querySelector('.add-list');

addListBtn.addEventListener('click', addList);

initListTitles();
