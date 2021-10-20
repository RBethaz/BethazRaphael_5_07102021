// Récupération des paramètres depuis l'URL

var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");

console.log(idProduct);

const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");


// Récupération des articles depuis l'API

getArticle();

function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then(function (res) {
        return res.json();
    })
    .catch((error) => {
        console.log("Accès à l'API impossible... Déso frérot !!!");
    })
}

// Récupération des données de l'API dans le DOM --> Affichage des données des articles

then(function (articlesResult) {
    const article = articlesResult;
    console.table(article);


    // Création de "img" (image)

    let productImg = document.createElement("img");                                         // ---------- Je crée mon "img" (image) ----------
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;                                                      // ---------- J'affiche l'image de l'article ----------
    productImg.alt = article.altTxt;                                                        // ---------- Je rapatrie le texte alternatif de l'image de l'article ----------


    // Modification de "h1"

    let productName = document.getElementById('title');
    productName.innerHTML = article.name;                                                   // ---------- J'affiche le nom de l'article ----------                                             


    // Affichage du prix

    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;                                                 // ---------- J'affiche le prix de l'article ----------


    // Affichage de la description

    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;                                     // ---------- J'affiche la description de l'article ----------


    // Choix des couleurs

    for (let colors of article.colors){
        console.table(colors);
        let productColors = document.createElement("option");                               // ---------- J'affiche mon selecteur de couleur ----------
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
})
