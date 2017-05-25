angular.module("GpApp.mClients", [])
  .factory("ClientService", ClientService)
  .factory("ClientsService", ClientsService)
  .controller("ClientController",ClientController)
  .controller("ClientsController",ClientsController)
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
      when('/Clients', {
        templateUrl: './App/modules/clients/index/view.html',
        controller: 'ClientsController'
      }).
      when('/Client/:clientId', {
        templateUrl: './App/modules/clients/client/view.html',
        controller: 'ClientController'
      });
    }
  ]);


ClientsController.$inject = ["$scope", "$http", "$sce", "ClientService", "ClientsService"];

function ClientsController($scope, $http, $sce, ClientService, ClientsService){
  $scope.Clients = ClientsService.query();

  $scope.aClient = function (obj){
    var data = angular.toJson(obj);

    $scope.Client = ClientService.save(data, function() {
      $scope.Clients = ClientsService.query();
      $scope.ajoutC = {};
      }
    );
  };
  $scope.aChampContact = function(){
        var Contact = { adresse : null, name : null, phone : null, mail : null };
        $scope.ajoutC.contact.push(Contact);
  };

  $scope.sClient = function (prod){
    $scope.Client = ClientService.delete({clientId: prod._id}, function(){
        $scope.Clients = ClientsService.query();
    });
  };
}