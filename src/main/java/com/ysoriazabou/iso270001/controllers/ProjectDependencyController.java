package com.ysoriazabou.iso270001.controllers;

import com.ysoriazabou.iso270001.dao.entities.ProjectDependency;
import com.ysoriazabou.iso270001.logic.services.ProjectDependencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project-dep")
public class ProjectDependencyController {

    private final ProjectDependencyService projectDependenciesService;
    @Autowired
    public ProjectDependencyController(ProjectDependencyService projectDependenciesService) {
        this.projectDependenciesService = projectDependenciesService;
    }

    @GetMapping("/all")
    public List<ProjectDependency> findAll(){

        return projectDependenciesService.findAll();
    }

    @GetMapping("/findbyid/{id}")
    public ResponseEntity<ProjectDependency> findByid(@PathVariable long id){
        return ResponseEntity.ok().body(projectDependenciesService.findById(id));
    }

    @PostMapping("/save")
    public ResponseEntity<ProjectDependency> save(@RequestBody ProjectDependency project){
        projectDependenciesService.save(project);
          return ResponseEntity.ok().body(project);
    }

    @DeleteMapping("/delete/{id}")
    public  ResponseEntity<Object>  delete(@PathVariable long id){
        projectDependenciesService.deleteById(id);
                return new ResponseEntity<>("{\"message\":\"project dependency deleted successfully\"}", HttpStatus.OK);
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<ProjectDependency> update(@PathVariable long id, @RequestBody ProjectDependency projectDependency){
        ProjectDependency projectDependencyExist = projectDependenciesService.findById(id);
        if (projectDependency.getName() != null){
        projectDependencyExist.setName(projectDependency.getName());
        }
        if (projectDependency.getDescription() != null){
        projectDependencyExist.setDescription(projectDependency.getDescription());
        }
        if (projectDependency.getCost() != null) {
            projectDependencyExist.setCost(projectDependency.getCost());
        }
        if (projectDependency.getType() != null){
            projectDependencyExist.setType(projectDependency.getType());
        }
                if (projectDependency.getUrl() != null){
        projectDependencyExist.setUrl(projectDependency.getUrl());
                }
        projectDependenciesService.save(projectDependencyExist);
        return ResponseEntity.ok().body(projectDependencyExist);
    }

     @GetMapping("/allbyproject/{id}")
    public ResponseEntity<List<ProjectDependency>> findAllByProject(@PathVariable long id){
        return ResponseEntity.ok().body(projectDependenciesService.findAllByProjectId(id));
    }
}
