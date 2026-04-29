/* =========================
   1. AUTH SYSTEM (Signup/Login)
========================= */
function signup() {
    var name = document.getElementById("signName").value;
    var email = document.getElementById("signEmail").value;
    var password = document.getElementById("signPassword").value;

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    var users = JSON.parse(localStorage.getItem("userdata")) || [];

    if (!name || !email || !password) {
        Swal.fire({
            title: '⚠️ Zaroor Malumat',
            text: 'Sari fields bharna zaroori hain!',
            icon: 'warning',
            background: '#6B46C1',
            color: '#ffffff',
            confirmButtonColor: '#8B5CF6'
        });
        return false;
    }

    if (!emailRegex.test(email)) {
        Swal.fire({
            title: '❌ Galat Email',
            text: 'Email sahi nahi hai!',
            icon: 'error',
            background: '#6B46C1',
            color: '#ffffff',
            confirmButtonColor: '#EC4899'
        });
        return false;
    }
    
    if (!passwordRegex.test(password)) {
        Swal.fire({
            title: '🔐 Kamzor Password',
            text: 'Capital letter, number aur symbol zaroori hai',
            icon: 'warning',
            background: '#6B46C1',
            color: '#ffffff',
            confirmButtonColor: '#8B5CF6'
        });
        return false;
    }

    var exist = users.some(user => user.email === email);
    if (exist) {
        Swal.fire({
            title: '⚠️ Email Mojud Hai',
            text: 'Ye email pehle se register hai!',
            icon: 'warning',
            background: '#6B46C1',
            color: '#ffffff',
            confirmButtonColor: '#8B5CF6'
        });
        return false;
    }

    var userdata = { name, email, password };
    users.push(userdata);
    localStorage.setItem("userdata", JSON.stringify(users));

    Swal.fire({
        title: '✅ Signup Kamyab!',
        text: 'Aapka account ban gaya! Ab login karein.',
        icon: 'success',
        background: '#6B46C1',
        color: '#ffffff',
        confirmButtonColor: '#10B981'
    }).then(() => window.location.href = "login.html");
    
    return false; // Browser reload rokne ke liye
}

function login() {
    var email = document.getElementById("login-email").value.trim();
    var password = document.getElementById("login-password").value.trim();
    var users = JSON.parse(localStorage.getItem("userdata")) || [];

    if (!email || !password) {
        Swal.fire({
            title: '❌ Zaroori Malumat',
            text: 'Email aur Password dono likhein',
            icon: 'error',
            background: '#6B46C1',
            color: '#ffffff',
            confirmButtonColor: '#EC4899'
        });
        return false;
    }

    var userData = users.find(u => u.email === email && u.password === password);

    if (userData) {
        localStorage.setItem("currentUser", JSON.stringify(userData));
        Swal.fire({
            title: '✅ Login Kamyab!',
            text: 'Swagat hai ' + userData.name + '!',
            icon: 'success',
            background: '#6B46C1',
            color: '#ffffff',
            confirmButtonColor: '#10B981'
        }).then(() => window.location.href = "cvcreation.html");
    } else {
        Swal.fire({
            title: '❌ Galat Credentials',
            text: 'Email ya Password galat hai',
            icon: 'error',
            background: '#6B46C1',
            color: '#ffffff',
            confirmButtonColor: '#EC4899'
        });
    }
    return false;
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

/* =========================
   2. MAIN APP LOGIC (Window Load)
========================= */
window.onload = function () {
    
    // CV Create Button Protection
    var cvCreateBtn = document.querySelector("a.btn");
    if (cvCreateBtn) {
        cvCreateBtn.onclick = function () {
            var loggedInUser = localStorage.getItem("currentUser");
            if (!loggedInUser) {
                Swal.fire({
                    icon: 'warning',
                    title: '🔐 Login Zaroor Hai',
                    text: 'Pehle login karein',
                    background: '#6B46C1',
                    color: '#ffffff',
                    confirmButtonColor: '#8B5CF6'
                });
                return false; 
            }
            window.location.href = "dashborad.html";
            return false;
        };
    }

    // Image Preview Logic
    var imgInput = document.getElementById("imgInput");
    var previewImg = document.getElementById("previewImg");
    if (imgInput) {
        imgInput.onchange = function () {
            var file = this.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    previewImg.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        };
    }

    // Skills Tag System (Enter key handling)
    var skillInput = document.getElementById("cv-skills");
    var skillContainer = document.getElementById("skills-container");
    if (skillInput) {
        skillInput.onkeydown = function (e) {
            if (e.key === "Enter") {
                var skill = skillInput.value.trim();
                if (skill !== "") {
                    var tag = document.createElement("span");
                    tag.innerText = skill;
                    tag.style.marginRight = "10px";
                    tag.className = "badge bg-info p-2 m-1"; // Styling ke liye
                    skillContainer.appendChild(tag);
                    skillInput.value = "";
                }
                return false; // Form ko submit hone se rokne ke liye
            }
        };
    }

    // Languages Tag System
    var languageInput = document.getElementById("cv-languages");
    var languageContainer = document.getElementById("languages-container");
    if (languageInput) {
        languageInput.onkeydown = function (e) {
            if (e.key === "Enter") {
                var language = languageInput.value.trim();
                if (language !== "") {
                    var tag = document.createElement("span");
                    tag.innerText = language;
                    tag.style.marginRight = "10px";
                    tag.className = "badge bg-secondary p-2 m-1";
                    languageContainer.appendChild(tag);
                    languageInput.value = "";
                }
                return false; 
            }
        };
    }

    // Form Submit (Data Saving)
    var cvForm = document.getElementById("cvForm");
    if (cvForm) {
        cvForm.onsubmit = function () {
            var fullName = document.getElementById("name") ? document.getElementById("name").value.trim() : "";
            var phone = document.getElementById("phone") ? document.getElementById("phone").value.trim() : "";
            var email = document.getElementById("email") ? document.getElementById("email").value.trim() : "";
            var education = document.getElementById("education") ? document.getElementById("education").value.trim() : "";
            var experience = document.getElementById("experience") ? document.getElementById("experience").value.trim() : "";
            var about = document.getElementById("about") ? document.getElementById("about").innerHTML.trim() : "";
            var image = document.getElementById("previewImg") ? document.getElementById("previewImg").src : "";

            var skills = [];
            document.querySelectorAll("#skills-container span").forEach(tag => {
                skills.push(tag.innerText);
            });

            var languages = [];
            document.querySelectorAll("#languages-container span").forEach(tag => {
                languages.push(tag.innerText);
            });

            if (!fullName || !phone || !email || !education || skills.length === 0) {
                Swal.fire({
                    title: '⚠️ Malumat Adhoori',
                    text: 'Zaroori malumat aur kam se kam ek skill lazmi hai!',
                    icon: 'warning',
                    background: '#6B46C1',
                    color: '#ffffff',
                    confirmButtonColor: '#8B5CF6'
                });
                return false;
            }

            var cvData = { fullName, phone, email, skills, languages, education, experience, about, image };
            localStorage.setItem("cvData", JSON.stringify(cvData));

            Swal.fire({
                title: '✅ Data Save Ho Gaya!',
                text: 'Ab template select karein',
                icon: 'success',
                background: '#6B46C1',
                color: '#ffffff',
                confirmButtonColor: '#10B981'
            }).then(() => window.location.href = "template.html");

            return false; 
        };
    }

    // Template Selection Logic
    document.querySelectorAll('.select-template').forEach(button => {
        button.onclick = function () {
            var selectedTemplate = this.getAttribute('data-template');
            localStorage.setItem('selectedTemplate', selectedTemplate);
            
            Swal.fire({
                title: '✨ Template Select!',
                text: 'Aapki CV ban rahi hai...',
                icon: 'success',
                background: '#6B46C1',
                color: '#ffffff',
                confirmButtonColor: '#10B981'
            }).then(() => window.location.href = 'finalcv.html');
            
            return false;
        };
    });

    // Load CV Data in Final CV Page
    if (document.getElementById("displayName")) {
        var cvData = JSON.parse(localStorage.getItem("cvData")) || {};
        
        document.getElementById("displayName").textContent = cvData.fullName || "---";
        document.getElementById("displayEmail").textContent = cvData.email || "---";
        document.getElementById("displayPhone").textContent = cvData.phone || "---";
        document.getElementById("displayAbout").textContent = cvData.about || "---";
        document.getElementById("displayEducation").textContent = cvData.education || "---";
        document.getElementById("displayExperience").textContent = cvData.experience || "---";
        
        // Display Image
        if (cvData.image) {
            var displayImg = document.getElementById("displayImg");
            displayImg.src = cvData.image;
            displayImg.style.display = "block";
        }
        
        // Display Skills
        var skillsContainer = document.getElementById("displaySkills");
        if (skillsContainer && cvData.skills && cvData.skills.length > 0) {
            skillsContainer.innerHTML = "";
            cvData.skills.forEach(skill => {
                var skillTag = document.createElement("div");
                skillTag.className = "tag-badge";
                skillTag.textContent = skill;
                skillsContainer.appendChild(skillTag);
            });
        }
        
        // Display Languages
        var langsContainer = document.getElementById("displayLanguages");
        if (langsContainer && cvData.languages && cvData.languages.length > 0) {
            langsContainer.innerHTML = "";
            cvData.languages.forEach(lang => {
                var langTag = document.createElement("div");
                langTag.className = "tag-badge";
                langTag.textContent = lang;
                langsContainer.appendChild(langTag);
            });
        }
    }
};

/* Rich Text Formatter */
function format(command, value = null) {
    document.execCommand(command, false, value);
}