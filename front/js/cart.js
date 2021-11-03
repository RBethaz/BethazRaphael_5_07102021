// Récupération depuis localStorage

let localStorageArticle = JSON.parse(localStorage.getItem("produit"));
console.table(localStorageArticle);
const cartIsEmpty = document.querySelector("#cart__items");


// --> Le panier est vide

function getCart() {
if (localStorageArticle === null || localStorageArticle == 0) {
    const emptyCart = `<p>Votre panier est vide</p>`;
    cartIsEmpty.innerHTML = emptyCart;
} 

// --> Le panier est plein

else {
    localStorageArticle.forEach(article => {
    
        // Insertion de l'élément "article"
    
        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute('article-id', article.articleID);
    
    
        // Insertion de l'élément "div --> cart__item__img"
    
        let productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart__item__img";
    
    
        // Insertion de l'image
    
        let productImg = document.createElement("img");
        productDivImg.appendChild(productImg);
        productImg.src = article.articleImg;
        productImg.alt = article.articleImgAlt;
        
    
        // Insertion de l'élément "div --> cart__item__content"
    
        let productItemContent = document.createElement("div");
        productArticle.appendChild(productItemContent);
        productItemContent.className = "cart__item__content";
    
    
        // Insertion de l'élément "div --> cart__item__content__titlePrice"
    
        let productItemContentTitlePrice = document.createElement("div");
        productItemContent.appendChild(productItemContentTitlePrice);
        productItemContentTitlePrice.className = "cart__item__content__titlePrice";
        
    
        // Insertion du titre h3
    
        let productTitle = document.createElement("h2");
        productItemContentTitlePrice.appendChild(productTitle);
        productTitle.innerHTML = article.articleName;
    
    
        // Insertion de la couleur
    
        let productColor = document.createElement("p");
        productTitle.appendChild(productColor);
        productColor.innerHTML = article.articleColor;
        productColor.style.fontSize = "18px";
    
    
        // Insertion du prix
    
        let productPrice = document.createElement("p");
        productItemContentTitlePrice.appendChild(productPrice);
        productPrice.innerHTML = article.articlePrice + " €";
    
    
        // Insertion de l'élément "div --> cart__item__content__settings"
    
        let productItemContentSettings = document.createElement("div");
        productItemContent.appendChild(productItemContentSettings);
        productItemContentSettings.className = "cart__item__content__settings";
    
    
        // Insertion de l'élément "div --> cart__item__content__settings__quantity"
    
        let productItemContentSettingsQuantity = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsQuantity);
        productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
        
    
        // Insertion de l'objet "Qté : "
    
        let productQte = document.createElement("p");
        productItemContentSettingsQuantity.appendChild(productQte);
        productQte.innerHTML = "Qté : ";
    
    
        // Insertion de la quantité
    
        let productQuantity = document.createElement("input");
        productItemContentSettingsQuantity.appendChild(productQuantity);
        productQuantity.value = article.articleQuantity;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");
    
    
        // Insertion de l'élément "div --> cart__item__content__settings__delete"
    
        let productItemContentSettingsDelete = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsDelete);
        productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
    
    
        // Insertion de "p" supprimer
    
        let productDelete = document.createElement("p");
        productItemContentSettingsDelete.appendChild(productDelete);
        productDelete.className = "deleteItem";
        productDelete.innerHTML = "Supprimer";
        productDelete.setAttribute("onclick",`deleteProduct("${article.articleID}","${article.articleColor}")`);
    }
    )
}
}
// -------------------------------------------------------------------------------


getCart();

function getTotal(){


    // Récupération du total des quantités

    let articleQuantity = document.getElementsByClassName('itemQuantity');
    let myLength = articleQuantity.length,
    articleTotalQuantity = 0;

    for (let i = 0; i < myLength; ++i) {
        articleTotalQuantity += articleQuantity[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = articleTotalQuantity;
    console.log(articleTotalQuantity);


    // Récupération du prix total

    totalPrice = 0;

    for (let i = 0; i < myLength; ++i) {
        totalPrice += (articleQuantity[i].valueAsNumber * localStorageArticle[i].articlePrice);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}
getTotal();


// Modification d'une quantité de produit

function quantityModification() {
    let quantityMod = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < quantityMod.length; k++){
        quantityMod[k].addEventListener("change" , (event) => {
            event.preventDefault();


            //Selection de l'element à modifier en fonction de son id ET sa couleur

            let quantityModif = localStorageArticle[k].articleQuantity;
            let quantityModValue = quantityMod[k].valueAsNumber;
            
            const resultFind = localStorageArticle.find((el) => el.quantityModValue !== quantityModif);

            resultFind.articleQuantity = quantityModValue;
            localStorageArticle[k].articleQuantity = resultFind.articleQuantity;

            localStorage.setItem("produit", JSON.stringify(localStorageArticle));
        
            // refresh rapide

            location.reload();
        })
    }
}
quantityModification();


// Suppression d'un produit

function deleteProduct(articleID, color) {
    localStorageArticle = localStorageArticle.filter( el => el.articleID !== articleID || el.articleColor !== color);
    localStorage.setItem("produit", JSON.stringify(localStorageArticle));

    //Alerte produit supprimé et refresh

    alert("Le produit a bien été supprimé de votre panier");
    location.reload();
}


// ----------------------------------------------------------------------------------

//Instauration formulaire avec regex

function getForm() {


    // Ajout des Regex

    let form = document.querySelector(".cart__order__form");


    //Création des expressions régulières

    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
    let entryRegExp = new RegExp("^[a-zA-Z ,.'-]+$");

    // Ecoute de la modification du prénom

    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });


    // Ecoute de la modification du nom

    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });


    // Ecoute de la modification de l'adresse

    form.address.addEventListener('change', function() {
        validAddress(this);
    });


    // Ecoute de la modification de la ville

    form.city.addEventListener('change', function() {
        validCity(this);
    });


    // Ecoute de la modification du mail

    form.email.addEventListener('change', function() {
        validEmail(this);
    });


    // Validation du prénom

    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (entryRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };


    // Validation du nom

    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (entryRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };


    // Validation de l'adresse

    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (entryRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };


    // Validation de la ville

    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (entryRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };


    // Validation du mail

    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
    }
getForm();


// Envoi des informations client sur le localStorage

function sendForm(){
    const orderBtn = document.getElementById("order");


    // Ecouter le panier

    orderBtn.addEventListener("click", (event) => {
    


        // Récupération des coordonnées du formulaire client

        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');


        // Création d'un array depuis le localStorage

        let orderProducts = [];
        for (let i = 0; i < localStorageArticle.length; i++) {
            orderProducts.push(localStorageArticle[i].articleID);
        }
        console.log(orderProducts);

        const order = {
            contact : {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: orderProducts,
        };


//         fetch("http://localhost:3000/api/products/order", {
//             method: "POST",
//             headers: {
//             "Accept": "application/json",
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ order }),
//         })
//         .then((res) => res.json())
//         .then((data) => {
//           localStorage.setItem("order", JSON.stringify(data));
//           window.location.href = "confirmation.html";
//           localStorage.removeItem("panier");
//         })
//         .catch((err) => {
//             alert ("Ca marche poooooo !!! : " + err.message);
//         });
//     });
// }

// ---------------------------------------------------------------------

         const options = {
             method: 'POST',
             body: JSON.stringify(order),
             headers: {
                 "Content-Type": "application/json"
             },  
         };
         
          fetch("http://localhost:3000/api/products/order", options)
             .then((res) => res.json())
             .then((data) => {
                 localStorage.clear();
                 localStorage.setItem("orderId", data.orderId);

                 document.location.href = "./confirmation.html";
             })
             .catch((err) => {
                alert ("Ca marche poooooo !!! : " + err.message);
             });

// ------------------------------------------------------------------------------------

        // fetch("http://localhost:3000/api/products/order", options) = {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json', 
        //         "Content-Type": "application/json" 
        //     },
        //     body: JSON.stringify(order)

        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log(data);
        //         localStorage.clear();
        //         localStorage.setItem("orderId", data.orderId);

        //         document.location.href = "confirmation.html";
        //     })
        //     .catch((err) => {
        //         alert ("Ca marche poooooo !!! : " + err.message);
        //     })
        // }

// -------------------------------------------------------------------------------------

     })
 }
 sendForm();