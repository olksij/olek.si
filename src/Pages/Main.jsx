import React from 'react';
import ImportVector from '../Assets/Vectors';
import HeadBg from '../Assets/HomeHeadBg.png';
const de = r => { return document.getElementById(r) }

var HeadNavFocus = false; var HeadNavExpanded = false;

class Head extends React.Component { 
    componentDidMount(){
        var ViewMobile=window.innerWidth<700?true:false;
        if (window.innerWidth < 700) { 
            de('HomeNavLinks').style.opacity = 0; de('BlurImage').style.opacity = 0; HeadNavFocus=false; de('HomeHeadLeft').style.opacity=1;
            de('HomeHeadLeft').style.filter = 'blur(0px)'; setTimeout(() => { de('HomeNavLinks').style.display = 'block' },500) }
        
        const pageScroll=()=>{if(!HeadNavFocus)
            de('BlurImage').style.opacity=(document.scrollingElement.scrollTop<document.body.offsetHeight/2)?0:1}

        const pageResize = () => {
            if(window.innerWidth<700 & !ViewMobile){
                de('HomeNavLinks').style.opacity = 0; ViewMobile=true;
                de('HomeNavLinks').style.display = 'none'; HeadNavFocus = false;
            } else if(window.innerWidth>=700 & ViewMobile) {
                ViewMobile=false; de('HomeNavLinks').style.display = 'block';
                de('HomeNavLinks').style.opacity = 1; de('HomeHeadLeft').style.filter = 'blur(0px)';
                de('BlurImage').style.opacity = 0; HeadNavFocus=false; de('HomeHeadLeft').style.opacity=1;
            }
        }

        window.addEventListener('scroll', pageScroll); pageScroll();
        window.addEventListener('resize', pageResize); pageResize();

        de('HomeHeadRight').addEventListener('mouseenter',() => { if ( window.innerWidth >= 700 ) {
            de('HomeHeadLeft').style.filter = 'blur('+(window.innerWidth*document.body.offsetHeight)**0.5/10+'px)';
            de('BlurImage').style.opacity = 1;
            HeadNavFocus=true; }
        })

        de('HomeHeadRight').addEventListener('mouseleave',() => { if ( window.innerWidth >= 700 ) {
            de('HomeHeadLeft').style.filter = 'blur(0px)'
            de('BlurImage').style.opacity = 0;
            HeadNavFocus=false; }
        })
        
        de('HomeHeadNavigationButton').addEventListener('click',() => { if (window.innerWidth < 700) { 
            if (!HeadNavExpanded) { HeadNavExpanded=true; de('HomeNavLinks').style.opacity = 1; de('HomeHeadLeft').style.opacity=0.6;
                de('HomeHeadLeft').style.filter = 'blur('+(window.innerWidth*document.body.offsetHeight)**0.5/5+'px)';
                de('BlurImage').style.opacity = 1; de('HomeNavLinks').style.display = 'block'; HeadNavFocus=true; } 

            else { HeadNavExpanded=false; de('HomeNavLinks').style.opacity = 0;
                de('HomeHeadLeft').style.filter = 'blur(0px)'; setTimeout(() => { de('HomeNavLinks').style.display = 'none' },500)
                de('BlurImage').style.opacity = 0; HeadNavFocus=false; de('HomeHeadLeft').style.opacity=1;
            }
        }})
    }

    render(){return( <div id="HomeHead">
        <div id="HomeHeadLeft">
            <ImportVector i='HomeHeadTitle'/> 
            <div id="HomeHeadScrollArea"><ImportVector i='HomeHeadScroll'/></div>
        </div>
        <div id="HomeHeadRight">
            <div id="HomeNavigation">
                <ImportVector i="HomeHeadNavigationButton"/>
                <ImportVector i="HomeHeadNavigationButtonDesktop"/>
                <div id="HomeNavLinks">
                    <p>Annoucement</p>
                    <p>Gallery & Projects</p>
                    <p>About me</p>
                    <p>Branding</p>
                    <p>Skills & Experience</p>
                    <p>Also by me</p>
                    <p>Contact me</p>
                </div>
            </div>
        </div>
        <div id="hey"></div>
    </div>);}
}

function Projects(){
    return(
        <div id="HomeProjects">
            <div id="HomeProjectsLeft">COMING SOON
            </div>
        </div>
    )
}

export default function Home(){
    return(
        <div id="HomePage" className="Page">
            <img id="BgImage" src={HeadBg}></img>
            <img id="BlurImage" src={HeadBg}></img>
            <Head/>
            <Projects/>
        </div>
    );
}