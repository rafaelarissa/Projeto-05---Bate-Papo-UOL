function entrarNoChat() {
    const nome = prompt('Qual o seu nome?');
    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', {name: nome});

    promessa.then(sucesso);
    promessa.catch(processarResposta);
}
entrarNoChat();

function sucesso() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    
    promessa.then(processarResposta);
}


function gerarMensagens(resposta){
    const dados = resposta.data;

    const mensagens = document.querySelector(".mensagens")

    // const horario = document.querySelector(".horario").value;
    // horario.innerHTML = dados.time;

    console.log(dados);


    for(i = 0; i < dados.length; i++) {
        if(dados[i].type === 'status') {
            mensagens.innerHTML +=`
            <div class="status" data-identifier="message"><span class="horario">(${dados[i].time})</span> <span class="usuario">${dados[i].from}</span> ${dados[i].text}</div>`
        }
        else if(dados[i].type === 'message'){
            mensagens.innerHTML +=`
            <div class="message" data-identifier="message"><span  class="horario">(${dados[i].time})</span> <span class="usuario">${dados[i].from}</span> <span class="usuario">${dados[i].to}</span> ${dados[i].text}</div>`            
        }
        else{
            mensagens.innerHTML +=`
            <div class="private-message" data-identifier="message"><span  class="horario">(${dados[i].time})</span> <span class="usuario">${dados[i].from}</span> <span class="usuario">${dados[i].to}</span> ${dados[i].text}</div>`            
        }
    }

    //  if('tipo for igual a status'){
    //     'mensagem recebe classe mensagem-status'
    //  }else if('tipo for igual a private_message'){
    //     ' a mensagem recebe classe mensagem-privada'
    //  }else{
    //     'mensagem recebe classe mensagem-normal'
    //  }


    // const nome = document.querySelector(".nome").value;    
}