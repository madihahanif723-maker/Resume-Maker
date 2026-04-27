
/* =========================
   SIGNUP FUNCTION
========================= */
function signup() {
    let name = document.getElementById("signName")?.value.trim();
    let email = document.getElementById("signEmail")?.value.trim();
    let password = document.getElementById("signPassword")?.value.trim();

    if (!name || !email || !password) {
        Swal.fire({
            icon: 'warning',
            title: '⚠️ Missing Fields',
            text: 'Please fill all signup fields',
            background: 'rgba(255,255,255,0.18)',
            color: '#ffffff',
            confirmButtonColor: '#f14343',
            confirmButtonText: 'Got It',
            backdrop: `rgba(241,67,67,0.3) left top no-repeat`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' }
        });
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let existingUser = users.find(user => user.email === email);

    if (existingUser) {
        Swal.fire({
            icon: 'error',
            title: '❌ Account Exists',
            text: 'This email is already registered',
            background: 'rgba(255,255,255,0.18)',
            color: '#ffffff',
            confirmButtonColor: '#f14343',
            confirmButtonText: 'Try Again',
            backdrop: `rgba(241,67,67,0.3) left top no-repeat`,
            showClass: { popup: 'animate__animated animate__shakeX' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' }
        });
        return;
    }

    let userObj = {
        id: Date.now(),
        name,
        email,
        password
    };

    users.push(userObj);
    localStorage.setItem("users", JSON.stringify(users));

    Swal.fire({
        icon: 'success',
        title: '✅ Signup Successful',
        html: '<b>Welcome aboard! 🎉</b><br>Redirecting to Login...',
        background: 'rgba(255,255,255,0.18)',
        color: '#ffffff',
        confirmButtonColor: '#28a745',
        confirmButtonText: 'Continue',
        backdrop: `rgba(40,199,151,0.3) left top no-repeat`,
        showClass: { popup: 'animate__animated animate__zoomIn' },
        hideClass: { popup: 'animate__animated animate__fadeOutDown' },
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then(() => {
        window.location.href = "login.html";
    });
}

/* =========================
   LOGIN FUNCTION
========================= */
function login(event) {
    event.preventDefault();

    let name = document.getElementById("name")?.value.trim();
    let email = document.getElementById("login-email")?.value.trim();
    let password = document.getElementById("login-password")?.value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let matchedUser = users.find(user =>
        user.name === name &&
        user.email === email &&
        user.password === password
    );

    if (!matchedUser) {
        Swal.fire({
            icon: 'error',
            title: '❌ Login Failed',
            text: 'Invalid Name, Email or Password',
            background: 'rgba(255,255,255,0.18)',
            color: '#ffffff',
            confirmButtonColor: '#f14343',
            confirmButtonText: 'Try Again',
            backdrop: `rgba(241,67,67,0.3) left top no-repeat`,
            showClass: { popup: 'animate__animated animate__shakeX' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' }
        });
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

    Swal.fire({
        icon: 'success',
        title: '✅ Login Successful',
        html: '<b>Welcome, ' + name + '! 🎉</b><br>Taking you to dashboard...',
        background: 'rgba(255,255,255,0.18)',
        color: '#ffffff',
        confirmButtonColor: '#1f4ff0',
        confirmButtonText: 'Go to Dashboard',
        backdrop: `rgba(31,79,240,0.3) left top no-repeat`,
        showClass: { popup: 'animate__animated animate__slideInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutDown' },
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then(() => {
        window.location.href = "cvcreation.html";
    });
}

/* =========================
   CV CREATION BUTTON
========================= */
document.addEventListener("DOMContentLoaded", function () {
    let createBtn = document.querySelector(".card .btn");

    if (createBtn) {
        createBtn.addEventListener("click", function (e) {
            e.preventDefault();

            let loggedInUser = localStorage.getItem("loggedInUser");

            if (!loggedInUser) {
                Swal.fire({
                    icon: 'warning',
                    title: '🔐 Login Required',
                    text: 'Please login first to create CV',
                    background: 'rgba(255,255,255,0.18)',
                    color: '#ffffff',
                    confirmButtonColor: '#f14343',
                    confirmButtonText: 'Go to Login',
                    backdrop: `rgba(241,67,67,0.3) left top no-repeat`,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' }
                });
                return;
            }

            window.location.href = "dashborad.html";
        });
    }

    /* FIXED CV BUTTON CLICK */
    let cvCreateBtn = document.querySelector("a.btn");

    if (cvCreateBtn) {
        cvCreateBtn.addEventListener("click", function (e) {
            e.preventDefault();

            let loggedInUser = localStorage.getItem("loggedInUser");

            if (!loggedInUser) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Login Required',
                    text: 'Please login first',
                    background: 'rgba(255,255,255,0.18)',
                    color: '#ffffff',
                    confirmButtonColor: '#f14343',
                    confirmButtonText: 'Go to Login',
                    backdrop: `rgba(241,67,67,0.3) left top no-repeat`,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' }
                });
                return;
            }

            Swal.fire({
                icon: 'success',
                title: '🎉 Opening Dashboard',
                html: '<b>Redirecting to CV Form... 📝</b>',
                background: 'rgba(255,255,255,0.18)',
                color: '#ffffff',
                confirmButtonColor: '#1f4ff0',
                backdrop: `rgba(31,79,240,0.3) left top no-repeat`,
                showClass: { popup: 'animate__animated animate__zoomIn' },
                hideClass: { popup: 'animate__animated animate__fadeOutDown' },
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then(() => {
                window.location.href = "dashboard.html";
            });
        });
    }
});

/* =========================
   LOGOUT FUNCTION
========================= */
function logout() {
    localStorage.removeItem("loggedInUser");

    Swal.fire({
        icon: 'success',
        title: '👋 Logged Out',
        html: '<b>See you soon! 👋</b><br>Redirecting to Login...',
        background: 'rgba(255,255,255,0.18)',
        color: '#ffffff',
        confirmButtonColor: '#176cc2',
        confirmButtonText: 'Return to Login',
        backdrop: `rgba(23,108,194,0.3) left top no-repeat`,
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutDown' },
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then(() => {
        window.location.href = "login.html";
    });
}

/* =========================
   IMAGE PREVIEW
========================= */
document.addEventListener("DOMContentLoaded", function () {
    let imgInput = document.getElementById("imgInput");
    let previewImg = document.getElementById("previewImg");

    if (imgInput) {
        imgInput.addEventListener("change", function () {
            let file = this.files[0];

            if (file) {
                let reader = new FileReader();

                reader.onload = function (e) {
                    previewImg.src = e.target.result;
                };

                reader.readAsDataURL(file);
            }
        });
    }
});

/* =========================
   RICH TEXT FORMATTER
========================= */
function format(command, value = null) {
    document.execCommand(command, false, value);
}

/* =========================
   SKILLS TAG SYSTEM
========================= */
document.addEventListener("DOMContentLoaded", function () {
    let skillInput = document.getElementById("cv-skills");
    let skillContainer = document.getElementById("skills-container");

    if (skillInput) {
        skillInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();

                let skill = skillInput.value.trim();

                if (skill !== "") {
                    let tag = document.createElement("span");
                    tag.innerText = skill;
                    skillContainer.appendChild(tag);

                    skillInput.value = "";
                }
            }
        });
    }
});

/* =========================
   LANGUAGES TAG SYSTEM
========================= */
document.addEventListener("DOMContentLoaded", function () {
    let languageInput = document.getElementById("cv-languages");
    let languageContainer = document.getElementById("languages-container");

    if (languageInput) {
        languageInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();

                let language = languageInput.value.trim();

                if (language !== "") {
                    let tag = document.createElement("span");
                    tag.innerText = language;
                    languageContainer.appendChild(tag);

                    languageInput.value = "";
                }
            }
        });
    }
});

/* =========================
   DASHBOARD FORM SUBMIT
========================= */
document.addEventListener("DOMContentLoaded", function () {
    let cvForm = document.getElementById("cvForm");

    if (cvForm) {
        cvForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let fullName = document.getElementById("name")?.value.trim();
            let phone = document.getElementById("phone")?.value.trim();
            let email = document.getElementById("email")?.value.trim();
            let education = document.getElementById("education")?.value.trim();
            let experience = document.getElementById("experience")?.value.trim();
            let about = document.getElementById("about")?.innerHTML.trim();
            let image = document.getElementById("previewImg")?.src;

            let skills = [];
            document.querySelectorAll("#skills-container span").forEach(tag => {
                skills.push(tag.innerText);
            });

            let languages = [];
            document.querySelectorAll("#languages-container span").forEach(tag => {
                languages.push(tag.innerText);
            });

            if (
                !fullName ||
                !phone ||
                !email ||
                !education ||
                !experience ||
                !about ||
                skills.length === 0 ||
                languages.length === 0
            ) {
                Swal.fire({
                    icon: 'warning',
                    title: '⚠️ Incomplete Form',
                    text: 'Please fill all fields before proceeding',
                    background: 'rgba(255,255,255,0.18)',
                    color: '#ffffff',
                    confirmButtonColor: '#f14343',
                    confirmButtonText: 'Complete Form',
                    backdrop: `rgba(241,67,67,0.3) left top no-repeat`,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' }
                });
                return;
            }

            let cvData = {
                fullName,
                phone,
                email,
                skills,
                languages,
                education,
                experience,
                about,
                image
            };

            localStorage.setItem("cvData", JSON.stringify(cvData));

            Swal.fire({
                icon: 'success',
                title: '✅ CV Saved',
                html: '<b>Now choose your template! 🎨</b>',
                background: 'rgba(255,255,255,0.18)',
                color: '#ffffff',
                confirmButtonColor: '#28a745',
                confirmButtonText: 'Choose Template',
                backdrop: `rgba(40,199,151,0.3) left top no-repeat`,
                showClass: { popup: 'animate__animated animate__zoomIn' },
                hideClass: { popup: 'animate__animated animate__fadeOutDown' },
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then(() => {
                window.location.href = "template.html";
            });
        });
    }
});

/* =========================
   PAGE PROTECTION
========================= */
document.addEventListener("DOMContentLoaded", function () {
    let loggedInUser = localStorage.getItem("loggedInUser");

    let currentPage = window.location.pathname;

    if (
        (currentPage.includes("cvcreation.html") || currentPage.includes("dashboard.html"))
        && !loggedInUser
    ) {
        window.location.href = "login.html";
    }
});

        document.querySelectorAll('.select-template').forEach(button => {
            button.addEventListener('click', function () {

                let selectedTemplate = this.getAttribute('data-template');

                localStorage.setItem('selectedTemplate', selectedTemplate);

                Swal.fire({
                    icon: 'success',
                    title: '✨ Template Selected',
                    html: '<b>Your CV Template is Ready 🚀</b><br>Generating your CV...',
                    background: 'rgba(255,255,255,0.18)',
                    color: '#ffffff',
                    confirmButtonColor: '#7b5cff',
                    confirmButtonText: 'View CV',
                    backdrop: `rgba(123,92,255,0.3) left top no-repeat`,
                    showClass: {
                        popup: 'animate__animated animate__zoomIn'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutDown'
                    },
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }).then(() => {
                    window.location.href = 'finalcv.html';
                });
            });
        });