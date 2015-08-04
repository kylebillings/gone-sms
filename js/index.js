//Register module
angular.module('chat', [])
    //Add controller
    .controller('chatController', ['$scope', function($scope) {
        //Add default messages to object
        $scope.messages = [{
            text: "Hey! My name is Kyle. I'll answer any questions you have about selling your things.",
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

            //window.scrollTo(0,document.body.scrollHeight);
            setTimeout(function(){
                $("html, body").stop().animate({ scrollTop: $(document).height()-$(window).height()}, {
                    duration: 900, 
                    easing: "easeOutQuint"
                });
            }, 1);
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
$(function() {  

// Huge thanks to IceMaD and Anders Grimsrud for their trailblazing work

        qtpie = {

        init : function(options) {

            var defaultOptions = {
                id         : '#qtpie',
                defaultMsg : 'Breakdown',
                radius     : 80,
                list       : false,
                hover      : true
            }
            options = $.extend({}, defaultOptions, options);

// Draw paths
            base = 0;
            $paths = $(options.id).find('path');
            $paths.each(function(index, el) {
                deg = 3.61*$(this).attr('data-pie');
                // 3.61 instead of 3.6 to fix little svg render bug
                qtpie.draw({
                    slice  : $(this),
                    degree : deg,
                    base   : base
                });
                base += parseInt(deg);
            });

// Inside
            $(options.id).find('circle').attr('r',options.radius);
            $(options.id).find('div').append('<div class="qtpieInside">'+options.defaultMsg+'</div>').find('circle').css('fill',$('body').css('background-color'));

// Hover events
            if (options.hover) {
                $paths.hover(function(event) {
                    $current = $(this);
                    $inside  = $current.parent().parent().find('.qtpieInside')

                    $inside.stop().fadeOut(200, function() {
                        $inside
                            .css('color',$current.css('fill'))
                            .html($current.attr('data-desc'))
                            .fadeIn(200);
                    });
                },function(){
                    $current = $(this);
                    $inside  = $current.parent().parent().find('.qtpieInside')

                    $inside.stop().fadeOut(200, function() {
                        $inside
                            .removeAttr('style')
                            .html(options.defaultMsg)
                            .fadeIn(200);
                    });
                    $(this)
                });
            };

// Display at the dn
            $(options.id).show();
        },

        draw : function(options) {

            var defaultOptions = {
                    slice  : null,
                    degree : 0,
                    base   : 0
                };
            options = $.extend({}, defaultOptions, options);

            var rayon = ( options.degree * Math.PI / 180),
                x     = Math.sin( rayon ) * 100,
                y     = Math.cos( rayon ) * - 100,
                mid   = ( options.degree > 180 ) ? 1 : 0,
                anim  = 'M 0 0 v -100 A 100 100 1 ' + mid + ' 1 ' + x + ' ' + y + ' z';
            options.slice.attr( 'd', anim ).attr('transform', 'translate(100, 100) rotate('+base+')');
        }
    }
    qtpie.init({
    defaultMsg : 'Breakdown'
  });
});