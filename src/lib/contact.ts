export const CONTACT_EMAIL = "takuya.hata@jcs-giba.com";

interface MailContent {
  subject: string;
  body: string;
}

const MAIL_CONTENTS: Record<string, MailContent> = {
  ja: {
    subject: "【お問い合わせ】合同会社JCSギバ",
    body: "会社名：\nお名前：\nお電話番号：\nお問い合わせ内容：",
  },
  zh: {
    subject: "【咨询】JCS格巴合同会社",
    body: "公司名称：\n姓名：\n电话号码：\n咨询内容：",
  },
  en: {
    subject: "[Inquiry] JCS Giba LLC",
    body: "Company Name:\nName:\nPhone Number:\nDetails of Inquiry:",
  },
};

/**
  * 指定されたロケールに応じた安全にエンコードされた mailto: URI を生成します。
  */
export function getMailtoLink(locale: string): string {
  const content = MAIL_CONTENTS[locale] || MAIL_CONTENTS.en;
  const encodedSubject = encodeURIComponent(content.subject);
  const encodedBody = encodeURIComponent(content.body);
  
  return `mailto:${CONTACT_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
}
