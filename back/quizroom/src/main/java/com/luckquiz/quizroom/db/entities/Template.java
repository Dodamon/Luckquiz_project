package com.luckquiz.quizroom.db.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
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

    @Column(name = "date", nullable = true)
    @UpdateTimestamp
    private LocalDateTime date = LocalDateTime.now();

    @Column(name = "is_valid",nullable = true)
    private String isValid;
    public void setDate(LocalDateTime date){
        this.date = date;
    }

    public void setIsValid(String isValid) {
        this.isValid = isValid;
    }

    //됐으비까Enum은 Entity에 넣읍니까?// 예.... 이거 저는 그냥 보기 쉽게 엔티티있는데 넣었는디 바꿀깝숑 저
    // 저거 게임 1,2,3 되어있는데 그거 바꿔도 됩니다 어떤 게임 들어올지 몰라서 일단 1,2,3 가시죠


}
