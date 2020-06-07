const de = r => { return document.getElementById(r) }
const ds = (n,v) => { return document.documentElement.style.setProperty(n,v); }

// -- Head --
customElements.define("home-head", class extends HTMLElement{ constructor() { super(); }

    connectedCallback() { this.render();
        var HeadNavFocus = false; var HeadNavExpanded = false; var ViewMobile = window.innerWidth < 700 ? true:false;
        document.scrollingElement.style.scrollBehavior='smooth';

        // Check if mobile
        if (window.innerWidth < 700) { 
            ds('--HomeNavOpacity', 0); HeadNavFocus=false; de('HomeHeadLeft').style.opacity=1;
            de('HomeHeadLeft').style.filter = 'blur(0px)'; 
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
                de('HomeHeadLeft').style.opacity=1;
            }
        }      

        // -- NavigationPaneAnimation Desktop

        de('HomeHeadRight').addEventListener('mouseenter',() => { if ( window.innerWidth >= 700 ) {
            de('HomeHeadLeft').style.filter = 'blur('+(window.innerWidth*document.body.offsetHeight)**0.5/10+'px)';
            de('HomeHeadLeft').style.opacity=0.5;
            HeadNavFocus=true; document.scrollingElement.scrollTop='0px'; }
        })

        de('HomeHeadRight').addEventListener('mouseleave',() => { if ( window.innerWidth >= 700 ) {
            de('HomeHeadLeft').style.filter = 'blur(0px)'
            HeadNavFocus=false; de('HomeHeadLeft').style.opacity=1; }
        })
        
        // -- NavigationPaneAnimation Mobile

        de('HomeHeadNavigationButton').addEventListener('click',() => { if (window.innerWidth < 700) { 
            if (!HeadNavExpanded) { HeadNavExpanded=true; ds('--HomeNavOpacity', 1); de('HomeHeadLeft').style.opacity=0.6;
                de('HomeHeadLeft').style.filter = 'blur('+(window.innerWidth*document.body.offsetHeight)**0.5/5+'px)';
                HeadNavFocus=true; de('HomeNavLinks').style.opacity = 1} 

            else { HeadNavExpanded=false; de('HomeNavLinks').style.opacity = 0;
                de('HomeHeadLeft').style.filter = 'blur(0px)';
                HeadNavFocus=false; de('HomeHeadLeft').style.opacity=1;
            }
        }})

        window.addEventListener('resize', pageResize); pageResize();
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
        <div class="section-separator"></div>
    </div>`}
} );

// -- Gallery --

customElements.define("home-featured", class extends HTMLElement { constructor(){ super(); }

    connectedCallback(){ this.render(); }

    render(){
        this.innerHTML = `<div id="HomeFeatured">
            <div id="HomeFeaturedLeft">
                <div id="HomeFeaturedTitle" class="fadeChild">
                    <iv- fd="0" id='HomeFeaturedSubtitle'></iv-> 
                    <iv- fd="0" id='HomeFeaturedTitle1'></iv-> 
                    <iv- fd="0" id='HomeFeaturedTitle2'></iv-> 
                    <iv- fd="0" id='HomeFeaturedTitle3'></iv-> 
                </div>
            </div>
        </div>`
    }
} );

