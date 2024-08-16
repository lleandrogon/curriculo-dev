function showForm(formId) {
    document.querySelectorAll('.col-md-9.col-sm-12 > div[id]').forEach(form => form.classList.add('hidden'));
    document.getElementById(formId).classList.remove('hidden');
}

document.getElementById('menu-toggle').addEventListener('click', function () {
    const nav = document.querySelector('.navegacao ul');
    nav.classList.toggle('show');
});

function handleFormSubmit(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input, select, textarea');
    const formData = {};
    let isFormFilled = false;

    inputs.forEach(input => {
        if (input.type === 'radio' && !input.checked) return;

        if (input.value.trim() !== '') {
            isFormFilled = true;
        }
        formData[input.id] = input.value;
    });

    if (!isFormFilled) {
        alert('Por favor, preencha pelo menos um campo antes de enviar.');
        return;
    } else {
        alert('Dados enviados com sucesso!');
    }

    console.log(formData);
}

document.querySelectorAll('button[type="submit"]').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        const formId = button.closest('div[id]').id;
        handleFormSubmit(formId);
    });
});

function saveFormState() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        sessionStorage.setItem(input.id, input.value);
    });
}

function restoreFormState() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        const savedValue = sessionStorage.getItem(input.id);
        if (savedValue !== null) {
            input.value = savedValue;

            if (input.type === 'radio') {
                input.checked = (input.value === savedValue);
            }
        }
    });
}

window.addEventListener('beforeunload', saveFormState);
document.addEventListener('DOMContentLoaded', restoreFormState);

document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', () => {
        sessionStorage.setItem(input.id, input.value);
    });
});
