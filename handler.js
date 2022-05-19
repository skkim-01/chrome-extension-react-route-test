/*
    CSStorage : Common Secure Storage
*/
const crypto = require('crypto')

import WalletHandler from '../wallet/handler'
import CSStorageInstance from './instance'
import CSConstants from './const'

export default class CSStorage {
    static IsInitialized() {
        if( !this.d ) {
            return false
        } else {
            return true
        }
    }

    static ResetPassword(S='') {
        CSStorageInstance.getInstance().remS(S)
    }

    static CheckPassword(p) {
        return CSStorageInstance.getInstance().cmpS(p)
    }

    static SetPassword(p) {
        return CSStorageInstance.getInstance().strS(p)
    }


    static LoadData(S) {
        let retv = []
        const s = crypto.createHash('sha256').update(String(S)).digest('base64')
        const d = JSON.parse( window.localStorage.getItem("csstorage") )
        retv = this.#_decryption(d.d, d.iv, s)
        if ( !retv[0] ) {
            return retv
        }
        
        if ( retv[1].p != s ) {
            return [ false , "ERROR_INVALID_PASSWORD" ]
        }

        WalletHandler.Load(retv[1].w)
        return [ true, "" ]
    }

    static DumpData() {
        let retv = []
        const dumpData = this.#_dumpAll()
        retv = this.#_encryption(dumpData)
        if ( !retv[0] ) {
            return retv
        }
        window.localStorage.setItem("csstorage", JSON.stringify(retv[1]))
        return [ true, "" ]
    }

    static #_encryption(dumpData) {
        var enc = ''        
        const s = CSStorageInstance.getInstance().ldrS().substr(0, 32)
        const iv = crypto.randomBytes(16)
        try {            
            const c = crypto.createCipheriv(CSConstants.DEFAULT_ALGORITHM, s, iv)
            enc = c.update(JSON.stringify(dumpData), 'utf8', 'base64') + c.final('base64')
            return [ true, { d: enc, iv: Buffer.from(iv).toString('base64') } ]
        } catch(e) {
            console.log(e)
            return [ false, "ERROR_ENCRYPTION_DATA" ]
        }                 
    }

    static #_decryption(data, iv, S) {
        const s = S.substr(0, 32)

        try {
            var d = crypto.createDecipheriv(CSConstants.DEFAULT_ALGORITHM, s, Buffer(iv, 'base64'))
            var p = d.update(data, 'base64', 'utf8') + d.final('utf8');
            return [ true , JSON.parse(p) ]
        } catch(e) {
            console.log(e)
            return [ false, "ERROR_DECRYPTION_DATA" ]
        }
    }

    static #_dumpAll() {
        let dumpData = {}
        dumpData = {
            w: WalletHandler.Dump(),
            p: CSStorageInstance.getInstance().ldrS()
        }
        return dumpData
    }
}