angular.module("GpApp.mClient", [])
  .factory("ClientService", ClientService)
  .factory("ClientsService", ClientsService)
  .controller("ClientController",ClientController)
  .controller("ClientsController",ClientsController)
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
      when('/Clients', {
        templateUrl: './App/modules/client/clients.view.client.html',
        controller: 'ClientsController'
      }).
      when('/Client/:clientId', {
        templateUrl: './App/modules/client/index.view.client.html',
        controller: 'ClientController'
      });
    }
  ]);

ClientController.$inject = ["$scope", "$http", "$routeParams", "$sce", "ClientService"];

function ClientController ($scope, $http, $routeParams, $sce, ClientService) {
  $scope.Client = ClientService.query({clientId: $routeParams.clientId});
}