import request from '@/utils/request'

/* eslint-disable */
export function save(record) {
    return request({
        url: '/record/add',
        method: 'post',
        data: record
    })
}

export function queryWithTime(startTime, endTime, goods, partner, inOrOut, current, size) {
    return request({
        url: '/record/query',
        method: 'post',
        data: {
            startTime: startTime,
            endTime: endTime,
            goods: goods,
            partner: partner,
            inOrOut: inOrOut,
            current: current,
            size: size
        }
    })
}

export function query(goods, partner, inOrOut, current, size) {
    return request({
        url: '/record/query',
        method: 'post',
        data: {
            goods: goods,
            partner: partner,
            inOrOut: inOrOut,
            current: current,
            size: size
        }
    })
}

export function remove(id) {
    return request({
        url: '/record/delete',
        method: 'post',
        data: {
            id: id
        }
    })
}

