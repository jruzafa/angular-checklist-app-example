var checklistApp = angular.module('checklistApp', []);

function TaskController ($scope, $http){

		$http.get('api.php?action=read').success(function(data, $http) {
		$scope.tasks = data;
  });

  $scope.addTask = function(  ){
  	
  	console.log($scope.newtask);
  		$scope.tasks.push([
			{
				"name": $scope.newtask,
				"status":0
			}
  		]);
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