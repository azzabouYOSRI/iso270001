package com.ysoriazabou.iso270001.logic.services;

import com.ysoriazabou.iso270001.dao.entities.Activity;
import com.ysoriazabou.iso270001.dao.repos.ActivityRepository;
import com.ysoriazabou.iso270001.logic.interfaces.ActivityInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ActivityService implements ActivityInterface {

    private final ActivityRepository activityRepository;
    @Autowired
    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @Override
    @Transactional
    public Activity save(Activity activity) {
        activityRepository.save(activity);
        return activity;
    }

    @Override
    @Transactional
    public void deleteById(long id) {
        activityRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Activity findById(long id) {
        Optional<Activity> optional = activityRepository.findById(id);
        return optional.orElse(new Activity());
    }

    @Override
    @Transactional
    public List<Activity> findAll() {
       return  activityRepository.findAll();
    }

    @Override
    @Transactional
    public List<Activity> findAllByPhaseId(long idp) {
       return  activityRepository.findAllByPhaseId(idp);

    }

        }
