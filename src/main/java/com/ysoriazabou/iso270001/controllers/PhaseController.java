package com.ysoriazabou.iso270001.controllers;
import com.ysoriazabou.iso270001.dao.entities.Phase;
import com.ysoriazabou.iso270001.logic.services.PhaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/phase")
public class PhaseController {

    private final PhaseService phaseService;
    @Autowired
    public PhaseController(PhaseService phaseService) {
        this.phaseService = phaseService;
    }

    @GetMapping("/all")
    public List<Phase> findAll(){

        return phaseService.findAll();
    }

    @GetMapping("/findbyid/{id}")
    public ResponseEntity<Phase> findByid(@PathVariable long id){
        return ResponseEntity.ok().body(phaseService.findById(id));
    }

    @PostMapping("/save")
    public ResponseEntity<Phase> save(@RequestBody Phase phase){
        phaseService.save(phase);
          return ResponseEntity.ok().body(phase);
    }

    @DeleteMapping("/delete/{id}")
    public  ResponseEntity<Object>  delete(@PathVariable long id){
        phaseService.deleteById(id);
                return new ResponseEntity<>("{\"message\":\"phase deleted successfully\"}", HttpStatus.OK);
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<Phase> update(@PathVariable long id, @RequestBody Phase phase){
        Phase exist = phaseService.findById(id);
        if (phase.getDescription() != null){
            exist.setDescription(phase.getDescription());
        }
        if(phase.getStartDate() != null){
            exist.setStartDate(phase.getStartDate());
        }
        if(phase.getEndDate() != null){
            exist.setEndDate(phase.getEndDate());
        }
        if (phase.getName() != null){
            exist.setName(phase.getName());
        }
        if(phase.getAlternateId() != null){
            exist.setAlternateId(phase.getAlternateId());
        }
        if(phase.getCost() != null){
            exist.setCost(phase.getCost());
        }
        if(phase.getRealStartDate() != null){
            exist.setRealStartDate(phase.getRealStartDate());
        }
        if(phase.getRealEndDate() != null){
            exist.setRealEndDate(phase.getRealEndDate());
        }
        if (phase.getParent() != null){
            exist.setParent(phase.getParent());
        }
        if (phase.getProgress() != null){
            exist.setProgress(phase.getProgress());
        }
        if (phase.getPosistion() != null){
            exist.setPosistion(phase.getPosistion());
        }
        if (phase.getInitialized()!= null){
            exist.setInitialized(phase.getInitialized());
        }
        if (phase.getIsSubPhase()!= null){
            exist.setIsSubPhase(phase.getIsSubPhase());
        }


phaseService.save(exist);
        return ResponseEntity.ok().body(exist);
    }

    @GetMapping("/allbyproject/{id}")
    public ResponseEntity<List<Phase>> findAllByProject(@PathVariable long id){
        return ResponseEntity.ok().body(phaseService.findAllByProjectId(id));
    }
}
