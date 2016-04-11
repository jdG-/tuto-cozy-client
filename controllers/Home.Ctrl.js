angular.module('browserapp').controller('HomeAngCtrl', HomeAngCtrl);

HomeAngCtrl.$inject = ['CozySdk'];

function HomeAngCtrl(CozySdk) {
    var vm = this;

    vm.send = send;
    vm.update = update;
    vm.destroy = destroy;

    updateContactList();

    function updateContactList() {
        CozySdk.defineRequest('Contact', 'all', 'function(doc) { emit(doc.n); }')
        .then(function () {
          return CozySdk.runRequest('Contact', 'all')
        })
        .then(function(res) {
          vm.contacts = res;
        })
        .catch(function(error) {
            vm.error = error;
        });
      }

    function resetForm() {
        var defaultForm = {};
        vm.contact = angular.copy(defaultForm);
    }

    function send(user) {
        CozySdk.create('Contact', user)
        .then(resetForm)
        .then(updateContactList)
        .catch(function(error) {
          vm.error = error;
        });
    }

    function update(id, user) {
        var contactName = {
          n: user.key
        };

        CozySdk.update('Contact', id, contactName)
        .then(updateContactList)
        .catch(function(error) {
            vm.error = error;
        });
      }

    function destroy(id) {
        CozySdk.destroy('Contact', id)
        .then(updateContactList)
        .catch(function(error) {
          vm.error = error;
        });
    }
};
