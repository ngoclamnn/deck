'use strict';


var angular = require('angular');

angular.module('deckApp')
  .controller('InfrastructureCtrl', function($scope, infrastructureSearch) {
    $scope.$watch('query', function(query) {
      infrastructureSearch.query(query).subscribe(function(result) {
        var tmp = result.data.reduce(function(categories, entry) {
          var cat = entry.key.split(':')[0];
          if (angular.isDefined(categories[cat])) {
            categories[cat].push(entry);
          } else {
            categories[cat] = [entry];
          }
          return categories;
        }, {});
        $scope.categories = Object.keys(tmp).map(function(cat) {
          return {
            category: cat,
            results: tmp[cat],
          };
        });
        this.dispose();
      });
    });
  });
