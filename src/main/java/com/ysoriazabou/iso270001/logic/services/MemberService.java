package com.ysoriazabou.iso270001.logic.services;

import com.ysoriazabou.iso270001.dao.entities.Member;
import com.ysoriazabou.iso270001.dao.repos.MemberRepository;
import com.ysoriazabou.iso270001.logic.interfaces.MemberInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService implements MemberInterface {

    private final MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    @Transactional
    public Member save(Member member) {
        memberRepository.save(member);
        return member;
    }

    @Override
    @Transactional
    public void deleteById(long id) {
        memberRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Member findById(long id) {
        Optional<Member> optionalUser = memberRepository.findById(id);
        return optionalUser.orElse(new Member());
    }

    @Override
    @Transactional
    public List<Member> findAll() {
       return  memberRepository.findAll();
    }

    @Override
    @Transactional
    public List<Member> findAllByProjectId(long idp) {
       return  memberRepository.findAllByProjectIdp(idp);

    }

    @Override
    @Transactional
    public List<Member> findAllByUserId(long idu) {
       return  memberRepository.findAllByUserIdu(idu);

    }

        }
