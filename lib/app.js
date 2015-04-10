'use strict';
(function(angular) {
  angular
    .module('angular-ui-validator', [])
    .directive('uiRequired', function() {
      return {
        link: uiRequired,
        // scope: true,
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
    .directive('uiDigits', function() {
      return {
        link: uiDigits,
        restrict: 'A',
        scope: true,
        require: 'ngModel'
      };
    })
    .directive('uiMin', function() {
      return {
        link: uiMin,
        restrict: 'A',
        scope: true,
        require: 'ngModel'
      };
    }).directive('uiMax', function() {
      return {
        link: uiMax,
        restrict: 'A',
        scope: true,
        require: 'ngModel'
      };
    }).directive('uiRange', function() {
      return {
        link: uiRange,
        restrict: 'A',
        scope: true,
        require: 'ngModel'
      };
    })
    .directive('uiMinDate', function() {
      return {
        link: uiMinDate,
        restrict: 'A',
        scope: {
          uiMinDate: '='
        },
        require: 'ngModel'
      };
    }).directive('uiMaxDate', function() {
      return {
        link: uiMaxDate,
        restrict: 'A',
        scope: {
          uiMaxDate: '='
        },
        require: 'ngModel'
      };
    }).directive('uiBetween', function() {
      return {
        link: uiBetween,
        restrict: 'A',
        scope: {
          uiBetween: '='
        },
        require: 'ngModel'
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

  function initAfter(ngModel) {
    return function() {
      ngModel.$setUntouched();
      ngModel.$setPristine();
    };
  }

  function init(element, ngModel) {
    element.on('reset', initAfter(ngModel));
    element.on('submit', initAfter(ngModel));
  }

  function uiRequired(scope, element, attrs, ngModel) { //here is the model

    init(element, ngModel);

    ngModel.$validators.uirequired = function(modelValue, viewValue) {
      var value = modelValue || viewValue;
      return value ? value.length : false;
    };
  }

  function uiPattern(scope, element, attrs, ngModel) {

    init(element, ngModel);

    ngModel.$parsers.push(function(viewValue) {
      var flag = evaluateRegExp(scope.uiPattern, viewValue);

      ngModel.$setValidity('uipattern', flag);

      if (flag) {
        return viewValue;
      }

    });
  }

  function uiEmail(scope, element, attrs, ngModel) {

    init(element, ngModel);

    ngModel.$parsers.push(function(viewValue) {
      var flag = evaluateRegExp(/^[a-zA-Z0-9\-\_\.\+]+@[a-zA-Z0-9\-\_\.]+\.[a-zA-Z0-9\-\_]+$/, viewValue);

      ngModel.$setValidity('uiemail', flag);

      if (flag) {
        return viewValue;
      }

    });
  }

  function uiUrl(scope, element, attrs, ngModel) {
    init(element, ngModel);

    ngModel.$parsers.push(function(viewValue) {
      var flag = evaluateRegExp(/(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/, viewValue);

      ngModel.$setValidity('uiurl', flag);

      if (flag) {
        return viewValue;
      }

    });
  }

  function uiMinlength(scope, element, attrs, ngModel) {
    init(element, ngModel);

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
    init(element, ngModel);

    ngModel.$parsers.push(function(viewValue) {

      var flag = evaluateRegExp('^.{0,' + scope.uiMaxlength + '}$', viewValue);

      ngModel.$setValidity('uimaxlength', flag);

      if (flag) {
        return viewValue;
      }

    });
  }

  function uiLength(scope, element, attrs, ngModel) {

    init(element, ngModel);

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

    init(element, ngModel);

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

    init(element, ngModel);

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

    init(element, ngModel);

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

    init(element, ngModel);

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

    init(element, ngModel);

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

  function uiDigits(scope, element, attrs, ngModel) {
    init(element, ngModel);

    ngModel.$parsers.push(function(viewValue) {
      var flag = evaluateRegExp(/^\d{1}$/, viewValue);
      ngModel.$setValidity('uidigits', flag);

      if (flag) {
        return viewValue;
      }
    });
  }

  function uiInteger(scope, element, attrs, ngModel) {
    init(element, ngModel);

    ngModel.$parsers.push(function(viewValue) {
      var flag = evaluateRegExp(/^\d+$/, viewValue);
      ngModel.$setValidity('uiinteger', flag);

      if (flag) {
        return viewValue;
      }
    });
  }

  function uiFloat(scope, element, attrs, ngModel) {
    init(element, ngModel);

    ngModel.$parsers.push(function(viewValue) {
      var flag = evaluateRegExp(/^\d+.\d+$/, viewValue);
      ngModel.$setValidity('uifloat', flag);

      if (flag) {
        return viewValue;
      }
    });
  }

  function uiMin(scope, element, attrs, ngModel) {
    init(element, ngModel);

    ngModel.$parsers.push(function(viewValue) {

      var flag = evaluateRegExp('^[0-9]{' + scope.uiMin + ',}$', viewValue);


      ngModel.$setValidity('uimin', flag);

      if (flag) {
        return viewValue;
      }

    });
  }

  function uiMax(scope, element, attrs, ngModel) {
    init(element, ngModel);

    ngModel.$parsers.push(function(viewValue) {

      var flag = evaluateRegExp('^[0-9]{0,' + scope.uiMax + '}$', viewValue);


      ngModel.$setValidity('uimin', flag);

      if (flag) {
        return viewValue;
      }

    });
  }

  function uiRange(scope, element, attrs, ngModel) {
    init(element, ngModel);

    if (typeof scope.uiLength === 'object') {

      if (Array.isArray(scope.uiLength) && scope.uiLength.length === 2) {
        scope.uiLength.min = scope.uiLength[0] < scope.uiLength[1] ? scope.uiLength[0] : scope.uiLength[1];
        scope.uiLength.max = scope.uiLength[0] > scope.uiLength[1] ? scope.uiLength[0] : scope.uiLength[1];
      }
      ngModel.$parsers.push(function(viewValue) {

        var flag = evaluateRegExp('^[0-9]{' + scope.uiRange.min + ',' + scope.uiRange.Max + '}$', viewValue);


        ngModel.$setValidity('uiRange', flag);

        if (flag) {
          return viewValue;
        }

      });
    }
  }

  function uiMinDate(scope, element, attrs, ngModel) {

    init(element, ngModel);

    ngModel.$parsers.push(function(viewValue) {
      var flag = compare(new Date(viewValue), new Date(scope.uiMinDate)) > -1 ? true : false;

      ngModel.$setValidity('uimindate', flag);

      if (flag) {
        return viewValue;
      }

    });

  }

  function uiMaxDate(scope, element, attrs, ngModel) {
    init(element, ngModel);

    ngModel.$parsers.push(function(viewValue) {
      var flag = compare(new Date(viewValue), new Date(scope.uiMaxDate)) != 1 ? true : false;

      ngModel.$setValidity('uimaxdate', flag);

      if (flag) {
        return viewValue;
      }

    });
  }

  function uiBetween(scope, element, attrs, ngModel) {
    init(element, ngModel);

    if (typeof scope.uiBetween === 'object') {

      if (Array.isArray(scope.uiBetween) && scope.uiBetween.length === 2) {
        scope.uiBetween.minBetween =
          scope.uiBetween[0] < scope.uiBetween[1] ? scope.uiBetween[0] : scope.uiBetween[1];
        scope.uiBetween.maxBetween =
          scope.uiBetween[0] > scope.uiBetween[1] ? scope.uiBetween[0] : scope.uiBetween[1];
      }

      ngModel.$parsers.push(function(viewValue) {

        var flag = true;
        console.log(compare(new Date(viewValue), new Date(scope.uiBetween.minBetween)) > 1, compare(new Date(viewValue), new Date(scope.uiBetween.maxBetween)) < 1);
        if (viewValue) {
          flag = compare(new Date(viewValue), new Date(scope.uiBetween.minBetween)) > -1 &&
            compare(new Date(viewValue), new Date(scope.uiBetween.maxBetween)) < 1;
        }

        ngModel.$setValidity('uibetween', flag);

        if (flag) {
          return viewValue;
        }

      });
    }
  }

  function uiMinCheck(scope, element, attrs, ngModel) {

  }

  function uiMaxCheck(scope, element, attrs, ngModel) {

  }

  function uiMinSelect(scope, element, attrs, ngModel) {

  }

  function uiMaxSelect(scope, element, attrs, ngModel) {

  }




})(window.angular);
