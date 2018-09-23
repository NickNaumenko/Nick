function Slider(t){this.slider=document.querySelector(t),this.frame=this.slider.querySelector(".slider__frame"),this.items=this.frame.children,this.itemsCount=this.items.length,this.position=0,this.isAnimated=!1}if(Slider.prototype.init=function(){let t=document.createDocumentFragment();for(i=0;i<this.itemsCount;i++){let e=this.items[i].cloneNode(!0);t.appendChild(e)}for(this.frame.insertBefore(t,this.items[0]),i=0;i<this.itemsCount;i++){let t=this.items[i].cloneNode(!0);this.frame.appendChild(t)}for(let t=-this.itemsCount;t<2*this.itemsCount;t++)this.items[t+this.itemsCount].style.position="absolute",this.items[t+this.itemsCount].style.left=`${580*t}px`},Slider.prototype.smoothScroll=function(t){const e=this;let i=this.frame.getBoundingClientRect().left,o=(Math.abs(t-i),10);!function s(){i<t?(e.isAnimated=!0,i=(i+=o)<t?i:t,setTimeout(()=>{e.frame.style.transform=`translateX(${i}px)`,s()},8)):i>t?(e.isAnimated=!0,i=(i-=o)>t?i:t,setTimeout(()=>{e.frame.style.transform=`translateX(${i}px)`,s()},8)):e.isAnimated=!1}()},Slider.prototype.moveTo=function(){let t=this.frame.getBoundingClientRect().left;this.position=Math.round(t/580);let e=580*this.position-t;return console.log(e),Math.abs(this.position)>=this.itemsCount&&(this.position=this.position>0?this.position-this.itemsCount:this.position+this.itemsCount),this.frame.style.transform=`translateX(${580*this.position-e}px)`,e},Slider.prototype.align=function(t){this.smoothScroll(580*this.position)},Slider.prototype.moveLeft=function(){this.isAnimated||(this.moveTo(),this.position--,this.smoothScroll(580*this.position))},Slider.prototype.moveRight=function(){this.isAnimated||(this.moveTo(),this.position++,this.smoothScroll(580*this.position))},Slider.prototype.drag=function(t){let e,i,o,s=this,n=this.frame;function r(t){window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();let s=l(t)-i;Math.abs(s)<3||function(t){console.log(t),n.style.transform=`matrix(1,0,0,1,${t},0)`}(o=l(t)-i+e)}function h(e){document.removeEventListener(t[1],r),document.removeEventListener(t[2],h),s.moveTo(),s.smoothScroll(580*s.position)}function l(t){return t instanceof MouseEvent?t.pageX:t instanceof TouchEvent?t.changedTouches[0].pageX:void 0}n.addEventListener(t[0],function(o){o.which&&1!=o.which||(e=n.getBoundingClientRect().left,i=l(o),n.ondragstart=function(){return!1},document.addEventListener(t[1],r),document.addEventListener(t[2],h))})},Slider.prototype.wheel=function(){const t=this;this.slider.addEventListener("wheel",function(e){let i=e.deltaY||e.detail||e.wheelDelta;i<0&&t.moveRight(),i>0&&t.moveLeft(),e.preventDefault()})},Slider.prototype.animate=function(){console.log(this.items.length);for(let t=0;t<this.items.length;t++)this.items[t].classList.add("preview--in-view"),t>=this.itemsCount&&(this.items[t].style.animationDelay=`${.3*(t-3)}s`)},window.matchMedia("(min-width: 768px)").matches){const t=new Slider(".slider");t.init(),t.drag(["mousedown","mousemove","mouseup"]),t.drag(["touchstart","touchmove","touchend"]),t.wheel(),t.animate(),document.querySelector(".slider__next").onclick=function(e){t.moveRight()},document.querySelector(".slider__prev").onclick=function(e){t.moveLeft()}}