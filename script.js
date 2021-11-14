let nome = ' ';

function entrarNoChat() {
    nome = prompt('Qual o seu nome?');
    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', { name: nome });

    promessa.then(sucesso);
    promessa.catch(trataErro);
}
entrarNoChat();

function sucesso() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');

    promessa.then(gerarMensagens);
}

function trataErro(erro) {
    console.log(erro.response);

    if (erro.response.status === 400) {
        alert("Nome já utilizado");
    }
    else {
        window.location.reload();
    }
    entrarNoChat();
}

function gerarMensagens(resposta) {
    const dados = resposta.data;
    // console.log(dados);

    const mensagens = document.querySelector(".mensagens");
    mensagens.innerHTML = ' ';

    for (i = 0; i < dados.length; i++) {

        if (dados[i].type === 'status') {
            mensagens.innerHTML += `
        <div class="status" data-identifier="message"><span class="horario">(${dados[i].time})</span> <span class="usuario">${dados[i].from}</span> ${dados[i].text}</div>`
        }
        else if (dados[i].type === 'message') {
            mensagens.innerHTML += `
            <div class="message" data-identifier="message"><span  class="horario">(${dados[i].time})</span> <span class="usuario">${dados[i].from}</span> para <span class="usuario">${dados[i].to}</span> ${dados[i].text}</div>`
        }
        else {
            if (dados[i].to === nome) {
                mensagens.innerHTML += `
                <div class="private-message" data-identifier="message"><span  class="horario">(${dados[i].time})</span> <span class="usuario">${dados[i].from}</span> reservadamente para <span class="usuario">${dados[i].to}</span> ${dados[i].text}</div>`
            }
            else {
                mensagens.innerHTML += `
                <div class="private-message" data-identifier="message" style="display: none;"><span  class="horario">(${dados[i].time})</span> <span class="usuario">${dados[i].from}</span> reservadamente para <span class="usuario">${dados[i].to}</span> ${dados[i].text}</div>`
            }
        }
    }
    let lastmessage = document.querySelector(".mensagens div:last-child");
    lastmessage.scrollIntoView();

}

function manterConexao() {
    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', {name: nome});
    
    promessa.then(sucesso);
    promessa.catch(trataErro);
}

function enviarMensagem() {
    console.log("envio mensagem");

    const inputNovaMensagem = document.querySelector(".nova-mensagem");
    
    const novaMensagem = {
        from: nome,
        to: "Todos",
        text: inputNovaMensagem.value,
        type: "message" // ou "private_message" para o bônus
    }  
    inputNovaMensagem.value = " ";

    console.log(novaMensagem);
    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', novaMensagem);
    
    promessa.then(sucesso);
}


setInterval(manterConexao, 5000);
setInterval(sucesso, 3000);



