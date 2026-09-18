// =========================================
// SHOP EASE - AUTHENTICATION
// =========================================


// =========================================
// AUTH REQUEST
// =========================================

async function authRequest(url, body) {

    const response = await fetch(url, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(body)

    });


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message ||
            "Something went wrong"
        );

    }


    return data;
}


// =========================================
// LOGIN
// =========================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const message =
                document.getElementById(
                    "loginMessage"
                );


            const emailInput =
                document.getElementById("email");


            const passwordInput =
                document.getElementById("password");


            const email =
                emailInput.value.trim();


            const password =
                passwordInput.value;


            // -----------------------------
            // Validation
            // -----------------------------

            if (!email || !password) {

                message.textContent =
                    "Please enter email and password.";

                return;
            }


            try {

                message.textContent =
                    "Logging in...";


                const data =
                    await authRequest(
                        "/api/auth/login",
                        {
                            email: email,
                            password: password
                        }
                    );


                // -----------------------------
                // Save login information
                // -----------------------------

                localStorage.setItem(
                    "token",
                    data.token
                );


                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );


                // -----------------------------
                // Tell Home page to greet once
                // -----------------------------

                localStorage.setItem(
                    "playWelcomeVoice",
                    "true"
                );


                // -----------------------------
                // Go to homepage
                // -----------------------------

                window.location.href =
                    "index.html";


            } catch (error) {

                message.textContent =
                    error.message;

            }

        }
    );
}


// =========================================
// REGISTER
// =========================================

const registerForm =
    document.getElementById(
        "registerForm"
    );


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const message =
                document.getElementById(
                    "registerMessage"
                );


            const nameInput =
                document.getElementById("name");


            const emailInput =
                document.getElementById("email");


            const passwordInput =
                document.getElementById("password");


            const name =
                nameInput.value.trim();


            const email =
                emailInput.value.trim();


            const password =
                passwordInput.value;


            // -----------------------------
            // Validation
            // -----------------------------

            if (!name || !email || !password) {

                message.textContent =
                    "All fields are required.";

                return;
            }


            if (password.length < 6) {

                message.textContent =
                    "Password must be at least 6 characters.";

                return;
            }


            try {

                message.textContent =
                    "Creating your account...";


                const data =
                    await authRequest(
                        "/api/auth/register",
                        {
                            name: name,
                            email: email,
                            password: password
                        }
                    );


                // -----------------------------
                // Save login information
                // -----------------------------

                localStorage.setItem(
                    "token",
                    data.token
                );


                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );


                // -----------------------------
                // Welcome voice after signup
                // -----------------------------

                localStorage.setItem(
                    "playWelcomeVoice",
                    "true"
                );


                // -----------------------------
                // Go to homepage
                // -----------------------------

                window.location.href =
                    "index.html";


            } catch (error) {

                message.textContent =
                    error.message;

            }

        }
    );
}