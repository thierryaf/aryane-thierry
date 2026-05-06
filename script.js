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

// PIX Functionality
const pixKey = "240cb59d-4ec6-4f1b-bd8f-bd83a9491809";
const modal = document.getElementById("pix-modal");
const giftNameSpan = document.getElementById("gift-name");
const giftValueSpan = document.getElementById("gift-value");

function presentear(name, value) {
    giftNameSpan.innerText = name;
    giftValueSpan.innerText = value;
    
    // Copy to clipboard
    const textToCopy = `Chave PIX: ${pixKey}\nValor: R$ ${value}\nPresente: ${name}`;
    
    // We copy just the key for better bank app compatibility, 
    // but we could copy the whole text if preferred.
    // Most users just want the key to paste.
    navigator.clipboard.writeText(pixKey).then(() => {
        console.log("Chave PIX copiada!");
    });

    modal.style.display = "block";
}

function copyPixOnly() {
    navigator.clipboard.writeText(pixKey).then(() => {
        alert("Chave PIX copiada com sucesso!");
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
