package com.ysoriazabou.iso270001.logic.interfaces;

import com.ysoriazabou.iso270001.dao.entities.Member;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MemberInterface
{

    @Transactional
    Member save(Member member);

    @Transactional
    void deleteById(long id);

    @Transactional
    Member findById(long id);

    @Transactional
    List<Member> findAll();

    @Transactional
    List<Member> findAllByProjectId(long id);


    @Transactional
    List<Member> findAllByUserId(long idu);
}
