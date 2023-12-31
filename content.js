//code for adding am/pm/any buttons
window.addEventListener('load', async() => {
    var capitalFlag=0
    while(true){
        //code for adding am/pm/any buttons
        var schedBlocks = document.getElementsByClassName("imsMultiSchedule__settings afPageBox--contrast")
        for (let i = 0; i<schedBlocks.length;i++){
            if (schedBlocks[i].getElementsByTagName("button").length>0)continue
            else{
                var setTime = async function(start, finish, element){
                    var techlist = []
                    var selectedTechs = element.parentElement.parentElement.getElementsByClassName("schedResources afDataTable afDataTable--compact")[0].children[0].children
                    for(let i = 0; i < selectedTechs.length; i++){
                        if(selectedTechs[i].getAttribute("deleted")==1)continue
                        techlist+= selectedTechs[i].children[1].children[0].innerText
                        selectedTechs[i].children[2].children[0].value=start
                        selectedTechs[i].children[3].children[0].value=finish
                    }
                }
                console.log("success time buttons")
                var times = [["7:30am", "8:30am", "7:30"],["8:00am", "10:00am", "8 AM"],["8:30am", "9:30am","8:30"],
                            ["9:00am", "12:00pm","9 AM"],["10:00am", "1:00pm","10 AM"],["11:00am", "2:00pm","11 AM"],
                            ["12:00pm", "3:00pm","12 PM"],["1:00pm", "4:00pm","1 PM"],["2:00pm", "5:00pm","2 PM"],
                            ["3:00pm", "6:00pm","3 PM"]]
                var buttons = []
                for (let i = 0; i<times.length;i++){
                    var button = document.createElement('BUTTON')
                    var text = document.createTextNode(times[i][2])
                    button.appendChild(text)
                    button.type="button"
                    button.id = "button"+i
                    button.addEventListener("click", function(){setTime(times[i][0], times[i][1], this)})
                    buttons.push(button)
                }
                
    
                
                schedBlocks[i].appendChild(document.createElement('BR'))
                for (let j = 0; j<buttons.length; j++){
                    schedBlocks[i].appendChild(buttons[j])
                }
                
            
            }
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

