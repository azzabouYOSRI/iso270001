package com.ysoriazabou.iso270001.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

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

    @Column(name = "surname", nullable = false)
    private String surname;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "adress")
    private String adress;

    @Column(name = "active_account", nullable = false)
    @JdbcTypeCode(SqlTypes.BOOLEAN)
    private boolean activeAccount;

    @Column(name = "gender", nullable = false)
    private String gender;

    public boolean getActiveAccount() {
       return this.activeAccount;
    }
}
