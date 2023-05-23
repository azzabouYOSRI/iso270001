package com.ysoriazabou.iso270001.dao.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "user", schema = "isms")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idu", nullable = false)
    private long idu;

    @Column(name = "type_of_user", nullable = false)
    private String typeOfUser;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "lastname", nullable = false)
    private String lastname;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "active_account", nullable = false)
    private String activeAccount;

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "company_name")
    private String companyName;

    @JsonIgnore
    @OneToMany (mappedBy="client", fetch=FetchType.LAZY )
    @ToString.Exclude
    private List<ProjectEntity> projectsList;

    @JsonIgnore
    @OneToMany (mappedBy="user", fetch=FetchType.LAZY )
    @ToString.Exclude
    private List<Member> membersList;


}
