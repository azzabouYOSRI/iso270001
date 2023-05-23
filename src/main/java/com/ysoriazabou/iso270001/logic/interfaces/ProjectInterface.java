package com.ysoriazabou.iso270001.logic.interfaces;

import com.ysoriazabou.iso270001.dao.entities.ProjectEntity;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ProjectInterface
{
    @Transactional
    ProjectEntity save(ProjectEntity projectEntity);

    @Transactional
    void deleteById(long id);

    @Transactional
    ProjectEntity findById(long id);

    @Transactional
    List<ProjectEntity> findAll();

    @Transactional
    ProjectEntity findByAlternateId(String alternateId);


}
