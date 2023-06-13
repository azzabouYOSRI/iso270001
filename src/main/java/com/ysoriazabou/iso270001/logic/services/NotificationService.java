package com.ysoriazabou.iso270001.logic.services;

import com.ysoriazabou.iso270001.dao.entities.Notification;
import com.ysoriazabou.iso270001.dao.repos.NotificationRepository;
import com.ysoriazabou.iso270001.logic.interfaces.NotificationInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NotificationService implements NotificationInterface {

    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    @Transactional
    public Notification save(Notification notification) {
        notificationRepository.save(notification);
        return notification;
    }


    @Override
    @Transactional
    public List<Notification> findAll() {
       return  notificationRepository.findAll();
    }
        }
