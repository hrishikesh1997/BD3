const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;
let cors = require('cors');

app.use(cors());

app.use(express.static('static'));


let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 }
]

function AddData(taskId,text,priority){
  let pushdata = {taskId,text,priority}
  tasks.push(pushdata);
  return tasks;
}
   
app.get('/tasks/add',(req,res)=>{
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority=req.query.priority;
  let result = AddData(taskId,text,priority);
  res.json(result);
})
  function ShowTask(){
    return  tasks
  }
app.get('/tasks',(req,res)=>{
  let result = ShowTask()
  res.json(result)
})
       
  function SortByPriority(priority1,priority2){
        return priority1.priority -priority2.priority
  }
  function SortTask(){
     return tasks.sort(SortByPriority)
  }

app.get('/tasks/sort-by-priority',(req,res)=>{
  let result = SortTask();
  res.json(result)
})

      function UpdatePriority(tasks,taskId,priority){
          for(let i=0;i<tasks.length;i++){
            if (tasks[i].taskId === taskId) {
              tasks[i].priority = priority
            }
          }
          return tasks;
      }

  app.get('/tasks/edit-priority',(req,res)=>{
     let taskId = parseInt(req.query.taskId);
     let priority = parseInt(req.query.priority);
     let result = UpdatePriority(tasks,taskId,priority);
     res.json(result)
  })

    function UpdatText(tasks,taskId,text){
      for (let i=0 ;i< tasks.length;i++){
         if(tasks[i].taskId === taskId) {
            tasks[i].text = text
         }
      }
      return tasks;
    }

  app.get('/tasks/edit-text',(req,res)=>{
    let taskId = parseInt(req.query.taskId);
    let text = req.query.text;
    let result = UpdatText(tasks,taskId,text);
    res.json(result)
  })
      
  function DeleteTask(ele,taskId){
    return  ele.taskId !== taskId
  }

    app.get('/tasks/delete',(req,res)=>{
      let taskId = parseInt(req.query.taskId)
      let result =  tasks.filter(ele => DeleteTask(ele,taskId) ) 
      res.json(result)
    })
           function FilterByPriority(ele,priority){
               return ele.priority === priority;
           }         

         app.get('/tasks/filter-by-priority',(req,res)=>{
           let priority =parseInt(req.query.priority);
           let result = tasks.filter(ele => FilterByPriority(ele,priority))
           res.json(result)
         })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
