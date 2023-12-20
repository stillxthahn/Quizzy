export type IQuestion = {
    "id": number;
    "topicId": string;
    "question": string;
    "answers": Array<string>;
    "correctAnswer": string;
}
export type IUser = {
    "email": string;
    "fullname": string;
    "id": string;
    "password": string;
    "token": string;
}