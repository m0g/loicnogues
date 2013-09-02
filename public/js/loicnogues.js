(function(){

  App = {
    scrollTimeout: false,
    scrollAnchor: '',
    scrollDirection: '',
    scrollType: 'keyboard',
    //mousewheelCounter: 0,

    scrollCallback: function() {
      App.scrollTimeout = false;
      //App.mousewheelCounter = 0;
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
          //lastElement = $(document).height() - $(window).height(),
          elementOffset = Math.floor($(this).offset().top);

      //if (App.scrollType == 'mousewheel')
      //  App.mousewheelCounter++;

      //console.log('current: '+currentOffset+' element: '+elementOffset+' mousewheelCounter: '+App.mousewheelCounter);

      //if (App.scrollType == 'mousewheel' && App.mousewheelCounter > 1)
      //  return true;

      if ((App.scrollDirection == 'down' && currentOffset < elementOffset)
          || App.scrollDirection == 'up' && currentOffset > elementOffset){
        offset = $(this).offset().top;

        //App.scrollAnchor = $(this).attr('id');
        //App.scrollAnimate(offset);
        return { offset: offset, anchor: $(this).attr('id')};
      }

      //else App.scrollTimeout = false;

      //else if (App.scrollType != 'mousewheel')
      //  App.scrollTimeout = false;

      //} else if (currentOffset == elementOffset == 0 || (currentOffset <= lastElement && currentOffset > lastElement - $(window).height())) {
      //  App.scrollTimeout = false;
      //}

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

      //console.log(toScroll[0]);
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

      console.log(e.originalEvent);

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

    events: function() {
      window.addEventListener("load", App.hideUrlBar);

      $(document).keydown(App.keyboardListener);
      $(document).on('mousewheel DOMMouseScroll', App.mousewheelListener);

    },

    init: function() {
      if (window.location.hash.length > 0)
        window.onload = App.scrollToAnchor();
      else
        this.events();
    }
  }

  App.init();
})();
