import request from '@/utils/request'

/* eslint-disable */
export function balanceUpdate(goods, partner, update) {
    return request({
        url: '/balance/update',
        method: 'post',
        data: {
            goods: goods,
            partner: partner,
            update: update
        }
    })
}

export function balanceQuery(goods, partner) {
    return request({
        url: '/balance/query',
        method: 'post',
        data: {
            goods: goods,
            partner: partner
        }
    })
}
