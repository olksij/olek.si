export const ScrollFade = () => {
    var list = document.getElementsByClassName('fade');
    for(var i=0;i<list.length;i++){
        if(list[i].getBoundingClientRect().top+list[i].offsetHeight/2<document.body.offsetHeight*0.9){
            var j = list[i];
            var cl=(j)=> {
                setTimeout(
                    ()=>{
                        if(!j.classList.contains('pf')){ j.setAttribute('class',j.classList.length===0 ? 'pf' : j.getAttribute('class')+' pf')
                        for(var i=0;i<j.childNodes.length;i++){
                            var sAfC=(e,d)=>{
                                setTimeout(()=>{
                                    e.setAttribute('class',e.classList.length===0 ? 'faded' : e.getAttribute('class')+' faded');
                                },d)
                            }
                            sAfC(j.childNodes[i],j.childNodes[i].getAttribute('fadeDelay'));
                        }}},
                    500
                )    
            }   
            cl(j);
        }
    }
}
