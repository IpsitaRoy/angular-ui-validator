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
    })
    .directive('uiAlphanum', function() {
      return {
        link: uiAlphanum,
        restrict: 'A',
        scope: true,
        require: 'ngModel'
      };
    })
    .directive('uiMinwords', function() {
      return {
        link: uiMinwords,
        restrict: 'A',
        scope: {
          uiMinwords: '='
        },
        require: 'ngModel'
      };
    })
    .directive('uiMaxwords', function() {
      return {
        link: uiMaxwords,
        restrict: 'A',
        scope: {
          uiMaxwords: '='
        },
        require: 'ngModel'
      };
    })
    .directive('uiWords', function() {
      return {
        link: uiWords,
        restrict: 'A',
        scope: {
          uiWords: '='
        },
        require: 'ngModel'
      };
    })
    .directive('uiEqualto', function() {
      return {
        link: uiEqualto,
        restrict: 'A',
        scope: {
          uiEqualto: '='
        },
        require: 'ngModel'
      };
    })
    .directive('uiReset', function() {
      return {
        link: uiReset,
        restrict: 'A',
        scope: true
      };
    });

  function evaluateRegExp(regExp, value) {
    return new RegExp(regExp || '').test(value);
  }

  function countWords(value) {
    return value.match(/\S/g).length;
  }

  function compare(target, source) {
    if (target === source) {
      return 0;
    }

    if (target > source) {
      return 1;
    }

    return -1;
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
      var flag = true;

      if (viewValue) {
        flag = evaluateRegExp('^.{' + scope.uiMinlength + ',}$', viewValue);
      }

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

        var flag = true;

        if (viewValue) {
          flag = evaluateRegExp('^.{' + scope.uiLength.min + ',' + scope.uiLength.max + '}$', viewValue);
        }

        ngModel.$setValidity('uilength', flag);

        if (flag) {
          return viewValue;
        }

      });
    }
  }

  function uiEqualto(scope, element, attrs, ngModel) {

    ngModel.$setPristine();

    ngModel.$parsers.push(function(viewValue) {

      var flag = true;

      if (viewValue) {
        flag = compare(viewValue, scope.uiEqualto) === 0 ? true : false;
      }

      ngModel.$setValidity('uiequalto', flag);

      if (flag) {
        return viewValue;
      }

    });

  }

  function uiAlphanum(scope, element, attrs, ngModel) {

    ngModel.$setPristine();

    ngModel.$parsers.push(function(viewValue) {

      var flag = true;

      if (viewValue) {
        flag = evaluateRegExp(/^[a-zA-Z0-9]+$/, viewValue);
      }

      ngModel.$setValidity('uilength', flag);

      if (flag) {
        return viewValue;
      }

    });

  }

  function uiMinwords(scope, element, attrs, ngModel) {

    ngModel.$setPristine();

    ngModel.$parsers.push(function(viewValue) {

      var flag = true;

      if (viewValue) {
        flag = compare(countWords(viewValue), (scope.uiMinwords || 0)) > -1 ? true : false;
      }

      ngModel.$setValidity('uiminwords', flag);

      if (flag) {
        return viewValue;
      }

    });

  }

  function uiMaxwords(scope, element, attrs, ngModel) {

    ngModel.$setPristine();

    ngModel.$parsers.push(function(viewValue) {

      var flag = true;

      if (viewValue) {
        flag = compare(countWords(viewValue), scope.uiMaxwords) === 1 ? false : true;
      }

      ngModel.$setValidity('uimaxwords', flag);

      if (flag) {
        return viewValue;
      }

    });

  }

  function uiWords(scope, element, attrs, ngModel) {

    ngModel.$setPristine();

    if (typeof scope.uiWords === 'object') {

      if (Array.isArray(scope.uiWords) && scope.uiWords.length === 2) {
        scope.uiWords.minWords =
          scope.uiWords[0] < scope.uiWords[1] ? scope.uiWords[0] : scope.uiWords[1];
        scope.uiWords.maxWords =
          scope.uiWords[0] > scope.uiWords[1] ? scope.uiWords[0] : scope.uiWords[1];
      }

      ngModel.$parsers.push(function(viewValue) {

        var flag = true,
          totalWords;

        if (viewValue) {
          totalWords = countWords(viewValue);
          flag = compare(totalWords >= scope.uiWords.minWords) &&
            compare(totalWords <= scope.uiWords.minWords);
        }

        ngModel.$setValidity('uiwords', flag);

        if (flag) {
          return viewValue;
        }

      });
    }
  }

  function uiReset(scope, element) {
    if (element[0].form.localName === 'form') {
      element.on('click', function() {
        scope[element[0].form.name].$setPristine();
        scope[element[0].form.name].$setUntouched();
        console.log(scope[element[0].form.name]);
      });
    }
  }


})(window.angular);
