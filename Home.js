const de = r => { return document.getElementById(r) }
const ds = (n,v) => { return document.documentElement.style.setProperty(n,v); }

customElements.define("home-head", class extends HTMLElement{ constructor() { super(); }

    connectedCallback() { this.render();
        var HeadNavExpanded = false; var ViewMobile = window.innerWidth < 700 ? true:false;
        document.scrollingElement.style.scrollBehavior='smooth';

        if (window.innerWidth < 700) { 
            ds('--HomeNavOpacity', 0); de('HomeHeadLeft').style.opacity=1;
            de('HomeHeadLeft').style.filter = 'blur(0px)'; }

        const pageResize = () => {
            if(window.innerWidth<700 & !ViewMobile) {
                ViewMobile=true;
                ds('--HomeNavOpacity', 0);
                de('HomeNavLinks').style.opacity=0
            } else if (window.innerWidth >=700 & ViewMobile) {
                ViewMobile=false; 
                ds('--HomeNavOpacity', 1); 
                de('HomeHeadLeft').style.filter = 'blur(0px)'; 
                de('HomeNavLinks').style.opacity=1;
                de('HomeHeadLeft').style.opacity=1;
            }
        }      

        // -- NavigationPaneAnimation Desktop

        de('HomeHeadRight').addEventListener('mouseenter',() => { if ( window.innerWidth >= 700 && !de('HomeHead').parentElement.classList.contains('blur')) {
            de('HomeHeadLeft').style.filter = 'blur('+(window.innerWidth*document.body.offsetHeight)**0.5/10+'px)';
            de('HomeHeadLeft').style.opacity=0.5; ScrollTo('HomeHead'); document.body.scrollTop = '0px' }
        })

        de('HomeHeadRight').addEventListener('mouseleave',() => { if ( window.innerWidth >= 700 ) {
            de('HomeHeadLeft').style.filter = 'blur(0px)'
            de('HomeHeadLeft').style.opacity=1; }
        })
        
        // -- NavigationPaneAnimation Mobile

        de('HomeHeadNavigationButton').addEventListener('click',() => { if (window.innerWidth < 700) { 
            if (!HeadNavExpanded) { HeadNavExpanded=true; ds('--HomeNavOpacity', 1); de('HomeHeadLeft').style.opacity=0.6;
                de('HomeHeadLeft').style.filter = 'blur('+(window.innerWidth*document.body.offsetHeight)**0.5/5+'px)';
                de('HomeNavLinks').style.opacity = 1} 

            else { HeadNavExpanded=false; de('HomeNavLinks').style.opacity = 0;
                de('HomeHeadLeft').style.filter = 'blur(0px)';
                de('HomeHeadLeft').style.opacity=1;
            }
        }})

        window.addEventListener('resize', pageResize); pageResize();
    }

    render() { this.innerHTML = `<div id="HomeHead">
        <div id="HomeHeadLeft">
            <div id="HomeHeadTitle" class="fadeChild">
                <iv- fd="0" id='HomeHeadSubtitle'></iv-> 
                <iv- fd="150" id='HomeHeadTitle1'></iv->
                <iv- fd="300" id='HomeHeadTitle2'></iv->
            </div>
            <div id="HomeHeadScrollArea" onclick="ScrollTo('HomeFeatured')"><iv- class="fadeSelf" fs="1" fd="1500" id='HomeHeadScroll'></iv-></div>
        </div>
        <div id="HomeHeadRight">
            <div id="HomeNavigation">
                <iv- fd="600" class="fadeSelf" id="HomeHeadNavigationButton"></iv->
                <iv- fd="600" class="fadeSelf" id="HomeHeadNavigationButtonDesktop"></iv->
                <div id="HomeNavLinks" class="fadeChild">
                    <p fd="750" onclick="ScrollTo('HomeFeatured')">Featured</p>
                    <p fd="775" onclick="ScrollTo('HomeFeatured')">By me</p>
                    <p fd="800" onclick="ScrollTo('HomeFeatured')">About me</p>
                    <p fd="825" onclick="ScrollTo('HomeFeatured')">Branding</p>
                    <p fd="850" onclick="ScrollTo('HomeFeatured')">Contact me</p>
                </div>
            </div>
        </div>
        <div class="section-separator"></div>
    </div>`}
} );

customElements.define("home-featured", class extends HTMLElement { constructor(){ super(); }
    connectedCallback(){ this.render(); }

    render(){
        this.innerHTML = `<div id="HomeFeatured">
        <div id="HomeFeaturedBg"></div>
            <div id="HomeFeaturedLeft">
                <div id="HomeFeaturedTitle" class="fadeChild">
                    <iv- fd="0" id='HomeFeaturedSubtitle'></iv-> 
                    <iv- fd="125" id='HomeFeaturedTitle1'></iv-> 
                    <iv- fd="250" id='HomeFeaturedTitle2'></iv-> 
                    <iv- fd="375" id='HomeFeaturedTitle3'></iv-> 
                </div>
            </div>
        </div>`
    }
} );

