import buttonAction from "./button.js";

var browserHeight = window.innerHeight;
var browserWidth = window.innerWidth;

var titleTextBg = document.querySelectorAll('.bg .title--show');
var titleText = document.querySelectorAll('.main .title--show');
var link = document.querySelectorAll('.link');
var tl = new TimelineLite();
tl.from(titleText, 1, {y: -80, delay: 1})
.from(titleTextBg, 1, {y: -150}, 1)
.from(link, 1, {opacity: 0, delay: 0.1});

var item = document.querySelectorAll('.item');
var more = document.querySelectorAll('.more');
var like = document.querySelector('.like');
var people = document.querySelectorAll('.people-who-liked');
var likeArrow = document.querySelector('.like-arrow');
var likeText = document.querySelector('.like-text');
var likeText = document.querySelector('.like-text');
var slices = document.querySelectorAll('.slice');


if (window.innerWidth > 1024) {

// размеры главной картинки
item.forEach(function(item){
	item.style.backgroundSize = Math.ceil((browserWidth*0.9 + 20)) + 'px auto'; 
});

var tlShift = new TimelineLite();
tlShift.stop();
for(let i = 0; i < 2 ; i++) {
	let blockWidthLeft =0;
	let blockWidthRight = 0; 
	if (i == 0) {
		blockWidthLeft = browserWidth*0.68;
		blockWidthRight = browserWidth*0.32;
	} else {
		blockWidthLeft = browserWidth*0.7;		
		blockWidthRight = browserWidth*0.3;
	}

	tlShift.to(item[i], 0.6, {width: blockWidthLeft, ease: Power1.easeOut}, 0) 
	.to(more[i], 0.6 , {width:blockWidthRight, ease: Power1.easeOut}, 0);
}
tlShift.from(like, 0.5 , {scale:0, delay: 0.5, ease: Back.easeOut.config(2)});

// добавление анимации к людям, которые лайкнули
var peopleDelay = 0;
var boxTl = new TimelineLite();
people.forEach(function(item, index){
	boxTl.add('start' + index, peopleDelay)
	.from(item, 0.5 , {y: -20, ease: Circ.easeOut}, ('start' + index))
	.from(item, 0.5 , {opacity: 0, ease: Circ.easeOut}, ('start' + index));
	peopleDelay += 0.1;
});
tlShift.add(boxTl);
tlShift.from(likeArrow, 0.7, {opacity:0}, 2)
.from(likeText, 0.7, {opacity:0}, 2);


//для увеличения картинки полосами
var a = function imageBigger(open, close) {
	TweenLite.set(document.querySelectorAll('.item__more-img'), {className: open});
	TweenLite.set(document.querySelectorAll('.item__more-img'), {className: close});
}

var tlSliceShift = new TimelineLite({
	onStart: a,
	onStartParams: ['+=open', '-=close']
});
var sliceDelayPosition = 0.3;
slices.forEach(function (item) {
	tlSliceShift.from(item, 0.7, {height: 0, ease: Power3.easeIn}, sliceDelayPosition);	
	sliceDelayPosition -= 0.1;
});
tlShift.add(tlSliceShift);

}

buttonAction(more[1], tlShift, a);