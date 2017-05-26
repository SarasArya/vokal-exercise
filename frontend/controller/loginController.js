(() => {
    angular.module('vokalApp').controller('LoginCntrl', LoginCntrl);

    LoginCntrl.$inject = ['$scope', '$state', 'Auth', 'toaster'];

    function LoginCntrl($scope, $state, Auth, toaster) {
        $scope.user = {
            username: "saras.arya@gmail.com",
            password: "saras",
            name: "Saras"
        };
        $scope.create = () => {
            console.log($scope.user);
            Auth.create($scope.user)
                .then(response => {
                    toaster.pop("succcess", "Account succesfully created");
                }, error => {
                    console.log(error);
                    toaster.pop("error", `Error is ${error}`);
                });
        };
        $scope.login = () => {
            Auth.login($scope.user)
                .then(response => {
                    toaster.pop("succcess", "Logged In");
                    $state.go("location");
                }, error => {
                    toaster.pop("error", `Error ${error}`);
                });
        };
    }
})();
