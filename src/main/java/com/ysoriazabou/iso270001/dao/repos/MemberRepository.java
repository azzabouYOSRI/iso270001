package com.ysoriazabou.iso270001.dao.repos;

import com.ysoriazabou.iso270001.dao.entities.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {
    List<Member> findAllByProjectIdp(long idp);
    List<Member> findAllByUserIdu(long idu);
}
