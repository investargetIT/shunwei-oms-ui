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

/** 获取供应商 GET /suppliers */
// export async function suppliers(
//   params: {
//     // query
//     /** 当前的页码 */
//     current?: number;
//     /** 页面的容量 */
//     pageSize?: number;
//   },
//   options?: { [key: string]: any },
// ) {
//   return request<API.SuppliersList>('/suppliers', {
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }
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
