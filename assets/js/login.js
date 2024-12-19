(function ($) {
    "use strict";

    /*==================================================================
    [ Focus input ]*/
    $(".input100").each(function () {
        $(this).on("blur", function () {
            if ($(this).val().trim() != "") {
                $(this).addClass("has-val");
            } else {
                $(this).removeClass("has-val");
            }
        });
    });

    /*==================================================================
    [ Validate ]*/
    var input = $(".validate-input .input100");

    $(".validate-form").on("submit", function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });

    $(".validate-form .input100").each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if (
            $(input).attr("type") == "email" ||
            $(input).attr("name") == "email"
        ) {
            if (
                $(input)
                    .val()
                    .trim()
                    .match(
                        /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
                    ) == null
            ) {
                return false;
            }
        } else {
            if ($(input).val().trim() == "") {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass("alert-validate");
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass("alert-validate");
    }

    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $(".btn-show-pass").on("click", function () {
        if (showPass == 0) {
            $(this).next("input").attr("type", "text");
            $(this).find("i").removeClass("zmdi-eye");
            $(this).find("i").addClass("zmdi-eye-off");
            showPass = 1;
        } else {
            $(this).next("input").attr("type", "password");
            $(this).find("i").addClass("zmdi-eye");
            $(this).find("i").removeClass("zmdi-eye-off");
            showPass = 0;
        }
    });
})(jQuery);

document
    .getElementById("loginForm")
    .addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita o reload da página

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const token = data.token;
                // Armazenar o token no localStorage
                localStorage.setItem("token", data.token);

                // Decodificar o token para extrair o role/isAdmin
                const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodificando o payload do JWT

                if (decodedToken.isAdmin) {
                    // Redirecionar para pedidos.html se for administrador
                    window.location.href = "pedidos.html";
                } else {
                    // Redirecionar para index.html para outros usuários
                    window.location.href = "index.html";
                }
            } else {
                document.getElementById("message").textContent =
                    data.message || "Erro ao fazer login";
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            document.getElementById("message").textContent =
                "Erro ao conectar ao servidor.";
        }
    });
