// Banco de dados das questões do quiz
const quizData = [
    {
        question: "O que é uma deepfake?",
        options: [
            { text: "Uma técnica baseada em IA que sintetiza imagens ou sons humanos para criar mídias falsas realistas.", isCorrect: true, rationale: "As deepfakes utilizam redes neurais para sobrepor rostos ou clonar vozes de forma muito convincente." },
            { text: "Um vírus de computador que apaga arquivos HTML de repositórios públicos.", isCorrect: false, rationale: "Deepfakes são mídias sintetizadas por IA, não códigos maliciosos de exclusão." },
            { text: "Uma ferramenta de segurança digital que protege sites contra acessos.", isCorrect: false, rationale: "Trata-se de um desafio de desinformação, não de uma ferramenta de defesa." },
            { text: "Um tipo de criptografia avançada usada para proteger transações bancárias.", isCorrect: false, rationale: "A criptografia protege dados, enquanto a deepfake simula arquivos de mídia falsos." }
        ]
    },
    {
        question: "Qual é o principal impacto negativo das deepfakes e da desinformação na sociedade?",
        options: [
            { text: "A redução na velocidade global de carregamento das páginas da internet.", isCorrect: false, rationale: "A velocidade depende da infraestrutura de rede, não do conteúdo da fake news." },
            { text: "A manipulação da opinião pública, a difamação de indivíduos e a quebra de confiança nas mídias.", isCorrect: true, rationale: "A desinformação em massa distorce a percepção da realidade e prejudica a confiança e a democracia." },
            { text: "O aumento excessivo nos custos de hospedagem de repositórios no GitHub.", isCorrect: false, rationale: "O GitHub Pages hospeda projetos de código de forma gratuita para páginas públicas." },
            { text: "A simplificação exagerada do aprendizado de linguagens de programação.", isCorrect: false, rationale: "Não há relação direta entre desinformação geral e a sintaxe técnica de programação." }
        ]
    },
    {
        question: "No contexto da cidadania digital, qual atitude é fundamental ao receber uma notícia bombástica?",
        options: [
            { text: "Compartilhar imediatamente com o maior número de contatos para alertá-los.", isCorrect: false, rationale: "Repassar sem checar é a forma como boatos ganham força e viralizam." },
            { text: "Avaliar criticamente, verificar a fonte original e cruzar dados com veículos confiáveis.", isCorrect: true, rationale: "O senso crítico e a checagem cruzada são os pilares da segurança e cidadania na rede." },
            { text: "Ignorar o uso da internet por completo e desativar todas as contas digitais.", isCorrect: false, rationale: "A cidadania digital prega o uso consciente do espaço virtual, não a exclusão total dele." },
            { text: "Copiar o texto e criar um novo site no GitHub sem mencionar as fontes.", isCorrect: false, rationale: "Não citar as fontes prejudica a transparência informativa do seu próprio site." }
        ]
    }
];

const quizContainer = document.getElementById('quiz-container');

// Função para exibir as perguntas na tela
function carregarQuiz() {
    quizContainer.innerHTML = "";
    quizData.forEach((q, qIndex) => {
        let questionHtml = `
            <div class="question-card" id="q-card-${qIndex}">
                <div class="question-title">${qIndex + 1}. ${q.question}</div>
        `;
        
        q.options.forEach((opt, oIndex) => {
            questionHtml += `
                <label class="option-container" id="label-${qIndex}-${oIndex}">
                    <input type="radio" name="question-${qIndex}" value="${oIndex}">
                    ${opt.text}
                </label>
            `;
        });
        
        questionHtml += `</div>`;
        quizContainer.innerHTML += questionHtml;
    });
}

// Função executada ao clicar em "Enviar Respostas"
function calcularResultado() {
    let nota = 0;
    
    quizData.forEach((q, qIndex) => {
        const selectedRadio = document.querySelector(`input[name="question-${qIndex}"]:checked`);
        
        q.options.forEach((opt, oIndex) => {
            const currentLabel = document.getElementById(`label-${qIndex}-${oIndex}`);
            
            // Destaca a resposta correta em verde para aprendizado
            if (opt.isCorrect) {
                currentLabel.classList.add('correct');
                // Adiciona a justificativa (rationale)
                if (!document.getElementById(`rat-${qIndex}`)) {
                    const ratDiv = document.createElement('div');
                    ratDiv.id = `rat-${qIndex}`;
                    ratDiv.className = 'rationale';
                    ratDiv.innerText = `💡 Explicação: ${opt.rationale}`;
                    document.getElementById(`q-card-${qIndex}`).appendChild(ratDiv);
                }
            }
            
            // Se o usuário selecionou esta opção e ela estava errada, pinta de vermelho
            if (selectedRadio && parseInt(selectedRadio.value) === oIndex && !opt.isCorrect) {
                currentLabel.classList.add('incorrect');
            }
        });

        if (selectedRadio && q.options[parseInt(selectedRadio.value)].isCorrect) {
            nota++;
        }
    });

    // Exibe o placar final
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerText = `Você acertou ${nota} de ${quizData.length} questões!`;
    resultadoDiv.style.background = nota === quizData.length ? "#d4edda" : "#fff3cd";
    resultadoDiv.style.color = nota === quizData.length ? "#155724" : "#856404";
}

// Inicializa o quiz ao carregar a página
carregarQuiz();
// Banco de dados com os casos do mini game
const cenarioCasos = [
    {
        texto: "Você recebe um áudio do diretor da escola no grupo do WhatsApp pedindo para os alunos transferirem urgentemente R$ 10,00 via Pix para uma conta aleatória para pagar a manutenção das quadras. A voz parece perfeitamente a dele, mas o tom está um pouco robótico.",
        eReal: false,
        explicacao: "Isso é FAKE! Trata-se de uma tentativa de golpe usando clonagem de voz por IA (Deepfake de áudio). Diretores não pedem Pix urgentes para contas desconhecidas em redes sociais."
    },
    {
        texto: "O portal oficial do Ministério da Saúde publica uma nota técnica assinada digitalmente por médicos renomados confirmando o início de uma nova campanha nacional de vacinação nas escolas públicas a partir da próxima segunda-feira.",
        eReal: true,
        explicacao: "Isso é FATO! Informações publicadas em portais governamentais oficiais (.gov.br) e assinadas digitalmente por canais institucionais são fontes seguras de veracidade."
    },
    {
        texto: "Viraliza no TikTok um vídeo de um cientista famoso anunciando que descobriu a cura de uma doença grave usando apenas limão e alho. No vídeo, quando ele pisca, os olhos dele parecem duplicar por milésimos de segundo e o movimento da boca não bate perfeitamente com o som.",
        eReal: false,
        explicacao: "Isso é FAKE! Sincronia labial borrada e falhas visuais ao piscar ou virar de lado são sinais clássicos de que um vídeo passou por um algoritmo gerador de Deepfake."
    }
];

let casoAtualIndex = 0;
let pontuacao = 0;

const cenarioTextoEl = document.getElementById('scenario-text');
const scoreEl = document.getElementById('score');
const currentCaseEl = document.getElementById('current-case');
const feedbackModal = document.getElementById('feedback-modal');
const feedbackTitleEl = document.getElementById('feedback-title');
const feedbackTextEl = document.getElementById('feedback-text');
const gameCard = document.getElementById('game-card');
const endCard = document.getElementById('end-card');
const finalMessageEl = document.getElementById('final-message');

function carregarCaso() {
    if (casoAtualIndex < cenarioCasos.length) {
        cenarioTextoEl.innerText = cenarioCasos[casoAtualIndex].texto;
        currentCaseEl.innerText = casoAtualIndex + 1;
    } else {
        finalizarJogo();
    }
}

function verificarEscolha(escolhaUsuario) {
    const casoAtual = cenarioCasos[casoAtualIndex];
    
    if (escolhaUsuario === casoAtual.eReal) {
        pontuacao += 10;
        scoreEl.innerText = pontuacao;
        feedbackTitleEl.innerText = "🎯 Resposta Correta! Excelente Visão Crítica.";
        feedbackTitleEl.style.color = "#10b981";
    } else {
        feedbackTitleEl.innerText = "❌ Alerta de Perigo! Você caiu no golpe.";
        feedbackTitleEl.style.color = "#ef4444";
    }
    
    feedbackTextEl.innerText = casoAtual.explicacao;
    feedbackModal.classList.remove('hidden');
}

function proximoCaso() {
    feedbackModal.classList.add('hidden');
    casoAtualIndex++;
    carregarCaso();
}

function finalizarJogo() {
    gameCard.classList.add('hidden');
    endCard.classList.remove('hidden');
    
    if (pontuacao === cenarioCasos.length * 10) {
        finalMessageEl.innerText = `Pontuação máxima: ${pontuacao} pontos! Parabéns, você é um verdadeiro Detetive Digital e sabe se proteger da desinformação por IA!`;
    } else {
        finalMessageEl.innerText = `Você fez ${pontuacao} pontos. Continue estudando as práticas de Cidadania Digital para não ser enganado por mídias sintéticas!`;
    }
}

function reiniciarJogo() {
    casoAtualIndex = 0;
    pontuacao = 0;
    scoreEl.innerText = pontuacao;
    endCard.classList.add('hidden');
    gameCard.classList.remove('hidden');
    carregarCaso();
}

// Inicia o jogo automaticamente ao abrir a página
carregarCaso();
