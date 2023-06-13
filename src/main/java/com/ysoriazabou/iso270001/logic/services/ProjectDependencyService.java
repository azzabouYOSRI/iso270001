package com.ysoriazabou.iso270001.logic.services;

import com.ysoriazabou.iso270001.dao.entities.ProjectDependency;
import com.ysoriazabou.iso270001.dao.repos.DependencyRepository;
import com.ysoriazabou.iso270001.logic.interfaces.ProjectDependencyInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectDependencyService implements ProjectDependencyInterface {

    private final DependencyRepository dependencyRepository;

    @Autowired
    public ProjectDependencyService(DependencyRepository dependencyRepository) {
        this.dependencyRepository = dependencyRepository;
    }

    @Override
    @Transactional
    public ProjectDependency save(ProjectDependency projectDependency) {
        dependencyRepository.save(projectDependency);
        return projectDependency;
    }

    @Override
    @Transactional
    public void deleteById(long id) {
        dependencyRepository.deleteById(id);
    }

    @Override
    @Transactional
    public ProjectDependency findById(long id) {
        Optional<ProjectDependency> optionalUser = dependencyRepository.findById(id);
        return optionalUser.orElse(new ProjectDependency());
    }

    @Override
    @Transactional
    public List<ProjectDependency> findAll() {
       return  dependencyRepository.findAll();
    }

       @Override
    @Transactional
    public List<ProjectDependency> findAllByProjectId(long idp) {
       return  dependencyRepository.findAllByProjectIdp(idp);

    }
    }
