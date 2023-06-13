package com.ysoriazabou.iso270001.dao.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "phase")
public class Phase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "initialized")
    private String initialized;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "start_date")
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startDate;

  @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "end_date")
    private Date endDate;

  @Column(name = "real_start_date")
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date realStartDate;

  @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "real_end_date")
    private Date realEndDate;

    @Column(name = "alternate_id",nullable = true)
    private String alternateId;


    @Column(name = "cost")
    private String cost;

    @Column(name = "posistion")
    private String posistion;

      @Column(name = "progress", nullable = false)
      private String progress;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idproject", referencedColumnName = "idp",nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @ToString.Exclude
    @NonNull
    private ProjectEntity project;


   @JsonIgnore
    @OneToMany(mappedBy = "parent")
    @ToString.Exclude
          @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Phase> children;

   @Column(name = "url")
    private String url;

       @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
       @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "parent_id",referencedColumnName = "id")
    private Phase parent;
    @Column(name = "is_subPhase")
    private String isSubPhase;

 @JsonIgnore
    @OneToMany (mappedBy="phase", fetch=FetchType.LAZY )
    @ToString.Exclude
    private List<Activity> listActivities;

}
