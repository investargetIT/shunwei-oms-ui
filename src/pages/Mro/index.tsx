import { addMro, removeMro, mro, updateMro } from '@/services/ant-design-pro/api';
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
  ProFormDatePicker,
  ProForm,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, Input, message, Modal, Upload } from 'antd';
import React, {useEffect, useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm.tsx';
import UpdateForm from './components/UpdateForm.tsx';

const Mro: React.FC = () => {


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
  const [currentRow, setCurrentRow] = useState<API.MroListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.MroListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.MroListItem>[] = [
    {
        title: <FormattedMessage id="pages.searchmro.projectCode" defaultMessage="项目编号" />,
        dataIndex: 'projectCode',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.salesRep" defaultMessage="销售员" />,
        dataIndex: 'salesRep',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.clientName" defaultMessage="终端单位名称" />,
        dataIndex: 'clientName',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.orderChannel" defaultMessage="平台/线下" />,
        dataIndex: 'orderChannel',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.channelCoefficient" defaultMessage="平台系数" />,
        dataIndex: 'channelCoefficient',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.orderSummary" defaultMessage="下单概况" />,
        dataIndex: 'orderSummary',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.orderDate" defaultMessage="下单日期" />,
        dataIndex: 'orderDate',
        valueType: 'date',
    },
    {
        title: <FormattedMessage id="pages.searchmro.productInquiryDescription" defaultMessage="客户询价商品描述" />,
        dataIndex: 'productInquiryDescription',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.quantity" defaultMessage="数量" />,
        dataIndex: 'quantity',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.unit" defaultMessage="单位" />,
        dataIndex: 'unit',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.salesPricePerUnit" defaultMessage="销售含税单价" />,
        dataIndex: 'salesPricePerUnit',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.salesTotalPrice" defaultMessage="销售含税总价" />,
        dataIndex: 'salesTotalPrice',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.settlementPricePerUnit" defaultMessage="结算含税单价" />,
        dataIndex: 'settlementPricePerUnit',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.settlementTotalPrice" defaultMessage="结算含税总价" />,
        dataIndex: 'settlementTotalPrice',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.recipientName" defaultMessage="收货人名称" />,
        dataIndex: 'recipientName',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.recipientPhone" defaultMessage="收货人电话" />,
        dataIndex: 'recipientPhone',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.deliveryAddress" defaultMessage="客户收货地址" />,
        dataIndex: 'deliveryAddress',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.requestedDeliveryDate" defaultMessage="客户要求交货日期" />,
        dataIndex: 'requestedDeliveryDate',
        valueType: 'date',
    },
    {
        title: <FormattedMessage id="pages.searchmro.procurementCode" defaultMessage="采购编码" />,
        dataIndex: 'procurementCode',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.platformAmount" defaultMessage="平台金额" />,
        dataIndex: 'platformAmount',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.supplierName" defaultMessage="供应商名称" />,
        dataIndex: 'supplierName',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.materialCode" defaultMessage="物料编码" />,
        dataIndex: 'materialCode',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.brand" defaultMessage="品牌" />,
        dataIndex: 'brand',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.productName" defaultMessage="产品名称" />,
        dataIndex: 'productName',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.productModel" defaultMessage="产品型号" />,
        dataIndex: 'productModel',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.supplierDeliveryTime" defaultMessage="供货商交货货期" />,
        dataIndex: 'supplierDeliveryTime',
        valueType: 'date',
    },
    {
        title: <FormattedMessage id="pages.searchmro.purchasePrice" defaultMessage="采购单价" />,
        dataIndex: 'purchasePrice',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.purchaseTotalPrice" defaultMessage="采购总价" />,
        dataIndex: 'purchaseTotalPrice',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.isTaxShippingInclusive" defaultMessage="是否含税含运" />,
        dataIndex: 'isTaxShippingInclusive',
        valueType: 'select',
        render: (text) => text ? '是' : '否',
        valueEnum: {
            true: '是',
            false: '否',
        },
    },
    {
        title: <FormattedMessage id="pages.searchmro.grossProfit" defaultMessage="毛利额" />,
        dataIndex: 'grossProfit',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.grossMargin" defaultMessage="毛利率" />,
        dataIndex: 'grossMargin',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.paymentMethod" defaultMessage="付款方式" />,
        dataIndex: 'paymentMethod',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.platformSku" defaultMessage="平台SKU编码" />,
        dataIndex: 'platformSku',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.isOrderedOnPlatform" defaultMessage="平台是否下单" />,
        dataIndex: 'isOrderedOnPlatform',
        valueType: 'select',
        valueEnum: {
            true: '是',
            false: '否',
        },
    },
    {
        title: <FormattedMessage id="pages.searchmro.platformOrderNumber" defaultMessage="平台订单号" />,
        dataIndex: 'platformOrderNumber',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.supplierPaymentDate" defaultMessage="供应商付款时间" />,
        dataIndex: 'supplierPaymentDate',
        valueType: 'date',
    },
    {
        title: <FormattedMessage id="pages.searchmro.purchasePaymentAmount" defaultMessage="采购付款金额" />,
        dataIndex: 'purchasePaymentAmount',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.logisticsCompany" defaultMessage="物流公司" />,
        dataIndex: 'logisticsCompany',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.trackingNumber" defaultMessage="发货物流单号" />,
        dataIndex: 'trackingNumber',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.deliveryStatus" defaultMessage="到货情况" />,
        dataIndex: 'deliveryStatus',
        valueType: 'select',
        valueEnum :{
          '已交付': '已交付',
          '运输中': '运输中',
          '待处理': '待处理',
        }
    },
    {
        title: <FormattedMessage id="pages.searchmro.arrivalDate" defaultMessage="到货日期" />,
        dataIndex: 'arrivalDate',
        valueType: 'date',
    },
    {
        title: <FormattedMessage id="pages.searchmro.isInvoiceReceived" defaultMessage="是否回票" />,
        dataIndex: 'isInvoiceReceived',
        valueType: 'select',
        valueEnum: {
            true: '是',
            false: '否',
        },
    },
    {
        title: <FormattedMessage id="pages.searchmro.procurementInvoiceNumber" defaultMessage="采购发票号" />,
        dataIndex: 'procurementInvoiceNumber',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.procurementInvoiceAmount" defaultMessage="采购发票金额" />,
        dataIndex: 'procurementInvoiceAmount',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.procurementInvoiceDate" defaultMessage="采购发票日期" />,
        dataIndex: 'procurementInvoiceDate',
        valueType: 'date',
    },
    {
        title: <FormattedMessage id="pages.searchmro.purchaseNote" defaultMessage="采购备注" />,
        dataIndex: 'purchaseNote',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.billingDate" defaultMessage="开票日期" />,
        dataIndex: 'billingDate',
        valueType: 'date',
    },
    {
        title: <FormattedMessage id="pages.searchmro.salesInvoiceNumber" defaultMessage="销售发票号" />,
        dataIndex: 'salesInvoiceNumber',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.invoiceAmount" defaultMessage="发票金额" />,
        dataIndex: 'invoiceAmount',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.receivablesDate" defaultMessage="应收日期" />,
        dataIndex: 'receivablesDate',
        valueType: 'date',
    },
    {
        title: <FormattedMessage id="pages.searchmro.isPaymentReceived" defaultMessage="是否收款" />,
        dataIndex: 'isPaymentReceived',
        valueType: 'select',
        render: (text) => text ? '是' : '否',
        valueEnum: {
            true: '是',
            false: '否',
        },
    },
    {
        title: <FormattedMessage id="pages.searchmro.paymentReceivedAmount" defaultMessage="已收款金额" />,
        dataIndex: 'paymentReceivedAmount',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.adjustmentNote" defaultMessage="调整说明" />,
        dataIndex: 'adjustmentNote',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchmro.saleNote" defaultMessage="销售备注" />,
        dataIndex: 'saleNote',
        valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchmro.operation" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          className="colortext"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchmro.operation.edit" defaultMessage="edit" />
        </a>,
        !showDetail && ( // Check if detail view is not open
            <a
              key="details"
              className="colortext"
              onClick={() => {
                setCurrentRow(record);   // Sets the current row to show details
                setShowDetail(true);     // Displays the details view
              }}
            >
              <FormattedMessage id="pages.searchmro.operation.details" defaultMessage="details" />
            </a>
          )
      ],
    },
];


  /**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
  const handleAdd = async (fields: API.MroListItem) => {
    const hide = message.loading('正在添加');
    try {
      await addMro({ ...fields });
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
    const id = fields.id;
    const values = {
      projectCode: fields.projectCode,
      salesRep: fields.salesRep,
      clientName: fields.clientName,
      orderChannel: fields.orderChannel,
      channelCoefficient: fields.channelCoefficient,
      orderSummary: fields.orderSummary,
      orderDate: fields.orderDate,
      productInquiryDescription: fields.productInquiryDescription,
      quantity: fields.quantity,
      unit: fields.unit,
      salesPricePerUnit: fields.salesPricePerUnit,
      salesTotalPrice: fields.salesTotalPrice,
      settlementPricePerUnit: fields.settlementPricePerUnit,
      settlementTotalPrice: fields.settlementTotalPrice,
      recipientName: fields.recipientName,
      recipientPhone: fields.recipientPhone,
      deliveryAddress: fields.deliveryAddress,
      requestedDeliveryDate: fields.requestedDeliveryDate,
      procurementCode: fields.procurementCode,
      platformAmount: fields.platformAmount,
      supplierName: fields.supplierName,
      materialCode: fields.materialCode,
      brand: fields.brand,
      productName: fields.productName,
      productModel: fields.productModel,
      supplierDeliveryTime: fields.supplierDeliveryTime,
      purchasePrice: fields.purchasePrice,
      purchaseTotalPrice: fields.purchaseTotalPrice,
      isTaxShippingInclusive: fields.isTaxShippingInclusive,
      grossProfit: fields.grossProfit,
      grossMargin: fields.grossMargin,
      paymentMethod: fields.paymentMethod,
      platformSku: fields.platformSku,
      isOrderedOnPlatform: fields.isOrderedOnPlatform,
      platformOrderNumber: fields.platformOrderNumber,
      supplierPaymentDate: fields.supplierPaymentDate,
      purchasePaymentAmount: fields.purchasePaymentAmount,
      logisticsCompany: fields.logisticsCompany,
      trackingNumber: fields.trackingNumber,
      deliveryStatus: fields.deliveryStatus,
      arrivalDate: fields.arrivalDate,
      isInvoiceReceived: fields.isInvoiceReceived,
      procurementInvoiceNumber: fields.procurementInvoiceNumber,
      procurementInvoiceAmount: fields.procurementInvoiceAmount,
      procurementInvoiceDate: fields.procurementInvoiceDate,
      purchaseNote: fields.purchaseNote,
      billingDate: fields.billingDate,
      salesInvoiceNumber: fields.salesInvoiceNumber,
      invoiceAmount: fields.invoiceAmount,
      receivablesDate: fields.receivablesDate,
      isPaymentReceived: fields.isPaymentReceived,
      paymentReceivedAmount: fields.paymentReceivedAmount,
      adjustmentNote: fields.adjustmentNote,
      saleNote: fields.saleNote,      
    }
    try {
      await updateMro(id, values);
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
  const handleRemove = async (selectedRows: API.MroListItem[]) => {
    Modal.confirm({
      title: <FormattedMessage id="pages.searchorders.deleteConfirmTitle" defaultMessage="确认删除" />,
      content: <FormattedMessage id="pages.searchorders.deleteConfirmContent" defaultMessage="确定要删除吗？" />,
      okText: <FormattedMessage id="pages.searchorders.deleteConfirmOk" defaultMessage="确认删除" />,
      cancelText: <FormattedMessage id="pages.searchorders.deleteConfirmCancel" defaultMessage="取消" />,
      onOk: async () => {
        const hide = message.loading('正在删除');
        if (!selectedRows) return true;
        const ids = selectedRows.map((row) => row.id);
        try {
          await removeMro(ids);
          hide();
          message.success('删除成功');
          setSelectedRows([]);
          actionRef.current?.reloadAndRest?.();
          return true;
        } catch (error) {
          hide();
          message.error('Delete failed, please try again');
          return false;
        }
      }
    });
  };

  return (
    <PageContainer>
      <ProTable<API.MroListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchmro.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        scroll={{ x: 'max-content' }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchmro.new" defaultMessage="New" />
          </Button>,
        ]}
        request={mro}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        pagination={{ showSizeChanger: true, showQuickJumper: true }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchmro.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchmro.item" defaultMessage="项" />
            </div>
          }
        >
          <Button onClick={() => handleRemove(selectedRowsState)}>
            <FormattedMessage
              id="pages.searchmro.batchDeletion"
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
        {createModalOpen &&( 
          <ModalForm
          title={intl.formatMessage({
              id: 'pages.searchmro.createForm.newInfo',
              defaultMessage: '新建信息',
          })}
          width="400px"
          open={createModalOpen}
          onOpenChange={handleModalOpen}
          onFinish={async (value) => {
              const success = await handleAdd(value as API.MroListItem);
              if (success) {
                  handleModalOpen(false);
                  if (actionRef.current) {
                      actionRef.current.reload();
                  }
              }
          }}
      >

          <ProFormText
              name="projectCode"
              label={intl.formatMessage({
                  id: 'pages.searchmro.projectCode',
                  defaultMessage: '项目编号',
              })}
              width="md"
              rules={[
                  {
                      required: true,
                      message: (
                          <FormattedMessage
                              id="pages.searchmro.projectCode"
                              defaultMessage="请输入项目编号！"
                          />
                      ),
                  },
              ]}
          />
      
          <ProFormText
              name="salesRep"
              label={intl.formatMessage({
                  id: 'pages.searchmro.salesRep',
                  defaultMessage: '销售员',
              })}
              width="md"
              rules={[
                  {
                      required: true,
                      message: (
                          <FormattedMessage
                              id="pages.searchmro.salesRep"
                              defaultMessage="请输入销售员！"
                          />
                      ),
                  },
              ]}
          />
      
          <ProFormText
              name="clientName"
              label={intl.formatMessage({
                  id: 'pages.searchmro.clientName',
                  defaultMessage: '终端单位名称',
              })}
              width="md"
          />
      
          <ProFormText
              name="orderChannel"
              label={intl.formatMessage({
                  id: 'pages.searchmro.orderChannel',
                  defaultMessage: '平台/线下',
              })}
              width="md"
          />
      
          <ProFormText
              name="channelCoefficient"
              label={intl.formatMessage({
                  id: 'pages.searchmro.channelCoefficient',
                  defaultMessage: '平台系数',
              })}
              width="md"
          />
      
          <ProFormText
              name="orderSummary"
              label={intl.formatMessage({
                  id: 'pages.searchmro.orderSummary',
                  defaultMessage: '下单概况',
              })}
              width="md"
          />
      
          <ProFormDatePicker
              name="orderDate"
              label={intl.formatMessage({
                  id: 'pages.searchmro.orderDate',
                  defaultMessage: '下单日期',
              })}
              width="md"
              // fieldProps={{
              //     showTime: { format: 'HH:mm:ss' },
              //     format: 'YYYY-MM-DDTHH:mm:ss',
              // }}
          />
      
          <ProFormText
              name="productInquiryDescription"
              label={intl.formatMessage({
                  id: 'pages.searchmro.productInquiryDescription',
                  defaultMessage: '客户询价商品描述',
              })}
              width="md"
          />
      
          <ProFormText
              name="quantity"
              label={intl.formatMessage({
                  id: 'pages.searchmro.quantity',
                  defaultMessage: '数量',
              })}
              width="md"
          />
      
          <ProFormText
              name="unit"
              label={intl.formatMessage({
                  id: 'pages.searchmro.unit',
                  defaultMessage: '单位',
              })}
              width="md"
          />
      
          <ProFormText
              name="salesPricePerUnit"
              label={intl.formatMessage({
                  id: 'pages.searchmro.salesPricePerUnit',
                  defaultMessage: '销售含税单价',
              })}
              width="md"
          />
      
          <ProFormText
              name="salesTotalPrice"
              label={intl.formatMessage({
                  id: 'pages.searchmro.salesTotalPrice',
                  defaultMessage: '销售含税总价',
              })}
              width="md"
          />
      
          <ProFormText
              name="settlementPricePerUnit"
              label={intl.formatMessage({
                  id: 'pages.searchmro.settlementPricePerUnit',
                  defaultMessage: '结算含税单价',
              })}
              width="md"
          />
      
          <ProFormText
              name="settlementTotalPrice"
              label={intl.formatMessage({
                  id: 'pages.searchmro.settlementTotalPrice',
                  defaultMessage: '结算含税总价',
              })}
              width="md"
          />
      
          <ProFormText
              name="recipientName"
              label={intl.formatMessage({
                  id: 'pages.searchmro.recipientName',
                  defaultMessage: '收货人名称',
              })}
              width="md"
          />
      
          <ProFormText
              name="recipientPhone"
              label={intl.formatMessage({
                  id: 'pages.searchmro.recipientPhone',
                  defaultMessage: '收货人电话',
              })}
              width="md"
          />
      
          <ProFormText
              name="deliveryAddress"
              label={intl.formatMessage({
                  id: 'pages.searchmro.deliveryAddress',
                  defaultMessage: '客户收货地址',
              })}
              width="md"
          />
      
          <ProFormDatePicker
              name="requestedDeliveryDate"
              label={intl.formatMessage({
                  id: 'pages.searchmro.requestedDeliveryDate',
                  defaultMessage: '客户要求交货日期',
              })}
              width="md"
          />
      
          <ProFormText
              name="procurementCode"
              label={intl.formatMessage({
                  id: 'pages.searchmro.procurementCode',
                  defaultMessage: '采购编码',
              })}
              width="md"
          />
      
          <ProFormText
              name="platformAmount"
              label={intl.formatMessage({
                  id: 'pages.searchmro.platformAmount',
                  defaultMessage: '平台金额',
              })}
              width="md"
          />
      
          <ProFormText
              name="supplierName"
              label={intl.formatMessage({
                  id: 'pages.searchmro.supplierName',
                  defaultMessage: '供应商名称',
              })}
              width="md"
          />
      
          <ProFormText
              name="materialCode"
              label={intl.formatMessage({
                  id: 'pages.searchmro.materialCode',
                  defaultMessage: '物料编码',
              })}
              width="md"
          />
      
          <ProFormText
              name="brand"
              label={intl.formatMessage({
                  id: 'pages.searchmro.brand',
                  defaultMessage: '品牌',
              })}
              width="md"
          />
      
          <ProFormText
              name="productName"
              label={intl.formatMessage({
                  id: 'pages.searchmro.productName',
                  defaultMessage: '产品名称',
              })}
              width="md"
          />
      
          <ProFormText
              name="productModel"
              label={intl.formatMessage({
                  id: 'pages.searchmro.productModel',
                  defaultMessage: '产品型号',
              })}
              width="md"
          />
      
          <ProFormDatePicker
              name="supplierDeliveryTime"
              label={intl.formatMessage({
                  id: 'pages.searchmro.supplierDeliveryTime',
                  defaultMessage: '供货商交货货期',
              })}
              width="md"
          />
      
          <ProFormText
              name="purchasePrice"
              label={intl.formatMessage({
                  id: 'pages.searchmro.purchasePrice',
                  defaultMessage: '采购单价',
              })}
              width="md"
          />
      
          <ProFormText
              name="purchaseTotalPrice"
              label={intl.formatMessage({
                  id: 'pages.searchmro.purchaseTotalPrice',
                  defaultMessage: '采购总价',
              })}
              width="md"
          />
      
          <ProFormSelect
              name="isTaxShippingInclusive"
              label={intl.formatMessage({
                  id: 'pages.searchmro.isTaxShippingInclusive',
                  defaultMessage: '是否含税含运',
              })}
              width="md"
              valueEnum={{
                  true: '是',
                  false: '否',
              }}
          />
      
          <ProFormText
              name="grossProfit"
              label={intl.formatMessage({
                  id: 'pages.searchmro.grossProfit',
                  defaultMessage: '毛利额',
              })}
              width="md"
          />
      
          <ProFormText
              name="grossMargin"
              label={intl.formatMessage({
                  id: 'pages.searchmro.grossMargin',
                  defaultMessage: '毛利率',
              })}
              width="md"
          />
      
          <ProFormText
              name="paymentMethod"
              label={intl.formatMessage({
                  id: 'pages.searchmro.paymentMethod',
                  defaultMessage: '付款方式',
              })}
              width="md"
          />
      
          <ProFormText
              name="platformSku"
              label={intl.formatMessage({
                  id: 'pages.searchmro.platformSku',
                  defaultMessage: '平台SKU编码',
              })}
              width="md"
          />
      
          <ProFormSelect
              name="isOrderedOnPlatform"
              label={intl.formatMessage({
                  id: 'pages.searchmro.isOrderedOnPlatform',
                  defaultMessage: '是否已在平台下单',
              })}
              width="md"
              valueEnum={{
                  true: '是',
                  false: '否',
              }}
          />

          <ProFormText
              name="platformOrderNumber"
              label={intl.formatMessage({
                id: 'pages.searchmro.platformOrderNumber',
                defaultMessage: '平台订单号',
              })}
              width="md"
          />
          <ProFormDatePicker
              name="supplierPaymentDate"
              label={intl.formatMessage({
                id: 'pages.searchmro.supplierPaymentDate',
                defaultMessage: '供应商付款时间',
              })}
              width="md"
          />
          <ProFormText
              name="purchasePaymentAmount"
              label={intl.formatMessage({
                id: 'pages.searchmro.purchasePaymentAmount',
                defaultMessage: '采购付款金额',
              })}
              width="md"
          />
          <ProFormText
              name="logisticsCompany"
              label={intl.formatMessage({
                id: 'pages.searchmro.logisticsCompany',
                defaultMessage: '物流公司',
              })}
              width="md"
          />
          <ProFormText
              name="trackingNumber"
              label={intl.formatMessage({
                id: 'pages.searchmro.trackingNumber',
                defaultMessage: '发货物流单号',
              })}
              width="md"
          />
          <ProFormSelect
              name="deliveryStatus"
              label={intl.formatMessage({
                id: 'pages.searchmro.deliveryStatus',
                defaultMessage: '到货情况',
              })}
              width="md"
              valueEnum={{
                '已交付': '已交付',
                '运输中': '运输中',
                '待处理': '待处理',
              }}
          />
          <ProFormDatePicker
              name="arrivalDate"
              label={intl.formatMessage({
                id: 'pages.searchmro.arrivalDate',
                defaultMessage: '到货日期',
              })}
              width="md"
          />
          <ProFormSelect
              name="isInvoiceReceived"
              label={intl.formatMessage({
                id: 'pages.searchmro.isInvoiceReceived',
                defaultMessage: '是否回票',
              })}
              width="md"
              valueEnum={{
                true: '是',
                false: '否',
              }}
          />
      
          <ProFormText
              name="procurementInvoiceNumber"
              label={intl.formatMessage({
                  id: 'pages.searchmro.procurementInvoiceNumber',
                  defaultMessage: '采购发票号',
              })}
              width="md"
          />
      
          <ProFormText
              name="procurementInvoiceAmount"
              label={intl.formatMessage({
                  id: 'pages.searchmro.procurementInvoiceAmount',
                  defaultMessage: '采购发票金额',
              })}
              width="md"
          />
      
          <ProFormDatePicker
              name="procurementInvoiceDate"
              label={intl.formatMessage({
                  id: 'pages.searchmro.procurementInvoiceDate',
                  defaultMessage: '采购发票日期',
              })}
              width="md"
          />
      
          <ProFormTextArea
              name="purchaseNote"
              label={intl.formatMessage({
                  id: 'pages.searchmro.purchaseNote',
                  defaultMessage: '采购备注',
              })}
              width="md"
          />
      
          <ProFormDatePicker
              name="billingDate"
              label={intl.formatMessage({
                  id: 'pages.searchmro.billingDate',
                  defaultMessage: '开票日期',
              })}
              width="md"
          />
      
          <ProFormText
              name="salesInvoiceNumber"
              label={intl.formatMessage({
                  id: 'pages.searchmro.salesInvoiceNumber',
                  defaultMessage: '销售发票号',
              })}
              width="md"
          />
      
          <ProFormText
              name="invoiceAmount"
              label={intl.formatMessage({
                  id: 'pages.searchmro.invoiceAmount',
                  defaultMessage: '发票金额',
              })}
              width="md"
          />
      
          <ProFormDatePicker
              name="receivablesDate"
              label={intl.formatMessage({
                  id: 'pages.searchmro.receivablesDate',
                  defaultMessage: '应收日期',
              })}
              width="md"
          />
      
          <ProFormSelect
              name="isPaymentReceived"
              label={intl.formatMessage({
                  id: 'pages.searchmro.isPaymentReceived',
                  defaultMessage: '是否收款',
              })}
              width="md"
              valueEnum={{
                  true: '是',
                  false: '否',
              }}
          />
      
          <ProFormText
              name="paymentReceivedAmount"
              label={intl.formatMessage({
                  id: 'pages.searchmro.paymentReceivedAmount',
                  defaultMessage: '已收款金额',
              })}
              width="md"
          />
      
          <ProFormTextArea
              name="adjustmentNote"
              label={intl.formatMessage({
                  id: 'pages.searchmro.adjustmentNote',
                  defaultMessage: '调整说明',
              })}
              width="md"
          />
      
          <ProFormTextArea
              name="saleNote"
              label={intl.formatMessage({
                  id: 'pages.searchmro.saleNote',
                  defaultMessage: '销售备注',
              })}
              width="md"
          />
      </ModalForm>
      
        )}
      {currentRow && (
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
      )}
        <Drawer
            width={600}
            open={showDetail}
            onClose={() => {
            setCurrentRow(undefined);
            setShowDetail(false);
            }}
            closable={false}
        >
            {currentRow?.projectCode && (
            <ProDescriptions<API.MroListItem>
                column={2}
                title={currentRow?.projectCode}
                request={async () => ({
                data: currentRow || {},
                })}
                params={{
                id: currentRow?.projectCode,
                }}
                columns={columns as ProDescriptionsItemProps<API.MroListItem>[]}
            />
            )}
        </Drawer>
    </PageContainer>
  );
};

export default Mro;
