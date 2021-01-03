# QR330Project
# 프로젝트 소개
1. 330이란?
  * 교내에서 대여하는 회의실로 현재는 웹사이트에서 금일, 익일에대한 예약이 진행가능하다.
2. 문제 정의
  * 현 시스템은 사용자가 예약을 원하는 특정 시간 대가 꽉차있으면 사용자가 주기적으로 웹사이트에 접속하여 확인해야함.
  * 현 시스템은 특정 사용자가 예약 후 실제로 사용하지 않아도 어떠한 조치가 없음
3. 요구사항 축약
  * 사용자는 원하는 시간대에 예약 대기열을 등록하고, 해당 시간대의 예약이 취소되면 사용자는 모바일앱에서 알림을 수신한다.
  * 예약자는 모바일앱에서 예약에 대한 체크인 QR 코드를 이용하여 회의실에 배치된 QR 인식 모듈에 체크인을 진행해야한다.
  * 체크인 성공 시 부저를 이용하여 성공 알림음을 재생한다.
  * QR 코드는 동적으로 생성하며, 생성후 30초 동안만 유효성을 가진다(재사용 방지)
  * 시스템은 체크인이 10분 내에 이루어지지 않으면 예약을 자동으로 취소한고 예약 대기열에 등록된 사용자에게 알림을 송신한다(미개발).
  
 
# 시스템 구조도
![image](https://user-images.githubusercontent.com/50814086/103472363-08234e80-4dd0-11eb-97ec-c455e8bdd254.png)

* RaspberryPi4는 회의실에 배치
* 모든 통신은 Https를 사용하며 

## 기술 스택 
* Server
  * Django
  * JWT(Json Web Token)
  * HTTPS
  * SSE(Server Sent Event)
  
* Client(Web)
  * React
  * PWA(Progressive Web App)
  * Service Worker
  * MobX
  * React Hook
  * Victory(차트, 원형 예약 테이블을 만들기 위해 사용)
  
* RaspberryPi4(QR Sensor)
  * OpenCV2(QR 인식)
  
## 인터페이스
### 로그인 화면
![image](https://user-images.githubusercontent.com/50814086/103472476-63a20c00-4dd1-11eb-98e5-5ff8588b7e3e.png)
* 첫 화면으로, 로그인 진행 후 메인 페이지로 이동
### 내 예약정보 조회 화면(메인 페이지)
![image](https://user-images.githubusercontent.com/50814086/103472588-808b0f00-4dd2-11eb-979c-634f8361c2fe.png)
### 메뉴
![image](https://user-images.githubusercontent.com/50814086/103472488-83393480-4dd1-11eb-8b48-def875e75a14.png)
* 홈, 대기열 및 총 6개의 회의 공간 대여 메뉴
### 회의 공간 대여 화면
![image](https://user-images.githubusercontent.com/50814086/103472559-3f92fa80-4dd2-11eb-96ee-0590dc656453.png)
* 붉은색 시간은 불가능, 민트색은 대여 가능한 시간 그리고 초록색은 현재 예약자가 대여 가능한 시간을 선택하면 바뀌는 색
### 예약 성공 시, 메인 페이지(내 예약 정보)로 이동 후 성공 스낵바 표시
![image](https://user-images.githubusercontent.com/50814086/103472498-af54b580-4dd1-11eb-9da8-18e57f1a7576.png)
### 대기열 추가 화면
![image](https://user-images.githubusercontent.com/50814086/103472610-a9ab9f80-4dd2-11eb-80a3-de6a17907d35.png)
### 대기열 추가 다이얼로그
![image](https://user-images.githubusercontent.com/50814086/103472622-b8925200-4dd2-11eb-9e78-6022ce144ddc.png)
### 체크인 QR 조회 화면
![image](https://user-images.githubusercontent.com/50814086/103472629-ca73f500-4dd2-11eb-965a-6476c086aad1.png)
* QR은 30초만 사용가능

