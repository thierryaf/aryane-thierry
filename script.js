// Countdown Timer
const weddingDate = new Date("August 8, 2026 18:00:00").getTime();

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("timer").innerHTML = "É HOJE!";
    }
}, 1000);

// PIX & Payment Functionality
const pixKey = "240cb59d-4ec6-4f1b-bd8f-bd83a9491809";

// MAPEAMENTO DE LINKS DO MERCADO PAGO POR VALOR
// Substitua o "#" pelo link que você criar para cada valor
const mpLinks = {
    "150,00": "https://mpago.la/2zpRxJR",
    "200,00": "https://mpago.la/1XmfnXo",
    "250,00": "https://mpago.la/2bqfid8", // Link já configurado
    "300,00": "https://mpago.la/23DSVbt",
    "350,00": "https://mpago.la/1g1iz2z",
    "400,00": "https://mpago.la/2LFnVji",
    "450,00": "https://mpago.la/1Bt9tJT",
    "500,00": "https://mpago.la/29WcREp",
    "550,00": "https://mpago.la/2G97Bvu",
    "600,00": "https://mpago.la/13tPEn2",
    "650,00": "https://mpago.la/2XKRo9S",
    "800,00": "https://mpago.la/2q3DhpB",
    "1000,00": "https://mpago.la/2sXWr7x"
};

const modal = document.getElementById("pix-modal");
const giftNameSpan = document.getElementById("gift-name");
const giftValueSpan = document.getElementById("gift-value");
const pixInfo = document.querySelector(".pix-info");
const cardBtn = document.getElementById("btn-card-link");

function presentear(name, value) {
    giftNameSpan.innerText = name;
    giftValueSpan.innerText = value;
    
    // Reset modal state
    pixInfo.style.display = "none";
    
    // Update Mercado Pago Link
    // Removemos pontos de milhar para comparar corretamente com a chave do objeto
    const cleanValue = value.replace(".", ""); 
    
    if (mpLinks[cleanValue] && mpLinks[cleanValue] !== "#") {
        cardBtn.href = mpLinks[cleanValue];
        cardBtn.style.display = "flex";
    } else {
        cardBtn.style.display = "none"; // Esconde se não tiver link
    }

    modal.style.display = "block";
}

function showPix() {
    pixInfo.style.display = "block";
    copyPixOnly(); // Já copia automaticamente ao clicar
}

function copyPixOnly() {
    navigator.clipboard.writeText(pixKey).then(() => {
        const hint = document.querySelector(".pix-hint");
        hint.innerText = "Chave copiada com sucesso!";
        setTimeout(() => {
            hint.innerText = "A chave foi copiada! Agora é só colar no seu app do banco.";
        }, 3000);
    });
}

function closePixModal() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        closePixModal();
    }
}

// RSVP Form Submission
document.getElementById("rsvp-form").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Obrigado por confirmar sua presença! Recebemos seus dados.");
    this.reset();
});
