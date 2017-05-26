(() => {
    angular.module('vokalApp').service('Auth', Auth);

    const dependencyInject = ['$http', '$q', 'Config'];
    Auth.$inject = dependencyInject;

    function Auth($http, $q, Config) {
        this.create = data => {
            return $http.post(`${Config.apiurl}/create`, data)
                .then(response => {
                    return $q.resolve(response.data);
                }, error => {
                    return $q.reject(error.data);
                });
        };

        this.login = data => {
            return $http.post(`${Config.apiurl}/create`, data)
                .then(response => {
                    return $q.resolve(response.data);
                }, error => {
                    return $q.reject(error.data);
                });
        };
    }

    angular.module('vokalApp').service('Location', Location);

    Location.$inject = dependencyInject;

    function Location($http, $q, Config) {
        this.save = data => {
            return $http.post(`${Config.apiurl}/location/save`, data)
                .then(response => {
                    return $q.resolve(response.data);
                }, error => {
                    return $q.reject(error.data);
                });
        };

        this.fetch = data => {
            return $http.post(`${Config.apiurl}/location/fetch`, data)
                .then(response => {
                    return $q.resolve(response.data);
                }, error => {
                    return $q.reject(error.data);
                });
        };
    }
})();
