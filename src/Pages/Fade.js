export const ScrollFade = () => {
    var prntList = document.getElementsByClassName('fade');
    var prcld = prntList.length;
    var list = Array(...prntList); 
    console.log(list)
    list.push(...document.getElementsByClassName('fdr'));
    for(var i=0;i<list.length;i++){
        if(list[i].getBoundingClientRect().top+list[i].offsetHeight/2<document.body.offsetHeight*0.9){
            var j = list[i];
            var cl=(j,r)=> { 
                setTimeout(()=>{
                    if(r) {
                        if(!j.classList.contains('pf')){ j.setAttribute('class',j.classList.length===0 ? 'pf' : j.getAttribute('class')+' pf')
                        for(var i=0;i<j.childNodes.length;i++){
                            var sAfC=(e,d)=>{ setTimeout(()=>{
                                e.setAttribute('class',e.classList.length===0 ? 'faded' : e.getAttribute('class')+' faded');
                            },d)}
                            sAfC(j.childNodes[i],j.childNodes[i].getAttribute('fd'));
                        }}
                    } else { if(!j.classList.contains('faded')){ 
                        var sAfR=(e,d)=>{ setTimeout(()=>{
                            e.setAttribute('class',e.classList.length===0 ? 'faded' : e.getAttribute('class')+' faded');
                        },d)}
                        sAfR(j,j.getAttribute('fd'));
                    }}
                }, 500 )}   
            cl(j,i<prcld);
        }
    }
}
