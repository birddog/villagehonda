/*  9/28/2009
		PikaChoose
 	  Jquery plugin for photo galleries
    Copyright (C) 2009 Jeremy Fry

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* thanks to Antonio Terceiro for suggestion and implementation of the multi lang support*/
jQuery.iPikaChoose = {
	build : function(user_options)
	{
		var defaults = {
			show_captions: true,
			slide_enabled: true,
			auto_play: false,
			show_prev_next: true,
			slide_speed: 5000,
			thumb_width: 40,
			thumb_height: 40,
			buttons_text: { play: "", stop: "", previous: "Previous", next: "Next" },
			delay_caption: true,
			user_thumbs: false
		};

		return jQuery(this).each(
			function() {
				function LoadImages()
				{
					jQuery(this).bind("load", function()
					{
						//had to make a seperate function so that the thumbnails wouldn't have problems
						//from beings resized before loaded, thus not h/w

						//delete hidden image to clean up things.
						jQuery(this).parent('div').prev().remove();
						images = jQuery(this).parents('ul').find('img');
						var w = jQuery(this).width();
						var h = jQuery(this).height();
						if(w===0){w = jQuery(this).attr("width");}
						if(h===0){h = jQuery(this).attr("height");}
						//grab a ratio for image to user defined settings
						var rw = options.thumb_width/w;
						var rh = options.thumb_height/h;

						//determine which has the smallest ratio (thus needing
						//to be the side we use to scale so our whole thumb is filled)
						var ratio;
						if(rw<rh){
							//we'll use ratio later to scale and not distort
							ratio = rh;
							var left = ((w*ratio-options.thumb_width)/2)*-1;
							left = Math.round(left);
							//set images left offset to match
							jQuery(this).css({left:left});
						}else{
							ratio = rw;
							//you can uncoment this lines to have the vertical picture centered
							//but usually tall photos have the focal point at the top...
							//var top = ((h*ratio-options.thumb_height)/2)*-1;
							//var top = Math.round(top);
							var top = 0;
							jQuery(this).css({top:top});
						}
						//use those ratios to calculate scale
						var width = Math.round(w*ratio);
						var height = Math.round(h*ratio);
						jQuery(this).css("position","relative");
						jQuery(this).width(width).height(height);
						var imgcss={
							width: width,
							height: height
						};
						jQuery(this).css(imgcss);
						jQuery(this).hover(
							function(){jQuery(this).fadeTo(250,1);},
							function(){if(!jQuery(this).hasClass("pika_selected")){jQuery(this).fadeTo(250,0.4);}}
						);
						jQuery(this).fadeTo(250,0.4);

						if(jQuery(this).hasClass('pika_first')){
							jQuery(this).trigger("click",["auto"]);
						}

					});

					//clone so the on loads will fire correctly
					var newImage = jQuery(this).clone(true).insertAfter(this);

					jQuery(this).hide();

					//reset images to the clones
					images = ulist.children('li').children('img');
				}

				//bring in options
				var options = jQuery.extend(defaults, user_options);
				// grab our images
				var images = jQuery(this).children('li').children('img');
				//hide the images so the user doesn't see crap
				images.fadeOut(1);

				//save our list for future ref
				var ulist = jQuery(this);
				images.each(LoadImages);
				//start building structure
				jQuery(this).before("<div class='pika_main'></div>");
				// houses eveything about the UL
				var main_div = jQuery(this).prev(".pika_main");

				//add in slideshow elements when appropriate
				if(options.slide_enabled){
					main_div.append("<div class='pika_play'></div>");
					var play_div = jQuery(this).prev(".pika_main").children(".pika_play");
					play_div.html("<a class='pika_play_button'>" + options.buttons_text.play + "</a><a class='pika_stop_button'>" + options.buttons_text.stop + "</a>");
					play_div.fadeOut(1);
					var play_anchor = play_div.children('a:first');
					var stop_anchor = play_div.children('a:last');
				}
				//this div is used to make image and caption fade together
				main_div.append("<div class='pika_subdiv'></div>");
				var sub_div = main_div.children(".pika_subdiv");

				//the main image we'll be using to load
				sub_div.append("<img class='pika_back_img'/><img class='pika_main_img' />");
				var main_img = sub_div.children("img:last");
				var back_img = sub_div.children("img:first");


				//build custom overlays. These will use navigation div
				sub_div.append("<div class='pika_prev_hover'></div><div class='pika_next_hover'></div>");
				var prevHover = sub_div.find('.pika_prev_hover');
				var nextHover = sub_div.find('.pika_next_hover');
				prevHover.hide();
				nextHover.hide();
				//create the caption div when appropriate
				if(options.show_captions){
					main_div.append("<div class='pika_caption'></div>");
					var caption_div = main_div.children(".pika_caption");
				}

				//navigation div ALWAYS gets created, its refrenced a lot
				jQuery(this).after("<div class='pika_navigation'></div>");
				var navigation_div = jQuery(this).next(".pika_navigation");
				//fill in sub elements
				navigation_div.prepend("<a>" + options.buttons_text.previous + "</a> :: <a>" + options.buttons_text.next + "</a>");
				var previous_image_anchor = navigation_div.children('a:first');
				var next_image_anchor = navigation_div.children('a:last');

				//hide the navigation if the user doesn't want it
				if(!options.show_prev_next){
					navigation_div.css("display","none");
				}

				//playing triggers the loop for the slideshow
				var playing = options.auto_play;

				main_img.wrap("<a></a>");
				var main_link = main_img.parent("a");

			function activate()
			{
				//sets the intial phase for everything

				//image_click is controls the fading
				images.bind("click",image_click);
				//hiding refrence to slide elements if slide is disabled
				if(options.slide_enabled){
					if(options.auto_play){
						playing = true;
						play_anchor.hide();
						stop_anchor.show();
					}else{
						play_anchor.show();
						stop_anchor.hide();
					}
				}

				ulist.children("li:last").children("img").addClass("pika_last");
				ulist.children("li:first").children("img").addClass("pika_first");
				ulist.children("li").each(function(){ jQuery(this).children("span").hide(); });
				//css for the list
				var divcss = {
					width: options.thumb_width+"px",
					height: options.thumb_height+"px",
					"list-style": "none",
					overflow: "hidden"
				};
				var licss = {
					"list-style": "none",
					overflow: "hidden"
				};
				images.each(function(){
					jQuery(this).parent('li').css(licss);
					jQuery(this).wrap(document.createElement("div"));
					jQuery(this).parent('div').css(divcss);
					//jQuery(this).parent('li').css(licss);
					//fixes a bug where images don't get the correct display after loading
					if(jQuery(this).attr('complete')===true && jQuery(this).css('display')=="none")
					{
						jQuery(this).css({display:'inline'});
					}
				});
				//previous link to go back an image
				previous_image_anchor.bind("click",previous_image);
				prevHover.bind("click",previous_image);
				//ditto for forward, also the item that gets auto clicked for slideshow
				next_image_anchor.bind("click",next_image);
				nextHover.bind("click",next_image);

				//enable mouse tracking for the hover
				sub_div.mousemove(function(e){
					var w = sub_div.width();
					var x = e.pageX - sub_div.offset().left;
      			if(x<w*0.3)
      			{
      				prevHover.fadeIn('fast');
      			}else{
     					prevHover.fadeOut('fast');
     				}
      			if(x>w*0.7)
      			{
      				nextHover.fadeIn('fast');
      			}else{
      				nextHover.fadeOut('fast');
      			}
   			});
   			sub_div.mouseleave(function(){ prevHover.fadeOut('fast');nextHover.fadeOut('fast'); });

			}//end activate function

			function image_click(event, how){
					//catch when user clicks on an image Then cancel current slideshow
					if(how!="auto"){
						if(options.slide_enabled){
							stop_anchor.hide();
							play_anchor.show();
							playing=false;
						}
						main_img.stop();
						main_img.dequeue();
						if(options.show_captions)
						{
							caption_div.stop();
							caption_div.dequeue();
						}
					}
					//all our image variables
					if(options.user_thumbs)
					{
						var image_source = jQuery(this).attr("ref");
					}else
					{
						var image_source = this.src;
					}
					var image_link = jQuery(this).attr("rel");
					var image_caption = jQuery(this).parent().next("span").html();
					//fade out the old thumb
					images.filter(".pika_selected").fadeTo(250,0.4);
					images.filter(".pika_selected").removeClass("pika_selected");
					//fade in the new thumb
					jQuery(this).fadeTo(250,1);
					jQuery(this).addClass("pika_selected");
					//fade the caption out
					if(options.show_captions)
					{
						if(options.delay_caption)
						{
							caption_div.fadeTo(800,0);
						}
						caption_div.fadeTo(500,0,function(){
							caption_div.html(image_caption);
							caption_div.fadeTo(800,1);
						});
					}
					//set back imge = main_img
					var delay = 100;
					if(main_img.attr('opacity') < 0.8)
					{
						delay = 500;
					}
					back_img.attr("src", main_img.attr("src"));
					main_img.fadeTo(delay,0.00,function(){
						//make the image fade in on load, which should hopefully get rid of any jumping
						main_img.unbind('load');
						main_img.bind('load',function()
 						{
							main_img.fadeTo(800,1,function(){
								if(playing){
									jQuery(this).animate({opactiy:1},options.slide_speed, function(){
										//redudency needed here to catch the user clicking on an image during a change.
										if(playing){next_image_anchor.trigger("click",["auto"]);}
									});
								}
								//reset it here to catch initial load.
								back_img.attr("src", main_img.attr("src"));
							});
						});
						main_img.attr("src",image_source);

						main_link.attr("href", image_link);

					});
			}//end image_click function

			function next_image(event, how){
				if(images.filter(".pika_selected").hasClass("pika_last")){
					images.filter(":first").trigger("click",how);
				}else{
					images.filter(".pika_selected").parents('li').next('li').find('img').trigger("click",how);
				}
			}//end next image function

			function previous_image(event, how){
				if(images.filter(".pika_selected").hasClass("pika_first")){
					images.filter(":last").trigger("click",how);
				}else{
					images.filter(".pika_selected").parents('li').prev('li').find('img').trigger("click",how);
				}
			}//end previous image function

			function play_button(){
				main_div.hover(
					function(){play_div.fadeIn(400);},
					function(){play_div.fadeOut(400);}
				);
				play_anchor.bind("click", function(){
					main_img.stop();
					main_img.dequeue();
					if(options.show_captions)
					{
						caption_div.stop();
						caption_div.dequeue();
					}
					playing = true;
					next_image_anchor.trigger("click",["auto"]);
					jQuery(this).hide();
					stop_anchor.show();
				});
				stop_anchor.bind("click", function(){
					playing = false;
					jQuery(this).hide();
					play_anchor.show();
				});
			}
			if(options.slide_enabled){play_button();}
			activate();

		});//end return this.each
	}//end build function

	//activate applies the appropriate actions to all the different parts of the structure.
	//and loads the sets the first image
};//end jquery.ipikachoose

jQuery.fn.PikaChoose = jQuery.iPikaChoose.build;


/*****************************************************************************
 Custom JS functions for Bird Dog
******************************************************************************/
jQuery(function($) {

  $.fn.log = function (msg) {
    console.log("%s: %o", msg, this);
    return this;
  };

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
          .css({ position: "absolute", cursor: "pointer",
            top:elTop, left:elLeft,width:elWidth, height:elHeight,zIndex:100,
            opacity:0.0, background:'#eee url(/wp-content/uploads/whatsInStore.jpg) bottom left no-repeat'
          }).children('ul.menu').css('display','block');

        el.hover(function(){ cPos = $('.bumpupmenuwidget#'+name).position().top; newDivs[name].stop().css({top:cPos, height:'140px'}); });
        newDivs[name].hover(
          function(){ cPos = $('.bumpupmenuwidget#'+name).position().top; $(this).stop().css('top',cPos).animate({opacity:1.0, top:cPos-140, height:'280px'}, "fast"); },
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
          .attr('id', name + '_clone')
          .css({ position: "absolute", cursor: "pointer", opacity:0,
            top:elTop, left:elLeft,width:elWidth, height:elHeight,zIndex:100
          }).click(function(){
            if ($('#' + this.id + ' a').attr('target') == '_blank')
              window.open($('#' + this.id + ' a').attr('href'), $('#' + this.id + ' a').html());
            else
              document.location = ($('#' + this.id + ' a').attr('href'));
          });

        el.hover(function(){ cPos = $('.bumpupbuttonwidget#'+name).position().top; newDivs[name].css({top:cPos, height:'140px'}); });
        newDivs[name].hover(
          function(){ cPos = $('.bumpupbuttonwidget#'+name).position().top; $(this).stop().css('top',cPos).animate({opacity:1.0, top:cPos-70, height:'210px'}, "fast"); },
          function(){ cPos = $('.bumpupbuttonwidget#'+name).position().top; $(this).stop().animate({top:cPos, height:'140px'}, "fast", function(){$(this).css('opacity',0)} ); }
        );
      }
    });
  }

  jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
    this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
    return this;
  }

  /* Bumpup boxes on homepages */
  $(window).load(function() {
    if ($('.bumpupbuttonwidget').length)
      $(".bumpupbuttonwidget").makeBumpUpButton();
  });

  /* Popup Dropdown Lists */
  $(window).load(function() {
    if ($('.bumpupmenuwidget').length)
      $(".bumpupmenuwidget").makeBumpUpMenu();
  });

  /* Inventory Search */
  $("#quick-find #inventory-search").focus(function(){
    if ($(this).attr('value') == 'Inventory Search...') {
      $(this).attr('value', '').css('color', '#999999');
    }
  });

	if($("#menubar .nav ul").length){
	 $("#menubar .nav ul").append("<li class='last'></li>");
	}

  /* Quick Find bar links */
  $('#quick-find .jump-to-tab').click(function(){
    if ($('#slideout').css('display') != 'block') $('#quick-find-button').click();
    $('#slideout .tabbox-tabs').tabs('#slideout > .tabbox-pane').click($(this).attr('href'));
    return false;
  });

  /* Quick Find Slideout */
  $('#quick-find-button').click(function(){
    if ($('#slideout').css('display') == 'none') {
      $('#quick-find-button').find("img").attr('src', '/wp-content/uploads/quick-find-arrow-up.jpg');
      $('#slideout').show();
    } else {
      $('#slideout').hide();
      $('#quick-find-button').find("img").attr('src', '/wp-content/uploads/quick-find-arrow.jpg');
    }
    return false;
  });

  /* Light box for Staff pages */
  $('.staff .person').each(function(){
    var current = $(this);
    current.children().children('.email').click(function(){
      name  = current.children().children('.name').html();
      email = current.children().children('.email').attr('href').replace(/mailto:/,'');
      $('#emailWindow').css('top','120px').center();
      $('#emailWindow #send-to-name').html(name);
      $('#emailWindow #staff-name').attr('value', name);
      $('#emailWindow #staff-email').attr('value', email);
      $('body').append('<div id="jquery-overlay"></div>');
      $('#jquery-overlay').css({zIndex:200,background:'black',opacity:0.85,height:$(document).height()}).fadeIn();
      $('#emailWindow').fadeIn();
      $('div#jquery-overlay').click(function(){
        $('body #jquery-overlay').remove();
        $('#emailWindow').hide();
      });
      return false;
    });
    current.children().children('.toggle-bio').click(function(){
		var location = $(this).position();
		
        current.children('p.bio-text').css({
										   top: location.top + 12, 
										   left: location.left
										   }).toggle();
      return false;
    });
  });

  $('#emailWindow .close').click(function(){
    $('body #jquery-overlay').remove();
    $('#emailWindow').hide();
  });

  /***
   * New Vehicle flyout slider
  */
  if ($('.page-item-151').length) {
    if (!$('#showcase-flyout').length && $('.dt-showcase').length) {
      $('#slideout .dt-showcase').clone().insertAfter('#submenu')
        .attr('id','showcase-flyout')
        .attr('class','showcase-flyout')
        .center()
        .css({top:'112px'})
        .hide();
      $('#showcase-flyout .showcase-pane').wrapInner('<div class="items"/>');
      $('#showcase-flyout .showcase-pane').prepend('<div class="showcase-prev"></div>');
      $('#showcase-flyout .showcase-pane').append('<div class="showcase-next"></div>');
      $('#showcase-flyout .showcase-pane').scrollable({speed:100, size:5, clickable:false, items:'.items', next:'.showcase-next', prev:'.showcase-prev', item:'.vehicle'});
      $('#showcase-flyout .showcase-pane .vehicle').hover(
        function(){ $(this).children('.trims').show(); },
        function(){ $(this).children('.trims').hide(); }
      );
      $('#showcase-flyout .showcase-tabs').tabs('#showcase-flyout > .showcase-pane');
    }
    $('.page-item-151').hover(function(){
      $('#showcase-flyout').show();
    });
    $('#menubar .page_item').hover(function(){if($(this).attr('class')!='page_item page-item-151')$('#showcase-flyout').hide();});
    $('#showcase-flyout').hover(function(){}, function(){$('#showcase-flyout').hide();});
  }


  /* quick find test drive */
  $(".frm-btn-new-test-drive").click(function(){
      $(this).addClass("active");
      $(this).parent().find(".frm-btn-used-test-drive").removeClass("active");
      $(this).parent().find(".used-test-drive").hide();
      $(this).parent().find(".new-test-drive").show();
   });

  $(".frm-btn-used-test-drive").click(function(){
      $(this).addClass("active");
      $(this).parent().find(".frm-btn-new-test-drive").removeClass("active");
      $(this).parent().find(".new-test-drive").hide();
      $(this).parent().find(".used-test-drive").show();
   });

  //***
  // Sidebar Navigation
  initMenu();

  //****
  //  Billboard
  billboardArrowHover();

  //****
  //  Specials arrow toggle
  specialsArrowToggle();

  //***
  //  Wizard
  formwizard();

  function initMenu() {
    if ($("#sidebar .accordionmenuwidget-pages").length){
      var sidebarMenu = $("#sidebar .accordionmenuwidget-pages");
      var sidebarParent = sidebarMenu.children("li");

      //sidebarParent.find("a").toggle(function() {
      $(".accordionmenuwidget-pages > li > a").toggle(function() {
        $(this).parent().find("ul").show();
      }, function() {
        $(this).parent().find("ul").hide();
      });

      if ($("#sidebar .accordionmenuwidget .current_page_item").length){
        var current = $("#sidebar li.current_page_item");
        // show current sub menu
        current.parent().show();

        var currentPosition = $("#sidebar .accordionmenuwidget-pages li > ul > li.current_page_item").position().top;
        //var sidebarMenuHeight = sidebarMenu.height();
        //var sidebarSubMenuHeight = sidebarParent.height();
        var bgOffset = -297; // Backgroung image height. Positions background bottom at the top of the list
        bgOffset += currentPosition + 12;

        // Set background of active list
        current.parent().parent().find("a").addClass("activeParent");
        current.parent().css({
          "background-color" : "#F4F4F4",
          "background-image" : "url(/wp-content/uploads/sidebar-current-page-arrow.png)",
          "background-position" : "left" + " " + bgOffset + "px",
          "background-repeat" : "no-repeat"
        });
      } else {
        sidebarMenu.find("li:first ul").show().addClass("activeParent");
      }
    }
  }

  function checkPos(num){
    if(parseInt(num) > 0){
      return true;
    } else {
      return false;
    }
  }

  function billboardArrowHover(){
    if($(".slideshowwidget").length){
      var slideshow = $(".slideshowwidget");
      var next = slideshow.find("div.next");
      var prev = slideshow.find("div.prev");
      var pager = slideshow.find(".pager");

      prev.hover(function() {
        $(this).css({"background-position": "-172px top"});
      }, function() {
        $(this).css({"background-position": "-42px top"});
      });
      next.hover(function() {
        $(this).css({"background-position": "-95px top"});
      }, function() {
        $(this).css({"background-position": "20px top"});
      });

      pager.find("a").css({"color": "#555"});
    }
  }

  function specialsArrowToggle() {
    if($(".containerSpecials").length){
      $("h2.trigger:first").next(".toggle_container").slideToggle("slow");

      $('h2.trigger').toggle(function(){
        $(this).css({"background": "url(/wp-content/uploads/h2_trigger_red.gif) no-repeat scroll 0 bottom transparent"}).next(".toggle_container").slideToggle("slow")
      }, function() {
        $(this).css({"background": "url(/wp-content/uploads/h2_trigger_red.gif) no-repeat scroll 0 top transparent"}).next(".toggle_container").slideToggle("fast");
      });

    }
  }

  //*************************
  //* wizard for forms
  //*************************
  function formwizard() {
    if($("#tradeEstimate").length){
      var steps = $("#tradeEstimate fieldset");
      var count = steps.size();

      var submitbtn = $("input[type=submit]");
      submitbtn.hide();

      $("#tradeEstimate").before("<ul id='steps'></ul><div class='clear'></div>");
      steps.append("<div class='clear'></div>");

      steps.each(function(i) {
        var name = $(this).find("legend").html();
        $("#steps").append("<li id='stepDesc" + i + "'>Step " + (i + 1) + "<span>" + name + "</span></li>");

        $(this).wrap("<div id='step-" + i + "' class='step'></div>");
        $(this).append("<div id='step-" + i + "commands'></div>");

        if(i == 0) {
          createNextButton(i);
          selectStep(i);
        } else if(i == count -1){
          $("#step-" + i).hide();
          createPrevButton(i);

        } else {
          $("#step-" + i).hide();
          createPrevButton(i);
          createNextButton(i);
        }

      });

       if($(".mmf-checkbox").length) {
         var checkboxes = $(".mmf-checkbox");
		checkboxes.append("<div class='clear'></div>");
       }

      $("#steps").append("<div class='clear'></div>");

    }
  }

  function createPrevButton(i) {
    var stepName = "step-" + i;
    $("#" + stepName + "commands").append("<a href='#' id='" + stepName + "Prev' class='prev'>&laquo; Back</a>");
    $("#" + stepName + "Prev").bind("click", function(e) {
      $("#" + stepName).hide();
      $("#step-" + (i - 1)).show();
      selectStep(i - 1);
	  $("input[type=submit]").hide();
    });

  }

  function createNextButton(i) {
    var stepName = "step-" + i;
  	var count = $("#tradeEstimate fieldset").size();
      $("#" + stepName + "commands").append("<a href='#' id='" + stepName + "Next' class='next'>Next &raquo;</a>");
      $("#" + stepName + "Next").bind("click", function(e) {
        $("#" + stepName).hide();
        $("#step-" + (i + 1)).show();
        selectStep(i + 1);
  	  if(i + 2 == count){
  		  $("input[type=submit]").show();
  	  }
    });
  }

  function selectStep(i) {
    $("#steps li").removeClass("current");
    $("#stepDesc" + i).addClass("current");
  }

  $("#pikame").PikaChoose({thumb_height:30,thumb_width:30});


  /* Detail page Lightbox */
  if ($('.detail .photos a.photo').length) {
    $('.bird_dog .detail .photos .photo').attr('rel','lightbox');
  }
  
});

/**
#  * Copyright (c) 2008 Pasyuk Sergey (www.codeasily.com)
#  * Licensed under the MIT License:
#  * http://www.opensource.org/licenses/mit-license.php
#  *
#  * Splits a <ul>/<ol>-list into equal-sized columns.
#  *
#  * Requirements:
#  * <ul>
#  * <li>"ul" or "ol" element must be styled with margin</li>
#  * </ul>
#  *
#  * @see http://www.codeasily.com/jquery/multi-column-list-with-jquery
#  */
jQuery.fn.makeacolumnlists = function(settings){
	settings = jQuery.extend({
		cols: 2,				// set number of columns
		colWidth: 0,			// set width for each column or leave 0 for auto width
		equalHeight: false, 	// can be false, 'ul', 'ol', 'li'
		startN: 1				// first number on your ordered list
	}, settings);

	if(jQuery('> li', this)) {
		this.each(function(y) {
			var y=jQuery('.li_container').size(),
		    	height = 0,
		        maxHeight = 0,
				t = jQuery(this),
				classN = t.attr('class'),
				listsize = jQuery('> li', this).size(),
				percol = Math.ceil(listsize/settings.cols),
				contW = t.width(),
				bl = ( isNaN(parseInt(t.css('borderLeftWidth'),10)) ? 0 : parseInt(t.css('borderLeftWidth'),10) ),
				br = ( isNaN(parseInt(t.css('borderRightWidth'),10)) ? 0 : parseInt(t.css('borderRightWidth'),10) ),
				pl = parseInt(t.css('paddingLeft'),10),
				pr = parseInt(t.css('paddingRight'),10),
				ml = parseInt(t.css('marginLeft'),10),
				mr = parseInt(t.css('marginRight'),10),
				col_Width = Math.floor((contW - (settings.cols-1)*(bl+br+pl+pr+ml+mr))/settings.cols);
			if (settings.colWidth) {
				col_Width = settings.colWidth;
			}
			var colnum=1,
				percol2=percol;
			jQuery(this).addClass('li_cont1').wrap('<div id="li_container' + (++y) + '" class="li_container"></div>');
			for (var i=0; i<=listsize; i++) {
				if(i>=percol2) { percol2+=percol; colnum++; }
				var eq = jQuery('> li:eq('+i+')',this);
				eq.addClass('li_col'+ colnum);
				if(jQuery(this).is('ol')){eq.attr('value', ''+(i+settings.startN))+'';}
			}
			jQuery(this).css({cssFloat:'left', width:''+col_Width+'px'});
			for (colnum=2; colnum<=settings.cols; colnum++) {
				if(jQuery(this).is('ol')) {
					jQuery('li.li_col'+ colnum, this).appendTo('#li_container' + y).wrapAll('<ol class="li_cont'+colnum +' ' + classN + '" style="float:left; width: '+col_Width+'px;"></ol>');
				} else {
					jQuery('li.li_col'+ colnum, this).appendTo('#li_container' + y).wrapAll('<ul class="li_cont'+colnum +' ' + classN + '" style="float:left; width: '+col_Width+'px;"></ul>');
				}
			}
			if (settings.equalHeight=='li') {
				for (colnum=1; colnum<=settings.cols; colnum++) {
				    jQuery('#li_container'+ y +' li').each(function() {
				        var e = jQuery(this);
				        var border_top = ( isNaN(parseInt(e.css('borderTopWidth'),10)) ? 0 : parseInt(e.css('borderTopWidth'),10) );
				        var border_bottom = ( isNaN(parseInt(e.css('borderBottomWidth'),10)) ? 0 : parseInt(e.css('borderBottomWidth'),10) );
				        height = e.height() + parseInt(e.css('paddingTop'), 10) + parseInt(e.css('paddingBottom'), 10) + border_top + border_bottom;
				        maxHeight = (height > maxHeight) ? height : maxHeight;
				    });
				}
				for (colnum=1; colnum<=settings.cols; colnum++) {
					var eh = jQuery('#li_container'+ y +' li');
			        var border_top = ( isNaN(parseInt(eh.css('borderTopWidth'),10)) ? 0 : parseInt(eh.css('borderTopWidth'),10) );
			        var border_bottom = ( isNaN(parseInt(eh.css('borderBottomWidth'),10)) ? 0 : parseInt(eh.css('borderBottomWidth'),10) );
					mh = maxHeight - (parseInt(eh.css('paddingTop'), 10) + parseInt(eh.css('paddingBottom'), 10) + border_top + border_bottom );
			        eh.height(mh);
				}
			} else
			if (settings.equalHeight=='ul' || settings.equalHeight=='ol') {
				for (colnum=1; colnum<=settings.cols; colnum++) {
				    jQuery('#li_container'+ y +' .li_cont'+colnum).each(function() {
				        var e = jQuery(this);
				        var border_top = ( isNaN(parseInt(e.css('borderTopWidth'),10)) ? 0 : parseInt(e.css('borderTopWidth'),10) );
				        var border_bottom = ( isNaN(parseInt(e.css('borderBottomWidth'),10)) ? 0 : parseInt(e.css('borderBottomWidth'),10) );
				        height = e.height() + parseInt(e.css('paddingTop'), 10) + parseInt(e.css('paddingBottom'), 10) + border_top + border_bottom;
				        maxHeight = (height > maxHeight) ? height : maxHeight;
				    });
				}
				for (colnum=1; colnum<=settings.cols; colnum++) {
					var eh = jQuery('#li_container'+ y +' .li_cont'+colnum);
			        var border_top = ( isNaN(parseInt(eh.css('borderTopWidth'),10)) ? 0 : parseInt(eh.css('borderTopWidth'),10) );
			        var border_bottom = ( isNaN(parseInt(eh.css('borderBottomWidth'),10)) ? 0 : parseInt(eh.css('borderBottomWidth'),10) );
					mh = maxHeight - (parseInt(eh.css('paddingTop'), 10) + parseInt(eh.css('paddingBottom'), 10) + border_top + border_bottom );
			        eh.height(mh);
				}
			}
		    jQuery('#li_container' + y).append('<div style="clear:both; overflow:hidden; height:0px;"></div>');
		});
	}
}

jQuery.fn.uncolumnlists = function(){
	jQuery('.li_cont1').each(function(i) {
		var onecolSize = jQuery('#li_container' + (++i) + ' .li_cont1 > li').size();
		if(jQuery('#li_container' + i + ' .li_cont1').is('ul')) {
			jQuery('#li_container' + i + ' > ul > li').appendTo('#li_container' + i + ' ul:first');
			for (var j=1; j<=onecolSize; j++) {
				jQuery('#li_container' + i + ' ul:first li').removeAttr('class').removeAttr('style');
			}
			jQuery('#li_container' + i + ' ul:first').removeAttr('style').removeClass('li_cont1').insertBefore('#li_container' + i);
		} else {
			jQuery('#li_container' + i + ' > ol > li').appendTo('#li_container' + i + ' ol:first');
			for (var j=1; j<=onecolSize; j++) {
				jQuery('#li_container' + i + ' ol:first li').removeAttr('class').removeAttr('style');
			}
			jQuery('#li_container' + i + ' ol:first').removeAttr('style').removeClass('li_cont1').insertBefore('#li_container' + i);
		}
		jQuery('#li_container' + i).remove();
	});
}

/*****************************************************************************
  Content Fader
*****************************************************************************/
var dealIndex = 1;
var playSlideshow;
var delayPlaySlideshow;
var animating = false;
var viewingPopup = false;
var delayingPopup = false;
var delayedPopupTimer;

function startFade() {
	//---------------------------------------------------------------
	// Changes first item to visable
	$('.article-group:first').addClass('active').css({ opacity: 1.0 }).show();
	//---------------------------------------------------------------
	// Sets all other items to hidden
	$('.article-group:not(.article-group:first)').css({ opacity: 0.0 }).hide();
	//------------------------------------------
	// pause on mouse over
	$('.article-group').hover(function()
	{
		if (!animating) {
			animating = false;
			clearInterval(playSlideshow);
			clearInterval(delayPlaySlideshow);
			$(this).stop();
		} else {

		}
	}, function()
	{
		if (viewingPopup == false) {
			clearInterval(playSlideshow);
			playSlideshow = setInterval('fadeSwitch(true)', 6000);
		}
	});
	//------------------------------------------
	// Sets inital index
	indexUpdate();
	//------------------------------------------
	// Set/clear the timer
	clearInterval(playSlideshow);
	playSlideshow = setInterval('fadeSwitch(true)', 6000);
}

//------------------------------------------
// forward fade
//------------------------------------------
function fadeSwitch(doFade) {
	var $active = $('.article-group.active');
	var $next;

	//------------------------------------------
	// if $active not set, set to first item
	if ($active.length == 0) {
		$active = $('.article-group:first');
	}
	//------------------------------------------
	// sets index of current item
	// sets $next item
	if (dealIndex != $('.article-group').length) {
		$next = $active.next('.article-group');
		dealIndex++;
	} else {
		$next = $('.article-group:first');
		dealIndex = 1;
	}

	$active.addClass('last-active');

	if (doFade == true) {
		animating = true;
		$next.css({ opacity: 0.0 })
			.show()
			.addClass('active')
			.animate({ opacity: 1.0 }, 1600, function() {
				$active.removeClass('active last-active');
				$active.hide();
				$active.css({ opacity: 0.0 });
				animating = false;
			});
	 } else {
		clearInterval(playSlideshow);
		clearInterval(delayPlaySlideshow);
		delayPlaySlideshow = setInterval('delayStartSlideshow()', 12000);
		$next.css({ opacity: 1.0 }).addClass('active').show();
		$active.removeClass('active last-active').css({ opacity: 0.0 }).hide();
		animating = false;
	}

	indexUpdate();
}

//------------------------------------------
// backwards fade
//------------------------------------------
function fadeBack(doFade) {
	var $active = $('.article-group.active');
	var $prev;

	//------------------------------------------
	// if $active not set, set to first item
	if ($active.length == 0) {
		$active = $('.article-group:first');
	}
	//------------------------------------------
	// sets index of current item
	// sets $prev item
	if ($active.prev('.article-group').length) {
		$prev = $active.prev('.article-group');
		dealIndex--;
	}
	else {
		$prev = $('.article-group:last');
		dealIndex = $('.article-group').length;
	}

	$active.addClass('last-active');

	if (doFade == true) {
		animating = true;
		$prev.css({ opacity: 0.0 })
			.show()
			.addClass('active')
			.animate({ opacity: 1.0 }, 1600, function() {
				$active.removeClass('active last-active');
				$active.hide();
				$active.css({ opacity: 0.0 });
				animating = false;
			});
	} else {
		clearInterval(playSlideshow);
		clearInterval(delayPlaySlideshow);
		delayPlaySlideshow = setInterval('delayStartSlideshow()', 12000);
		$prev.css({ opacity: 1.0 }).addClass('active').show();
		$active.removeClass('active last-active').css({ opacity: 0.0 }).hide();
		animating = false;
	}
	indexUpdate();
}

function popupClick() {
		if (delayingPopup == false) {
			if (animating == true) {
				delayingPopup = true;
				delayedPopupTimer = setInterval('delayedPopupTick()', 500);
			} else {
				dealPopup();
			}
		}
	}
	function buttonNext(){
		if (!animating) {
			fadeSwitch(false);
		} else {
			$('.article-group').stop();
			fadeSwitch(false);
		}
	}
	function buttonPrev(){
		if (!animating) {
			fadeBack(false);
		} else {
			$('.article-group').stop();
			fadeBack(false);
		}
	}
function indexUpdate() {
		var totalCount = $('.article-group').length;
	$('.currentindex').html(dealIndex + ' of ' + totalCount);
}
function delayStartSlideshow() {
	clearInterval(delayPlaySlideshow);
	fadeSwitch(true);
	clearInterval(playSlideshow);
	playSlideshow = setInterval('fadeSwitch(true)', 6000);
}
function delayedPopupTick()
{
	// remove the timer
	clearInterval(delayedPopupTimer);
	// set delayingPopup to false
	delayingPopup = false;
	popupClick();
}



/*
	Lightbox JS: Fullsize Image Overlays 
	by Lokesh Dhakar - http://www.huddletogether.com

	For more information on this script, visit:
	http://huddletogether.com/projects/lightbox/

	Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
	(basically, do anything you want, just leave my name and link)
	
*/
var loadingImage = '/wp-content/themes/dt-bird-dog/javascripts/lightbox/loading.gif';		
var closeButton = '/wp-content/themes/dt-bird-dog/javascripts/lightbox/close.gif';		
function getPageScroll(){
	var yScroll;
	if (self.pageYOffset) {
		yScroll = self.pageYOffset;
	} else if (document.documentElement && document.documentElement.scrollTop){	 // Explorer 6 Strict
		yScroll = document.documentElement.scrollTop;
	} else if (document.body) {// all other Explorers
		yScroll = document.body.scrollTop;
	}
	arrayPageScroll = new Array('',yScroll) 
	return arrayPageScroll;
}

function getPageSize(){
	var xScroll, yScroll;
	if (window.innerHeight && window.scrollMaxY) {	
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	
	var windowWidth, windowHeight;
	if (self.innerHeight) {	// all except Explorer
		windowWidth = self.innerWidth;
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}	
	
	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else { 
		pageHeight = yScroll;
	}

	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){	
		pageWidth = windowWidth;
	} else {
		pageWidth = xScroll;
	}


	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight) 
	return arrayPageSize;
}

function pause(numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime)
			return;
	}
}

function getKey(e){
	if (e == null) { // ie
		keycode = event.keyCode;
	} else { // mozilla
		keycode = e.which;
	}
	key = String.fromCharCode(keycode).toLowerCase();
	
	if(key == 'x'){ hideLightbox(); }
}

function listenKey () {	document.onkeypress = getKey; }
	
function showLightbox(objLink)
{
	// prep objects
	var objOverlay = document.getElementById('overlay');
	var objLightbox = document.getElementById('lightbox');
	var objCaption = document.getElementById('lightboxCaption');
	var objImage = document.getElementById('lightboxImage');
	var objLoadingImage = document.getElementById('loadingImage');
	var objLightboxDetails = document.getElementById('lightboxDetails');

	
	var arrayPageSize = getPageSize();
	var arrayPageScroll = getPageScroll();

	// center loadingImage if it exists
	if (objLoadingImage) {
		objLoadingImage.style.top = (arrayPageScroll[1] + ((arrayPageSize[3] - 35 - objLoadingImage.height) / 2) + 'px');
		objLoadingImage.style.left = (((arrayPageSize[0] - 20 - objLoadingImage.width) / 2) + 'px');
		objLoadingImage.style.display = 'block';
	}

	// set height of Overlay to take up whole page and show
	objOverlay.style.height = (arrayPageSize[1] + 'px');
	objOverlay.style.display = 'block';

	// preload image
	imgPreload = new Image();

	imgPreload.onload=function(){
		objImage.src = objLink.href;

		// center lightbox and make sure that the top and left values are not negative
		// and the image placed outside the viewport
		var lightboxTop = arrayPageScroll[1] + ((arrayPageSize[3] - 35 - imgPreload.height) / 2);
		var lightboxLeft = ((arrayPageSize[0] - 20 - imgPreload.width) / 2);
		
		objLightbox.style.top = (lightboxTop < 0) ? "0px" : lightboxTop + "px";
		objLightbox.style.left = (lightboxLeft < 0) ? "0px" : lightboxLeft + "px";


		objLightboxDetails.style.width = imgPreload.width + 'px';
		
		if(objLink.getAttribute('title')){
			objCaption.style.display = 'block';
			//objCaption.style.width = imgPreload.width + 'px';
			objCaption.innerHTML = objLink.getAttribute('title');
		} else {
			objCaption.style.display = 'none';
		}
		
		// A small pause between the image loading and displaying is required with IE,
		// this prevents the previous image displaying for a short burst causing flicker.
		if (navigator.appVersion.indexOf("MSIE")!=-1){
			pause(250);
		} 

		if (objLoadingImage) {	objLoadingImage.style.display = 'none'; }

		// Hide select boxes as they will 'peek' through the image in IE
		selects = document.getElementsByTagName("select");
        for (i = 0; i != selects.length; i++) {
                selects[i].style.visibility = "hidden";
        }

	
		objLightbox.style.display = 'block';

		// After image is loaded, update the overlay height as the new image might have
		// increased the overall page height.
		arrayPageSize = getPageSize();
		objOverlay.style.height = (arrayPageSize[1] + 'px');
		
		// Check for 'x' keypress
		listenKey();

		return false;
	}

	imgPreload.src = objLink.href;
	
}

function hideLightbox()
{
	// get objects
	objOverlay = document.getElementById('overlay');
	objLightbox = document.getElementById('lightbox');

	// hide lightbox and overlay
	objOverlay.style.display = 'none';
	objLightbox.style.display = 'none';

	// make select boxes visible
	selects = document.getElementsByTagName("select");
    for (i = 0; i != selects.length; i++) {
		selects[i].style.visibility = "visible";
	}

	// disable keypress listener
	document.onkeypress = '';
}

function initLightbox()
{
	if (!document.getElementsByTagName){ return; }
	var anchors = document.getElementsByTagName("a");

	// loop through all anchor tags
	for (var i=0; i<anchors.length; i++){
		var anchor = anchors[i];

		if (anchor.getAttribute("href") && (anchor.getAttribute("rel") == "lightbox")){
			anchor.onclick = function () {showLightbox(this); return false;}
		}
	}

	var objBody = document.getElementsByTagName("body").item(0);
	var objOverlay = document.createElement("div");
	objOverlay.setAttribute('id','overlay');
	objOverlay.onclick = function () {hideLightbox(); return false;}
	objOverlay.style.display = 'none';
	objOverlay.style.position = 'absolute';
	objOverlay.style.top = '0';
	objOverlay.style.left = '0';
	objOverlay.style.zIndex = '90';
 	objOverlay.style.width = '100%';
	objBody.insertBefore(objOverlay, objBody.firstChild);
	
	var arrayPageSize = getPageSize();
	var arrayPageScroll = getPageScroll();

	// preload and create loader image
	var imgPreloader = new Image();
	
	// if loader image found, create link to hide lightbox and create loadingimage
	imgPreloader.onload=function(){

		var objLoadingImageLink = document.createElement("a");
		objLoadingImageLink.setAttribute('href','#');
		objLoadingImageLink.onclick = function () {hideLightbox(); return false;}
		objOverlay.appendChild(objLoadingImageLink);
		
		var objLoadingImage = document.createElement("img");
		objLoadingImage.src = loadingImage;
		objLoadingImage.setAttribute('id','loadingImage');
		objLoadingImage.style.position = 'absolute';
		objLoadingImage.style.zIndex = '150';
		objLoadingImageLink.appendChild(objLoadingImage);

		imgPreloader.onload=function(){};	//	clear onLoad, as IE will flip out w/animated gifs

		return false;
	}

	imgPreloader.src = loadingImage;

	// create lightbox div, same note about styles as above
	var objLightbox = document.createElement("div");
	objLightbox.setAttribute('id','lightbox');
	objLightbox.style.display = 'none';
	objLightbox.style.position = 'absolute';
	objLightbox.style.zIndex = '100';	
	objBody.insertBefore(objLightbox, objOverlay.nextSibling);
	
	// create link
	var objLink = document.createElement("a");
	objLink.setAttribute('href','#');
	objLink.setAttribute('title','Click to close');
	objLink.onclick = function () {hideLightbox(); return false;}
	objLightbox.appendChild(objLink);

	// preload and create close button image
	var imgPreloadCloseButton = new Image();

	// if close button image found, 
	imgPreloadCloseButton.onload=function(){

		var objCloseButton = document.createElement("img");
		objCloseButton.src = closeButton;
		objCloseButton.setAttribute('id','closeButton');
		objCloseButton.style.position = 'absolute';
		objCloseButton.style.zIndex = '200';
		objLink.appendChild(objCloseButton);

		return false;
	}

	imgPreloadCloseButton.src = closeButton;

	// create image
	var objImage = document.createElement("img");
	objImage.setAttribute('id','lightboxImage');
	objLink.appendChild(objImage);
	
	// create details div, a container for the caption and keyboard message
	var objLightboxDetails = document.createElement("div");
	objLightboxDetails.setAttribute('id','lightboxDetails');
	objLightbox.appendChild(objLightboxDetails);

	// create caption
	var objCaption = document.createElement("div");
	objCaption.setAttribute('id','lightboxCaption');
	objCaption.style.display = 'none';
	objLightboxDetails.appendChild(objCaption);

	// create keyboard message
	var objKeyboardMsg = document.createElement("div");
	objKeyboardMsg.setAttribute('id','keyboardMsg');
	objKeyboardMsg.innerHTML = 'press <a href="#" onclick="hideLightbox(); return false;"><kbd>x</kbd></a> to close';
	objLightboxDetails.appendChild(objKeyboardMsg);
}

function addLoadEvent(func)
{	
	var oldonload = window.onload;
	if (typeof window.onload != 'function'){
    	window.onload = func;
	} else {
		window.onload = function(){
		oldonload();
		func();
		}
	}

}
addLoadEvent(initLightbox);	// run initLightbox onLoad
