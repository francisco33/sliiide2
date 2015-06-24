(function ($) {

  $.fn.sliiide = function(options) {

      // This is the easiest way to have default options.
      var settings = $.extend({
          // These are the defaults.
          toggle: "#sliiider-toggle",
          exit_selector: ".slider-exit",
          animation_duration: "0.5s",
          place: "right",
          animation_curve: "cubic-bezier(0.54, 0.01, 0.57, 1.03)",
          body_slide: "true"
        }, options );

      var newSize;
      var clicked = false;
      var $sliiider = $(this);
      var $toggle = $(settings.toggle);
      var $exit = $(settings.exit_selector);
      var bodySlideDistance;

      var prepareProperties = {
        visibility: 'hidden',
        transition: 'transform ' + settings.animation_duration + ' ' + settings.animation_curve,
        position: 'fixed'
      }

      var bodySlidePrepare = {
        transition: 'transform ' + settings.animation_duration + ' ' + settings.animation_curve +
                    ', -webkit-filter ' + settings.animation_duration + ' ' + settings.animation_curve
      }

      var bodySlideProp = {
        setleft: function(distance) {
          console.log(this);
          this.left.activateAnimation.transform = 'translateX('+distance+'px)';
          this.left.deactivateAnimation.transform = 'translateX(0px)';
        },
        setright: function(distance) {
          this.right.activateAnimation.transform = 'translateX(-'+distance+'px)';
          this.right.deactivateAnimation.transform = 'translateX(0px)';
        },
        setbottom: function(distance) {
          this.bottom.activateAnimation.transform = 'translateY(-'+distance+'px)';
          this.bottom.deactivateAnimation.transform = 'translateY(0px)';
        },
        settop: function(distance) {
          this.top.activateAnimation.transform = 'translateY('+distance+'px)';
          this.top.deactivateAnimation.transform = 'translateY(0px)';
        },
        left: {
          activateAnimation: {transform:'', '-webkit-transform': ''},
          deactivateAnimation: {transform: '', '-webkit-transform': ''}
        },
        right: {
          activateAnimation: {transform: '', '-webkit-transform': ''},
          deactivateAnimation: {transform: '', '-webkit-transform': ''}
        },
        top: {
          activateAnimation: {transform: '', '-webkit-transform': ''},
          deactivateAnimation: {transform: '', '-webkit-transform': ''}
        },
        bottom: {
          activateAnimation: {transform: '', '-webkit-transform': ''},
          deactivateAnimation: {transform: '', '-webkit-transform': ''}
        }
      }

      var Prop = {

        left: {
          properties: {top: '0', left: '0', transform: 'translateX(-100%)'},
          activateAnimation: {transform: 'translateX(0)'},
          deactivateAnimation: {transform: 'translateX(-100%)'},
          size: function (wHeight, wWidth) {
            return {height: wHeight}
          }         
        },

        right: {
          properties: {top: '0', right: '0', transform: 'translateX(100%)'},
          activateAnimation: {transform: 'translateX(0)'},
          deactivateAnimation: {transform: 'translateX(100%)'},
          size: function (wHeight, wWidth) {
            return {height: wHeight}
          }  

        },

        top: {
          properties: {top: '0', right: '0', left:'0', transform: 'translateY(-100%)'},
          activateAnimation: {transform: 'translateY(0)'},
          deactivateAnimation: {transform: 'translateY(-100%)'},
          size: function (wHeight, wWidth) {
            return {widthkey: wWidth}
          }  
        },

        bottom: {
          properties: {bottom: '0', right: '0', left:'0', transform: 'translateY(100%)'},
          activateAnimation: {transform: 'translateY(0)'},
          deactivateAnimation: {transform: 'translateY(100%)'},
          size: function (wHeight, wWidth) {
            return {width: wWidth}
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
        if(settings.body_slide)
        {
          if(settings.place === 'right' || settings.place === 'left')
          {
            bodySlideDistance = $sliiider.width();
          }
          else
          {
            bodySlideDistance = $sliiider.height();
          }
          bodySlideProp['set'+settings.place](bodySlideDistance);
          $sliiider.remove();
          $('body').wrapInner('<div class="sliiide-container"></div>');
          $('body').append($sliiider);
          $('.sliiide-container').css(bodySlidePrepare);

        }
      }


      function activate() {

        $sliiider.unbind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
        $sliiider.css('visibility','initial');
        $sliiider.css(Prop[settings.place]["activateAnimation"]);
        $('.sliiide-container').first().css({'-webkit-filter': 'grayscale(100%)'}).css(bodySlideProp[settings.place].activateAnimation);

        disable_scroll();
        clicked = true;
      }

      function deactivate() {
        enable_scroll();
        $sliiider.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {$sliiider.css('visibility','hidden');})
        $sliiider.css(Prop[settings.place]["deactivateAnimation"]);
        $('.sliiide-container').first().css({'-webkit-filter': 'grayscale(0)'}).css(bodySlideProp[settings.place].deactivateAnimation)
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
// ==============================
// Disabling and enabling scroll
// ==============================

  var keys = [37, 38, 39, 40];

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
     e.preventDefault();
    e.returnValue = false;  
  }

  function keydown(e) {
    for (var i = keys.length; i--;) {
     if (e.keyCode === keys[i]) {
        preventDefault(e);
     return;
      }
    }
  }

  function wheel(e) {
    preventDefault(e);
  }

  function disable_scroll() {
    if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
  }

  function enable_scroll() {
    if (window.removeEventListener) {
     window.removeEventListener('DOMMouseScroll', wheel, false);
   }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
  }

}(jQuery));