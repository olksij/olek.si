const de = r => { return document.getElementById(r) }
const ds = (n,v) => { return document.documentElement.style.setProperty(n,v); }

var elem = document.createElement('canvas');
if (!!(elem.getContext && elem.getContext('2d')))
    var webp = elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
else var webp = false;

// -- Head --

class HomeHead extends HTMLElement{ constructor() { super(); }

    connectedCallback() { this.render();
        var HeadNavFocus = false; var HeadNavExpanded = false; var ViewMobile = window.innerWidth < 700 ? true:false;
        document.scrollingElement.style.scrollBehavior='smooth';

        // Check if mobile
        if (window.innerWidth < 700) { 
            ds('--HomeNavOpacity', 0); de('BlurImage').style.opacity = 0; HeadNavFocus=false; de('HomeHeadLeft').style.opacity=1;
            de('HomeHeadLeft').style.filter = 'blur(0px)'; }
        
        const pageScroll = () => { 
            ScrollFade(); 
            if(!HeadNavFocus){ 
                var ob = document.body.scrollTop < document.body.offsetHeight/2;
                de('BlurImage').style.opacity=ob?0:1; 
                de('BgImage').style.opacity=ob?1:0;
            }
        }

        const pageResize = () => {
            if(window.innerWidth<700 & !ViewMobile) {
                ViewMobile=true; HeadNavFocus = false;
                ds('--HomeNavOpacity', 0);
                de('HomeNavLinks').style.opacity=0
            } else if (window.innerWidth >=700 & ViewMobile) {
                ViewMobile=false; HeadNavFocus=false; 
                ds('--HomeNavOpacity', 1); 
                de('HomeHeadLeft').style.filter = 'blur(0px)'; 
                de('HomeNavLinks').style.opacity=1;
                de('BlurImage').style.opacity = 0; 
                de('HomeHeadLeft').style.opacity=1;
            }
        }

        const Theme = () => {
            var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon'; link.rel = 'shortcut icon';
            link.href = './Assets/'+(dark?'Dark':'Light')+'Icon.ico';
            document.getElementsByTagName('head')[0].appendChild(link);
            
            var img = './Assets/HomeBg'+(dark?'Dark':'Light')+(webp?'.webp':'.jpeg');
            document.getElementById("BgImage").setAttribute('src', img);
            document.getElementById("BlurImage").setAttribute('src', img); 
        }        

        // -- NavigationPaneAnimation Desktop

        de('HomeHeadRight').addEventListener('mouseenter',() => { if ( window.innerWidth >= 700 ) {
            de('HomeHeadLeft').style.filter = 'blur('+(window.innerWidth*document.body.offsetHeight)**0.5/10+'px)';
            de('BlurImage').style.opacity = 1; de('BgImage').style.opacity = 0; de('HomeHeadLeft').style.opacity=0.5;
            HeadNavFocus=true; document.scrollingElement.scrollTop='0px'; }
        })

        de('HomeHeadRight').addEventListener('mouseleave',() => { if ( window.innerWidth >= 700 ) {
            de('HomeHeadLeft').style.filter = 'blur(0px)'
            de('BlurImage').style.opacity = 0; de('BgImage').style.opacity = 1;
            HeadNavFocus=false; de('HomeHeadLeft').style.opacity=1; }
        })
        
        // -- NavigationPaneAnimation Mobile

        de('HomeHeadNavigationButton').addEventListener('click',() => { if (window.innerWidth < 700) { 
            if (!HeadNavExpanded) { HeadNavExpanded=true; ds('--HomeNavOpacity', 1); de('HomeHeadLeft').style.opacity=0.6;
                de('HomeHeadLeft').style.filter = 'blur('+(window.innerWidth*document.body.offsetHeight)**0.5/5+'px)';
                de('BlurImage').style.opacity = 1; /*de('HomeNavLinks').style.display = 'block';*/ HeadNavFocus=true; de('HomeNavLinks').style.opacity = 1} 

            else { HeadNavExpanded=false; de('HomeNavLinks').style.opacity = 0;
                de('HomeHeadLeft').style.filter = 'blur(0px)'; setTimeout(() => { /*de('HomeNavLinks').style.display = 'none'*/ },500)
                de('BlurImage').style.opacity = 0; HeadNavFocus=false; de('HomeHeadLeft').style.opacity=1;
            }
        }})

        document.body.addEventListener('scroll', pageScroll); pageScroll();
        window.addEventListener('resize', pageResize); pageResize();
        window.matchMedia('(prefers-color-scheme: dark)').addListener(Theme); Theme();
    }

    render() { this.innerHTML = `<div id="HomeHead">
        <div id="HomeHeadLeft">
            <div id="HomeHeadTitle" class="fadeChild">
                <iv- fd="0" id='HomeHeadTitle1'></iv-> 
                <iv- fd="150" id='HomeHeadTitle2'></iv->
                <iv- fd="300" id='HomeHeadTitle3'></iv->
            </div>
            <div id="HomeHeadScrollArea" class="fadeChild"><iv- fd="1500" id='HomeHeadScroll'></iv-></div>
        </div>
        <div id="HomeHeadRight">
            <div id="HomeNavigation">
                <iv- fd="600" class="fadeSelf" id="HomeHeadNavigationButton"></iv->
                <iv- fd="600" class="fadeSelf" id="HomeHeadNavigationButtonDesktop"></iv->
                <div id="HomeNavLinks" class="fadeChild">
                    <p fd="650">Annoucement</p>
                    <p fd="675">Gallery & Projects</p>
                    <p fd="700">About me</p>
                    <p fd="725">Branding</p>
                    <p fd="750">Skills & Experience</p>
                    <p fd="775">Also by me</p>
                    <p fd="800">Contact me</p>
                </div>
            </div>
        </div>
    </div>`}
}

customElements.define("home-head", HomeHead);

// -- Gallery --

class HomeGallery extends HTMLElement {
    constructor(){ super(); }

    connectedCallback(){
        this.render();
    }

    render(){
        this.innerHTML = `<div id="HomeGallery">
            <iv- fd="0" class="fadeSelf" id="HomeGalleryTitle"/>
            <iv- fd="0" class="fadeSelf" id="HomeGalleryMobileTitle"/>
        </div>`
    }
}

customElements.define("home-gallery", HomeGallery);