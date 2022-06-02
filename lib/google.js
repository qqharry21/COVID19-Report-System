/** @format */

import { google } from 'googleapis';

const { privateKey } = JSON.parse(process.env.GOOGLE_PRIVATE_KEY);
console.log('GOOGLE_PRIVATE_KEY', privateKey);

export const auth = new google.auth.GoogleAuth({
  keyFile: '../cert.json',
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDSz/sVlwlQOijp\nKJdGmQR7sxxueyBEFtBLGgNrhYZLhh1DCHiXVkjWtitYGD5SBsOiUajPbqCdMmar\nW6N+w7JHkpw4wnlkMup715dwmK7h0Fsef4Mur2KXyjPUxXA0plnoDhNRLi9Z8dvp\nezXoJAcPxI8KQBw3ucNxZCdOk57uXqds8wAkOFxoRgwTtqZYYv4QEGJCyG9hO0Ud\n2HnGDTyhRL5hLxz3qS08LNmyGq6UYwlOUV0NygThM+Sw1wjfB7Tm1gtXa8ZaL2Lw\ndHL8WGTZAhd3b+v/JDnokGOi7NapVu7ZkOoRqi85Vu4+yVRQd1shjcZINLemTz3s\nwhtUFJp7AgMBAAECggEAM7SDNtZmmGDLa/RithQNv3E8xfQ5A7o8uE7XC+Yh/CAW\nyTwop6WoE9F2bBL2JhQ2o3c32jid+DBGcjz1qr/A2EEjQ+Ce+W5riJhmMl2gdw4t\naxuHR0oI+oXDlKogTSmH35ykLEMRphPmBiwMGrXLbZieJLt4sEpFn2gbI/CdCIWI\nnfLyvSpBFGCFtDSnQy5Dkh9TqvFYfSWAqB/hpNJgK+qGF9PWem+hBVZNEz8uFvuy\ni/sESshRsQGq/QFyyRyCNwYd5Vxi0QvDNs2DGFuLX6Xw8noKOQFu/kC7RI8QEuat\nw+dyD9zaQLHE5aw+ldKYP/YxJEsugalNb1sqISNwQQKBgQD0Id5UgmpqQS8rrk0j\nug/Dl3CLpEjCeOTNfv4lvWyz56Q6Vtu8qOdwQSbdOUSoy0RgOtdzXssFB03tx4zT\nHs/YsywE54DND9OstUi5fMk93rDYPYaHWzjPq1XgJ6p1n0adIFIDQt4u5ZTdH3Wa\nFwgzOfFg9PeyXjsoN8poqWT+SwKBgQDdD3WeeZ9XbyV+4ixktiBpUgEu+WPgiG3y\nIcJAVmk41Xyubj+njsdqqGiIJzmzQLK4HZzBXHzn0CldZwmNZohEXhYupMHJExWp\n5SgwyeSmLazAEEve16dgsDicLbl/fbV2+2Jq+cBnskO+4zwWsQ3YQ6BT9SwYF9Me\npaMKq752kQKBgFkV/tah3Ik3jioHadjOra/3FDew1Gg6y2t9mupUrFUeA1zSk07N\n596bt73khvx9aE8hSbus7LLCDprlRatIxBnUkAyeGe86hkiwwoAFXD46hBf0o6HD\nFQEbCbRJZTeUzqTJxYOxI/jDCEaEk1qOawyeaUmzOqwZHMc5TKBSqCrvAoGAMy3y\nGEemOXL1JmQszQBRjrC6r2pz0jcj5UwlkgmvgMYEgMnrmNp4ltv4n5UdSb/v4KqS\ncT39eRn7ibFiR8d2QwXZcuEYMHpnqJbycCE9+69VcH4VYrlg+gSyho4bhUXQboSS\n65t5DUj7YEVx0vsY7nnxs55uoAFcEptcnQrYJNECgYBoxIRrAFjakIJwM35ro0Dv\nsYF8WSOowgmXCCreIjA1I7p+aHsSFBqxRUW2liEs+cvKT9a2JK8h3t+XR5o1DrIp\ngay15Y3Q2IzEdyQ6Oh/RWMHjAeDNDPm8ToPcK3dQJe4Y9oCsLlGim/9udSMe+CRy\nogR2SsQggfcfSFv3PTizSQ==\n-----END PRIVATE KEY-----\n',
  },
  scopes: [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});
