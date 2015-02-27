'use strict';
angular
  .module('angular-ui-validator', [])
  .directive('uiRequired', uiRequired)
  .directive('uiPattern', uiPattern);


function uiRequired() {
  return {
    link: link,
    restrict: 'A',
    require: 'ngModel'
  };

  function link(scope, element, attrs, ngModel) { //here is the model

    ngModel.$setPristine();

    ngModel.$validators.uirequired = function(modelValue, viewValue) {
      var value = modelValue || viewValue;
      return value ? value.length : false;
    };

  }
}

function uiPattern() {
  return {
    link: link,
    restrict: 'A',
    scope: {
      uiPattern: '='
    },
    require: 'ngModel'
  };

  function link(scope, element, attrs, ngModel) { //here is the model
    ngModel.$setPristine();

    ngModel.$validators.uipattern = function(modelValue, viewValue) {
      var value = modelValue || viewValue,
        pattern = new RegExp(scope.uiPattern || '');
      return pattern.test(value);
    };

  }
}
