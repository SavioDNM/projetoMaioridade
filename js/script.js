function validateAge() {
    let dob = document.getElementById("dob").value;
    let birthDate = new Date(dob);
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

// Verificação para garantir que a data de nascimento não seja no futuro
if (birthDate.getFullYear() > today.getFullYear()) {
    alert("Você ainda não nasceu, volte para seu futuro!");

    document.getElementById("dob").disabled = true;
    document.getElementById("resetButton").style.display = "block";
    return;
}

    if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
        age--;
    }

    let paradiseImage = document.getElementById("paradiseImage");
    let resultDiv = document.getElementById("result");
    let submitButton = document.querySelector("#ageForm button[type='submit']");

    if (age >= 18) {
        displayResult("<strong>Bem-vindo ao Paraíso! Você é maior de idade. Desfrute das maravilhas!</strong>");
        changeImage("imgs/thumbsUp.png");
        paradiseImage.classList.add("positive-border");

        // Alterar o botão para ser um botão de reset
        submitButton.type = "button";
        submitButton.innerText = "Resetar";
        submitButton.addEventListener("click", resetForm);
    } else {
        alert("Você é menor de idade, não pode entrar no paraíso!");
        changeImage("imgs/thumbsDown.png");
        const mentira = confirm("Você está mentindo sobre sua data de nascimento?");
        if (mentira) {
            alert("Que feio, mentir é pecado!");
            changeImage("imgs/thumbsDown.png");
            paradiseImage.classList.add("negative-border");

            // Alterar o botão para ser um botão de reset
            submitButton.type = "button";
            submitButton.innerText = "Resetar";
            submitButton.addEventListener("click", resetForm);
        } else {
            alert("Que pena, você ainda tem que esperar alguns anos!");
            displayResult("<strong>Deixa de ser mentiroso!</strong>🤬");
            changeImage("imgs/thumbsDown.png");
            paradiseImage.classList.add("negative-border");
            
            // Alterar o botão para ser um botão de reset
            submitButton.type = "button";
            submitButton.innerText = "Resetar";
            submitButton.addEventListener("click", resetForm);
        }

        if (mentira) {
            displayResult("<strong>Volte para o parquinho!</strong> 😜");
        }
    }

    document.getElementById("dob").disabled = true;
}

function resetForm() {
    document.getElementById("dob").value = "";
    document.getElementById("dob").disabled = false;

    let paradiseImage = document.getElementById("paradiseImage");
    let resultDiv = document.getElementById("result");
    let submitButton = document.querySelector("#ageForm button[type='button']");

    paradiseImage.src = "/imgs/police.png"; // Defina a imagem padrão ou deixe em branco
    paradiseImage.style.opacity = 1; // Certifique-se de que a opacidade seja 1
    paradiseImage.classList.remove("positive-border", "negative-border");

    resultDiv.innerHTML = ""; // Limpar o resultado

    // Alterar o botão para ser novamente um botão de submit
    submitButton.type = "submit";
    submitButton.innerText = "Verificar Maioridade";
    submitButton.removeEventListener("click", resetForm);
}

function displayResult(message) {
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<p>" + message + "</p>";
}

function changeImage(imagePath) {
    let paradiseImage = document.getElementById("paradiseImage");
    paradiseImage.style.opacity = 0; // Fade out
    setTimeout(function () {
        paradiseImage.src = imagePath;
        paradiseImage.style.opacity = 1; // Fade in
    }, 500); // Tempo igual à duração da transição
}
