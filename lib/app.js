'use strict';
(function(angular) {
  angular
    .module('angular-ui-validator', [])
    .directive('uiRequired', function() {
      return {
        link: uiRequired,
        restrict: 'A',
        require: 'ngModel'
      };
    })
    .directive('uiPattern', function() {
      return {
        link: uiPattern,
        restrict: 'A',
        scope: {
          uiPattern: '='
        },
        require: 'ngModel'
      };
    })
    .directive('uiEmail', function() {
      return {
        link: uiEmail,
        restrict: 'A',
        scope: true,
        require: 'ngModel'
      };
    })
    .directive('uiUrl', function() {
      return {
        link: uiUrl,
        restrict: 'A',
        scope: true,
        require: 'ngModel'
      };
    })
    .directive('uiMinlength', function() {
      return {
        link: uiMinlength,
        restrict: 'A',
        scope: {
          uiMinlength: '='
        },
        require: 'ngModel'
      };
    })
    .directive('uiMaxlength', function() {
      return {
        link: uiMaxlength,
        restrict: 'A',
        scope: {
          uiMaxlength: '='
        },
        require: 'ngModel'
      };
    })
    .directive('uiLength', function() {
      return {
        link: uiLength,
        restrict: 'A',
        scope: {
          uiLength: '='
        },
        require: 'ngModel'
      };
    });

  function evaluateRegExp(regExp, value) {
    return new RegExp(regExp || '').test(value);
  }

  function uiRequired(scope, element, attrs, ngModel) { //here is the model

    ngModel.$setPristine();

    ngModel.$validators.uirequired = function(modelValue, viewValue) {
      var value = modelValue || viewValue;
      return value ? value.length : false;
    };
  }

  function uiPattern(scope, element, attrs, ngModel) {

    ngModel.$setPristine();

    ngModel.$parsers.push(function(viewValue) {
      var flag = evaluateRegExp(scope.uiPattern, viewValue);

      ngModel.$setValidity('uipattern', flag);

      if (flag) {
        return viewValue;
      }

    });
  }

  function uiEmail(scope, element, attrs, ngModel) {
    ngModel.$setPristine();

    ngModel.$parsers.push(function(viewValue) {
      var flag = evaluateRegExp(/^[a-zA-Z0-9\-\_\.\+]+@[a-zA-Z0-9\-\_\.]+\.[a-zA-Z0-9\-\_]+$/, viewValue);

      ngModel.$setValidity('uiemail', flag);

      if (flag) {
        return viewValue;
      }

    });
  }

  function uiUrl(scope, element, attrs, ngModel) {
    ngModel.$setPristine();

    ngModel.$parsers.push(function(viewValue) {
      var flag = evaluateRegExp(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/, viewValue);

      ngModel.$setValidity('uiurl', flag);

      if (flag) {
        return viewValue;
      }

    });
  }

  function uiMinlength(scope, element, attrs, ngModel) {
    ngModel.$setPristine();

    ngModel.$parsers.push(function(viewValue) {
      var flag = evaluateRegExp('^.{' + scope.uiMinlength + ',}$', viewValue);

      ngModel.$setValidity('uiminlength', flag);

      if (flag) {
        return viewValue;
      }

    });
  }

  function uiMaxlength(scope, element, attrs, ngModel) {
    ngModel.$setPristine();

    ngModel.$parsers.push(function(viewValue) {

      var flag = evaluateRegExp('^.{0,' + scope.uiMaxlength + '}$', viewValue);

      ngModel.$setValidity('uimaxlength', flag);

      if (flag) {
        return viewValue;
      }

    });
  }

  function uiLength(scope, element, attrs, ngModel) {

    ngModel.$setPristine();

    if (typeof scope.uiLength === 'object') {

      if (Array.isArray(scope.uiLength) && scope.uiLength.length === 2) {
        scope.uiLength.min = scope.uiLength[0] < scope.uiLength[1] ? scope.uiLength[0] : scope.uiLength[1];
        scope.uiLength.max = scope.uiLength[0] > scope.uiLength[1] ? scope.uiLength[0] : scope.uiLength[1];
      }

      ngModel.$parsers.push(function(viewValue) {
        var flag = evaluateRegExp('^.{' + scope.uiLength.min + ',' + scope.uiLength.max + '}$', viewValue);

        ngModel.$setValidity('uilength', flag);

        if (flag) {
          return viewValue;
        }

      });
    }
  }


})(window.angular);
