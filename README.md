
# COVID-19 Report System


## 簡介

為了減少重複的繁瑣程序，並能追蹤病患送醫狀況，於是啟發了這個系統的構想。
## 系統架構

首先，因不是所有知道連結的人都能查詢、新增、刪改，因此使用者須先登入。

帳號的註冊也因為並不是所有人都能註冊，故預先建立一個擁有所有權限的使用者（以下簡稱Admin）。
其他使用者須依靠Admin來建立帳號才能使用，由Admin決定使用者的權限。

使用者權限分以下三種
- Admin (可查詢、新增、刪除、修改)
- Editor (可查詢、新增、修改)
- User (可查詢)

登入的使用者資料，建立於 **MongoDB** 中

登入時，會經過 **JWT** 驗證，比對成功後建立 `RefreshToken` ，存於資料庫中，並回傳使用者資料以及 `AccessToken` 以供後續畫面及CRUD使用。

到 `/add`（新增） 和 `/reports/${reportId}`（編輯） 頁面中，表單中 可新增 送醫資料、病患資料、陪同者資料等，並使用 **Formik** + **Yup** 進行表單驗證。
在新稱前，因需求關係，設置一個輸入框可將表單資料進行格式化產出並複製，後進行送出。
送出時，會先判斷AccessToken符不符合，若不符合則跳出提醒，並強制登出


而在 `/reports` 頁面中，查看案件資料，點即可進行刪除、修改，且可查尋所有歷史資料。

## Features

- Refactor the project to typescript
- Develop a backend system to improve the convenience of the expansion.
    - Add about editor
    - Add projects edtior
    - Add experiences editor
- Develop blog to record personal notes


## Deployment

To deploy this project run

```bash
  npm run dev
```


## Feedback

If you have any feedback, please reach out to me at qqharry21@gmail.com

