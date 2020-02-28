import React from 'react';
import HeadBgSrcLight from '../Assets/HomeBgLight.png';
import HeadBgSrcDark from '../Assets/HomeBgDark.png';
import ImportVector from '../Assets/Vectors';
import { ScrollFade } from './Fade';
const de = r => { return document.getElementById(r) }
const ds = (n,v) => { return document.documentElement.style.setProperty(n,v); }

var HeadNavFocus = false; var HeadNavExpanded = false;

class Head extends React.Component { 
    componentDidMount(){
        var ViewMobile=window.innerWidth<700?true:false;
        if (window.innerWidth < 700) { 
            ds('--HomeNavOpacity', 0); de('BlurImage').style.opacity = 0; HeadNavFocus=false; de('HomeHeadLeft').style.opacity=1;
            de('HomeHeadLeft').style.filter = 'blur(0px)'; setTimeout(() => { /*de('HomeNavLinks').style.display = 'block'*/ },500) }
        
        const pageScroll=()=>{ ScrollFade(); if(!HeadNavFocus)
            de('BlurImage').style.opacity=(document.scrollingElement.scrollTop<document.body.offsetHeight/2)?0:1}

        const pageResize = () => {
            if(window.innerWidth<700 & !ViewMobile){
                ds('--HomeNavOpacity', 0); ViewMobile=true; de('HomeNavLinks').style.opacity=0
                /*de('HomeNavLinks').style.display = 'none';*/ HeadNavFocus = false;
            } else if(window.innerWidth>=700 & ViewMobile) {
                ViewMobile=false; /*de('HomeNavLinks').style.display = 'block';*/
                ds('--HomeNavOpacity', 1); de('HomeHeadLeft').style.filter = 'blur(0px)'; de('HomeNavLinks').style.opacity=1
                de('BlurImage').style.opacity = 0; HeadNavFocus=false; de('HomeHeadLeft').style.opacity=1;
            }
        }

        window.addEventListener('scroll', pageScroll); pageScroll();
        window.addEventListener('resize', pageResize); pageResize();

        de('HomeHeadRight').addEventListener('mouseenter',() => { if ( window.innerWidth >= 700 ) {
            de('HomeHeadLeft').style.filter = 'blur('+(window.innerWidth*document.body.offsetHeight)**0.5/10+'px)';
            de('BlurImage').style.opacity = 1; de('BgImage').style.opacity = 0;
            HeadNavFocus=true; }
        })

        de('HomeHeadRight').addEventListener('mouseleave',() => { if ( window.innerWidth >= 700 ) {
            de('HomeHeadLeft').style.filter = 'blur(0px)'
            de('BlurImage').style.opacity = 0; de('BgImage').style.opacity = 1;
            HeadNavFocus=false; }
        })
        
        de('HomeHeadNavigationButton').addEventListener('click',() => { if (window.innerWidth < 700) { 
            if (!HeadNavExpanded) { HeadNavExpanded=true; ds('--HomeNavOpacity', 1); de('HomeHeadLeft').style.opacity=0.6;
                de('HomeHeadLeft').style.filter = 'blur('+(window.innerWidth*document.body.offsetHeight)**0.5/5+'px)';
                de('BlurImage').style.opacity = 1; /*de('HomeNavLinks').style.display = 'block';*/ HeadNavFocus=true; de('HomeNavLinks').style.opacity = 1} 

            else { HeadNavExpanded=false; de('HomeNavLinks').style.opacity = 0;
                de('HomeHeadLeft').style.filter = 'blur(0px)'; setTimeout(() => { /*de('HomeNavLinks').style.display = 'none'*/ },500)
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
            <div id="HomeNavigation">
                <ImportVector fd="600" cls="fdr" i="HomeHeadNavigationButton"/>
                <ImportVector fd="600" cls="fdr" i="HomeHeadNavigationButtonDesktop"/>
                <div id="HomeNavLinks" className="fade">
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
            document.getElementById('BgImage').setAttribute('class','loaded');
        }
    }

    render(){ return( <div id="HomePage" className="Page">
        <div id="HeadBgDiv">
        <img id="BgImage" src={window.matchMedia('(prefers-color-scheme: dark)').matches?HeadBgSrcDark:HeadBgSrcLight} alt=""></img>
        <img id="BlurImage" src={window.matchMedia('(prefers-color-scheme: dark)').matches?HeadBgSrcDark:HeadBgSrcLight} alt=""></img>
        </div>
        <Head/>
        <Projects/>
    </div> );}
}