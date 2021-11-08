

//RECUPERATION DE L URL
let params = (new URL(document.location)).searchParams;

//STOCK L'ID DANS UNE CONSTANTE
const id = params.get("id");

console.log(id);

//EMPLACEMENT HTML

let container = document.querySelector(".container");

//ENVOI LOCAL STORAGE
const addLocalStorage = panier => {
  localStorage.setItem('panier', JSON.stringify(panier));
  
};

//  HTML
const display = camera => {
  
  let carteProduit = document.createElement("div");
    document.querySelector("#container").append(carteProduit);
    carteProduit.classList.add("carte_produit");

  let nameProduit = document.createElement("h2");
    carteProduit.append(nameProduit);
    nameProduit.classList.add("name_produit");
    nameProduit.textContent = `${camera.name}`;

  let imageProduit = document.createElement("img");
    carteProduit.append(imageProduit);
    imageProduit.classList.add("image_produit");
    imageProduit.src = `${camera.imageUrl}`;

  let descriptionProduit = document.createElement("p");
  carteProduit.append(descriptionProduit);
  descriptionProduit.classList.add("description_produit");
  descriptionProduit.textContent = `${camera.description}`;

  let prixProduit = document.createElement("p");
    carteProduit.append(prixProduit);
    prixProduit.classList.add("prix_produit");
    prixProduit.textContent = `${camera.price/ 100} Euros`;

  let quantityProduit = document.createElement("div");
    carteProduit.append(quantityProduit);
    quantityProduit.classList.add("quantity_produit");
    quantityProduit.innerHTML += `
      <label for="Nombre">Quantité :</label>
              <input id="quantity" type="number" name="Nombre" value="1" min="1" max="10">
      `;

  let lentilleProduit = document.createElement("div");
    carteProduit.append(lentilleProduit);
    lentilleProduit.classList.add("lentille_produit");
    lentilleProduit.innerHTML += `
      <label for="Lentille">Lentilles (options) :</label>
                    <select name="lentille" id="option_lentilles"></select>
      `;

  let validerProduit = document.createElement("a");
    carteProduit.append(validerProduit);
    validerProduit.classList.add("panier");
    validerProduit.textContent = "Ajouter au panier";
    validerProduit.href = "panier.html"


  const optionLentilles = camera.lenses;
  let htmlLentilles = [];

// BOUCLE FOR POUR RECUPERER LES LENTILLES
for (let b = 0; b < optionLentilles.length; b++) {
  htmlLentilles +=
    `
      <option value = "${camera.lenses[b]}">${camera.lenses[b]}</option>
  
    `;
  console.log(optionLentilles);
}

const positionHtmlLentilles = document.querySelector("#option_lentilles");
positionHtmlLentilles.innerHTML =htmlLentilles;

  // AU CLICK ON ENVOIE 
  document.querySelector('.panier').addEventListener('click', function () {    
    
    ajoutPanier(camera)
       
  });
};
 

// AJOUT PANIER 
const ajoutPanier = camera=> {
  camera.quantity = parseInt(document.querySelector('#quantity').value);
   camera.lenses = (document.querySelector("#option_lentilles").value);

  //RECUPERE PANIER    
  let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : [];

  //BOUCLE FOR PARCOUR LIGNE PANIER
  let cameraExistIndex = false;
  for (let i = 0; i <panier.length; i++) {
    let product = panier[i];
    //CONDITION CI PRODUIT EXISTE
    if (product.id === camera.id && product.lenses === camera.lenses) {
      cameraExistIndex = i;
    }
  };
  // CAMERA DEJA DANS LE PANIER
  if (false !== cameraExistIndex) {
    panier[cameraExistIndex].quantity = parseInt(panier[cameraExistIndex].quantity) + camera.quantity;
    panier[cameraExistIndex].lenses = (panier[cameraExistIndex].lenses);
  } else {
    panier.push(camera);
  };
  addLocalStorage(panier)
};

// CREATION D'UNE CLASS CONSTRUCTOR POUR CREER MON OBJET CAMERA
class Camera {
  constructor({name, imageUrl, price, _id, description, lenses, quantity })                                             
   {
      this.name = name;
      this.imageUrl = imageUrl;
      this.price = price;
      this.id = _id;
      this.description = description;
      this.lenses = lenses;
      this.quantity = parseInt(quantity, 10); 
  }
};

// APPELLE API AVEC FETCH
fetch(`http://localhost:3000/api/cameras/${id}`)
  .then(response => response.json())
  .then(function (product) {
    let camera = new Camera(product)
    display(camera);
  })
  // SI PROBLEME API
  .catch(function(err){
    container.innerHTML += ` <div class = "h1 text-danger">Serveur en maintenance !</div>`
});




