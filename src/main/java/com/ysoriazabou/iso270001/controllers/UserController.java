package com.ysoriazabou.iso270001.controllers;

import com.ysoriazabou.iso270001.entities.UserEntity;
import com.ysoriazabou.iso270001.logic.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserEntity>> findAll(){

        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/findbyid/{id}")
    public ResponseEntity<UserEntity> findByid(@PathVariable long id){
        return ResponseEntity.ok().body(userService.findById(id));
    }

    @PostMapping("/save")
    public ResponseEntity<UserEntity> save(@RequestBody UserEntity userEntity){
         userService.save(userEntity);
          return ResponseEntity.ok().body(userEntity);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable long id){
         return ResponseEntity.ok().body( userService.deleteById(id));
    }

    @GetMapping("/findbyemail/{email}")
    public ResponseEntity<UserEntity> findByEmail(@PathVariable String email){
        return ResponseEntity.ok().body(userService.findByEmail(email));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<UserEntity> update(@PathVariable long id, @RequestBody UserEntity userEntity){
        UserEntity userExist = userService.findById(id);
        userExist.setName(userEntity.getName());
        userExist.setSurname(userEntity.getSurname());
        userExist.setEmail(userEntity.getEmail());
        userExist.setPassword(userEntity.getPassword());
        userExist.setAdress(userEntity.getAdress());
        userExist.setPhone(userEntity.getPhone());
        userExist.setTypeOfUser(userEntity.getTypeOfUser());
        userExist.setActiveAccount(userEntity.getActiveAccount());
        userService.save(userExist);
        return ResponseEntity.ok().body(userExist);
    }
}
