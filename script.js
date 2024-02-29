const API_URL = `http://jsonplaceholder.typicode.com/photos/`;
let images = [];

( async () => {
    for(let i = 1; i <= 100; i++) {
        const response = await fetch(API_URL + i);
        const image    = await response.json();
        images = [...images, image];
    }
} )()

function showImages() {
    let inferior = parseInt(document.getElementById('inferior').value);
    let superior = parseInt(document.getElementById('superior').value);
    let showOne  = document.getElementById('checkbox').checked;
    let result   = document.getElementById('result');

    if(isNaN(inferior)) 
        return alert('Ingresa un limite inferior');

    if(inferior <= 1 || inferior >= 100)
        return alert('El limite inferior debe estar entre 1 y 100.');

    if( (isNaN(inferior) || isNaN(superior)) && !showOne )
        return alert('Ingresa ambos limites para poder mostrar las imagenes.');

    if( (superior <= 1 || superior >= 100) && !showOne )
        return alert('El limite superior debe estar entre 1 y 100.');

    if( (superior < inferior) && !showOne ) 
        return alert('El limite superior debe ser mayor que el inferior');

    if(showOne) {
        let index = inferior - 1;
        let image = images[index];
        result.innerHTML = `<img src="${image.url}" alt="${image.title}">`;
    } else {
        let begin = inferior - 1;
        let end   = superior - 1;
        let html  = '';
        for(let i = begin; i <= end; i++) {
            html += `<img src="${images[i].thumbnailUrl}" alt="${images[i].title}">`;
        }
        result.innerHTML = html;
    }

}