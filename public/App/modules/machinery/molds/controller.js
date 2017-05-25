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