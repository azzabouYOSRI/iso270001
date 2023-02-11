package com.ysoriazabou.iso270001.logic.interfaces;

import com.ysoriazabou.iso270001.entities.UserEntity;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserService
{
    @Transactional
    UserEntity save(UserEntity userEntity);

    @Transactional
    String deleteById(long id);

    @Transactional
    UserEntity findById(long userEntity);

    @Transactional
    List<UserEntity> findAll();

}
