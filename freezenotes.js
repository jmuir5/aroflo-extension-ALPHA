window.addEventListener("load", async()=>{
    console.log("yep")
    var showHideBtn = document.getElementsByClassName("afBtn--small afBtn__fill lTR is-flex is-flex--full")[0]
    if(showHideBtn){
        showHideBtn.click()
        showHideBtn = document.getElementsByClassName("afBtn--small afBtn__fill lTR is-flex is-flex--full")[0]
        while(document.getElementsByClassName("noteItem ").length==3){
            await new Promise(r => setTimeout(r, 10));
        }
        showHideBtn = document.getElementsByClassName("afBtn--small afBtn__fill lTR is-flex is-flex--full")[0]
        console.log(showHideBtn)
    }
    var ptNotes = document.getElementsByClassName("noteOutput plainText margin-all--0 margin-y--3 margin-left--3")
    var rtfNotes = document.getElementsByClassName("noteOutput itsRichText")
    if(showHideBtn)showHideBtn.click()
    var importantNotes = []
    for (let i = 0; i < ptNotes.length; i++) {
        if(ptNotes[i].innerText.includes("!!!")){
            importantNotes.push(ptNotes[i].parentElement.parentElement.parentElement)
        } 
    }
    var breakpoint = importantNotes.length
    for (let i = 0; i < rtfNotes.length; i++) {
        if(rtfNotes[i].innerHTML.includes("!!!")){
            importantNotes.push(rtfNotes[i].parentElement.parentElement.parentElement)
        } 
    }
    console.log("plain text notes: "+ptNotes.length)
    console.log(ptNotes)
    console.log("rich text notes: "+rtfNotes.length)
    console.log(rtfNotes)
    console.log("important notes: "+importantNotes.length)
    console.log(importantNotes)
    if(importantNotes.length>0){
        var floater = document.getElementsByClassName("afActionBox afActionBox--active afActionBox--contrast afActionBox--multi-action")[0]
        var container=document.createElement('div')
        var header = document.createElement("div")
        var header2 = document.createElement("div")
        var headerTitle = document.createElement("p")
        var headerTitle2 = document.createElement("p")
        var headerClose = document.createElement("a")
        var headerClose2 = document.createElement("span")
        var headerOpen = document.createElement("div")
        var headerOpen2 = document.createElement("div")
        var body = document.createElement("div")

        var height = 0
        
        header.classList.add("ui-dialog-titlebar", "ui-widget-header", "ui-corner-all")
        header2.classList.add("ui-dialog-titlebar", "ui-widget-header", "ui-corner-all", "ui-helper-clearfix")

        headerTitle.innerText = "Important Notes"
        headerTitle.classList.add("ui-dialog-title")

        headerTitle2.innerText = "Important Notes"
        headerTitle2.classList.add("ui-dialog-title")
        
        //close button structure
        headerClose.classList.add("ui-dialog-titlebar-close", "ui-corner-all")
        headerClose.role = "button"
        headerClose2.classList.add("ui-icon", "ui-icon-closethick")
        headerClose2.innerText = "close"
        headerClose.addEventListener("mouseenter", async()=>{
            headerClose.classList.add("ui-state-hover")
        })
        headerClose.addEventListener("mouseleave", async()=>{
            headerClose.classList.remove("ui-state-hover")
        })
        headerClose.addEventListener("click", async()=>{
            header.parentNode.replaceChild(header2, header)
            container.style.top = "0px"
            container.removeChild(body)
        })
        headerClose.appendChild(headerClose2)

        //open button structure
        headerOpen.classList.add("ui-dialog-titlebar-open", "ui-corner-all")
        headerOpen.role = "button"
        headerOpen2.classList.add("ui-icon", "ui-icon-openthick")
        headerOpen2.innerText = "open"
        headerOpen.addEventListener("mouseenter", async()=>{
            headerOpen.classList.add("ui-state-hover")
        })
        headerOpen.addEventListener("mouseleave", async()=>{
            headerOpen.classList.remove("ui-state-hover")
        })
        headerOpen.addEventListener("click", async()=>{
            header2.parentNode.replaceChild(header, header2)
            container.style.top = (height*-1)+50+"px"
            container.appendChild(body)
        })
        headerOpen.appendChild(headerOpen2)    
        
        //header styles
        headerTitle.style.display = "inline-block"
        headerTitle2.style.display = "inline-block"
        headerClose.style.display = "inline-block"
        headerOpen.style.display = "inline-block"
        headerTitle.style.width = "90%"
        headerTitle2.style.width = "90%"
        headerClose.style.width = "WRAP_CONTENT"
        headerOpen.style.width = "WRAP_CONTENT"

        header.appendChild(headerTitle)
        header.appendChild(headerClose)
        
        header2.appendChild(headerTitle2)
        header2.appendChild(headerOpen)


        container.style.width = "600px"
        container.style.position = "absolute"
        container.style.background = "white"
        container.style.left = "500px"
        container.appendChild(header)
        container.appendChild(body)

        //adding notes to container
        for (let i = 0; i < importantNotes.length; i++) {
            var a = document.createElement('div')
            var b = document.createElement('div')
            var c = importantNotes[i].childNodes[1].childNodes[1].childNodes[3]
            var d = importantNotes[i].childNodes[1].childNodes[1].childNodes[5]
            a.innerHTML=c.innerHTML
            b.innerHTML=d.innerHTML
            c.parentNode.replaceChild(a, c);
            d.parentNode.replaceChild(b, d);
            a.style.fontSize = "small"
            b.style.fontSize = "small"
            body.appendChild(importantNotes[i])
        }

        floater.appendChild(container)
        
        for (let i = 0; i < container.childElementCount; i++) {
            height+=container.children[i].offsetHeight        
        }
        
        
        container.style.top = (height*-1)+50+"px"
        console.log(height)

    }
    



})