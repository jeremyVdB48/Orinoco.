
main()
// FONCTION ASYNCHRONE QUI RENVOI DES OBJETS AVEC LA BOUCLE FOR
async function main(){

    const articles = await recupArticles()
    
    for (let i = 0; i <articles.length; i++) {
        const article = articles[i];
        ajoutArticle(article)
    }
}

// RECUPERAION DE L'API AVEC FETCH ET UTILISATION DE PROMESSE
function recupArticles(){

    return fetch("http://localhost:3000/api/cameras")
    .then (function(response){
        return response.json()

    })

    .then(function(articles){
        return articles

    })

    .catch(function(){
        container.innerHTML += `<div class = "h1 m-5 text-danger"> serveur en maintenance ! </div>`

    })
    
};

// FONCTION QUI ENVOIE DES DONNEES A MON HTML GRACE A CREATE ELEMENT

function ajoutArticle(article){

    // CREATION D'UNE DIV POUR Y METTRE MON CONTENU

    let carteIndex = document.createElement("div");
        document.querySelector("#container").append(carteIndex);
        carteIndex.classList.add("carte");

    // CREATION DE L'ENSEMBLE DE MES ELEMENT QUI VONT ALLER DANS MA DIV

    let nameIndex = document.createElement("h2");  //AVEC CREATE ELEMENT ON CREE UN H2
        carteIndex.append(nameIndex);              //ON L'APPEL DANS MA DIV CARTE INDEX
        nameIndex.classList.add("titre_H2");       // ON CREE LA CLASS "TITRE H2"
        nameIndex.textContent = `${article.name}`; // ON APPEL AVEC TEXT CONTENT LE NOM DE L'ARTICLE 

    let imageIndex = document.createElement("img");
        carteIndex.append(imageIndex);
        imageIndex.classList.add("image_Carte_Index");
        imageIndex.src = `${article.imageUrl}`;

    let descriptionIndex = document.createElement("p");
        carteIndex.append(descriptionIndex);
        descriptionIndex.classList.add("description_index");
        descriptionIndex.textContent = `${article.description}`;

    let priceIndex = document.createElement("p");
        carteIndex.append(priceIndex);
        priceIndex.classList.add("prix_index");
        priceIndex.textContent = `${article.price/100} Euros`;

    let idIndex = document.createElement("a");
        carteIndex.append(idIndex);
        idIndex.classList.add("id_index");
        idIndex.textContent = `Infos sur le produit`;
        idIndex.href = `produit.html?id=${article._id} `;
          
}