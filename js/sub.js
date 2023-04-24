window.addEventListener('load',()=>{
const main_visual = document.querySelector("#container .main_visual");
const spot = document.querySelector("#container .spot");
const menu = document.querySelector("#container .menu_wrap");
const menuMini = document.querySelector("#container .menu_title");
const content = document.querySelector("#container #content");
const height = menu.offsetTop;
const txtbox = document.querySelector(".txt");
const h2 = document.querySelectorAll("h2.char");
const p = document.querySelectorAll("p.char");
let scale = 1;
const gap = 0.10;
const agree = document.querySelector("form label.agree");
const btn_top = document.querySelector(".btn_top");
let page_height = wrap.offsetHeight;
let page_width = wrap.offsetWidth;
let scroll_po = '';
// init
acttach_span(h2);
acttach_span(p);
set_delay(h2);
wrap.classList.add("active");
window.addEventListener("resize", e=>{
  page_height = wrap.offsetHeight;
  page_width = wrap.offsetWidth;
})

btn_top.addEventListener("click", e=>{
  e.preventDefault();
  scrollTo(content,0);
});

spot.addEventListener("wheel", e=>{
  e.preventDefault();
  if(e.deltaY>0 & scroll_po < spot.offsetHeight) scrollTo(main_visual);
    // console.log(e.deltaY); 양수가 아래
  if(e.deltaY<0 & scroll_po <= height) scrollTo(content,0);
})

// const fixPosition = main_visual.offsetHeight - menuMini.offsetHeight;
menuMini.addEventListener("click",e =>{
  e.preventDefault();
  menu.classList.contains("on") ? menu.classList.remove("on") : menu.classList.add("on")
})

// 페이지 스크롤 인터렉션
window.addEventListener("scroll", e=>{
  scroll_po = window.pageYOffset;
  page_width <= 1270 & scroll_po == 0? header.classList.add("top") : header.classList.remove("top"); 
  if(scroll_po >= (spot.offsetHeight*0.8)) {
    scale = 1.2;
    txtbox.classList.remove("on");
  }
  else if(scroll_po < height) {
    scale = 1;
    txtbox.classList.add("on");
  }
  spot.style.scale = scale;
  if(scroll_po >= spot.offsetHeight){
    main_visual.classList.add("on")
    menu.classList.add("fix")
  }else if(scroll_po < height){
    menu.classList.remove("fix")
  }
})
// form 동의
agree.addEventListener("click", e=>{
  agree.classList.toggle("on");
})

// function
function scrollTo(){
  let height = arguments[0].offsetHeight;
  if(arguments[1] == 0) height = 0;
  window.scroll({
    top:height,
    behavior:"smooth"
  });
}

function acttach_span(object){
  object.forEach((el,i) =>{
    let h2_span = el.querySelectorAll(".char>span");
    for(let i=0;i<h2_span.length;i++){
      let arr="";
      for(let j=0;j<h2_span[i].innerText.length;j++) {
        h2_span[i].innerText[j] == ' ' ? arr+=` ` : arr+=`<span>${h2_span[i].innerText[j]}</span>`;
      } 
      h2_span[i].innerHTML = arr;
    }
  });
}

function set_delay(object){
  object.forEach((el,i) =>{
    let h2_span = el.querySelectorAll(".char>span");
    for (let el of h2_span){
      h2_txt = el.querySelectorAll("span");
        h2_txt.forEach((el,i) =>{
        el.style.transitionDelay = `${(i*gap)+0.0}s`;
      })
    }
  })
}
})
