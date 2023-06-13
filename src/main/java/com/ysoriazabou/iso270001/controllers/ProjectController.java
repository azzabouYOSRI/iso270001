package com.ysoriazabou.iso270001.controllers;
import com.ysoriazabou.iso270001.dao.entities.ProjectEntity;
import com.ysoriazabou.iso270001.logic.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project")
public class ProjectController {

    private final ProjectService projectService;
    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/all")
    public List<ProjectEntity> findAll(){

        return projectService.findAll();
    }

    @GetMapping("/findbyid/{id}")
    public ResponseEntity<ProjectEntity> findByid(@PathVariable long id){
        return ResponseEntity.ok().body(projectService.findById(id));
    }

    @PostMapping("/save")
    public ResponseEntity<ProjectEntity> save(@RequestBody ProjectEntity project){
        projectService.save(project);
          return ResponseEntity.ok().body(project);
    }

    @DeleteMapping("/delete/{id}")
    public  ResponseEntity<Object>  delete(@PathVariable long id){
        projectService.deleteById(id);
                return new ResponseEntity<>("{\"message\":\"project deleted successfully\"}", HttpStatus.OK);
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<ProjectEntity> update(@PathVariable long id, @RequestBody ProjectEntity project){
        ProjectEntity projectExist = projectService.findById(id);
        if (project.getName() != null){
        projectExist.setName(project.getName());
        }
        if (project.getDescription() != null){
        projectExist.setDescription(project.getDescription());
        }
        if (project.getStartDate() != null) {
            projectExist.setStartDate(project.getStartDate());
        }
        if (project.getEndDate() != null){
            projectExist.setEndDate(project.getEndDate());
        }
                if (project.getActiveProject() != null){
        projectExist.setActiveProject(project.getActiveProject());
        }
if (project.getBudget() != null){
                projectExist.setBudget(project.getBudget());
        }
    if (project.getClient() != null){
        projectExist.setClient(project.getClient());
        }
        if (project.getInitialized()!= null){
            projectExist.setInitialized(project.getInitialized());
        }
          if (project.getProgress() != null){
            projectExist.setProgress(project.getProgress());
        }

          if (project.getAlternateId() != null){
            projectExist.setAlternateId(project.getAlternateId());}

          if (project.getRealEndDate() != null){
            projectExist.setRealEndDate(project.getRealEndDate());
        }
          if (project.getRealStartDate() != null){
            projectExist.setRealStartDate(project.getRealStartDate());}

          if (project.getUrl() != null){
            projectExist.setUrl(project.getUrl());}

          if (project.getCost2() != null){
            projectExist.setCost2(project.getCost2());}

        projectService.save(projectExist);
        return ResponseEntity.ok().body(projectExist);}
    @GetMapping("/findbyaltid/{alternateId}")
    public ResponseEntity<ProjectEntity> findByAlternateId(@PathVariable String alternateId){
        return ResponseEntity.ok().body(projectService.findByAlternateId(alternateId));
    }
}
