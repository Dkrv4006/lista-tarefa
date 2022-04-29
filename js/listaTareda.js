;(function(){



    //Armazena


    const itemInput = document.getElementById("item-input")
    const todoAddForm = document.getElementById("todo-add")
    const ul =  document.getElementById("todo-list")
    const lis = ul.getElementsByTagName("li")


    let arrTasks = getSavedData()

    function getSavedData(){

        let tasksData = localStorage.getItem("tasks")
        tasksData = JSON.parse(tasksData)

        return tasksData && tasksData.length ? tasksData : [
            {
                name: "task 1",
                createAt: Date.now(),
                completed: false
            }
        ]

    }

    function setNewData () {
        localStorage.setItem("tasks", JSON.stringify(arrTasks))
    }

    setNewData()


    function generateLiTask(obj){
        const li = document.createElement('li')
        const p = document.createElement('p')
        const div = document.createElement('div')
        const checkButton = document.createElement("button")
        const editButton = document.createElement("i")
        const deletButton = document.createElement('i')

        div.className = "daniel"
        li.className ="todo-item"

        checkButton.className = "button-check"
        checkButton.innerHTML = `
                <i class="fas fa-check ${obj.completed ? "" : "displayNone" }" data-action = "checkButton"></i>`
        checkButton.setAttribute("data-action", "checkButton")

        li.appendChild(div)
        li.appendChild(checkButton)

        p.className = 'task-name'
        p.textContent = obj.name
        div.appendChild(p)

        editButton.className = "fas fa-edit"
        editButton.setAttribute("data-action", "editButton")
        li.appendChild(editButton)


        const containerEdit = document.createElement("div")
        containerEdit.className = "editContainer"

        const inputEdit = document.createElement('input')
        inputEdit.setAttribute("type","text")
        inputEdit.className = "editInput"
        inputEdit.value = obj.name
        containerEdit.appendChild(inputEdit)

        // Button edita
        const containerEditButton = document.createElement("button")
        containerEditButton.className = "editButton"
        containerEditButton.textContent = "Edit"
        containerEditButton.setAttribute("data-action", "containerEditButton")
        containerEdit.appendChild(containerEditButton)
        
        // Button cancelar
        const containercancelButton = document.createElement('button')
        containercancelButton.className = 'cancelButton'
        containercancelButton.textContent = "Cancel"
        containercancelButton.setAttribute("data-action", "containercancelButton")
        containerEdit.appendChild(containercancelButton)

        li.appendChild(containerEdit)

        deletButton.className = "fas fa-trash-alt"
        deletButton.setAttribute("data-action", "deleteButton")
        li.appendChild(deletButton)



        // addEventLi(li)
        return li
    }

    function renderTasks(){
        ul.innerHTML = ''
        arrTasks.forEach(task => {
        ul.appendChild(generateLiTask(task))
        ul.style.display = "flex"            
        });
    }

    function addTask(task){

        arrTasks.push({
             
            name: task,
            createAt: Date.now(),
            completed: false

        })
        setNewData()

    }

    function clickedUl(e){
        const dataAction = e.target.getAttribute("data-action")

        if(!dataAction) return

        let currentLi = e.target
        while(currentLi.nodeName !== "LI"){
            currentLi = currentLi.parentElement
        }


        const currentLiIndex = [...lis].indexOf(currentLi)
        


        const actions = {
            editButton: function () {
                const editContainer = currentLi.querySelector(".editContainer");
                
                
                [...ul.querySelectorAll(".editContainer")].forEach( container => {
                    container.removeAttribute("style")
                });
                editContainer.style.display = "flex"
                
            },

            deleteButton: function(){
                arrTasks.splice (currentLiIndex, 1)
                renderTasks()
                setNewData()
            },
            containerEditButton: function(){
                const val = currentLi.querySelector(".editInput").value
                arrTasks[currentLiIndex].name = val
                renderTasks()
                setNewData()
            },
            containercancelButton: function(){
                const editContainer = currentLi.querySelector(".editContainer")
                editContainer.style.display = "none"
                currentLi.querySelector(".editInput").value = arrTasks[currentLiIndex].name

            },
            checkButton: function(){
                arrTasks[currentLiIndex].completed = !arrTasks[currentLiIndex].completed

                if(arrTasks[currentLiIndex].completed){
                    currentLi.querySelector(".fa-check").classList.remove("displayNone")
                }else{
                    currentLi.querySelector(".fa-check").classList.add("displayNone")
                }

                setNewData()

            } 
        }

        if (actions[dataAction]){
            actions[dataAction]()
        }


    }

    todoAddForm.addEventListener("submit", function(e){
        e.preventDefault()
        let d = itemInput.value
        if(d === ""){

            alert("Escreva uma tarefa")
            
        }else{

            addTask(itemInput.value)
            renderTasks()
            itemInput.value = ''
            itemInput.focus()
        }
    });


    ul.addEventListener("click", clickedUl)


    renderTasks()

})()
