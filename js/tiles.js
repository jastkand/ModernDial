tiles = function(){
	tileTitleText(0,0,0,2,1,'blue','A new page to test','Welcome','<span style="font-size:14px;">This is your test version of the Metro UI template! Adapt it to your own needs. Be creative!<span>');
	tileTitleTextImage(0,1,1,2,2,'red','external:http://metro-webdesign.info/#!Donate','Terms of use',
	"This template is free for personal use (although a donation is very welcome). If you use this for a commercial website, please consider donating if you're happy with the result. I worked hundredss of hours on this to make this bug-free, cross-browser compatible, writing tutorials, giving support when having problems... <br/><br/><em>This template is as is and I give no warranty.</em>",'img/exclamation.png',0.4*scale,15,0);
	tileImageSlider(0,2,0,1,1,'#FF6600','&Another group','img/whiteArrow.png',0.5*scale,'Go to last tilegroup',0.7);
	tileLive(0,0,1,1,2,'#669900','external:http://www.w3schools.com/tags/ref_colorpicker.asp','Colors','','','','',3000,
	'I know the colors of this test version are ugly','But be creative and make it yours!',"Click here to go to a nice colorpicker at w3schools","","");
}

/*Tile Templates */
tileTitleText = function(group,x,y,width,height,bg,linkPage,title,text,optClass){ /* Tile with only a title and description */
	tileContent += (
	"<a "+makeLink(linkPage)+" class='tile group"+group+" "+optClass+"' style=' \
	margin-top:"+y*scaleSpace+"px; margin-left:"+(x*scaleSpace+group*tileGroupSpace)+"px; \
	width: "+(width*scaleSpace-tileSpace)+"px; height:"+(height*scaleSpace-tileSpace)+"px; \
	background:"+bg+";'>\
	<div id='title'>"+title+"</div>\
	<div id='desc'>"+text+"</div>\
	</a>");
}
tileImage = function(group,x,y,bg,linkPage,img,imgSize,optClass){ /* Tile with only an image */
	tileContent += (
	"<a "+makeLink(linkPage)+" class='tile group"+group+" "+optClass+"' style=' \
	margin-top:"+y*scaleSpace+"px;margin-left:"+(x*scaleSpace+group*tileGroupSpace)+"px; \
	width: "+scale+"px; height:"+scale+"px; \
	background:"+bg+";'>\
	<img src='"+img+"' height="+imgSize+" width="+imgSize+" \
	style='margin-left: "+(scale-imgSize)*0.5+"px; margin-top: "+(scale-imgSize)*0.5+"px'/>\
	</a>");
}
tileImageAdvanced = function(group,x,y,width,height,bg,linkPage,img,imgSizeWidth,imgSizeHeight,optClass){
	drawHeight = (imgSizeWidth*scaleSpace-tileSpace)
	drawWidth = (imgSizeHeight*scaleSpace-tileSpace)
	tileContent += ("<a "+makeLink(linkPage)+" class='tile group"+group+" "+optClass+"' style=' \
	margin-top:"+y*scaleSpace+"px ;margin-left:"+(x*scaleSpace+group*tileGroupSpace)+"px; \
	width: "+(width*scaleSpace-tileSpace)+"px; height:"+(height*scaleSpace-tileSpace)+"px; \
	background:"+bg+";'>\
	<img src='"+img+"' width="+drawWidth+" height="+drawHeight+" \
	style='margin-left: "+((scaleSpace*width-tileSpace-drawWidth)*0.5)+"px; \
	margin-top: "+((scaleSpace*height-tileSpace-drawHeight)*0.5)+"px'/></a>");
}
tileTitleTextImage = function(group,x,y,width,height,bg,linkPage,title,text,img,imgSize,imgToTop,imgToLeft,optClass){ // Tile with an image on the left side, a title, and a description, width is always 2
	tileContent += (
	"<a "+makeLink(linkPage)+" class='tile group"+group+" "+optClass+"' style=' \
	margin-top:"+y*scaleSpace+"px;margin-left:"+(x*scaleSpace+group*tileGroupSpace)+"px; \
	width: "+(width*scaleSpace-tileSpace)+"px; height:"+(height*scaleSpace-tileSpace)+"px; \
	background:"+bg+";'>\
	<img style='float:left; margin-top:"+imgToTop+"px;margin-left:"+imgToLeft+"px;' src='"+img+"' height="+imgSize+" width="+imgSize+"/> \
	<div id='title' style='margin-left:"+(imgSize+5+imgToLeft)+"px;'>"+title+"</div>\
	<div id='desc' style='margin-left:"+(imgSize+6+imgToLeft)+"px;'>"+text+"</div>\
	</a>");
}
tileLive = function(group,x,y,width,height,bg,linkPage,title,img,imgSize,imgToTop,imgToLeft,speed,text1,text2,text3,text4,text5,optClass){
	id= "livetile"+(group+''+x+''+y).replace(/\./g,'_')
	if(img!=''){
		imgInsert = "<img style='float:left; margin-top:"+imgToTop+"px;margin-left:"+imgToLeft+"px;' src='"+img+"' height="+imgSize+" width="+imgSize+"/>"
	}else{
		imgInsert = '';
		imgSize = 0;
		imgToLeft = 0;
	}
	tileContent += (
	"<a "+makeLink(linkPage)+" class='tile group"+group+" "+optClass+"' style=' \
	margin-top:"+y*scaleSpace+"px; margin-left:"+(x*scaleSpace+group*tileGroupSpace)+"px; \
	width: "+(width*scaleSpace-tileSpace)+"px; height:"+(height*scaleSpace-tileSpace)+"px; \
	background:"+bg+";'>\
	"+imgInsert+"\
	<div id='title' style='margin-left:"+(imgSize+5+imgToLeft)+"px;'>"+title+"</div>\
	<div class='livetile' style='margin-left:"+(imgSize+10+imgToLeft)+"px;' id='"+id+"' >"+text1+"</div>\
	</a>");
	setTimeout(function(){newLiveTile(id,group,new Array(text1,text2,text3,text4,text5),speed,0)},1500); // init this tile
}
tileImageSlider = function(group,x,y,width,height,bg,linkPage,img,imgsize, text,slideDistance,optClass){
	tileContent += ("<a "+makeLink(linkPage)+" class='tile group"+group+" "+optClass+" tileImageSlider' id='"+slideDistance+" ' style=' \
	margin-top:"+y*scaleSpace+"px;margin-left:"+(x*scaleSpace+group*tileGroupSpace)+"px; \
	width: "+(width*scaleSpace-tileSpace)+"px; height:"+(height*scaleSpace-tileSpace)+"px; \
	background:"+bg+"'>\
	<div class='tileSliderWrapper' style='position:absolute;'>\
	<div style='width: "+(width*scaleSpace-tileSpace)+"px; height:"+(height*scaleSpace-tileSpace)+"px;'>\
	<img src='"+img+"' height="+imgsize+" width="+imgsize+" style='margin-left: "+((width*scaleSpace-imgsize-tileSpace)*0.5)+"px; margin-top: "+((height*scaleSpace-imgsize-tileSpace)*0.5)+"px'/>\
	</div>\
	<div id='tileSliderText'>"+text+"</div>\
	</div>\
	</a>");
	$(document).on("mouseover",'.tileImageSlider',function(){
		$(this).find(".tileSliderWrapper").stop().animate({"margin-top":-$(this).height()*$(this).attr("id")},250,"linear");
	});
	$(document).on("mouseleave",'.tileImageSlider',function(){
		$(this).find(".tileSliderWrapper").stop().animate({'margin-top':0},300,"linear");
	});
}
tileSlideshow = function(group,x,y,width,height,bg,linkPage,title,speed,path1,path2,path3,path4,path5,optClass){
	tileContent += (
	"<a "+makeLink(linkPage)+" class='tile group"+group+" "+optClass+"' style=' \
	margin-top:"+y*(scaleSpace)+"px; margin-left:"+(x*scaleSpace+group*tileGroupSpace)+"px; \
	width: "+(width*(scaleSpace)-tileSpace)+"px; height:"+(height*(scaleSpace)-tileSpace)+"px; \
	background:"+bg+";'>\
	<div class='tileSlideshowTitle'>"+title+"</div>\
	<img class='tileSlideshowImageBack' id='slideshow_"+group+''+x+''+y+"_back' src='"+path1+"'>\
	<img class='tileSlideshowImage' id='slideshow_"+group+''+x+''+y+"' src='"+path1+"' >\
	</a>");
	var images = [path1, path2, path3, path4, path5];
	setTimeout(function(){
		$.each(images, function (i, val) {$('<img/>').attr('src', val)})//start prechaching images;
		newSlideshow(("slideshow_"+group+''+x+''+y),group,images,speed,0)
	},2000); // init this tile	
}
tileCustom = function(group,x,y,width,height,bg,linkPage,content,optClass){ // make your own tiles
	tileContent += (
	"<a "+makeLink(linkPage)+" class='tile group"+group+" "+optClass+"' style=' \
	margin-top:"+y*scaleSpace+"px;margin-left:"+(x*scaleSpace+group*tileGroupSpace)+"px; \
	width: "+(width*scaleSpace-tileSpace)+"px; height:"+(height*scaleSpace-tileSpace)+"px; \
	background:"+bg+";'>\
	"+content+"\
	</a>");
}