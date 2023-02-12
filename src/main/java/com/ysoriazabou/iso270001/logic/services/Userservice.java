package com.ysoriazabou.iso270001.logic.services;

import com.ysoriazabou.iso270001.entities.UserEntity;
import com.ysoriazabou.iso270001.repos.UserEntityRepository;
import com.ysoriazabou.iso270001.logic.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class Userservice implements UserService{

    private final UserEntityRepository userEntityRepository;

    @Autowired
    public Userservice(UserEntityRepository userEntityRepository) {
        this.userEntityRepository = userEntityRepository;
    }

    @Override
    @Transactional
    public UserEntity save(UserEntity userEntity) {
        userEntityRepository.save(userEntity);
        return userEntity;
    }

    @Override
    @Transactional
    public String deleteById(long id) {
        userEntityRepository.deleteById(id);
        return "User deleted";
    }

    @Override
    @Transactional
    public UserEntity findById(long id) {
        Optional<UserEntity> optionalUser = userEntityRepository.findById(id);
        return optionalUser.orElse(new UserEntity());
    }

    @Override
    @Transactional
    public List<UserEntity> findAll() {
       return  userEntityRepository.findAll();
    }


    @Override
    @Transactional
    public UserEntity findByEmail(String email) {
        Optional<UserEntity> optionalUser = Optional.ofNullable(userEntityRepository.findUserEntityByEmail(email));
        return optionalUser.orElse(new UserEntity());
    }






}
