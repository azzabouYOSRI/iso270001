package com.ysoriazabou.iso270001.logic.services;

import com.ysoriazabou.iso270001.dao.entities.Phase;
import com.ysoriazabou.iso270001.dao.repos.PhaseRepository;
import com.ysoriazabou.iso270001.logic.interfaces.PhaseInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PhaseService implements PhaseInterface {

    private final PhaseRepository phaseRepository;

    @Autowired
    public PhaseService(PhaseRepository phaseRepository) {
        this.phaseRepository = phaseRepository;
    }

    @Override
    @Transactional
    public Phase save(Phase phase) {
        phaseRepository.save(phase);
        return phase;
    }

    @Override
    @Transactional
    public void deleteById(long id) {
        phaseRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Phase findById(long id) {
        Optional<Phase> optional = phaseRepository.findById(id);
        return optional.orElse(new Phase());
    }

    @Override
    @Transactional
    public List<Phase> findAll() {
       return  phaseRepository.findAll();
    }

    @Override
    @Transactional
    public List<Phase> findAllByProjectId(long idp) {
       return  phaseRepository.findAllByProjectIdp(idp);

    }

        }
