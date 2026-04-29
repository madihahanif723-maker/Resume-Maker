function signup() {
    var name = document.getElementById("signName").value;
    var email = document.getElementById("signEmail").value;
    var password = document.getElementById("signPassword").value;


    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;


    var users = JSON.parse(localStorage.getItem("userdata")) || [];

    if (!name || !email || !password) {
        Swal.fire({
            icon: 'warning',
            title: '⚠️ Missing Fields',
            html: '<b>All fields are required!</b>',
            background: 'rgba(13, 87, 180, 0.9)',
            color: '#ffffff',
            confirmButtonColor: '#ff9800',
            confirmButtonText: 'OK',
            backdrop: `rgba(13,87,180,0.3)`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' }
        });
        return false;
    }

    if (!emailRegex.test(email)) {
        Swal.fire({
            icon: 'error',
            title: '❌ Invalid Email',
            html: '<b>Please enter a valid email address!</b>',
            background: 'rgba(13, 87, 180, 0.9)',
            color: '#ffffff',
            confirmButtonColor: '#ff9800',
            confirmButtonText: 'OK',
            backdrop: `rgba(13,87,180,0.3)`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' }
        });
        return false;
    }
    if (!passwordRegex.test(password)) {
        Swal.fire({
            icon: 'warning',
            title: '🔒 Weak Password',
            html: '<b>Password must contain:</b><br>• Uppercase letter (A-Z)<br>• Lowercase letter (a-z)<br>• Number (0-9)<br>• Special character (@$!%*?&)<br>• Minimum 8 characters',
            background: 'rgba(13, 87, 180, 0.9)',
            color: '#ffffff',
            confirmButtonColor: '#ff9800',
            confirmButtonText: 'OK',
            backdrop: `rgba(13,87,180,0.3)`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' }
        });
        return false;
    }

    var exist = users.some(user => user.email === email);

    if (exist) {
        Swal.fire({
            icon: 'warning',
            title: '⚡ Email Exists',
            html: '<b>This email is already registered!</b><br>Try logging in instead.',
            background: 'rgba(13, 87, 180, 0.9)',
            color: '#ffffff',
            confirmButtonColor: '#ff9800',
            confirmButtonText: 'OK',
            backdrop: `rgba(13,87,180,0.3)`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' }
        });
        return false;
    }

    var userdata = { name, email, password };

    users.push(userdata);
    localStorage.setItem("userdata", JSON.stringify(users));

    Swal.fire({
        icon: 'success',
        title: '✅ Signup Successful',
        html: '<b>Welcome! 🎉</b><br>Your account has been created.<br>Redirecting to login...',
        background: 'rgba(13, 87, 180, 0.9)',
        color: '#ffffff',
        confirmButtonColor: '#4caf50',
        confirmButtonText: 'Continue',
        backdrop: `rgba(13,87,180,0.3)`,
        showClass: { popup: 'animate__animated animate__zoomIn' },
        hideClass: { popup: 'animate__animated animate__fadeOutDown' },
        allowOutsideClick: false,
        allowEscapeKey: false
    })
        .then(() => window.location.href = "login.html");

    return false;
}
function login() {
    // 1. Inputs se data uthana
    var email = document.getElementById("login-email").value.trim();
    var password = document.getElementById("login-password").value.trim();
    var users = JSON.parse(localStorage.getItem("userdata")) || [];

    if (!email || !password) {
        Swal.fire({
            icon: 'warning',
            title: '⚠️ Missing Credentials',
            html: '<b>Please enter email and password!</b>',
            background: 'rgba(13, 87, 180, 0.9)',
            color: '#ffffff',
            confirmButtonColor: '#ff9800',
            confirmButtonText: 'OK',
            backdrop: `rgba(13,87,180,0.3)`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' }
        });
        return false;
    }

    var userData = users.find(u => u.email === email && u.password === password);

    if (userData) {
        localStorage.setItem("currentUser", JSON.stringify(userData));

        Swal.fire({
            icon: 'success',
            title: '✅ Login Successful',
            html: '<b>Welcome back! 👋</b><br>Opening your CV creator...',
            background: 'rgba(13, 87, 180, 0.9)',
            color: '#ffffff',
            confirmButtonColor: '#4caf50',
            confirmButtonText: 'Continue',
            backdrop: `rgba(13,87,180,0.3)`,
            showClass: { popup: 'animate__animated animate__zoomIn' },
            hideClass: { popup: 'animate__animated animate__fadeOutDown' },
            allowOutsideClick: false,
            allowEscapeKey: false
        })
            .then(() => window.location.href = "cvcreation.html");
    } else {
        Swal.fire({
            icon: 'error',
            title: '❌ Login Failed',
            html: '<b>Invalid email or password!</b><br>Please try again.',
            background: 'rgba(13, 87, 180, 0.9)',
            color: '#ffffff',
            confirmButtonColor: '#ff9800',
            confirmButtonText: 'OK',
            backdrop: `rgba(13,87,180,0.3)`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' }
        });
    }
    return false;
}
function logout() {
    Swal.fire({
        icon: 'success',
        title: '👋 Logged Out',
        html: '<b>See you soon! 👋</b><br>Redirecting to Login...',
        background: 'rgba(13, 12, 87, 0.93)',
        color: '#ffffff',
        confirmButtonColor: '#176cc2',
        confirmButtonText: 'return false to Login',
        backdrop: `rgba(23,108,194,0.3) left top no-repeat`,
        showClass: { popup: 'animate__animated animate__fadeInDown' },
        hideClass: { popup: 'animate__animated animate__fadeOutDown' },
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("currentUser");
            window.location.href = "login.html";
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    var cvCreateBtn = document.querySelector("a.btn");

    if (cvCreateBtn) {
        cvCreateBtn.addEventListener("click", function (e) {
            var loggedInUser = localStorage.getItem("currentUser");
            if (!loggedInUser) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Login Required',
                    text: 'Please login first',
                    background: 'rgba(13, 10, 63, 0.81)',
                    color: '#ffffff',
                    confirmButtonColor: '#f14343',
                    confirmButtonText: 'Go to Login',
                    backdrop: `rgba(241,67,67,0.3) left top no-repeat`,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' }
                });
                return false;
            }

            Swal.fire({
                icon: 'success',
                title: '🎉 Opening Dashboard',
                html: '<b>Redirecting to CV Form... 📝</b>',
                background: 'rgba(29, 14, 70, 0.85)',
                color: '#ffffff',
                confirmButtonColor: '#1f4ff0',
                backdrop: `rgba(31,79,240,0.3) left top no-repeat`,
                showClass: { popup: 'animate__animated animate__zoomIn' },
                hideClass: { popup: 'animate__animated animate__fadeOutDown' },
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then(() => {
                window.location.href = "cvcreation.html";
            });
            return false;
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    var imgInput = document.getElementById("imgInput");
    var previewImg = document.getElementById("previewImg");

    if (imgInput) {
        imgInput.addEventListener("change", function () {
            var file = this.files[0];

            if (file) {
                var reader = new FileReader();

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
    var skillInput = document.getElementById("cv-skills");
    var skillContainer = document.getElementById("skills-container");

    if (skillInput) {
        skillInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                var skill = skillInput.value.trim();

                if (skill !== "") {
                    var tag = document.createElement("span");
                    tag.innerText = skill;
                    skillContainer.appendChild(tag);

                    skillInput.value = "";
                }
                return false;
            }
        });
    }
});

/* =========================
   LANGUAGES TAG SYSTEM
========================= */
document.addEventListener("DOMContentLoaded", function () {
    var languageInput = document.getElementById("cv-languages");
    var languageContainer = document.getElementById("languages-container");

    if (languageInput) {
        languageInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                var language = languageInput.value.trim();

                if (language !== "") {
                    var tag = document.createElement("span");
                    tag.innerText = language;
                    languageContainer.appendChild(tag);

                    languageInput.value = "";
                }
                return false;
            }
        });
    }
});

/* =========================
   DASHBOARD FORM SUBMIT
========================= */
document.addEventListener("DOMContentLoaded", function () {
    var cvForm = document.getElementById("cvForm");

    if (cvForm) {
        cvForm.addEventListener("submit", function (e) {
            return false;

            var fullName = document.getElementById("name")?.value.trim();
            var phone = document.getElementById("phone")?.value.trim();
            var email = document.getElementById("email")?.value.trim();
            var education = document.getElementById("education")?.value.trim();
            var experience = document.getElementById("experience")?.value.trim();
            var about = document.getElementById("about")?.innerHTML.trim();
            var image = document.getElementById("previewImg")?.src;

            var skills = [];
            document.querySelectorAll("#skills-container span").forEach(tag => {
                skills.push(tag.innerText);
            });

            var languages = [];
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
                    background: 'rgba(25, 14, 90, 0.86)',
                    color: '#ffffff',
                    confirmButtonColor: '#f14343',
                    confirmButtonText: 'Compvare Form',
                    backdrop: `rgba(241,67,67,0.3) left top no-repeat`,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' }
                });
                return false;
            }

            var cvData = {
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
                background: 'rgba(29, 12, 70, 0.83)',
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
    var loggedInUser = localStorage.getItem("currentUser");

    var currentPage = window.location.pathname;

    if (
        (currentPage.includes("cvcreation.html") || currentPage.includes("dashboard.html"))
        && !loggedInUser
    ) {
        window.location.href = "login.html";
    }
});

document.querySelectorAll('.select-template').forEach(button => {
    button.addEventListener('click', function () {

        var selectedTemplate = this.getAttribute('data-template');

        localStorage.setItem('selectedTemplate', selectedTemplate);

        Swal.fire({
            icon: 'success',
            title: '✨ Template Selected',
            html: '<b>Your CV Template is Ready 🚀</b><br>Generating your CV...',
            background: 'rgba(27, 7, 99, 0.87)',
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

document.addEventListener("DOMContentLoaded", function () {
    var rawData = localStorage.getItem("cvData");
    var data = JSON.parse(rawData);

    // 2. Simple text data set karna
    document.getElementById("displayName").innerText = data.fullName || "Your Name";
    document.getElementById("displayEmail").innerText = data.email || "Email N/A";
    document.getElementById("displayPhone").innerText = data.phone || "Phone N/A";
    document.getElementById("displayEducation").innerText = data.education || "No Education Details";
    document.getElementById("displayExperience").innerText = data.experience || "No Experience Details";
    document.getElementById("displayAbout").innerHTML = data.about || "No About details provided.";

    // 3. Image handle karna
    if (data.image && data.image !== "") {
        var imgTag = document.getElementById("displayImg");
        imgTag.src = data.image;
        imgTag.style.display = "inline-block";
    }

    // 4. Skills Display (Loop laga kar badges banana)
    var skillsContainer = document.getElementById("displaySkills");
    if (data.skills && data.skills.length > 0) {
        data.skills.forEach(function(skill) {
            var span = document.createElement("span");
            span.className = "tag-badge"; // Bootstrap jaisa custom style
            span.innerText = skill;
            skillsContainer.appendChild(span);
        });
    }

    // 5. Languages Display
    var langContainer = document.getElementById("displayLanguages");
    if (data.languages && data.languages.length > 0) {
        data.languages.forEach(function(lang) {
            var span = document.createElement("span");
            span.className = "tag-badge bg-secondary"; // Different co
            span.innerText = lang;
            langContainer.appendChild(span);
        });
    }
});