
let data
let totalQuizzes
let proximoQuiz = 1


fetch('quiz.json')
  .then(response => response.json())
  .then((json) => {
    
    data = json
    totalQuizzes = Object.keys(data).length + 1

    //Pergunta
    let pergunta = document.getElementById('pergunta')
    pergunta.innerHTML = data['quiz-1'].pergunta

    //A
    let A = document.getElementById('A')
    A.innerHTML = data['quiz-1'].A
    
    //B
    let B = document.getElementById('B')
    B.innerHTML = data['quiz-1'].B

    //C
    let C = document.getElementById('C')
    C.innerHTML = data['quiz-1'].C
    
    //D
    let D = document.getElementById('D')
    D.innerHTML = data['quiz-1'].D
  })
  .catch(error => console.error('Erro ao carregar o JSON:', error))


//Proximo quizz
function proxima() {
  
  proximoQuiz++

  if (proximoQuiz === totalQuizzes) {
    proximoQuiz = 1; // Reseta para o primeiro quiz
  }


  console.log(proximoQuiz)

  //Pergunta
  let pergunta = document.getElementById('pergunta')
  pergunta.innerHTML = data[`quiz-${proximoQuiz}`].pergunta

  //A
  let A = document.getElementById('A')
  A.innerHTML = data[`quiz-${proximoQuiz}`].A
    
  //B
  let B = document.getElementById('B')
  B.innerHTML = data[`quiz-${proximoQuiz}`].B

  //C
  let C = document.getElementById('C')
  C.innerHTML = data[`quiz-${proximoQuiz}`].C
    
  //D
  let D = document.getElementById('D')
  D.innerHTML = data[`quiz-${proximoQuiz}`].D
}



function escolha(respostaExata) {

  // Acessando o valor correto de "vamo" dentro do objeto "data"
  let vamo = data[`quiz-${proximoQuiz}`][`${respostaExata}`]

  // Obtém a resposta correta do quiz atual
  let respostaCorreta = data[`quiz-${proximoQuiz}`].respostaCorreta

  let pts = document.getElementById("pontosExatos");

  // Compara a resposta do usuário com a resposta correta
  if (vamo === respostaCorreta) {
    
    let exibirResposta = document.getElementById("respostaExata")
    exibirResposta.innerHTML = "Resposta correta!"
    exibirResposta.style.color = "green"
    console.log("Resposta correta!");

    setTimeout(() => {
      proxima()
      exibirResposta.innerHTML = ""
    }, 1800);
    
    let valorAtual = parseInt(pts.textContent) || 0; // Obtém o valor atual e converte para número
    pts.textContent = valorAtual + 10; // Soma 10 e atualiza o texto
    
  } else {

    let exibirResposta = document.getElementById("respostaExata")
    exibirResposta.innerHTML = "Resposta incorreta. Tente novamente."
    exibirResposta.style.color = "red"


    let valorAtual = parseInt(pts.textContent) || 0; // Obtém o valor atual e converte para número
    pts.textContent = Math.max(-0, valorAtual - 5); // Subtrai 5, mas impede valores negativos


    setTimeout(() => {
      exibirResposta.innerHTML = ""
    }, 1800);
  }
}