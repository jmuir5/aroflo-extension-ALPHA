//calendar quick info 
window.addEventListener("load", async()=>{
    var jobs = []
    var columns = []
    
    
    while(true){
        //get positions, get jobs, sort jobs, count, display
        while(document.getElementById("aagBox")||document.getElementsByClassName("fc-event-inner fc-event-skin").length ==0||document.getElementsByTagName("h2")<5){//document.getElementsByClassName("walkme-icon-root-Launcher-39973 walkme-not-embed walkme-launcher-container walkme-launcher-container-id-39973").length==0){
            await new Promise(r => setTimeout(r, 10));
            //console.log("nothing to do")
        }
        var day =document.getElementsByTagName("h2")[4].childNodes[0].textContent.split(",")[0]//document.getElementsByClassName("walkme-icon-root-Launcher-39973 walkme-not-embed walkme-launcher-container walkme-launcher-container-id-39973")[0].parentElement.childNodes[0].textContent.split(",")[0]        
        if(day == "Friday"){
        }

        var frame = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
        var dict = [["David Miles", 8, 0, -1], ["Dylan Miles", 8, 0, -1], ["Tony Scalone", 8, 0, -1], ["Ron Richards", 8, 0, -1], ["Pavel Guba", 8, 0, -1], 
                    ["Luiz Santana", 8, 0, -1], ["Mark Reardon", 8, 0, -1], ["Sam Hornsey", 8, 0, -1], ["Douglas Herbert", 8, 0, -1]]
        jobs = document.getElementsByClassName("fc-event-inner fc-event-skin")

        var ccol = 0
        var index0 = -1
        for (let i = 0; i < jobs.length; i++) {
            
            if(ccol!=jobs[i].getBoundingClientRect().x){
                

                index0 +=1
                ccol = jobs[i].getBoundingClientRect().x
                frame[index0][3]=jobs[i].parentNode.offsetTop
                frame[index0][4]=jobs[i].parentNode.offsetLeft


            }
            //skip over ad hoc events
            /*if (jobs[i].childNodes[1].style.backgroundColour=rgb(255,153,0)) continue
            else{
                frame[index0][0]+=1
            }*/
            frame[index0][0]+=1
            jobs[i].parentNode.style.top = jobs[i].parentNode.offsetTop + 20+"px"
            
            
        }

        var techlist = document.getElementsByClassName("fc-resourceName fc-col-res ui-widget-header")
        if (techlist.length==0) {
            techlist = document.getElementsByClassName("fc- fc-col-res ui-widget-header")
        }
        var offset = 0 
        breakpoint:
        for (let i = 0; i < techlist.length/2; i++) {
            var indexAbs = -1
            var currentLowestAbs = 9999
            
            for (let j = 0; j < frame.length; j++) {
                
                if(Math.abs(techlist[i].offsetLeft - frame[j][4])<currentLowestAbs&&Math.abs(techlist[i].offsetLeft - frame[j][4])>0){
                    currentLowestAbs = Math.abs(techlist[i].offsetLeft - frame[j][4])
                    indexAbs = i
                    if(currentLowestAbs<50){
                        for (let k = 0; k < dict.length; k++) {
                            if(techlist[i].title==dict[k][0]){
                                dict[k][3] = indexAbs-offset;
                                continue breakpoint
                            }
                            
                            else if(techlist[i].childNodes[1].childNodes[1].title==dict[k][0]){
                                dict[k][3] = indexAbs-offset;
                                continue breakpoint
                            }
                            
                        }
                    
                    }
                }
                
                
            } 
            offset+=1
        }
        
        //console.log("test marker")
        //console.log(techlist)
        //console.log(frame)
        //console.log(dict)
        
        
        var bigBox = jobs[0].parentNode.parentNode
        for (let i = 0; i < techlist.length/2; i++) {
            for (let j = 0; j < dict.length; j++) {
                if(i==dict[j][3]){
                    var container=document.createElement('div')
                    var totalText = document.createElement("p")

                    totalText.innerText= "Timeslots: "+(frame[i][0])+"/"+dict[j][1]
                    totalText.style.marginTop = "0px"
                    totalText.style.marginBottom = "0px"
                    if((frame[i][0])<dict[j][1])totalText.style.color ="blue"
                    else if((frame[i][0])==dict[j][1])totalText.style.color ="green"
                    else totalText.style.color ="red"

                    
                    container.style.position = "absolute"
                    container.style.top = frame[i][3]+"px"
                    container.style.left = frame[i][4]+"px"

                    container.id = "aagBox"

                    container.appendChild(totalText)

                    if(!frame[i][3]==0)bigBox.appendChild(container)
                    //console.log("technician: "+dict[j][0])
                    //console.log(frame[i][4])
                    
                    break
                }
            }


            //techlist[i+techlist.length/2].childNodes[1].childNodes[3].innerText = "testing\ntesting\ntesting\ntesting\n"
            //techlist[i+techlist.length/2].setAttribute("height", 100)
        }
        //console.log("finished")

        
        
    }
})