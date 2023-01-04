export class Base64StringService {
    static encode(text: string): string {
        return btoa(text);
    }

    static decode(text: string): string {
        return atob(text);
    }
}
