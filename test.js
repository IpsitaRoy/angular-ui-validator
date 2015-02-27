'use strict';
angular
  .module('test', ['ngMessages', 'angular-ui-validator'])
  .controller('ctrl', controller);

controller.$inject = ['$scope'];

function controller($scope) {
  $scope.pattern = /^a$/i;
  $scope.submitForm = function() {
    window.alert('submited');
  };
}
