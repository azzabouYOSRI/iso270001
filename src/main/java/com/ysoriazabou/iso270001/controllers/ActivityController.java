package com.ysoriazabou.iso270001.controllers;
import com.ysoriazabou.iso270001.dao.entities.Activity;
import com.ysoriazabou.iso270001.logic.services.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/activity")
public class ActivityController {

    private final ActivityService activityService;
    @Autowired
    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping("/all")
    public List<Activity> findAll(){

        return activityService.findAll();
    }

    @GetMapping("/findbyid/{id}")
    public ResponseEntity<Activity> findByid(@PathVariable long id){
        return ResponseEntity.ok().body(activityService.findById(id));
    }

    @PostMapping("/save")
    public ResponseEntity<Activity> save(@RequestBody Activity activity){
        activityService.save(activity);
          return ResponseEntity.ok().body(activity);
    }

    @DeleteMapping("/delete/{id}")
    public  ResponseEntity<Object>  delete(@PathVariable long id){
        activityService.deleteById(id);
                return new ResponseEntity<>("{\"message\":\"activity deleted successfully\"}", HttpStatus.OK);
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<Activity> update(@PathVariable long id, @RequestBody Activity activity){

        Activity exist = activityService.findById(id);
        if (activity.getDescription() != null){
            exist.setDescription(activity.getDescription());
        }
        if(activity.getStartDate() != null){
            exist.setStartDate(activity.getStartDate());
        }
        if(activity.getEndDate() != null){
            exist.setEndDate(activity.getEndDate());
        }
        if (activity.getName() != null){
            exist.setName(activity.getName());
        }
        if(activity.getAlternateId() != null){
            exist.setAlternateId(activity.getAlternateId());
        }
        if(activity.getCost() != null){
            exist.setCost(activity.getCost());
        }
        if(activity.getRealStartDate() != null){
            exist.setRealStartDate(activity.getRealStartDate());
        }
        if(activity.getRealEndDate() != null){
            exist.setRealEndDate(activity.getRealEndDate());
        }
        if (activity.getPhase() != null){
            exist.setPhase(activity.getPhase());
        }
        if (activity.getProgress() != null){
            exist.setProgress(activity.getProgress());
        }
        if (activity.getPosistion() != null){
            exist.setPosistion(activity.getPosistion());
        }
          if (activity.getChildDones() != null){
            exist.setChildDones(activity.getChildDones());
        }
            if (activity.getUrl() != null){
            exist.setUrl(activity.getUrl());
        }

activityService.save(exist);
        return ResponseEntity.ok().body(exist);
    }

    @GetMapping("/allbyphase/{id}")
    public ResponseEntity<List<Activity>> findAllByProject(@PathVariable long id){
        return ResponseEntity.ok().body(activityService.findAllByPhaseId(id));
    }

}
