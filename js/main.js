window.addEventListener('load',()=>{
const sections = document.querySelectorAll("section");
const footer = document.querySelector("#footer");
const snb = document.querySelector("#container>.snb");
const snb_bar = document.querySelectorAll(".snb li a");
const h2 = document.querySelectorAll("h2.char");
const p = document.querySelectorAll("p.char");
const btns = document.querySelector(".btns");
const btn_top = btns.querySelector(".btn_top")
const scroll_down = document.querySelector(".scroll_down");

const banner_btns = document.querySelectorAll(".banner_btns i");
const banner_num = document.querySelectorAll(".banner_btns p span.num");
const progress_bar = document.querySelector(".bar span");
const banners = document.querySelectorAll('.banner');

let page_height = wrap.offsetHeight;
let page_width = wrap.offsetWidth;

let banner_position = 0;
let num = 1;
let slide_width = banners[0].offsetWidth;

const agree = document.querySelector('.form_wrap label');

// init
wrap.classList.add("active");
window.addEventListener("resize", e=>{
  slide_width = banners[0].offsetWidth;
  page_height = wrap.offsetHeight;
  page_width = wrap.offsetWidth;
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },       
  });
})

sections[0].classList.add("active");
let h2_txt ='';
const gap = 0.03;
acttach_span(h2);
acttach_span(p);
set_transition(h2);

btn_top.addEventListener("click", e=>{
  e.preventDefault();
  scrollTo(sections[0],0);
  active_top(0);
});

// 스크롤
let flag = 0;
sections.forEach((el,i) =>{
  el.addEventListener("wheel", e=>{
    e.preventDefault();
    // console.log(e.deltaY); 아래 => 양수
    if(e.deltaY>0 & i==4){
        scrollTo(footer,4);
        for(let el of sections) el.classList.remove("active");
        flag = 1;
      } else if(flag == 1 & i == 4){
        scrollTo(sections[i],i);
        active_top(i);
        // addClass(sections,i,"active");
        flag = 0;
      } else if(e.deltaY > 0 & i < sections.length-1 & flag == 0) {
        scrollTo(sections[i+1],i+1);
        active_top(i+1);
        // addClass(sections,i+1,"active");
      } else if(e.deltaY < 0 & i > 0 & flag == 0){
        scrollTo(sections[i-1],i-1);
        active_top(i-1);
        // addClass(sections,i-1,"active");
      }
  });
});

window.addEventListener("scroll", e=>{
  scroll_po = window.pageYOffset;
  let point = page_height - sections[4].offsetHeight - footer.offsetHeight;
  page_width <= 1270 & scroll_po == 0? header.classList.add("top") : header.classList.remove("top");
  sections.forEach((el,i) =>{
    if(el.offsettop == 0){
      if (scroll_po >= el.offsetTop & scroll_po < el.offsetTop +(el.offsetHeight*.3)){
        addClass(sections,i,"active");
      }
    } else{
    if (scroll_po >= el.offsetTop-(el.offsetHeight*.5) & scroll_po < el.offsetTop +(el.offsetHeight*.3)){
      addClass(sections,i,"active");
    }
  }
  })
  if(page_width > 1270){
    if(scroll_po == point || scroll_po <= point+10){
      var btnFix = getAbHeight(btns);
      var headerFix = getAbHeight(header);
      var scrollFix = getAbHeight(scroll_down);
      var snbFix = getAbHeight(snb);
    }
    if(scroll_po >= point){
      fixPosition(btns,btnFix);
      fixPosition(header,headerFix);
      fixPosition(scroll_down,scrollFix);
      fixPosition(snb,snbFix);
    } else{
      initTop(header);
      initTop(btns);
      initTop(scroll_down);
      initTop(snb);
    }
  }
})
// snb_bar 클릭
snb_bar.forEach((el,i) =>{
  el.addEventListener("click", e=>{
    e.preventDefault();
    scrollTo(sections[i],i);
    active_top(i);
  });
});

// content2 오토배너
let banner_timer = setTimeout(play_banner,1000); 
let focus_idx = 0;
let sec=1;

function play_banner(){
  sec == 0 ? progress_bar.style.transitionProperty = `none` : progress_bar.style.transitionProperty = `all`;
  let width = (sec)*20;
  sec++;
  progress_bar.style.width = `${width}%`;
  // console.log(sec);
  if(sec >= 7) {
    sec = 0;
    if(num >= 4) {
      num = 1;
    } else num++;
    switch_num(banner_num[0],banner_num[1],num,4);
    if (banner_num[0].innerText == 4) banner_num[1].innerText = `01`;
    turnOnBanner();
    swiper.slideNext();
  }
  banner_timer = setTimeout(play_banner,1000);
}
// 스와이프
var swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  loop: true,
  pagination: {
      el: ".swiper-pagination",
      clickable: true,
  },
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
});

banner_btns.forEach((el, i) =>{
  el.addEventListener("click", e=>{
    e.preventDefault();
    clearTimeout(banner_timer);
    sec = 0;
    if(i == 1) {
      banner_position--;
      if(num >= 4) {
        num = 1;
      } else num++;
      switch_num(banner_num[0],banner_num[1],num,4);
    } else {
        banner_position++;
        if(num <= 1){
          num = 4;
        } else num--;
        switch_num(banner_num[0],banner_num[1],num,4);
    }
    if (banner_num[0].innerText == 4) banner_num[1].innerText = `01`;
    turnOnBanner(i);
    banner_timer = setTimeout(play_banner,1000);
  })
})
// content 5 동의
agree.addEventListener("click", e=>{
  e.currentTarget.classList.toggle("on");
})


// function 모음
// 1. 초기설정
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
function set_transition(object){
  object.forEach((el,i) =>{
    let h2_span = el.querySelectorAll(".char>span");
    for (let el of h2_span){
      h2_txt = el.querySelectorAll("span");
      sections.forEach((el,j) =>{
        if (el.classList.contains("active")){
          h2_txt.forEach((el,i) =>{
          el.style.transitionDelay = `${(i*gap)+0.5}s`;
        }) 
        }
      })
    }
  });
}

// 2. 동작
function addClass(obj,idx,name){
  for(let el of obj) el.classList.remove(name);
  obj[idx].classList.add(name);
}

function getAbHeight(target){
  let targetTop = target.getBoundingClientRect().top;
  let abTop = sections[4].offsetTop+targetTop;
  return abTop
}

function initTop(obj){
  obj.classList.remove("fix");
  obj.style.top = `auto`;
}

function fixPosition(obj,height){
  obj.classList.add("fix");
  obj.style.top = `${height}px`;
}

function active_top(i){
  if (i == 0){
    btns.classList.remove("active");
  }else btns.classList.add("active");
}

function scrollTo(object,i){
  let height = object.offsetTop;
  snb_bar[i].classList.add("on");
  window.scroll({
    top:height,
    behavior:"smooth"
  });
  nav_Interative(i);
  turn_black(i);
}

function turn_black(i){
  wrap.classList.remove("black");
  if(i==2 || i==3){
    wrap.classList.add("black");
  }
}

function nav_Interative(i){
  let bar = document.querySelector(".nav_bar");
  let prev = document.querySelector(".snb .prev_num");
  let next = document.querySelector(".snb .next_num");
  bar.style.height = `${(i+1)*20}%`;
  switch_num(prev,next,i+1,5);
}

function switch_num(prev,next,i,length){
  prev.innerText=`0${i}`;
  if(i==length) next.innerText=`0${length}`;
  else next.innerText=`0${i+1}`;
}

function turnOnBanner(){
  banners.forEach((el,i) =>{
    if(arguments[0] == 0){
      if (el.classList.contains("on")) {
        if (i == 0) focus_idx = banners.length-1;
        else focus_idx = i-1;
      }
      el.classList.remove("on");
    }else {
      if (el.classList.contains("on")) {
        if (i == banners.length-1) focus_idx = 0;
        else focus_idx = i+1;
      }
      el.classList.remove("on");
    }
  })
  banners[focus_idx].classList.add("on");
}
})
