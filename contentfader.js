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
    
//------------------------------------------
// Xapa User controls
//------------------------------------------
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
