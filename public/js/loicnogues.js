(function(){

  App = {
    whereToScroll: function() {
      // Scroll down
      if ($(document).scrollTop() < Math.floor($(this).offset().top)) {
        offset = $(this).offset().top;
        //Navigation.Scroll.animate(offset, $(this).attr('id'));
        return false;
      }
    },

    scrollUp: function(e) {
    },

    scrollDown: function(e) {
      e.preventDefault();
      e.stopPropagation();

      $('div.container div.page').each(App.whereToScroll);
    },

    keyboardListener: function(e) {
      if (e.keyCode == 38)
        App.scrollUp(e);
      else if (e.keyCode == 40)
        App.scrollDown(e);
    },

    events: function() {
      $(document).keydown(this.keyboardListener);
    },

    init: function() {
      this.events();
    }
  }

  App.init();
})();
