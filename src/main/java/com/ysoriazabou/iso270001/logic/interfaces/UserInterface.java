package com.ysoriazabou.iso270001.logic.interfaces;

import com.ysoriazabou.iso270001.dao.entities.UserEntity;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserInterface
{
    @Transactional
    UserEntity save(UserEntity userEntity);

    @Transactional
    void deleteById(long id);

    @Transactional
    UserEntity findById(long id);

    @Transactional
    List<UserEntity> findAll();

    @Transactional
    UserEntity findByEmail(String email);


}
