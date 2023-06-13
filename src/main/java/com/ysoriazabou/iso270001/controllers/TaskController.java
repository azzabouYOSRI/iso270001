package com.ysoriazabou.iso270001.controllers;
import com.ysoriazabou.iso270001.dao.entities.Task;
import com.ysoriazabou.iso270001.logic.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {

    private final TaskService taskService;
    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/all")
    public List<Task> findAll(){

        return taskService.findAll();
    }

    @GetMapping("/findbyid/{id}")
    public ResponseEntity<Task> findByid(@PathVariable long id){
        return ResponseEntity.ok().body(taskService.findById(id));
    }

    @PostMapping("/save")
    public ResponseEntity<Task> save(@RequestBody Task task){
        taskService.save(task);
          return ResponseEntity.ok().body(task);
    }

    @DeleteMapping("/delete/{id}")
    public  ResponseEntity<Object>  delete(@PathVariable long id){
        taskService.deleteById(id);
                return new ResponseEntity<>("{\"message\":\"task deleted successfully\"}", HttpStatus.OK);
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<Task> update(@PathVariable long id, @RequestBody Task task){

        Task exist = taskService.findById(id);
        if (task.getDescription() != null){
            exist.setDescription(task.getDescription());
        }
        if(task.getStartDate() != null){
            exist.setStartDate(task.getStartDate());
        }
        if(task.getEndDate() != null){
            exist.setEndDate(task.getEndDate());
        }
        if (task.getName() != null){
            exist.setName(task.getName());
        }
        if(task.getAlternateId() != null){
            exist.setAlternateId(task.getAlternateId());
        }
        if(task.getCost() != null){
            exist.setCost(task.getCost());
        }
        if(task.getRealStartDate() != null){
            exist.setRealStartDate(task.getRealStartDate());
        }
        if(task.getRealEndDate() != null){
            exist.setRealEndDate(task.getRealEndDate());
        }
        if (task.getActivity() != null){
            exist.setActivity(task.getActivity());
        }
        if (task.getProgress() != null){
            exist.setProgress(task.getProgress());
        }
        if (task.getPosistion() != null){
            exist.setPosistion(task.getPosistion());
        }
        if (task.getValidated() != null){
            exist.setValidated(task.getValidated());
        }
        if (task.getMember() != null){
            exist.setMember(task.getMember());
        }
        if (task.getChildDones() != null){
            exist.setChildDones(task.getChildDones());
        }
       if (task.getUrl() != null){
            exist.setUrl(task.getUrl());
        }


taskService.save(exist);
        return ResponseEntity.ok().body(exist);
    }

    @GetMapping("/allbyact/{id}")
    public ResponseEntity<List<Task>> findAllByProject(@PathVariable long id){
        return ResponseEntity.ok().body(taskService.findAllByActivityId(id));
    }

    @GetMapping("/findbyaltid/{alternateId}")
    public ResponseEntity<Task> findByAlternateId(@PathVariable String alternateId){
        return ResponseEntity.ok().body(taskService.findByAlternateId(alternateId));
    }

}
