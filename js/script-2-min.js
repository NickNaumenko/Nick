const list=document.querySelector(".works__list"),buttonPrev=document.querySelector(".slider__prev"),buttonNext=document.querySelector(".slider__next");function Slider(e){this._slider=document.querySelector(e),this._frame=this._slider.querySelector(".slider__frame"),this._prev=this._slider.querySelector(".slider__prev"),this._next=this._slider.querySelector(".slider__next"),this._path=0}Slider.prototype.showNext=function(){this._path<=-580||(this._path-=580,this._frame.style.transform=`translateX(${this._path}px)`)},Slider.prototype.showPrev=function(){this._path>=580||(this._path+=580,this._frame.style.transform=`translateX(${this._path}px)`)};const s=new Slider(".slider");let touches;function handleMove(e){e.preventDefault(),touches=e.changedTouches;e.changedTouches[0].screenX;touches[0]-touches[touches.length-1]>0?(alert("hello"),s.showNext()):touches[0]-touches[touches.length-1]<0&&(alert("hello"),s.showPrev())}list.addEventListener("wheel",t=>{let r=t.deltaY||t.detail||e.wheelDelta;r>0&&s.showNext(),r<-0&&s.showPrev(),t.preventDefault()}),buttonPrev.addEventListener("click",e=>{e.preventDefault(),s.showPrev()}),buttonNext.addEventListener("click",e=>{e.preventDefault(),s.showNext()}),list.addEventListener("touchmove",handleMove),setTimeout(function(){alert(touches)},1e3);