import suburbTable from "./suburbTable.js"
import techLocations from "./techTable.js"
//import {importData, techLocations} from "./bulkimport.js"
let importBtn = document.getElementById("importBtn")
var emailBtn = document.getElementById("emailBtn")
var smsBtn1 = document.getElementById("smsBtn1")
var smsBtn2 = document.getElementById("smsBtn2")
var invoiceBtn = document.getElementById("invoiceBtn")
var invoiceBtn2 = document.getElementById("invoiceBtn2")
var invoiceBtn3 = document.getElementById("invoiceBtn3")
var bulkImportBtn = document.getElementById("bulkImportBtn")
var bulkTextArea = document.getElementById("bulkTextArea")
var bulkInfoText = document.getElementById("bulkInfoText")
var resetFlagsBtn = document.getElementById("resetBtn2")
//button.addEventListener("click", test)
var textArea = document.getElementById("textArea")
var infoText = document.getElementById("infoText")
var buyPriceBox = document.getElementById("buyPriceBox")
var mielePriceBox = document.getElementById("mielePriceBox")
var fieldPriceBox = document.getElementById("fieldPriceBox")
var suburbBox = document.getElementById("suburbBox")
var suburbSearchBtn = document.getElementById("suburbSearchBtn")
var postcodeBox = document.getElementById("postcodeBox")
var postcodeSearchBtn = document.getElementById("postcodeSearchBtn")
var techBox = document.getElementById("techBox")
var input = []
var dict = {
    "Clothes Dryers": "258",
    "Cooktops": "-1",
    "Dishwashers": "260",
    "Fridges": "261",
    "Microwaves": "262",
    "Ovens": "623",
    "Range Hoods": "268",
    "Washing Machines": "265",
    "Other": "271",
    "": "271"
}



textArea.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault()
        document.getElementById("importBtn").click()
    }
})

function test() {
    var string = textArea.value
    input = string.split("\n")
    infoText.value = "text parsed, ready to fill client"
    console.log(input);

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

importBtn.addEventListener("click", async () => {
    let inputtag0 = document.querySelector("#textArea").value.split("\n");
    var inputtag =[]
    for(let i=0; i<inputtag0.length;i++){
        inputtag.push(inputtag0[i].split("\t")[1])
    }
    console.log(inputtag)
    

    //phone number validation
    if (inputtag[3].startsWith("+61")) {
        inputtag[3] = inputtag[3].replace('+61', '0');
    }
    if (inputtag[3].startsWith("61")) {
        inputtag[3] = inputtag[3].replace('61', '0');
    }
    while (inputtag[3].includes(" ")) {
        inputtag[3] = inputtag[3].replace(' ', '');
    }
    if (!/^[0-9]+$/.test(inputtag[3])) {
        document.querySelector("#textArea").value = "something is wrong with the phone number: Not a Number"
        console.log(inputtag[3])
        return
    }
    if (inputtag[3].length != 10) {
        document.querySelector("#textArea").value = "something is wrong with the phone number: wrong length"
        console.log(inputtag[3])
        return
    }
    if (!/\d/.test(inputtag[4])) {
        document.querySelector("#textArea").value = "something is wrong with the address: No street Number"
        console.log(inputtag[4])
        return
    }
    chrome.storage.sync.set({ inputtag: inputtag });

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    window.close()

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: importData,
        args: [techLocations, -1]
    });



});

function importData(techLocations, index23) {
    console.log("started successfully")
    console.log(techLocations)

    var dict = {
        "Clothes Dryers": "258",
        "Cooktops": "-1",
        "Dishwashers": "260",
        "Fridges": "261",
        "Microwaves": "262",
        "Ovens": "263",
        "Range Hoods": "268",
        "Washing Machines": "265",
        "Other": "271",
        "": "271"
    }
    chrome.storage.sync.get("inputtag", async ({ inputtag }) => {
        console.log("index = "+index23)
        console.log(inputtag)
        if (index23 != -1) {
            inputtag = inputtag[index23]
        }
        console.log(inputtag)
        var e = new KeyboardEvent('keyup', { 'key': 'a', 'code': 'KeyA' })
        var f = new KeyboardEvent('keypress', { 'key': 'a', 'code': 'KeyA' })
        var g = new KeyboardEvent('keydown', { 'key': 'a', 'code': 'KeyA' })
        function massActivate(element) {
            element.focus()
            //element.change()
            element.dispatchEvent(g)
            element.dispatchEvent(f)
            element.dispatchEvent(e)
        }
        if (!document.getElementById("boxUseCalendarViews")) {
            console.log("you are on the create page")
        }
        var ownerFlag = 0
        if (document.getElementById("ownerOrgName"))ownerFlag=1
        inputtag[0] = inputtag[0].toLowerCase().trim()
        inputtag[0] = inputtag[0].charAt(0).toUpperCase() + inputtag[0].slice(1);
        inputtag[1] = inputtag[1].toLowerCase().trim()
        inputtag[1] = inputtag[1].charAt(0).toUpperCase() + inputtag[1].slice(1);
        //set description
        document.getElementById("tdDefault").click()
        var description = ""
        for (let i = 11; i < inputtag.length; i++) {
            description += "\<p\>" + inputtag[i] + "\<\/p\>"
        }
        console.log(description)
        document.getElementById("description").value = description
        await new Promise(r => setTimeout(r, 10));
        document.getElementById("tdRich").click()
        document.getElementById("tdRich").checked = true

        //open client, set client, wait
        document.querySelectorAll("[id='btnAdvSearch']")[1-ownerFlag].click()
        document.getElementById("btnAdd").click()
        while (!document.getElementById("Name")) {
            await new Promise(r => setTimeout(r, 10));
            console.log("waiting for name")
        }
        console.log("create user")
        document.getElementById("Name").value = inputtag[0] + " " + inputtag[1]
        document.getElementById("ShortName").value = inputtag[1].slice(0, 6)
        document.getElementById("givennames").value = inputtag[0]
        document.getElementById("surname").value = inputtag[1]
        document.getElementById("mobile").value = inputtag[3]
        document.getElementById("Email").value = inputtag[2]
        //searchPostcode2(inputtag[5])
        await new Promise(r => setTimeout(r, 300));
        document.getElementById("address2").focus()
        document.getElementById("address2").value = inputtag[4] + " " + inputtag[5]
        document.getElementById("address2").dispatchEvent(e)


        var clicked = false
        var postcode = inputtag[6]
        var latitudeClone = null
        var longitudeClone = null
        var mapViewBtnClone = null
        
        document.getElementById("btnOptSaveOrganisation").addEventListener("click", async () => {
            postcode = document.getElementById("postcode").value
            latitudeClone =document.getElementById("gpslat").cloneNode(true)
            longitudeClone =document.getElementById("gpslong").cloneNode(true)
            var buttons = document.getElementsByClassName("afBtn afBtn__fill afBtn--small af-primary")
            for(i=0;i<buttons.length;i++){
                if(buttons[i].innerHTML=='View on Map'){
                    mapViewBtnClone = buttons[i].cloneNode(true)
                }
            }
        })
        while (document.getElementById("Name")) {
            await new Promise(r => setTimeout(r, 10));
            console.log("waiting for name")
            if (document.getElementsByClassName("pac-item googleplacesItem").length == 1 && document.getElementById("suburb").value == "" && clicked == false) {
                document.getElementsByClassName("pac-item googleplacesItem")[0].click()
                clicked = true
            }
        }
        while (document.getElementById("dialog_search_clients")) {
            await new Promise(r => setTimeout(r, 10));
            console.log("waiting for names to close")
            if (document.getElementById("globalsearch_value")) {
                if (document.getElementById("globalsearch_value").value == "") {
                    document.getElementById("globalsearch_value").value = inputtag[0] + " " + inputtag[1]
                    document.getElementById("globalsearch_value").dispatchEvent(e)
                }
            }
        }
        //open asset, set asset
        document.querySelectorAll("[id='btnAdvSearch']")[3-ownerFlag].click()
        document.getElementById("btnAdd").click()
        console.log("creating asset")
        while (!document.getElementById("categoryName")) {
            await new Promise(r => setTimeout(r, 10));
            console.log("waiting for category name")
        }
        if (inputtag[7] == "Other") {
            document.querySelectorAll("[id='assetName']")[1].value = inputtag[7] + " " + inputtag[8]
        } else {
            document.querySelectorAll("[id='assetName']")[1].value = inputtag[7] + " " + inputtag[8].slice(0, inputtag[8].length - 1)
        }
        if (inputtag[8] == "Cooktops") {
            document.getElementById("categoryName").value = inputtag[8].slice(0, 7)
            document.getElementById("categoryName").focus()
            await new Promise(r => setTimeout(r, 300));
            document.getElementById("categoryName").dispatchEvent(e)

        }
        else {
            document.querySelectorAll("[id='btnAdvSearch']")[8-ownerFlag].click()
            while (!document.getElementById("265")) {
                await new Promise(r => setTimeout(r, 10));
                console.log("waiting for category name")
            }
            document.getElementById(dict[inputtag[8]]).click()
            //console.log(document.querySelectorAll("[id='btnSelect']"))
            document.querySelectorAll("[id='btnSelect']")[1].click()
        }
        while (document.getElementById("categoryName")) {
            /*if (inputtag[7] != "Cooktops") {
                document.getElementsByClassName("afBtn--small afBtn__fill af-success")[0].click()
                break
            }*/
            await new Promise(r => setTimeout(r, 10));

            console.log("waiting for category close")
        }
        //set internet, sleep then set time
        document.getElementById("_Cust319").value = "Online Booking"
        document.getElementById("_Cust147").value = "Eftpos"
        //opentask in new tab
        if (document.getElementsByClassName("afBtnGroup").length > 0) {
            document.getElementById("btnDoneScheduleDetails").addEventListener("click", async () => {
                //var link = "https://office.aroflo.com"+document.getElementsByClassName("afBtn afBtn__fill afBtn--small af-primary btnViewDetails")[0].getAttribute("href")
                chrome.storage.sync.set({ createTag: 1 });
                //window.open(link, '_blank')})
                document.getElementsByClassName("afBtn afBtn__fill afBtn--small af-primary btnViewDetails")[0].click()
            })
        }
        else {
            if (!document.getElementById("boxUseCalendarViews")) {
                switch(inputtag[10]){
                    case "AM":
                        for(let i=0; i<6;i++){
                            document.getElementById("button"+i).style.background='#FFFF00'
                        }
                        break
                    case "PM":
                        for(let i=6; i<10;i++){
                            document.getElementById("button"+i).style.background='#FFFF00'
                        }
                        break
                    default:
                        for(let i=0; i<10;i++){
                            document.getElementById("button"+i).style.background='#FFFF00'
                        }
                        

                }
                document.getElementById("btnShowCal_1_0").click()
                var node = document.querySelector('[title="'+inputtag[9]+'"]');
                if(node){
                    node.parentElement.classList.add("ui-state-highlight")
                    node.parentElement.style.background='#FFFF00'
                }
                document.getElementsByClassName("btnAddUsers")[0].click()
                
                if (document.getElementsByClassName("afCard").length == 5) {
                    //console.log(document.getElementsByClassName("afCard")[4].childNodes[1].textContent)
                    while (document.getElementsByClassName("afCard").length>4) {
                        if(document.getElementsByClassName("afCard")[4].childNodes[1].textContent == "Saving ..."){
                            await new Promise(r => setTimeout(r, 10));
                            console.log(":p")
                        }
                        break
                    }

                    console.log(document.getElementsByClassName("afCard")[4].childNodes[1].textContent)
                    
                }
                /*var listOfTechs = []
                for (const tech in techLocations) {
                    if (techLocations[tech].includes(postcode)) listOfTechs.push(tech)
                }
                console.log(listOfTechs)
                
                var tables = document.getElementsByClassName("ui-jqgrid-btable")

                while (tables[tables.length-1].children[0].children.length <= 1) {
                    await new Promise(r => setTimeout(r, 10));
                    console.log("waiting for asign to load")
                }
                var table = tables[tables.length-1].children[0].children
                if (listOfTechs.length == 1) {
                    console.log("one techs found")
                    for (let i = 0; i < table.length; i++) {

                        if (listOfTechs.includes(table[i].children[4].innerText)) {
                            table[i].click()
                            table[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[1].click()


                            break
                        }
                    }
                } else if (listOfTechs.length > 1) {
                    console.log("multiple techs found")
                    var index = 1
                    console.log(table.length > listOfTechs.length + 1)
                    console.log(table.length)
                    console.log(listOfTechs.length + 1)

                    while (table.length > listOfTechs.length + 1) {
                        if (listOfTechs.includes(table[index].children[4].innerText)) {
                            index += 1
                        } else {
                            table[index].remove()
                        }
                    }
                    //map popup code block
                    var loc = document.getElementById("tblIMSMain")
                    loc.appendChild(latitudeClone)
                    loc.appendChild(longitudeClone)
                    loc.appendChild(mapViewBtnClone)
                    mapViewBtnClone.click()
                    var mapBox = document.getElementsByClassName("ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable ui-resizable")[document.getElementsByClassName("ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable ui-resizable").length-1]
                    mapBox.style.height = '660px'
                    mapBox.style.width = '620px'
                    mapBox.children[0].children[0].innerText = 'Map'
                    mapBox.children[1].children[0].children[0].children[0].children[0].remove()
                    var mapArea = mapBox.children[1].children[0].children[0].children[0].children[0].children[0].children[0]
                    mapArea.style.height = '600px'
                    mapArea.style.width = '600px'

                    var techTableBox = table[0].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
                    var initX = techTableBox.style.left
                    var initY = techTableBox.style.top
                    mapBox.style.top = techTableBox.style.top
                    techTableBox.style.left = String(parseInt(initX)-(parseInt(techTableBox.style.width)/2))+'px'
                    mapBox.style.left = String(parseInt(initX)+(parseInt(techTableBox.style.width)/2))+'px'
                    
                    await new Promise(r => setTimeout(r, 100));
                    var mapButtons = mapBox.children[1]
                    for ( i=0; i<9; i++){
                        while (!mapButtons.children) {
                            await new Promise(r => setTimeout(r, 10));
                            console.log("waiting for technician entry")
                        }
                        mapButtons = mapButtons.children[0]
                    }
                    //var mapButtons = mapBox.children[1].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children
                    while (mapButtons.length < 16) {
                        await new Promise(r => setTimeout(r, 10));
                        console.log("waiting for technician entry")
                    }
                    document.getElementsByClassName("gm-style-iw-a")[0].remove()
                    await new Promise(r => setTimeout(r, 100));
                    var minusButton = mapButtons.children[13]
                    for ( i=0; i<4; i++){
                        while(true){
                            try{
                                minusButton.children
                                break
                            }
                            catch (error){
                                console.log(error)
                                await new Promise(r => setTimeout(r, 10));
                                minusButton = mapButtons.children[13]
                            }
                        }
                        while (!minusButton.children) {
                            await new Promise(r => setTimeout(r, 10));
                            console.log("waiting for technician entry")
                        }
                        console.log("minusButton.children")
                        console.log(minusButton.children)
                        minusButton = minusButton.children[(i%2)*2]

                    }

                    for(i=0;i<10;i++)minusButton.click()//mapButtons[13].children[0].children[2].children[0].children[2].click()
                    
                    //end map popup code block
                }*/
                //else { 
                var tables = document.getElementsByClassName("ui-jqgrid-btable")
                var table = tables[tables.length-1].children[0].children
                console.log("no techs found") 
                //map popup code block
                var loc = document.getElementById("tblIMSMain")
                loc.appendChild(latitudeClone)
                loc.appendChild(longitudeClone)
                loc.appendChild(mapViewBtnClone)
                mapViewBtnClone.click()
                var mapBox = document.getElementsByClassName("ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable ui-resizable")[document.getElementsByClassName("ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable ui-resizable").length-1]
                mapBox.style.height = '660px'
                mapBox.style.width = '620px'
                mapBox.children[0].children[0].innerText = 'Map'
                mapBox.children[1].children[0].children[0].children[0].children[0].remove()
                var mapArea = mapBox.children[1].children[0].children[0].children[0].children[0].children[0].children[0]
                mapArea.style.height = '600px'
                mapArea.style.width = '600px'

                var techTableBox = table[0].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
                var initX = techTableBox.style.left
                var initY = techTableBox.style.top
                mapBox.style.top = techTableBox.style.top
                techTableBox.style.left = String(parseInt(initX)-(parseInt(techTableBox.style.width)/2))+'px'
                mapBox.style.left = String(parseInt(initX)+(parseInt(techTableBox.style.width)/2))+'px'
                
                await new Promise(r => setTimeout(r, 100));
                var mapButtons = mapBox.children[1]
                for ( i=0; i<9; i++){
                    while (!mapButtons.children) {
                        await new Promise(r => setTimeout(r, 10));
                        console.log("waiting for technician entry")
                    }
                    if(i==8) await new Promise(r => setTimeout(r, 100));
                    mapButtons = mapButtons.children[0]

                }
                
                //var mapButtons = mapBox.children[1].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children
                console.log(mapButtons)
                //broken map 
                while (mapButtons.children.length < 16) {
                    await new Promise(r => setTimeout(r, 10));
                    console.log("waiting for technician entry")
                }
                document.getElementsByClassName("gm-style-iw-a")[0].remove()
                var minusButton = mapButtons.children[13]
                for ( i=0; i<4; i++){
                    while(true){
                        try{
                            minusButton.children
                            break
                        }
                        catch (error){
                            console.log(error)
                            await new Promise(r => setTimeout(r, 10));
                            minusButton = mapButtons.children[13]
                        }
                    }
                    while (!minusButton.children) {
                        await new Promise(r => setTimeout(r, 10));
                        console.log("waiting for technician entry")
                    }
                    console.log("minusButton.children")
                    console.log(minusButton.children)
                    minusButton = minusButton.children[(i%2)*2]

                }

                for(i=0;i<10;i++)minusButton.click()//mapButtons[13].children[0].children[2].children[0].children[2].click()
                
                    //end map popup code block
                //}
                //broken map end
                while (document.getElementsByClassName("schedStartTime vd_required vd_time  afTextfield__input afTextfield__input--small ui-timepicker-input").length == 0) {
                    await new Promise(r => setTimeout(r, 10));
                    console.log("waiting for technician entry")
                }
                document.getElementsByClassName("ui-dialog-titlebar-close ui-corner-all")[0].click()
                if(document.getElementsByClassName("ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable ui-resizable").length>0){
                    var mapBox = document.getElementsByClassName("ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable ui-resizable")[document.getElementsByClassName("ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable ui-resizable").length-1]
                    if(mapBox.children[0].children[0].innerHTML == 'Map')mapBox.children[0].children[1].click()
                }
            }
            while (document.getElementById("btnSelect")) {
                await new Promise(r => setTimeout(r, 10));
            }
            /*schedLoop:
            while (true) {
                while (document.getElementsByClassName("schedStartTime vd_required vd_time  afTextfield__input afTextfield__input--small ui-timepicker-input").length == 0 || !document.getElementsByClassName("schedNote afTextfield__input afTextfield__input--small vd_length")[0].value == "") {
                    await new Promise(r => setTimeout(r, 10));
                    console.log("sleeping")
                    if (document.getElementsByClassName("afBtn afBtn__fill af-primary fc-button-today ui") && !document.getElementById("ui-dialog-title-dlgSchedDetails")) return
                }
                if (document.getElementsByClassName("schedNote afTextfield__input afTextfield__input--small vd_length")[0].value == "") {
                    switch (inputtag[9]) {
                        case "AM":
                            document.getElementById("amButton").click()
                            break
                        case "PM":
                            document.getElementById("pmButton").click()
                            break
                        default:
                            //document.getElementById("anyButton").click()
                    }
                }
            }*/
        }
    });
}



emailBtn.addEventListener("click", async () => {
    chrome.storage.sync.set({ emailTag: "1051" });

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    window.close()
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: sendEmail,
    });


});

//export default importData;

function sendEmail() {
    chrome.storage.sync.get("emailTag", async ({ emailTag }) => {
        var time = document.getElementsByClassName("schedule-item-date")[0].innerText
        var branch = document.getElementsByClassName("af-truncate--text")[0].innerText
        var source = "Online Booking"
        var branchIndex = 2
        if (branch == "Master Appliance Service") branchIndex = 3
        if (document.getElementsByTagName("Select")[branchIndex]) source = document.getElementsByTagName("Select")[branchIndex].children[document.getElementsByTagName("Select")[branchIndex].selectedIndex].value
        if (time.includes("8:30 AM")) time = "AM"
        else if (time.includes("12:30 PM")) time = "PM"
        else time = "Any"
        emailTag = "1051"

        //console.log(branch)
        //console.log(time)
        //console.log(source)



        switch (true) {
            case ((branch == "Master Appliance Service") && (document.getElementsByClassName("schedule-item-date")[0].parentElement.innerHTML.includes("John Sleap"))):
                emailTag = "1054"
                break;
            case ((branch == "Master Appliance Service") && (document.getElementsByClassName("schedule-item-date")[0].parentElement.innerHTML.includes("Gee Cruz"))&& ((time == "AM"))):
                emailTag = "1206"
                break;
            case ((branch == "Master Appliance Service") && (document.getElementsByClassName("schedule-item-date")[0].parentElement.innerHTML.includes("Gee Cruz"))&& ((time == "Any"))):
                emailTag = "1207"
                break;
                
            case ((branch == "Master Appliance Service") && (time == "AM") && source == "Online Booking"):
                emailTag = "1037"
                break;
            case ((branch == "Master Appliance Service") && (time == "AM") && source != "Online Booking"):
                emailTag = "1186"
                break;
            case ((branch == "Master Appliance Service") && (time == "PM" && source == "Online Booking")):
                emailTag = "1038"
                break;
            case ((branch == "Master Appliance Service") && (time == "PM" && source != "Online Booking")):
                emailTag = "1187"
                break;
            case ((branch == "Master Appliance Service") && (time == "Any")):
                emailTag = "1036"
                break;
            case ((branch == "Premium Appliance Repair") && (time == "AM" && source == "Online Booking")):
                emailTag = "1043"
                break;
            case ((branch == "Premium Appliance Repair") && (time == "AM" && source != "Online Booking")):
                emailTag = "1188"
                break;
            case ((branch == "Premium Appliance Repair") && (time == "PM" && source == "Online Booking")):
                emailTag = "1044"
                break;
            case ((branch == "Premium Appliance Repair") && (time == "PM" && source != "Online Booking")):
                emailTag = "1189"
                break;
            case ((branch == "Premium Appliance Repair") && (time == "Any")):
                emailTag = "1042"
                break;
            case ((branch == "SEQ Appliance Repair") && (time == "AM" && source == "Online Booking")):
                emailTag = "1040"
                break;
            case ((branch == "SEQ Appliance Repair") && (time == "AM" && source != "Online Booking")):
                emailTag = "1190"
                break;
            case ((branch == "SEQ Appliance Repair") && (time == "PM" && source == "Online Booking")):
                emailTag = "1041"
                break;
            case ((branch == "SEQ Appliance Repair") && (time == "PM" && source != "Online Booking")):
                emailTag = "1191"
                break;
            case ((branch == "SEQ Appliance Repair") && (time == "Any")):
                emailTag = "1039"
                break;
        }




        document.getElementById("customiseLayout").click()

        while (!document.getElementById("TrackEmailYesNo")) {
            await new Promise(r => setTimeout(r, 10));
            console.log("waiting for category close")
        }
        //if(emailTag=="1036"||emailTag=="1037"||emailTag=="1038")document.getElementById("forwardRepliesTo").value = "Master Appliance Service <service@masterappliances.com.au>"

        document.getElementById("TrackEmailYesNo").click()
        document.getElementById("btnSearchEmailTemplates").click()

        var table =document.getElementsByClassName("ui-jqgrid-btable")

        while(true){
            while (!document.getElementsByClassName("jqgfirstrow")[0]) {
                await new Promise(r => setTimeout(r, 10));
                console.log("waiting for templates to load")
            }
            if(document.getElementById(emailTag)){
                document.getElementById(emailTag).click()
                document.getElementById("btnSelect").click()
                if (emailTag == "1051") return
                break
            }
            else {
                if(document.getElementById("1051")){
                    document.getElementById("1051").click()
                    document.getElementById("btnSelect").click()
                    return
                }
                else document.getElementsByClassName("af-pg-button")[2].click()
                
            }

            await new Promise(r => setTimeout(r, 10))
        }
        /* old code
        while (!document.getElementsByClassName("ui-jqgrid-btable").children[0].children[1]) {
            await new Promise(r => setTimeout(r, 10));
            console.log("waiting for templates")
        }
        
        
        //document.getElementsByClassName("af-pg-selbox afTextfield__input afTextfield__input--small")[0].va
        
        
        document.getElementsByClassName("af-pg-button")[3].click()
        console.log("passed 1")
        while (!document.getElementById(emailTag)) {
            await new Promise(r => setTimeout(r, 10));
            console.log("waiting for template: " + emailTag)
        }
        document.getElementById(emailTag).click()
        document.getElementById("btnSelect").click()
        console.log("done 1")
        if (emailTag == "1051") return
        */

        while (!document.getElementById("ToSubject").value.includes("Service Booking")) {
            await new Promise(r => setTimeout(r, 10));
            console.log("waiting for load")
        }
        await new Promise(r => setTimeout(r, 500));
        document.getElementById("sendEmail_button").click()
        console.log("done2")
        while (!document.getElementsByClassName("emlSendResult")[0]) {
            await new Promise(r => setTimeout(r, 10));
            console.log("waiting for send")
        }
        document.getElementsByClassName("ui-button-text")[2].click()
        chrome.storage.sync.get("createTag", async ({ createTag }) => {
            console.log(createTag)
            if (createTag != 0) {
                var newtag = createTag - 1
                chrome.storage.sync.set({ createTag: newtag });
                window.close()
            }
            else window.location = "https://office.aroflo.com/ims/Site/Service/workrequest/index.cfm?new=1&tid=IMS.CRT.TSK"
        })






    });

}


smsBtn1.addEventListener("click", async () => {
    var smsTag = 0
    chrome.storage.sync.set({ smsTag: smsTag });

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    window.close()
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: sendTexts,
    });


});

smsBtn2.addEventListener("click", async () => {
    var smsTag = 1
    chrome.storage.sync.set({ smsTag: smsTag });

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    window.close()
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: sendTexts,
    });


});


function sendTexts() {
    chrome.storage.sync.get("smsTag", async ({ smsTag }) => {
        var when = "tommorow"
        if (smsTag == 1) when = "Monday"
        var branch = document.getElementsByClassName("af-truncate--text")[0].innerText
        var branchNumber = 0
        var jobNumbers = []
        var names = []
        var phoneNumbers = []
        var problems = []
        var status = []
        var index = 0
        var jobs = document.getElementsByClassName("fc-event-inner fc-event-skin")
        if (branch.includes("Master")) branchNumber = "8445 4000"
        if (branch.includes("Premium")) branchNumber = "1300 614 730"
        if (branch.includes("SEQ")) branchNumber = "3096 0580"
        console.log(jobs)
        for (let i = 0; i < jobs.length; i++) {
            var temp = jobs[i].title.split(" ")
            jobNumbers[index] = temp[0]
            phoneNumbers[index] = temp[1]
            names[index] = temp[2] + " " + temp[3]
            index += 1
            if (jobs[i].title.includes("unconfirmed")) {
                status[index] = 0
            }
            else status[index] = 1
        }

        console.log(jobNumbers)
        console.log(names)
        console.log(phoneNumbers)

        for (let i = 0; i < phoneNumbers.length; i++) {
            if (phoneNumbers[i].startsWith("+61")) {
                phoneNumbers[i] = phoneNumbers[i].replace('+61', '0');
            }
            if (phoneNumbers[i].startsWith("61")) {
                phoneNumbers[i] = phoneNumbers[i].replace('61', '0');
            }
            while (phoneNumbers[i].includes(" ")) {
                phoneNumbers[i] = phoneNumbers[i].replace(' ', '');
            }
            while (phoneNumbers[i].includes(",")) {
                phoneNumbers[i] = phoneNumbers[i].replace(',', '');
            }
            if (!/^[0-9]+$/.test(phoneNumbers[i])) {
                console.log(jobNumbers[i] + "failed: NaN")
                console.log(phoneNumbers[i])
                problems.push(jobNumbers[i])
                names.splice(i, 1)
                jobNumbers.splice(i, 1)
                phoneNumbers.splice(i, 1)
                i -= 1
                console.log()
                continue

            }
            if (phoneNumbers[i].length != 10) {
                console.log(jobNumbers[i] + "failed: wrong length")
                problems.push(jobNumbers[i])
                names.splice(i, 1)
                jobNumbers.splice(i, 1)
                phoneNumbers.splice(i, 1)
                i -= 1
                continue
            }

        }

        var container = document.createElement('div')
        var classList = container.classList
        classList.add("afBtn", "afBtn__fill", "af-primary", "afBtn--small", "btnSendSMS", "qbNoClose", "handCursor")
        jobs[0].parentElement.parentElement.appendChild(container)
        container.click()

        while (!document.getElementById("to_value")) {
            await new Promise(r => setTimeout(r, 10));
            console.log("waiting for message to send")
        }
        var phoneEntry = document.getElementById("to_value")
        var textEntry = document.getElementById("message_value")
        var sendBtn = document.getElementById("btnSendSMSmessage")

        for (let i = 0; i < jobNumbers.length; i++) {
            phoneEntry.value = phoneNumbers[i]
            //textEntry.value = "To " + names[i]+"\n"+branch+" JN "+jobNumbers[i]+ ". Pls call "+branchNumber+" to CONFIRM or CANCEL the time of your booking for "+when+". Do not reply via sms, thanks."
            textEntry.value = "To " + names[i] + ",\nThis is your reminder that you have a " + branch + " technician attending " + when + ". \nPls call " + branchNumber + " with ref: " + jobNumbers[i] + " to cancel if the service is no longer required. \nDo not reply via sms, thanks."
            sendBtn.click()
            while (!document.getElementsByClassName("btnAnchor btnOverlayOk ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only")[0]) {
                await new Promise(r => setTimeout(r, 10));
                console.log("waiting for message to send")
            }
            document.getElementsByClassName("btnAnchor btnOverlayOk ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only")[0].click()
        }
        //container.parentElement.remove(container)

        if (problems.length != 0) {
            var constructedMessage = "the following messages failed to send:\n"
            for (let i = 0; i < problems.length; i++) constructedMessage += problems[i] + "\n"
            constructedMessage += "all other messages sent correctly"
            textEntry.value = constructedMessage
            console.log(constructedMessage)
        } else {
            textEntry.value = "all confirmation messages sent correctly"
            console.log("all confirmation messages sent correctly")

        }
        sendBtn.remove()

    });
}

//approve invoices 
invoiceBtn.addEventListener("click", async () => {
    console.log("ping");
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    window.close()
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: processInvoices,
    });


});

function processInvoices() {
    var jobNumbers = document.getElementsByClassName("invRefNo")
    var cells = document.getElementsByClassName("afDataTable__cell--numeric")
    var amountOwing = []
    var invoiceTag = 1
    for (let i = 0; i < cells.length; i++) {
        if (i % 6 == 5 && i != 5) amountOwing.push(cells[i])
    }
    chrome.storage.sync.set({ invoiceTag: invoiceTag });
    for (let i = 0; i < amountOwing.length; i++) {
        if (amountOwing[i].innerText.includes("$0.00")) window.open(jobNumbers[i].href, '_blank')
    }

}



//process invoices 
invoiceBtn2.addEventListener("click", async () => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    window.close()
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: processInvoices2,
    });


});

function processInvoices2() {
    var checkbox = document.getElementsByClassName("afCheckbox__input markProcessedChk")
    var cells = document.getElementsByClassName("afDataTable__cell--numeric")
    var amountOwing = []
    for (let i = 0; i < cells.length; i++) {
        if (i % 6 == 5 && i != 5) amountOwing.push(cells[i])
    }
    for (let i = 0; i < amountOwing.length; i++) {
        if (amountOwing[i].innerText.includes("$0.00")) checkbox[i].click()
    }
    document.getElementById("updatepending").click()
}

//reset flag
invoiceBtn3.addEventListener("click", async () => {
    var invoiceTag = 0
    chrome.storage.sync.set({ invoiceTag: invoiceTag });
    textArea.value = "invoice flag reset, invoices should be normal now"



});

buyPriceBox.addEventListener("change", async () => {
    var price = Number(buyPriceBox.value)
    mielePriceBox.value = price * 1.7

    if (price <= 10) {
        fieldPriceBox.value = price * 3 + 10
    }
    else if (price <= 20) {
        if (price * 3 < 30) fieldPriceBox.value = 40
        fieldPriceBox.value = price * 3
    }
    else if (price <= 35) {
        if (price * 2.5 < 50) fieldPriceBox.value = 50
        fieldPriceBox.value = price * 2.5
    }
    else if (price <= 50) {
        if (price * 2.25 < 78.75) fieldPriceBox.value = 78.75
        fieldPriceBox.value = price * 2.25
    }
    else if (price <= 100) {
        if (price * 2.1 < 105) fieldPriceBox.value = 105
        fieldPriceBox.value = price * 2.1
    }
    else if (price <= 250) {
        if (price * 2 < 200) fieldPriceBox.value = 200
        fieldPriceBox.value = price * 2
    }
    else if (price <= 750) {
        if (price * 1.75 < 437.5) fieldPriceBox.value = 437.5
        fieldPriceBox.value = price * 1.75
    }
    else {
        if (price * 1.5 < 1312.5) fieldPriceBox.value = 1312.5
        fieldPriceBox.value = price * 1.5
    }

})


var searchPostcode = async function (postcode) {
    while (techBox.childNodes.length > 0) { techBox.childNodes[0].remove() }
    var listOfTechs = []
    for (const tech in techLocations) {
        if (techLocations[tech].includes(postcode)) listOfTechs.push(tech)
    }
    if (listOfTechs.length > 0) {
        for (let i = 0; i < listOfTechs.length; i++) {
            techBox.appendChild(document.createTextNode(listOfTechs[i] + " "))
        }
    } else techBox.appendChild(document.createTextNode("postcode " + postcode + " not assigned to any technicians, may be out of area"))
}

var searchPostcode2 = async function (postcode) {
    while (techBox.childNodes.length > 0) { techBox.childNodes[0].remove() }
    var listOfTechs = []
    for (const tech in techLocations) {
        if (techLocations[tech].includes(postcode)) listOfTechs.push(tech)
    }
    if (listOfTechs.length == 0) alert("postcode " + postcode + " not assigned to any technicians, may be out of area")
}


var searchSuburb = async function (suburb) {
    while (techBox.childNodes.length > 0) { techBox.childNodes[0].remove() }
    for (const postcode in suburbTable) {
        console.log(suburb.toUpperCase())
        if (suburbTable[postcode].includes(suburb.toUpperCase())) {
            searchPostcode(postcode)
            console.log("found")
            console.log(postcode)
            return
        }
    }
    techBox.appendChild(document.createTextNode("Suburb not found, check spelling or suburb may be out of area"))
}

suburbSearchBtn.addEventListener("click", function () { searchSuburb(suburbBox.value) })
postcodeSearchBtn.addEventListener("click", function () { searchPostcode(postcodeBox.value) })


bulkImportBtn.addEventListener("click", async () => {
    const mainSplitString = "\n\t\n\t\t\t\n\t\n \n\t\n"
    const qldSplitString = "\n\t\n\t\t\t\n\t\n\t\n\t\n"
    var bulkInputs = bulkTextArea.value.split(mainSplitString)
    var bulk2 = bulkTextArea.value.split(qldSplitString)
    if (bulkInputs.length < bulk2.length) bulkInputs = bulk2
    //var bulkInputs = bulkTextArea.value.split(qldSplitString)//"\n\t\n\t\t\t\n\t\n \n\t\n")

    console.log(bulkInputs)
    bulkInputs.splice(bulkInputs.length - 1, 1)
    var failedInputs = []

    for (const entries in bulkInputs) {
        //console.log(entries)//.split("Service Booking\t \n\t"))
        bulkInputs[entries] = String(bulkInputs[entries].split("Service Booking\t \n\tFirst")[1])
        console.log(bulkInputs)
        bulkInputs[entries] = bulkInputs[entries].split("\n")
        console.log(bulkInputs[entries].length)

        if (bulkInputs[entries].length > 12) {
            var fullDesc = bulkInputs[entries][11]
            console.log("start: " + fullDesc)
            for (let i = 12; i < bulkInputs[entries].length; i++) {
                fullDesc += "\n" + bulkInputs[entries][i]
                console.log(bulkInputs[entries][i])
                console.log(fullDesc + " added")
            }
            bulkInputs[entries][11] = fullDesc
            console.log("end: " + fullDesc)
            bulkInputs[entries].splice(12, bulkInputs[entries].length - 11)
        }
        for (const line in bulkInputs[entries]) {
            bulkInputs[entries][line] = String(bulkInputs[entries][line].split("\t ")[1]).trim()
        }
        bulkInputs[entries].splice(3, 0, "spliced1234")

        if (bulkInputs[entries][4].startsWith("+61")) {
            bulkInputs[entries][4] = bulkInputs[entries][4].replace('+61', '0');
        }
        if (bulkInputs[entries][4].startsWith("61")) {
            bulkInputs[entries][4] = bulkInputs[entries][4].replace('61', '0');
        }
        while (bulkInputs[entries][4].includes(" ")) {
            bulkInputs[entries][4] = bulkInputs[entries][4].replace(' ', '');
        }
        if (!/^[0-9]+$/.test(bulkInputs[entries][4])) {
            var identifier = bulkInputs[entries][0] + bulkInputs[entries][1] + bulkInputs[entries][2]
            failedInputs.push([identifier, "NAN", entries])
            console.log(identifier)
            continue
        }
        if (bulkInputs[entries][4].length != 10) {
            var identifier = bulkInputs[entries][0] + bulkInputs[entries][1] + bulkInputs[entries][2]
            failedInputs.push([identifier, "Length", entries])
            console.log(identifier)
            continue
        }
    }
    //console.log(bulkInputs)
    var outputText = "all " + bulkInputs.length + " emails imported successfully"
    if (failedInputs.length > 0) {
        outputText = "the following emails failed to import:\n"
        for (let i = failedInputs.length - 1; i >= 0; i--) {
            outputText += failedInputs[i][0] + " Reason: " + failedInputs[i][1]
            bulkInputs.splice(failedInputs[i][2], 1)
        }
        outputText += "\nThe remaining " + bulkInputs.length + "  emails imported successfully"
    }
    chrome.storage.sync.set({ inputtag: bulkInputs });
    chrome.storage.sync.set({ bulkTag: bulkInputs.length - 1 });
    chrome.storage.sync.set({ createTag: bulkInputs.length - 1 });
    alert(outputText)

    
    for (const entries in bulkInputs) {
        window.open("https://office.aroflo.com/ims/Site/Service/workrequest/index.cfm?new=1&tid=IMS.CRT.TSK", '_blank')

    }

});

resetFlagsBtn.addEventListener("click", async () => {
    chrome.storage.sync.set({ bulkTag: -1 });
    chrome.storage.sync.set({ createTag: 0 });
    alert("bulk flags reset, job creation should be normal now")



});
