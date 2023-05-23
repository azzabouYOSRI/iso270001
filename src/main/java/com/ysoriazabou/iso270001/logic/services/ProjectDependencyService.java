package com.ysoriazabou.iso270001.logic.services;

import com.ysoriazabou.iso270001.dao.entities.ProjectDependency;
import com.ysoriazabou.iso270001.dao.repos.ProjectMemeberRepository;
import com.ysoriazabou.iso270001.logic.interfaces.ProjectDependencyInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectDependencyService implements ProjectDependencyInterface {

    private final ProjectMemeberRepository projectMemeberRepository;

    @Autowired
    public ProjectDependencyService(ProjectMemeberRepository projectMemeberRepository) {
        this.projectMemeberRepository = projectMemeberRepository;
    }

    @Override
    @Transactional
    public ProjectDependency save(ProjectDependency projectDependency) {
        projectMemeberRepository.save(projectDependency);
        return projectDependency;
    }

    @Override
    @Transactional
    public void deleteById(long id) {
        projectMemeberRepository.deleteById(id);
    }

    @Override
    @Transactional
    public ProjectDependency findById(long id) {
        Optional<ProjectDependency> optionalUser = projectMemeberRepository.findById(id);
        return optionalUser.orElse(new ProjectDependency());
    }

    @Override
    @Transactional
    public List<ProjectDependency> findAll() {
       return  projectMemeberRepository.findAll();
    }

    }
