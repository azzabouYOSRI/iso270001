package com.ysoriazabou.iso270001.logic.services;

import com.ysoriazabou.iso270001.dao.entities.UserEntity;
import com.ysoriazabou.iso270001.dao.repos.UserRepository;
import com.ysoriazabou.iso270001.logic.interfaces.UserInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserInterface {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserEntity save(UserEntity userEntity) {
        userRepository.save(userEntity);
        return userEntity;
    }

    @Override
    @Transactional
    public void deleteById(long id) {
        userRepository.deleteById(id);
    }

    @Override
    @Transactional
    public UserEntity findById(long id) {
        Optional<UserEntity> optionalUser = userRepository.findById(id);
        return optionalUser.orElse(new UserEntity());
    }

    @Override
    @Transactional
    public List<UserEntity> findAll() {
       return  userRepository.findAll();
    }


    @Override
    @Transactional
    public UserEntity findByEmail(String email) {
        Optional<UserEntity> optionalUser = Optional.ofNullable(userRepository.findUserEntityByEmail(email));
        return optionalUser.orElse(new UserEntity());
    }



//    @Override
//    public UserEntity resetPassword(long id, String password)  {
//        Optional<UserEntity> optionalUser = userRepository.findById(id);
//    if (optionalUser.isPresent()) {
//      UserEntity user = optionalUser.get();
//      user.setPassword(password);
//      userRepository.save(user);
//      return user;
//    } else {
//        return new UserEntity();    }
//  }
    }
