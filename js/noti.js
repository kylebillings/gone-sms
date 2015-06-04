var app = angular.module("angularNotification", ["ui.bootstrap"]);

app.controller("NotificationCtrl", function($scope) {
		
  $scope.add = function(){
    if($scope.notifications == undefined){
      $scope.notifications = 0;
    }
    $scope.notifications++;
  }
  
  $scope.reviewAll = function(){
    $scope.notifications = 0;
  }
  
});