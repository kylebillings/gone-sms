//Register module
angular.module('chat', [])
    //Add controller
    .controller('chatController', ['$scope', function($scope) {
        //Add default messages to object
        $scope.messages = [{
            text: "Hey! My name is Kyle. I'll answer any questions you have about selling your things.",
            from: 'message-remote'
        }, {
            text: "Do you have anything in particular you'd like to sell?",
            from: 'message-remote'
        }];
        //Function to add message
        var $messagesContainer=$(".messages")
        $scope.addMessage = function() {

                //Check if message is empty and stop function
                if ($scope.chatText === '' || $scope.chatText === undefined) {
                    //message empty focus input to write message
                    angular.forEach(document.querySelectorAll('#message-input'), function(elem) {
                        elem.focus();
                    });
                    return false;
                }

                //message ok push message to $scope.messages
                $scope.messages.push({
                    text: $scope.chatText,
                    from: 'message-local'
                });
                //reset input
                $scope.chatText = '';
                        }
            //run addMessage on pressing enter.
        $scope.triggerSubmit = function() {
            $scope.addMessage();

            window.scrollTo(0,document.body.scrollHeight);
        }

    }])
    //Add directive to handle enter key
    .directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if (event.which === 13) {
                    scope.$apply(function() {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });
var chatWindowMessage = document.querySelector('.message-input')

function handleSendChannelStateChange() {
    var readyState = sendChannel.readyState;

    if (readyState == 'open') {
        chatWindowMessage.disabled = false;
        chatWindowMessage.focus();
        chatWindowMessage.placeholder = "";
    } else {
        chatWindowMessage.disabled = true;
    }
}