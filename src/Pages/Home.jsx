import React from 'react';
import HeadBgSrc from '../Assets/HomeHeadBg.png';
import ImportVector from '../Assets/Vectors';
import { ScrollFade } from './Fade';
const de = r => { return document.getElementById(r) }

var HeadNavFocus = false; var HeadNavExpanded = false;
var HeadBg = new Image();
HeadBg.src = HeadBgSrc;
HeadBg.style.opacity=0;


class Head extends React.Component { 
    componentDidMount(){
        var ViewMobile=window.innerWidth<700?true:false;
        if (window.innerWidth < 700) { 
            de('HomeNavLinks').style.opacity = 0; de('BlurImage').style.opacity = 0; HeadNavFocus=false; de('HomeHeadLeft').style.opacity=1;
            de('HomeHeadLeft').style.filter = 'blur(0px)'; setTimeout(() => { de('HomeNavLinks').style.display = 'block' },500) }
        
        const pageScroll=()=>{ ScrollFade(); if(!HeadNavFocus)
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
            <div id="HomeHeadTitle" className="fade">
                <ImportVector fd="0" i='HomeHeadTitle1'/> 
                <ImportVector fd="150" i='HomeHeadTitle2'/> 
                <ImportVector fd="300" i='HomeHeadTitle3'/> 
            </div>
            <div id="HomeHeadScrollArea" className="fade"><ImportVector fd="1500" i='HomeHeadScroll'/></div>
        </div>
        <div id="HomeHeadRight">
            <div id="HomeNavigation" className="fade">
                <ImportVector fd="600" i="HomeHeadNavigationButton"/>
                <ImportVector fd="600" i="HomeHeadNavigationButtonDesktop"/>
                <div id="HomeNavLinks" className="fade">
                    <p fadeDelay="625">Annoucement</p>
                    <p fadeDelay="650">Gallery & Projects</p>
                    <p fadeDelay="675">About me</p>
                    <p fadeDelay="700">Branding</p>
                    <p fadeDelay="725">Skills & Experience</p>
                    <p fadeDelay="750">Also by me</p>
                    <p fadeDelay="775">Contact me</p>
                </div>
            </div>
        </div>
        <div id="hey"></div>
    </div>);}
}

function Projects(){
    return(
        <div id="HomeProjects" className="fade">
            <div id="HomeProjectsLeft">COMING SOON
            </div>
        </div>
    )
}

export default class Home extends React.Component{
    componentDidMount(){
        document.getElementById('BgImage').onload = () => {
            document.getElementById('BgImage').style.opacity=1;
        }
    }

    render(){ return( <div id="HomePage" className="Page">
        <div id="HeadBgDiv">
        <img id="BgImage" src={HeadBgSrc} alt=""></img>
        <img id="BlurImage" src={HeadBgSrc} alt=""></img>
        </div>
        <Head/>
        <Projects/>
    </div> );}
}