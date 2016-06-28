var app = angular.module('weights', ['ui.router']);

app.controller('MainCtrl', [ '$scope', 'users', function($scope, users){

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
  $scope.user = user.user;
}]);

app.controller('EditUserCtrl', ['$scope', 'user', function($scope, user){

  $scope.user = user.user;

  $scope.putLifts = function(id){
    user.putLifts(id, $scope.user.lifts);
  };

}]);


app.factory('user', ['$http', function($http){
  var o = {
    user: {},
    get: function(id){
      return $http.get('/users/' + id).success(function(data){
        angular.copy(data, o.user);
      });
    },
    putLifts: function(id, arr){
      return $http.put('/users/' + id, arr).success(function(res){
        return res.data;
      });
    },
  };
  return o;
}])


app.factory('users', ['$http', function($http){
  var o = {
    users: [],
    getAll: function(){
      return $http.get('/users').success(function(data){
        angular.copy(data, o.users);
	});
    },
    create: function(user){ 
      return $http.post('/users', user).success(function(data){
        o.users.push(data);
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
    .state('users', {
      url: '/users/{id}',
      templateUrl: '/user.html',
      controller: 'UserCtrl',
      resolve: {
        userPromise: ['$stateParams', 'user', function($stateParams, user){  //TODO: DRY? (see below)
	  return user.get($stateParams.id);
	}]
      },
    })
    .state('edituser', {
      url: '/users/{id}/edit',
      templateUrl: '/edit.html',
      controller: 'EditUserCtrl',
      resolve: {
        userPromise: ['$stateParams', 'user', function($stateParams, user){ //TODO: DRY? (see above)
	  return user.get($stateParams.id);
	}]
      },
    });

  $urlRouterProvider.otherwise('home');

}]);
