

ClientController.$inject = ["$scope", "$http", "$routeParams", "$sce", "ClientService"];

function ClientController ($scope, $http, $routeParams, $sce, ClientService) {
  $scope.Client = ClientService.query({clientId: $routeParams.clientId});
}