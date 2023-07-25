//change view to open in new tab not open in new window, assign tech on job creation from calendar, resets
window.addEventListener("load", async()=>{
    var check1=0
    var check2=0
    while(true){
        //change view to open in new tab not open in new window
        if(document.getElementsByClassName("afBtn afBtn__fill afBtn--small af-primary btnViewDetails")[0]&&document.getElementsByClassName("afBtn afBtn__fill afBtn--small af-primary btnViewDetails")[0].style.display!='none'&&check1==0){
            var newButton = document.createElement('span')
            var newImage = document.createElement('img')
            var button = document.getElementsByClassName("afBtn afBtn__fill afBtn--small af-primary btnViewDetails")[0]
            
            newButton.classList = button.classList

            newImage.src = "/ims/images/page_white_magnify.png"
            newImage.style = "border:none;"
            newImage.align = "absmiddle"
            newButton.appendChild(newImage)
            newButton.appendChild(document.createTextNode(button.innerText))
            newButton.id=button.id
            
            
            var link = "https://office.aroflo.com"+button.getAttribute("href")
            newButton.addEventListener("click", async()=>{
                window.open(link, '_blank')
            })
            
            button.removeAttribute("href")
            button.parentElement.appendChild(newButton)
            button.remove()
            check1=1
        }
        //reset above^
        if(!document.getElementsByClassName("afBtn afBtn__fill afBtn--small af-primary btnViewDetails")[0]&&check1==1) check1=0
        //assign technicnians on creation
        if(document.getElementById("btnCreateTask")&&check2==0){
            document.getElementById("btnCreateTask").addEventListener("click", async() => {
                while(!document.getElementById("btnAssignResources")){
                    await new Promise(r => setTimeout(r, 10));
                    console.log("waiting for button")
                }
                document.getElementById("btnAssignResources").click()
                var initHead = document.getElementsByClassName("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix")[2].children[0].innerText
                
                while(document.getElementsByClassName("ui-jqgrid-btable")[0].children[0].children.length<=1){
                    await new Promise(r => setTimeout(r, 10));
                    console.log("waiting for asign to load")
                }
                var assignList = document.getElementsByClassName("ui-jqgrid-btable")[0].children[0].children
                var counter = 0
                for(let i = 0; i < assignList.length; i++){
                    if(counter==1)break
                    if(document.getElementsByClassName("handCursor schedSelectedResource canDisable")[0].innerText==assignList[i].children[3].innerText){
                        assignList[i].click()
                        counter+=1
                    }
                }
                
                while(document.getElementsByClassName("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix")[2].children[0].innerText==initHead){
                    await new Promise(r => setTimeout(r, 10));
                    console.log("waiting for asign to load")
                }
                console.log(document.getElementsByClassName("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix")[2].children[0].innerText)
                document.getElementById("btnSelect").click()
            })
            check2=1
        }
        //reset above^
        if(!document.getElementById("btnCreateTask")&&check2==1)check2=0


        await new Promise(r => setTimeout(r, 10));
    }
})