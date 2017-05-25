angular.module("GpApp.mPurchases", [])
  .factory("AchatService", AchatService)
  .factory("AchatsService", AchatsService)
  .factory("FournisseurService", FournisseurService)
  .factory("FournisseursService", FournisseursService)
  .controller("AchatController", AchatController)
  .controller("AchatsController", AchatsController)
  .controller("FournisseurController", FournisseurController)
  .controller("FournisseursController", FournisseursController)
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
        when('/Achats', {
          templateUrl: './App/modules/purchases/index/view.html',
          controller: 'AchatsController'
        }).
        when('/Achat/:achatId', {
          templateUrl: './App/modules/purchases/purchase/view.html',
          controller: 'AchatController'
        }).
        when('/Fournisseurs', {
          templateUrl: './App/modules/purchases/providers/view.html',
          controller: 'FournisseursController'
        }).
        when('/Fournisseur/:fournisseurId', {
          templateUrl: './App/modules/purchases/provider/view.html',
          controller: 'FournisseurController'
        });
    }
  ]);

AchatsController.$inject = ["$scope", "$http", "$sce", "AchatsService", "AchatService", "FournisseursService", "ProduitsService", "MatieresService", "EtatsService"];

function AchatsController($scope, $http, $sce, AchatsService, AchatService, FournisseursService, ProduitsService, MatieresService, EtatsService) {
  $scope.Achats = AchatsService.query();
  $scope.Fournisseurs = FournisseursService.query();
  $scope.Produits = ProduitsService.query();
  $scope.Matieres = MatieresService.query();
  $scope.Etats = EtatsService.get();

  $scope.aAchat = function (obj) {
    var data = angular.toJson(obj);
    $scope.Achat = AchatService.save(data, function () {
      $scope.Achats = AchatsService.query();
      $scope.ajoutA = {};
    });
  };
}
