package com.ysoriazabou.iso270001.dao.repos;

import com.ysoriazabou.iso270001.dao.entities.SubTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubTaskRepository extends JpaRepository<SubTask, Long> {
        List<SubTask> findAllByTaskId(long id);
}
