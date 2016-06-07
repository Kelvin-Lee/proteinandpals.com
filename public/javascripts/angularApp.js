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
  $scope.removeUser= function(){

  };

}]);

app.controller('UserCtrl', ['$scope', 'user', function($scope, user){
  $scope.user = user;

  $scope.editUserNumbers = function(){
    //make a post request to the mongo db instance, sending in the USER object
  };

}]);

app.controller('EditUserCtrl', ['$scope', 'user', function($scope, user){
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
    remove: function(){
      //http
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
    .state('users', {
      url: '/users/{id}',
      templateUrl: '/user.html',
      controller: 'UserCtrl',
      resolve: {
        user: ['$stateParams', 'users', function($stateParams, users){ 
	  return users.get($stateParams.id);
	}]
      },
    })
    .state('edituser', {
      url: '/users/{id}/edit',
      templateUrl: '/edit.html',
      controller: 'EditUserCtrl',
      resolve: {
        user: ['$stateParams', 'users', function($stateParams, users){ 
	  return users.get($stateParams.id);
	}]
      },
    });

  $urlRouterProvider.otherwise('home');
}]);
