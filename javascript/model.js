/**
 * Created by ilan on 19/03/2017.
 */

const appData = {
  lists: [],
  members: []
};

function addNewCard() {
  // TODO: need to add new card to list.

  // don't forget to update appData
  function addCardToAppData(cardId, cardDescription, parentSectionId) {

    let tempCard = {
      id: `${cardId}`,
      text: `${cardDescription.textContent }`,
      members: []
    };
    console.log(tempCard);
    for (let list of appData.lists) {
      if (list.id === parentSectionId) {

        list.tasks.push(tempCard);
      }
    }
  }
}

function getMembersFromData() {
  return appData.members;
}

function addCardToList(title, cardData) {


}
