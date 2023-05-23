package com.ysoriazabou.iso270001.logic.services;

import com.ysoriazabou.iso270001.dao.entities.SubTask;
import com.ysoriazabou.iso270001.dao.repos.SubTaskRepository;
import com.ysoriazabou.iso270001.logic.interfaces.SubTaskInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SubTaskService implements SubTaskInterface {

    private final SubTaskRepository subTaskRepository;
    @Autowired
    public SubTaskService(SubTaskRepository subTaskRepository) {
        this.subTaskRepository = subTaskRepository;
    }

    @Override
    @Transactional
    public SubTask save(SubTask subTask) {
        subTaskRepository.save(subTask);
        return subTask;
    }

    @Override
    @Transactional
    public void deleteById(long id) {
        subTaskRepository.deleteById(id);
    }

    @Override
    @Transactional
    public SubTask findById(long id) {
        Optional<SubTask> optional = subTaskRepository.findById(id);
        return optional.orElse(new SubTask());
    }

    @Override
    @Transactional
    public List<SubTask> findAll() {
       return  subTaskRepository.findAll();
    }

    @Override
    public List<SubTask> findAllByTaskId(long id) {
       return  subTaskRepository.findAllByTaskId(id);
    }

        }
