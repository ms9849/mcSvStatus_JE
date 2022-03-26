const net = require("net");
const { callbackify } = require("util");
const domain = "mc.hypixel.net"; // 확인할 서버의 도메인
const MCpacketReader = require('./MCpacketReader');
const MCpacketWriter = require('./McpacketWriter');


function ping(port,callback) {
  const socket = net.createConnection({
    host: 'us.mineplex.com',
    port: '25565'
  });

  const closeSocket = () => {
    socket.destroy();
  }
  
  socket.on('connect', () => { // 패킷 전송
      const handshake = MCpacketWriter.synthesize([
        MCpacketWriter.writeVarInt(0),
        MCpacketWriter.writeVarInt(758),
        MCpacketWriter.writeVarInt(domain.length),
        MCpacketWriter.writeString(domain),
        MCpacketWriter.writeUShort(25565),
        MCpacketWriter.writeVarInt(1)
      ])
      socket.write(handshake);
      const request = Buffer.concat( [MCpacketWriter.writeVarInt(1), MCpacketWriter.writeVarInt(0)] ); // 01, 00 로 이루어진 패킷 전송
      socket.write(request);
  })

  let incomingBuffer = Buffer.alloc(0);

  socket.on('data', data => { // 응답이 돌아올떄마다 실행, 스트림이기 때문에 여러번 실행된다.
      incomingBuffer = Buffer.concat([incomingBuffer, data]);
      
      if (incomingBuffer.length < 5) { // 스트림이기 때문에 데이터가 들어올 때마다 data 이벤트를 이용하여 incomingbuffer에 새로 전송된 데이터를 추가해줍니다
          return;
      }
      const bufferReader = new MCpacketReader(incomingBuffer);
      const length = bufferReader.readVarInt();

      //IncomingBuffer가 모든 응답 데이터를 가지고 있다고 보장.
      // Offset incomingBuffer.length by bufferReader#offset since length does not include itself
      if (incomingBuffer.length - bufferReader.offset() < length) {
        return;
      }

      // response의 VarInt가 0인지 확인. 0이라면 제대로 된 응답
      const id = bufferReader.readVarInt();
      if (id === 0) {
        const res = bufferReader.readString();
        const message = JSON.parse(res);
        console.log(message);
        callback(res);
        return;
      }
  })
}

module.exports = ping;