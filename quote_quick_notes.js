//quote confirmation buttons
window.addEventListener('load', async() => {
    //confirmation buttons
    while(!document.getElementsByClassName("afNoteWidget__header margin-top--2")[0]){
        await new Promise(r => setTimeout(r, 10));
    }
    const noteBar = document.getElementsByClassName("afNoteWidget__header margin-top--2")[0]
    var confContainerDiv = document.createElement('DIV')
    var confEmailButton = document.createElement('BUTTON')
    var confPhoneButton = document.createElement('BUTTON')
    var confMessageButton = document.createElement('BUTTON')

    confEmailButton.appendChild(document.createTextNode("Email"))
    confPhoneButton.appendChild(document.createTextNode("Phone"))
    confMessageButton.appendChild(document.createTextNode("Message"))

    confEmailButton.type="button"
    confPhoneButton.type="button"
    confMessageButton.type="button"

    confEmailButton.id="confEmailButton"
    confPhoneButton.id="confPhoneButton"
    confMessageButton.id="confMessageButton"

    confEmailButton.classList = "afBtn afBtn--small afBtn__fill af-primary margin-right--1 headerItemSpacing"
    confPhoneButton.classList = "afBtn afBtn--small afBtn__fill af-primary margin-right--1 headerItemSpacing"
    confMessageButton.classList = "afBtn afBtn--small afBtn__fill af-primary margin-right--1 headerItemSpacing"
    
    noteBar.children[0].after(confContainerDiv)
    confContainerDiv.appendChild(document.createTextNode("Quote confirmed via:  "))
    confContainerDiv.appendChild(confEmailButton)
    confContainerDiv.appendChild(confPhoneButton)
    confContainerDiv.appendChild(confMessageButton)
    
    const confText = "quote confirmed via "
    var event = new Event('change', {
        bubbles: true,
        cancelable: true,
    });
      

    var confFunction = function(text){
        document.getElementById("btnAddNoteText").click()
        document.getElementById("thisnote").value = confText+text
        document.getElementById("selectedQuoteStatus").value=2
        document.getElementById("selectedQuoteStatus").dispatchEvent(event)
        if(document.getElementById("savequote"))document.getElementById("savequote").click()
        if(document.getElementById("saveQuoteStatus"))document.getElementById("saveQuoteStatus").click()
    }

    confEmailButton.addEventListener("click", function(){confFunction("Email")})
    confPhoneButton.addEventListener("click", function(){confFunction("phone")})
    confMessageButton.addEventListener("click", function(){confFunction("message")})
})
    
