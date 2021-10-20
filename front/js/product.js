// Récupération des paramètres depuis l'URL                                                     // ---------- ↓↓↓↓↓ Commentaires persos ↓↓↓↓↓ ----------

let str = window.location.href;                                                                 // ---------- window.location.href indique l'URL actuelle ----------       
let url = new URL(str);
let idProduct = url.searchParams.get("id");                                                     // ---------- Je récupère mon id via URLSearchParams pour afficher mon article ----------
console.log(idProduct);


// Interroger l’API pour récupérer les détails du produit

getArticle();

function getArticle() {                                                                     
    fetch("http://localhost:3000/api/products/" + idProduct)                                    // ---------- J'envoie une requête HTTP ----------
    .then(function (res) {                                                                      // ---------- Je récupère le résultat de la requête ----------
        return res.json();
    })
    .catch((error) => {
        console.log("Accès à l'API impossible... Déso frérot !!!");
    })


// Récupération des données de l'API dans le DOM --> Affichage des données des articles

    .then(articlesResult => {
        const article = articlesResult;                                                         // ---------- Fonction anonyme --> = function(articlesResult) ... ----------
        console.table(article);                                                                 // ---------- Je récupère mes articles sous forme de tableau ----------


        // Création + affichage de l'image

        let productImg = document.createElement("img");                                         // ---------- Je crée mon "img" (image) ----------
        document.querySelector(".item__img").appendChild(productImg);
        productImg.src = article.imageUrl;                                                      // ---------- J'affiche l'image de l'article ----------
        productImg.alt = article.altTxt;                                                        // ---------- Je rapatrie le texte alternatif de l'image de l'article ----------


        // Affichage du nom

        let productName = document.getElementById('title');
        productName.innerHTML = article.name;                                                   // ---------- J'affiche le nom de l'article ----------                                             


        // Affichage du prix

        let productPrice = document.getElementById('price');
        productPrice.innerHTML = article.price;                                                 // ---------- J'affiche le prix de l'article ----------


        // Affichage de la description

        let productDescription = document.getElementById('description');
        productDescription.innerHTML = article.description;                                     // ---------- J'affiche la description de l'article ----------


        // Création du selecteur de couleur + Affichage de la couleur choisie

        const selectedColor = document.querySelector("#colors");
        const selectedQuantity = document.querySelector("#quantity");

        
        article.colors.forEach(color => {
            let productColors = document.createElement("option");                               // ---------- Je crée mon selecteur de couleur ----------
            document.querySelector("#colors").appendChild(productColors);
            productColors.value = color;
            productColors.innerHTML = color;
        })

        // Gestion du panier

        const sendToCartBtn = document.querySelector("#addToCart");                             // ---------- Je sélectionne mon bouton "Ajouter au panier" ----------


        // Conditions couleur + quantité entre 1 et 100

        sendToCartBtn.addEventListener("click", (event) => {                                    // ---------- Je réagis au click sur le bouton ----------
            if (selectedQuantity.value > 0 && selectedQuantity.value <=100 && selectedColor.value != 0){

        let colorChoice = selectedColor.value;
        let quantityChoice = selectedQuantity.value;


        // Récupération des options de l'article + ajout au panier

        let articleOptions = {                                                                  // ---------- Je crée mon Array "options de l'article" ----------
            articleID: idProduct,
            articleColor: colorChoice,
            articleQuantity: quantityChoice,
            articleName: article.name,
            articlePrice: article.price,
            articleDesc: article.description,
            articleImg: article.imageUrl,
            articleImgAlt: article.altTxt
        };


        // Initialisation du local storage

        let localStorageArticle = JSON.parse(localStorage.getItem("produit"));


        // Pop-up de confirmation

        const popupConfirmation = () => {                                                       // ---------- Je crée ma pop-up de confirmation d'ajout au panier ----------
            if(window.confirm(`Votre commande de ${quantityChoice} ${article.name} ${colorChoice} à bien été ajoutée au panier
    Pour consulter votre panier, cliquez sur OK`)){
                window.location.href ="cart.html";
            }
        }


        //Importation dans le local storage


            // --> Le panier comporte déjà au moins 1 article

            if (localStorageArticle) {
            const resultFind = localStorageArticle.find(
                (article) => article.articleID === idProduct && article.articleColor === colorChoice
                );
            

            // --> Le produit ajouté est déjà dans le panier

                if (resultFind) {
                    resultFind.articleQuantity = parseInt(articleOptions.articleQuantity) + parseInt(resultFind.articleQuantity);


            // --> Le produit commandé n'est pas dans le panier

                } else {
                    localStorageArticle.push(articleOptions);
                }
                console.table(localStorageArticle);
                localStorage.setItem("produit", JSON.stringify(localStorageArticle));
                popupConfirmation();

            // --> Le panier est vide

            } else {
                localStorageArticle =[];
                localStorageArticle.push(articleOptions);
                localStorage.setItem("produit", JSON.stringify(localStorageArticle));
                console.table(localStorageArticle);
                popupConfirmation();
            }}
        });
    });
}
