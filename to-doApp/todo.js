    window.addEventListener("load" , () => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));

        if(storedTasks){
            storedTasks.forEach((task) => tasks.push(task));
            updateTasksLists();
            updateStats();
        }
    })
    
    const tasks = [];
    
    const saveTasks = () => {
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }


    const updateStats = () => {
        const completeTasks = tasks.filter(task=>task.completed).length;
        const  totalTasks = tasks.length;
        const progress = (completeTasks/totalTasks)*100;
        const progressBar = document.querySelector("#progress");
        progressBar.style.width = `${progress}%`;

        document.querySelector("#numbers").innerText = `${completeTasks} / ${totalTasks}`;

        if(tasks.length && completeTasks === totalTasks){
            blastconfetti();
        }
    };


    const toggleTaskComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        updateTasksLists();
        updateStats();
        saveTasks();
    };

    const editTask = (index) => {
        const taskInputs = document.querySelector("form input");
        taskInputs.value = tasks[index].text;
        tasks.splice(index,1);
        updateTasksLists();
        updateStats();
        saveTasks();
    }

    const deleteTask = (index) => {
        tasks.splice(index,1);
        updateTasksLists();
        updateStats();
        saveTasks();
    }

  


    const updateTasksLists = () => {
        const taskLists = document.querySelector(".task-lists");

        taskLists.innerHTML = "";
        tasks.forEach((task,index) => {
            const listItem = document.createElement("li");
            
            listItem.innerHTML = `
            <div class="taskItem">
                    <div class="task ${task.completed ? "completed" :""}" >
                        <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
                        <p>${task.text}</p>
                    </div>
                    <div class="icons">
                    
                        <i class="fa-regular fa-pen-to-square" style="color: rgb(130, 141, 255);" onclick="editTask(${index})" ></i>
                        <i class="fa-regular fa-trash-can" style="color: rgb(162, 33, 33);" onclick="deleteTask(${index})"></i>
                    </div>
                </div>`;
                listItem.addEventListener("change", () => toggleTaskComplete(index));
                taskLists.append(listItem);

        }) ;
    };

    const addTask = () => {
        const taskInput = document.querySelector("form input");
        const text = taskInput.value.trim();
        
        if(text){
            tasks.push({text: text , completed: false});
                taskInput.value = "";
                updateTasksLists();
                updateStats();
                saveTasks();
        }


    };

    document.querySelector("form button").addEventListener("click",(evt) => {
        evt.preventDefault();
        addTask();
    }); 


    
    const blastconfetti = () => {
        const count = 200,
        defaults = { origin: { y: .7 } };

        function fire(particleRatio, opts) {
          confetti(Object.assign({}, defaults, opts, { particleCount: Math.floor(count * particleRatio) }));
        }
        fire(.25, {
          spread: 26,
          startVelocity: 55
        });
        fire(.2, { spread: 60 });
        fire(.35, {
          spread: 100,
          decay: .91,
          scalar: .8
        });
        fire(.1, {
          spread: 120,
          startVelocity: 25,
          decay: .92,
          scalar: 1.2
        });
        fire(.1, {
          spread: 120,
          startVelocity: 45
        });
    }
  