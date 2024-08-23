import { addSuppliers, removeRule, suppliers, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
  StepsForm,
  ProFormSelect,
  ProFormDatePicker
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm.tsx';
import UpdateForm from './components/UpdateForm.tsx';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.SuppliersListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addSuppliers({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.SuppliersListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const Supplier: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.SuppliersListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.SuppliersListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.SuppliersListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.searchclient.id"
        //   defaultMessage="Rule no"
        />
      ),
      dataIndex: 'id',
    //   tip: 'The rule name is the unique key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchclient.code" defaultMessage="Description" />,
      dataIndex: 'code',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchclient.name" defaultMessage="Description" />,
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchclient.address" defaultMessage="Description" />,
        dataIndex: 'address',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchclient.contact" defaultMessage="Description" />,
        dataIndex: 'contact',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchclient.telephone" defaultMessage="Description" />,
        dataIndex: 'telephone',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchclient.status" defaultMessage="Description" />,
        dataIndex: 'status',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchclient.brand" defaultMessage="Description" />,
        dataIndex: 'brand',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchclient.attribute" defaultMessage="Description" />,
        dataIndex: 'attribute',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchclient.remark" defaultMessage="Description" />,
        dataIndex: 'remark',
        valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchclient.operation" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchclient.edit" defaultMessage="Configuration" />
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.SuppliersListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchclient.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchclient.new" defaultMessage="New" />
          </Button>,
        ]}
        request={suppliers}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchclient.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchclient.item" defaultMessage="项" />
              &nbsp;&nbsp;
              {/* <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                <FormattedMessage id="pages.searchsupplier.tenThousand" defaultMessage="万" />
              </span> */}
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchclient.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          {/* <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button> */}
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchclient.createForm.newInfo',
          defaultMessage: '新建信息',
        })}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.SuppliersListItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
      <ProFormText
      name="code"
      label={intl.formatMessage({
          id: 'pages.searchclient.code',
          defaultMessage: '编码',
      })}
      width="md"
      rules={[
          {
          // required: true,
          message: (
              <FormattedMessage
              id="pages.searchclient.code"
              defaultMessage="请输入编码！"
              />
          ),
          },
      ]}
      />
        <ProFormText
        name="name"
        label={intl.formatMessage({
            id: 'pages.searchclient.name',
            defaultMessage: '名称',
        })}
        width="md"
        rules={[
            {
            // required: true,
            message: (
                <FormattedMessage
                id="pages.searchclient.name"
                defaultMessage="请输入名称！"
                />
            ),
            },
        ]}
        />
        <ProFormText
            name="address"
            label={intl.formatMessage({
              id: 'pages.searchclient.address',
              defaultMessage: '地址',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchclient.address"
                    defaultMessage="请输入地址！"
                  />
                ),
              },
            ]}
          />
          <ProFormText
            name="contact"
            label={intl.formatMessage({
              id: 'pages.searchclient.contact',
              defaultMessage: '联系人',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchclient.contact"
                    defaultMessage="请输入联系人！"
                  />
                ),
              },
            ]}
          />
          <ProFormText
            name="telephone"
            label={intl.formatMessage({
              id: 'pages.searchclient.telephone',
              defaultMessage: '联系电话',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchclient.telephone"
                    defaultMessage="请输入联系电话！"
                  />
                ),
              },
            ]}
          />
          <ProFormSelect
            name="status"
            label={intl.formatMessage({
              id: 'pages.searchclient.status',
              defaultMessage: '状态',
            })}
            width="md"
            valueEnum={{
              0: '确认合作',
              1: '暂停合作',
              2: '终止合作',
            }}
          />
        <ProFormText
        name="brand"
        label={intl.formatMessage({
            id: 'pages.searchclient.brand',
            defaultMessage: '品牌',
        })}
        width="md"
        rules={[
            {
            // required: true,
            message: (
                <FormattedMessage
                id="pages.searchclient.brand"
                defaultMessage="请输入品牌！"
                />
            ),
            },
        ]}
        />
        <ProFormText
        name="attribute"
        label={intl.formatMessage({
            id: 'pages.searchclient.attribute',
            defaultMessage: '性质',
        })}
        width="md"
        rules={[
            {
            // required: true,
            message: (
                <FormattedMessage
                id="pages.searchclient.attribute"
                defaultMessage="请输入性质"
                />
            ),
            },
        ]}
        />
        <ProFormTextArea
            name="remark"
            label={intl.formatMessage({
              id: 'pages.searchclient.remark',
              defaultMessage: '备注',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchclient.remark"
                    defaultMessage="请输入备注！"
                  />
                ),
              },
            ]}
          />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.SuppliersListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.SuppliersListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default Supplier;
