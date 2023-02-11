package com.ysoriazabou.iso270001.repos;

import com.ysoriazabou.iso270001.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserEntityRepository extends JpaRepository<UserEntity, Long> {
}
