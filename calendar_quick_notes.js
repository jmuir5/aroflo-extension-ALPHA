//cancel quick notes execution
window.addEventListener('load', async() => {
    chrome.storage.sync.get("CancelTag", async ({ CancelTag }) => {
        if(CancelTag>0){
            while(!document.getElementsByClassName("afTextfield__display--small schRefJobNo")[0]||!document.getElementsByClassName("afBtn afBtn__fill afBtn--small af-warn schedule__delete canDisable")[0]){
                await new Promise(r => setTimeout(r, 10));
                console.log("waiting for job number")
            }
            var text = document.getElementsByClassName("afTextfield__display--small schRefJobNo")[0].innerText.split(' ')
            console.log("got job number")
            console.log("cancel tag:"+CancelTag)
            console.log("job number:"+ text[text.length-1])
            if(CancelTag == text[text.length-1]){
                var cancelButtons = document.getElementsByClassName("afBtn afBtn__fill afBtn--small af-warn schedule__delete canDisable")
                for (let i = 0; i < cancelButtons.length; i++) {
                    cancelButtons[0].click()
                    await new Promise(r => setTimeout(r, 100));
                }
                document.getElementById("btnDoneScheduleDetails").click()
                while(document.getElementsByClassName("ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable ui-resizable").length>0){
                    await new Promise(r => setTimeout(r, 10));
                    console.log("waiting for job sheet close")
                }
                chrome.storage.sync.set({ CancelTag: 0})
                window.close();
            }
        }
    })

})