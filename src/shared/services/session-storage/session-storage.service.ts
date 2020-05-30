function set(key: string, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data));
}

function get(key: string): any {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item): undefined;
}

export default {
    set,
    get
}