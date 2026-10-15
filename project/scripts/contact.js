// Client-side validation and feedback for the contact form.


const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const vehicleInput = document.querySelector("#vehicle");

function showFormStatus(message, statusType) {
    if (formStatus) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${statusType}`;
    }
}

function fillVehicleFromQuery() {
    if (vehicleInput) {
        const pageParameters = new URLSearchParams(window.location.search);
        const vehicleName = pageParameters.get("vehicle");

        if (vehicleName) {
            vehicleInput.value = vehicleName;
        }
    }
}

function handleContactSubmit(event) {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        showFormStatus("Please check the form and complete the required fields.", "error");
        return;
    }

    showFormStatus(
        "Your form is valid. This student project does not send messages to a real dealership.",
        "success"
    );
    contactForm.reset();
}

if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);
}

fillVehicleFromQuery();
