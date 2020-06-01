const ScrollFade = () => {
    const fadeFunc = (node, fadeDelay) => {
        setTimeout(() => {
        node.className += ' faded' }, fadeDelay)
    }
    var fadeChild = document.getElementsByClassName('fadeChild');
    var fadeSelf = document.getElementsByClassName('fadeSelf');
    for(var i=0; i<fadeChild.length; i++) {
        if(fadeChild[i].offsetTop-document.body.scrollHeight < screen.height*0.7){
            childrens = fadeChild[i].childNodes;
            for(j=0; j<childrens.length; j++) { if(childrens[j].nodeName!='#text') {
                fadeFunc(childrens[j],childrens[j].getAttribute('fd'))
            } }
        }
    } for(var i=0; i<fadeSelf.length; i++) {
        if(fadeSelf[i].offsetTop-document.body.scrollTop < screen.height*0.7) {
            fadeFunc(fadeSelf[i],fadeSelf[i].getAttribute('fd'));
        }
    }
}