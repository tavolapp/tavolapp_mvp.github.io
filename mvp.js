tavola.controller('mvp', ["$scope",'tools','svcFirebase', function(scope,tools,svcFirebase){
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    svcFirebase.initApp(scope);
    const mvp = scope;

    mvp.svcFirebase = () => svcFirebase;
    window.mvp = scope;

    scope.safeApply = fn => scope.$apply(fn);

    scope.livros = {
      lista: []
    }

    scope.estante = {
        lista: [],
        get: () => this.livros.lista.filter(livro => this.estante.lista.includes(livro)),
        adicionar: livro => scope.estante.lista.push(livro),
        remover: livro => scope.estante.lista.splice(scope.estante.lista.findIndex(favorito => favorito.titulo == livro.titulo),1)
    }
}]);