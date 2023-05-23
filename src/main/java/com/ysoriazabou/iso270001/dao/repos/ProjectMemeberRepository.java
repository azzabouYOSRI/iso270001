package com.ysoriazabou.iso270001.dao.repos;

import com.ysoriazabou.iso270001.dao.entities.ProjectDependency;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectMemeberRepository extends JpaRepository<ProjectDependency, Long> {
}
