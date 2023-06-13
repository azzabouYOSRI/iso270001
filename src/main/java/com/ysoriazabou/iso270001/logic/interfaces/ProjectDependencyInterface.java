package com.ysoriazabou.iso270001.logic.interfaces;

import com.ysoriazabou.iso270001.dao.entities.ProjectDependency;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ProjectDependencyInterface
{
    @Transactional
    ProjectDependency save(ProjectDependency projectDependency);

    @Transactional
    void deleteById(long id);

    @Transactional
    ProjectDependency findById(long id);

    @Transactional
    List<ProjectDependency> findAll();


    @Transactional
    List<ProjectDependency> findAllByProjectId(long idp);
}
