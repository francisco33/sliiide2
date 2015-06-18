var newSize;

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
          space: "300px"
        }, options );

      var clicked = false;
      var $sliiider = $(settings.sliiider_id);
      var $openControl = $(settings.open_id);
      var $closeControl = $(settings.exit_id);

      var prepareProperties = {
      transition: 'transform ' + settings.animation_duration + ' cubic-bezier(0.54, 0.01, 0.57, 1.03)',
      position: 'fixed',
      visibility: 'hidden'
      }

      var Prop = {

        left: {
          properties: {top: '0', left: '0', transform: 'translateX(-100%)'},
          activateAnimation: {transform: 'translateX(0)'},
          deactivateAnimation: {transform: 'translateX(-100%)'},
          size: function (wHeight, wWidth) {
            return {height: wHeight, width: settings.space}
          }         
        },

        right: {
          properties: {top: '0', right: '0', transform: 'translateX(100%)'},
          activateAnimation: {transform: 'translateX(0)'},
          deactivateAnimation: {transform: 'translateX(100%)'},
          size: function (wHeight, wWidth) {
            return {height: wHeight, width: settings.space}
          }  

        },

        top: {
          properties: {top: '0', right: '0', left:'0', transform: 'translateY(-100%)'},
          activateAnimation: {transform: 'translateY(0)'},
          deactivateAnimation: {transform: 'translateY(-100%)'},
          size: function (wHeight, wWidth) {
            return {height: settings.space, width: ""+wWidth+"px"}
          }  
        },

        bottom: {
          roperties: {top: '0', right: '0', left:'0', transform: 'translateY(-100%)'},
          activateAnimation: {transform: 'translateY(0)'},
          deactivateAnimation: {transform: 'translateY(-100%)'},
          size: function (wHeight, wWidth) {
            return {height: settings.space, width: ""+wWidth+"px"}
          }
        }
      }

      function siiize() {
        var windowSize = {};
        windowSize.height = $(window).height();
        windowSize.width = $(window).width();
        newSize = Prop[settings.place]["size"].call(this, windowSize.height, windowSize.width);
        console.log(newSize);
        $sliiider.css(newSize);
      }

      function prepare() {
        $sliiider.css(prepareProperties);
        $sliiider.css(Prop[settings.place]["properties"]);
      }


      function activate() {
        $sliiider.unbind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
        $sliiider.css('visibility','initial');
        $sliiider.css(Prop[settings.place]["activateAnimation"]);
        clicked = true;
      }

      function deactivate() {
        $sliiider.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {$sliiider.css('visibility','hidden');})
        $sliiider.css(Prop[settings.place]["deactivateAnimation"]);
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