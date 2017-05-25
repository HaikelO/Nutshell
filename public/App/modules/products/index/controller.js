angular.module("GpApp.mProducts", [])
  .factory("ProduitService", ProduitService)
  .factory("ProduitsService", ProduitsService)
  .factory("MatiereService", MatiereService)
  .factory("MatieresService", MatieresService)
  .controller("ProduitsController", ProduitsController)
  .controller("ProduitController", ProduitController)
  .controller("MatiereController", MatiereController)
  .controller("MatieresController", MatieresController)
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
        when('/Produits', {
          templateUrl: './App/modules/products/index/view.html',
          controller: 'ProduitsController',
          controllerAs: 'pCtrl'
        }).
        when('/Produit/:produitId', {
          templateUrl: '/App/modules/products/product/view.html',
          controller: 'ProduitController'
        }).
        when('/Matieres', {
          templateUrl: './App/modules/products/materials/view.html',
          controller: 'MatieresController'
        }).
        when('/Matiere/:matiereId', {
          templateUrl: './App/modules/products/material/view.html',
          controller: 'MatiereController'
        });
    }
  ]);


ProduitsController.$inject = ["$scope", "$http", "$sce", "ProduitsService", "ProduitService", "MatieresService"];

function ProduitsController($scope, $http, $sce, ProduitsService, ProduitService, MatieresService) {
  pCtrl = this;
  pCtrl.modifierproduit = {};
  pCtrl.ajoutproduit = {};
  pCtrl.ajoutproduit.nomenclature = {};
  pCtrl.ajoutproduit.nomenclature.produits = [];
  pCtrl.ajoutproduit.nomenclature.matieres = [];


  pCtrl.Produits = ProduitsService.query();
  pCtrl.Matieres = MatieresService.query();

  pCtrl.acProduit = function () {
    var produitC = { id: null, qtt: null };
    pCtrl.ajoutproduit.nomenclature.produits.push(produitC);
    console.debug("Ajout Champ Produit");
  };

  pCtrl.rcProduit = function () {
    pCtrl.ajoutproduit.nomenclature.produits = [];
  };

  pCtrl.acMatiere = function () {
    var matiereC = { id: null, qtt: null };
    pCtrl.ajoutproduit.nomenclature.matieres.push(matiereC);
    console.debug("Ajout Champ Matiere");
  };

  pCtrl.rcMatiere = function () {
    pCtrl.ajoutproduit.nomenclature.matieres = [];
  };

  pCtrl.aProduit = function (obj) {
    var data = angular.toJson(pCtrl.ajoutproduit);

    pCtrl.Produit = ProduitService.save(data, function () {
      pCtrl.Produits = ProduitsService.query();
      pCtrl.ajoutproduit = {};
    }
    );
  };

  pCtrl.amProduit = function () {
    console.debug("Annuler");
    pCtrl.modifierproduit = {};
  };

  pCtrl.smProduit = function (obj) {
    if (obj.id) {
      pCtrl.modifierproduit.id = obj.id;
    }
    if (obj.name) {
      pCtrl.modifierproduit.name = obj.name;
    }
    if (obj.qtt) {
      pCtrl.modifierproduit.qtt = obj.qtt;
    }
    if (obj._id) {
      pCtrl.modifierproduit._id = obj._id;
    }
    if (obj.nomenclature.produits) {
      pCtrl.modifierproduit.nomenclature.produits = obj.nomenclature.produits;
    }
    if (obj.nomenclature.matieres) {
      pCtrl.modifierproduit.nomenclature.matieres = obj.nomenclature.matieres;
    }
    if (obj.stock) {
      pCtrl.modifierproduit.stock = obj.stock;
    }
    console.debug("modifier");
  };

  pCtrl.mProduit = function (obj) {
    var data = JSON.stringify(obj);
    pCtrl.Produit = ProduitService.save(data, function () {
      pCtrl.Produits = ProduitsService.query();
      pCtrl.ajoutproduit = {};
      pCtrl.modifierproduit = {};
    }
    );
  };

  pCtrl.sProduit = function (prod) {
    pCtrl.Produit = ProduitService.delete({ produitId: prod._id }, function () {
      pCtrl.Produits = ProduitsService.query();
    });
  };
}
