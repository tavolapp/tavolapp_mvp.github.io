const tavola = angular.module('tavola',[]);
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyB0DQQTJmFgZ8YdGK_ADJFZizm7Hqnw3gg",
	authDomain: "mvp1-945ea.firebaseapp.com",
	databaseURL: "https://mvp1-945ea.firebaseio.com",
	projectId: "mvp1-945ea",
	storageBucket: "",
	messagingSenderId: "189857283085",
	appId: "1:189857283085:web:553d1c55c6cc944c"
};

const objToArray = obj => Object.keys(obj).map(item => {
    obj[item]
    obj[item].id = item;
    return obj[item];
})

// tavola.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
//         $routeProvider.when(`/`, {
//             templateUrl: 'components/intro.html',
//             controller: 'mvp'
//         })

//         // configure html5 to get links working on jsfiddle
//         $locationProvider.html5Mode(true);
//     }
// ]);