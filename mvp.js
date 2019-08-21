function unique(item, pos, self) {
    return self.indexOf(item) == pos;
};

tavola.controller('mvp', ["$scope",'tools','svcFirebase', function(scope,tools,svcFirebase){
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const DB = {};
    svcFirebase
        .initApp(scope)
        .then(firebase => {
            DB.livros = firebase.ref('livros/');
            DB.avaliacoes = firebase.ref('avaliacoes/');
            DB.estante = firebase.ref('estante/');

            DB.livros.on('value',data => {
                scope.safeApply(()=> {
                    scope.livros.lista.push(...
                        objToArray(data.val())
                    );
                })


                DB.avaliacoes.on('value',data => {
                    // scope.livros.lista.push(...
                        const avaliacoes = objToArray(data.val());
                        // 1 - funciona mas tá feio
                        avaliacoes
                            .map(avaliacao => avaliacao.idlivro)
                            .filter(unique)
                            .map(idlivro => scope.livros.lista.find(livro => livro.id == idlivro))
                            .forEach(livro => 
                                livro.avaliacoes = avaliacoes.filter(avaliacao => avaliacao.idlivro == livro.id)
                            )
                    // );
                })
            })
        })

    const mvp = scope;

    mvp.svcFirebase = () => svcFirebase;
    window.mvp = scope;
    window.DB = DB;

    const userResponse = msg => console.log(msg)

    scope.safeApply = fn => scope.$apply(fn);

    scope.livros = {
        lista: [],
        avaliar: livro => svcFirebase.saveRecord(
            DB.avaliacoes, {
                uid: scope.user().uid,
                idlivro: livro.id,
                conteudo: prompt(`Avalie o livro ${livro.titulo}`),
                pagina: tools.randomNumber(1,livro.paginas)
            }
        ).then(() => userResponse("obrigado"))
      // add: (item) => 
    }

    scope.estante = {
        lista: [],
        get: () => this.livros.lista.filter(livro => this.estante.lista.includes(livro)),
        adicionar: livro => scope.estante.lista.push(livro),
        remover: livro => scope.estante.lista.splice(scope.estante.lista.findIndex(favorito => favorito.titulo == livro.titulo),1)
    }

    scope.mostraAvaliacoes = livro => livro.verAvaliacoes = !livro.verAvaliacoes;
    scope.noDecimals = n => parseInt(n);
    scope.avaliacoesDisponiveis = livro => livro.avaliacoes.filter(avaliacao => avaliacao.pagina <= livro.pagina)
}]);