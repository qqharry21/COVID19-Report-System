
# COVID-19 Report System


## 簡介

為了減少重複的繁瑣程序，並能追蹤病患送醫狀況，於是啟發了這個系統的構想。
## 系統架構

全端框架 **Next.js**

- `/` : 主頁
- `/login` : 登入頁面
- `/add` : 新增表單頁面
- `/reports` : 資料總頁面
- `/reports/{reportId}` : 資料表單編輯頁面
- `/admin` : 使用者設定頁面

**API**

- `/login` : 使用者登入
- `/logout` : 使用者登出
- `/changePassword` : 變更密碼
- `/admin` : 使用者資料
- `/admin/register` : 使用者註冊
- `/admin/users` : 新增/刪改 使用者
- `/reports` : 新增/刪除/修改 資料
- `/reports/search` : 查找指定條件的資料
- `/reports/latest` : 抓取最新資料
- `/reports/export` : 資料匯出

## 技術細節

首先，因不是所有知道連結的人都能查詢、新增、刪改，因此使用者須先登入。

帳號的註冊也因為並不是所有人都能註冊，故預先建立一個擁有所有權限的使用者（以下簡稱Admin）。
其他使用者須依靠Admin來建立帳號才能使用，由Admin決定使用者的權限。

使用者權限分以下三種
- Admin (可查詢、新增、刪除、修改)
- Editor (可查詢、新增、修改)
- User (可查詢)

登入的使用者資料，建立於 **MongoDB** 中，使用 `next-auth` 第三方套件。

登入時，會經過 **JWT** 驗證，比對成功後建立 `RefreshToken` ，存於資料庫中，並回傳使用者資料以及 `AccessToken` 以供後續畫面及CRUD使用。

到 `/add`（新增） 和 `/reports/${reportId}`（編輯） 頁面中，表單中 可新增 送醫資料、病患資料、陪同者資料等，並使用 **Formik** + **Yup** 進行表單驗證。

在新增前，因需求關係，設置一個輸入框可將表單資料進行格式化產出並複製，後進行送出。

送出時，會先判斷 `AccessToken` 是否相符，若不符合則跳出提醒，並強制登出。

而在 `/reports` （總覽）頁面中，查看案件資料，點即可進行刪除、修改，且可查尋所有歷史資料。同樣地，需驗證`AccessToken`。

然而上述的病患資料，因應當時需求，使用Google Sheet做為資料庫，之後再計畫將病患資料移至本地端中。

最後，使用者可以在 `/admin`（設定）頁面中，變更密碼、調整權限、及上述的註冊使用者，同樣依照 `AccessToken`進行權限分辨，給予相關功能的驗證。

## 未來計畫

- 將專案進行重構，使用有型別規範的Typescript，並使用Eslint規範程式的寫法(Clean Code)
- 將資料轉移至資料庫，並變更後端架構
- 將專案輕量化，將原有的元件再拆解成更小的元件


## 本地端執行


Clone 到目的資料夾
```bash
  git clone https://github.com/qqharry21/COVID19-Report-System.git
```

安裝所需套件
```bash
  npm install
```

執行
```bash
  npm run dev
```

