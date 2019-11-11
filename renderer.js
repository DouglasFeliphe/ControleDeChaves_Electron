
// var read = require('read-file-utf8');
// var loki = require('lokijs');
// var db = new loki('loki.json');
// var banco = read(__dirname + '/loki.json');
// db.loadJSON(banco);
// var tabelaChildren = db.getCollection('children');
// var campos = [];
// campos = tabelaChildren.data;
// var children = db.addCollection('children');


// document.querySelector('#btnTeste').addEventListener('click', function (evt) {
// evt.preventDefault();
// let data = {
//     name: document.querySelector('#name').value,
//     legs: document.querySelector('#legs').value
// }
// children.insert(data);
// db.save();
// console.log(dbn);
// alert('dados inseridos com sucesso!');
// // resetando campos
// document.querySelector('#form-teste').reset()
// });

const Dao = require('./assets/js/DAO/Dao');

function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
};

ready(function () {

    //criar o banco caso não exista
    if (Dao.getCollection("Usuario") == null) {
        Dao.criarTabela("Usuario");
        console.log("tabela Usuário criada!");
    };

    if (Dao.getCollection("Chave") == null) {
        Dao.criarTabela("Chave");
        console.log("tabela Chave criada!");
    };

    if (Dao.getCollection("Solicitacao") == null) {
        Dao.criarTabela("Solicitacao");
        console.log("tabela Solicitação criada!");
    };

    let colecao;
    let campoPainel;
    let tabelaPainelAdicionar;
    let modal;
    let campoEditar;
    let campoEditarId;
    let campoReserva;



    listarDados(
        "Usuario",
        "#campoUsuario",
        "#tabelaUsuarios",
        "#modalEditarUsuario",
        campoEditarUsuario,
        campoEditarIdUsuario,
        "#campoReservaUsuario"
    );

    listarDados(
        "Chave",
        "#campoChave",
        "#tabelaChaves",
        "#modalEditarChave",
        campoEditarChave,
        campoEditarIdChave,
        "#campoReservaChave"
    );

    listarDados(
        "Solicitacao",
        "",
        "#tabelaSolicitacoes #tabBody",
        "",
        "",
        "",
        ""
    );

});


/**
 * - lista os usuários, chaves e solicitações das collections nos paineis 'Solicitações','Reserva' e 'Adicionar'
 * @param {*} _colecao 
 * @param {*} _campoPainel 
 * @param {*} _tabelaPainelAdicionar 
 * @param {*} _modal 
 * @param {*} _campoEditar 
 * @param {*} _campoEditarId 
 * @param {*} _campoReserva 
 */
function listarDados(_colecao, _campoPainel, _tabelaPainelAdicionar, _modal,
     _campoEditar, _campoEditarId, _campoReserva) {

    let campos;
    let valor;

    _colecao == "Solicitacao" ?
        valor = 'data' :
        valor = 'nome';

    let campoDevolucaoChave = document.querySelector('#campoDevolucaoChave');

    campos = filtrarPor(valor, _colecao);

    let campoReserva;
    let campoPainel;
    // listando os dados existentes no banco para o painelSolicitacao
    if (_campoPainel != "" ) {

        campoPainel = document.querySelector(_campoPainel);
        campoReserva = document.querySelector(_campoReserva);        
        // console.log("display: "+campoPainel.style.display);

        campos.forEach(campo => {
            let option1 = document.createElement('option');
            let option2 = document.createElement('option');
            option1.appendChild(document.createTextNode(campo.nome));
            option2.appendChild(document.createTextNode(campo.nome));
          
            campoPainel.appendChild(option1);

            // listando as chaves e usuários do banco no 'painel reservar'
            campoReserva.appendChild(option2);
        });

    }

    // listando os usuarios existentes no banco para o painelAdicionar 

    let tabelaPainel = document.querySelector(_tabelaPainelAdicionar);
    let dados = [];
    let devolvido = "";
    let iconeStatus;

    // console.log(tabelaPainel);
    campos.forEach(campo => {

        let linha = document.createElement('tr');

        if (tabelaPainel.id == "tabBody") {

            campo.horarioDevolucao == null ?
                devolvido = "" : devolvido = campo.horarioDevolucao;

            iconeStatus = adicionaIcone(campo.status);

            dados = [

                document.createTextNode(campo.data),
                document.createTextNode(campo.labChave),
                document.createTextNode(campo.usuario),
                document.createTextNode(campo.horarioRetirada),
                document.createTextNode(campo.entreguePor),
                document.createTextNode(devolvido),
                document.createTextNode(campo.recebidoPor),
                iconeStatus

            ];

        }

        if (tabelaPainel.id != "tabBody") {

            dados = [
                document.createTextNode(campo.nome),
                document.createTextNode(campo.id),
                botaoEditar(_modal, _campoEditar, _campoEditarId),
                botaoExcluir()
            ];

        }

        for (let index = 0; index < dados.length; index++) {

            let col = document.createElement("td");
            // adicionando ícone de chave e usuário nas respectivas colunas, caso estiver preenchendo a tabela 'Solicitação'
            let icone = document.createElement('span');

            if (tabelaPainel.id == "tabBody") {
                if (index == 1) { icone.className = "glyphicon glyphicon-tag"; }
                if (index == 2) { icone.className = "glyphicon glyphicon-user"; }
                col.appendChild(icone);
            }
            col.appendChild(dados[index]);
            linha.appendChild(col)
        };

        //preenchendo o campo de devolução das chaves pendentes 
        if (campo.horarioDevolucao == null && tabelaPainel.id == "tabBody") {
            let option = document.createElement('option');
            option.appendChild(document.createTextNode(campo.labChave));
            campoDevolucaoChave.appendChild(option);
        }

        tabelaPainel.appendChild(linha);

    });
}



function adicionaIcone(_campoStatus) {

    let iconeStatus = document.createElement('span');

    if (_campoStatus == 'glyphicon glyphicon-remove') {
        iconeStatus.className = "glyphicon glyphicon-remove";
        iconeStatus.style.color = "red";
    } else {
        iconeStatus.className = "glyphicon glyphicon-ok";
        iconeStatus.style.color = "green";
    }

    iconeStatus.style.fontSize = "25px";

    return iconeStatus;
}


function filtrarPor(_valor, _colecao) {

    var view = Dao.getCollection(_colecao).addDynamicView('Últimos');

    if (_valor == 'data') {

        view.applyFind({
            data: {
                '$gte': 3
            }
        });
        view.applySort(function (a, b) {
            return a.data < b.data;
        });

    } else {

        view.applyFind({
            nome: {
                '$gte': 3
            }
        });
        view.applySort(function (a, b) {
            return a.nome < b.nome;
        });

    }

    return view.data();
}


