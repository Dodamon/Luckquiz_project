package com.luckquiz.quizroom.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

@Getter
@NoArgsConstructor
public class SessionUsers {
    public static class SessionUser{
        private String sessionId;
        private String userName;
        private String userUrl;

        public void setSessionId(String sessionId) {
            this.sessionId = sessionId;
        }

        public void setUserName(String userName) {
            this.userName = userName;
        }

        public void setUserUrl(String userUrl) {
            this.userUrl = userUrl;
        }
    }

    private List<SessionUser> userList;

    public void setUserList(List<SessionUser> userList) {
        this.userList = userList;
    }
}
