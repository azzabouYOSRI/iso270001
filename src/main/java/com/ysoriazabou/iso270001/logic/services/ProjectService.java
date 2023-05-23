package com.ysoriazabou.iso270001.logic.services;

import com.ysoriazabou.iso270001.dao.entities.ProjectEntity;
import com.ysoriazabou.iso270001.dao.repos.ProjectRepository;
import com.ysoriazabou.iso270001.logic.interfaces.ProjectInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService implements ProjectInterface {

    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    @Transactional
    public ProjectEntity save(ProjectEntity projectEntity) {
        projectRepository.save(projectEntity);
        return projectEntity;
    }

    @Override
    @Transactional
    public void deleteById(long id) {
        projectRepository.deleteById(id);
    }

    @Override
    @Transactional
    public ProjectEntity findById(long id) {
        Optional<ProjectEntity> optionalProject = projectRepository.findById(id);
        return optionalProject.orElse(new ProjectEntity());
    }

    @Override
    @Transactional
    public List<ProjectEntity> findAll() {
                Optional<List<ProjectEntity>> optionalListProject = Optional.of(projectRepository.findAll());
        return  optionalListProject.orElse(new ArrayList<>());
    }

    @Override
    @Transactional
    public ProjectEntity findByAlternateId(String alternateId) {
        Optional<ProjectEntity> optionalProject = Optional.ofNullable(projectRepository.findByAlternateId(alternateId));
        return optionalProject.orElse(new ProjectEntity());
    }
    }
