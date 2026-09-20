const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".photo-card");
const count = document.getElementById("photoCount");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");

function updateCount(){
  const visible = [...cards].filter(c => !c.classList.contains("hidden")).length;
  count.textContent = String(visible).padStart(2,"0") + " PHOTOS";
}
filters.forEach(button=>{
  button.addEventListener("click",()=>{
    filters.forEach(b=>b.classList.remove("active"));
    button.classList.add("active");
    const filter=button.dataset.filter;
    cards.forEach(card=>{
      card.classList.toggle("hidden", filter!=="all" && card.dataset.category!==filter);
    });
    updateCount();
  });
});
cards.forEach(card=>{
  card.addEventListener("click",()=>{
    lightboxImage.src=card.querySelector("img").src;
    lightboxImage.alt=card.querySelector("img").alt;
    lightboxTitle.textContent=card.querySelector("h3").textContent;
    lightbox.classList.add("show");
  });
});
document.querySelector(".close").addEventListener("click",()=>lightbox.classList.remove("show"));
lightbox.addEventListener("click",e=>{if(e.target===lightbox)lightbox.classList.remove("show")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")lightbox.classList.remove("show")});
