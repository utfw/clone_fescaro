window.addEventListener('load',()=>{
const wrap = document.querySelector("#wrap");
const header = document.querySelector("#header");
const gnb = document.querySelector(".gnb");
const gnb_menu = document.querySelectorAll(".gnb .gnb_inner>ul>li");
const btn_sitemap = document.querySelector(".btn_sitemap");
const sitemap = document.querySelector(".sitemap");
const side_menu = document.querySelectorAll(".gnb_side .gnb_inner>ul>li");

const sections = document.querySelectorAll("section");
let scroll_po = '';
let page_height = wrap.offsetHeight;
let page_width = wrap.offsetWidth;

gnb_menu.forEach((el,i)=>{
  el.querySelector("a").addEventListener("mouseenter", e=>{
    e.preventDefault();
    wrap.classList.add("black");
    gnb.classList.add("on");
  });
  gnb.children[2].addEventListener("mouseleave", e=>{
    scroll_po = window.pageYOffset;
    e.preventDefault();
    wrap.classList.remove("black");
    gnb.classList.remove("on");
    if(scroll_po >= sections[2].offsetTop & scroll_po <= sections[3].offsetTop){
      wrap.classList.add("black");
    }
  });

  el.addEventListener("click", e=>{
    activation(gnb_menu,i,"on");
    })
});

side_menu.forEach((el,i) =>{
  el.addEventListener("click", e=>{
    e.preventDefault();
    el.classList.contains("on") ? el.classList.remove("on") : activation(side_menu,i,"on");
  })
})

// sitemap
btn_sitemap.addEventListener("click",e=>{
  if(header.offsetWidth <= 1270){
    let mini_menu = document.querySelector(".gnb_side");
    btn_sitemap.classList.toggle("on");
    mini_menu.classList.toggle("on");
  } else{
  sitemap.style.transitionProperty = `all`;
  sitemap.classList.add("on");
  }
});
document.querySelector(".btn_close").addEventListener("click",e=>{
  e.preventDefault();
  sitemap.style.transitionProperty = `opacity`;
  sitemap.classList.remove("on");
});

// function
function activation(obj,i, name){
  for(let el of obj) el.classList.remove(name);
  obj[i].classList.add(name);
}
})