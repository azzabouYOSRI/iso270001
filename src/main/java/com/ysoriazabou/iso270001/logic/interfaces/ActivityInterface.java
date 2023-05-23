package com.ysoriazabou.iso270001.logic.interfaces;

import com.ysoriazabou.iso270001.dao.entities.Activity;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ActivityInterface
{
    @Transactional
    Activity save(Activity activity);

    @Transactional
    void deleteById(long id);

    @Transactional
    Activity findById(long id);

    @Transactional
    List<Activity> findAll();

    @Transactional
    List<Activity> findAllByPhaseId(long id);



}
