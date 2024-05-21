var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth:true
});

function time(){
    var a = 0;
    setInterval( function() {
        a = a + Math.floor(Math.random()*15)
        if (a<100){
             document.querySelector("#loading-page h1").innerHTML = a+"%";
        }else{
            a = 100
            document.querySelector("#loading-page h1").innerHTML = a+"%";
        }

    },150);
}
var tim = gsap.timeline();
tim.to("#loading-page h1",{
    scale:1.5,
    delay: 0.5,
    duration: 2,
    onStart: time()
})
tim.to("#loading-page ",{
    y:"-100%",
    duration: 1
})

function loadingAnimation(){
    var tl = gsap.timeline();

    tl.from('#nav', {
        y:'-10',
        opacity:0,
        duration:1.5,
        delay:3,
        ease: Expo.easeInOut
    })
        .to('.anime', {
             y:0,
             ease: Expo.easeInOut,
             duration:1.5,
             delay: '-1',
             stagger:.2
        })
        .from('#page1footer',{
            y:'10',
            opacity:0,
            duration:1.5,
            delay: '-1.5',
            ease: Expo.easeInOut
        })
}

function circleSacle(){
 //define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener('mousemove', function(dets){
        
        clearTimeout(timeout);

        xscale = gsap.utils.clamp(.7,1.3,dets.clientX-xprev);
        yscale = gsap.utils.clamp(.7,1.3,dets.clientY-yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale,yscale);
        
        timeout = setTimeout( function () {
            document.querySelector("#mousefollower").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        },100);

    });
}
function circleMouseFollower (xscale ,yscale){
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#mousefollower").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
    });
}

function mouseOver (){
    window.addEventListener('mouseover', function (){
        document.querySelector("#mousefollower").style.display= "block";
    });
}
function mouseOut (){
    window.addEventListener('mouseout', function (){
        document.querySelector("#mousefollower").style.display= "none";
    })
}

circleSacle();
mouseOver();
mouseOut();
circleMouseFollower();
loadingAnimation();

document.querySelectorAll(".elem").forEach(function (elem) {
   
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function () {

        elem.querySelector('h1').style.opacity ="0.7";

      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    });
  
    elem.addEventListener("mousemove", function (details) {

        elem.querySelector('h1').style.opacity ="0.3";
        

    diffrot = details.clientX - rotate;
    rotate = details.clientX;

      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        left : details.clientX,
        rotate : gsap.utils.clamp(20,-30, diffrot),
      });
    });
  });
  