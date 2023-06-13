//package com.ysoriazabou.iso270001.controllers;
//
//import com.ysoriazabou.iso270001.dao.entities.Notification;
//import com.ysoriazabou.iso270001.logic.services.NotificationService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/notification")
//public class NotificationController {
//
//    private final NotificationService   notificationService;
//    @Autowired
//    public NotificationController(NotificationService notificationService) {
//        this.notificationService = notificationService;
//    }
//
//    @GetMapping("/all")
//    public List<Notification> findAll(){
//
//        return notificationService.findAll();
//    }
//
//    @PostMapping("/save")
//    public ResponseEntity<Notification> save(@RequestBody Notification notification){
//        notificationService.save(notification);
//          return ResponseEntity.ok().body(notification);
//    }
//
//}
