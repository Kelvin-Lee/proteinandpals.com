var app = angular.module('weights', ['ui.router']);

app.controller('MainCtrl', [ '$scope', 'users', 'usersPromise', function($scope, users, usersPromise){
  $scope.users = users.users;
  $scope.addUser = function(){
    users.create({
      name: $scope.name 
    }).success(function(){
      $scope.name = '';
    });
  };

}]);

app.controller('UserCtrl', ['$scope', 'user', function($scope, user){
  $scope.user = user;
}]);

app.factory('users', ['$http', function($http){
  var o = {
    users: [],
    getAll: function(){ // Get all the users from the DB
      return $http.get('/users').success(function(data){
        angular.copy(data, o.users); //Copy it to the 'client side' version
	});
    },
    create: function(user){ 
    //create new user; takes a JSON object, who's data is linked to the $scope
      return $http.post('/users', user).success(function(data){
        o.users.push(data); //data is a res.json() of the model instance/document of the new user
      });
    },
    get: function(id){
      return $http.get('/users/' + id).then(function(res){
        return res.data;
      });
    },
  };
  return o;
}]);

app.config([ '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
        usersPromise: ['users', function(users){
          return users.getAll();
	}]
      }
    })
    // "The Angular ui-router detects we are entering the `posts` state and will then automatically query the server for the full post object, including `comments`. Only after the reqest has returned wil the state finish loading.
    .state('users', {
      url: '/users/{id}',
      templateUrl: '/user.html',
      controller: 'UserCtrl',
      resolve: {
        user: ['$stateParams', 'users', function($stateParams, users){ 
	  return users.get($stateParams.id);
	}]
      },
    });

  $urlRouterProvider.otherwise('home');
}]);
