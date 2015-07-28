var checklistApp = angular.module('checklistApp', []);

function TaskController ($scope, $http){

		$http.get('api.php?action=read').success(function(data, $http) {
			$scope.tasks = data;
  	});

	$scope.searchIndex = function (val){

    for (var i = 0; i < $scope.tasks.length; i++) {
        if ($scope.tasks[i].id === val) {
            return i;
        }
    }

	}

  $scope.addTask = function(  ){

			item = {
				"name": $scope.newtask,
				"status":0
			};

		$http.post('api.php?action=insert', null,{'params':item}).
			success(function(data, status, headers, config) {

				item = {
					"name": $scope.newtask,
					"status":0,
					"id": data.id
				};

				// guardar id que devuelve la api
				$scope.tasks.push(item);

			});

	}

	$scope.updateStatus = function(id, status){
			item = {
				"id": id,
				"status":status
			};

		$http.post('api.php?action=update', null,{'params':item}).
			success(function(data, status, headers, config) {
			});
	}

	$scope.deleteTask = function(id){

			var index = $scope.searchIndex(id);

			item = {
				"id": id
			};

		$http.post('api.php?action=delete', null,{'params':item}).
			success(function(data, status, headers, config) {

			});

			// check si se ha borrado correctamente
			$scope.tasks.splice(index, 1);

	} // end: delete task
}

checklistApp.controller('TaskController', ['$scope', '$http', TaskController]);
