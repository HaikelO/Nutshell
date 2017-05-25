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
