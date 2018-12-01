
/*var app = angular.module( 'myApp', [] )
     .config( ['$compileProvider',function( $compileProvider ){ 
         $compileProvider.imgSrcSanitizationWhitelist(/^\s(https|file|blob|cdvfile):|data:image\//);
       }
     ]);*/




window.angular.module('amazonApp', [])
    .controller('mainCtrl', [
        '$scope', '$http',
        function($scope, $http) {
            $scope.products = [];
            $scope.shoppingCart = [];

            $scope.getAll = function() {
                return $http.get('/amazon').success(function(data) {
                    angular.copy(data, $scope.products);
                    console.log("Finished getAll. Copied " + data);
                });
            };
            $scope.getAll();
            $scope.create = function(object) {
                /*$http.post('/amazon').success(function(data, status, headers, config) {
                   $scope.products.push(data);
                   console.log("Creation of " + data + " complete");
                });*/
                console.log("In the create function");
                console.log("Creating " + object);
                var url = '/amazon';

                $http({
                    url: url,
                    method: "POST",
                    data: object
                }).success(function(data, status, headers, config) {
                    $scope.products.push(object);
                    console.log("Creation of " + object + " complete");
                });

            };
            $scope.doPurchase = function() {
                angular.forEach($scope.products, function(value, key) {
                    if (value.selected) {
                        console.log("In doPurchase");
                        $scope.upPurchase(value);
                        $scope.shoppingCart.push(value);
                        console.log("DoPurchase of " + $scope.products + " complete");
                    }
                })
                $scope.products = [];
            };
            $scope.upPurchase = function(product) {
                return $http.put('/amazon/' + product._id + '/upPurchase/').success(function(data) {
                    product.uppurchases += 1;
                    console.log("UpPurchase of " + product.ProductName + " complete");
                });
            };
            $scope.addProduct = function() {
                console.log("Adding " + $scope.formContentProductName);
                var newObj = {
                    ProductName: $scope.formContentProductName,
                    ProductPrice: $scope.formContentProductPrice,
                    ProductPictureUrl: $scope.formContentProductPictureUrl,
                    ProducePurchaseCount: 0
                }
                $scope.create(newObj);

                $scope.formContentProductName = '';
                $scope.formContentProductPrice = '';
                $scope.formContentProductPictureUrl = '';
            };
            $scope.incrementUpPurchaseCount = function(product) {
                $scope.upPurchase(product);
            };
            $scope.deleteProduct = function(product) {
                console.log("Deleting " + product.ProductName);
                $http.delete('/amazon/' + product._id).success(function(data) {
                    console.log("Delete of product: " + product.ProductName + " complete");
                });
                $scope.getAll();
            };
        }
    ]);
