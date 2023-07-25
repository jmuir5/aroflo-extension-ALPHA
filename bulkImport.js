bulkImportCheck()


const techLocations = {
    "Peter":["2076","2077","2079","2080","2081","2082","2083","2119","2120","2125","2126","2154","2158","2250","2251","2256","2257","2258","2259","2260","2261","2263"],
    "Eduardo":["2063","2084","2085","2086","2087","2088","2090","2092","2093","2094","2095","2096","2097","2099","2100","2101","2102","2103","2104","2105","2106","2107","2108"],
    "John":["2061","2062","2063","2064","2067","2068","2069","2071","2072","2086","2087","2088","2089","2090","2092","2093","2094","2095","2096","2099","2100"],
    //john ed absence// "John":["2061","2062","2063","2064","2067","2068","2069","2071","2072","2084","2085","2086","2087","2088","2089","2090","2092","2093","2094","2095","2096","2097","2099","2100","2101","2102","2103","2104","2105"],
    "Sandy":["2055","2073","2074","2076","2077","2109","2111","2112","2113","2114","2115","2116","2117","2118","2119","2120","2121","2122","2123","2125","2126","2145","2146","2147","2150","2151","2152","2153","2154","2155","2158","2762","2763","2768","2769"], //john extended into eds area, 8/6/23
    // leo on holiday//"Leo":["2055","2060","2061","2062","2063","2064","2065","2066","2067","2068","2069","2070","2071","2072","2073","2074","2075","2076","2088","2089","2090","2109","2110","2111","2112","2113","2114","2119","2120","2121","2122"],
    "Otavio":["2006","2007","2008","2009","2037","2038","2039","2040","2041","2042","2045","2046","2047","2048","2049","2050","2127","2128","2130","2131","2132","2134","2135","2136","2137","2138","2139","2140","2141","2144", "2203"],
    "Tulio":["2008","2010","2011","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","2026","2027","2028","2029","2030","2031","2032","2033","2034","2035","2036","2042","2043","2044","2052","2204"],
    "Vini":["2015","2018","2019","2020","2032","2034","2035","2036","2044","2191","2192","2193","2194","2195","2204","2205","2206","2207","2208","2209","2210","2216","2217","2218","2219","2220","2221","2222","2223"],
    "Phil":["6057","6058","6100","6101","6102","6103","6104","6105","6106","6107","6108","6109","6110","6147","6148","6149","6150","6151","6152","6153","6154","6155","6156","6157","6158","6160","6162","6163","6164","6166","6953","6954","6955","6957","6961","6965","6970","6980","6983","6986","6987"],
    // ozgur up to joondalup 27/6/23 //"Ozgur":["6000","6003","6004","6005","6006","6007","6008","6009","6010","6011","6012","6014","6015","6016","6017","6018","6019","6020","6021","6022","6023","6024","6025","6026","6027","6028","6029","6050","6051","6052","6053","6059","6060","6061","6062","6159","6803","6809","6817","6820","6827","6830","6832","6865","6900","6902","6903","6907","6909","6913","6916","6918","6919","6923","6931","6937","6938","6940"],
    "Ozgur":["6000","6003","6004","6005","6006","6007","6008","6009","6010","6011","6012","6014","6015","6016","6017","6018","6019","6020","6021","6022","6023","6024","6025","6026","6029","6050","6051","6052","6053","6059","6060","6061","6062","6064","6066","6090","6803","6809","6817","6820","6827","6830","6832","6865","6900","6902","6903","6907","6909","6913","6916","6918","6923","6931","6937","6938","6940"],
    // dart normal //"Dart":["4212","4214","4215","4217","4218","4219","4220","4221","4224","4225","4226","4227","4229","4230"],
    "Matt":["4211","4212","4214","4215","4217","4218","4219","4220","4221","4224","4225","4226","4227","4229","4230"]
}
async function bulkImportCheck() {
    var thisTag = -1
    await navigator.locks.request("bulkLock", async (lock) => {
        await chrome.storage.sync.get("bulkTag", async ({ bulkTag }) => {
            if (bulkTag > -1) {
                thisTag = bulkTag
                chrome.storage.sync.set({ bulkTag: thisTag - 1 });
                console.log("bulkTag" + bulkTag)
                window.addEventListener('load', async () => {
                    importData(techLocations, thisTag)
                })
            }
        })

    })
    
}
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
        inputtag[0] = inputtag[0].toLowerCase().trim()
        inputtag[0] = inputtag[0].charAt(0).toUpperCase() + inputtag[0].slice(1);
        inputtag[1] = inputtag[1].toLowerCase().trim()
        inputtag[1] = inputtag[1].charAt(0).toUpperCase() + inputtag[1].slice(1);
        //set description
        document.getElementById("tdDefault").click()
        var description = ""
        for (let i = 12; i < inputtag.length; i++) {
            description += "\<p\>" + inputtag[i] + "\<\/p\>"
        }
        console.log(description)
        document.getElementById("description").value = description
        await new Promise(r => setTimeout(r, 10));
        document.getElementById("tdRich").click()
        document.getElementById("tdRich").checked = true

        //open client, set client, wait
        document.querySelectorAll("[id='btnAdvSearch']")[1].click()
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
        document.getElementById("mobile").value = inputtag[4]
        document.getElementById("Email").value = inputtag[2]
        searchPostcode2(inputtag[7])
        await new Promise(r => setTimeout(r, 300));
        document.getElementById("address2").focus()
        document.getElementById("address2").value = inputtag[5] + " " + inputtag[6]
        document.getElementById("address2").dispatchEvent(e)


        var clicked = false
        var postcode = inputtag[7]
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
        document.querySelectorAll("[id='btnAdvSearch']")[3].click()
        document.getElementById("btnAdd").click()
        console.log("creating asset")
        while (!document.getElementById("categoryName")) {
            await new Promise(r => setTimeout(r, 10));
            console.log("waiting for category name")
        }
        if (inputtag[9] == "Other") {
            document.querySelectorAll("[id='assetName']")[1].value = inputtag[8] + " " + inputtag[9]
        } else {
            document.querySelectorAll("[id='assetName']")[1].value = inputtag[8] + " " + inputtag[9].slice(0, inputtag[9].length - 1)
        }
        if (inputtag[9] == "Cooktops") {
            document.getElementById("categoryName").value = inputtag[9].slice(0, 7)
            document.getElementById("categoryName").focus()
            await new Promise(r => setTimeout(r, 300));
            document.getElementById("categoryName").dispatchEvent(e)

        }
        else {
            document.querySelectorAll("[id='btnAdvSearch']")[8].click()
            while (!document.getElementById("265")) {
                await new Promise(r => setTimeout(r, 10));
                console.log("waiting for category name")
            }
            document.getElementById(dict[inputtag[9]]).click()
            //console.log(document.querySelectorAll("[id='btnSelect']"))
            document.querySelectorAll("[id='btnSelect']")[1].click()
        }
        while (document.getElementById("categoryName")) {
            if (inputtag[9] != "Cooktops") {
                document.getElementsByClassName("afBtn--small afBtn__fill af-success")[0].click()
                break
            }
            await new Promise(r => setTimeout(r, 10));

            console.log("waiting for category close")
        }
        //set internet, sleep then set time
        if (document.getElementById("_Cust299")) document.getElementById("_Cust299").value = "Online Booking"
        if (document.getElementById("_Cust300")) document.getElementById("_Cust300").value = "Online Booking"
        if (document.getElementById("_Cust301")) document.getElementById("_Cust301").value = "Online Booking"
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
                var node = document.querySelector('[title="'+inputtag[10]+'"]');
                if(node)node.classList.add("ui-state-highlight")
                switch(inputtag[11]){
                    case "AM":
                        document.getElementById("amButton").style.background='#FFFF00'
                        break
                    case "PM":
                        document.getElementById("pmButton").style.background='#FFFF00'
                        break
                    default:
                        document.getElementById("anyButton").style.background='#FFFF00'

                }
                document.getElementById("btnShowCal_1_0").click()
                var node = document.querySelector('[title="'+inputtag[10]+'"]');
                if(node)node.parentElement.classList.add("ui-state-highlight")
                document.getElementsByClassName("btnAddUsers")[0].click()
                var listOfTechs = []
                for (const tech in techLocations) {
                    if (techLocations[tech].includes(postcode)) listOfTechs.push(tech)
                }
                console.log(listOfTechs)
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
                }
                else { 
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
                        mapButtons = mapButtons.children[0]

                    }
                    //var mapButtons = mapBox.children[1].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children
                    console.log(mapButtons)
                    while (mapButtons.length < 16) {
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
                }
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
            schedLoop:
            while (true) {
                while (document.getElementsByClassName("schedStartTime vd_required vd_time  afTextfield__input afTextfield__input--small ui-timepicker-input").length == 0 || !document.getElementsByClassName("schedNote afTextfield__input afTextfield__input--small vd_length")[0].value == "") {
                    await new Promise(r => setTimeout(r, 10));
                    console.log("sleeping")
                    if (document.getElementsByClassName("afBtn afBtn__fill af-primary fc-button-today ui") && !document.getElementById("ui-dialog-title-dlgSchedDetails")) return
                }
                if (document.getElementsByClassName("schedNote afTextfield__input afTextfield__input--small vd_length")[0].value == "") {
                    switch (inputtag[11]) {
                        case "AM":
                            document.getElementById("amButton").click()
                            break
                        case "PM":
                            document.getElementById("pmButton").click()
                            break
                        default:
                            document.getElementById("anyButton").click()
                    }
                }
            }
        }
    });
}


var searchPostcode2 = async function (postcode) {
    var listOfTechs = []
    for (const tech in techLocations) {
        if (techLocations[tech].includes(postcode)) listOfTechs.push(tech)
    }
    if (listOfTechs.length == 0) alert("postcode " + postcode + " not assigned to any technicians, may be out of area")
}

