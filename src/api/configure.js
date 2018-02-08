import request from '@/utils/request'

/* eslint-disable */
export function updateConfigure(goods, partner) {
    return request({
        url: '/configure/update',
        method: 'post',
        data: {
            goods: goods,
            partner: partner
        }
    })
}

export function getConfigure() {
    return request({
        url: '/configure/get',
        method: 'get'
    })
}

