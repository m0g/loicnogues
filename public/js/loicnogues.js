(function(){

  App = {
    scrollTimeout: false,
    scrollAnchor: '',
    scrollDirection: '',

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

      else App.scrollTimeout = false;

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
      if (e.keyCode == 38 && !App.scrollTimeout)
        App.scrollUp(e);
      else if (e.keyCode == 40 && !App.scrollTimeout)
        App.scrollDown(e);
    },

    hideUrlBar: function() {
      setTimeout(function(){
        window.scrollTo(0, 0);
      }, 0);
    },

    events: function() {
      window.addEventListener("load", App.hideUrlBar);
      $(document).keydown(this.keyboardListener);
    },

    init: function() {
      this.events();
    }
  }

  App.init();
})();
