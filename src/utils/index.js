export const initials = (fn, ln) => {
    if(fn && ln) {
        return `${fn[0].toUpperCase()}${ln[0].toUpperCase()}`;
    }

    return '';
};

export const swapElements = (list, sourceId, destinatonId) => {
    const _sourceId = Number(sourceId);
    const _destinationId = Number(destinatonId);
    const sourceIndex = list.findIndex(l => l.id === _sourceId);
    const destinationIndex = list.findIndex(l => l.id === _destinationId);

    var tmp = list[sourceIndex].order;
    list[sourceIndex].order = list[destinationIndex].order;
    list[destinationIndex].order = tmp;

    return list;
}
