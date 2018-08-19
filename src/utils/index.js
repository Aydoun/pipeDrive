export const initials = (fn, ln) => {
    if(fn && ln) {
        return `${fn[0].toUpperCase()}${ln[0].toUpperCase()}`;
    }

    return '';
};

export const swapElements = (list, sourceId, destinatonId) => {
    let _list = list.slice();
    const _sourceId = Number(sourceId);
    const _destinationId = Number(destinatonId);
    const sourceIndex = _list.findIndex(l => l.id === _sourceId);
    const destinationIndex = _list.findIndex(l => l.id === _destinationId);

    var tmp = _list[sourceIndex].order;
    _list[sourceIndex].order = list[destinationIndex].order;
    _list[destinationIndex].order = tmp;

    return _list;
}
