import { userOrder } from './config';

export const initials = (fn, ln) => {
    if (fn && ln) {
        return `${fn[0].toUpperCase()}${ln[0].toUpperCase()}`;
    }

    return '';
};

export const newOrder = (list) => {
    var max = 0;

    list.forEach(l => {
        if (l[userOrder] > max) {
            max = l[userOrder];
        }
    });

    return max + 1;
};

export const calculateOrder = (list, draggableIdx, endIdx) => {
    let _list = list.slice();
    const [removed] = _list.splice(draggableIdx, 1);

    if (endIdx - 1 >= 0 && endIdx < _list.length) {
        removed[userOrder] = (_list[endIdx - 1][userOrder] + _list[endIdx][userOrder]) / 2;
    } else if (endIdx >= _list.length) {
        removed[userOrder] = _list[endIdx - 1][userOrder] + 1;
    } else {
        removed[userOrder] = (_list[endIdx][userOrder]) / 2;
    }

    _list.splice(endIdx, 0, removed)

    return _list;
}
