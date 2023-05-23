package com.ysoriazabou.iso270001.dao.repos;

import com.ysoriazabou.iso270001.dao.entities.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<ProjectEntity, Long> {

    ProjectEntity findByAlternateId(String alternateId);

}
