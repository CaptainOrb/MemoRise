function rotate(e){
	const rotatecover=document.createElement('div');
	rotatecover.style.position='absolute'
	rotatecover.style.width='100vw';
	rotatecover.style.height='100vh'
	rotatecover.style.zIndex='999';
	rotatecover.style.cursor="grab"
	document.querySelector('body').appendChild(rotatecover)
	const newDiv=document.createElement('div')
	let image=e.target.parentNode.querySelector('div.image');
	image.style.display='flex'
	image.appendChild(newDiv);
	newDiv.style.margin='auto'
	let centerY=newDiv.getBoundingClientRect().top;
	let centerX=newDiv.getBoundingClientRect().left;
	let initialrotate=image.parentNode.style.transform?parseFloat(image.parentNode.style.transform.match(/rotate\(([+-]?[0-9]*\.?[0-9]*)rad\)/)[1]):0
	newDiv.remove();
	function moving(d){	
		image.parentNode.style.transform='rotate('+(initialrotate+Math.atan2(d.clientY-centerY,d.clientX-centerX)-Math.atan2(e.clientY-centerY,e.clientX-centerX))+'rad)'
	}
	document.addEventListener("mousemove",moving)
	document.addEventListener("mouseup",function(){
		document.removeEventListener("mousemove",moving)
		rotatecover.remove()
	});
};

function move(e){
	if(e.target.parentNode.classList.contains("border")){
		e.target.parentNode.style.position='absolute';
		let initialleft=(e.target.parentNode.style.left ? parseFloat(e.target.parentNode.style.left) : 0)
		let initialtop=(e.target.parentNode.style.top ? parseFloat(e.target.parentNode.style.top) : 0)
		function moving(d){
			e.target.parentNode.style.left=(initialleft+d.clientX-e.clientX)+'px'
			e.target.parentNode.style.top=(initialtop+d.clientY-e.clientY)+'px'
		}
		document.addEventListener("mousemove",moving)
		document.addEventListener("mouseup",function(c){
			document.removeEventListener("mousemove",moving);
		})
	}		
}

function resize(e){
	let resizecover=document.createElement('div');
	resizecover.style.position='absolute'
	resizecover.style.width='100vw';
	resizecover.style.height='100vh'
	resizecover.style.zIndex='999';
	resizecover.style.cursor="grab"
	document.querySelector('body').appendChild(resizecover)
	let image=e.target.parentNode.querySelector('div.image')
	let size=e.target.parentNode
	let initialwidth=image.style.width ? parseFloat(image.style.width) : 0
	let initialleft=size.style.left?parseFloat(size.style.left):0
	let initialheight=image.style.height ? parseFloat(image.style.height):0
	let initialtop=size.style.top?parseFloat(size.style.top):0
	function moving(d){
		console.log()
		if(e.target.classList.contains("left")){
			size.style.left=(initialleft-(e.clientX-d.clientX))+'px';
			image.style.width = (initialwidth+e.clientX-d.clientX)+'px'
		}else if(e.target.classList.contains("right")){
			image.style.width = (initialwidth+d.clientX-e.clientX)+'px'
		}else if(e.target.classList.contains("top")){
			size.top=(initialtop-(e.clientY-d.clientY))+'px'
			image.style.height=(initialheight+e.clientY-d.clientY)+'px'
		}else{
			image.style.height=(initialheight+d.clientY-e.clientY)+'px'
		}	
	}
	document.addEventListener("mousemove",moving)
	document.addEventListener("mouseup",function(){
		document.removeEventListener("mousemove",moving)
		resizecover.remove();
	})
}

let formerclass=null

document.querySelector("div.deleteelements").addEventListener("click",function(e){
	canvas[canvas_page].removeChild(canvas[canvas_page].querySelector("div.border"))
	document.querySelector("div.deleteelements").classList.remove("on")
	if(formerclass=="image"){
		document.querySelector("div.cropelements").classList.remove("on")
	}

})
document.querySelector("div.cropelements").addEventListener("click",function(e){
	cropAttribute(canvas[canvas_page].querySelector("div.border").querySelector("div.image"))
})

function addAttribute(image){
	document.querySelector("div.deleteelements").classList.add("on")
	if(image.classList.contains("image")){
		document.querySelector("div.cropelements").classList.add("on")
	}
	let wrap=document.createElement('div');
	formerclass=image.classList[0]
	image.classList="image"
	wrap.classList.add('border');
	wrap.style.left=(image.style.left? parseFloat(image.style.left)-3:0)+'px'
	wrap.style.top=(image.style.top? parseFloat(image.style.top)-3:0)+'px'
	wrap.style.transform=image.style.transform?image.style.transform:null
	image.style.transform=null
	image.style.left=image.style.top='0px';
	wrap.style.display='flex';
	image.style.margin='auto';
	wrap.style.position='absolute'
	image.style.position='relative'
	image.parentNode.appendChild(wrap);
	wrap.appendChild(image);

	const rotate1=document.createElement('div');
	const rotate2=document.createElement('div');
	const rotate3=document.createElement('div');
	const rotate4=document.createElement('div');

	function rotateIcon(div){
		div.classList.add('rotate')
		div.style.width=div.style.height='12px';
		div.style.backgroundColor='grey'
		div.style.position='inherit';
		div.style.cursor="grab"
	}

	rotateIcon(rotate1)
	rotateIcon(rotate2)
	rotateIcon(rotate3)
	rotateIcon(rotate4)

	rotate1.style.bottom=rotate1.style.right='-12px';
	rotate2.style.bottom=rotate2.style.left='-12px';
	rotate3.style.top=rotate3.style.right='-12px';
	rotate4.style.top=rotate4.style.left='-12px';

	function bordering(div){
		div.classList.add("border")
		div.style.backgroundColor="black"
		div.style.position='absolute'
		div.style.cursor="grab"
	}
	let topBorder=document.createElement('div');
	let botBorder=document.createElement('div')
	let leftBorder=document.createElement('div')
	let rightBorder=document.createElement('div')
	bordering(topBorder)
	bordering(botBorder)
	bordering(leftBorder)
	bordering(rightBorder)
	topBorder.style.top=leftBorder.style.left=rightBorder.style.right=botBorder.style.bottom='-3px'
	botBorder.style.height=topBorder.style.height=leftBorder.style.width=rightBorder.style.width='3px'
	botBorder.style.width=topBorder.style.width=leftBorder.style.height=rightBorder.style.height='100%';
	topBorder.classList.add("top")
	botBorder.classList.add("bot")
	leftBorder.classList.add("left")
	rightBorder.classList.add("right")

	wrap.appendChild(topBorder)
	wrap.appendChild(botBorder)
	wrap.appendChild(leftBorder)
	wrap.appendChild(rightBorder)
	wrap.appendChild(rotate1)
	wrap.appendChild(rotate2)
	wrap.appendChild(rotate3)
	wrap.appendChild(rotate4)

	rotate1.addEventListener("mousedown",rotate)
	rotate2.addEventListener("mousedown",rotate)
	rotate3.addEventListener("mousedown",rotate)
	rotate4.addEventListener("mousedown",rotate)

	let borders=wrap.querySelectorAll('div.border');
	for(x=0;x<borders.length;x++){
		borders[x].addEventListener("mousedown",resize)
	}

	image.addEventListener("mousedown",move)
	if(formerclass=="textbox"){
		image.contentEditable="true"
	}
}

function delAttribute(image){
	if(image.parentNode.classList.contains('border')){
		document.querySelector("div.deleteelements").classList.remove("on")
		if(document.querySelector("div.cropelements").classList.contains("on")){
			document.querySelector("div.cropelements").classList.remove("on")
		}
		image.parentNode.querySelector('div.rotate').remove()
		image.style.left=(image.parentNode.style.left?parseFloat(image.parentNode.style.left)+3:0)+'px'
		image.style.top=(image.parentNode.style.top?parseFloat(image.parentNode.style.top)+3:0)+'px'
		image.style.transform=image.parentNode.style.transform?image.parentNode.style.transform:null
		image.style.position='absolute';
		let removeborder=image.parentNode
		image.parentNode.parentNode.appendChild(image)
		removeborder.remove();
		image.classList=formerclass
		if(formerclass=="textbox"){
			image.contentEditable=false
		}
		formerclass=null;
	}
}

function cropAttribute(image){
	let url = image.style.backgroundImage.match(/[^\/]+\.(jpg|png)/i)[0]
	let imageselected=image
	let tempimg=new Image();
	tempimg.src="Resource/Image/"+url
	tempimg.onload=function(){
		let close=document.createElement("div");
		close.style.width='100vw'
		close.style.height='100vh'
		close.style.position='absolute'
		close.style.zIndex='100'
		close.style.display='flex'
		let donebutton=document.createElement('div')
		function makebutton(div){
			div.style.position='absolute';
			div.style.width='10%'
			div.style.height='7%'
			div.style.border='1px solid white'
			div.style.color="white";
			div.style.display="flex"
			div.style.padding='1% 3.5%'
			div.style.boxSizing="border-box"
		}
		makebutton(donebutton)
		donebutton.innerHTML="Cancel"
		let okbutton=document.createElement('div')
		makebutton(okbutton)
		okbutton.innerHTML="Done"
		let imagecrop=document.createElement('div')
		if(0.75*parseFloat(window.innerHeight)*(parseFloat(tempimg.width)/parseFloat(tempimg.height))<=window.innerWidth){
			imagecrop.style.height='75%'
			imagecrop.style.width=(((0.75*parseFloat(window.innerHeight)*(parseFloat(tempimg.width)/parseFloat(tempimg.height)))/window.innerWidth)*100)+'%'
			donebutton.style.bottom=okbutton.style.bottom='3%'
			donebutton.style.left='20%'
			okbutton.style.right='20%'
		}else{
			imagecrop.style.width='75%'
			imagecrop.style.height=(((0.75*parseFloat(window.innerWidth)*(parseFloat(tempimg.height)/parseFloat(tempimg.width)))/window.innerWidth)*100)+'%'
			donebutton.style.bottom=okbutton.style.bottom='48%'
			donebutton.style.left='1%'
			okbutton.style.right='1%'
			donebutton.style.padding='1.5% 2%'
			okbutton.style.padding='1.5% 3%'
		}
		imagecrop.appendChild(donebutton)
		imagecrop.appendChild(okbutton)
		imagecrop.style.margin='auto'
		imagecrop.style.backgroundImage='url(Resource/Image/'+url+')';
		imagecrop.style.zIndex='102'
		imagecrop.style.display='flex'
		imagecrop.style.backgroundSize='100%'
		let croppedImage=document.createElement('div')
		croppedImage.style.width=(100/parseFloat(imageselected.style.backgroundSize.match(/[0-9]+\.?[0-9]*[^%]/g)[0])*parseFloat(imagecrop.style.width)/100*parseFloat(window.innerWidth))+'px'
		croppedImage.style.height=(100/parseFloat(imageselected.style.backgroundSize.match(/[0-9]+\.?[0-9]*[^%]/g)[1])*parseFloat(imagecrop.style.height)/100*parseFloat(window.innerHeight))+'px'
		croppedImage.style.border='3px solid white'
		croppedImage.style.position='absolute'
		imagecrop.appendChild(croppedImage)
		close.appendChild(imagecrop)
		let imagecropbg=document.createElement("div");
		imagecropbg.style.width='100vw'
		imagecropbg.style.height='100vh'
		imagecropbg.style.position='absolute'
		imagecropbg.style.zIndex='990'
		imagecropbg.style.backgroundColor='black'
		imagecropbg.style.display='flex'
		imagecropbg.style.zIndex='101'
		imagecropbg.style.opacity='50%'
		close.appendChild(imagecropbg)
		document.querySelector('body').appendChild(close)
		// let croppedImagev2=document.createElement('div')
		// croppedImagev2.style.width='100%'
		// croppedImagev2.style.height='100%'
		croppedImage.classList.add("image");
		croppedImage.style.backgroundImage="none";
		addAttribute(croppedImage)
		croppedImage.parentNode.style.left=(parseFloat(imagecrop.getBoundingClientRect().left)+(imageselected.style.backgroundPosition?parseFloat(imageselected.style.backgroundPosition.match(/[+-]?[0-9]+\.?[0-9]*/)[0])*-1:0))+'px'
		croppedImage.parentNode.style.top=(parseFloat(imagecrop.getBoundingClientRect().top)+(imageselected.style.backgroundPosition?parseFloat(imageselected.style.backgroundPosition.match(/\s[+-]?[0-9]+\.?[0-9]*/)[0])*-1:0))+'px'
		okbutton.addEventListener("click",function(){
			imageselected.style.backgroundSize=(parseFloat(imagecrop.style.width)/100*window.innerWidth/parseFloat(croppedImage.style.width)*100)+'% '+(parseFloat(imagecrop.style.height)/100 * window.innerHeight / parseFloat(croppedImage.style.height)*100)+'%'
			imageselected.style.backgroundPosition=((parseFloat(croppedImage.getBoundingClientRect().left)-parseFloat(imagecrop.getBoundingClientRect().left))*-1)+'px '+((parseFloat(croppedImage.getBoundingClientRect().top)-parseFloat(imagecrop.getBoundingClientRect().top))*-1)+'px'
			console.log(((parseFloat(croppedImage.getBoundingClientRect().left)-parseFloat(imagecrop.getBoundingClientRect().left))*-1)+'px '+((parseFloat(croppedImage.getBoundingClientRect().top)-parseFloat(imagecrop.getBoundingClientRect().top))*-1)+'px')
			imageselected.style.width=(parseFloat(croppedImage.style.width)/parseFloat(croppedImage.style.height)*parseFloat(imageselected.style.height))+'px'
			close.remove();
		})
		donebutton.addEventListener("click",function(){
			close.remove();
		})
	}
}

let icons=document.querySelectorAll("div.iconbar")
let title=document.querySelector('div.title_edit.left')
for(let x=0;x<2;x++){
	icons[x].addEventListener("click",function(){
		icons[x].classList.add("clicked")
		title.innerHTML=icons[x].innerHTML
		icons[1-x].classList.remove("clicked")
		document.querySelectorAll("div.barcontent")[x].classList.remove("closed")
		document.querySelectorAll("div.barcontent")[1-x].classList.add("closed")
	})
}

let small_images=document.querySelectorAll("div.small_images")
for(let x=0;x<small_images.length;x++){
	small_images[x].style.backgroundImage='url("Resource/Image/image_'+x+'.jpg")'
	small_images[x].style.backgroundPosition="0px -40px"
	small_images[x].style.backgroundSize="100% 220%"
	small_images[x].style.backgroundRepeat="no-repeat"
	small_images[x].style.draggable="true"
}

let sticker_icons=document.querySelectorAll("div.sticker_icon")
for(let x=0;x<sticker_icons.length;x++){
	sticker_icons[x].style.backgroundImage='url("Resource/Image/sticker_'+x+'.png")'
	sticker_icons[x].style.backgroundPosition="40px 0px"
	sticker_icons[x].style.backgroundSize="50% 100%"
	sticker_icons[x].style.backgroundRepeat="no-repeat"
	sticker_icons[x].style.draggable="true"
}

let canvas=document.querySelectorAll("div.album_canvas")
let canvas_page=0
let totalcanvaspage=2
for(let x=0;x<small_images.length;x++){
	small_images[x].addEventListener("dragstart",function(e){
		function work(d){
			let image=document.createElement("div")
			image.style.backgroundImage=e.target.style.backgroundImage
			image.style.backgroundPosition=e.target.style.backgroundPosition
			image.style.backgroundSize=e.target.style.backgroundSize
			image.style.backgroundRepeat=e.target.style.backgroundRepeat
			image.style.width=window.getComputedStyle(e.target).width
			image.style.height=window.getComputedStyle(e.target).height
			image.style.position='absolute'
			image.style.top=(d.clientY-d.target.getBoundingClientRect().top)+'px'
			image.style.left=(d.clientX-d.target.getBoundingClientRect().left)+'px'
			image.classList.add("image")
			canvas[canvas_page].appendChild(image)
			canvas[canvas_page].removeEventListener("drop",work)
		}
		canvas[canvas_page].addEventListener("drop",work)
		canvas[canvas_page].addEventListener("dragover",function(d){
			d.preventDefault();
		})
	})
}
for(let x=0;x<sticker_icons.length;x++){
	sticker_icons[x].addEventListener("dragstart",function(e){
		function work(d){
			let image=document.createElement("div")
			image.style.backgroundImage=e.target.style.backgroundImage
			image.style.backgroundPosition=e.target.style.backgroundPosition
			image.style.backgroundSize=e.target.style.backgroundSize
			image.style.backgroundRepeat=e.target.style.backgroundRepeat
			image.style.width=window.getComputedStyle(e.target).width
			image.style.height=window.getComputedStyle(e.target).height
			image.style.position='absolute'
			image.style.top=(d.clientY-d.target.getBoundingClientRect().top)+'px'
			image.style.left=(d.clientX-d.target.getBoundingClientRect().left)+'px'
			image.classList.add("image")
			canvas[canvas_page].appendChild(image)
			canvas[canvas_page].removeEventListener("drop",work)
		}
		canvas[canvas_page].addEventListener("drop",work)
		canvas[canvas_page].addEventListener("dragover",function(d){
			d.preventDefault();
		})
	})
}

canvas[canvas_page].addEventListener("click",function(e){
	for(let x=0;x<canvas[canvas_page].querySelectorAll('div.image').length;x++){
		if(canvas[canvas_page].querySelectorAll('div.image')[x]!= e.target){
			delAttribute(canvas[canvas_page].querySelectorAll('div.image')[x])
		}
	}
	for(let x=0;x<canvas[canvas_page].querySelectorAll('div.textbox').length;x++){
		if(canvas[canvas_page].querySelectorAll('div.image')[x]!= e.target){
			delAttribute(canvas[canvas_page].querySelectorAll('div.textbox')[x])
		}
	}
	for(let x=0;x<canvas[canvas_page].querySelectorAll('div.line').length;x++){
		if(canvas[canvas_page].querySelectorAll('div.image')[x]!= e.target){
			delAttribute(canvas[canvas_page].querySelectorAll('div.line')[x])
		}
	}
	if(e.target.classList.contains("image") || e.target.classList.contains("textbox")||e.target.classList.contains('line')){
		if(e.target.parentNode.classList.contains("border")==false){
			addAttribute(e.target)
		}
	}
})

for(let x=0;x<document.querySelectorAll("div.icon_color").length;x++){
	document.querySelectorAll("div.icon_color")[x].addEventListener("click",function(e){
		if(document.querySelectorAll("div.icon_color")[x].querySelector("div.color_choices").classList.contains("unclicked")){
			document.querySelectorAll("div.icon_color")[1-x].querySelector("div.color_choices").classList.add("unclicked")
			document.querySelectorAll("div.icon_color")[x].querySelector("div.color_choices").classList.remove("unclicked")
		}else{
			document.querySelectorAll("div.icon_color")[x].querySelector("div.color_choices").classList.add("unclicked")
		}
		
	})
}

for(let x=0;x<document.querySelectorAll("div.color_choices_icon").length;x++){
	if(x%parseInt(document.querySelectorAll("div.color_choices_icon").length/2)==0){
		document.querySelectorAll("div.color_choices_icon")[x].style.backgroundColor='red'
	}else if(x%parseInt(document.querySelectorAll("div.color_choices_icon").length/2)==1){
		document.querySelectorAll("div.color_choices_icon")[x].style.backgroundColor='black'
	}else if(x%parseInt(document.querySelectorAll("div.color_choices_icon").length/2)==2){
		document.querySelectorAll("div.color_choices_icon")[x].style.backgroundColor='blue'
	}else if(x%parseInt(document.querySelectorAll("div.color_choices_icon").length/2)==3){
		document.querySelectorAll("div.color_choices_icon")[x].style.backgroundColor='white'
	}else{
		document.querySelectorAll("div.color_choices_icon")[x].style.backgroundColor='green'
	}
}

for(let x=0;x<document.querySelectorAll("div.icon_color").length;x++){
	for(let y=0;y<document.querySelectorAll("div.icon_color")[x].querySelectorAll("div.color_choices_icon").length;y++){
		document.querySelectorAll("div.icon_color")[x].querySelectorAll("div.color_choices_icon")[y].addEventListener("click",function(e){
			document.querySelectorAll("div.icon_color")[x].style.backgroundColor=e.target.style.backgroundColor;
			document.querySelectorAll("div.icon_color")[x].querySelector("div.color_choices").classList.remove("unclicked")
		})
	}
}

line_icon=document.querySelector("div.icon_text.icon_line")
line_icon.addEventListener("click",function(e){
	e.target.classList.toggle("on")
	textbox_icon.classList.remove("on")
})
textbox_icon=document.querySelector("div.icon_text.icon_textbox")
textbox_icon.addEventListener("click",function(e){
	e.target.classList.toggle("on")
	line_icon.classList.remove("on")
})

canvas[canvas_page].addEventListener("mousedown",function(e){
	if(textbox_icon.classList.contains("on")){
		let textbox=document.createElement('div')
		canvas[canvas_page].appendChild(textbox)
		textbox.classList.add("textbox")
		textbox.style.position='absolute'
		textbox.style.border='1px solid black'
		textbox.contentEditable="true";
		textbox.style.left=(e.clientX-canvas[canvas_page].getBoundingClientRect().left)+'px'
		textbox.style.top=(e.clientY-canvas[canvas_page].getBoundingClientRect().top)+'px'
		function textboxing(d){
			textbox.style.width=Math.abs(d.clientX-e.clientX)+'px'
			textbox.style.height=Math.abs(d.clientY-e.clientY)+'px'
			if(d.clientX-e.clientX<0){
				textbox.style.left=(parseFloat(textbox.style.left)-(e.clientX-d.clientX))+'px'
			}
			if(d.clientY-e.clientY<0){
				textbox.style.top=(parseFloat(textbox.style.top)-(e.clientY-d.clientY))+'px'
			}
		}
		canvas[canvas_page].addEventListener("mousemove",textboxing)
		canvas[canvas_page].addEventListener("mouseup",function(){
			canvas[canvas_page].removeEventListener("mousemove",textboxing)
			textbox.style.border="none"
			textbox_icon.classList.remove("on")
		})
	}
	if(line_icon.classList.contains("on")){
		let line=document.createElement("div");
		canvas[canvas_page].appendChild(line)
		line.classList.add("line")
		line.style.height=(document.querySelector('div.icon_size.icon_line').textContent?parseInt(document.querySelector('div.icon_size.icon_line').textContent.match(/[0-9]*/)[0]):10)+'px';
		line.style.position='absolute'
		line.style.backgroundColor=document.querySelector('div.icon_color.icon_line').style.backgroundColor
		line.style.top=(e.clientY-canvas[canvas_page].getBoundingClientRect().top)+'px'
		line.style.left=(e.clientX-canvas[canvas_page].getBoundingClientRect().left)+'px'
		line.style.transformOrigin="left"
		function lining(d){
			line.style.transform='rotate('+Math.atan2(d.clientY-e.clientY,d.clientX-e.clientX)+'rad)'
			line.style.width=(Math.sqrt(Math.pow(d.clientY-e.clientY,2)+Math.pow(d.clientX-e.clientX,2)))+'px'

		}
		canvas[canvas_page].addEventListener("mousemove",lining)
		canvas[canvas_page].addEventListener("mouseup",function(){
			canvas[canvas_page].removeEventListener("mousemove",lining)
			line_icon.classList.remove("on")
			line.style.transformOrigin=null
		})
	}
})

for(let x=0;x<document.querySelectorAll("div.icon_size").length;x++){
	document.querySelectorAll("div.icon_size")[x].innerText="10"
}
for(let x=0;x<document.querySelectorAll("div.icon_size").length;x++){
	document.querySelectorAll("div.icon_size")[x].addEventListener("input",function(e){
		e.target.innerText=e.target.innerText.replace(/[^0-9]/g,'')
		e.target.innerText=e.target.innerText.replace(/[0-9]{3,}/g,'')
	})
}

for(let x=0;x<document.querySelectorAll("div.button_of_album").length;x++){
	document.querySelectorAll("div.button_of_album")[x].addEventListener("click",function(e){
		if(x==0){
			if(canvas_page>1){
				document.querySelectorAll("div.album_canvas")[canvas_page-1].classList.remove("active")
				canvas_page--
			}else{
				document.querySelector("div.album").classList.remove("right")
				canvas_page--
			}
		}else if(x==1){

		}else{
			if(canvas_page==0){
				if(canvas_page==totalcanvaspage-1){
					let newPage=document.createElement("div")
					newPage.classList.add("album_canvas")
					newPage.classList.add("two")
					document.querySelector("div.album").appendChild(newPage)
					totalcanvaspage++;
					newPage.style.zIndex=98-totalcanvaspage
				}
				canvas_page++;
				document.querySelector("div.album").classList.add("right")
			}else{	
				if(canvas_page==totalcanvaspage-1){
					let newPage=document.createElement("div")
					newPage.classList.add("album_canvas")
					newPage.classList.add("two")
					document.querySelector("div.album").appendChild(newPage)
					totalcanvaspage++;
					newPage.style.zIndex=98-totalcanvaspage
				}
				canvas_page++;
				document.querySelectorAll("div.album_canvas")[canvas_page-1].classList.add("active")
			}
		}
	})
}



