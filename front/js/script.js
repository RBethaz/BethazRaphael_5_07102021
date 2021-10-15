main();

function main() {
  getArticles();
}

// Récupération des fiches-article depuis l'API --> http://localhost:3000/api/products

function getArticles() {                            // J'envoie une requête HTTP
    fetch("http://localhost:3000/api/products")
    .then(function (res) {                          // Je récupère le résultat de la requête
        return res.json();
    })
    .catch((error) => {
        let items = document.querySelector("#items");
        items.innerHTML = `Accès à l'API impossible...`;
    })

    // Répartition des données de l'API dans le DOM

    .then(function (resultAPI) {                    
        const articles = resultAPI;                 // Je créé ma boucle pour afficher mes articles
        console.table(articles);
        for (let article in articles) {

            // Implémentation de "a" (lien)
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);              // Je créer mon "a"
            productLink.href = `product.html?id=${resultAPI[article]._id}`;         // Redirect vers la page article

            // Implémentation de "article"
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            // Implémentation de "img" (image)
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = resultAPI[article].imageUrl;
            productImg.alt = resultAPI[article].altTxt;

            // Implémentation de "h3" (titre)
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = resultAPI[article].name;

            // Implémentation de "p" (description)
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productName");
            productDescription.innerHTML = resultAPI[article].description;
        }
      });
}