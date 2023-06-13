package com.ysoriazabou.iso270001.dao.repos;

import com.ysoriazabou.iso270001.dao.entities.ProjectDependency;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DependencyRepository extends JpaRepository<ProjectDependency, Long> {
    List<ProjectDependency> findAllByProjectIdp(long idp);
}
