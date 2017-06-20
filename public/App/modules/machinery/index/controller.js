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
        when("/Machines", {
          templateUrl: "./App/modules/machinery/index/view.html",
          controller: "MachinesController",
          controllerAs: "vm"
        }).
        when("/Machine/:machineId", {
          templateUrl: "./App/modules/machinery/machine/view.html",
          controller: "MachineController",
          controllerAs: "vm"
        }).
        when("/Moules", {
          templateUrl: "./App/modules/machinery/molds/view.html",
          controller: 'MoulesController',
          controllerAs: "vm"
        }).
        when("/Moule/:mouleId", {
          templateUrl: "./App/modules/machinery/mold/view.html",
          controller: "MouleController",
          controllerAs: "vm"
        });
    }
  ]);

MachinesController.$inject = ["$scope", "$http", "$sce", "MachinesService", "MachineService"];

function MachinesController($scope, $http, $sce, MachinesService, MachineService) {
  var vm = this;
  vm.Machines = MachinesService.query();

  vm.aMachine = function (obj) {
    var data = angular.toJson(obj);

    vm.Machine = Machine.save(data, function () {
      vm.Machines = MachinesService.query();
      vm.ajoutM = {};
    }
    );
  };
  vm.sMachine = function (prod) {
    var options = { 'Content-Type': 'application/x-www-form-urlencoded' };
    $http.delete("http://127.0.0.1:8080/api/Machine/" + prod._id, options).success(function (response) {
      vm.Machines = MachinesService.query();
    });
  };

}