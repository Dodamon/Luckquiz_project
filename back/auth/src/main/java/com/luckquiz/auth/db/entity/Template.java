package com.luckquiz.auth.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name="template")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class Template {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    @Column(name = "name", nullable = true)
    private String name;
    @Column(name = "host_id", nullable = false)
    private UUID hostId;

}
