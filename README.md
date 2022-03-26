# mcSvStatus_JE

결론) 제대로 된 모듈은 minecraft-server-util 쓰세요

이 레포지토리는 단순히 호기심 + 공부용으로 제작되었으며 나중에라도 저처럼 모듈 없이 직접 마인크래프트 서버와 패킷 단위로 통신하여 정보를 가져와 보고 싶으신 분들을 위한 정보입니다. 

( JE 기준이며, BE는 JE와는 다르게 UDP를 사용합니다. )

# Server List Ping - wiki.vg

**https://wiki.vg/Server_List_Ping**


전송해야 할 패킷의 내부 구조와 예제를 전부 설명해주고 있습니다. 

간단히 요약하면 

1. handshake 패킷을 먼저 전송. 

2. 따로 응답을 받지 않고 다시 01 00 패킷을 전송

3. 서버에서 아이디가 0인 패킷(서버의 정보를 포함)을 response로 전송해줌

다만 설명 중 전체 패킷의 길이도 패킷에 입력 해줘야 하는 부분이 빠져 있습니다. 이 부분은 예제를 보시다 보면 충분히 알 수 있으실 것이라 생각합니다.

EX) 전체 프로토콜의 길이 / 0 / 프로토콜 넘버 ... 

# mc-ping - github

**https://github.com/wizardfrag/mc-ping**

이 레포지토리도 사실상 이 모듈에서 다 분해해서 뜯어다가 쓴 코드입니다.

간결하면서 깔끔하게 잘 만들어져 있는 모듈입니다. JS로 코드를 작성할 일이 있다면 이 모듈을 참고하시면 좋을 것 같습니다.
