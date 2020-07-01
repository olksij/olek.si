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
        if(fadeChild[i].getBoundingClientRect().top < screen.height*0.5){
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

var IconsList = ['HomeHeadSubtitle','HomeHeadTitle1','HomeHeadTitle2','HomeHeadScroll','HomeHeadNavigationButton',
    'HomeHeadNavigationButtonDesktop', 'HomeFeaturedSubtitle', 'HomeFeaturedTitle1', 'HomeFeaturedTitle2', 
    'HomeFeaturedTitle3', 'HomeFeaturedAbout']; 

var Icons = [

    // -- HomeHead -- //

    `<svg id="HomeHeadSubtitleSvg" height="33" viewBox="0 0 82 33"><text opacity="0.3" fill="var(--Black)" font-size="24"><tspan x="0" y="25.692">HELLO,</tspan></text></svg>`,

    `<svg id="HomeHeadTitle1Svg" height="120" viewBox="0 0 480 120"><rect x="165" y="74" width="315" height="46" fill="var(--Light)"/><text fill="var(--Black)" font-size="96"><tspan x="0" y="96.768">I'm Alexey</tspan></text></svg>`,

    `<svg id="HomeHeadTitle2Svg" height="120" viewBox="0 0 317 120"><rect y="74" width="316" height="46" fill="var(--Light)"/><text fill="var(--Black)" font-size="96"><tspan x="0" y="96.768">Besida</tspan></text></svg>`,

    `<svg id="HomeHeadScrollSvg" width="127" height="30" viewBox="0 0 127 30"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 15L1.7625 13.2375L8.75 20.2125V5H11.25V20.2125L18.225 13.225L20 15L10 25L0 15Z"/><text font-size="22" font-weight="700"><tspan x="42" y="23.25">Explore</tspan></text></svg>`,

    `<svg id="HomeHeadNavigationButtonSvg" width="162" height="30" viewBox="0 0 162 30"><rect y="13.4583" width="18" height="2.58333" fill="var(--Black)"/><rect y="7" width="11.5714" height="2.58333" fill="var(--Black)"/><rect x="6.42847" y="19.9166" width="11.5714" height="2.58333" fill="var(--Black)"/><text fill="var(--Black)" font-weight="700" font-size="22"><tspan x="41" y="23.25">Navigation</tspan></text></svg>`,

    `<svg id="HomeHeadNavigationButtonDesktopSvg" width="173" height="30" viewBox="0 0 173 30"><text opacity="0.2" fill="var(--Black)" font-weight="800" font-size="22"><tspan x="33" y="23.25">NAVIGATION</tspan></text><g opacity="0.25"><rect y="13.4583" width="18" height="2.58333" fill="var(--Black)"/><rect y="7" width="11.5714" height="2.58333" fill="var(--Black)"/><rect x="6.42871" y="19.9166" width="11.5714" height="2.58333" fill="var(--Black)"/></g></svg>`,

    // -- HomeFeatured -- //

    `<svg id="HomeFeaturedSubtitleSvg" height="33" viewBox="0 0 111 33"><text opacity="0.3" fill="var(--Black)" font-size="24"><tspan x="0" y="25.692">PLANNER</tspan></text></svg>`,

    `<svg id="HomeFeaturedTitle1Svg" height="100" viewBox="0 0 322 100"><text fill="var(--Black)"><tspan x="0" y="80.64">Let your</tspan></text></svg>`,

    `<svg id="HomeFeaturedTitle2Svg" height="100" viewBox="0 0 460 100"><rect x="256" y="62" width="204" height="38" fill="var(--Light240)"/><text fill="var(--Black)"><tspan x="0" y="80.64">life be more</tspan></text></svg>`,

    `<svg id="HomeFeaturedTitle3Svg" height="100" viewBox="0 0 432 100"><rect y="62" width="432" height="38" fill="var(--Light240)"/><text fill="var(--Black)"><tspan x="0" y="80.64">productive</tspan></text></svg>`,

    `<svg id="HomeFeaturedAboutSvg" width="97" height="30" viewBox="0 0 97 30"><path d="M10 25L8.2375 23.2375L15.2125 16.25H0V13.75L15.2125 13.75L8.225 6.775L10 5L20 15L10 25Z" fill="var(--Blue240)"/><text fill="var(--Blue240)" font-size="22" font-weight="700"><tspan x="42" y="23.426">More</tspan></text></svg>`,

]