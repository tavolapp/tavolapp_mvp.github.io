tavola.service('tools', [function(){
	this.safeApply = function(scope, fn){
        var phase = scope.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && typeof fn === 'function') {
                fn();
            }
        } else {
            scope.$apply(fn);
        }
    }; // end of fn.safeApply
    this.randomNumber = (min,max) => Math.floor(Math.random() * (max - min)) + min;
}]);