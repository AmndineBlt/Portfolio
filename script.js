//-------------------------------Script Timeline-------------------------------//
let items = document.querySelectorAll("li");

function isItemInView(item){
  let rect = item.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function callbackFunc() {
    for (let i = 0; i < items.length; i++) {
      if (isItemInView(items[i])) {
        items[i].classList.add("show");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);


//-------------------------------Script wave-------------------------------//
//---------Wave top---------//
let canvas = document.getElementById("waves");
let ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(0, 100);
ctx.bezierCurveTo(canvas.width/3, canvas.height, 2*canvas.width/3, 0, canvas.width, 100);
ctx.stroke();

let numberOfLines = 5;
let i = 0;
let cycle = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(let j=0; j<numberOfLines; ++j) {
    ctx.lineWidth = 1+2*(numberOfLines-j);
    ctx.strokeStyle = 'rgba(100,200,'+Math.floor(Math.abs(Math.cos(i/80)*256))+','+(j/5+0.1)+')';
    let offset = (i+j*10*Math.abs(Math.cos(i/100)))/20;
    let y = (Math.sin(offset)+1)*canvas.height/2;
    let cpy1 = (Math.cos(offset)+0.5)*canvas.height;
    let cpy2 = canvas.height - cpy1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(canvas.width/3, cpy1, 2*canvas.width/3, cpy2, canvas.width, y);
    ctx.stroke();
  }
  i++;
};
setInterval(cycle, 30);


//---------Wave bottom---------//
(function(){
	"use strict";
	
	let cvs,ctx;
	let nodes = 8;
	let waves = [];
	let waveHeight = 60;
	let colours = ["#f80000","#00f800","#8C174D"];
	
  // Initiator function
	function init() {
		cvs = document.getElementById("canvas");
		ctx = cvs.getContext("2d");
		resizeCanvas(cvs);
    
		for (let i = 0; i < 3; i++) {
			waves.push(new wave(colours[i], 1, nodes));
		}

    update();
	}

	function update() {
    let fill = window.getComputedStyle(document.querySelector(".top2"),null).getPropertyValue("background-color");
		ctx.fillStyle = fill;
		ctx.globalCompositeOperation = "source-over";
		ctx.fillRect(0,0,cvs.width,cvs.height);
		ctx.globalCompositeOperation = "screen";
		for (let i = 0; i < waves.length; i++) {
			for (let j = 0; j < waves[i].nodes.length; j++) {
				bounce(waves[i].nodes[j]);
			}
			drawWave(waves[i]);
		}
		ctx.fillStyle = fill;
    
    requestAnimationFrame(update);
	}

	function wave(colour, lambda, nodes) {
    
		this.colour = colour;
		this.lambda = lambda;
		this.nodes = [];
		var tick = 1;
    
		for (let i = 0; i <= nodes+2; i++) {
			let temp = [(i-1) * cvs.width / nodes, 0, Math.random()*200, .3];
			this.nodes.push(temp);
			console.log(temp);
		}
		console.log(this.nodes);
	}

	function bounce(nodeArr) {
		nodeArr[1] = waveHeight/2*Math.sin(nodeArr[2]/20)+cvs.height/2;
		nodeArr[2] = nodeArr[2] + nodeArr[3];
		
	}
	
	function drawWave (obj) {
    
		let diff = function(a,b) {
			return (b - a)/2 + a;
		}
    
		ctx.fillStyle = obj.colour;
		ctx.beginPath();
		ctx.moveTo(0,cvs.height);
		ctx.lineTo(obj.nodes[0][0],obj.nodes[0][1]);
    
		for (let i = 0; i < obj.nodes.length; i++) {
      
			if (obj.nodes[i+1]) {
				ctx.quadraticCurveTo(
					obj.nodes[i][0],obj.nodes[i][1],
					diff(obj.nodes[i][0],obj.nodes[i+1][0]),diff(obj.nodes[i][1],obj.nodes[i+1][1])
				);
			}
      else {
				ctx.lineTo(obj.nodes[i][0],obj.nodes[i][1]);
				ctx.lineTo(cvs.width,cvs.height);
			}
		}
		ctx.closePath();
		ctx.fill();
	}

	function drawNodes (array) {
		ctx.strokeStyle = "#F3F3F3";
    
		for (let i = 0; i < array.length; i++) {
			ctx.beginPath();
			ctx.arc(array[i][0],array[i][1],4,0,2*Math.PI);
			ctx.closePath();
			ctx.stroke();
		}
		
	}

	function drawLine (array) {
		ctx.strokeStyle = "#888";
    
		for (let i = 0; i < array.length; i++) {
      
			if (array[i+1]) {
				ctx.lineTo(array[i+1][0],array[i+1][1]);
			}
		}
    
		ctx.stroke();
	}

	function resizeCanvas(canvas,width,height) {
    
		if (width && height) {
			canvas.width = width;
			canvas.height = height;
		}
    else {
      
			if (window.innerWidth > 1920) {
				canvas.width = window.innerWidth;
			}
			else {
				canvas.width = 1920;
			}
      
			canvas.height = waveHeight;
		}
	}
  
	document.addEventListener("DOMContentLoaded",init,false);
})();

