

//RECUPERATION DU PANIER DANS LE LOCAL STORAGE 
let cameras = JSON.parse(localStorage.getItem("panier")) ? JSON.parse(localStorage.getItem("panier")) : [];
console.log(cameras);
//EMPLACEMENT DU HTML
let container = document.querySelector(".container");

// INITIALISE LE PRIX TOTAL DU PANIER A 0
let prixPanier = 0;

//RECUPERATION ID PRODUIT
let produitPanier = [];

//FONCTION CALCUL PRIX TOTAL DU PANIER ET ENVOIE AU LOCAL STORAGE
function prixTotalPanier(camera){
  prixPanier += camera.quantity * camera.price ;
  //AFFICHE PRIX TOTAL DU PANIER // ENVOI AU LOCALSTORAGE
  let prixTotal = document.querySelector(".prixTotal").textContent  = "Prix total de votre panier : " + prixPanier/100 + " Euros ";
  localStorage.setItem('prixTotal', JSON.stringify(prixTotal));
};

// SI MON PANIER ES VIDE J'AFFICHE ET J'ENLEVE LE FORMULAIRE ET LA DIV VIDER MON PANIER
if(cameras === null || cameras == 0){
  container.innerHTML += ` <div class = "h1 m-5"> Votre panier es vide ! </div>`;
  document.querySelector("#form").remove();
  supprimerPanier.remove()
}


//BOUCLE FOREACH SUR LE PANIER
cameras.forEach((camera, i) => {
  
  let cartePanier = document.createElement("div");
    document.querySelector("#container").append(cartePanier);
    cartePanier.classList.add("carte_panier");

  let imagePanier = document.createElement("img");
    cartePanier.append(imagePanier);
    imagePanier.classList.add("image_panier");
    imagePanier.src = `${camera.imageUrl}`;

  let namePanier = document.createElement("h3");
    cartePanier.append(namePanier);
    namePanier.classList.add("name_panier");
    namePanier.textContent = `${camera.name}`;

  let prixPanier = document.createElement("div");
    cartePanier.append(prixPanier);
    prixPanier.classList.add("prix_panier");
    prixPanier.textContent = `Prix : ${camera.price/100 } Euros`;

  let lentillePanier = document.createElement("div");
    cartePanier.append(lentillePanier);
    lentillePanier.classList.add("lentille_panier");
    lentillePanier.textContent = `Lentille : ${camera.lenses }`;

  let quantitePanier = document.createElement("div");
    cartePanier.append(quantitePanier);
    quantitePanier.classList.add("quantite_panier");
    quantitePanier.innerHTML += `Quantité : ${camera.quantity}
    <a href="#" class="suppArticle" data-id="${i}"><i class="bi bi-cart-dash"></i></a>
    `;

console.log(camera.quantity);
 
  let totalPanier = document.createElement("div");
    cartePanier.append(totalPanier);
    totalPanier.classList.add("total_panier");
    totalPanier.textContent = `Total : ${camera.quantity * camera.price/100 } Euros`;
   
  prixTotalPanier(camera)
 
 // BOUCLE FOR
  for (let i = 0; i < camera.quantity; i++) {
    produitPanier .push(camera.id);
  }
});

// OPTION VIDER LE PANIER
const supprimerPanier = `<div class = " supprimer h4 text-center"><a href = "#">Vider mon panier</a></div>`
container.insertAdjacentHTML( "afterend", supprimerPanier);


let viderPanier = document.querySelector('.supprimer')
viderPanier.addEventListener('click',  suppPanier);

//FONCTION SUPPRIME TOUT LE PANIER ET RECHARGE LA PAGE
function suppPanier() {
  if (cameras == null) {
  } else {
    container.remove();
    localStorage.clear();
    window.location.reload();
  }
};

// FONCTION SUPPRIMER UN SEUL ARTICLE AVEC SPLICE
function supprimerArticle(id){
  let camera = cameras[id];
  
  if(camera.quantity > 1){
    camera.quantity--;
  }else{
    cameras.splice(id,1)
  }
  localStorage.setItem("panier",JSON.stringify(cameras));
  window.location.reload();

}

// SELECTION DU BOUTON POUR SUPPRIMER UN ARTICLE CHOISI
let viderArticle = document.querySelectorAll(".suppArticle");
// BOUCLE FOR SUR LES BOUTONS
 for (let a = 0; a < viderArticle.length; a++)
// AU CLICK IL UTILISE LA FONCTION POUR SUPPRIMER UN ARTTICLE
 viderArticle[a].addEventListener("click", function (){
    supprimerArticle(viderArticle[a].dataset.id);
 })

// GESTION DU FORMULAIRE ////

function envoiPanier() {
  let form = document.querySelector("#form");
  if (form.reportValidity() == true && produitPanier.length>0) {
    let contact = {
      'firstName': document.querySelector("#NomFormulaire").value,
      'lastName': document.querySelector("#PrenonFormulaire").value,
      'address': document.querySelector("#AdresseFormulaire").value,
      'city': document.querySelector("#VilleFormulaire").value,
      'email': document.querySelector("#EmailFormulaire").value
    };
 

    let products = produitPanier;
    console.log(products);

    let formulaireClient = JSON.stringify({
      contact,
      products,
    });
    console.log(formulaireClient);

    // APPEL API AVEC FETCH // ENVOIE DES DONNEES AVEC POST 
    fetch('http://localhost:3000/api/cameras/order', {
      method: 'POST',
      headers: {
        'content-type': "application/json"
      },
      mode: "cors",
      body: formulaireClient
      })
      .then(function (response) {
        return response.json()
      })
      .then(function (r) {
        window.location.assign("confirmation.html?orderId=" + r.orderId);
      })
      //SI PROBLEME API
      .catch(function (err) {       
        container.innerHTML += ` <div class = "h1 text-danger">Serveur en maintenance !</div>`
      });
  }
 
}

let envoiFormulaire = document.querySelector("#buttonFormulaire");

envoiFormulaire.addEventListener('click', function (event) {
  event.preventDefault();
  envoiPanier();
});

  
