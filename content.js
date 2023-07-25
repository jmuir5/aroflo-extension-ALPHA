//code for adding am/pm/any buttons
window.addEventListener('load', async() => {
    var capitalFlag=0
    while(true){
        //code for adding am/pm/any buttons
        if (document.getElementsByClassName("imsMultiSchedule__settings afPageBox--contrast")[0]&&!document.getElementById("amButton")) {
            console.log("success time buttons")
            const schedBlock = document.getElementsByClassName("imsMultiSchedule__settings afPageBox--contrast")[0]
            var amButton = document.createElement('BUTTON')
            var pmButton = document.createElement('BUTTON')
            var anyButton = document.createElement('BUTTON')

            var amText = document.createTextNode("AM")
            var pmText = document.createTextNode("PM")
            var anyText = document.createTextNode("ANY")
        
            amButton.appendChild(amText)
            pmButton.appendChild(pmText)
            anyButton.appendChild(anyText)

            amButton.type="button"
            pmButton.type="button"
            anyButton.type="button"

            amButton.id="amButton"
            pmButton.id="pmButton"
            anyButton.id="anyButton"

            
            schedBlock.appendChild(document.createElement('BR'))
            schedBlock.appendChild(amButton)
            schedBlock.appendChild(pmButton)
            schedBlock.appendChild(anyButton)
            var branch = 0
            
            
            
        
            amButton.addEventListener("click", async function(event){
                var start = "8:30am"
                var end = "12:30pm"
                var status = "confirmed"
                var techlist = []
                var selectedTechs = document.getElementsByClassName("schedResources afDataTable afDataTable--compact")[0].children[0].children

                if(document.getElementById("assignedUsersArea")){
                    if(document.getElementById("assignedUsersArea").children.length>0){
                        var l1=document.getElementById("assignedUsersArea").children.length
                        for(let i = 0; i < l1; i++){
                            document.getElementById("assignedUsersArea").children[0].children[0].children[1].click()
                        }
                    }
                }

                if(document.getElementsByClassName("schedResources afDataTable afDataTable--compact"))
                if(document.getElementById("_Cust301")) branch = document.getElementById("_Cust301")
                else if(document.getElementById("_Cust299")) branch = document.getElementById("_Cust299")
                else if(document.getElementById("_Cust300")) branch = document.getElementById("_Cust300")
                for(let i = 0; i < selectedTechs.length; i++){
                    if(selectedTechs[i].getAttribute("deleted")==1)continue
                    techlist+= selectedTechs[i].children[1].children[0].innerText
                    selectedTechs[i].children[2].children[0].value=start
                    selectedTechs[i].children[3].children[0].value=end
                    if(branch){
                        if(branch.value == "Online Booking") status = "unconfirmed"
                    }
                    selectedTechs[i].children[4].children[0].value=status
                }

                document.getElementById("btnAssignResources").click()
                while(document.getElementsByClassName("ui-jqgrid-btable")[0].children[0].children.length<=1){
                    await new Promise(r => setTimeout(r, 10));
                    console.log("waiting for asign to load")
                }
                var assignList = document.getElementsByClassName("ui-jqgrid-btable")[0].children[0].children
                var counter = 0
                console.log(assignList.length)
                
                
                
                for(let i = 0; i < assignList.length; i++){
                    if(counter==techlist.length)break
                    if(techlist.includes(assignList[i].children[3].innerText)){
                        assignList[i].click()
                        counter+=1
                    }
                }
                document.getElementById("btnSelect").click()
            })
        
            pmButton.addEventListener("click", async function(event){
                var start = "12:30pm"
                var end = "5:00pm"
                var status = "confirmed"
                var techlist = []
                var selectedTechs = document.getElementsByClassName("schedResources afDataTable afDataTable--compact")[0].children[0].children
                
                if(document.getElementById("assignedUsersArea")){
                    if(document.getElementById("assignedUsersArea").children.length>0){
                        var l1=document.getElementById("assignedUsersArea").children.length
                        for(let i = 0; i < l1; i++){
                            document.getElementById("assignedUsersArea").children[0].children[0].children[1].click()
                        }
                    }
                }

                if(document.getElementById("_Cust301")) branch = document.getElementById("_Cust301")
                else if(document.getElementById("_Cust299")) branch = document.getElementById("_Cust299")
                else if(document.getElementById("_Cust300")) branch = document.getElementById("_Cust300")
                for(let i = 0; i < selectedTechs.length; i++){
                    if(selectedTechs[i].getAttribute("deleted")==1)continue
                    techlist+= selectedTechs[i].children[1].children[0].innerText
                    selectedTechs[i].children[2].children[0].value=start
                    selectedTechs[i].children[3].children[0].value=end
                    if(branch){
                        if(branch.value == "Online Booking") status = "unconfirmed"
                    }
                    selectedTechs[i].children[4].children[0].value=status
                }

                document.getElementById("btnAssignResources").click()
                while(document.getElementsByClassName("ui-jqgrid-btable")[0].children[0].children.length<=1){
                    await new Promise(r => setTimeout(r, 10));
                    console.log("waiting for asign to load")
                }
                var assignList = document.getElementsByClassName("ui-jqgrid-btable")[0].children[0].children
                var closeButton = document.getElementsByClassName("ui-jqgrid-btable")[0].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[0].children[0]

                var counter = 0
                for(let i = 0; i < assignList.length; i++){
                    if(counter==techlist.length)break
                    if(techlist.includes(assignList[i].children[3].innerText)){
                        assignList[i].click()
                        counter+=1
                    }
                }closeButton.click()
            })
        
            anyButton.addEventListener("click", async function(event){
                var start = "9:00am"
                var end = "5:00pm"
                var status = "confirmed"
                var techlist = []
                var selectedTechs = document.getElementsByClassName("schedResources afDataTable afDataTable--compact")[0].children[0].children
                
                if(document.getElementById("assignedUsersArea")){
                    if(document.getElementById("assignedUsersArea").children.length>0){
                        var l1=document.getElementById("assignedUsersArea").children.length
                        for(let i = 0; i < l1; i++){
                            document.getElementById("assignedUsersArea").children[0].children[0].children[1].click()
                        }
                    }
                }

                if(document.getElementById("_Cust301")) branch = document.getElementById("_Cust301")
                else if(document.getElementById("_Cust299")) branch = document.getElementById("_Cust299")
                else if(document.getElementById("_Cust300")) branch = document.getElementById("_Cust300")
                for(let i = 0; i < selectedTechs.length; i++){
                    if(selectedTechs[i].getAttribute("deleted"))continue
                    techlist+= selectedTechs[i].children[1].children[0].innerText
                    selectedTechs[i].children[2].children[0].value=start
                    selectedTechs[i].children[3].children[0].value=end
                    if(branch){
                        if(branch.value == "Online Booking") status = "unconfirmed"
                    }
                    selectedTechs[i].children[4].children[0].value=status
                }

                document.getElementById("btnAssignResources").click()
                while(document.getElementsByClassName("ui-jqgrid-btable")[0].children[0].children.length<=1){
                    await new Promise(r => setTimeout(r, 10));
                    console.log("waiting for asign to load")
                }
                var assignList = document.getElementsByClassName("ui-jqgrid-btable")[0].children[0].children
                //var closeButton = document.getElementsByClassName("ui-jqgrid-btable")[0].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[0].children[0]
                var counter = 0
                for(let i = 0; i < assignList.length; i++){
                    if(counter==techlist.length)break
                    if(techlist.includes(assignList[i].children[3].innerText)){
                        assignList[i].click()
                        counter+=1
                    }
                }
                document.getElementById("btnSelect").click()
                //closeButton.click()
            })
            
        
        }
        if(document.getElementById("givennames")&&document.getElementById("surname")&&capitalFlag==0){
            console.log("success names")
            capitalFlag=1
            var fName = document.getElementById("givennames")
            var lName = document.getElementById("surname")
            
            fName.oninput=()=>{
                fName.value = fName.value.charAt(0).toUpperCase() + fName.value.slice(1);
            }

            lName.oninput=()=>{
                lName.value = lName.value.charAt(0).toUpperCase() + lName.value.slice(1);
            }

        }
        if(!document.getElementById("givennames")&&!document.getElementById("surname")&&capitalFlag==1){
            capitalFlag=0
        }
        
        await new Promise(r => setTimeout(r, 10));
        //console.log("sleeping2")
        
        
    }
  })