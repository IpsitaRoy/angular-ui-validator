'use strict';
angular
  .module('test', ['ngMessages', 'angular-ui-validator'])
  .controller('ctrl', controller);

controller.$inject = ['$scope'];

function controller($scope) {

  $scope.pattern = /^a$/i;
  $scope.minLength = 2;
  $scope.maxLength = 3;

  // possible length values
  // $scope.length = [1, 2];
  $scope.length = [3, 2];

  $scope.submitForm = function() {
    window.alert('submited');
  };

}
