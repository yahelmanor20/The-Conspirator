# 🛣️ מפת דרכים ושיפורים (Roadmap / TODO)

רשימת משימות לשיפור הפרויקט, מסודרת לפי עדיפות. כל סעיף מתעד פער אמיתי בקוד הנוכחי.

## 🔴 באגים לתיקון

* [ ] **`handleSubmit` לא מזהה שגיאות שרת** — `fetch` לא זורק על סטטוס 400/500, ולכן שגיאה מוצגת כהצלחה. להוסיף בדיקת `if (!response.ok)` כמו שכבר קיים ב-`handleDelete` / `handleGenerate`.
* [ ] **קובץ `.env` של ה-Frontend לא נטען** — להעביר מ-`client/src/.env` ל-`client/.env`, ולשנות את שם המשתנה ל-`REACT_APP_API_URL` (CRA חושף רק משתנים בקידומת `REACT_APP_`).
* [ ] **אפשרויות הקטגוריה בטופס שגויות** — ה-`select` ב-`CreateConspiracyForm` מציג `Volvo / Saab / Opel / Audi` (ברירת מחדל מדוגמה) במקום קטגוריות קונספירציה אמיתיות.
* [ ] **typo `defualt` במודל** — בשדה `category` ב-`models/conspiracy.js`, ולכן ערך ברירת המחדל לא נקבע.

## 🟡 שיפורי תכונות

* [ ] **שכבת ולידציה ב-Backend** — אורך מינימלי לטקסט (10 תווים), החזרת `400` עם הודעה ברורה (לא להסתמך רק על ולידציה ב-Frontend).
* [ ] **מצבי `loading` ו-`error` ב-React** — ספינר בזמן טעינה והודעה ידידותית בשגיאה, במקום `console.error` שקט.
* [ ] **ריכוז קריאות ה-API** — קובץ `client/src/services/api.js` אחד במקום `fetch` עם כתובת קשיחה בכל קומפוננטה.
* [ ] **Pagination** — `getAllConspiracies` מחזיר את כל המסמכים; להוסיף `?page=&limit=` עם `.skip().limit()`.
* [ ] **Authentication** — אין כיום אימות; להוסיף JWT ו-middleware הגנה ל-routes רגישים.

## 🟢 ניקיון ועקביות

* [ ] **תיקון שמות** — `createAT` → `createdAt`, התיקייה `contorollers` → `controllers`.
* [ ] **הסרת `DELETE /conspiracies` ללא id** — מוחק מסמך אקראי; להשאיר רק `DELETE /:id`.
