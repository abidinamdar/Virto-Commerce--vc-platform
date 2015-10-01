﻿angular.module('virtoCommerce.storeModule')
.controller('virtoCommerce.storeModule.taxProviderListController', ['$scope', 'platformWebApp.bladeNavigationService', function ($scope, bladeNavigationService) {
    var blade = $scope.blade;

    function initializeBlade(data) {
        blade.currentEntities = data;
        blade.isLoading = false;

        blade.selectedTaxProvider = _.findWhere(data, { isActive: true });

        //blade.currentEntities.sort(function (a, b) {
        //    return a.priority > b.priority;
        //});
    };

    $scope.selectNode = function (node) {
        $scope.selectedNodeId = node.code;

        var newBlade = {
            id: 'taxProviderList',
            origEntity: node,
            title: blade.title,
            subtitle: 'Edit tax provider',
            controller: 'virtoCommerce.storeModule.taxProviderDetailController',
            template: 'Modules/$(VirtoCommerce.Store)/Scripts/blades/taxProvider-detail.tpl.html'
        };
        bladeNavigationService.showBlade(newBlade, $scope.blade);
    };

    $scope.radioChanged = function () {
        _.each(blade.currentEntities, function (x) {
            x.isActive = x == blade.selectedTaxProvider;
        });
    };

    blade.headIcon = 'fa-archive';

    $scope.$watch('blade.parentBlade.currentEntity.taxProviders', function (currentEntities) {
        initializeBlade(currentEntities);
    });

    // actions on load
    // $scope.$watch('blade.parentBlade.currentEntity.taxProviders' gets fired
}]);