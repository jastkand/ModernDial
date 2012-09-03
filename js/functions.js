scrolling = false; // did we just scroll?
currentPage = ''; // just init

function log(string){
	if (debug) {
		console.log(string);
	}
}

/*Case insensitive array search and returns the place of that search in the array */
inArray = function(array,index){var i=array.length;while (i--){if(array[i].toLowerCase()==index.toLowerCase()){return i;}}return -1;}
/* Returns the case sensitive index after a case insensitive search */
realArrayIndex = function(array,index){for(var i in array){if(i.toLowerCase() == index.toLowerCase()){return i;}}return -1;}

/* Init the navigation arrows */
$(document).on("mouseover","#leftArrow,#rightArrow",function(){
	$(this).stop(false,true).fadeTo(300,1);
})
$(document).on("mouseleave","#leftArrow,#rightArrow",function(){
	$(this).stop(false,true).fadeTo(300,0.3);
});
$(document).on("click","#leftArrow",function(){
	goToLeft();
})
$(document).on("click","#rightArrow",function(){
	goToRight();
})

/* Place the arrows on the right place */
placeArrows = function(fade){
	$("#leftArrow,#rightArrow").hide();
	var mostRight = -999;
	$(".group"+currentTileGroup).each(function(){
		tile = $(this);
		thisRight = parseInt(tile.css('margin-left'))+tile.width();
		if(thisRight > mostRight){
			mostRight = thisRight
		}	
	})
	if(currentTileGroup!=0){
		$("#leftArrow").css('margin-left',currentTileGroup*tileGroupSpace-55).fadeIn(fade);
	}
	if(currentTileGroup!=(tileGroupCount-1)){
		$("#rightArrow").css('margin-left',mostRight+25).fadeIn(fade);
	}
}

/* Init the tile-pages move functions */
goTileGroup = function(n){
	scrolling = true;
	if(n<0){n=0};
	$("#leftArrow,#rightArrow").hide();
	if(Browser.Version() <10){ // IE 7 8 and 9 cannot use CSS3 animations
	$('#content').stop().animate({"margin-left": -tileGroupSpace*n}, 500, function(){
		currentTileGroup = n;	
		document.title = siteTitle+" | "+tileGroupTitles[n];
		scrolling = false;
		placeArrows(300);	
	});	
	}else{
		setTimeout(function(){
			currentTileGroup = n;	
			document.title = siteTitle+" | "+tileGroupTitles[n];
			scrolling = false;
			placeArrows(300);	
		},500);
		$('#content').css("margin-left",-tileGroupSpace*n);
	}
}
goToLeft= function(){
	if(currentTileGroup>0){
		 window.location.hash = "&"+tileGroupTitles[currentTileGroup-1].toLowerCase().stripSpaces();
	}else{
		bounce(-1);
	}
}
goToRight = function(){
	if(currentTileGroup+1 < tileGroupCount){
		 window.location.hash = "&"+tileGroupTitles[currentTileGroup+1].toLowerCase().stripSpaces();
	}else{
		bounce(1);
	}
}
bounce = function(s){ //gives a bounce effect when there are no pages anymore, s = side: -1 = left, 1 = right
	scrolling = true;
	$('html,body').stop().animate({'margin-left': "-="+50*s}, 300,'linear')
					    .animate({'margin-left':  "+="+50*s}, 300,'linear',function(){	
							scrolling = false	
					  	});	
}

/*If the window resizes, check: If the user can scroll vertically or we're not home, disable the horizontal page scroll */
$(window).resize(function(){
	if($(window).height()<Math.max($(document).height(),$(window).height(),document.documentElement.clientHeight) || currentPage != 'home'){
		$(document).unbind("mousewheel");
	}else{
		$(document).bind("mousewheel", function(event, delta) { /* Mouse scroll to move tilepages */
			if(!scrolling){
				 if(delta>0){
					 goToLeft();
				 }else{
					 goToRight();
				 }
			}
			event.preventDefault();
		});
	}
});

/* To make valid links */
makeLink = function(lp){
	t = '';
	if(lp.substr(0,9) == 'external:'){
		t="target='_blank' ";
		lp = lp.substr(9);
	}
	if(lp==""){
		return '';
	}
	if(lp.substr(0,7) == "http://" ||
	   lp.substr(0,8) == "https://" ||
	   lp.substr(0,1) == "/" ||
	   lp[lp.length-1] == "/")
	{
		return t+"href='"+lp+"'";
	}
	return t+"href='#!"+lp.stripSpaces()+"'";	
}