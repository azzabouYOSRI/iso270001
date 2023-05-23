package com.ysoriazabou.iso270001.controllers;

import com.ysoriazabou.iso270001.dao.entities.SubTask;
import com.ysoriazabou.iso270001.logic.services.SubTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subtask")
public class SubTaskController {

    private final SubTaskService subTaskService;
    @Autowired
    public SubTaskController(SubTaskService subTaskService) {
        this.subTaskService = subTaskService;
    }

    @GetMapping("/all")
    public List<SubTask> findAll(){

        return subTaskService.findAll();
    }

    @GetMapping("/findbyid/{id}")
    public ResponseEntity<SubTask> findByid(@PathVariable long id){
        return ResponseEntity.ok().body(subTaskService.findById(id));
    }

    @PostMapping("/save")
    public ResponseEntity<SubTask> save(@RequestBody SubTask subTask){
        subTaskService.save(subTask);
          return ResponseEntity.ok().body(subTask);
    }

    @DeleteMapping("/delete/{id}")
    public  ResponseEntity<Object>  delete(@PathVariable long id){
        subTaskService.deleteById(id);
                return new ResponseEntity<>("{\"message\":\"subTask deleted successfully\"}", HttpStatus.OK);
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<SubTask> update(@PathVariable long id, @RequestBody SubTask subTask){

        SubTask exist = subTaskService.findById(id);
        if (subTask.getDescription() != null){
            exist.setDescription(subTask.getDescription());
        }if (subTask.getName() != null){
            exist.setName(subTask.getName());
        }
        if (subTask.getName() != null){
            exist.setName(subTask.getName());
        }
        if(subTask.getDone() != null){
            exist.setDone(subTask.getDone());
        }
        if (subTask.getPosistion() != null){
            exist.setPosistion(subTask.getPosistion());
        }
        if(subTask.getAlternateId() != null){
            exist.setAlternateId(subTask.getAlternateId());
        }
        if (subTask.getUrl() != null){
                exist.setUrl(subTask.getUrl());
        }

subTaskService.save(exist);
        return ResponseEntity.ok().body(exist);
    }

    @GetMapping("/allbytask/{id}")
    public ResponseEntity<List<SubTask>> findAllByProject(@PathVariable long id){
        return ResponseEntity.ok().body(subTaskService.findAllByTaskId(id));
    }

}
