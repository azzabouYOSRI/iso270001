package com.ysoriazabou.iso270001.logic.interfaces;

import com.ysoriazabou.iso270001.dao.entities.Notification;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface NotificationInterface
{

    @Transactional
    Notification save(Notification notification);

    @Transactional
    List<Notification> findAll();
}
