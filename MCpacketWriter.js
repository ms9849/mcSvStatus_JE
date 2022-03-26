class MCpacketWriter {
    static writeVarInt(val) {
        const buf = Buffer.alloc(5); // VarInt는 5바이트를 넘지 않음.
        let locate = 0;
        while(true) {
            if((val & ~0x7f) === 0) {
                buf.writeUInt8(val, locate++);
                break;
            }
            else {
                buf.writeUInt8(val & 0x7F | 0x80, locate++);
                val >>>= 7;
            }
        }
        return buf.slice(0,locate);
    }

    static writeString (val) {
        return Buffer.from(val, 'UTF-8')
    }

    static writeUShort (val) {
        return Buffer.from([val >> 8, val & 0xFF])
    }

    static synthesize(arr) { // Buffer 합성 
        let length = 0
    
        for (const chunk of arr) {
          length += chunk.length
        }
    
        const buf = [ // 가변길이 적어줌
          MCpacketWriter.writeVarInt(length),
          ...arr
        ]
    
        return Buffer.concat(buf)
    }
}

module.exports = MCpacketWriter;