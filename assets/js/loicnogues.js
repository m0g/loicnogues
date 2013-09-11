(function(){

  App = {
    scrollTimeout: false,
    scrollAnchor: '',
    scrollDirection: '',
    scrollType: 'keyboard',

    scrollCallback: function() {
      App.scrollTimeout = false;
      $(document).on('mousewheel DOMMouseScroll', App.mousewheelListener);

      window.location.replace(
        window.location.href.split('#')[0] 
        + '#' + App.scrollAnchor
      );
    },

    scrollAnimate: function (offset) {
      $('html, body').animate({
        scrollTop: offset
      }, 600, App.scrollCallback);
    },

    whereToScroll: function() {
      var currentOffset = $(document).scrollTop(),
          elementOffset = Math.floor($(this).offset().top);

      if ((App.scrollDirection == 'down' && currentOffset < elementOffset)
          || App.scrollDirection == 'up' && currentOffset > elementOffset){
        offset = $(this).offset().top;

        return { offset: offset, anchor: $(this).attr('id')};
      }
    },

    scrollInit: function(e) {
      e.preventDefault();
      e.stopPropagation();

      App.scrollTimeout = true;
      var toScroll = 0;

      if (App.scrollDirection == 'up')
        toScroll = $($('div.container div.page').get().reverse()).map(App.whereToScroll);
      else
        toScroll = $('div.container div.page').map(App.whereToScroll);

      if (typeof(toScroll[0]) == 'undefined'){
        App.scrollTimeout = false;
        $(document).on('mousewheel', App.mousewheelListener);
        return false;
      }

      App.scrollAnchor = toScroll[0]['anchor'];
      App.scrollAnimate(toScroll[0]['offset']);
    },

    scrollUp: function(e) {
      App.scrollDirection = 'up';
      App.scrollInit(e);
    },

    scrollDown: function(e) {
      App.scrollDirection = 'down';
      App.scrollInit(e);
    },

    keyboardListener: function(e) {
      if (e.keyCode == 38 && !App.scrollTimeout){
        App.scrollType = 'keyboard';
        App.scrollUp(e);
      } else if (e.keyCode == 40 && !App.scrollTimeout){
        App.scrollType = 'keyboard';
        App.scrollDown(e);
      }
    },

    mousewheelListener: function(e) {
      e.preventDefault();
      e.stopPropagation();

      $(document).off('mousewheel DOMMouseScroll');

      if (typeof(e.originalEvent.wheelDelta) != 'undefined')
        var delta = e.originalEvent.wheelDelta / 120;
      else
        var delta = e.originalEvent.detail / -3;

      if (delta > 0 && !App.scrollTimeout){
        App.scrollType = 'mousewheel';
        App.scrollUp(e);
      } else if (delta < 0 && !App.scrollTimeout){
        App.scrollType = 'mousewheel';
        App.scrollDown(e);
      }
    },

    swipeListener: function(event, direction, distance, duration, fingerCount) {
      if (direction == 'up')
        App.scrollDown(event);
      else if (direction == 'down')
        App.scrollUp(event);
    },

    hideUrlBar: function() {
      setTimeout(function(){
        window.scrollTo(0, 0);
      }, 0);
    },

    scrollToAnchor: function() {
      var offset = $(window.location.hash).offset().top;

      setTimeout(function(){
        $('html, body').animate({
          scrollTop: offset
        }, 600, App.events);
      }, 1000);
    },

    generateEmail: function() {
      var coded = "1eTWlf.9e2O@TaP29.Oea",
      key = "6uUqVjRl8K52vsxacEngJ0WdSXZo9YFh4LfNPO71TMQCyA3zeHBwibtDmrIGkp",
      shift=coded.length,
      link="";

      for (i=0; i<coded.length; i++) {
        if (key.indexOf(coded.charAt(i))==-1) {
          ltr = coded.charAt(i);
          link += (ltr);
        }
        else {
          ltr = (key.indexOf(coded.charAt(i))-shift+key.length) % key.length;
          link += (key.charAt(ltr));
        }
      }

      $('a.mail-link').text(link);
      $('a.mail-link').attr('href', 'mailto:'+link);
    },

    events: function() {
      window.addEventListener("load", App.hideUrlBar);

      $(document).keydown(App.keyboardListener);
      $(document).on('mousewheel DOMMouseScroll', App.mousewheelListener);
      $(document).swipe({ swipe: App.swipeListener });
    },

    init: function() {
      if (window.location.hash.length > 0)
        window.onload = App.scrollToAnchor();
      else
        this.events();

      this.generateEmail();
    }
  }

  App.init();
})();
