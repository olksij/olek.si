if ('serviceWorker' in navigator && location.hostname != "127.0.0.1") {
    navigator.serviceWorker.register('./sw.js')
    .catch((e) => { console.log(e)})}

const ScrollFade = () => {
    const fadeFunc = (node, fadeDelay) => {
        setTimeout(() => { if(!node.classList.contains('faded'))
        node.className += ' faded' }, parseInt(fadeDelay)+400)
    }
    var fadeChild = document.getElementsByClassName('fadeChild');
    var fadeSelf = document.getElementsByClassName('fadeSelf');
    for(var i=0; i<fadeChild.length; i++) {
        if(fadeChild[i].getBoundingClientRect().top < screen.height*0.6){
            childrens = fadeChild[i].childNodes;
            for(j=0; j<childrens.length; j++) { if(childrens[j].nodeName!='#text') {
                fadeFunc(childrens[j],childrens[j].getAttribute('fd'))
            } }
        }
    } for(var i=0; i<fadeSelf.length; i++) {
        if(fadeSelf[i].getBoundingClientRect().top < screen.height*(fadeSelf[i].getAttribute('fs') || 0.6)) {
            fadeFunc(fadeSelf[i],fadeSelf[i].getAttribute('fd'));
        }
    }
}

var beforeScroll = 0;
const ScrollBlur = () => {
    if (Math.abs(beforeScroll-document.body.scrollTop)>20){
        var blurEl = document.getElementsByClassName('section');
        for(var i=0; i<blurEl.length; i++) {
            var elPos = blurEl[i].firstChild.getBoundingClientRect(); var scrh = screen.height*0.5
            if(elPos.top > scrh || elPos.bottom <= scrh) {
                if(!blurEl[i].classList.contains('blur')) blurEl[i].className += ' blur';
                if(blurEl[i].classList.contains('notblur')) blurEl[i].classList.remove('notblur');;
            }
            else if(blurEl[i].classList.contains('blur')) 
            { blurEl[i].classList.remove('blur'); blurEl[i].className += ' notblur' }
        }
        beforeScroll = document.body.scrollTop;    
    }
}

const ScrollTo = el => { location.href = "#"; location.href = "#"+el }

const Theme = () => {
    var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon'; link.rel = 'shortcut icon';
    link.href = './Assets/'+(dark?'Dark':'Light')+'Icon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);
} 

const pageScroll = () => { ScrollFade(); ScrollBlur() }

const load = () => {
    document.body.addEventListener('scroll', pageScroll); pageScroll();
    window.matchMedia('(prefers-color-scheme: dark)').addListener(Theme); Theme();
}

class IV extends HTMLElement {
    constructor() { super() }
    connectedCallback() {
        this.innerHTML=Icons[IconsList.indexOf(this.getAttribute("id"))];
    }
}
customElements.define("iv-", IV)

var IconsList = ['HomeHeadTitle1','HomeHeadTitle2','HomeHeadTitle3','HomeHeadScroll','HomeHeadNavigationButton',
    'HomeHeadNavigationButtonDesktop', 'HomeFeaturedSubtitle', 'HomeFeaturedTitle1', 'HomeFeaturedTitle2', 
    'HomeFeaturedTitle3']; 

var Icons = [

    // -- HomeHead -- //

    `<svg id="HomeHeadTitle1Svg" width="542" height="44" viewBox="0 0 542 44" fill="none"><text opacity="0.3" fill="var(--Black)" xml:space="preserve" style="white-space: pre" font-size="24" letter-spacing="0em"><tspan x="23" y="25.5">HELLO,</tspan></text></svg>`,

    `<svg id="HomeHeadTitle2Svg" width="542" height="157" viewBox="0 0 542 157" fill="none" ><g clip-path="url(#clip0)"><rect x="190" y="79" width="329" height="48" fill="var(--Light)"/><g filter="url(#filter0_d)"><text fill="var(--Black)" xml:space="preserve" style="white-space: pre" font-size="96" letter-spacing="0em"><tspan x="23" y="103">I&#x2019;m Alexey</tspan></text></g></g><defs><filter id="filter0_d" x="0" y="1.5" width="547.488" height="157.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="15"/><feColorMatrix type="matrix" values="0 0 0 0 0.0294118 0 0 0 0 0.0529412 0 0 0 0 0.1 0 0 0 0.2 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter><clipPath id="clip0"><rect width="542" height="157" fill="white"/></clipPath></defs></svg>`,

    `<svg id="HomeHeadTitle3Svg" width="542" height="157" viewBox="0 0 542 157" fill="none"><rect x="23" y="79" width="332" height="48" fill="var(--Light)"/><g filter="url(#filter0_d)"><text fill="var(--Black)" xml:space="preserve" style="white-space: pre" font-size="96" letter-spacing="0em"><tspan x="23" y="103">Besida</tspan></text></g><defs><filter id="filter0_d" x="1" y="0.5" width="377.631" height="135" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="1"/><feGaussianBlur stdDeviation="15"/><feColorMatrix type="matrix" values="0 0 0 0 0.12 0 0 0 0 0.213333 0 0 0 0 0.4 0 0 0 0.2 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`,

    `<svg id="HomeHeadScrollSvg" width="127" height="30" viewBox="0 0 127 30" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 15L1.7625 13.2375L8.75 20.2125V5H11.25V20.2125L18.225 13.225L20 15L10 25L0 15Z"/><text xml:space="preserve" style="white-space: pre" font-size="22" font-family="Manrope" font-weight="700" letter-spacing="0em"><tspan x="42" y="23.25">Explore</tspan></text></svg>`,

    `<svg id="HomeHeadNavigationButtonSvg" width="162" height="30" viewBox="0 0 162 30" fill="none"><rect y="13.4583" width="18" height="2.58333" fill="var(--Black)"/><rect y="7" width="11.5714" height="2.58333" fill="var(--Black)"/><rect x="6.42847" y="19.9166" width="11.5714" height="2.58333" fill="var(--Black)"/><text fill="var(--Black)" xml:space="preserve" style="white-space: pre" font-family="Manrope" font-weight="700" font-size="22" letter-spacing="0em"><tspan x="41" y="23.25">Navigation</tspan></text></svg>`,

    `<svg id="HomeHeadNavigationButtonDesktopSvg" width="173" height="30" viewBox="0 0 173 30" fill="none"><text opacity="0.15" fill="var(--Black)" xml:space="preserve" style="white-space: pre" font-family="Manrope" font-weight="800" font-size="22" letter-spacing="0em"><tspan x="33" y="23.25">NAVIGATION</tspan></text><g opacity="0.15"><rect y="13.4583" width="18" height="2.58333" fill="var(--Black)"/><rect y="7" width="11.5714" height="2.58333" fill="var(--Black)"/><rect x="6.42871" y="19.9166" width="11.5714" height="2.58333" fill="var(--Black)"/></g></svg>`,

    // -- HomeFeatured -- //

    `<svg id="HomeFeaturedSubtitleSvg" height="33" viewBox="0 0 111 33" fill="none"><text opacity="0.3" fill="var(--Black)" xml:space="preserve" style="white-space: pre" font-size="24" letter-spacing="0em"><tspan x="0" y="25.692">PLANNER</tspan></text></svg>`,

    `<svg id="HomeFeaturedTitle1Svg" height="100" viewBox="0 0 368 101" fill="none"><rect y="60" width="174" height="40" fill="var(--Light)"/><text fill="var(--Black)" xml:space="preserve" style="white-space: pre" font-size="80" letter-spacing="0em"><tspan x="0" y="80.64">Plan your</tspan></text></svg>`,

    `<svg id="HomeFeaturedTitle2Svg" height="100" viewBox="0 0 498 100" fill="none"><rect x="288" y="62" width="210" height="38" fill="var(--Light)"/><text fill="var(--Black)" xml:space="preserve" style="white-space: pre" font-size="80" letter-spacing="0em"><tspan x="0" y="80.64">future, track</tspan></text></svg>`,

    `<svg id="HomeFeaturedTitle3Svg" height="100" viewBox="0 0 309 101" fill="none"><text fill="var(--Black)" xml:space="preserve" style="white-space: pre" font-size="80" letter-spacing="0em"><tspan x="0" y="80.64">present</tspan></text></svg>`

]