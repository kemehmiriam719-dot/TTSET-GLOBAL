"use strict";

/* =========================================================
   1. MOBILE NAVIGATION
   ========================================================= */
const menuButton = document.querySelector(".menu-toggle");

const navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {

        const menuIsOpen = navigation.classList.toggle("is-open");


        menuButton.setAttribute("aria-expanded", String(menuIsOpen));

        
        menuButton.setAttribute(
            "aria-label",
            menuIsOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("is-open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation menu");
        });
    });
}

/* =========================================================
   2. AUTOMATIC COPYRIGHT YEAR
   ========================================================= */

// Find the span in the footer that displays the year.
const yearElement = document.querySelector("#current-year");

if (yearElement) {
    // new Date().getFullYear() returns the current four-digit year.
    yearElement.textContent = String(new Date().getFullYear());
}

/* =========================================================
   3. CONTACT FORM VALIDATION
   This demonstration validates locally; it does not send email.
   ========================================================= */

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
    // Store references to the fields so they can be reused easily.
    const fields = {
        name: document.querySelector("#full-name"),
        email: document.querySelector("#email"),
        service: document.querySelector("#service"),
        message: document.querySelector("#message")
    };

    const statusMessage = document.querySelector("#form-status");

    // Displays an error beside a field and applies a red border.
    function showError(field, errorElementId, message) {
        const errorElement = document.querySelector(`#${errorElementId}`);
        field.classList.add("input-error");
        field.setAttribute("aria-invalid", "true");
        errorElement.textContent = message;
    }

    // Removes the previous validation message from a field.
    function clearError(field, errorElementId) {
        const errorElement = document.querySelector(`#${errorElementId}`);
        field.classList.remove("input-error");
        field.removeAttribute("aria-invalid");
        errorElement.textContent = "";
    }

    // A small regular expression checks the basic structure of an email address.
    function emailLooksValid(emailAddress) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
    }

    contactForm.addEventListener("submit", (event) => {
        // Prevent a real page reload while this teaching example is validated.
        event.preventDefault();

        let formIsValid = true;
        statusMessage.textContent = "";

        // NAME: at least two visible characters are required.
        clearError(fields.name, "name-error");
        if (fields.name.value.trim().length < 2) {
            showError(fields.name, "name-error", "Enter your full name.");
            formIsValid = false;
        }

        // EMAIL: the field must follow a simple name@example.com structure.
        clearError(fields.email, "email-error");
        if (!emailLooksValid(fields.email.value.trim())) {
            showError(fields.email, "email-error", "Enter a valid email address.");
            formIsValid = false;
        }

        // SERVICE: the first empty option is not accepted.
        clearError(fields.service, "service-error");
        if (fields.service.value === "") {
            showError(fields.service, "service-error", "Select the service you need.");
            formIsValid = false;
        }

        // MESSAGE: enough detail is required to understand the enquiry.
        clearError(fields.message, "message-error");
        if (fields.message.value.trim().length < 20) {
            showError(
                fields.message,
                "message-error",
                "Write at least 20 characters about your project."
            );
            formIsValid = false;
        }

        if (formIsValid) {
            statusMessage.textContent =
                "Validation successful. Connect this form to a backend service to send it.";
            contactForm.reset();
            fields.name.focus();
        } else {
            // Focus the first invalid field to help keyboard users correct it quickly.
            const firstInvalidField = contactForm.querySelector(".input-error");
            firstInvalidField?.focus();
        }
    });
}
