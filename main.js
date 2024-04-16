let alertDisplayed = false;

document.addEventListener('click', function() {
    const form = document.getElementById('form');
    const inputs = form.querySelectorAll('input, textarea');
    const submitBtn = form.querySelector('#enviar');

    // Flags para verificar se os campos foram tocados
    let nameTouched = false;
    let emailTouched = false;
    let subjectTouched = false;
    let messageTouched = false;

    // Função para validar o nome
    function validateName() {
        const nameInput = form.querySelector('#nome');
        const name = nameInput.value.trim();
        
        if (!nameTouched) {
            return true;
        }

        if (name === '' || name.length > 50) {
            setError(nameInput, 'Nome inválido (máx. 50 caracteres)');
            return false;
        } else {
            clearError(nameInput);
            return true;
        }
    }

    // Função para validar o email
    function validateEmail() {
        const emailInput = form.querySelector('#email');
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailTouched) {
            return true;
        }

        if (email === '' || !emailRegex.test(email)) {
            setError(emailInput, 'Email inválido');
            return false;
        } else {
            clearError(emailInput);
            return true;
        }
    }

    // Função para validar o assunto
    function validateSubject() {
        const subjectInput = form.querySelector('#assunto');
        const subject = subjectInput.value.trim();

        if (!subjectTouched) {
            return true;
        }

        if (subject === '' || subject.length > 50) {
            setError(subjectInput, 'Assunto inválido (máx. 50 caracteres)');
            return false;
        } else {
            clearError(subjectInput);
            return true;
        }
    }

    // Função para validar a mensagem
    function validateMessage() {
        const messageInput = form.querySelector('#mensagem');
        const message = messageInput.value.trim();

        if (!messageTouched) {
            return true;
        }

        if (message === '' || message.length > 300) {
            setError(messageInput, 'Mensagem inválida (máx. 300 caracteres)');
            return false;
        } else {
            clearError(messageInput);
            return true;
        }
    }
    
    // Adicionar evento de entrada para o campo de nome
    const nameInput = form.querySelector('#nome');
    nameInput.addEventListener('input', function() {
     nameTouched = true;
     validateForm(); // Chamar a função validateForm() para atualizar a validação do formulário
    });

    // Função para exibir mensagem de erro
    function setError(input, message) {
        const errorLabel = input.nextElementSibling;
        errorLabel.textContent = message;
        input.classList.add('error');
    }

    // Função para limpar mensagem de erro
    function clearError(input) {
        const errorLabel = input.nextElementSibling;
        errorLabel.textContent = '';
        input.classList.remove('error');
    }

    // Função para validar o formulário
    function validateForm() {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    // Adicionar eventos de entrada para validar o formulário
    inputs.forEach(input => {
        input.addEventListener('input', validateForm);
    });

    // Adicionar eventos de foco para os campos de assunto e mensagem
    const subjectInput = form.querySelector('#assunto');
    subjectInput.addEventListener('focus', function() {
        subjectTouched = true;
    });

    const messageInput = form.querySelector('#mensagem');
    messageInput.addEventListener('focus', function() {
        messageTouched = true;
    });

    // Adicionar evento de foco para o campo de e-mail
    const emailInput = form.querySelector('#email');
    emailInput.addEventListener('focus', function() {
        emailTouched = true;
    });

    // Adicionar evento de envio para o formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Limpar o formulário após o envio
        form.reset();

        // Exibir alerta de envio confirmado
        if(!alertDisplayed) {
            alert('Sua mensagem foi enviada com sucesso!');
            alertDisplayed = true;
        }
    });
});
