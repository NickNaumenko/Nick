const list=document.querySelector(".works__list"),buttonPrev=document.querySelector(".slider__prev"),buttonNext=document.querySelector(".slider__next");function Slider(e){this._slider=document.querySelector(e),this._frame=this._slider.querySelector(".slider__frame"),this._prev=this._slider.querySelector(".slider__prev"),this._next=this._slider.querySelector(".slider__next"),this._path=0}Slider.prototype.showNext=function(){this._path<=-580||(this._path-=580,this._frame.style.transform=`translateX(${this._path}px)`)},Slider.prototype.showPrev=function(){this._path>=580||(this._path+=580,this._frame.style.transform=`translateX(${this._path}px)`)};const s=new Slider(".slider");function handleMove(e){e.preventDefault();let t=e.changedTouches;e.changedTouches[0].screenX;t[0]-t[t.length-1]>0?(alert("hello"),s.showNext()):t[0]-t[t.length-1]<0&&(alert("hello"),s.showPrev()),alert(t.length)}list.addEventListener("wheel",t=>{let r=t.deltaY||t.detail||e.wheelDelta;r>0&&s.showNext(),r<-0&&s.showPrev(),t.preventDefault()}),buttonPrev.addEventListener("click",e=>{e.preventDefault(),s.showPrev()}),buttonNext.addEventListener("click",e=>{e.preventDefault(),s.showNext()}),list.addEventListener("touchmove",handleMove);