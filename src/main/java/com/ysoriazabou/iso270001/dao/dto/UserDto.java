package com.ysoriazabou.iso270001.dao.dto;

import lombok.*;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDto {
    private long idu;

    private String typeOfUser;

    private String name;

    private String lastname;

    private String email;

    private String phone;

    private String password;

    private String companyName;

    private String activeAccount;

    private String gender;


}
