

//Identification:

let container = document.getElementsByClassName('container__box')[0];
let btnDivBox = document.getElementsByClassName('container__basic-btn')[0];
let joke = document.getElementsByClassName('joke__text')[0];


//Variables:

let url = 'https://api.chucknorris.io/jokes/categories';
let urlBasic = 'https://api.chucknorris.io/jokes/random'; //?category=
let urlAleatorie = 'https://api.chucknorris.io/jokes/random?category=';
let urlCategorie='';
let categoriesSelected = [];
let btnVariable;

//Functions:

function pintarBtnBasicos() {
    
    let btnNewJoke = document.createElement('button');
    let btnReset = document.createElement('button');

    btnNewJoke.classList.add('container__btn-send','container__btn');
    btnNewJoke.textContent = 'NEW JOKE';
    btnDivBox.appendChild(btnNewJoke);

    btnReset.classList.add('container__btn-reset','container__btn');
    btnReset.textContent = 'RESET';
    btnDivBox.appendChild(btnReset);

    btnReset.addEventListener('click', borrarCategories);
    btnNewJoke.addEventListener('click', enviarCategories);
}

function btnCategory() {

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(respuesta => pintarBtn(respuesta))
    .catch(error => console.log(error))
}

function pintarBtn(array) {   

    array.forEach((element, index) => {

        btnVariable = document.createElement('button');
        btnVariable.className = 'container__btn';
        btnVariable.setAttribute('id',index);
        btnVariable.textContent = element;
        container.appendChild(btnVariable);
        btnVariable.addEventListener('click',function(){anadirCategoria(element, index)});

    });
}

function anadirCategoria(categorie, index) {
    let btnSelect = document.getElementById(index);
    btnSelect.classList.add('container__btn--select');
    
        if ( categoriesSelected.includes(categorie)){
            
            btnSelect.classList.remove('container__btn--select');
            let posArrayCtegr = categoriesSelected.indexOf(categorie);
            categoriesSelected.splice(posArrayCtegr,1);
        } else{ 
            categoriesSelected.push(categorie);
        }
        urlCategorie = urlAleatorie + categoriesSelected.toString();
}

const enviarCategories = async () => {
    const url = categoriesSelected.length === 0 ? urlBasic : urlCategorie
    console.log(url)
    
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        joke.textContent = respuesta.value;
    })
    .catch(error => console.log(error)) 
}
   


function borrarCategories() {
    categoriesSelected = [];
    joke.textContent = '';
}

function jokeAleatorie() {
    fetch()
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        joke.textContent = respuesta.value;
    })
    .catch(error => console.log(error)) 
}



//Calling functions:

pintarBtnBasicos()
btnCategory(); 