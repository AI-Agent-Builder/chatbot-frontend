export const userData = [
    {
        id: 1,
        avatar: '/User1.png',
        messages: [],
        name: 'Robot',
    },
    {
        id: 2,
        avatar: '/User2.png',
        name: 'John Doe',
    },
    {
        id: 3,
        avatar: '/User3.png',
        name: 'Elizabeth Smith',
    },
    {
        id: 4,
        avatar: '/User4.png',
        name: 'John Smith',
    }
];

export type UserData = (typeof userData)[number];

export const loggedInUserData = {
    id: 5,
    avatar: '/LoggedInUser.jpg',
    name: 'Jakob Hoeg',
};

export type LoggedInUserData = (typeof loggedInUserData);

export interface Message {
    id: number;
    avatar: string;
    name: string;
    message: string;
}

export interface User {
    id: number;
    avatar: string;
    messages: Message[];
    name: string;
}