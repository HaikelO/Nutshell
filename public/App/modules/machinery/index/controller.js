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