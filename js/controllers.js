var checklistApp = angular.module('checklistApp', []);

function TaskController ($scope, $http){

		$http.get('api.php?action=read').success(function(data, $http) {
		$scope.tasks = data;

		console.log(data);
  });

  $scope.addTask = function(  ){

	  	console.log($scope.newtask);
	  	console.log($scope.tasks);
	  	item = {
	  		"name": $scope.newtask,
	  		"status":0
	  	};

	  	$scope.tasks.push(item);

	  	console.log($scope.tasks);

		$http.post('api.php?action=insert', null,{'params':item}).
			success(function(data, status, headers, config) {
				console.log(data);
				console.log(status);
				console.log(headers);
				console.log(config);
			});
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

}


checklistApp.controller('TaskController', ['$scope', '$http', TaskController]);

// checklistApp.controller('TaskController', function ($scope) {

//   // $http.get('tasks.json').success(function(data, $http) {
//   //   $scope.tasks = data;
//   // });

//   // // $scope.tasks = [
//   // //   {'name': 'Clean code',
//   // //    'status': 0},
//   // //   {'name': 'Deploy in dev',
//   // //    'status': 1}
//   // // ];


//   // function addTask(){

//   // 	console.log('añadir task');
//   // }


// });
