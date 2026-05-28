//============================================================================
//    1. CARROSSEL / SLIDER (Protegido contra ausência de elementos)
//============================================================================
(function() {
    const slider = document.querySelectorAll('.slider');
    const btnPrev = document.getElementById('prev-button');
    const btnNext = document.getElementById('next-button');

    let currentSlide = 0;
    let timer;

    if (slider.length > 0 && btnPrev && btnNext) {
        function hideSlider() {
            slider.forEach(item => item.classList.remove('on'));
        }

        function showSlider() {
            if (slider[currentSlide]) {
                slider[currentSlide].classList.add('on');
            }
        }

        function nextSlider() {
            hideSlider();
            currentSlide = (currentSlide === slider.length - 1) ? 0 : currentSlide + 1;
            showSlider();
            resetTimer();
        }

        function prevSlider() {
            hideSlider();
            currentSlide = (currentSlide === 0) ? slider.length - 1 : currentSlide - 1;
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
})();

//============================================================================
//    2. POP UP - CONFIRMAÇÃO DE DENUNCIA E FLUXO DE RETORNO
//============================================================================
(function() {
    let btnAbrirModal = document.getElementById("btnAbrirModal");
    let modal = document.getElementById("meuModal");
    let telaCarregando = document.getElementById("telaCarregando");
    let telaSucesso = document.getElementById("telaSucesso");

    let btnCancelar = document.getElementById("btnCancelar");
    let btnConfirmar = document.getElementById("btnConfirmar");
    let btnFecharSucesso = document.getElementById("btnFecharSucesso");

    if (btnAbrirModal && modal && btnCancelar && btnConfirmar && telaCarregando && telaSucesso && btnFecharSucesso) {
        
        btnAbrirModal.onclick = function(event) {
            event.preventDefault();

            let elLocal = document.getElementById("local");
            let elHora = document.getElementById("hora");
            let elDescricao = document.getElementById("descricao");

            if (elLocal && elHora && elDescricao) {
                if (elLocal.value.trim() !== "" && elHora.value.trim() !== "" && elDescricao.value.trim() !== "") {
                    modal.style.display = "flex";
                } else {
                    alert("Preencha todos os campos!");
                }
            }
        }

        btnCancelar.onclick = function() {
            modal.style.display = "none";
        }

        btnConfirmar.onclick = function() {
            modal.style.display = "none";
            telaCarregando.style.display = "flex";
            setTimeout(revelarSucesso, 3000);
        }

        function revelarSucesso() {
            telaCarregando.style.display = "none";
            telaSucesso.style.display = "flex";
        }

        btnFecharSucesso.onclick = function() {
            telaSucesso.style.display = "none";
            
            let elLocal = document.getElementById("local");
            let elHora = document.getElementById("hora");
            let elDescricao = document.getElementById("descricao");

            if (elLocal) elLocal.value = "";
            if (elHora) elHora.value = "";
            if (elDescricao) elDescricao.value = "";
        }
    }
})();

//============================================================================
//    3. HEADER - NAV & DROPDOWNS GERÉRICOS
//============================================================================
function gerenciarMenu(botao, menu, outroMenu) {
    if (botao && menu) {
        botao.addEventListener('click', function(evento) {
            evento.stopPropagation();
            if (outroMenu && outroMenu.classList.contains('active')) {
                outroMenu.classList.remove('active');
            }
            menu.classList.toggle('active');
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
//    4. BASE DE DADOS E VALIDAÇÃO DE PERFIS (REQUISITOS DO PROFESSOR)
// ==========================================================================
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

// Elementos Globais do Modal de Autenticação
const caixaConteudoPerfil = document.getElementById('conteudo-perfil');
const modalAuth = document.getElementById('modal-auth');
const btnFecharAuth = document.getElementById('btn-fechar-auth');
const tabLogin = document.getElementById('tab-login');
const tabCadastro = document.getElementById('tab-cadastro');
const labelUsuario = document.getElementById('label-usuario');
const inputUsuario = document.getElementById('auth-email');
const btnAuthPrincipal = document.getElementById('btn-auth-principal');
const formAutenticacao = document.getElementById('form-autenticacao');

let modoFormulario = 'login'; 

if (caixaConteudoPerfil && modalAuth) {
    
    caixaConteudoPerfil.addEventListener('click', function(evento) {
        const target = evento.target;
        const textoClique = target.innerText || '';
        
        if (target.id === 'btn-entrar' || textoClique.includes('Criar uma Conta') || textoClique.includes('🔑 Entrar / Login')) {
            evento.preventDefault();
            abrirModalAutenticacao(textoClique.includes('Criar uma Conta') ? 'cadastro' : 'login');
        }
        
        if (target.id === 'btn-sair' || textoClique.includes('Sair do Painel')) {
            evento.preventDefault();
            renderizarMenuDeslogado();
            window.usuarioEstaLogado = false; // Sincroniza com o script de adoção
            alert("Você saiu do painel do projeto Arca.");
        }
    });

    if (btnFecharAuth) {
        btnFecharAuth.onclick = () => fecharModalAutenticacao();
    }
    
    modalAuth.onclick = (e) => { 
        if (e.target === modalAuth) fecharModalAutenticacao(); 
    };

    if (tabLogin && tabCadastro) {
        tabLogin.onclick = () => mudarModoFormulario('login');
        tabCadastro.onclick = () => mudarModoFormulario('cadastro');
    }

    function abrirModalAutenticacao(modo) {
        // Suporta tanto a ativação por classe quanto por style.display
        modalAuth.style.display = 'flex';
        modalAuth.classList.add('active');
        mudarModoFormulario(modo);
    }

    function fecharModalAutenticacao() {
        modalAuth.style.display = 'none';
        modalAuth.classList.remove('active');
    }

    function mudarModoFormulario(modo) {
        modoFormulario = modo;
        
        if (inputUsuario) inputUsuario.value = "";
        const inputSenha = document.getElementById('auth-senha');
        if (inputSenha) inputSenha.value = "";

        if (modo === 'login') {
            if (tabLogin) tabLogin.classList.add('active');
            if (tabCadastro) tabCadastro.classList.remove('active');
            if (labelUsuario) labelUsuario.innerText = "Usuário / Perfil";
            if (inputUsuario) inputUsuario.placeholder = "Ex: tutor, candidato, ong...";
            if (btnAuthPrincipal) btnAuthPrincipal.innerText = 'Entrar';
        } else {
            if (tabCadastro) tabCadastro.classList.add('active');
            if (tabLogin) tabLogin.classList.remove('active');
            if (labelUsuario) labelUsuario.innerText = "E-mail para Cadastro";
            if (inputUsuario) inputUsuario.placeholder = "seu@email.com";
            if (btnAuthPrincipal) btnAuthPrincipal.innerText = 'Criar Conta';
        }
    }

    if (formAutenticacao) {
        formAutenticacao.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const valorUsuario = inputUsuario ? inputUsuario.value.trim() : '';
            const elSenha = document.getElementById('auth-senha');
            const senhaDigitada = elSenha ? elSenha.value : '';

            if (modoFormulario === 'login') {
                const usuarioMinusculo = valorUsuario.toLowerCase();

                if (USUARIOS_PERFIS[usuarioMinusculo]) {
                    const perfil = USUARIOS_PERFIS[usuarioMinusculo];
                    
                    if (perfil.senha === senhaDigitada) {
                        fecharModalAutenticacao();
                        renderizarMenuLogado(usuarioMinusculo, perfil);
                        
                        // Define globalmente para o outro bloco reconhecer o login
                        window.usuarioEstaLogado = true; 
                        alert(`Login realizado com sucesso como: ${perfil.nome}!`);

                        // Dispara evento personalizado caso o fluxo de adoção esteja esperando
                        document.dispatchEvent(new CustomEvent('loginSucesso'));
                    } else {
                        alert("Senha incorreta para este perfil!");
                    }
                } else {
                    alert("Usuário não encontrado! Para testes escolares, use: tutor, candidato, ong ou prefeitura.");
                }
            } else {
                alert(`O e-mail "${valorUsuario}" foi detectado pelo sistema! Como este site está em ambiente de testes, os perfis já foram pré-configurados. Por favor, utilize a aba "Entrar".`);
                mudarModoFormulario('login');
            }
        });
    }

    const btnGoogle = document.getElementById('btn-login-google');
    if (btnGoogle) {
        btnGoogle.onclick = function() {
            alert("O login via Google está ativo apenas como demonstração de interface. Use os perfis locais na aba 'Entrar'.");
        };
    }

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

    function renderizarMenuDeslogado() {
        caixaConteudoPerfil.innerHTML = `
            <ul class="dropdown-links">
                <li><a href="#" id="btn-entrar">🔑 Entrar / Login</a></li>
                <li><a href="#">📝 Criar uma Conta</a></li>
            </ul>
        `;
    }
}

//============================================================================
//    5. RENDERIZAÇÃO DINÂMICA DO PET (PÁGINA DE DETALHES)
//============================================================================
const animais = [
    {
        id: 1,
        nome: "Thor",
        subtitulo: '"Um companheiro cheio de energia, carinho e amor."',
        imagem: "../../public/images/thor-cao.jpg", 
        titulo_descricao: "Sobre o Thor",
        descricao: "Thor está procurando um lar cheio de amor e cuidado. Ele ama brincar, correr, explorar novos lugares e receber carinho de toda a família.",
        idade: "2 anos", porte: "Médio", sexo: "Macho", temperamento: "Dócil"
    },
    {
        id: 2,
        nome: "Bidu",
        subtitulo: '"Um amigo leal e calmo para todas as horas."',
        imagem: "../../public/images/bidu-cao.jpeg",
        titulo_descricao: "Sobre o Bidu",
        descricao: "Bidu ama carinho, passeios ao ar livre e é extremamente companheiro.",
        idade: "3 anos", porte: "Pequeno", sexo: "Macho", temperamento: "Calmo"
    },
    {
        id: 3,
        nome: "Luna",
        subtitulo: '"Um companheiro cheio de energia..."',
        imagem: "../../public/images/luna-cao.jpg", 
        titulo_descricao: "Sobre a Luna",
        descricao: "Luna está procurando um lar cheio de amor e cuidado.",
        idade: "5 meses", porte: "Médio", sexo: "Fêmea", temperamento: "Dócil"
    },
    {
        id: 4,
        nome: "Max",
        subtitulo: '"Um amigo leal..."',
        imagem: "../../public/images/max-cao.jpeg",
        titulo_descricao: "Sobre o Max",
        descricao: "Max ama carinho, passeios ao ar livre e é extremamente companheiro.",
        idade: "3 anos", porte: "Pequeno", sexo: "Macho", temperamento: "Calmo"
    },
    {
        id: 5,
        nome: "Rex",
        subtitulo: '"Um amigo leal..."',
        imagem: "../../public/images/rex-cao.jpeg",
        titulo_descricao: "Sobre o Rex",
        descricao: "Rex ama carinho, passeios ao ar livre e é extremamente companheiro.",
        idade: "4 anos", porte: "Pequeno", sexo: "Macho", temperamento: "Calmo"
    }
];

function pegarId() {
    let parametros = window.location.search;
    let url = new URLSearchParams(parametros);
    return url.get("id");
}

function carregarAnimal() {
    let id = pegarId();
    if (!id) return; // Se não houver ID na URL, sai da função sem dar erro

    let animalEncontrado = animais.find(animal => animal.id == id);

    // Só tenta injetar se os elementos base existirem na página
    const elNome = document.getElementById("animal-nome");
    if (animalEncontrado && elNome) {
        elNome.innerText = animalEncontrado.nome;
        
        const elImg = document.getElementById("animal-imagem");
        if (elImg) elImg.src = animalEncontrado.imagem;
        
        const elSobre = document.getElementById("sobre_animal");
        if (elSobre) elSobre.innerText = animalEncontrado.titulo_descricao;
        
        const elDesc = document.getElementById("animal-descricao");
        if (elDesc) elDesc.innerText = animalEncontrado.descricao;
        
        let subtituloElement = document.querySelector(".subtitulo-animal");
        if (subtituloElement) subtituloElement.innerText = animalEncontrado.subtitulo;

        // Injeções com seletores compostos protegidas por verificação individual
        let c1 = document.querySelector(".info-card-clean:nth-child(1) .info-value");
        let c2 = document.querySelector(".info-card-clean:nth-child(2) .info-value");
        let c3 = document.querySelector(".info-card-clean:nth-child(3) .info-value");
        let c4 = document.querySelector(".info-card-clean:nth-child(4) .info-value");

        if (c1) c1.innerText = animalEncontrado.idade;
        if (c2) c2.innerText = animalEncontrado.porte;
        if (c3) c3.innerText = animalEncontrado.sexo;
        if (c4) c4.innerText = animalEncontrado.temperamento;
    }
}

function voltarPagina() {
    window.history.back();
}

// Inicializa o carregamento do pet de forma segura
carregarAnimal();

// ==========================================================================
//    6. CONTROLADOR DE AÇÕES DE ADOÇÃO / FAVORITO (BLINDADO)
// ==========================================================================
document.addEventListener("DOMContentLoaded", function() {
    const btnAdoteAqui = document.getElementById('botao-adotar');
    const btnFavoritar = document.getElementById('botao-favoritar');

    if (btnAdoteAqui) {
        btnAdoteAqui.addEventListener('click', function() {
            verificarEExecutarPet('adotar');
        });
    }
    if (btnFavoritar) {
        btnFavoritar.addEventListener('click', function() {
            verificarEExecutarPet('favoritar');
        });
    }

    function verificarEExecutarPet(acao) {
        // Se o usuário já estiver logado pelo sistema do professor
        if (window.usuarioEstaLogado === true) {
            executarAcaoFinal(acao);
        } else {
            // Se não estiver logado, salva a intenção na variável global do Bloco 4
            acaoPendente = acao; 
            
            // Força o modal a abrir direto na marra, sem depender de nenhuma outra função
            const modalAlvo = document.getElementById('modal-auth');
            if (modalAlvo) {
                modalAlvo.style.display = 'flex';
                modalAlvo.classList.add('active');
                
                // Força a aba a iniciar em 'login'
                const tLogin = document.getElementById('tab-login');
                if (tLogin) tLogin.click(); 
            } else {
                alert("Erro crítico: O código do modal de login não foi encontrado dentro deste arquivo HTML!");
            }
        }
    }
});

function executarAcaoFinal(acao) {
    if (acao === 'adotar') {
        // Como a página do Thor está em subpastas, certifique-se de que o caminho do formulário está correto:
        window.location.href = "formulario-adocao.html"; 
    } else if (acao === 'favoritar') {
        alert("Animal adicionado aos seus favoritos com sucesso!");
    }
}