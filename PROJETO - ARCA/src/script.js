const slider = document.querySelectorAll('.slider');
const btnPrev = document.getElementById('prev-button');
const btnNext = document.getElementById('next-button');

let currentSlide = 0;
let timer;


// Só executa SE existir carrossel na página
if(slider.length > 0 && btnPrev && btnNext){

  function hideSlider() {
    slider.forEach(item => item.classList.remove('on'));
  }

  function showSlider() {
    slider[currentSlide].classList.add('on');
  }

  function nextSlider() {
    hideSlider();

    if (currentSlide === slider.length - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    showSlider();
    resetTimer();
  }

  function prevSlider() {
    hideSlider();

    if (currentSlide === 0) {
      currentSlide = slider.length - 1;
    } else {
      currentSlide--;
    }

    showSlider();
    resetTimer();
  }

  function startTimer() {
    timer = setInterval(nextSlider, 2000);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  btnNext.addEventListener('click', nextSlider);
  btnPrev.addEventListener('click', prevSlider);

  startTimer();

}



//============================================================================
//    2.POP UP - CONFIRMAÇÃO DE DENUNCIA E FLUXO DE RETORNO
//============================================================================

// ELEMENTOS DAS TELAS
let btnAbrirModal = document.getElementById("btnAbrirModal");
let modal = document.getElementById("meuModal");
let telaCarregando = document.getElementById("telaCarregando");
let telaSucesso = document.getElementById("telaSucesso");

// ELEMENTOS DOS BOTÕES
let btnCancelar = document.getElementById("btnCancelar");
let btnConfirmar = document.getElementById("btnConfirmar");
let btnFecharSucesso = document.getElementById("btnFecharSucesso");

// Só executa se os elementos principais existirem na página
if (btnAbrirModal && modal && btnCancelar && btnConfirmar && telaCarregando && telaSucesso && btnFecharSucesso) {
  
  // ABRIR MODAL PRINCIPAL
  btnAbrirModal.onclick = function(event) {
    event.preventDefault();

    let local = document.getElementById("local").value;
    let hora = document.getElementById("hora").value;
    let descricao = document.getElementById("descricao").value;

    if (local != "" && hora != "" && descricao != "") {
      modal.style.display = "flex";
    } else {
      alert("Preencha todos os campos!");
    }
  }

  // BOTÃO CANCELAR
  btnCancelar.onclick = function() {
    modal.style.display = "none";
  }

  // BOTÃO CONFIRMAR 
  btnConfirmar.onclick = function() {
    modal.style.display = "none";
    
    // "Verificando Informações"
    telaCarregando.style.display = "flex";
    
    // 3. Aguarda 3 segundos (3000ms) e executa a função que troca para o sucesso
    setTimeout(revelarSucesso, 3000);
  }

  // FUNÇÃO AUXILIAR: Troca o carregando pelo sucesso
  function revelarSucesso() {
    telaCarregando.style.display = "none";
    telaSucesso.style.display = "flex";
  }

  // BOTÃO CONCLUÍDO (Fecha a última tela)
  btnFecharSucesso.onclick = function() {
    telaSucesso.style.display = "none";
    
    // Opcional: Limpa os campos após fechar tudo
    document.getElementById("local").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("descricao").value = "";
  }
}

//============================================================================
//    3.HEADER - NAV
//============================================================================


// 1. Função genérica que abre e fecha os menus (Igual à anterior)
function gerenciarMenu(botao, menu, outroMenu) {
    if (botao && menu) {
        botao.addEventListener('click', function(evento) {
            evento.stopPropagation();
            if (outroMenu && outroMenu.classList.contains('active')) {
                outroMenu.classList.remove('active');
            }
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
            } else {
                menu.classList.add('active');
            }
        });
    }
}

const btnApps = document.querySelector('.menu-lista .dropdown-trigger');
const listaApps = document.querySelector('.menu-lista .dropdown-menu');
const btnPerfil = document.querySelector('.menu-lista-02 .dropdown-trigger');
const listaPerfil = document.querySelector('.menu-lista-02 .dropdown-menu');

gerenciarMenu(btnApps, listaApps, listaPerfil);
gerenciarMenu(btnPerfil, listaPerfil, listaApps);

document.addEventListener('click', function() {
    if (listaApps && listaApps.classList.contains('active')) { listaApps.classList.remove('active'); }
    if (listaPerfil && listaPerfil.classList.contains('active')) { listaPerfil.classList.remove('active'); }
});


// ==========================================================================
// 2. LÓGICA DE VALIDAÇÃO DE PERFIS E ABAS (REQUISITOS DO PROFESSOR + VISUAL)
// ==========================================================================

// Base de dados dos usuários e senhas exigidos pelo professor
const USUARIOS_PERFIS = {
    "cassio": {
        senha: "23082007",
        nome: "Cassio Oliveira",
        links: [
            { texto: "👤 Meus Animais", url: "#meus-animais" },
            { texto: "🛠️ Solicitar Adoção", url: "#solicitar-adocao" },
            { texto: "📅 Agendar Consultas", url: "#consultas" }
        ]
    },
    "tutor": {
        senha: "123456",
        nome: "Tutor de Animais",
        links: [
            { texto: "👤 Meus Animais", url: "#meus-animais" },
            { texto: "🛠️ Solicitar Adoção", url: "#solicitar-adocao" },
            { texto: "📅 Agendar Consultas", url: "#consultas" }
        ]
    },
    "candidato": {
        senha: "cand!098",
        nome: "Candidato a Adotante",
        links: [
            { texto: "🐾 Animais Disponíveis", url: "#disponiveis" },
            { texto: "📝 Formulário de Interesse", url: "#formulario" },
            { texto: "ℹ️ Status do Processo", url: "#status" }
        ]
    },
    "ong": {
        senha: "ong$-135",
        nome: "ONG Parceira",
        links: [
            { texto: "🐾 Cadastrar Animal", url: "#cadastrar-animal" },
            { texto: "📊 Relatórios de Adoção", url: "#relatorios" },
            { texto: "🤝 Solicitar Apoio", url: "#solicitar-apoio" }
        ]
    },
    "prefeitura": {
        senha: "pref@456",
        nome: "Gestão Prefeitura",
        links: [
            { texto: "📈 Painel de Castrações", url: "#painel-castracao" },
            { texto: "🚨 Gerenciar Denúncias", url: "#gerenciar-denuncias" },
            { texto: "🏢 Alocação de Recursos", url: "#recursos" }
        ]
    }
};

// Elementos da Interface capturados do seu código
const caixaConteudoPerfil = document.getElementById('conteudo-perfil');
const modalAuth = document.getElementById('modal-auth');
const btnFecharAuth = document.getElementById('btn-fechar-auth');
const tabLogin = document.getElementById('tab-login');
const tabCadastro = document.getElementById('tab-cadastro');
const labelUsuario = document.getElementById('label-usuario');
const inputUsuario = document.getElementById('auth-email');
const btnAuthPrincipal = document.getElementById('btn-auth-principal');

// Variável de controle para saber qual aba está ativa ('login' ou 'cadastro')
let modoFormulario = 'login'; 

if (caixaConteudoPerfil && modalAuth) {
    
    // 1. CAPTURA DE CLIQUES NO DROPDOWN DE PERFIL (ENTRAR / CRIAR CONTA / SAIR)
    caixaConteudoPerfil.addEventListener('click', function(evento) {
        const textoClique = evento.target.innerText || '';
        
        // Abre o modal tanto se clicar em "Entrar" quanto em "Criar uma Conta"
        if (evento.target.id === 'btn-entrar' || textoClique.includes('Criar uma Conta')) {
            evento.preventDefault();
            modalAuth.style.display = 'flex';
            
            // Abre o modal diretamente na aba correta dependendo do link clicado
            if (textoClique.includes('Criar uma Conta')) {
                mudarModoFormulario('cadastro');
            } else {
                mudarModoFormulario('login');
            }
        }
        
        // Lógica de Logout
        if (evento.target.id === 'btn-sair') {
            evento.preventDefault();
            renderizarMenuDeslogado();
            alert("Você saiu do painel do projeto Arca.");
        }
    });

    // 2. CONTROLE DE FECHAMENTO DO MODAL
    if (btnFecharAuth) btnFecharAuth.onclick = () => modalAuth.style.display = 'none';
    modalAuth.onclick = (e) => { if (e.target === modalAuth) modalAuth.style.display = 'none'; };

    // 3. ALTERNÂNCIA VISUAL E TEXTUAL ENTRE AS ABAS (ENTRAR / CADASTRAR)
    if (tabLogin && tabCadastro) {
        tabLogin.onclick = () => mudarModoFormulario('login');
        tabCadastro.onclick = () => mudarModoFormulario('cadastro');
    }

    function mudarModoFormulario(modo) {
        modoFormulario = modo;
        
        // Limpa os campos para o usuário ao trocar de aba
        if (inputUsuario) inputUsuario.value = "";
        document.getElementById('auth-senha').value = "";

        if (modo === 'login') {
            tabLogin.classList.add('active');
            tabCadastro.classList.remove('active');
            if (labelUsuario) labelUsuario.innerText = "Usuário / Perfil";
            if (inputUsuario) inputUsuario.placeholder = "Ex: tutor, candidato, ong...";
            btnAuthPrincipal.innerText = 'Entrar';
        } else {
            tabCadastro.classList.add('active');
            tabLogin.classList.remove('active');
            if (labelUsuario) labelUsuario.innerText = "E-mail para Cadastro";
            if (inputUsuario) inputUsuario.placeholder = "seu@email.com";
            btnAuthPrincipal.innerText = 'Criar Conta';
        }
    }

    // 4. INTERCEPÇÃO DO FORMULÁRIO (ENVIO)
    document.getElementById('form-autenticacao').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const valorUsuario = inputUsuario.value.trim();
        const senhaDigitada = document.getElementById('auth-senha').value;

        // FLUXO A: USUÁRIO TENTANDO FAZER LOGIN (Regra do Professor)
        if (modoFormulario === 'login') {
            const usuarioMinusculo = valorUsuario.toLowerCase(); // Evita erros com Letras Maiúsculas

            if (USUARIOS_PERFIS[usuarioMinusculo]) {
                const perfil = USUARIOS_PERFIS[usuarioMinusculo];
                
                // Valida a senha correspondente
                if (perfil.senha === senhaDigitada) {
                    modalAuth.style.display = 'none';
                    renderizarMenuLogado(usuarioMinusculo, perfil);
                    alert(`Login realizado com sucesso como: ${perfil.nome}!`);
                } else {
                    alert("Senha incorreta para este perfil!");
                }
            } else {
                alert("Usuário não encontrado! Para testes escolares, use: tutor, candidato, ong ou prefeitura.");
            }
        } 
        // FLUXO B: USUÁRIO TENTANDO CADASTRAR (Simulação Demonstrativa)
        else {
            alert(`O e-mail "${valorUsuario}" foi detectado pelo sistema! Como este site está em ambiente de testes e avaliação, os perfis já foram pré-configurados. Por favor, utilize a aba "Entrar" com as credenciais do trabalho.`);
            mudarModoFormulario('login'); // Joga o usuário de volta para o login de forma elegante
        }
    });

    // 5. SIMULAÇÃO DO BOTÃO DO GOOGLE (Mantido apenas pelo Visual)
    const btnGoogle = document.getElementById('btn-login-google');
    if (btnGoogle) {
        btnGoogle.onclick = function() {
            alert("O login via Google está ativo apenas como demonstração de interface. Use os perfis de validação locais na aba 'Entrar'.");
        };
    }

    // 6. FUNÇÃO SEMÂNTICA: RENDERIZA OS LINKS EXCLUSIVOS DE CADA PERFIL
    function renderizarMenuLogado(idUsuario, dadosPerfil) {
        let linksHTML = '';
        dadosPerfil.links.forEach(link => {
            linksHTML += `<li><a href="${link.url}">${link.texto}</a></li>`;
        });

        caixaConteudoPerfil.innerHTML = `
            <div class="user-header">
                <span class="user-name">${dadosPerfil.nome}</span>
                <span class="user-email">Painel Arca: @${idUsuario}</span>
            </div>
            <hr class="divisor">
            <ul class="dropdown-links">
                ${linksHTML}
                <hr class="divisor">
                <li><a href="#" id="btn-sair">Sair do Painel</a></li>
            </ul>
        `;
    }

    // 7. FUNÇÃO: RETORNA O MENU AO ESTADO DESLOGADO ORIGINAL
    function renderizarMenuDeslogado() {
        caixaConteudoPerfil.innerHTML = `
            <ul class="dropdown-links">
                <li><a href="#" id="btn-entrar">🔑 Entrar / Login</a></li>
                <li><a href="#">📝 Criar uma Conta</a></li>
            </ul>
        `;
    }
}