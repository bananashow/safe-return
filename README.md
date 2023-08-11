# Safe-Return
<b>현재 개발중인 프로젝트입니다.</b>
<br />

## 💪 Pre 기획
- 기획 배경
  - 실종자 문제는 사회적으로 중요한 문제로 인식되며, 많은 실종자 가족들이 어려움을 겪고 있음
  - 오프라인(현수막, 전단지) 중심의 실종자 찾기 → 온라인으로 발을 넓힘

- 해결 컨셉
  - 참여과 관심의 중요성을 강조
      - 따뜻한 관심과 사랑이 모여, 희망의 문을 엽니다.
      - 꼭 필요한 곳에 우리의 눈과 마음을 모아주세요.
      - 실종자와 그 가족을 위해, 우리가 함께합니다.
      - 소중한 생명을 지키기 위한 나의 손길

- 기대 효과
  - 확장된 정보 전달
      - 기존의 오프라인 방식은 한정된 정보만 전달할 수 있었음
      - 온라인 플랫폼을 통해 더 많은 정보를 빠르게 전달할 수 있음
  - 실시간 상호 작용
      - 사용자들이 실시간으로 소통하고 정보를 공유할 수 있는 커뮤니케이션 기능을 제공 → 발견률 증가 기대
      - 실종자 가족들의 심리적 지지와 위로
  - 시민들의 참여 유도 → 가장 걱정되는 부분. 적극 참여를 유도하는 방법을 계속해서 찾아보자
<br /><br />


## ⚙ 개발 환경
- React
- JavaScript
- Vite
- Styled-Components
- firebase
<br /><br />


## 🛠 데이터베이스 설계 🎵 

### Collection : users (회원 가입)
- doc : 인증 시 받아온 사용자 uid와 동일하게 설정

| 필드명 | 타입 | 설명 |
| --- | --- | --- |
| email | string | 이메일 |
| password | string | 비밀번호 |
| name | string | 회원 이름 |
| phone | string | 연락처 |
| signUpDate | datetime | 가입일 |
| accountType | string | 계정 유형 |

### Collection : posts (게시글)

| 필드명 | 타입 | 설명 |
| --- | --- | --- |
| firebase 문서 ID | number | unique key |
| name | string | 작성자 |
| category | string | 카테고리 |
| title | string | 글 제목 |
| description | string | 글 내용 |
| postedDate | datetime | 작성일 |
| updateDate | datetime | 수정일 |
| viewCount | number | 조회수 |
| likeCount | number | 좋아요 수 |
| commentCount | number | 댓글 수 |

### Collection : **comment (댓글)**

| 필드명 | 타입 | 설명 |
| --- | --- | --- |
| post_id | string | 게시글 문서 ID |
| firebase 문서 ID | number | unique key |
| content | string | 댓글 내용 |
| name | string | 댓글 작성자 |
| createdDate | datetime | 댓글 작성일 |
| modifiedDate | datetime | 댓글 수정일 |
| likeCount | number | 좋아요 수 |


<br /><br />
## 📌 주요 기능

- 회원 가입
    - firebase 연동
    - 이메일로 로그인 시 필요

- 로그인
    - firebase 연동
    - 이메일로 로그인
    - 구글 계정으로 로그인

- 마이 페이지
    - 기본 정보 수정 / 회원 탈퇴
    - 비밀번호 변경
    - (내가 작성한 글 보기)

- 공통
    - 로고 : 클릭 시 메인 페이지 이동
    - 실종자 신고 번호 배너 : 우측 하단에 고정
    - 네비게이션 메뉴바
        - 로그인 상태 표시
        - 메뉴
            - 찾고 있어요
            - 근처 실종자 확인
            - 나눔 공간
            - ?

- ‘찾고 있어요’ 페이지
    - 실종자 api
    - 실종자 검색
    - 필터링(나이·성별·지역 등)
    - 실종자 상세 정보 모달창 띄우기

- ‘근처 실종자 확인’ 페이지
    - 현재 나의 위치 2km 내 실종된 위치 및 실종자 정보 확인
        - 카카오맵 활용
        - 구현 못할 시 ‘안전 지도 정보’ 페이지로 대체

- “나눔 공간” 페이지
    - firebase 연동
    - 실종자 가족 커뮤니티
    - 실종자 제보
    - 로그인 시 글 조회·작성·수정·삭제 가능

<br /><br />

## 👩🏻‍💻 ISSUE
 - [x]  **실시간 검색 기능 및 필터링을 구현하려면 전체 데이터가 필요한데, 사용하려는 api의 ‘요청 시 가져올 수 있는 데이터의 수(필수값)’가 최대 100개로 한정**
    - 반복문으로 page를 증가시키며 전체 데이터를 꺼냄
        - 로딩 시간 15초 이상 소요
            - Promise.all(), async/await을 통해 병렬로 데이터를 가져오도록 수정
                
                → 5~8초로 단축 
                

- [ ]  **cors-anywhere 오픈 프록시 서버로 CORS error 임시 해결**
    - 2021년 2월부터 데모 서버에 액세스하려면 옵트인이 필요
    - 주기적으로 [https://cors-anywhere.herokuapp.com](https://cors-anywhere.herokuapp.com/https://www.safe182.go.kr/api/lcm/findChildList.do)에 들어가서 잠금 해제 버튼을 눌러야 함
    - 결국엔 배포 시 프록시 서버를 직접 구축해야 할 듯
    - http-proxy-middleware 라이브러리 사용 시도 → 404 error

- [x]  **textarea 대신 Tiny Editor 라이브러리 활용**
    - 태그 형태의 텍스트로 반환됨 → DB에 저장
        - DB에 내용이 제대로 들어가지 못하는 이슈 발생(어쩌다 가끔 들어감)
    - 데이터를 이스케이핑해서 db에 넣어봄
        - 여전히 어쩌다 가끔 들어감
            
            ```jsx
            encodeURIComponent();
            decodeURIComponent();
            ```
            
    - 에디터에 onEditorChange 속성을 넣으니 해결 (문서 좀 꼼꼼히 읽어라,,,,,,,,,,,🤦🏻‍♀️)

