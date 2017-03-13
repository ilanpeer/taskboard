/**
 * Created by ilan on 27/02/2017.
 */

// for (the setup, a comparision, the change) {
//  what you gonna do?
// }

for (var i=0; i < 10; i++) {
  console.log('i is ' + i);
}


const myList = ['Oranges', 'Apples', 'Guns'];

for (var bn=0; bn < myList.length; bn++) {
  console.log('There are ' + myList[bn] + ' in your bag');
}


function handelPages() {
  const location = window.location.hash;

  if (location === undefined || location !== '#Members' && location !== '#Board') {
    window.location.hash = '#Board';

  }
  if (location === '#Members') {
    handelMemberMaking(appData);
    selectedNavLink('member');
  }
  if (location === '#Board') {

    handelListMaking(appData.lists);
    selectedNavLink('board');

  }
}

