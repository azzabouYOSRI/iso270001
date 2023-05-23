package com.ysoriazabou.iso270001.logic.interfaces;

import com.ysoriazabou.iso270001.dao.entities.Task;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TaskInterface
{
    @Transactional
    Task save(Task activity);

    @Transactional
    void deleteById(long id);

    @Transactional
    Task findById(long id);

    @Transactional
    List<Task> findAll();

    @Transactional
    List<Task> findAllByActivityId(long id);

    @Transactional
    Task findByAlternateId(String alternateId);


}
