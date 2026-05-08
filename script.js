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
const mpLinks = {
    "150,00": "#",
    "175,00": "#",
    "225,00": "#",
    "250,00": "https://mpago.la/2bqfid8", 
    "300,00": "#",
    "350,00": "#",
    "400,00": "#",
    "450,00": "#",
    "500,00": "#",
    "550,00": "#",
    "600,00": "#",
    "650,00": "#",
    "800,00": "#",
    "1000,00": "#"
};

const modal = document.getElementById("pix-modal");
const giftNameSpan = document.getElementById("gift-name");
const giftValueSpan = document.getElementById("gift-value");
const pixInfo = document.querySelector(".pix-info");
const cardBtn = document.getElementById("btn-card-link");

function presentear(name, value) {
    giftNameSpan.innerText = name;
    giftValueSpan.innerText = value;
    
    pixInfo.style.display = "none";
    
    const cleanValue = value.replace(".", ""); 
    
    if (mpLinks[cleanValue] && mpLinks[cleanValue] !== "#") {
        cardBtn.href = mpLinks[cleanValue];
        cardBtn.style.display = "flex";
    } else {
        cardBtn.style.display = "none"; 
    }

    modal.style.display = "block";
}

function showPix() {
    pixInfo.style.display = "block";
    copyPixOnly(); 
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

// RSVP Form Submission to Google Sheets
const scriptURL = 'https://script.google.com/macros/s/AKfycbx4Cw0vdQrWmXiPMtw_XGujHY5zucQ73tf0O3En4t2gPi_EjpTVYX2gWDe1oYa3DBuKzQ/exec';
const form = document.getElementById('rsvp-form');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('.btn-submit');
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "Enviando...";
    submitBtn.disabled = true;

    const formData = {
        name: document.getElementById('name').value,
        attendance: form.querySelector('input[name="attendance"]:checked').value,
        adults: document.getElementById('adults').value,
        email: document.getElementById('email').value
    };

    fetch(scriptURL, { 
        method: 'POST', 
        body: JSON.stringify(formData)
    })
    .then(response => {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
        alert("Obrigado por confirmar sua presença! Seus dados foram salvos na nossa lista.");
        form.reset();
    })
    .catch(error => {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
        console.error('Error!', error.message);
        alert("Ops! Ocorreu um erro ao enviar. Por favor, tente novamente.");
    });
});
