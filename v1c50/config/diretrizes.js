/*
====================================================================
                       SISTEMA VICENTE
                    MOTOR CENTRAL DO SISTEMA
====================================================================

ARQUIVO:
    sistema.js

LOCAL:
    /v1c50/js/sistema.js

VERSÃO:
    2.0

DATA:
    02/09/2026

====================================================================
FINALIDADE
====================================================================

Este arquivo é o MOTOR CENTRAL do Sistema Vicente.

Ele existe para impedir que regras globais sejam duplicadas em:

    index.html
    calendario.html
    matematica.html
    ciencias.html
    portugues.html
    etc.

As páginas individuais devem cuidar apenas do próprio conteúdo.

O sistema.js cuida de funcionalidades comuns como:

    - horário atual;
    - rotina;
    - lembretes;
    - confirmações;
    - frequência dos avisos;
    - armazenamento das respostas;
    - evitar mensagens repetidas;
    - mensagens educativas;
    - mensagens de convivência;
    - alimentação;
    - descanso;
    - preparação para dormir;
    - futuro sistema de XP;
    - futuro sistema de conquistas.

====================================================================
FILOSOFIA PRINCIPAL
====================================================================

O Sistema Vicente é um AJUDANTE.

Não é:

    - fiscal;
    - sistema de punição;
    - bloqueador;
    - ferramenta de constrangimento.

O sistema deve:

    lembrar;
    orientar;
    explicar;
    incentivar;
    ajudar Vicente a desenvolver autonomia.

REGRA FUNDAMENTAL:

    "O Sistema Vicente não manda.
     Ele lembra."

====================================================================
IMPORTANTE SOBRE HORÁRIOS
====================================================================

Os horários que existem neste arquivo são FALLBACKS TÉCNICOS.

Isso significa:

Caso nenhuma configuração externa seja carregada,
o sistema utiliza estas regras básicas para continuar funcionando.

A arquitetura definitiva será:

    diretrizes.js
          ↓
      sistema.js
          ↓
      todas as páginas

Quando criarmos:

    /v1c50/js/diretrizes.js

ele poderá definir:

    window.SV_DIRETRIZES = { ... }

ANTES de carregar sistema.js.

Exemplo futuro no HTML:

    <script src="js/diretrizes.js"></script>
    <script src="js/sistema.js"></script>

Dessa forma:

    alterar 20:00 para 21:00

será feito apenas em diretrizes.js.

====================================================================
ARMAZENAMENTO
====================================================================

O sistema utiliza localStorage.

Isso permite lembrar, naquele aparelho/navegador, por exemplo:

    - que Vicente já tomou café;
    - que já confirmou determinada rotina;
    - que determinado lembrete já apareceu;
    - que não deve repetir imediatamente.

Nenhum dado é enviado para servidor.

O armazenamento é local ao navegador.

Se o histórico/dados do navegador forem apagados,
essas confirmações também serão apagadas.

====================================================================
PRIVACIDADE
====================================================================

Esta versão:

    - não envia dados pela internet;
    - não possui login;
    - não possui rastreamento;
    - não envia respostas para servidor;
    - não monitora outras aplicações;
    - não monitora outros sites;
    - não controla o dispositivo.

Ela funciona somente enquanto uma página do Sistema Vicente
estiver aberta.

====================================================================
MEDICAÇÃO / VITAMINA
====================================================================

O sistema pode apresentar um lembrete previamente configurado
pelo responsável.

Ele NÃO deve:

    - determinar medicamento;
    - determinar dose;
    - alterar tratamento;
    - substituir orientação médica.

====================================================================
COMPORTAMENTO DOS LEMBRETES
====================================================================

Cada lembrete pode possuir:

    id
    ativo
    prioridade
    horário inicial
    horário final
    dias da semana
    título
    mensagem
    ícone
    tipo de resposta
    frequência
    repetição
    confirmação diária

TIPOS DE RESPOSTA:

    confirmacao
        SIM / AINDA NÃO

    informativo
        OK, ENTENDI

====================================================================
REGRAS DE NÃO INCOMODAR
====================================================================

O sistema possui:

    - intervalo global entre lembretes;
    - limite por sessão;
    - registro da última exibição;
    - confirmação diária;
    - repetição específica quando Vicente responde "AINDA NÃO".

Exemplo:

Vicente responde:

    SIM, JÁ TOMEI CAFÉ.

O sistema registra a confirmação.

Ele não deve perguntar novamente naquele mesmo dia.

Se responder:

    AINDA NÃO.

O sistema poderá lembrar novamente depois do intervalo configurado.

====================================================================
PRIORIDADES
====================================================================

Quanto maior o número, maior a prioridade.

Exemplo:

    sono               100
    escola              90
    alimentação         80
    higiene             60
    convivência         30
    curiosidade         10

Se várias regras estiverem disponíveis ao mesmo tempo,
apenas a de maior prioridade será exibida.

====================================================================
RESPONSABILIDADE DO CSS
====================================================================

Os pop-ups utilizam classes existentes em:

    /v1c50/css/sistema.css

Principais classes:

    sv-reminder-overlay
    sv-reminder
    sv-reminder-icon
    sv-check-area
    sv-button
    sv-button-secondary

====================================================================
COMO A PÁGINA DEVE CARREGAR ESTE ARQUIVO
====================================================================

Antes de </body>:

    <script src="js/sistema.js"></script>

No futuro:

    <script src="js/diretrizes.js"></script>
    <script src="js/sistema.js"></script>

====================================================================
HISTÓRICO
====================================================================

v1.0 - 02/09/2026

    - Criado motor inicial.
    - Criado suporte de horário.
    - Criado pop-up básico.

v2.0 - 02/09/2026

    - Reescrito motor central.
    - Criado sistema de diretrizes configuráveis.
    - Criado fallback de regras.
    - Criado armazenamento local.
    - Criado controle por dia.
    - Criado controle por sessão.
    - Criado sistema de prioridades.
    - Criado SIM / AINDA NÃO.
    - Criado modo informativo.
    - Criada repetição inteligente.
    - Criado controle de frequência.
    - Criado limite de lembretes por sessão.
    - Criada função de teste.
    - Criada API pública SistemaVicente.
    - Preparado para diretrizes.js.

====================================================================
REGRA DE MANUTENÇÃO
====================================================================

NÃO apagar esta documentação.

Toda alteração significativa deverá atualizar:

    VERSÃO
    DATA
    HISTÓRICO

Não colocar conteúdo específico de Matemática, Ciências,
Português etc. neste arquivo.

====================================================================
FIM DA DOCUMENTAÇÃO
====================================================================
*/


(function () {

    "use strict";


    /*
    =================================================================
    01. IDENTIFICAÇÃO
    =================================================================
    */

    const VERSAO = "2.0";

    const STORAGE_PREFIX = "SV_";

    const MINUTO_MS = 60 * 1000;

    const DIA_MS = 24 * 60 * 60 * 1000;


    /*
    =================================================================
    02. CONFIGURAÇÃO PADRÃO
    =================================================================

    Estes valores são FALLBACKS.

    Quando existir window.SV_DIRETRIZES, os valores externos
    substituirão estes automaticamente.
    =================================================================
    */

    const CONFIG_PADRAO = {

        sistema: {

            nome: "Sistema Vicente",

            ativo: true,

            debug: false,

            intervaloVerificacaoSegundos: 60,

            intervaloGlobalLembretesMinutos: 30,

            maxLembretesPorSessao: 4,

            permitirLembretes: true

        },


        perfil: {

            nome: "Vicente",

            nascimento: "2017-12-18"

        },


        rotina: {

            acordar: "07:00",

            escola: "09:00",

            desacelerar: "20:00",

            dormir: "21:00",

            objetivoSonoHoras: 10

        },


        /*
        =============================================================
        LEMBRETES PADRÃO
        =============================================================
        */

        lembretes: [

            /*
            ---------------------------------------------------------
            CAFÉ DA MANHÃ
            ---------------------------------------------------------
            */

            {

                id: "cafe_da_manha",

                ativo: true,

                categoria: "alimentacao",

                prioridade: 85,

                inicio: "07:00",

                fim: "08:30",

                dias: [0, 1, 2, 3, 4, 5, 6],

                icone: "🍳",

                titulo:
                    "MISSÃO: ENERGIA DA MANHÃ",

                mensagem:
                    "Você já tomou café da manhã? Seu corpo e seu cérebro precisam de energia para começar o dia.",

                tipo: "confirmacao",

                textoSim:
                    "SIM, JÁ TOMEI ✅",

                textoNao:
                    "AINDA NÃO ⏳",

                umaVezPorDia: true,

                repetirSeNaoMinutos: 30,

                intervaloMinimoMinutos: 60

            },


            /*
            ---------------------------------------------------------
            COMPROMISSO / VITAMINA
            ---------------------------------------------------------

            Esta regra é propositalmente genérica.

            O responsável poderá futuramente definir o texto exato
            em diretrizes.js.
            ---------------------------------------------------------
            */

            {

                id: "compromisso_manha",

                ativo: false,

                categoria: "rotina",

                prioridade: 84,

                inicio: "07:15",

                fim: "08:45",

                dias: [0, 1, 2, 3, 4, 5, 6],

                icone: "💊",

                titulo:
                    "LEMBRETE DA MANHÃ",

                mensagem:
                    "Você já cumpriu o compromisso da manhã combinado com o responsável?",

                tipo: "confirmacao",

                textoSim:
                    "SIM ✅",

                textoNao:
                    "AINDA NÃO ⏳",

                umaVezPorDia: true,

                repetirSeNaoMinutos: 30,

                intervaloMinimoMinutos: 90

            },


            /*
            ---------------------------------------------------------
            PREPARAÇÃO PARA ESCOLA
            ---------------------------------------------------------
            */

            {

                id: "preparar_escola",

                ativo: true,

                categoria: "escola",

                prioridade: 90,

                inicio: "08:15",

                fim: "08:45",

                dias: [1, 2, 3, 4, 5],

                icone: "🎒",

                titulo:
                    "PREPARAR PARA A ESCOLA",

                mensagem:
                    "Confira mochila, materiais e garrafa de água. A van passa por volta das 09:00.",

                tipo: "confirmacao",

                textoSim:
                    "ESTÁ TUDO PRONTO ✅",

                textoNao:
                    "VOU PREPARAR 🎒",

                umaVezPorDia: true,

                repetirSeNaoMinutos: 15,

                intervaloMinimoMinutos: 60

            },


            /*
            ---------------------------------------------------------
            ALIMENTAÇÃO / FRUTA
            ---------------------------------------------------------
            */

            {

                id: "fruta",

                ativo: true,

                categoria: "alimentacao",

                prioridade: 45,

                inicio: "10:00",

                fim: "18:30",

                dias: [0, 1, 2, 3, 4, 5, 6],

                icone: "🍎",

                titulo:
                    "MISSÃO: COMBUSTÍVEL DE VERDADE",

                mensagem:
                    "Você já comeu uma fruta hoje? Frutas fazem parte de uma alimentação variada e ajudam o corpo a receber nutrientes importantes.",

                tipo: "confirmacao",

                textoSim:
                    "SIM 🍎",

                textoNao:
                    "AINDA NÃO",

                umaVezPorDia: true,

                repetirSeNaoMinutos: 120,

                intervaloMinimoMinutos: 180

            },


            /*
            ---------------------------------------------------------
            ÁGUA
            ---------------------------------------------------------
            */

            {

                id: "agua",

                ativo: true,

                categoria: "alimentacao",

                prioridade: 35,

                inicio: "09:30",

                fim: "19:30",

                dias: [0, 1, 2, 3, 4, 5, 6],

                icone: "💧",

                titulo:
                    "LEMBRETE DE HIDRATAÇÃO",

                mensagem:
                    "Que tal beber um pouco de água? Seu corpo precisa de água durante o dia.",

                tipo: "informativo",

                textoOk:
                    "OK 👍",

                umaVezPorDia: false,

                intervaloMinimoMinutos: 240

            },


            /*
            ---------------------------------------------------------
            CORPO / ALIMENTAÇÃO
            ---------------------------------------------------------
            */

            {

                id: "corpo_forte",

                ativo: true,

                categoria: "bem_estar",

                prioridade: 25,

                inicio: "11:00",

                fim: "19:00",

                dias: [0, 1, 2, 3, 4, 5, 6],

                icone: "💪",

                titulo:
                    "SEU CORPO ESTÁ CRESCENDO",

                mensagem:
                    "Movimento, descanso e uma alimentação variada com frutas, verduras e fontes de proteína ajudam o corpo a crescer e funcionar bem.",

                tipo: "informativo",

                textoOk:
                    "ENTENDI 💪",

                umaVezPorDia: true,

                intervaloMinimoMinutos: 240

            },


            /*
            ---------------------------------------------------------
            RESPEITO
            ---------------------------------------------------------
            */

            {

                id: "respeito",

                ativo: true,

                categoria: "convivencia",

                prioridade: 20,

                inicio: "09:00",

                fim: "19:30",

                dias: [0, 1, 2, 3, 4, 5, 6],

                icone: "🤝",

                titulo:
                    "MISSÃO DA TRIPULAÇÃO",

                mensagem:
                    "Ser forte também é saber tratar as pessoas bem. Respeito, educação e saber ouvir fazem parte de uma boa tripulação.",

                tipo: "informativo",

                textoOk:
                    "COMBINADO 🤝",

                umaVezPorDia: true,

                intervaloMinimoMinutos: 360

            },


            /*
            ---------------------------------------------------------
            PALAVRAS MÁGICAS
            ---------------------------------------------------------
            */

            {

                id: "palavras_magicas",

                ativo: true,

                categoria: "convivencia",

                prioridade: 18,

                inicio: "09:00",

                fim: "19:30",

                dias: [0, 1, 2, 3, 4, 5, 6],

                icone: "✨",

                titulo:
                    "PALAVRAS QUE ABREM PORTAS",

                mensagem:
                    "Por favor. Obrigado. Com licença. Desculpa. Pequenas palavras podem mostrar muito respeito.",

                tipo: "informativo",

                textoOk:
                    "VOU LEMBRAR ✨",

                umaVezPorDia: true,

                intervaloMinimoMinutos: 480

            },


            /*
            ---------------------------------------------------------
            GENEROSIDADE
            ---------------------------------------------------------
            */

            {

                id: "generosidade",

                ativo: true,

                categoria: "convivencia",

                prioridade: 17,

                inicio: "10:00",

                fim: "19:00",

                dias: [0, 1, 2, 3, 4, 5, 6],

                icone: "❤️",

                titulo:
                    "DESAFIO DE GENEROSIDADE",

                mensagem:
                    "Hoje apareceu alguma oportunidade de ajudar alguém, compartilhar alguma coisa ou fazer algo gentil?",

                tipo: "informativo",

                textoOk:
                    "VOU OBSERVAR ❤️",

                umaVezPorDia: true,

                intervaloMinimoMinutos: 480

            },


            /*
            ---------------------------------------------------------
            DESACELERAR
            ---------------------------------------------------------
            */

            {

                id: "desacelerar",

                ativo: true,

                categoria: "sono",

                prioridade: 95,

                inicio: "20:00",

                fim: "20:29",

                dias: [0, 1, 2, 3, 4, 5, 6],

                icone: "🌙",

                titulo:
                    "A AVENTURA ESTÁ CHEGANDO AO FIM",

                mensagem:
                    "É hora de começar a desacelerar. O cérebro também precisa de um período tranquilo antes de dormir.",

                tipo: "informativo",

                textoOk:
                    "OK, VOU DESACELERAR 🌙",

                umaVezPorDia: true,

                intervaloMinimoMinutos: 1440

            },


            /*
            ---------------------------------------------------------
            PREPARAÇÃO PARA DORMIR
            ---------------------------------------------------------
            */

            {

                id: "preparar_sono",

                ativo: true,

                categoria: "sono",

                prioridade: 98,

                inicio: "20:30",

                fim: "20:59",

                dias: [0, 1, 2, 3, 4, 5, 6],

                icone: "🧠",

                titulo:
                    "RECARREGAR O CÉREBRO",

                mensagem:
                    "Hora de preparar o corpo para dormir. Descansar ajuda na memória, no aprendizado e na energia do dia seguinte.",

                tipo: "informativo",

                textoOk:
                    "ENTENDI 🧠",

                umaVezPorDia: true,

                intervaloMinimoMinutos: 1440

            },


            /*
            ---------------------------------------------------------
            DORMIR
            ---------------------------------------------------------
            */

            {

                id: "hora_dormir",

                ativo: true,

                categoria: "sono",

                prioridade: 100,

                inicio: "21:00",

                fim: "23:59",

                dias: [0, 1, 2, 3, 4, 5, 6],

                icone: "😴",

                titulo:
                    "MISSÃO DO DIA CONCLUÍDA",

                mensagem:
                    "O objetivo é descansar cerca de 10 horas para acordar às 07:00 com energia. Hora de guardar o mapa e descansar.",

                tipo: "informativo",

                textoOk:
                    "BOA NOITE 🌙",

                umaVezPorDia: true,

                intervaloMinimoMinutos: 1440

            }

        ]

    };


    /*
    =================================================================
    03. FUNÇÕES AUXILIARES
    =================================================================
    */

    function ehObjeto(valor) {

        return (
            valor !== null &&
            typeof valor === "object" &&
            !Array.isArray(valor)
        );

    }


    /*
    =================================================================
    04. MERGE PROFUNDO
    =================================================================

    Permite que diretrizes.js altere apenas uma parte da configuração.

    Exemplo:

        window.SV_DIRETRIZES = {
            rotina: {
                dormir: "21:30"
            }
        };

    O restante permanece com os valores padrão.
    =================================================================
    */

    function mesclarObjetos(base, novo) {

        const resultado =
            Array.isArray(base)
                ? [...base]
                : { ...base };


        if (!ehObjeto(novo)) {

            return resultado;

        }


        Object.keys(novo)
            .forEach(function (chave) {

                const valorNovo =
                    novo[chave];


                if (
                    ehObjeto(valorNovo) &&
                    ehObjeto(resultado[chave])
                ) {

                    resultado[chave] =
                        mesclarObjetos(
                            resultado[chave],
                            valorNovo
                        );

                } else {

                    resultado[chave] =
                        valorNovo;

                }

            });


        return resultado;

    }


    /*
    =================================================================
    05. CARREGAR CONFIGURAÇÃO
    =================================================================
    */

    const CONFIG =
        mesclarObjetos(
            CONFIG_PADRAO,
            window.SV_DIRETRIZES || {}
        );


    /*
    =================================================================
    06. LOG DE DEBUG
    =================================================================
    */

    function log() {

        if (!CONFIG.sistema.debug) {
            return;
        }

        console.log(
            "[Sistema Vicente]",
            ...arguments
        );

    }


    /*
    =================================================================
    07. DATA LOCAL
    =================================================================
    */

    function agora() {

        return new Date();

    }


    function chaveHoje() {

        const data =
            agora();

        const ano =
            data.getFullYear();

        const mes =
            String(
                data.getMonth() + 1
            ).padStart(2, "0");

        const dia =
            String(
                data.getDate()
            ).padStart(2, "0");


        return (
            ano +
            "-" +
            mes +
            "-" +
            dia
        );

    }


    /*
    =================================================================
    08. CONVERSÃO DE HORÁRIO
    =================================================================
    */

    function horarioParaMinutos(texto) {

        if (
            typeof texto !== "string" ||
            !texto.includes(":")
        ) {

            return null;

        }


        const partes =
            texto.split(":");


        const horas =
            Number(partes[0]);

        const minutos =
            Number(partes[1]);


        if (
            Number.isNaN(horas) ||
            Number.isNaN(minutos)
        ) {

            return null;

        }


        if (
            horas < 0 ||
            horas > 23 ||
            minutos < 0 ||
            minutos > 59
        ) {

            return null;

        }


        return (
            horas * 60 +
            minutos
        );

    }


    function minutosAgora() {

        const data =
            agora();

        return (
            data.getHours() * 60 +
            data.getMinutes()
        );

    }


    /*
    =================================================================
    09. VERIFICAR JANELA DE HORÁRIO
    =================================================================

    Também suporta intervalos que atravessam meia-noite.

    Exemplo:

        22:00 até 01:00
    =================================================================
    */

    function dentroDaJanela(
        inicio,
        fim
    ) {

        const atual =
            minutosAgora();

        const inicioMin =
            horarioParaMinutos(inicio);

        const fimMin =
            horarioParaMinutos(fim);


        if (
            inicioMin === null ||
            fimMin === null
        ) {

            return false;

        }


        if (
            inicioMin <= fimMin
        ) {

            return (
                atual >= inicioMin &&
                atual <= fimMin
            );

        }


        /*
        -------------------------------------------------------------
        INTERVALO ATRAVESSANDO MEIA-NOITE
        -------------------------------------------------------------
        */

        return (
            atual >= inicioMin ||
            atual <= fimMin
        );

    }


    /*
    =================================================================
    10. ARMAZENAMENTO LOCAL SEGURO
    =================================================================
    */

    function storageGet(chave) {

        try {

            const valor =
                localStorage.getItem(
                    STORAGE_PREFIX +
                    chave
                );


            if (valor === null) {

                return null;

            }


            return JSON.parse(
                valor
            );

        } catch (erro) {

            log(
                "Erro ao ler localStorage:",
                erro
            );

            return null;

        }

    }


    function storageSet(
        chave,
        valor
    ) {

        try {

            localStorage.setItem(
                STORAGE_PREFIX +
                chave,
                JSON.stringify(valor)
            );

            return true;

        } catch (erro) {

            log(
                "Erro ao gravar localStorage:",
                erro
            );

            return false;

        }

    }


    function storageRemove(chave) {

        try {

            localStorage.removeItem(
                STORAGE_PREFIX +
                chave
            );

        } catch (erro) {

            log(
                "Erro ao remover localStorage:",
                erro
            );

        }

    }


    /*
    =================================================================
    11. ESTADO DE UMA REGRA
    =================================================================
    */

    function chaveRegra(id) {

        return (
            "REGRA_" +
            id
        );

    }


    function obterEstadoRegra(id) {

        return (
            storageGet(
                chaveRegra(id)
            ) || {}
        );

    }


    function salvarEstadoRegra(
        id,
        estado
    ) {

        storageSet(
            chaveRegra(id),
            estado
        );

    }


    /*
    =================================================================
    12. ESTADO DA SESSÃO
    =================================================================
    */

    const SESSAO = {

        inicio:
            Date.now(),

        lembretesMostrados:
            0,

        ultimoLembreteEm:
            0,

        popupAberto:
            false,

        regraAtual:
            null

    };


    /*
    =================================================================
    13. VERIFICAR DIA DA SEMANA
    =================================================================

    JavaScript:

        0 domingo
        1 segunda
        2 terça
        3 quarta
        4 quinta
        5 sexta
        6 sábado
    =================================================================
    */

    function diaPermitido(regra) {

        if (
            !Array.isArray(regra.dias) ||
            regra.dias.length === 0
        ) {

            return true;

        }


        return regra.dias.includes(
            agora().getDay()
        );

    }


    /*
    =================================================================
    14. TEMPO DESDE UMA DATA
    =================================================================
    */

    function minutosDesde(timestamp) {

        if (!timestamp) {

            return Infinity;

        }


        return (
            Date.now() -
            Number(timestamp)
        ) / MINUTO_MS;

    }


    /*
    =================================================================
    15. REGRA JÁ CONFIRMADA HOJE
    =================================================================
    */

    function concluidaHoje(regra) {

        const estado =
            obterEstadoRegra(
                regra.id
            );


        return (
            estado.data === chaveHoje() &&
            estado.status === "sim"
        );

    }


    /*
    =================================================================
    16. VERIFICAR SE REGRA ESTÁ DISPONÍVEL
    =================================================================
    */

    function regraDisponivel(regra) {

        if (!regra) {

            return false;

        }


        if (regra.ativo === false) {

            return false;

        }


        if (!diaPermitido(regra)) {

            return false;

        }


        if (
            !dentroDaJanela(
                regra.inicio,
                regra.fim
            )
        ) {

            return false;

        }


        const estado =
            obterEstadoRegra(
                regra.id
            );


        /*
        -------------------------------------------------------------
        CONFIRMAÇÃO DO DIA
        -------------------------------------------------------------
        */

        if (
            regra.umaVezPorDia &&
            concluidaHoje(regra)
        ) {

            return false;

        }


        /*
        -------------------------------------------------------------
        REGRA INFORMACIONAL JÁ CONFIRMADA NO DIA
        -------------------------------------------------------------
        */

        if (
            regra.umaVezPorDia &&
            estado.data === chaveHoje() &&
            estado.status === "ok"
        ) {

            return false;

        }


        /*
        -------------------------------------------------------------
        RESPOSTA "AINDA NÃO"
        -------------------------------------------------------------
        */

        if (
            estado.data === chaveHoje() &&
            estado.status === "nao"
        ) {

            const espera =
                regra.repetirSeNaoMinutos ||
                60;


            if (
                minutosDesde(
                    estado.ultimaExibicao
                ) < espera
            ) {

                return false;

            }

        }


        /*
        -------------------------------------------------------------
        INTERVALO MÍNIMO DA PRÓPRIA REGRA
        -------------------------------------------------------------
        */

        const intervalo =
            regra.intervaloMinimoMinutos ||
            60;


        if (
            minutosDesde(
                estado.ultimaExibicao
            ) < intervalo
        ) {

            return false;

        }


        return true;

    }


    /*
    =================================================================
    17. INTERVALO GLOBAL
    =================================================================
    */

    function intervaloGlobalCumprido() {

        const intervalo =
            CONFIG.sistema
                .intervaloGlobalLembretesMinutos ||
            30;


        return (
            minutosDesde(
                SESSAO.ultimoLembreteEm
            ) >= intervalo
        );

    }


    /*
    =================================================================
    18. LIMITE POR SESSÃO
    =================================================================
    */

    function sessaoPermiteNovoLembrete() {

        const maximo =
            CONFIG.sistema
                .maxLembretesPorSessao;


        if (
            typeof maximo !== "number" ||
            maximo <= 0
        ) {

            return true;

        }


        return (
            SESSAO.lembretesMostrados <
            maximo
        );

    }


    /*
    =================================================================
    19. ESCOLHER PRÓXIMA REGRA
    =================================================================

    Se várias regras estiverem válidas,
    vence a maior prioridade.
    =================================================================
    */

    function escolherRegra() {

        const regras =
            Array.isArray(
                CONFIG.lembretes
            )
                ? CONFIG.lembretes
                : [];


        const disponiveis =
            regras
                .filter(
                    regraDisponivel
                )
                .sort(
                    function (a, b) {

                        return (
                            (b.prioridade || 0) -
                            (a.prioridade || 0)
                        );

                    }
                );


        return (
            disponiveis[0] ||
            null
        );

    }


    /*
    =================================================================
    20. ESCAPAR HTML
    =================================================================

    Evita que textos configuráveis sejam inseridos
    diretamente como HTML perigoso.
    =================================================================
    */

    function escaparHTML(valor) {

        return String(
            valor ?? ""
        )
            .replaceAll(
                "&",
                "&amp;"
            )
            .replaceAll(
                "<",
                "&lt;"
            )
            .replaceAll(
                ">",
                "&gt;"
            )
            .replaceAll(
                '"',
                "&quot;"
            )
            .replaceAll(
                "'",
                "&#039;"
            );

    }


    /*
    =================================================================
    21. REMOVER POP-UP EXISTENTE
    =================================================================
    */

    function removerPopup() {

        const antigo =
            document.getElementById(
                "sv-reminder-overlay"
            );


        if (antigo) {

            antigo.remove();

        }


        SESSAO.popupAberto =
            false;

        SESSAO.regraAtual =
            null;

    }


    /*
    =================================================================
    22. CRIAR POP-UP
    =================================================================
    */

    function mostrarRegra(regra) {

        if (!regra) {

            return false;

        }


        if (
            SESSAO.popupAberto
        ) {

            return false;

        }


        removerPopup();


        const overlay =
            document.createElement(
                "div"
            );


        overlay.id =
            "sv-reminder-overlay";

        overlay.className =
            "sv-reminder-overlay sv-visible";


        /*
        -------------------------------------------------------------
        BOTÕES
        -------------------------------------------------------------
        */

        let botoes = "";


        if (
            regra.tipo ===
            "confirmacao"
        ) {

            botoes = `

                <button
                    type="button"
                    class="sv-button"
                    data-sv-resposta="sim"
                >
                    ${escaparHTML(
                        regra.textoSim ||
                        "SIM ✅"
                    )}
                </button>

                <button
                    type="button"
                    class="sv-button sv-button-secondary"
                    data-sv-resposta="nao"
                >
                    ${escaparHTML(
                        regra.textoNao ||
                        "AINDA NÃO"
                    )}
                </button>

            `;

        } else {

            botoes = `

                <button
                    type="button"
                    class="sv-button"
                    data-sv-resposta="ok"
                >
                    ${escaparHTML(
                        regra.textoOk ||
                        "OK, ENTENDI 👍"
                    )}
                </button>

            `;

        }


        overlay.innerHTML = `

            <div
                class="sv-reminder"
                role="dialog"
                aria-modal="true"
                aria-labelledby="sv-reminder-title"
            >

                <div
                    class="sv-reminder-icon"
                    aria-hidden="true"
                >
                    ${escaparHTML(
                        regra.icone ||
                        "💡"
                    )}
                </div>


                <h2 id="sv-reminder-title">

                    ${escaparHTML(
                        regra.titulo ||
                        "Lembrete"
                    )}

                </h2>


                <p>

                    ${escaparHTML(
                        regra.mensagem ||
                        ""
                    )}

                </p>


                <div class="sv-check-area">

                    ${botoes}

                </div>

            </div>

        `;


        document.body.appendChild(
            overlay
        );


        /*
        -------------------------------------------------------------
        EVENTOS DOS BOTÕES
        -------------------------------------------------------------
        */

        overlay
            .querySelectorAll(
                "[data-sv-resposta]"
            )
            .forEach(
                function (botao) {

                    botao.addEventListener(
                        "click",
                        function () {

                            registrarResposta(
                                regra,
                                botao.dataset
                                    .svResposta
                            );

                        }
                    );

                }
            );


        /*
        -------------------------------------------------------------
        REGISTRO DA EXIBIÇÃO
        -------------------------------------------------------------
        */

        const estado =
            obterEstadoRegra(
                regra.id
            );


        estado.data =
            chaveHoje();

        estado.ultimaExibicao =
            Date.now();

        estado.exibicoes =
            (
                estado.exibicoes ||
                0
            ) + 1;


        salvarEstadoRegra(
            regra.id,
            estado
        );


        SESSAO.popupAberto =
            true;

        SESSAO.regraAtual =
            regra;

        SESSAO.lembretesMostrados++;

        SESSAO.ultimoLembreteEm =
            Date.now();


        log(
            "Lembrete exibido:",
            regra.id
        );


        return true;

    }


    /*
    =================================================================
    23. REGISTRAR RESPOSTA
    =================================================================
    */

    function registrarResposta(
        regra,
        resposta
    ) {

        if (!regra) {

            return;

        }


        const estado =
            obterEstadoRegra(
                regra.id
            );


        estado.data =
            chaveHoje();

        estado.status =
            resposta;

        estado.ultimaResposta =
            Date.now();

        estado.ultimaExibicao =
            Date.now();


        if (
            resposta === "sim"
        ) {

            estado.confirmado =
                true;

        }


        salvarEstadoRegra(
            regra.id,
            estado
        );


        log(
            "Resposta:",
            regra.id,
            resposta
        );


        removerPopup();

    }


    /*
    =================================================================
    24. VERIFICAR LEMBRETES
    =================================================================
    */

    function verificarLembretes(
        ignorarIntervaloGlobal
    ) {

        if (
            CONFIG.sistema.ativo ===
            false
        ) {

            return;

        }


        if (
            CONFIG.sistema
                .permitirLembretes ===
            false
        ) {

            return;

        }


        if (
            SESSAO.popupAberto
        ) {

            return;

        }


        if (
            !sessaoPermiteNovoLembrete()
        ) {

            log(
                "Limite de lembretes da sessão atingido."
            );

            return;

        }


        if (
            !ignorarIntervaloGlobal &&
            !intervaloGlobalCumprido()
        ) {

            return;

        }


        const regra =
            escolherRegra();


        if (regra) {

            mostrarRegra(
                regra
            );

        }

    }


    /*
    =================================================================
    25. MOSTRAR MENSAGEM MANUAL
    =================================================================

    Pode ser utilizada por uma página específica.

    Exemplo:

        SistemaVicente.mostrarMensagem({
            icone: "🧠",
            titulo: "Modo Aprendizado",
            mensagem: "..."
        });
    =================================================================
    */

    function mostrarMensagem(opcoes) {

        const regra = {

            id:
                "manual_" +
                Date.now(),

            tipo:
                opcoes?.tipo ||
                "informativo",

            icone:
                opcoes?.icone ||
                "💡",

            titulo:
                opcoes?.titulo ||
                "Lembrete",

            mensagem:
                opcoes?.mensagem ||
                "",

            textoOk:
                opcoes?.textoOk ||
                "OK 👍",

            textoSim:
                opcoes?.textoSim ||
                "SIM ✅",

            textoNao:
                opcoes?.textoNao ||
                "AINDA NÃO"

        };


        return mostrarRegra(
            regra
        );

    }


    /*
    =================================================================
    26. INFORMAÇÕES DO SISTEMA
    =================================================================
    */

    function obterStatus() {

        const data =
            agora();


        return {

            versao:
                VERSAO,

            pagina:
                window.location.pathname
                    .split("/")
                    .pop() ||
                "index.html",

            data:
                data.toLocaleDateString(
                    "pt-BR"
                ),

            horario:
                data.toLocaleTimeString(
                    "pt-BR",
                    {
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                ),

            lembretesSessao:
                SESSAO.lembretesMostrados,

            popupAberto:
                SESSAO.popupAberto,

            configuracao:
                CONFIG

        };

    }


    /*
    =================================================================
    27. RESET DE UMA REGRA
    =================================================================

    Ferramenta administrativa.

    Exemplo no console:

        SistemaVicente.resetarRegra("cafe_da_manha");
    =================================================================
    */

    function resetarRegra(id) {

        storageRemove(
            chaveRegra(id)
        );


        log(
            "Regra resetada:",
            id
        );

    }


    /*
    =================================================================
    28. RESET COMPLETO
    =================================================================

    Remove apenas chaves que pertencem ao Sistema Vicente.

    Não apaga outros dados do navegador.
    =================================================================
    */

    function resetarSistema() {

        try {

            const remover = [];


            for (
                let i = 0;
                i < localStorage.length;
                i++
            ) {

                const chave =
                    localStorage.key(i);


                if (
                    chave &&
                    chave.startsWith(
                        STORAGE_PREFIX
                    )
                ) {

                    remover.push(
                        chave
                    );

                }

            }


            remover.forEach(
                function (chave) {

                    localStorage.removeItem(
                        chave
                    );

                }
            );


            log(
                "Dados locais do Sistema Vicente removidos."
            );

        } catch (erro) {

            log(
                "Erro ao resetar sistema:",
                erro
            );

        }

    }


    /*
    =================================================================
    29. TESTAR UMA REGRA MANUALMENTE
    =================================================================

    Exemplo:

        SistemaVicente.testarRegra("cafe_da_manha");

    Isso ignora horário e frequência.
    =================================================================
    */

    function testarRegra(id) {

        const regra =
            CONFIG.lembretes.find(
                function (item) {

                    return (
                        item.id === id
                    );

                }
            );


        if (!regra) {

            console.warn(
                "Sistema Vicente: regra não encontrada:",
                id
            );

            return false;

        }


        removerPopup();


        return mostrarRegra(
            regra
        );

    }


    /*
    =================================================================
    30. TESTE RÁPIDO
    =================================================================
    */

    function teste() {

        console.log(
            "================================"
        );

        console.log(
            "Sistema Vicente",
            VERSAO
        );

        console.log(
            obterStatus()
        );

        console.log(
            "Próxima regra disponível:",
            escolherRegra()
        );

        console.log(
            "================================"
        );

    }


    /*
    =================================================================
    31. API PÚBLICA
    =================================================================

    Tudo que pode ser utilizado pelas páginas fica aqui.

    Não utilizar funções internas diretamente.
    =================================================================
    */

    window.SistemaVicente = {

        versao:
            VERSAO,

        config:
            CONFIG,

        iniciar:
            iniciar,

        verificar:
            verificarLembretes,

        mostrarMensagem:
            mostrarMensagem,

        fecharLembrete:
            removerPopup,

        status:
            obterStatus,

        testarRegra:
            testarRegra,

        resetarRegra:
            resetarRegra,

        resetarSistema:
            resetarSistema,

        teste:
            teste

    };


    /*
    =================================================================
    32. INICIALIZAÇÃO
    =================================================================
    */

    let timer =
        null;


    function iniciar() {

        if (
            window.SistemaVicente
                ._iniciado
        ) {

            return;

        }


        window.SistemaVicente
            ._iniciado =
            true;


        log(
            "Sistema iniciado.",
            VERSAO
        );


        /*
        -------------------------------------------------------------
        PRIMEIRA VERIFICAÇÃO
        -------------------------------------------------------------

        Espera um pouco para que o usuário veja a página antes
        de eventualmente receber um lembrete.
        -------------------------------------------------------------
        */

        window.setTimeout(
            function () {

                verificarLembretes(
                    true
                );

            },
            1800
        );


        /*
        -------------------------------------------------------------
        VERIFICAÇÕES PERIÓDICAS
        -------------------------------------------------------------
        */

        const segundos =
            Math.max(
                30,
                Number(
                    CONFIG.sistema
                        .intervaloVerificacaoSegundos
                ) || 60
            );


        timer =
            window.setInterval(
                function () {

                    verificarLembretes(
                        false
                    );

                },
                segundos * 1000
            );

    }


    /*
    =================================================================
    33. INICIAR QUANDO O HTML ESTIVER PRONTO
    =================================================================
    */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            iniciar,
            {
                once: true
            }
        );

    } else {

        iniciar();

    }


    /*
    =================================================================
    34. LIMPEZA AO SAIR DA PÁGINA
    =================================================================
    */

    window.addEventListener(
        "pagehide",
        function () {

            if (timer) {

                clearInterval(
                    timer
                );

            }

        }
    );


    /*
    =================================================================
    35. HISTÓRICO TÉCNICO
    =================================================================

    v2.0

        - Motor encapsulado.
        - Configuração externa suportada.
        - Configuração fallback implementada.
        - Sistema de horários.
        - Sistema de dias da semana.
        - Sistema de prioridade.
        - localStorage.
        - Controle diário.
        - Controle de sessão.
        - Intervalo global.
        - Intervalo individual.
        - SIM / AINDA NÃO.
        - Pop-up informativo.
        - Segurança básica para HTML.
        - API pública.
        - Ferramentas administrativas.
        - Teste de regras.
        - Reset individual.
        - Reset total.
        - Inicialização automática.
        - Verificação periódica.

    =================================================================
    FIM DO SISTEMA.JS
    =================================================================
    */

})();
