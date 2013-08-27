(function(){

  App = {
    scrollTimeout: false,
    scrollAnchor: '',
    scrollDirection: '',
    scrollType: 'keyboard',

    scrollCallback: function() {
      App.scrollTimeout = false;
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

        App.scrollAnchor = $(this).attr('id');
        App.scrollAnimate(offset);
        return false;
      }

      else if (App.scrollType != 'mousewheel')
        App.scrollTimeout = false;

      //else if (currentOffset == 0 || currentOffset == $(document).height() - $(window).height())
      //  App.scrollTimeout = false;
    },

    scrollInit: function(e) {
      e.preventDefault();
      e.stopPropagation();

      App.scrollTimeout = true;

      if (App.scrollDirection == 'up')
        $($('div.container div.page').get().reverse()).each(App.whereToScroll);
      else
        $('div.container div.page').each(App.whereToScroll);
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

      if(e.originalEvent.wheelDelta/120 > 0 && !App.scrollTimeout){
        App.scrollType = 'mousewheel';
        App.scrollUp(e);
      } else if(e.originalEvent.wheelDelta/120 < 0 && !App.scrollTimeout){
        App.scrollType = 'mousewheel';
        App.scrollDown(e);
      }
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
        }, 600);
      }, 1000);
    },

    events: function() {
      window.addEventListener("load", App.hideUrlBar);

      $(document).keydown(this.keyboardListener);
      $(document).bind('mousewheel', App.mousewheelListener);

      if (window.location.hash.length > 0)
        window.onload = App.scrollToAnchor();
    },

    init: function() {
      this.events();
    }
  }

  App.init();
})();
