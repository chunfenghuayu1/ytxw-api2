import { Injectable } from '@nestjs/common'
import * as crypto from 'crypto'

@Injectable()
export class CryptoService {
    // 密码加密
    encryptPwd(password: string) {
        // 生成盐
        const salt = crypto.randomBytes(5).toString('base64')
        // 加密
        const tempSalt = Buffer.from(salt, 'base64')
        const pwd = crypto
            .pbkdf2Sync(password, tempSalt, 1000, 16, process.env.DIGEST)
            .toString('base64')
        // 返回盐和加密后的密码
        return {
            password: pwd,
            pwdSalt: salt
        }
    }

    //  密码解密
    decryptPwd(password: string, pwdSalt: string) {
        return crypto.pbkdf2Sync(password, pwdSalt, 1000, 16, process.env.DIGEST).toString('base64')
    }
}
