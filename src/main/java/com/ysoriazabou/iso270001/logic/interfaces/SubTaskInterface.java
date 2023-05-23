package com.ysoriazabou.iso270001.logic.interfaces;

import com.ysoriazabou.iso270001.dao.entities.SubTask;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface SubTaskInterface
{
    @Transactional
    SubTask save(SubTask activity);

    @Transactional
    void deleteById(long id);

    @Transactional
    SubTask findById(long id);

    @Transactional
    List<SubTask> findAll();

    @Transactional
    List<SubTask> findAllByTaskId(long id);


}
