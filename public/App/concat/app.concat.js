angular.module("GpApp", ["ngSanitize","ngRoute","ngStorage","appServices","ngCookies","ngResource","appControllers","GpApp.mProducts","GpApp.mSales","GpApp.mPurchases","GpApp.mClients","GpApp.mAuth","GpApp.mEntrepot","GpApp.mEmployees","GpApp.mMachinery","GpApp.mTaches","GpApp.mConfiguration","GpApp.mUsers"]);

angular.module("GpApp").config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/Users', {
        templateUrl: './App/modules/user/users.view.user.html',
        controller: 'UsersController'
      }).
      when('/User/:userId', {
        templateUrl: './App/modules/user/index.view.user.html',
        controller: 'UserController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

angular.module("GpApp.mAuth", [])
    .factory("LoginService", LoginService)
    .factory("AuthenticationService", AuthenticationService)
    .controller("LoginController", LoginController)
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
                when('/Login', {
                    templateUrl: './App/modules/auth/login/view.html',
                    controller: 'LoginController'
                });
        }
    ]);
LoginController.$inject = ["$scope", "$http", "$sce", "$cookieStore", "$location", "LoginService", "AuthenticationService"];

function LoginController($scope, $http, $sce, $cookieStore, $location, LoginService, AuthenticationService) {
  $scope.login = function (obj) {
    //$cookieStore.put('loginState','up');
    if (obj !== undefined) {
      var nam = $scope.log.name;
      var pass = $scope.log.password;
      //console.log(obj);
      console.log(nam);
      if (obj.password !== undefined && obj.name !== undefined) {
        // $scope.Login = Login.up(data, function(){
        //
        // });
        AuthenticationService.Login(nam, pass, function (result) {
          if (result === true) {
            return $location.path('/Produits');
          } else {

          }
        });
      }
    }
  };
}

LoginService.$inject = ["$resource"];

function LoginService($resource) {
  return $resource('', {}, {
    up: { method: 'POST', url: "/api/Login", 'Content-Type': 'application/x-www-form-urlencoded' }
  });
}

AuthenticationService.$inject = ["$http", "$localStorage"];

function AuthenticationService($http, $localStorage) {
  return {
    Login: Login,
    Logout: Logout
  };

  function Login(username, password, callback) {
    console.log(username, password);
    $http({ url: '/api/Login', method: 'POST', data: { name: username, password: password }, 'Content-Type': 'application/x-www-form-urlencoded' })
      .then(function (response) {
        // login successful if there's a token in the response
        console.log("success");
        console.log(response);
        if (response.token) {
          var data = angular.toJson(response.token);
          console.log(data);
          // store username and token in local storage to keep user logged in between page refreshes
          $localStorage.currentUser = { username: username, token: response.token };
          console.log($localStorage.currentUser.token);
          // add jwt token to auth header for all requests made by the $http service
          $http.defaults.headers.Authorization = data.token;

          // execute callback with true to indicate successful login
          return callback(true);
        } else {
          // execute callback with false to indicate failed login
          callback(false);
        }
      });
  }

  function Logout() {
    // remove user from local storage and clear http auth header
    delete $localStorage.currentUser;
    $http.defaults.headers.common.Authorization = '';
  }
}
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
ClientService.$inject = ["$resource","$localStorage"];

function ClientService ($resource,$localStorage) {
  return $resource('',{clientId:'@id'},{
    query: { method : 'GET', url : "/api/Client/:clientId"},
    save : { method: 'POST', url: "/api/Client", 'Content-Type' : 'application/x-www-form-urlencoded'},
    delete : { method : 'DELETE' , url : "/api/Client/:clientId"}
  });
}

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
ClientsService.$inject = ["$resource","$localStorage"];

function ClientsService ($resource,$localStorage) {
    return $resource('', {}, {
        query: { method : 'GET', url: "/api/Clients", isArray : true}
    });
}
angular.module("GpApp.mConfiguration", [])
    .controller("ConfigurationController",ConfigurationController)
    .config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/Configuration', {
            templateUrl: './App/modules/configuration/view.html',
            controller: 'ConfigurationController'
        });
        }
    ]);

ConfigurationController.$inject = ["$scope", "$http", "$sce"];

function ConfigurationController($scope, $http, $sce) {

}

angular.module("GpApp.mEmployees", [])
  .factory("EmployeService", EmployeService)
  .factory("PersonnelService", PersonnelService)
  .controller("PersonnelController",PersonnelController)
  .controller("EmployeController",EmployeController)
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/Personnel', {
          templateUrl: '/App/modules/employees/index/view.html',
          controller: 'PersonnelController'
        }).
        when('/Personnel/:employeId', {
          templateUrl: './App/modules/employees/employe/view.html',
          controller: 'EmployeController'
        });
    }
  ]);
  
PersonnelController.$inject = ["$scope", "$http", "$sce", "PersonnelService", "EmployeService"];

function PersonnelController ($scope, $http, $sce, PersonnelService, EmployeService) {
  $scope.Personnel = PersonnelService.query();

  $scope.aPersonnel = function (obj){
    var data = angular.toJson(obj);

    $scope.Employe = EmployeService.save(data, function() {
      $scope.Personnel = PersonnelService.query();
      $scope.ajoutP = {};
      }
    );
  };

  $scope.sPersonnel = function (prod){
    $scope.Employe = EmployeService.EmployeService({employeId: prod._id}, function(){
        $scope.Personnel = PersonnelService.query();
    });
  };
}

EmployeController.$inject = ["$scope", "$http", "$routeParams", "$sce", "EmployeService"];

function EmployeController ($scope, $http, $routeParams, $sce, EmployeService) {
  $scope.Employe = EmployeService.query({employeId: $routeParams.employeId});
}

PersonnelService.$inject = ["$resource","$localStorage"];

function PersonnelService ($resource,$localStorage) {
  return $resource('', {}, {
    query: { method : 'GET', url: "/api/Personnel", isArray:true}
  });
}

EmployeService.$inject = ["$resource","$localStorage"];

function EmployeService ($resource,$localStorage) {
  return $resource('',{employeId:'@id'},{
    query: { method : 'GET', url : "/api/Employe/:employeId"},
    save : { method: 'POST', url: "/api/Employe", 'Content-Type' : 'application/x-www-form-urlencoded'},
    delete : { method : 'DELETE' , url : "/api/Employe/:employeId"}
  });
}

EtatsService.$inject = [];

function EtatsService () {
    return {
            get : function(){
                this.etatTableau = [
                        {id : "1", name : "Devis"},
                        {id : "2", name : "En cours de traitement"},
                        {id : "3", name : "Terminé"}
                    ];
                return this.etatTableau;
            }
        };
}
/* Controllers */

angular.module('appControllers', []);



/* Services */

angular.module('appServices', [])
.factory("EtatsService", EtatsService);



angular.module("GpApp.mMachinery", [])
  .factory("MachineService", MachineService)
  .factory("MachinesService", MachinesService)
  .factory("MouleService", MouleService)
  .factory("MoulesService", MoulesService)
  .controller("MachineController", MachineController)
  .controller("MachinesController", MachinesController)
  .controller("MouleController", MouleController)
  .controller("MoulesController", MoulesController)
  .config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
        when('/Machines', {
          templateUrl: './App/modules/machinery/index/view.html',
          controller: 'MachinesController'
        }).
        when('/Machine/:machineId', {
          templateUrl: './App/modules/machinery/machine/view.html',
          controller: 'MachineController'
        }).
        when('/Moules', {
          templateUrl: './App/modules/machinery/molds/view.html',
          controller: 'MoulesController'
        }).
        when('/Moule/:mouleId', {
          templateUrl: './App/modules/machinery/mold/view.html',
          controller: 'MouleController'
        });
    }
  ]);

MachinesController.$inject = ["$scope", "$http", "$sce", "MachinesService", "MachineService"];

function MachinesController($scope, $http, $sce, MachinesService, MachineService) {
  $scope.Machines = MachinesService.query();

  $scope.aMachine = function (obj) {
    var data = angular.toJson(obj);

    $scope.Machine = Machine.save(data, function () {
      $scope.Machines = MachinesService.query();
      $scope.ajoutM = {};
    }
    );
  };
  $scope.sMachine = function (prod) {
    var options = { 'Content-Type': 'application/x-www-form-urlencoded' };
    $http.delete("http://127.0.0.1:8080/api/Machine/" + prod._id, options).success(function (response) {
      $scope.Machines = MachinesService.query();
    });
  };

}
MachinesService.$inject = ["$resource","$localStorage"];

function MachinesService ($resource,$localStorage) {
  return $resource('', {}, {
    query: { method:'GET', url: "/api/Machines", isArray : true}
  });
}
MachineController.$inject = ["$scope", "$http", "$routeParams", "$sce", "MachineService"];

function MachineController ($scope, $http, $routeParams, $sce, MachineService) {
  $scope.Machine = MachineService.query({machineId: $routeParams.machineId});
}
MachineService.$inject = ["$resource","$localStorage"];

function MachineService ($resource,$localStorage) {
  return $resource('/Machine/:machineId',{machinesId:'@id'},{
    query : { method : 'GET', url : "/api/Machine/:machineId"},
    save : { method: 'POST', url: "/api/Machine", 'Content-Type' : 'application/x-www-form-urlencoded'},
    delete : { method : 'DELETE' , url : "/api/Machine/:machineId"}
  });
}


MouleController.$inject = ["$scope", "$http", "$routeParams", "$sce", "MouleService", "MachinesService"];

function MouleController ($scope, $http, $routeParams, $sce, MouleService, MachinesService) {
  $scope.Moule = Moule.query({mouleId: $routeParams.mouleId});
  $scope.Machines = MachinesService.query();
  $scope.modifiermoule = {};
  $scope.modifiermoule.machines = [];

  $scope.smMoule = function (obj){
    if(obj.id){
      $scope.modifiermoule.id = obj.id;
    }
    if(obj.name){
      $scope.modifiermoule.name = obj.name;
    }
    if(obj.type){
      $scope.modifiermoule.type = obj.type;
    }
    if(obj.empreinte){
      $scope.modifiermoule.empreinte = obj.empreinte;
    }
    if(obj.nombre_utilisation){
      $scope.modifiermoule.nombre_utilisation = obj.nombre_utilisation;
    }
    if(obj.poid){
      $scope.modifiermoule.poid = obj.poid;
    }
    if(obj.etat){
      $scope.modifiermoule.etat = obj.etat;
    }
    if(obj.description){
      $scope.modifiermoule.description = obj.description;
    }
    if(obj.fabricant){
      $scope.modifiermoule.fabricant = obj.fabricant;
    }
    if(obj.machines){
      $scope.modifiermoule.machines = obj.machines;
    }
    if(obj._id){
      $scope.modifiermoule._id = obj._id;
    }
    console.debug("modifier");
  };
  $scope.acMachine = function(){
        var obj = { id : null, name : null};
        $scope.modifiermoule.machines.push(obj);
        console.debug("Ajout Champ Machine");
  };

  $scope.rcMachine = function(){
      $scope.modifiermoule.machines = [];
  };

  $scope.mMoule = function (obj) {
    var data = JSON.stringify(obj);
    $scope.Moule = MouleService.save(data, function() {
      $scope.Moule = MouleService.query({mouleId: $routeParams.mouleId});
      $scope.modifiermoule =  {};
      }
    );
  };
  
}

MouleService.$inject = ["$resource","$localStorage"];

function MouleService ($resource,$localStorage) {
  return $resource('',{ mouleId:'@id' },{
    query: { method: 'GET', url : "/api/Moule/:mouleId"},
    save : { method: 'POST', url: "/api/Moule", 'Content-Type' : 'application/x-www-form-urlencoded'},
    delete : { method : 'DELETE' , url : "/api/Moule/:mouleId"}
  });
}

MoulesController.$inject = ["$scope", "$http", "$sce", "MoulesService", "MouleService", "MachinesService"];

function MoulesController ($scope, $http, $sce, MoulesService, MouleService, MachinesService) {
  $scope.Moules = MoulesService.query();
  $scope.Machines = MachinesService.query();
  $scope.ajoutMoule = {};
  $scope.ajoutMoule.machines = [];

  $scope.aMoule = function (obj){
    var data = angular.toJson(obj);

    $scope.Moule = MouleService.save(data, function() {
      $scope.Moules = MoulesService.query();
      $scope.ajoutMoule = {};
      }
    );
  };
  $scope.sMoule = function (obj){
    var options = {'Content-Type': 'application/x-www-form-urlencoded'};
    $http.delete("http://127.0.0.1:8080/api/Moule/"+obj._id, options).success(function (response) {
      $scope.Moules = MoulesService.query();
    });
  };
  $scope.acMachine = function(){
      var obj = { id : null };
      $scope.ajoutMoule.machines.push(obj);
      console.debug("Ajout Champ Machine");
  };

  $scope.rcMachine = function(){
      $scope.ajoutMoule.machines = [];
  };
}
MoulesService.$inject = ["$resource","$localStorage"];

function MoulesService ($resource,$localStorage) {
  return $resource('', {}, {
    query: { method : 'GET', url: "/api/Moules", isArray: true}
  });
}

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


ProduitsService.$inject = ["$resource","$localStorage"];

function ProduitsService ($resource,$localStorage) {
  return $resource('', {}, {
    query : { method:'GET', url: "/api/Produits", isArray : true }
  });
}


MatiereController.$inject = ["$scope", "$http", "$routeParams", "MatiereService", "FournisseursService"];

function MatiereController ($scope, $http, $routeParams, MatiereService, FournisseursService) {
  vm = this;

  vm.Matiere = MatiereService.query({matiereId: $routeParams.matiereId});
  vm.Fournisseurs = FournisseursService.query();
  vm.modifiermatiere = {};
  vm.modifiermatiere.fournisseurs = [];

  vm.smMatiere = function (obj){
    vm.modifiermatiere.id = obj.id;
    vm.modifiermatiere.name = obj.name;
    vm.modifiermatiere.qtt = obj.qtt;
    vm.modifiermatiere.fournisseurs = obj.fournisseurs;
    vm.modifiermatiere._id = obj._id;

    console.debug("modifier");
  };

  vm.mMatiere = function (obj) {
    var url = "http://127.0.0.1:8080/api/Matiere";
    var data = obj;
    data = JSON.stringify(data);
    var options = {'Content-Type': 'application/x-www-form-urlencoded'};
    $http.post(url, data, options).success(function (respo) {
      vm.modifiermatiere =  {};
      vm.Matiere = MatiereService.query({matiereId: $routeParams.matiereId});
    });
    console.debug("Sauvegarder");
  };
  vm.acFournisseur = function(){
        var obj = { id : null };
        vm.modifiermatiere.fournisseurs.push(obj);
        console.debug("Ajout Champ Fournisseur");
  };

  vm.rcFournisseur = function(){
      vm.modifiermatiere.fournisseurs = [];
  };

}



MatiereService.$inject = ["$resource","$localStorage"];

function MatiereService ($resource,$localStorage) {
  return $resource('/Matiere/:matiereId',{matiereId:'@id'},{
        query:{ method: 'GET', url : "/api/Matiere/:matiereId?"},
        save : { method: 'POST', url: "/api/Matiere", 'Content-Type' : 'application/x-www-form-urlencoded'},
        delete : { method : 'DELETE' , url : "/api/Matiere/:matiereId"}
      });
}

MatieresController.$inject = ["$scope", "$http", "$sce", "MatieresService", "MatiereService", "FournisseursService"];

function MatieresController ($scope, $http, $sce, MatieresService, MatiereService, FournisseursService) {

  vm = this;
  vm.ajoutMatiere = {};
  vm.ajoutMatiere.fournisseurs = [];
  vm.Fournisseurs = FournisseursService.query();

  vm.aMatiere = function (obj){
    var data = angular.toJson(obj);
    console.debug("Ajouter");
    vm.Matiere = MatiereService.save(data, function() {
      vm.Matieres = MatieresService.query();
      vm.ajoutF = {};
      }
    );
  };
  vm.amMatiere = function (){
    console.debug("Annuler");
    vm.modifiermatiere = {};
  };
  vm.smMatiere = function (obj){
    if(obj.id){
      vm.modifiermatiere.id = obj.id;
    }
    if(obj.name){
      vm.modifiermatiere.name = obj.name;
    }
    if(obj.qtt){
      vm.modifiermatiere.qtt = obj.qtt;
    }
    if(obj.fournisseurs){
      vm.modifiermatiere.fournisseurs = obj.fournisseurs;
    }
    if(obj._id){
      vm.modifiermatiere._id = obj._id;
    }
    console.debug("modifier");
  };

  vm.mMatiere = function (obj) {
    var url = "http://127.0.0.1:8080/api/Matiere";
    var data = obj;
    data = JSON.stringify(data);
    var options = {'Content-Type': 'application/x-www-form-urlencoded'};
    $http.post(url, data, options).success(function (respo) {
      vm.Matieres = MatieresService.query();
      vm.ajoutMatiere = {};
      vm.modifiermatiere =  {};
    });
    console.debug("Sauvegarder");
  };

  vm.sMatiere = function (prod){
    vm.Matiere = MatiereService.delete({matiereId: prod._id}, function(){
        vm.Matieres = MatieresService.query();
    });
  };
  vm.acFournisseur = function(){
        var obj = { id : null };
        vm.ajoutMatiere.fournisseurs.push(obj);
        console.debug("Ajout Champ Fournisseur");
  };

  vm.rcFrounisseur = function(){
      vm.ajoutMatiere.fournisseurs = [];
  };
  // $http.get("http://127.0.0.1:8080/api/Matieres").success(function (response) {
  //   $scope.Matieres = response;
  // });
  vm.Matieres = MatieresService.query();

}

MatieresService.$inject = ["$resource","$localStorage"];

function MatieresService ($resource,$localStorage) {
  return $resource('', {}, {
    query : { method:'GET', url: "/api/Matieres", isArray : true}
  });
}

  
ProduitController.$inject = ["$scope", "$http", "$routeParams", "ProduitService", "ProduitsService", "MatieresService"];

function ProduitController ($scope, $http, $routeParams, ProduitService, ProduitsService, MatieresService) {
  vm = this;

  vm.Produit2 = [];
  vm.modifierproduit = {};
  vm.modifierproduit.nomenclature = {};
  vm.modifierproduit.stock = [];
  vm.modifierproduit.nomenclature.produits = [];
  vm.modifierproduit.nomenclature.matieres = [];
  vm.Produit = {};
  vm.Produit.nomenclature={};
  vm.Produit.nomenclature.produits = [];
  vm.Produit.nomenclature.matieres = [];
  vm.Produit = ProduitService.query({produitId: $routeParams.produitId});
  vm.Produits = ProduitsService.query();
  vm.Matieres = MatieresService.query();

  vm.amProduit = function () {
    console.debug("Annuler");
    vm.modifierproduit = {};
  };

  vm.mProduit = function (obj) {
    var data = JSON.stringify(obj);
    vm.Produit = ProduitService.save(data, function() {
      vm.Produit = ProduitService.query({produitId: $routeParams.produitId});
      vm.modifierproduit =  {};
      }
    );
  };

  vm.smProduit = function (obj) {
    vm.modifierproduit._id = obj._id;
    vm.modifierproduit.id = obj.id;
    vm.modifierproduit.name = obj.name;
    vm.modifierproduit.qtt = obj.qtt;
    vm.modifierproduit.nomenclature.produits = obj.nomenclature.produits;
    vm.modifierproduit.nomenclature.matieres = obj.nomenclature.matieres;
    vm.modifierproduit.stock = obj.stock;
    console.debug("modifier");
  };

  vm.acProduit = function(){
        var produitC = { id : null, qtt : null };
        vm.modifierproduit.nomenclature.produits.push(produitC);
        console.debug("Ajout Champ Produit");
  };

  vm.rcProduit = function(){
      vm.modifierproduit.nomenclature.produits = [];
  };

  vm.acStock = function(){
        var stockC = { location : null, qtt : null };
        vm.modifierproduit.stock.push(stockC);
        console.debug("Ajout Champ Produit");
  };

  vm.rcStock = function(){
      vm.modifierproduit.nomenclature.stock = [];
  };

  vm.acMatiere = function(){
        var matiereC = { id : null, qtt : null };
        vm.modifierproduit.nomenclature.matieres.push(matiereC);
        console.debug("Ajout Champ Matiere");
  };

  vm.rcMatiere = function(){
      vm.modifierproduit.nomenclature.matieres = [];
  };

  function checkP ( ) {
    vm.Produit.$promise.then(function (result) {
      angular.forEach(result.nomenclature.produits, function(value1, key1){
        vm.Produits.$promise.then(function (result2) {
          console.log(result2);
          angular.forEach(result2, function(value2, key2) {
            if(value2.id === value1.id)
            {
              value1.name = value2.name;
              vm.Produit2.push(value1);
              return this;
            }
          });
        });
      });
      angular.forEach(vm.Produit.nomenclature.matieres, function(value11, key1){
        vm.Matieres.$promise.then(function (result22) {
          angular.forEach(result22, function(value22, key2) {
            if(value22.id === value11.id)
              {
                value11.name = value22.name;
                return this;
              }
          });
        });
      });
    });
  }
  checkP();
}





ProduitService.$inject = ["$resource","$localStorage"];

function ProduitService ($resource,$localStorage) {
  return $resource('',{ produitId:'@id' },{
      query : { method: 'GET', url : "/api/Produit/:produitId"},
      save : { method: 'POST', url: "/api/Produit", 'Content-Type' : 'application/x-www-form-urlencoded'},
      delete : { method : 'DELETE' , url : "/api/Produit/:produitId"}
  });
}

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

AchatsService.$inject = ["$resource","$localStorage"];

function AchatsService ($resource,$localStorage) {
  return $resource('', {}, {
    query: { method : 'GET', url: "/api/Achats", isArray:true}
  });
  


}

FournisseurController.$inject = ["$scope", "$http", "$routeParams", "$sce", "FournisseurService"];

function FournisseurController ($scope, $http, $routeParams, $sce, FournisseurService) {
  $scope.Fournisseur = FournisseurService.query({fournisseurId: $routeParams.fournisseurId});
}


FournisseurService.$inject = ["$resource","$localStorage"];

function FournisseurService ($resource,$localStorage) {
  return $resource('',{fournisseurId:'@id'},{
      query: { method : 'GET', url : "/api/Fournisseur/:fournisseurId", isArray: true},
      save : { method: 'POST', url: "/api/Fournisseur", 'Content-Type' : 'application/x-www-form-urlencoded'},
      delete : { method : 'DELETE' , url : "/api/Fournisseur/:fournisseurId"}
  });
}

FournisseursController.$inject = ["$scope", "$http", "$sce","FournisseursService","FournisseurService"];

function FournisseursController($scope, $http, $sce, FournisseursService, FournisseurService) {
  $scope.Fournisseurs = FournisseursService.query();

      $scope.aFournisseur = function (obj){
        var data = angular.toJson(obj);

        $scope.Fournisseur = Fournisseur.save(data, function() {
          $scope.Fournisseurs = FournisseursService.query();
          $scope.ajoutF = {};
          }
        );
      };
      $scope.aChampContact = function(){
			     var Contact = { adresse : null, name : null, phone : null, mail : null };
		       $scope.ajoutF.contact.push(Contact);
		  };

      $scope.sFournisseur = function (prod){
        $scope.Fournisseur = FournisseurService.delete({fournisseurId: prod._id}, function(){
           $scope.Fournisseurs = FournisseursService.query();
        });
      };
}
FournisseursService.$inject = ["$resource","$localStorage"];

function FournisseursService ($resource,$localStorage) {
    return $resource('', {}, {
        query: { method : 'GET', url: "/api/Fournisseurs", isArray : true}
    });
}
angular.module("GpApp.mAchat", [])
    .factory("AchatService", AchatService)
    .factory("AchatsService", AchatsService)
    .controller("AchatController", AchatController)
    .controller("AchatsController",AchatsController)
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/Achats', {
                templateUrl: './App/modules/achat/achats.view.achat.html',
                controller: 'AchatsController'
            }).
            when('/Achat/:achatId', {
                templateUrl: './App/modules/achat/index.view.achat.html',
                controller: 'AchatController'
            });
        }
    ]);
    
AchatController.$inject = ["$scope", "$http", "$sce", "$routeParams", "AchatServices"];

function AchatController ($scope, $http, $sce, $routeParams, AchatServices) {
    ACtrl = this;

    $scope.Achat = AchatServices.query({ achatId : $routeParams.achatId});
    console.log($scope.Achat);

    $scope.supprimerAchat = function (obj) {
        $scope.Achat =  Achat.delete({ achatId : obj._id});
        
    };
}


AchatService.$inject = ["$resource","$localStorage"];

function AchatService ($resource,$localStorage){
  return $resource('',{achatId:'@id'},{
    query: { method : 'GET', url : "/api/Achat/:achatId"},
    save : { method: 'POST', url: "/api/Achat", 'Content-Type' : 'application/x-www-form-urlencoded'},
    delete : { method : 'DELETE' , url : "/api/Achat/:achatId"}
  });
}


angular.module('GpApp.mSales', [])
.factory("VenteService", VenteService)
.factory("VentesService", VentesService)
.controller("VenteController",VenteController)
.controller("VentesController",VentesController)
.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
        when('/Vente/:venteId', {
            templateUrl: './App/modules/sales/sale/view.html',
            controller: 'VenteController'
        }).
        when('/Ventes', {
            templateUrl: './App/modules/sales/index/view.html',
            controller: 'VentesController'
        });
    }
]);

VentesController.$inject = ["$scope", "$http", "$sce", "VenteService", "VentesService", "ClientsService", "ProduitsService"];

function VentesController ($scope, $http, $sce, VenteService, VentesService, ClientsService, ProduitsService) {
    $scope.Clients = ClientsService.query();
    $scope.Ventes = VentesService.query();
    $scope.Produits = ProduitsService.query();
    $scope.aVente =  {};
    $scope.aVente.produits = [];
    console.log("VentesCtrl");
    $scope.acProduit = function (){
        var obj = {id : null, qtt : null, prix: null};
        $scope.aVente.produits.push(obj); 
    };

    $scope.ajoutVente = function (obj){
        var data = angular.toJson($scope.aVente);
        
        $scope.Vente = VenteService.save(data, function(){
            $scope.aVente = {};
            $scope.Ventes = VentesService.query();
        });
    };
}
VentesService.$inject = ["$resource","$localStorage"];

function VentesService ($resource,$localStorage) {
  return $resource('', {}, {
      query: { method:'GET', url: "/api/Ventes", isArray : true}
    });
}
VenteController.$inject = ["$scope", "$http", "$sce", "$routeParams", "VenteService", "ProduitsService"];

function VenteController ($scope, $http, $sce, $routeParams, VenteService, ProduitsService) {
    $scope.Vente = VenteService.query({ venteId:  $routeParams.venteId });
    $scope.Produits =  ProduitsService.query();
    $scope.Total = null;

    $scope.supprimerVente =  function (obj) {
        $scope.Vente = VenteService.delete({venteId : obj._id});
    };
    console.log($scope.Vente);
    $scope.Vente.$promise.then(function (result) {
        if(result.produits){
            
            angular.forEach(result.produits, function(value, key1){
                $scope.Total = $scope.Total + value.prix;
            });
        }
    });
}


VenteService.$inject = ['$resource','$localStorage'];

function VenteService ($resource,$localStorage) {
  return $resource('',{userId:'@id'},{
        query: { method: 'GET', url : "/api/Vente/:venteId"},
        save : { method: 'POST', url: "/api/Vente", 'Content-Type' : 'application/x-www-form-urlencoded'},
        delete : { method : 'DELETE' , url : "/api/Vente/:venteId"}
      });
}

SessionController.$inject = ["SessionService"];

function SessionController (SessionService) {
    return {
        create : create,
        destroy : destroy
    };
    function create (token,name) {
        SessionService.setToken(token);
        SessionService.setName(name);
        SessionService.setIslogedIn(true);
    }
    function destroy(){
        SessionService.setIslogedIn(false);
    }
}
SessionService.$inject = [];

function SessionService () {
    var name,token,islogedin;
    return {
        setName : setName,
        getName : getName,
        setToken : setToken,
        getToken : getToken,
        setIsLogedIn : setIsLogedIn,
        getIsLogedIn : getIsLogedIn
    };

    function setName (obj) {
        name = obj;
    }
    function getName () {
        return name;
    }
    function setToken (obj) {
        token = obj;
    }
    function getToken () {
        return token;
    }
    function setIsLogedIn (obj) {
        islogedin = obj;
    }
    function getIsLogedIn () {
        return islogedin;
    }
}
angular.module("GpApp.mTaches", [])
.controller("TachesController",TachesController)
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
       when('/Taches', {
        templateUrl: './App/modules/tache/index/view.html',
        controller: 'TachesController'
      });
    }
]);

TachesController.$inject = ["$scope", "$http", "$sce", "ProduitsService", "ProduitService", "MatieresService", "MatiereService"];

function TachesController ($scope, $http, $sce, ProduitsService, ProduitService, MatieresService, MatiereService) {
  $scope.Produits = ProduitsService.query();
  $scope.Matieres = MatieresService.query();

  $scope.fProduit = function (obj) {
    if(obj.produit.nomenclature.produits.length > 0)
    {
      //On parcourt la liste des produits dans la nomenclature du produit
      angular.forEach(obj.produit.nomenclature.produits, function(value, key){

        //On parcourt la liste des produits
        angular.forEach($scope.Produits, function (value2, keys2) {

          //On compare l'id des produits dans la nomenclature avec les id de la liste des produits
          if(value.id === value2.id)
          {
            //Verification si stock suffisant pour la fabrication du produit
            if(obj.qtt * value.qtt > value2.qtt)
            {
              return console.debug("Pas de stock");
            }
          }
        });
      });
    }
    if (obj.produit.nomenclature.matieres.length > 0) {
      //On parcourt la liste des matieres dans la nomenclature du produit
      angular.forEach(obj.produit.nomenclature.matieres, function(value, key){
        angular.forEach($scope.Matieres, function(value2, key2){
          if (value.id === value2.id) {
            if (obj.qtt * value.qtt > value2.qtt) {
              return console.debug("Pas de stock");
            }
          }
        });
      });
    }
    if(obj.produit.nomenclature.produits.length > 0)
    {

      //On parcourt la liste des produits dans la nomenclature du produit
      angular.forEach(obj.produit.nomenclature.produits, function(value, key){

        //On parcourt la liste des produits
        angular.forEach($scope.Produits, function (value2, keys2) {

          //On compare l'id des produits dans la nomenclature avec les id de la liste des produits
          if(value.id === value2.id)
          {

            //Si le stock du produit existe on execute
            //Verification si stock suffisant pour la fabrication du produit
            if(obj.qtt * value.qtt < value2.qtt)
            {
              //On retire du stock les produits utilisés pour la fabrication
              value2.qtt = value2.qtt - obj.qtt * value.qtt;
              //On ajoute dans le stock le produit fabriqué
              if (obj.produit.qtt) {
                obj.produit.qtt = obj.produit.qtt + obj.qtt;
              }
              else {
                obj.produit.qtt = obj.qtt;
              }

              //Sauvegarde dans la base du stock
              $scope.Produit = ProduitService.save(obj.produit, function() {});
              $scope.Produit = ProduitService.save(value2, function() {});

            }

          }
        });
      });
    }
    if (obj.produit.nomenclature.matieres.length > 0) {
      //On parcourt la liste des matieres dans la nomenclature du produit
      angular.forEach(obj.produit.nomenclature.matieres, function(value, key){
        angular.forEach($scope.Matieres, function(value2, key2){
          if (value.id === value2.id) {
            if (obj.qtt * value.qtt < value2.qtt) {
              //On retire du stock les matieres utiliser pour la fabrication
              value2.qtt = value2.qtt - obj.qtt * value.qtt;
              //On ajoute dans le stock le produit fabriquer
              if (obj.produit.qtt) {
                obj.produit.qtt = obj.produit.qtt + obj.qtt;
              }
              else {
                obj.produit.qtt = obj.qtt;
              }
              $scope.Produit = ProduitService.save(obj.produit, function() {});
              $scope.Matiere = MatiereService.save(value2, function() {});
            }
          }
        });
      });
    }

  };
}

TachesService.$inject = ["$resource"];

function TachesService ($resource) {
  return $resource('', {}, {

    });
}
angular.module("GpApp.mUsers", [])
  .factory("UserService",UserService)
  .factory("UsersService",UsersService)
  .controller("UserController",UserController)
  .controller("UsersController",UsersController)
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/Users', {
          templateUrl: './App/modules/users/index/view.html',
          controller: 'UsersController'
        }).
        when('/User/:userId', {
          templateUrl: './App/modules/users/user/view.html',
          controller: 'UserController'
        });
    }
  ]);

UsersController.$inject = ["$scope", "$http", "$sce", "UsersService", "UserService"];

function UsersController ($scope, $http, $sce, UsersService, UserService) {
  $scope.Users = UsersService.query();

  $scope.sUser = function(obj) {
    console.log("del");
    $scope.User = UserService.delete({ userId : obj._id }, function(){
        $scope.Users = UsersService.query();
        console.log("del ok");
    });
  };
  $scope.aUser = function(obj){
    var data = angular.toJson(obj);

    $scope.User = UserService.save(data, function(){
      $scope.ajoutU = {};
      $scope.Users = UsersService.query();
    });
  };
}
UsersService.$inject = ["$resource","$localStorage"];

function UsersService ($resource,$localStorage) {
  return $resource('', {}, {
      query: { method:'GET', url: "/api/Users", isArray : true}
    });
}
UserController.$inject = ["$scope", "$http", "$sce", "$routeParams", "UserService"];

function UserController ($scope, $http, $sce, $routeParams, UserService) {
  $scope.User = UserService.query({ userId : $routeParams.userId });
}


UserService.$inject = ["$resource", "$localStorage"];

function UserService ($resource,$localStorage) {
  return $resource('',{userId:'@id'},{
    query: { method: 'GET', url : "/api/User/:userId"},
    save : { method: 'POST', url: "/api/User", 'Content-Type' : 'application/x-www-form-urlencoded'},
    delete : { method : 'DELETE' , url : "/api/User/:userId"}
  });
}
