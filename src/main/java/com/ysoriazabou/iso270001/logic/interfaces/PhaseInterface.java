package com.ysoriazabou.iso270001.logic.interfaces;

import com.ysoriazabou.iso270001.dao.entities.Phase;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PhaseInterface
{
    @Transactional
    Phase save(Phase phase);

    @Transactional
    void deleteById(long id);

    @Transactional
    Phase findById(long id);

    @Transactional
    List<Phase> findAll();

    @Transactional
    List<Phase> findAllByProjectId(long id);



}
