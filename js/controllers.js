var checklistApp = angular.module('checklistApp', []);

function TaskController ($scope, $http){

		$http.get('api.php?action=read').success(function(data, $http) {
		$scope.tasks = data;

		console.log(data);
  });


	$scope.searchIndex = function (val){


    for (var i = 0; i < $scope.tasks.length; i++) {

		//	console.log($scope.tasks[i].id);
        if ($scope.tasks[i].id === val) {
            return i;
        }
    }

	}

  $scope.addTask = function(  ){

	  	console.log($scope.newtask);
	  	console.log($scope.tasks);


			item = {
				"name": $scope.newtask,
				"status":0
			};


		$http.post('api.php?action=insert', null,{'params':item}).
			success(function(data, status, headers, config) {
				console.log(data);
				console.log(status);
				console.log(headers);
				console.log(config);

				item = {
					"name": $scope.newtask,
					"status":0,
					"id": data.id
				};
				// guardar id que devuelve la api
				$scope.tasks.push(item);

			});



			console.log($scope.tasks);
	}

	$scope.updateStatus = function(id, status){

			console.log(id);
			console.log(status);



		//
			item = {
				"id": id,
				"status":status
			};

		//	$scope.tasks.push(item);

	//		console.log($scope.tasks);

		$http.post('api.php?action=update', null,{'params':item}).
			success(function(data, status, headers, config) {
				console.log(data);
				console.log(status);
				console.log(headers);
				console.log(config);
			});
	}

	$scope.deleteTask = function(id){

			var index = $scope.searchIndex(id);

			item = {
				"id": id
			};

			console.log($scope.searchIndex(id));

		$http.post('api.php?action=delete', null,{'params':item}).
			success(function(data, status, headers, config) {
				console.log(data);
				console.log(status);
				console.log(headers);
				console.log(config);
			});


			// check si se ha borrado correctamente
			$scope.tasks.splice(index, 1);

	} // end: delete task
}

checklistApp.controller('TaskController', ['$scope', '$http', TaskController]);
