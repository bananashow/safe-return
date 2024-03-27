# Safe-Return
<b>현재 개발 진행중인 개인 프로젝트입니다.</b>
<br />


## ⚒️ 배포
https://safe-return.vercel.app/


## 🔌 영상
https://github.com/bananashow/safe-return/assets/85798544/84590384-7bc0-4cdc-b7b1-aa15f6de1462
<br />

## 🎈 Notion
[https://github.com/bananashow/safe-return/assets/85798544/84590384-7bc0-4cdc-b7b1-aa15f6de1462](https://towering-august-3d2.notion.site/16aa24afa0ee4aa8a6126e75530702ee?pvs=4)
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

## 와이어프레임
- https://www.figma.com/file/2ngbVJ4K9btUeWRc1ZG1j0/safe-return?type=design&t=vfGHBVGuqe5ivrQD-6
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
    - firebase 인증
    - 이메일-비밀번호로 로그인 시 필요
    - 프로필 사진 등록(firebase storage)

- 로그인
    - firebase 인증
    - 이메일-비밀번호로 로그인
    - 구글 계정으로 로그인

- 마이 페이지
    - 비밀번호 변경

- 공통
    - 로고 : 클릭 시 메인 페이지 이동
    - 실종자 신고 번호 배너 : 우측 하단에 고정
    - 네비게이션 메뉴바
        - 로그인 상태 표시
        - 로그아웃
        - 실시간 실종 관련 뉴스 미니 캐러셀
        - 메뉴
            - 찾고 있어요
            - 실종자 위치
            - 나눔 공간

- ‘찾고 있어요’ 페이지
    - 실종자 api 연동
    - 이름/주소로 실종자 검색
    - 필터링(대상/성별/당시 나이)
    - 실종자 상세 정보 모달창 띄우기
    - 페이지네이션

- ‘실종자 위치’ 페이지
    - 주소로 실종자 검색
        - 상세 정보 모달창
        - 실종 위치 지도에 나타냄

- ‘나눔 공간’ 페이지
    - firebase 연동
    - 회원 커뮤니티(비회원 접근 제어)
    - 카테고리 : 나누어요, 제보해요 
    - 게시글 조회·작성·수정·삭제 가능
    - 조회수/댓글수/좋아요수 구현

<br /><br />

## 👩🏻‍💻 ISSUE
 - [x]  **실시간 검색 기능 및 필터링을 구현하려면 전체 데이터가 필요한데, 사용하려는 api의 ‘요청 시 가져올 수 있는 데이터의 수(필수값)’가 최대 100개로 한정**
    - 반복문으로 page를 증가시키며 전체 데이터를 꺼냄
        - 로딩 시간 15초 이상 소요
            - Promise.all(), async/await을 통해 병렬로 데이터를 가져오도록 수정 
                → 5~8초로 단축 
                

- [x]  **cors-anywhere 오픈 프록시 서버로 CORS error 임시 해결**
    - 2021년 2월부터 데모 서버에 액세스하려면 옵트인이 필요
    - 주기적으로 [https://cors-anywhere.herokuapp.com](https://cors-anywhere.herokuapp.com/https://www.safe182.go.kr/api/lcm/findChildList.do)에 들어가서 잠금 해제 버튼을 눌러야 함
    - 결국엔 배포 시 프록시 서버를 직접 구축해야 할 듯
    - http-proxy-middleware 라이브러리 사용 시도 → 404 error
    - **Cloudflare worker로 해결 완료**
     
- [x]  카카오지도로 내 위치 반경 30km 내 실종자 리스트를 보여주고 지도에 마커를 표시
    - 원본 데이터가 좌표값이 아닌 주소로 되어 있음
    - 데이터 전체를 좌표로 대량 변경해서 내 현재 위치 좌표랑 비교한 후 내 현재 반경 30km 내 실종자 리스트를 가져오길 원함
        - error : Too many subrequests
        - 429 error
    - 구글 geocoding api 이용하면 대량으로 좌표 변환 가능 → 유료 서비스
    → **“실종자 위치” 페이지로 전체 수정**

- [x]  배포 시 오류
    - Rollup failed to resolve import "react-icons/Fc" from "/vercel/path0/src/pages/SignInPage.jsx"
        - react-icons/Fc → react-icons/fc 해결!
    - news API
        - 또 CORS error
            code: "corsNotAllowed"
            message: "Requests from the browser are not allowed on the Developer plan, except from localhost."
            status: "error"
            → cloudflare로 해결하려고 했으나
        - local에서는 잘 돌아가는데 배포해서 요청하면 426 error
            - newsapi.org가 로컬 API 호출만 허용하도록 무료 서비스를 변경했다고 한다.
    - 네이버 뉴스 api
        - 뉴스 이미지를 제공하지 않음
        - 네비게이션 바에 캐러셀 미니 뉴스로 수정

