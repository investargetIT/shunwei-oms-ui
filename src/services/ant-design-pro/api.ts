// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('http://localhost:8000/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('http://localhost:8000/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('http://localhost:8000/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('http://localhost:8000/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('http://localhost:8000/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('http://localhost:8000/api/rule', {
    method: 'POST',
    data:{
      method: 'update',
      ...(options || {}),
    }
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('http://localhost:8000/api/rule', {
    method: 'POST',
    data:{
      method: 'post',
      ...(options || {}),
    }
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('http://localhost:8000/api/rule', {
    method: 'POST',
    data:{
      method: 'delete',
      ...(options || {}),
    }
  });
}

/** 获取供应商 GET /suppliers/search */
export async function suppliers(params: API.PageParams) {
  const { current, pageSize, ...restParams } = params;
  try {
    const response = await request('/suppliers/search', {
      method: 'GET',
      params: {
        ...restParams,
        page: current - 1,   // Map to 'page'
        size: pageSize,  // Map to 'size'
      },
    });

    return {
      data: response.data.content,
      total: response.data.totalElements,
      success: true,
    };
  } catch (error) {
    return {
      data: [],
      total: 0,
      success: false,
    };
  }
}

/** 获取供应商id和name GET /suppliers/search */
export async function fetchSuppliers(params: API.PageParams) {
  const { current, pageSize, ...restParams } = params;
  try {
    const response = await request('/suppliers/search', {
      method: 'GET',
      params: {
        ...restParams,
        page: current - 1,
        size: pageSize,
      },
    });

    const formattedData = response.data.content.map(supplier => ({
      id: supplier.id,
      name: supplier.name,
    }));

    return {
      data: formattedData,
      total: response.data.totalElements,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    return {
      data: [],
      total: 0,
      success: false,
    };
  }
}

/** 更新供应商 PUT /suppliers */
export async function updateSuppliers(id: string, data: any) {
  try {
    const response = await request<API.SuppliersListItem>(`/suppliers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 如果需要认证 token，请在 headers 中添加
      },
      data,
    });
    return response;
  } catch (error) {
    console.error('Failed to update supplier:', error);
    throw error;
  }
}


/** 新建供应商 POST /suppliers */
export async function addSuppliers(options?: { [key: string]: any }) {
  return request<API.SuppliersListItem>('/suppliers', {
    method: 'POST',
    data:{
      ...(options || {}),
    }
  });
}

/** 删除供应商 DELETE /suppliers/batch */
export async function removeSuppliers(ids: any) {
  try {
    const response = await request<API.SuppliersListItem>(`/suppliers/batch`, {
      method: 'DELETE',
      data: {ids},
      headers: {
        'Content-Type': 'application/json',
        // 如果需要认证 token，请在 headers 中添加
      },
    });
    return response;
  } catch (error) {
    console.error('Failed to update supplier:', error);
    throw error;
  }
}

/** 获取商品 GET /goods/search */
export async function goods(params: API.PageParams) {
  const { current, pageSize, ...restParams } = params;
  try {
    const response = await request('/goods/search', {
      method: 'GET',
      params: {
        ...restParams,
        page: current - 1,   // Map to 'page'
        size: pageSize,  // Map to 'size'
      },
    });

    return {
      data: response.data.content,
      total: response.data.totalElements,
      success: true,
    };
  } catch (error) {
    return {
      data: [],
      total: 0,
      success: false,
    };
  }
}

/** 更新商品 PUT /goods */
export async function updateGoods(id: string, data: any) {
  try {
    const response = await request<API.GoodsListItem>(`/goods/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 如果需要认证 token，请在 headers 中添加
      },
      data,
    });
    return response;
  } catch (error) {
    console.error('Failed to update goods:', error);
    throw error;
  }
}


/** 新建商品 POST /goods */
export async function addGoods(options?: { [key: string]: any }) {
  return request<API.GoodsListItem>('/goods', {
    method: 'POST',
    data:{
      ...(options || {}),
    }
  });
}

/** 删除商品 DELETE /goods/batch */
export async function removeGoods(ids: any) {
  try {
    const response = await request<API.GoodsListItem>(`/goods/batch`, {
      method: 'DELETE',
      data: {ids},
      headers: {
        'Content-Type': 'application/json',
        // 如果需要认证 token，请在 headers 中添加
      },
    });
    return response;
  } catch (error) {
    console.error('Failed to delete goods:', error);
    throw error;
  }
}
