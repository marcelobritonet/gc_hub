function set(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
    return data;
}

function get(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item): undefined;
}

export default {
    set,
    get
}