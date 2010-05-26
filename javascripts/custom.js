$(document).ready(function(){
  /* Setup vars */
  var newDivs = Array();
  
  /* functions */
  $.fn.makeBumpUpMenu = function(remove) {
    return this.each(function() {
      var el = $(this);
      var parent = el.children('.header').attr('rel');
      
      el.unbind('hover');

      var name = el.attr('id');
      if (remove) { newDivs[name].remove(); return; }

      if (newDivs[name] == null) {
        var pos = el.position();
        var elTop = pos.top;
        var elLeft = pos.left;
        var elWidth = el.width() + 1;
        var elHeight = el.height() + 2;

        newDivs[name] = el.clone().insertAfter(el);

        newDivs[name]
          .attr('id', name + '_clone')
          .css({ position: "absolute", cursor: "pointer", background: "#eee",
            top:elTop, left:elLeft,width:elWidth, height:elHeight,zIndex:10000,
            opacity:0.0
          }).children('ul.menu').css('display','block');

        newDivs[name].hover(
          function(){ cPos = $('.bumpupmenuwidget#'+name).position().top; $(this).stop().css('top',cPos).animate({opacity:1.0, top:cPos-100, height:'240px'}, "fast"); },
          function(){ cPos = $('.bumpupmenuwidget#'+name).position().top; $(this).stop().animate({top:cPos, height:'140px', opacity:0.0}, "fast"); }
        );
      }
    });
  }
  
  $.fn.makeBumpUpButton = function(remove) {
    return this.each(function() {
      var el = $(this);
      el.unbind('hover');

      var name = el.attr('id');
      if (remove) { newDivs[name].remove(); return; }

      if (newDivs[name] == null) {
        var pos = el.position();
        var elTop = pos.top;
        var elLeft = pos.left;
        var elWidth = el.width() + 1;
        var elHeight = el.height() + 2;

        newDivs[name] = el.clone().insertAfter(el);

        newDivs[name]
          .css({ position: "absolute", cursor: "pointer",
            top:elTop, left:elLeft,width:elWidth, height:elHeight,zIndex:10000
          }).click(function(){document.location = ($('#' + this.id + ' a').attr('href'));});
            
        el.css('opacity','0.0');
          
        newDivs[name].hover(
          function(){ $(this).stop().animate({top:elTop-70, height:'210px'}, "fast"); },
          function(){ $(this).stop().animate({top:elTop, height:'140px'}, "fast"); }
        );
      }
    });
  }

  /* Bumpup boxes on homepages */
  $(".bumpupbuttonwidget").makeBumpUpButton();

  /* Popup Dropdown Lists */
  $(".bumpupmenuwidget").makeBumpUpMenu();

  /* Inventory Search */
  $("#quick-find #inventory-search").focus(function(){
    if ($(this).attr('value') == 'Inventory Search...') {
      $(this).attr('value', '').css('color', 'black');
    }
  });

  /* Quick Find bar links */
  $('#quick-find a').click(function(){
    $('#slideout').slideDown();
    $('#slideout .tabs').tabs('#slideout .panes > div').click($(this).attr('href'));
    return false;
  });

  /* Quick Find Slideout */
  $('#quick-find-button').hover(function(){$(this).css('cursor','pointer');});
  $('#quick-find-button').click(function(){ 
    if ($('#slideout').css('display') == 'block') {
      $('#slideout').hide();
      ch = $('#footer').height();
      $('#footer').css('min-height', ch - 200 + 'px');
    } else {
      ch = $('#footer').height();
      $('#footer').css('min-height', ch + 200 + 'px');
      $('#slideout').slideDown();
      $("body").attr({ scrollTop: $("body").attr("scrollHeight") });
    }
  });
  
  /* Sidebar Menu */
  function initMenu() {
    $('#sidebar-menu ul').hide();
    $('#sidebar-menu ul:first').show();
    $('#sidebar-menu li a').click(
      function() {
        var checkElement = $(this).next();
        if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
          return false;
          }
        if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
          $('#sidebar-menu ul:visible').slideUp('normal');
          checkElement.slideDown('normal');
          return false;
        }
      }
    );
  }
  initMenu();
  
});