package com.ysoriazabou.iso270001.controllers;

import com.ysoriazabou.iso270001.dao.dto.UserDto;
import com.ysoriazabou.iso270001.dao.entities.UserEntity;
import com.ysoriazabou.iso270001.logic.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
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
    public ResponseEntity<UserEntity> save(@RequestBody UserDto dto){
        UserEntity user = new UserEntity();
        user.setName(dto.getName());
        user.setLastname(dto.getLastname());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setCompanyName(dto.getCompanyName());
        user.setPhone(dto.getPhone());
        user.setTypeOfUser(dto.getTypeOfUser());
        user.setActiveAccount(dto.getActiveAccount());
        user.setGender(dto.getGender());
        userService.save(user);
          return ResponseEntity.ok().body(user);
    }

    @DeleteMapping("/delete/{id}")
    public  ResponseEntity<Object>  delete(@PathVariable long id){
        userService.deleteById(id);
                return new ResponseEntity<>("{\"message\":\"User deleted successfully\"}", HttpStatus.OK);
    }

    @GetMapping("/findbyemail/{email}")
    public ResponseEntity<UserEntity> findByEmail(@PathVariable String email){
        return ResponseEntity.ok().body(userService.findByEmail(email));
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<UserEntity> update(@PathVariable long id, @RequestBody UserEntity user){
        UserEntity userExist = userService.findById(id);
        if (user.getName() != null) {
            userExist.setName(user.getName());
        }
        if (user.getLastname() != null) {
            userExist.setLastname(user.getLastname());
        }
        if (user.getEmail() != null) {
            userExist.setEmail(user.getEmail());
        }
        if (user.getPassword() != null) {
            userExist.setPassword(user.getPassword());
        }
        if (user.getCompanyName() != null) {
            userExist.setCompanyName(user.getCompanyName());
        }
        if (user.getPhone() != null) {
            userExist.setPhone(user.getPhone());
        }
        if (user.getTypeOfUser() != null) {
            userExist.setTypeOfUser(user.getTypeOfUser());
        }
        if (user.getActiveAccount() != null) {
            userExist.setActiveAccount(user.getActiveAccount());
        }
        if (user.getGender() != null) {
            userExist.setGender(user.getGender());
        }
        if (user.getPassword() != null) {
            userExist.setPassword(user.getPassword());
        }
        userService.save(userExist);
        return ResponseEntity.ok().body(userExist);
    }

//    @PatchMapping("/resetpass/{id}")
//  public ResponseEntity<UserEntity> resetPassword(@PathVariable Long id, @RequestBody String userPassword) {
////    try {
//      UserEntity updatedUser = userService.resetPassword(id, userPassword);
//      return ResponseEntity.ok(updatedUser);
////    } catch (Exception e) {
////      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
////    }
//  }
}
