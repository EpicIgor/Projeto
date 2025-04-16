/*Função para validar o cpf*/
function validaCPF(cpf) {  
    var Soma = 0
    var Resto
  
    var strCPF = String(cpf).replace(/[^\d]/g, '')
    
    if (strCPF.length !== 11)
       return false
    
    if ([
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999',
      ].indexOf(strCPF) !== -1)
      return false
  
    for (i=1; i<=9; i++)
      Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  
    Resto = (Soma * 10) % 11
  
    if ((Resto == 10) || (Resto == 11)) 
      Resto = 0
  
    if (Resto != parseInt(strCPF.substring(9, 10)) )
      return false
  
    Soma = 0
  
    for (i = 1; i <= 10; i++)
      Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i)
  
    Resto = (Soma * 10) % 11
  
    if ((Resto == 10) || (Resto == 11)) 
      Resto = 0
  
    if (Resto != parseInt(strCPF.substring(10, 11) ) )
      return false
  
    return true
  }

  /* Usa a API do via cep pra preencher os o restante do endereço uma 
  vez que o usuário clica fora do campo CEP */
  document.getElementById("cep").addEventListener("blur", function() {
    const cep = this.value.replace(/\D/g, "");

    document.getElementById("cepError").textContent = "";

    if (cep.length !== 8) {
      
      document.getElementById("cepError").textContent = "CEP inválido. CEP deve conter 8 números.";
      return;
    
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`).then((response) => response.json()).then((data) => {
        if ("erro" in data) {
            document.getElementById("cepError").textContent = "CEP não encontrado.";
            return;
        }

        document.getElementById("rua").value = data.logradouro;
        document.getElementById("complemento").value = data.complemento;
        document.getElementById("bairro").value = data.bairro;
        document.getElementById("cidade").value = data.localidade;      
        });
  });

 

 /* função para formatar o campo celular e telefone fixo
 pro formato (+55) xx-xxx... conforme o usuário vai digitando.*/
 function phoneConfig (event) {

  let identifier = event.target.id;

if(identifier === "celular") {

  let value = event.target.value;
 
  if(value.length === 9 ) {

    value = value.replace(/(\d{2})(\d{1,9})/, "$1-$2");

  }else if(value.length === 1 || value.length === 2) {

    value = value.replace(/(\d{1,2})/, "(+55) $1");
    
  }
  
  event.target.value = value;
  
  }else if (identifier === "telefone") {

    let value = event.target.value;
 
  if(value.length === 9 ) {

    value = value.replace(/(\d{2})(\d{1,9})/, "$1-$2");

  }else if(value.length === 1 || value.length === 2) {

    value = value.replace(/(\d{1,2})/, "(+55) $1");
    
  }

  event.target.value = value;

  }
  };
    
/* função para formatar o campo cep conforme o usuário vai digitando. */
document.getElementById("cep").addEventListener("keyup", (event) => {

  value = event.target.value.replace(/\D/g, "");
  value = value.replace(/(\d{5})(\d{1,3})/, "$1-$2");
  event.target.value = value;

});
  
/* Função que mostra e esconde a senha pro usuário 
cada vez que ele clica no botão.*/
function showPassword (inputId, imgId) {

  var passwordInput = document.getElementById(inputId);

  if(passwordInput.type === "password") {
    passwordInput.type = "text";
    document.getElementById(imgId).src = "./images/visibilityOn.svg";
  }else {
    passwordInput.type = "password";
    document.getElementById(imgId).src = "./images/visibilityOff.svg";
  }
  
}

/* Função pra formatar o campo cpf
conforme o usuário vai digitando.*/
function cpfConfig (event) {

  let value = event.target.value;

  value = value.replace(/\D/g, "");

  if (value.length >= 10) {

    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");

  } else if (value.length >= 7) {
 
    value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
  
  } else if (value.length >= 4) {
  
    value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
  
  }

  event.target.value = value;

}

/*Função que verifica se ambas as senhas conferem.*/
function confirmadorDeSenha() {

  const senha = document.getElementById("senha").value;
  const senhaConfirm = document.getElementById("senhaConfirm").value;

  if(senha !== senhaConfirm) {

    document.getElementById("spanPasswrd").textContent = "Ambos os campos de senha devem ser iguais!";  
    return false;
  
  }else {
  
    document.getElementById("spanPasswrd").textContent = "";
    return true;
  
  }

}

/* Função que verifica se o campo nome
contém no mínimo 15 caracteres. */
function fullNameErrorMsg () {

  nomeCompleto = document.getElementById("nomeCompleto").value;
  
  if(nomeCompleto.length < 15) {
    
    return false;
  
  }else {
  
    document.getElementById("fName").textContent = "";
    
    return true;
  
  }

}

/* função que verifica se ambos do campos de senha
contém 8 caracteres.*/
function passwordRequirement (inputId, spanId) {

  let value = document.getElementById(inputId).value;

  var regex = /^[a-zA-Z]{8}$/;
  

  if(regex.test(value) === false) {
  
    document.getElementById(spanId).textContent = "A senha atual não contém 8 caracteres alfabéticos!";
    return false;
  
  }else {
  
    document.getElementById(spanId).textContent = "";
    return true;
  
  }

}

/* Função que verifica se o campo login tem
no mínimo 6 caracteres. */
function loginRequirement () {

  let value = document.getElementById("login").value;

  var regex = /^[a-zA-Z]{6}$/;

  if(regex.test(value) === false) {
  
    document.getElementById("loginSpan").textContent = "O login atual não contém 6 caracteres alfabéticos!";
    return false;
  
  }else {
  
    document.getElementById("loginSpan").textContent = "";
    return true;
  
  }

}

/* Evento que faz com que todos os campos de input
 sejam limpos ao clicar no botão "Limpar Tela" */
document.getElementById("limparTelaSignup").addEventListener("click", () => {
  
  input = document.querySelectorAll("input");

  for(i = 0; i < input.length - 1; i++){
  
    input[i].value = "";
  
  };

  document.getElementById("fName").textContent = "";
  document.getElementById("cpfError").textContent = "";
  document.getElementById("cepError").textContent = "";
  document.getElementById("loginSpan").textContent = "(O login deve conter 6 caracteres alfabéticos)";
  document.getElementById("passwrdRequirementId").textContent = "(A senha deve conter 8 caracteres alfabéticos)";
  document.getElementById("spanPasswrd").textContent = "";
  document.getElementById("spanConfirm").textContent = "";

});


/* Evento que exibe mensagens de erro caso algo não seja preenchido corretamente,
cria usuário novo e redireciona pra página de login quando clica no botão de enviar. */
document.getElementById("signupForm").addEventListener("submit", (event) => {

  event.preventDefault();

  document.getElementById("fName").textContent = "";

    
  if(fullNameErrorMsg() === false) {

    document.getElementById("fName").textContent = "O campo nome deve ter no mínimo 15 caracteres!";
    return;
    
  }

  document.getElementById("cpfError").textContent = "";
    
  if(validaCPF(event.target.cpf.value) === false) {
    
    document.getElementById("cpfError").textContent = "CPF inválido! Por favor, insira um CPF válido.";
      
    return;
    
  }

  if(loginRequirement() === false) {

    return;
  }

  if(confirmadorDeSenha() === false || passwordRequirement('senha', 'passwrdRequirementId') === false) {
      
    return;
  }

  const accounts = JSON.parse(sessionStorage.getItem("accountData")) || [];
 
  const Newaccount = {
    nome: event.target.nome.value,
    aniversario: event.target.aniversario.value,
    genero: event.target.genero.value,
    nomeDaMae: event.target.mae.value,
    cpf: event.target.cpf.value,
    email: event.target.email.value,
    celular: event.target.celular.value,
    telefone: event.target.telefone.value,
    cep: event.target.cep.value,
    rua: event.target.rua.value,
    numeroDaRua: event.target.numeroDaRua.value,
    complemento: event.target.complemento.value,
    bairro: event.target.bairro.value,
    cidade: event.target.cidade.value,
    senha: event.target.senha.value,
    login: event.target.login.value
  }
   
  accounts.push(Newaccount);
    
  sessionStorage.setItem("accountData", JSON.stringify(accounts));
    
  window.location.href = "./login.html";    

});



