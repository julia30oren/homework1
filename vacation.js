const VACATION_DOM = {
    vacationName: document.getElementById('vacationName'),
    picture: document.getElementById('picture'),
    price: document.getElementById('price'),
    fidback: document.getElementById('fidback'),
    divCards: document.getElementById('divCards'),
}

let arrayOfData = [];

function draw (inputArray) {
    clearDiv();

    for ( i=0 ; i<inputArray.length ; i++) {
        drawCard(inputArray[i])
    }
}

function clearDiv() {
    VACATION_DOM.divCards.innerHTML = '';
}

function drawCard(vacation) {
    const { divCards } = VACATION_DOM;
    const divCard = createVacationCard (vacation);
    if (!divCard) return;
    divCards.append(divCard);
}

function deleteVacation (id) {
    const index = findIndex(arrayOfData, id);
    if (id === undefined) return;
    arrayOfData.splice(index, 1)
    saveToLocalStorage("vacationData", arrayOfData)
    draw(arrayOfData);
}


function findIndex(data, CorrectVacationName) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].vacationName === CorrectVacationName) {
            return i;
        }
    }
}

function createVacationCard(vacation) {

    const { vacationName, picture, price, fidback } = vacation;
    if ( !vacationName || !picture || !price || !fidback ) return;  ///

    const cardBody = document.createElement('div');
    cardBody.id = vacationName;
    cardBody.className = "card mb-3";
    cardBody.style = "max-width: 540px; max-height: 250px;";

    const div1 = document.createElement('div');
    div1.className = "row no-gutters";

    const imgDiv = document.createElement('div');
    imgDiv.className = "col-md-4";

    const pictureDOM = document.createElement("img");
    pictureDOM.className = "card-img";
    pictureDOM.src = picture;

    const div2 = document.createElement('div');
    div2.className = "col-md-8";

    const div3 = document.createElement('div');
    div3.className = "card-body";

    const titleDOM = document.createElement('h5');
    titleDOM.id = vacationName;
    titleDOM.innerText = vacationName;
    titleDOM.className = "card-title";

    const priceDOM = document.createElement('p');
    priceDOM.className = "card-text";
    priceDOM.innerText = "Price of a vacation : " + price + "$";

    const fidbackDOM = document.createElement('div');
    fidbackDOM.className = "card-text";
    fidbackDOM.innerText = fidback;

    const deleteButton = document.createElement("Button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "btn btn-danger";
    deleteButton.addEventListener("click", deleteVacationHandler);


    div3.append(titleDOM, priceDOM, fidbackDOM);
    div2.append(div3);
    imgDiv.append(pictureDOM);
    div1.append(imgDiv,div2);
    cardBody.append(div1,deleteButton);

  return cardBody;
}

function deleteVacationHandler() {
    deleteVacation(this.parentElement.id);
}


function validateVacationName(vacationName) {
    return findIndex(arrayOfData, vacationName)
}

function saveNewVacation () {
    const { vacationName, picture, price, fidback, divCards} = VACATION_DOM;

    const result = validateVacationName(vacationName.value);
    if (result !== undefined) {
        alert ('Those kind of vacation already exists!')
        return;
    }
    arrayOfData.push(new Vacation(vacationName.value, picture.value, price.value, fidback.value,))
    saveToLocalStorage("vacationData", arrayOfData)
    draw(arrayOfData)
    divCards.reset();
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value)) 
}

function Vacation(_vacationName, _picture, _price, _fidback) {
    this.vacationName = _vacationName;
    this.picture = _picture;
    this.price = _price;
    this.fidback = _fidback;
  this.selected = false;  ///?
}

function init() {
    arrayOfData = JSON.parse(localStorage.getItem("vacationData")) || []
    draw(arrayOfData)
}

init();