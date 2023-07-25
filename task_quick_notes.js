//enquirey buttons, cancel buttons, assign button
window.addEventListener('load', async() => {
    
    while(!document.getElementsByClassName("afNoteWidget__header margin-top--2")[0]||!document.getElementsByClassName("pageViewTask__signature")[0]){
        await new Promise(r => setTimeout(r, 10));
    }
    const noteBar = document.getElementsByClassName("afNoteWidget__header margin-top--2")[0]
    //common cust enquirey buttons buttons
    var custContainerDiv = document.createElement('DIV')
    var custEtaButton = document.createElement('BUTTON')
    custEtaButton.appendChild(document.createTextNode("ETA"))
    custEtaButton.type="button"
    custEtaButton.id="custEtaButton"
    custEtaButton.classList = "afBtn afBtn--small afBtn__fill af-primary margin-right--1 headerItemSpacing"
    
    var custCompButton = document.createElement('BUTTON')
    custCompButton.appendChild(document.createTextNode("Complaints"))
    custCompButton.type="button"
    custCompButton.id="custCompButton"
    custCompButton.classList = "afBtn afBtn--small afBtn__fill af-primary margin-right--1 headerItemSpacing"

    var custReschedButton = document.createElement('BUTTON')
    custReschedButton.appendChild(document.createTextNode("Rescheduling"))
    custReschedButton.type="button"
    custReschedButton.id="custReschedButton"
    custReschedButton.classList = "afBtn afBtn--small afBtn__fill af-primary margin-right--1 headerItemSpacing"
    
    //confContainerDiv.after(custContainerDiv)
    noteBar.children[0].after(custContainerDiv)
    custContainerDiv.appendChild(document.createTextNode("customer called for: "))
    custContainerDiv.appendChild(custEtaButton)
    custContainerDiv.appendChild(custCompButton)
    custContainerDiv.appendChild(custReschedButton)
    
    const custText = "customer called "

    var custFunction = function(text){
        document.getElementById("btnAddNoteText").click()
        document.getElementById("thisnote").value = custText+text
        
        //document.getElementById("btnAddNote").click()
    }

    custEtaButton.addEventListener("click", function(){custFunction("for part ETA, email sent to supplier/forwarded to spare parts/forwarded to technician/cust was informed of"+
        " expected delivery date")})
    custCompButton.addEventListener("click", function(){custFunction("to complain, customer had valid problems/rambled incoherently/had their expectations adjusted/should be "+
        "relegated to the mental asylum")})
    custReschedButton.addEventListener("click", function(){custFunction("to reschedule from XXX to XXX. Reason: XXX")})

    //cancellation buttons
    const cancelSpace = document.getElementsByClassName("pageViewTask__signature")[0]
    var cancelContainerDiv = document.createElement('DIV')
    var cancelEmailButton = document.createElement('BUTTON')
    var cancelPhoneButton = document.createElement('BUTTON')
    var cancelMessageButton = document.createElement('BUTTON')
    var cancelLabel = document.createElement('div')

    cancelEmailButton.appendChild(document.createTextNode("Email"))
    cancelPhoneButton.appendChild(document.createTextNode("Phone"))
    cancelMessageButton.appendChild(document.createTextNode("Message"))
    cancelLabel.appendChild(document.createTextNode("Quick Cancel via:  "))

    cancelEmailButton.type="button"
    cancelPhoneButton.type="button"
    cancelMessageButton.type="button"

    cancelEmailButton.id="cancelEmailButton"
    cancelPhoneButton.id="cancelPhoneButton"
    cancelMessageButton.id="cancelMessageButton"

    cancelEmailButton.classList = "afBtn afBtn__fill af-warn editNoteDelete margin-right--1 headerItemSpacing"
    cancelPhoneButton.classList = "afBtn afBtn__fill af-warn editNoteDelete margin-right--1 headerItemSpacing"
    cancelMessageButton.classList = "afBtn afBtn__fill af-warn editNoteDelete margin-right--1 headerItemSpacing"
    
    if(document.getElementsByClassName("schedule-item").length>0) cancelSpace.appendChild(cancelContainerDiv)
    cancelContainerDiv.appendChild(cancelLabel)
    cancelContainerDiv.appendChild(cancelEmailButton)
    cancelContainerDiv.appendChild(cancelPhoneButton)
    cancelContainerDiv.appendChild(cancelMessageButton)
    
    const cancelText = "Job cancelled via "

    var cancelFunction = async function(text){
        document.getElementById("btnAddNoteText").click()
        document.getElementById("thisnote").value = cancelText+text
        document.getElementById("btnAddNote").click()
        var jobNumber = document.getElementsByClassName("afDataTable__cell--non-numeric afDataTable__sub-header")[3].textContent.split(' ')
        jobNumber = jobNumber[jobNumber.length-1]
        chrome.storage.sync.set({ CancelTag: jobNumber})
        document.getElementById("schedule-item-1").click()
        while(true){
            
            chrome.storage.sync.get("CancelTag", async ({ CancelTag }) => {jobNumber=CancelTag})
            if(jobNumber==0){
                location.reload()
                break
            }
            await new Promise(r => setTimeout(r, 10));
            
        }

    }

    cancelEmailButton.addEventListener("click", function(){cancelFunction("Email")})
    cancelPhoneButton.addEventListener("click", function(){cancelFunction("phone")})
    cancelMessageButton.addEventListener("click", function(){cancelFunction("message")})
})