export default function buttonAction(more, tlShift, imageBigger) {

	var button = document.querySelector('.shift-btn');
	button.onclick = function(){
		if (!more.classList.contains('open')) {
			TweenLite.set(more, {className: '+=open'});
			tlShift.play(); 
		} else {
			imageBigger('-=open', '+=close');
			tlShift.reverse();
			TweenLite.set(more, {className: '-=open'});
		}
	};
}