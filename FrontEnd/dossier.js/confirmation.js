
//RECUPERATION DE L'URL
let paramsUrl = new URL(window.location).searchParams;
// RECUPERATION DE L'ID ENVOYE PAR L'API
let orderId = paramsUrl.get("orderId");
console.log(orderId);


// RECUPERATION DU PRIX TOTAL
let prixTotal = JSON.parse(localStorage.getItem("prixTotal"));
console.log(prixTotal);
// FONCTION AFFICHAGE HTML
function affichage (){   

    let infoConfirmation = document.createElement("div");
        document.querySelector("#confirmation").append(infoConfirmation);
        infoConfirmation.classList.add("info_confirmation");
        infoConfirmation.textContent = "Félicitation pour votre achat !"

    let idConfirmation = document.createElement("h3");
        infoConfirmation.append(idConfirmation);
        idConfirmation.classList.add("id_confirmation");
        idConfirmation.textContent = "Numéro de commande : "+ `${orderId}`;

    let prixConfirmation = document.createElement("h3");
        infoConfirmation.append(prixConfirmation);
        prixConfirmation.classList.add("prix_confirmation");
        prixConfirmation.textContent = `${prixTotal}`;


};
// APPEL DE MA FONCTION
affichage();
 
// SUPPRIME MON LOCALSTORAGE
localStorage.clear();

// SI MON ID OU MON PRIX TOTAL ET NULL JE RETOURNE SUR MA PAGE INDEX
if( orderId == null || prixTotal == null){
    window.location.href= "index.html";

}