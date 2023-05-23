package com.ysoriazabou.iso270001.dao.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "project", schema = "isms")
public class ProjectEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idp", nullable = false)
    private long idp;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "start_date", nullable = false)
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startDate;

    @Column(name = "alternate_id", nullable = false)
    private String alternateId;


    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "end_date")
    private Date endDate;

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "real_start_date")
    private Date realStartDate;

    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "real_end_date")
    private Date realEndDate;

    @Column(name = "active_project", nullable = false)
    private String activeProject;

    @Column(name = "budget")
    private String budget;

    @Column(name = "cost")
    private String cost;

    @Column(name = "initialized")
    private String initialized;

    @Column(name = "progress", nullable = false)
    private String progress;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "iduser", referencedColumnName = "idu")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @ToString.Exclude
    private UserEntity client;

    @JsonIgnore
    @OneToMany (mappedBy="project", fetch=FetchType.LAZY )
    @ToString.Exclude
    private List<ProjectDependency> projectsDependenciesList;

    @JsonIgnore
    @OneToMany (mappedBy="project", fetch=FetchType.LAZY )
    @ToString.Exclude
    private List<Member> membersList;

    @JsonIgnore
    @OneToMany (mappedBy="project", fetch=FetchType.LAZY )
    @ToString.Exclude
    private List<Phase> phaseList;
}
