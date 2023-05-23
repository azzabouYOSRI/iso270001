package com.ysoriazabou.iso270001.logic.services;

import com.ysoriazabou.iso270001.dao.entities.Task;
import com.ysoriazabou.iso270001.dao.repos.TaskRepository;
import com.ysoriazabou.iso270001.logic.interfaces.TaskInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService implements TaskInterface {

    private final TaskRepository taskRepository;
    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    @Transactional
    public Task save(Task task) {
        taskRepository.save(task);
        return task;
    }

    @Override
    @Transactional
    public void deleteById(long id) {
        taskRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Task findById(long id) {
        Optional<Task> optional = taskRepository.findById(id);
        return optional.orElse(new Task());
    }

    @Override
    @Transactional
    public List<Task> findAll() {
       return  taskRepository.findAll();
    }

    @Override
    public List<Task> findAllByActivityId(long id) {
       return  taskRepository.findAllByActivityId(id);
    }


    @Override
    public Task findByAlternateId(String alternateId) {
        return taskRepository.findByAlternateId(alternateId);
    }

        }
