package com.ysoriazabou.iso270001.dao.repos;

import com.ysoriazabou.iso270001.dao.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
   UserEntity findUserEntityByEmail(String email);
}
