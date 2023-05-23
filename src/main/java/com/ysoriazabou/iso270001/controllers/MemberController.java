package com.ysoriazabou.iso270001.controllers;
import com.ysoriazabou.iso270001.dao.entities.Member;
import com.ysoriazabou.iso270001.logic.services.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/all")
    public List<Member> findAll(){

        return memberService.findAll();
    }

    @GetMapping("/findbyid/{id}")
    public ResponseEntity<Member> findByid(@PathVariable long id){
        return ResponseEntity.ok().body(memberService.findById(id));
    }

    @PostMapping("/save")
    public ResponseEntity<Member> save(@RequestBody Member member){
        memberService.save(member);
          return ResponseEntity.ok().body(member);
    }

    @DeleteMapping("/delete/{id}")
    public  ResponseEntity<Object>  delete(@PathVariable long id){
        memberService.deleteById(id);
                return new ResponseEntity<>("{\"message\":\"member deleted successfully\"}", HttpStatus.OK);
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<Member> update(@PathVariable long id, @RequestBody Member member){
        Member memberExist = memberService.findById(id);
        memberExist.setIsPm(member.getIsPm());
        memberService.save(memberExist);
        return ResponseEntity.ok().body(memberExist);
    }

    @GetMapping("/allbyproject/{id}")
    public ResponseEntity<List<Member>> findAllByProject(@PathVariable long id){
        return ResponseEntity.ok().body(memberService.findAllByProjectId(id));
    }

    @GetMapping("/allbyuser/{id}")
    public ResponseEntity<List<Member>> findAllByUser(@PathVariable long id){
        return ResponseEntity.ok().body(memberService.findAllByUserId(id));
    }
}
