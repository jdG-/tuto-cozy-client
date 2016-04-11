angular.module('browserapp').factory('CozySdk', CozySdk);

CozySdk.$inject = ['$q'];

function CozySdk($q) {

    var CozySdk =  {
        create: create,
        find: find,
        update: update,
        destroy: destroy,
        defineRequest: defineRequest,
        destroyRequest: destroyRequest,
        runRequest: runRequest
    };

    return CozySdk;

    function makePromise(err, res, deferred) {
        if (err != null) {
            return deferred.reject(err);
        } else {
            return deferred.resolve(res);
        }
    }

    function create(docType, data) {
        var deferred;
        deferred = $q.defer();
        cozysdk.create(docType, data, function(err, res) {
            makePromise(err, res, deferred);
        });
        return deferred.promise;
    }

    function find(docType, id) {
        var deferred;
        deferred = $q.defer();
        cozysdk.find(id, function(err, res) {
            makePromise(err, res, deferred);
        });
        return deferred.promise;
    }

    function update(docType, id, user) {
        var deferred;
        deferred = $q.defer();
        cozysdk.updateAttributes(docType, id, user, function(err, res) {
            makePromise(err, res, deferred);
        });
        return deferred.promise;
    }

    function destroy(docType, id) {
        var deferred;
        deferred = $q.defer();
        cozysdk.destroy(docType, id, function(err, res) {
            makePromise(err, res, deferred);
        });
        return deferred.promise;
    }

    function defineRequest(docType, requestName, defined) {
        var deferred;
        deferred = $q.defer();
        cozysdk.defineRequest(docType, requestName, defined, function(err, res) {
            makePromise(err, res, deferred);
        });
        return deferred.promise;
    }

    function destroyRequest(docType, requestName, options) {
        var deferred;
        deferred = $q.defer();
        cozysdk.requestDestroy(docType, requestName, {}, function(err, res) {
            makePromise(err, res, deferred);
        });
        return deferred.promise;
    }

    function runRequest(docType, requestName) {
        var deferred;
        deferred = $q.defer();
        cozysdk.run(docType, requestName, {}, function(err, res) {
            if (err != null) {
                return deferred.reject(err);
            } else {
                res = JSON.parse("" + res);
                return deferred.resolve(res);
            }
        });
        return deferred.promise;
    }
};
