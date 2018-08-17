export const initials = (fn, ln) => {
    if(fn && ln) {
        return `${fn[0].toUpperCase()}${ln[0].toUpperCase()}`;
    }

    return '';
};