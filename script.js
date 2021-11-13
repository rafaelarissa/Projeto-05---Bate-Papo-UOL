function entrarNoChat() {
    const nome = prompt('Qual o seu nome?');
    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', {name: nome});

    promessa.then(sucesso);
    promessa.catch(gerarMensagens);
}
entrarNoChat();

function sucesso() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    
    promessa.then(gerarMensagens);
    console.log("rui");
}

// function trataErro(erro) {
    //     const statusCode = erro.response.status;
    //     console.log(statusCode);
    
    //     prompt("Nome já em uso, digite um outro nome");
    
    // }
    
    function gerarMensagens(resposta){
        const dados = resposta.data;
        
        const mensagens = document.querySelector(".mensagens");
        mensagens.innerHTML = ' ';

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
        let lastmessage = document.querySelector(".mensagens div:last-child");
        lastmessage.scrollIntoView();

}

setInterval(sucesso, 3000); 



