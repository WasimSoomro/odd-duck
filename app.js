'use strict';

let ctx = document.getElementById('myChart');

// ***** GLOBALS ******
let votingRounds = 0;
let productArray = [];

// ***** DOM WINDOWS ****
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-container');

// **** CONSTRUCTOR FUNCTION ****
function Product(name, imageExtension = 'jpg'){
  this.name = name;
  this.image = `img/${name}.${imageExtension}`;
  this.votes = 0;
  this.views = 0;
}

// **** HELPER FUNCTIONS / UTILITIES ****
function randomIndexGenerator(){
  return Math.floor(Math.random() * productArray.length);
}

let indexArray = []; 
function renderImgs(){
    while(indexArray.length < 6){
  let randomNumber = randomIndexGenerator();
  if(!indexArray.includes(randomNumber)){
  indexArray.push(randomNumber);
  }
    }

  let imageOneIndex = indexArray.shift();
  let imageTwoIndex = indexArray.shift();
  let imageThreeIndex = indexArray.shift();
  // DONE: get 2 random images on the page
  // let imageOneIndex = randomIndexGenerator();
  // let imageTwoIndex = randomIndexGenerator();
  // let imageThreeIndex = randomIndexGenerator();

  // DONE: make sure they are unique
  // while(imageOneIndex === imageTwoIndex){
  //   imageTwoIndex = randomIndexGenerator();
  // }

  // while(imageOneIndex === imageThreeIndex){
  //   imageThreeIndex = randomIndexGenerator();
  // }

  // while(imageTwoIndex === imageThreeIndex){
  //   imageThreeIndex = randomIndexGenerator();
  // }

  imgOne.src = productArray[imageOneIndex].image;
  imgOne.title = productArray[imageOneIndex].name;

  imgTwo.src = productArray[imageTwoIndex].image;
  imgTwo.title = productArray[imageTwoIndex].name;

  imgThree.src = productArray[imageThreeIndex].image;
  imgThree.title = productArray[imageThreeIndex].name;

  // DONE: Increase the product views
  productArray[imageOneIndex].views++;
  productArray[imageTwoIndex].views++;
  productArray[imageThreeIndex].views++;
}

function renderChart() {
  let productNames = [];
  let productViews = [];
  let productVotes = [];

  for(let i = 0; i< productArray.length; i++){
    productNames.push(productArray[i].name);
    productViews.push(productArray[i].views);
    productVotes.push(productArray[i].votes);
  }
  
  let chartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Views',
        data: productViews,
        borderWidth: 1,
        backgroundColor: 'silver',
        borderColor: 'blue'
      }, 
      {
        label: '# of Votes',
        data: productVotes,
        borderWidth: 1,
        backgroundColor: 'blue',
        borderColor: 'silver'
      }
    
    ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  new Chart(ctx, chartObj);
}
// **** EVENT HANDLERS ****
function handleImgClick(event){

  // DONE: Identify the image that was clicked
  let imageClicked = event.target.title;
  
  // TODO: Increase the vote on that image
  for(let i = 0; i < productArray.length; i++){
    if(imageClicked === productArray[i].name){
      productArray[i].votes++;
  
      // TODO: increment the voting round
      votingRounds++;
  
      // TODO: generate new images
      renderImgs();
    }
  }
  // TODO: once voting are done, we want to remove the ability to click
  if(votingRounds === 25){
    imgContainer.removeEventListener('click', handleImgClick);
    let stringifiedProducts = JSON.strigify(productArray);
    localStorage.setItem('myPorducts', stringifiedProducts);
  }
}

function handleShowResults(){
  console.log(votingRounds)

  if(votingRounds === 25){
    renderChart();
    // for(let i = 0; i < productArray.length; i++){
    //   let productListItem = document.createElement('li');

    //  productListItem.textContent = `${productArray[i].name} - Votes: ${productArray[i].votes} & Views: ${productArray[i].views}`;

    //   resultsList.appendChild(productListItem);
    }
    resultBtn.removeEventListener('click', handleShowResults);
  }

// **** EXECUTABLE CODE *****
let retrievedProducts = localStorage.getItem('myProducts');
let parsedProducts = JSON.parse(retrievedProducts);

if(retrievedProducts){
productArray = parsedProducts;
} else {
let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogDuck = new Product('dogDuck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let petSweep = new Product('petSweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let sweep = new Product('sweep', 'png');
let tantrum = new Product('tantrum');
let waterCan = new Product('waterCan');
let wineGlass = new Product('wineGlass');

productArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tantrum, waterCan, wineGlass);
}
renderImgs();

imgContainer.addEventListener('click', handleImgClick);
resultBtn.addEventListener('click', handleShowResults);