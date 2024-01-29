import{S as P,a as I,i as h}from"./assets/vendor-951421c8.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const $="https://pixabay.com/api/",E="41935591-0a413f499168cf3dc7607e044",H=document.querySelector(".search-form"),g=document.querySelector(".search-input"),c=document.querySelector(".gallery"),u=document.querySelector(".loader"),i=document.querySelector(".load-more-btn"),b=new P(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});let l=1;const m=40;let f=0,d=!1;p();i.addEventListener("click",B);async function B(){try{if(d)return;d=!0;const t=await L(g.value.trim(),l,m);t.hits.length>0?(O(t.hits),M(),T(),l+=1,b.refresh()):(p(),w())}catch(t){console.error(t)}finally{d=!1}}async function L(t,r,n){try{S();const s=new URLSearchParams({key:E,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:n}),e=`${$}?${s.toString()}`,o=await I.get(e);return f=o.data.totalHits,o.data}catch(s){throw console.error(s),s}finally{y(),M(),k()}}function T(){const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}H.addEventListener("submit",function(t){t.preventDefault();const r=encodeURIComponent(g.value.trim());if(r.trim()===""){h.error({title:"Error",message:"Please enter a search query."});return}l=1,c.innerHTML="",S(),L(r,1,m).then(n=>{A(n.hits),l=2}).catch(n=>{console.error(n)}).finally(()=>{y()})});function A(t){if(c.innerHTML="",t.length===0){h.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again."});return}c.insertAdjacentHTML("beforeend",v(t)),b.refresh(),y(),k()}function v(t){return t.map(({webformatURL:r,largeImageURL:n,tags:s,likes:e,views:o,comments:a,downloads:q})=>`<li class="gallery-item">
      <a class="gallery-link" href="${n}">
        <img
          class="gallery-image"
          src="${r}"
          alt="${s}"
          width="360"
        />
      </a>
      <div class="thumb-block">
        <div class="block">
          <h2 class="title">Likes</h2>
          <p class="amount">${e}</p>
        </div>
        <div class="block">
          <h2 class="title">Views</h2>
          <p class="amount">${o}</p>
        </div>
        <div class="block">
          <h2 class="title">Comments</h2>
          <p class="amount">${a}</p>
        </div>
        <div class="block">
          <h2 class="title">Downloads</h2>
          <p class="amount">${q}</p>
        </div>
      </div>
    </li>`).join("")}function S(){u&&(u.style.display="block")}function y(){u&&(u.style.display="none")}function p(){i&&(i.style.display="none")}function k(){i&&(i.style.display="block")}function w(){h.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})}function M(){f>0&&l>Math.ceil(f/m)&&(p(),w())}function O(t){const r=v(t);c.insertAdjacentHTML("beforeend",r)}
//# sourceMappingURL=commonHelpers.js.map
