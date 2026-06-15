// =====================
// COUNTDOWN TIMER
// =====================
const weddingDate = new Date("August 8, 2026 00:00:01").getTime();

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days    = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML    = days;
    document.getElementById("hours").innerHTML   = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("timer").innerHTML = "É HOJE!";
    }
}, 1000);

// =====================
// SCROLL: REVEAL SECTIONS
// =====================
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));

// =====================
// HEADER: sombra ao rolar
// =====================
const siteHeader = document.getElementById('site-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        siteHeader.classList.add('scrolled');
    } else {
        siteHeader.classList.remove('scrolled');
    }
});

// =====================
// BOTÃO VOLTAR AO TOPO
// =====================
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =====================
// MENU HAMBÚRGUER (MOBILE)
// =====================
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
    });
});

// =====================
// PIX & PAGAMENTO
// =====================
const pixKey = "240cb59d-4ec6-4f1b-bd8f-bd83a9491809";

// Links do Mercado Pago por valor
// Valores novos (120,00 / 220,00 / 320,00 / 700,00) ficam sem link
// até você criar os links no Mercado Pago e adicionar aqui
const mpLinks = {
    "80,00":    "https://link.infinitepay.io/thierryaf/VC1D-rTMBGedYak-80,00",
    "100,00":   "https://link.infinitepay.io/thierryaf/VC1D-PKKRe1EJZQ-100,00",
    "120,00":   "https://link.infinitepay.io/thierryaf/VC1D-wNnAa2geB9-120,00",
    "150,00":   "https://link.infinitepay.io/thierryaf/VC1D-KwPHfwfkvT-150,00",
    "200,00":   "https://link.infinitepay.io/thierryaf/VC1D-xFVykY9kko-200,00",
    "220,00":   "https://link.infinitepay.io/thierryaf/VC1D-L6Zn7LpJXY-220,00",
    "250,00":   "https://link.infinitepay.io/thierryaf/VC1D-2EPoTlJcov-250,00",
    "300,00":   "https://link.infinitepay.io/thierryaf/VC1D-YDshNbBUv1-300,00",
    "320,00":   "https://link.infinitepay.io/thierryaf/VC1D-5dgoJB6IHm-320,00",
    "350,00":   "https://link.infinitepay.io/thierryaf/VC1D-4Nng9HTKZt-350,00",
    "400,00":   "https://link.infinitepay.io/thierryaf/VC1D-KrQaDdAkwz-400,00",
    "450,00":   "https://link.infinitepay.io/thierryaf/VC1D-taEpbvcUN9-450,00",
    "500,00":   "https://link.infinitepay.io/thierryaf/VC1D-cbIhT1A4aE-500,00",
    "550,00":   "https://link.infinitepay.io/thierryaf/VC1D-MgMTMW43uv-550,00",
    "600,00":   "https://link.infinitepay.io/thierryaf/VC1D-bpjPaFHKym-600,00",
    "650,00":   "https://link.infinitepay.io/thierryaf/VC1D-E9J3nMcmp6-650,00",
    "700,00":   "https://link.infinitepay.io/thierryaf/VC1D-QWqGrCaLem-700,00",
    "800,00":   "https://link.infinitepay.io/thierryaf/VC1D-liYPNki5ah-800,00",
    "1.000,00": "https://link.infinitepay.io/thierryaf/VC1D-0xSmlATCit-1000,00"
};

const modal         = document.getElementById("pix-modal");
const giftNameSpan  = document.getElementById("gift-name");
const giftValueSpan = document.getElementById("gift-value");
const pixInfo       = document.querySelector(".pix-info");
const cardBtn       = document.getElementById("btn-card-link");

function presentear(name, value) {
    giftNameSpan.innerText  = name;
    giftValueSpan.innerText = value;

    pixInfo.style.display = "none";

    if (mpLinks[value] && mpLinks[value] !== "") {
        cardBtn.href          = mpLinks[value];
        cardBtn.style.display = "flex";
    } else {
        cardBtn.style.display = "none";
    }

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function showPix() {
    pixInfo.style.display = "block";
    copyPixOnly();
}

function copyPixOnly() {
    navigator.clipboard.writeText(pixKey).then(() => {
        const hint = document.querySelector(".pix-hint");
        hint.innerText = "Chave copiada com sucesso! ✓";
        setTimeout(() => {
            hint.innerText = "A chave foi copiada! Agora é só colar no seu app do banco.";
        }, 3000);
    });
}

function closePixModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
}

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closePixModal();
    }
});

window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePixModal();
    }
});

// =====================
// RSVP — GOOGLE SHEETS
// =====================
const scriptURL = 'https://script.google.com/macros/s/AKfycbx4Cw0vdQrWmXiPMtw_XGujHY5zucQ73tf0O3En4t2gPi_EjpTVYX2gWDe1oYa3DBuKzQ/exec';
const form = document.getElementById('rsvp-form');

form.addEventListener('submit', e => {
    e.preventDefault();

    const submitBtn   = form.querySelector('.btn-submit');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = "Enviando...";
    submitBtn.disabled  = true;

    const formData = {
        name:       document.getElementById('name').value,
        attendance: form.querySelector('input[name="attendance"]:checked').value,
        adults:     document.getElementById('adults').value,
        message:    document.getElementById('message').value
    };

    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(formData)
    })
    .then(() => {
        submitBtn.innerText = originalText;
        submitBtn.disabled  = false;
        alert("Obrigado por confirmar sua presença! Seus dados foram salvos na nossa lista.");
        form.reset();
    })
    .catch(error => {
        submitBtn.innerText = originalText;
        submitBtn.disabled  = false;
        console.error('Erro:', error.message);
        alert("Ops! Ocorreu um erro ao enviar. Por favor, tente novamente.");
    });
});
