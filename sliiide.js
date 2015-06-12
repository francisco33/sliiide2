(function ($) {
 
  $.fn.sliiide = function(options) {

      // This is the easiest way to have default options.
    var settings = $.extend({
          // These are the defaults.
      sliiider_id: "#sliiider",
      control_id: "#sliiiderControl",
      animation_duration: "0.7s",
      direction: "left-to-right",
      width: 0.25
    }, options );

    var clicked = false;
    var $sliiider = $(settings.sliiider_id);
    var $control = $(settings.control_id);
    
    function siiize() {
      var windowSize = {};
      windowSize.height = $(window).height();
      windowSize.width = $(window).width();
      $sliiider.css('height', windowSize.height);
      $sliiider.css('width', windowSize.width * settings.width)
    }

    function prepare() {
      $sliiider.css('transition', 'transform ' + settings.animation_duration + ' cubic-bezier(0.54, 0.01, 0.57, 1.03)');
      $sliiider.css('position','fixed');
      //$sliiider.css('visibility','hidden');
      $sliiider.remove();
    }


    function prepareLeftToRight() {
      $sliiider.css('top','0');
      $sliiider.css('left','0'); 
      $sliiider.css('transform','translateX(-100%)')
      }

    function activate() {
      //$sliiider.css('visibility','initial');
      $sliiider.appendTo('body');
      $sliiider.load(function(){$sliiider.css('transform','translateX(0)')});
      clicked = true;
    }

    function deactivate() {
      $sliiider.css('transform','translateX(-100%)');
      //$sliiider.css('visibility','hidden');
      clicked = false;
    }

    siiize();
    prepare();
    prepareLeftToRight();

    $(window).resize(function() {siiize()});
    $control.click(function() {
      if (!clicked)
      {activate();}
      else
        {deactivate();}
    });
      
    }  
 
}(jQuery));