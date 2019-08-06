var SSIDs1 = new Array('PSProjectsBar','PSPBScrollRight','PSPBScrollLeft');

function Scroll(a) { location.hash="#TopSlide"; location.hash=a; }

function Start(){ 
    CSB('!',SSIDs1);
    Resize(); 
}

function CSB(a,SSID) {
    if ( a == '!' ){ /*CSBA(SSID[0],SSID[1],SSID[2],document.getElementById(SSID[0]).scrollLeft);*/ }
    else {
        var SSFV = document.getElementById(SSID[0]).scrollLeft;
        if (a=='R') { SSFV += document.getElementById('body').offsetWidth/1.5; } else { SSFV -= document.getElementById('body').offsetWidth/1.5; }  
        if (SSFV < 0) { SSFV = 0 } else if ( SSFV > (document.getElementById(SSID[0]).scrollWidth - document.getElementById(SSID[0]).clientWidth)) { SSFV = document.getElementById(SSID[0]).scrollWidth - document.getElementById(SSID[0]).clientWidth }
        CSBA(SSID[0],SSID[1],SSID[2],SSFV); document.getElementById(SSID[0]).scrollLeft = SSFV;
    }
}

function CSBA(BarID,SRightID,SLeftID,FTSLP) {
    if (document.getElementById('body').offsetWidth < document.getElementById(BarID).scrollWidth) {
        if (FTSLP == 0) {
            document.getElementById(SRightID).style.opacity = '1';
            document.getElementById(SRightID).style.zIndex = '2';
            document.getElementById(SLeftID).style.opacity = '0';
            document.getElementById(SLeftID).style.zIndex = '0';
        } else if ((document.getElementById(BarID).scrollWidth - document.getElementById('body').offsetWidth) == FTSLP) {
            document.getElementById(SRightID).style.opacity = '0';
            document.getElementById(SRightID).style.zIndex = '0';
            document.getElementById(SLeftID).style.opacity = '1';
            document.getElementById(SLeftID).style.zIndex = '2';
        } else {
            document.getElementById(SRightID).style.opacity = '1';
            document.getElementById(SRightID).style.zIndex = '2';
            document.getElementById(SLeftID).style.opacity = '1';
            document.getElementById(SLeftID).style.zIndex = '2';
        }
    } else {
        document.getElementById(SRightID).style.opacity = '0';
        document.getElementById(SRightID).style.zIndex = '0';
        document.getElementById(SLeftID).style.opacity = '0';
        document.getElementById(SLeftID).style.zIndex = '0';
    }
}

function Resize() { /*CSB('!',SSIDs1);*/ 
    if (document.getElementById('body').offsetWidth > document.getElementById('body').offsetHeight/95*100) {
        document.getElementById("TSBGI").style.left = (0 - document.getElementById('body').offsetWidth/4)+'px';
        document.getElementById("TSBGI").style.width = document.getElementById('body').offsetWidth+'px';
        document.getElementById("TSBGI").style.height = (document.getElementById('body').offsetWidth/100*95)+'px';
    } else {
        document.getElementById("TSBGI").style.width = (document.getElementById('body').offsetHeight/95*100)+'px';
        document.getElementById("TSBGI").style.height = document.getElementById('body').offsetHeight+'px';
        document.getElementById("TSBGI").style.left = ((document.getElementById('body').offsetWidth-document.getElementById("TSBGI").offsetWidth)/2)+'px';
    }
    document.getElementById("TSBGI").style.top = ((document.getElementById('body').offsetHeight-document.getElementById("TSBGI").style.height.slice(0,document.getElementById("TSBGI").style.height.length-2))/2);
}
