(function ($) {
 
  $.fn.sliiide = function(options) {

      // This is the easiest way to have default options.
    var settings = $.extend({
          // These are the defaults.
      sliiider_id: "#sliiider",
      open_id: "#sliiiderOpen",
      exit_id: "#sliiiderClose",
      animation_duration: "0.7s",
      place: "right",
      width: 0.25
    }, options );

    var clicked = false;
    var $sliiider = $(settings.sliiider_id);
    var $openControl = $(settings.open_id);
    var $closeControl = $(settings.exit_id);

    var Prop = {

      left: {properties: {top: '0', left: '0', transform: 'translateX(-100%)'},
             activateAnimation: {transform: 'translateX(0)'},
             deactivateAnimation: {transform: 'translateX(-100%)'}             

      },

      right: {

      },

      top: {

      },

      bottom: {

      }
    }

    var prepareProperties = {
      transition: 'transform ' + settings.animation_duration + ' cubic-bezier(0.54, 0.01, 0.57, 1.03)',
      position: 'fixed',
      visibility: 'hidden'
    }

    var leftProperties = {
      top: '0',
      left: '0',
      transform: 'translateX(-100%)'
    }

    var rightProperties = {
      top: '0',
      right: '0',
      transform: 'translateX(100%)'
    }

    var topProperties = {
      top: '0',
      right: '0',
      left: '0',
      transform: 'translateY(-100%)'
    }

    var bottomProperties = {
      bottom: '0',
      right: '0',
      left: '0',
      transform: 'translateY(100%)'
    }
    
    function siiize() {
      var windowSize = {};
      windowSize.height = $(window).height();
      windowSize.width = $(window).width();
      $sliiider.css('height', windowSize.height);
      $sliiider.css('width', windowSize.width * settings.width)
    }

    function prepare() {
      $sliiider.css(prepareProperties);

      switch(settings.place) {
        case 'left':
          $sliiider.css(leftProperties);
          break;
        case 'top':
          $sliiider.css(topProperties);
          break;
        case 'right':
          $sliiider.css(rightProperties);
          break;
        case 'bottom':
          $sliiider.css(bottomProperties);
          break;
        default:
          $sliiider.css(leftProperties);
      }

    }


    function activate() {
      $sliiider.unbind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      $sliiider.css('visibility','initial');
      $sliiider.css('transform','translateX(0)');
      clicked = true;
    }

    function deactivate() {
      $sliiider.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {$sliiider.css('visibility','hidden');})
      $sliiider.css({transform:'translateX(-100%)'});
      clicked = false;
    }

    siiize();
    prepare();

    $(window).resize(function() {siiize()});
    $openControl.click(function() {
      if (!clicked)
      {activate();}
      else
        {deactivate();}
    });
      
    }  
 
}(jQuery));