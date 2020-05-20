const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate-wealth');


let data = [];//este sera un array de objetos cuyas parametros vamos a extreaer de la API

// fetch un usuario al azar y crear fortuna
getRandomUser();
getRandomUser();
getRandomUser();
async function getRandomUser() {
    // fetch('https://randomuser.me/api/').then(res => res.json()).then(data => console.log(data));
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
    updateDOM();
}

//Dobla el dinero de las personas en el dom
function doubleMoney() {
    data = data.map((user) => {
        return {...user, money: user.money * 2}//Usamos el spread operator para accesar todos los parametros del main div luego asignamos a money que es un parametro del objecto...
    });                                         // la propiedad money la obtenemos al hacerle map al objeto user. 
    updateDOM();
}

//Ordena a los user de mayor a menor fortuna
function sortUsers() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}

//Agrega la nueva data al array 
function addData(obj) {
    data.push(obj);
}

//Calcumos el total con reduce

function calculateTotal() {
    wealth = data.reduce((acc, user) => (acc += user.money), 0);
    
    const wealthEL = document.createElement('div');
    wealthEL.innerHTML = `<h3>Fortuna Total<strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEL);
}

// filtramos solo los mayores a un millon

function onlyMill() {
    data = data.filter((user) => user.money > 1000000);

    updateDOM();
}

function updateDOM(provideData = data) {
    //clear the main div
    main.innerHTML = '<h2><strong>Persona</strong> Fortuna</h2>';

    provideData.forEach((item) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

// Formateando el numero como dinero
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67 transforma numero a dinero
}


//Even listener
addUserBtn.addEventListener('click', getRandomUser);

doubleBtn.addEventListener('click', doubleMoney);

sortBtn.addEventListener('click', sortUsers);

showMillBtn.addEventListener('click', onlyMill);

calculateBtn.addEventListener('click', calculateTotal);