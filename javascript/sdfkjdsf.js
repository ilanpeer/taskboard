var getReview = function (movie) {
  switch (movie) {
    case 'Finding Nemo':
      console.log('Cool animation, and funny turtles.');
      break;
    case 'Toy Story 2':
      console.log('Great story. Mean prospector.');
      break;
    case 'The Lion King':
      console.log('Great songs.');
      break;
    default:
      console.log("I don't know!");
  }

};

getReview('Toy Story 2');
