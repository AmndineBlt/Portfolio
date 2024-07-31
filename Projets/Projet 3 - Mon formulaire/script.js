// Data
const nameInput = document.getElementById("name");
const email = document.getElementById("email");
const tel = document.getElementById("tel");
const message = document.getElementById("message");
const success = document.getElementById("success");
const errorNodes = document.querySelectorAll(".error");

// Validation Data
function validateForm(){

    clearMessages();
    let errorFlag = false

    if (nameInput.value.length < 1){
        errorNodes[0].innerText = "Votre saisie n'est pas valide";
        nameInput.classList.add("error-border");
        errorFlag = true;
    }

    if (!emailIsValid(email.value)){
        errorNodes[1].innerText = "Adresse email invalide";
        email.classList.add("error-border");
        errorFlag = true;
    }

    if (!telIsValid(tel.value)){
        errorNodes[2].innerText = "Numéro invalide";
        tel.classList.add("error-border");
        errorFlag = true;
    }

    if (message.value.length < 1){
        errorNodes[3].innerText = "Entrez votre message s'il vous plaît";
        message.classList.add("error-border");
        errorFlag = true;
    }

    if (!errorFlag){
        success.innerText = "Message envoyé!";
    }
}

//Clear error / success messages
function clearMessages(){
    for (let i = 0; i < errorNodes.length; i++){
        errorNodes[i].innerText = "";
    }
    success.innerText = "";
    nameInput.classList.remove("error-border");
    email.classList.remove("error-border");
    tel.classList.remove("error-border");
    message.classList.remove("error-border");
}

// Vérifie s'il y a Nom Prénom
document.querySelector("#name").addEventListener("change", e => {
    /* Quand tu quittes le champ, tu vérifies qu'il contient
    deux mots d'une longueur comprise entre 2 et 15 caractères
    */
        const mess = /^[a-z]{2,15} [a-z]{2,15}$/i.test(e.target.value) ?
        "Vous êtes\n" + e.target.value :
        "Erreur de saisie";
        alert(mess);
    });

// Vérifie si l'email est valide
function emailIsValid(email){
    let regEmail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$','i');
    return regEmail.test(email);
}


// Vérifie si le numéro est valide
/*
function telIsValid(tel)
{
	// Definition du motif a matcher
	let regex = new RegExp(/^(01|02|03|04|05|06|07|08|09)[0-9]{8}/gi);
	
	// Definition de la variable booleene match
	let match = false;
	
	// Test sur le motif
	if(regex.test(tel)){
		match = true;
	}
	  else {
		match = false;
	}
	
	// On renvoie match
	return match;
}
*/