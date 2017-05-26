(() => {
    const dependencyInject = ['$http', '$q', 'Config'];
    angular.module('vokalApp').service('Auth', Auth);

    Auth.$inject = dependencyInject;

    function Auth($http, $q, Config) {
        this.create = data => {
            return $http.post(`${Config.apiurl}/signup`, data)
                .then(response => {
                    return $q.resolve(response.data);
                }, error => {
                    return $q.reject(error.data);
                });
        };

        this.login = data => {
            return $http.post(`${Config.apiurl}/login`, data)
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
            return $http.post(`${Config.apiurl}/location/results`, data)
                .then(response => {
                    return $q.resolve(response.data);
                }, error => {
                    return $q.reject(error.data);
                });
        };

        this.fetch = data => {
            return $http.get(`${Config.apiurl}/location/results`, data)
                .then(response => {
                    return $q.resolve(response.data);
                }, error => {
                    return $q.reject(error.data);
                });
        };
    }
})();
