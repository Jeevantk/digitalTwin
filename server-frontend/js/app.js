'use strict';

angular.module('confusionApp',[])

    .controller('MenuController', ['$scope', function($scope){
            $scope.tab = 1;
            $scope.filtText = '';

            $scope.showDetails = false;

            $scope.dishes=[{
                    name: 'Uthapizza',
                    image: 'img/uthapizza.png',
                    category: 'mains' ,
                    label: 'hot',
                    price: '4.99',
                    description: 'A unique combinantion of indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur Chillies and Buffalo paneer.',
                    comments: ''
                },
                {
                    name: 'Zucchipakoda',
                    image: 'img/zucchipakoda.png',
                    category: 'appetizer',
                    label: '',
                    price: '1.99',
                    description: 'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
                    comment: ''  
                },
                {
                    name: 'Vadonut',
                    image: 'img/vadonut.png',
                    category: 'appetizer',
                    label: ' New',
                    price: '1.99',
                    description: 'A quintessential ConFusion experience, is it a vada or is it a donut?',
                    comment: ''
                },
                {
                    name: 'ElaiCheese Cake',
                    image: 'img/elaicheesecake.png',
                    category: 'dessert',
                    label: '',
                    price: '2.99',
                    description: 'A delectable, semi-sweet New York style Cheese cake , with  Graham cracker crust and spiced with  Indian Cardamoms',
                    comment:''
                }];

            

            $scope.select = function(setTab){
                $scope.tab = setTab;

                if(setTab===2){
                    $scope.filtText = "appetizer";
                }
                else if(setTab===3){
                    $scope.filtText = "mains";
                }
                else if(setTab === 4){
                    $scope.filtText = "dessert";
                }
                else{
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function(checkTab){
                return($scope.tab === checkTab);
            };

            $scope.toggleDetails = function(){
                $scope.showDetails = !$scope.showDetails;
            }
    }])


    .controller('ContactController',['$scope', function($scope){

        $scope.feedback = {mychannel: "", firstname: "", lastname: "", agree: false, email: ""};

        var channels = [{value:"tel", label:"Tel."},{value:"Email", label:"Email"}];

        $scope.channels = channels;
        $scope.invalidChannelSelection = false;

    }])

    .controller('FeedbackController',['$scope', function($scope){

        $scope.sendFeedback = function(){
            console.log($scope.feedback);

            if($scope.feedback.agree && 
                ($scope.feedback.mychannel == "")){
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else{
                $scope.invalidChannelSelection = false;
                $scope.feedback = {
                    mychannel:"", firstname:"",
                    lastname:"", agree:false, email:""};
                $scope.feedback.mychannel="";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };

    }])
;