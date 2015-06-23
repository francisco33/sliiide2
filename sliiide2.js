(function ($) {

  $.fn.sliiide = function(options) {

      // This is the easiest way to have default options.
      var settings = $.extend({
          // These are the defaults.
          toggle: "#sliiider-toggle",
          exit_selector: ".slider-exit",
          animation_duration: "0.5s",
          place: "top",
          space: "300px",
          animation_curve: "cubic-bezier(0.54, 0.01, 0.57, 1.03)"
        }, options );

      var newSize;
      var clicked = false;
      var $sliiider = this;
      var $toggle = $(settings.toggle);
      var $exit = $(settings.exit_selector);

      var prepareProperties = {
      visibility: 'hidden',
      transition: 'transform ' + settings.animation_duration + ' ' + settings.animation_curve,
      position: 'fixed'
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
          properties: {bottom: '0', right: '0', left:'0', transform: 'translateY(100%)'},
          activateAnimation: {transform: 'translateY(0)'},
          deactivateAnimation: {transform: 'translateY(100%)'},
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
      $toggle.click(function() {
        if (!clicked)
          {activate();}
        else
          {deactivate();}
      });

      $sliiider.find('a').on('click', function() {deactivate()});
      $exit.on('click', function() {deactivate()});
      
    }  

  }(jQuery));