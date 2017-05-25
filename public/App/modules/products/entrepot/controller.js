angular.module("GpApp.mEntrepot", [])
  .controller("EntrepotController",EntrepotController)
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/Entrepot', {
          templateUrl: './App/modules/products/entrepot/view.html',
          controller: 'EntrepotController'
        });
    }
  ]);

EntrepotController.$inject = ["$scope", "$http", "$sce","MatieresService", "ProduitsService"];

function EntrepotController ($scope, $http, $sce, MatieresService, ProduitsService) {
  $scope.Stock = [ { name : "PVC", QTT: 7}, {name : "PVC2", QTT: 5}];
  $scope.Matieres = MatieresService.query();
  $scope.Produits = ProduitsService.query();

}
