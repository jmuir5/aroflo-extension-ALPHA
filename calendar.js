//calendar quick info 
window.addEventListener("load", async()=>{
    //var dict = [["Peter Traish (8)", 4, 4, -1], ["Leo Oh (8)", 4, 4, -1], ["Sandy Adhikari", 3, 3, -1], ["Eduardo Chiovato (6)", 3, 3, -1], ["John Sleap (8)", 8, 0, -1], ["Otavio Palharini (6)", 3, 3, -1],
      //              ["Gee Cruz (6)", 4, 2, -1], ["Leonardo Freitas (6)", 4, 2, -1], ["Tulio Pereira", 3, 3, -1], ["Ozgur Aytemur (6)", 3, 3, -1], ["Phill Poustie (6)", 3, 3, -1], 
        //            ["Dart Carvalho (6)", 2, 2, -1], ["Matt Gillard (6)", 3, 3, -1] ]
    var jobs = []
    var columns = []
    
    
    while(true){
        //get positions, get jobs, sort jobs, count, display
        while(document.getElementById("aagBox")||document.getElementsByClassName("fc-event-inner fc-event-skin").length ==0||document.getElementsByTagName("h2")<5){//document.getElementsByClassName("walkme-icon-root-Launcher-39973 walkme-not-embed walkme-launcher-container walkme-launcher-container-id-39973").length==0){
            await new Promise(r => setTimeout(r, 10));
            //console.log("nothing to do")
        }
        var day =document.getElementsByTagName("h2")[4].childNodes[0].textContent.split(",")[0]//document.getElementsByClassName("walkme-icon-root-Launcher-39973 walkme-not-embed walkme-launcher-container walkme-launcher-container-id-39973")[0].parentElement.childNodes[0].textContent.split(",")[0]        
        var dart = ["Dart Carvalho", 0, 0, -1]//2,2
        var matt = ["Matt Gillard", 4, 4, -1]
        if(day == "Friday"){
            dart = ["Dart Carvalho", 0, 0, -1]//3,3
            matt = ["Matt Gillard", 0, 0, -1]
        }

        var frame = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
        var dict = [["Peter Traish", 4, 4, -1], ["Leo Oh", 4, 3, -1], ["Sandy Adhikari", 4, 4, -1], ["Eduardo Chiovato", 3, 3, -1], ["John Sleap", 8, 0, -1], 
                    ["Otavio Palharini", 4, 4, -1], ["Gee Cruz", 4, 4, -1], ["Tulio Pereira", 4, 4, -1], ["Vini Moura", 4, 3, -1], ["Ozgur Aytemur", 4, 4, -1], ["Phill Poustie", 4, 4, -1], 
                    dart, matt ]
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
            if(jobs[i].innerText.includes("8:30a")){
                frame[index0][0]+=1
                
            }
            else if(jobs[i].innerText.includes("12:30p")){
                frame[index0][1]+=1
                
            }
            else{
                frame[index0][2]+=1
                
            }
            jobs[i].parentNode.style.top = jobs[i].parentNode.offsetTop + 60+"px"
            
            
        }
        //console.log(frame)

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
                //console.log("tech "+i+" distance from frame "+j)
                //console.log(Math.abs(techlist[i].offsetLeft - frame[j][4]))
                
                if(Math.abs(techlist[i].offsetLeft - frame[j][4])<currentLowestAbs&&Math.abs(techlist[i].offsetLeft - frame[j][4])>0){
                    currentLowestAbs = Math.abs(techlist[i].offsetLeft - frame[j][4])
                    indexAbs = i
                    if(currentLowestAbs<50){
                        //dict[i][3]= indexAbs
                        for (let k = 0; k < dict.length; k++) {
                            if(techlist[i].title==dict[k][0]){
                                dict[k][3] = indexAbs-offset;
                                //console.log("i think "+techlist[i].title+" corresponds to frame "+j+" and dict entry "+k)
                                continue breakpoint
                            }
                            
                            else if(techlist[i].childNodes[1].childNodes[1].title==dict[k][0]){
                                dict[k][3] = indexAbs-offset;
                                //console.log("i think "+techlist[i].childNodes[1].childNodes[1].title+" corresponds to frame "+j+" and dict entry "+k)
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
                    var amText = document.createElement("p")
                    var pmText = document.createElement("p")
                    var anyText = document.createElement("p")
                    var totalText = document.createElement("p")
                    

                    amText.innerText = "AM: "+frame[i][0]+"/"+dict[j][1]
                    amText.style.marginTop = "0px"
                    amText.style.marginBottom = "0px"
                    if(frame[i][0]<dict[j][1])amText.style.color ="blue"
                    else if(frame[i][0]==dict[j][1])amText.style.color ="green"
                    else amText.style.color ="red"
                    
                    pmText.innerText = "PM: "+frame[i][1]+"/"+dict[j][2]
                    pmText.style.marginTop = "0px"
                    pmText.style.marginBottom = "0px"
                    if(frame[i][1]<dict[j][2])pmText.style.color ="blue"
                    else if(frame[i][1]==dict[j][2])pmText.style.color ="green"
                    else pmText.style.color ="red"

                    anyText.innerText = "ANY: "+frame[i][2]
                    anyText.style.marginTop = "0px"
                    anyText.style.marginBottom = "0px"
                    anyText.style.color = "#DAA520"

                    totalText.innerText= "TOTAL:"+(frame[i][0]+frame[i][1]+frame[i][2])+"/"+(dict[j][1]+dict[j][2])
                    totalText.style.marginTop = "0px"
                    totalText.style.marginBottom = "0px"
                    if((frame[i][0]+frame[i][1]+frame[i][2])<(dict[j][1]+dict[j][2]))totalText.style.color ="blue"
                    else if((frame[i][0]+frame[i][1]+frame[i][2])==(dict[j][1]+dict[j][2]))totalText.style.color ="green"
                    else totalText.style.color ="red"

                    
                    container.style.position = "absolute"
                    container.style.top = frame[i][3]+"px"
                    container.style.left = frame[i][4]+"px"

                    container.id = "aagBox"

                    container.appendChild(amText)
                    container.appendChild(pmText)
                    container.appendChild(anyText)
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