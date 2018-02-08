import request from '@/utils/request'

/* eslint-disable */
export function save(record) {
    return request({
        url: '/record/add',
        method: 'post',
        data: record
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

