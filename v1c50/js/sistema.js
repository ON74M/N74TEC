/*
====================================================================
                    SISTEMA VICENTE
             JAVASCRIPT CENTRAL DO SISTEMA
====================================================================

ARQUIVO:
    sistema.js

LOCAL:
    /v1c50/js/sistema.js

VERSÃO:
    1.0

DATA:
    02/09/2026

====================================================================
FINALIDADE
====================================================================

Este arquivo é o JAVASCRIPT CENTRAL do Sistema Vicente.

Sua função é fornecer recursos comuns para todas as páginas.

As páginas individuais NÃO deverão duplicar funções que pertencem
ao sistema central.

====================================================================
RESPONSABILIDADES FUTURAS
====================================================================

O sistema poderá controlar:

    - leitura das diretrizes;
    - horários;
    - lembretes;
    - rotina;
    - alimentação;
    - hidratação;
    - sono;
    - estudo;
    - descanso;
    - banho;
    - missões;
    - XP;
    - conquistas;
    - progresso;
    - mensagens;
    - calendário;
    - sistema de aprendizado.

====================================================================
FILOSOFIA
====================================================================

O sistema não deve funcionar como fiscal.

Ele deve funcionar como:

    AJUDANTE
    LEMBRETE
    GUIA
    COMPANHEIRO DE APRENDIZADO

As mensagens devem ser positivas.

Evitar:

    - ameaças;
    - constrangimento;
    - humilhação;
    - excesso de cobrança;
    - punição automática.

Preferir:

    - orientação;
    - explicação;
    - incentivo;
    - responsabilidade;
    - autonomia.

====================================================================
ARQUITETURA
====================================================================

A arquitetura planejada é:

    diretrizes
         ↓
    sistema.js
         ↓
    páginas HTML

O sistema.js será responsável pela execução.

As diretrizes serão responsáveis pelas configurações.

====================================================================
IMPORTANTE
====================================================================

NÃO colocar regras específicas diretamente neste arquivo.

Exemplo INCORRETO:

    if (hora >= 20) {
        alert("...");
    }

Esse valor deverá futuramente vir das DIRETRIZES.

Assim será possível alterar:

    20:00 → 21:00

sem alterar todas as páginas.

====================================================================
HISTÓRICO
====================================================================

v1.0 - 02/09/2026

    - Criado JavaScript central.
    - Criada estrutura de inicialização.
    - Criado sistema de horário.
    - Criado sistema básico de lembretes.
    - Criado controle de repetição.
    - Criada estrutura para futura integração com diretrizes.
    - Criadas funções reutilizáveis.

====================================================================
FIM DA DOCUMENTAÇÃO
====================================================================
*/


/* ================================================================
   01. OBJETO CENTRAL
================================================================ */

window.SistemaVicente = {

    versao: "1.0",

    iniciado: false,

    diretrizes: null,

    ultimoLembrete: null,

    /* ============================================================
       INICIALIZAÇÃO
    ============================================================ */

    iniciar: function () {

        if (this.iniciado) {
            return;
        }

        this.iniciado = true;

        this.registrarPagina();

        console.log(
            "Sistema Vicente iniciado - versão " + this.versao
        );
    },


    /* ============================================================
       IDENTIFICAÇÃO DA PÁGINA
    ============================================================ */

    registrarPagina: function () {

        const pagina =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();

        console.log(
            "Página atual:",
            pagina || "index.html"
        );
    },


    /* ============================================================
       HORÁRIO ATUAL
    ============================================================ */

    obterHorarioAtual: function () {

        const agora = new Date();

        return {
            data: agora,

            hora: agora.getHours(),

            minuto: agora.getMinutes(),

            segundo: agora.getSeconds(),

            texto:
                agora.toLocaleTimeString(
                    "pt-BR",
                    {
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                )
        };
    },


    /* ============================================================
       MINUTOS DO DIA
    ============================================================ */

    minutosDoDia: function (hora, minuto) {

        return (
            (hora * 60) +
            minuto
        );
    },


    /* ============================================================
       CONVERTER HH:MM
    ============================================================ */

    converterHorario: function (texto) {

        if (
            typeof texto !== "string" ||
            !texto.includes(":")
        ) {
            return null;
        }

        const partes =
            texto.split(":");

        const hora =
            parseInt(partes[0], 10);

        const minuto =
            parseInt(partes[1], 10);

        if (
            Number.isNaN(hora) ||
            Number.isNaN(minuto)
        ) {
            return null;
        }

        return this.minutosDoDia(
            hora,
            minuto
        );
    },


    /* ============================================================
       VERIFICAR INTERVALO
    ============================================================ */

    estaEntreHorarios: function (
        inicio,
        fim
    ) {

        const agora =
            this.obterHorarioAtual();

        const atual =
            this.minutosDoDia(
                agora.hora,
                agora.minuto
            );

        const inicioMin =
            this.converterHorario(inicio);

        const fimMin =
            this.converterHorario(fim);

        if (
            inicioMin === null ||
            fimMin === null
        ) {
            return false;
        }

        return (
            atual >= inicioMin &&
            atual <= fimMin
        );
    },


    /* ============================================================
       CRIAR LEMBRETE
    ============================================================ */

    mostrarLembrete: function (opcoes) {

        if (!opcoes) {
            return;
        }

        const titulo =
            opcoes.titulo ||
            "Lembrete";

        const mensagem =
            opcoes.mensagem ||
            "";

        const icone =
            opcoes.icone ||
            "💡";

        this.fecharLembrete();

        const overlay =
            document.createElement("div");

        overlay.className =
            "sv-reminder-overlay sv-visible";

        overlay.id =
            "sv-reminder-overlay";

        overlay.innerHTML = `

            <div
                class="sv-reminder"
                role="dialog"
                aria-modal="true"
                aria-labelledby="sv-reminder-title"
            >

                <div class="sv-reminder-icon">
                    ${icone}
                </div>

                <h2 id="sv-reminder-title">
                    ${titulo}
                </h2>

                <p>
                    ${mensagem}
                </p>

                <div class="sv-check-area">

                    <button
                        type="button"
                        class="sv-button"
                        onclick="SistemaVicente.fecharLembrete()"
                    >
                        OK, ENTENDI 👍
                    </button>

                </div>

            </div>
        `;

        document.body.appendChild(overlay);

        this.ultimoLembrete =
            new Date();
    },


    /* ============================================================
       FECHAR LEMBRETE
    ============================================================ */

    fecharLembrete: function () {

        const overlay =
            document.getElementById(
                "sv-reminder-overlay"
            );

        if (overlay) {
            overlay.remove();
        }
    },


    /* ============================================================
       VERIFICAR SE PODE MOSTRAR LEMBRETE
    ============================================================ */

    podeMostrarLembrete: function (
        intervaloMinutos
    ) {

        if (!this.ultimoLembrete) {
            return true;
        }

        const agora =
            new Date();

        const diferenca =
            (
                agora -
                this.ultimoLembrete
            ) /
            60000;

        return (
            diferenca >=
            intervaloMinutos
        );
    },


    /* ============================================================
       MENSAGEM DE APRENDIZADO
    ============================================================ */

    mensagemAprendizado: function () {

        this.mostrarLembrete({

            icone: "🧠",

            titulo:
                "MODO APRENDIZADO",

            mensagem:
                "Você não está apenas decorando. " +
                "Está construindo ferramentas para pensar."
        });
    },


    /* ============================================================
       MENSAGEM DE RACIOCÍNIO
    ============================================================ */

    mensagemRaciocinio: function () {

        this.mostrarLembrete({

            icone: "💡",

            titulo:
                "PENSE COMO UM EXPLORADOR",

            mensagem:
                "Entender como chegou na resposta " +
                "é mais importante do que apenas " +
                "decorar a resposta."
        });
    },


    /* ============================================================
       MENSAGEM DE SONO
    ============================================================ */

    mensagemSono: function () {

        this.mostrarLembrete({

            icone: "🌙",

            titulo:
                "MISSÃO: RECARREGAR O CÉREBRO",

            mensagem:
                "Dormir bem ajuda seu cérebro e seu corpo " +
                "a recuperar energia para o próximo dia."
        });
    },


    /* ============================================================
       MENSAGEM DE ALIMENTAÇÃO
    ============================================================ */

    mensagemAlimentacao: function () {

        this.mostrarLembrete({

            icone: "🍎",

            titulo:
                "MISSÃO: ENERGIA",

            mensagem:
                "Seu corpo precisa de combustível. " +
                "Frutas, verduras e proteínas ajudam " +
                "você a crescer e ficar forte."
        });
    },


    /* ============================================================
       MENSAGEM DE RESPEITO
    ============================================================ */

    mensagemRespeito: function () {

        this.mostrarLembrete({

            icone: "🤝",

            titulo:
                "MISSÃO DA TRIPULAÇÃO",

            mensagem:
                "Respeito, educação, generosidade e " +
                "palavras mágicas também fazem parte " +
                "de uma grande aventura."
        });
    },


    /* ============================================================
       TESTE DO SISTEMA
    ============================================================ */

    teste: function () {

        console.log(
            "Teste do Sistema Vicente executado."
        );

        console.log(
            "Horário atual:",
            this.obterHorarioAtual().texto
        );
    }

};


/* ================================================================
   02. INICIALIZAÇÃO AUTOMÁTICA
================================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        SistemaVicente.iniciar();

    }
);


/*
====================================================================
FIM DO ARQUIVO
====================================================================
*/
