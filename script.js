// ---------- SIGNUP ----------
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get values
        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        // Error elements
        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");
        const confirmError = document.getElementById("confirmError");
        const successMsg = document.getElementById("signupSuccess");

        // Clear previous errors
        nameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        confirmError.textContent = "";
        successMsg.textContent = "";

        let isValid = true;

        // Name validation
        if (fullname.length < 3) {
            nameError.textContent = "Name must be at least 3 characters.";
            isValid = false;
        }

        // Email validation
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!email.match(emailPattern)) {
            emailError.textContent = "Enter a valid email address.";
            isValid = false;
        }

        // Password validation
        if (password.length < 6) {
            passwordError.textContent = "Password must be at least 6 characters.";
            isValid = false;
        }

        // Confirm password
        if (password !== confirmPassword) {
            confirmError.textContent = "Passwords do not match.";
            isValid = false;
        }

        if (isValid) {
            const user = {
                fullname,
                email,
                password
            };

            localStorage.setItem("user", JSON.stringify(user));

            successMsg.textContent = "Signup successful! Redirecting...";
            
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        }
    });
}


// ---------- LOGIN ----------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        const emailError = document.getElementById("loginEmailError");
        const passwordError = document.getElementById("loginPasswordError");
        const successMsg = document.getElementById("loginSuccess");

        emailError.textContent = "";
        passwordError.textContent = "";
        successMsg.textContent = "";

        let isValid = true;

        if (email === "") {
            emailError.textContent = "Email is required.";
            isValid = false;
        }

        if (password === "") {
            passwordError.textContent = "Password is required.";
            isValid = false;
        }

        if (!isValid) return;

        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser && storedUser.email === email && storedUser.password === password) {
            successMsg.textContent = "Login successful!";
        } else {
            passwordError.textContent = "Invalid email or password.";
        }
    });
}