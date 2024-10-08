import {
  ProFormDateTimePicker,
  ProFormDatePicker,
  DatePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProForm,
  ProFormItem,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Modal,Input,Upload,Button,message,InputNumber } from 'antd';
import React, {useEffect, useState, useRef } from 'react';

export type FormValueType = {
  id?: string;
  projectCode?: string;
  salesRep?: string;
  clientName?: string;
  orderChannel?: string;
  channelCoefficient?: string;
  orderSummary?: string;
  orderDate?: string;
  productInquiryDescription?: string;
  quantity?: string;
  unit?: string;
  salesPricePerUnit?: string;
  salesTotalPrice?: string;
  settlementPricePerUnit?: string;
  settlementTotalPrice?: string;
  recipientName?: string;
  recipientPhone?: string;
  deliveryAddress?: string;
  requestedDeliveryDate?: string;
  procurementCode?: string;
  platformAmount?: string;
  supplierName?: string;
  materialCode?: string;
  brand?: string;
  productName?: string;
  productModel?: string;
  supplierDeliveryTime?: string;
  purchasePrice?: string;
  purchaseTotalPrice?: string;
  isTaxShippingInclusive?: string;
  grossProfit?: string;
  grossMargin?: string;
  paymentMethod?: string;
  platformSku?: string;
  isOrderedOnPlatform?: string;
  platformOrderNumber?: string;
  supplierPaymentDate?: string;
  purchasePaymentAmount?: string;
  logisticsCompany?: string;
  trackingNumber?: string;
  deliveryStatus?: string;
  arrivalDate?: string;
  isInvoiceReceived?: string;
  procurementInvoiceNumber?: string;
  procurementInvoiceAmount?: string;
  procurementInvoiceDate?: string;
  purchaseNote?: string;
  billingDate?: string;
  salesInvoiceNumber?: string;
  invoiceAmount?: string;
  receivablesDate?: string;
  isPaymentReceived?: string;
  paymentReceivedAmount?: string;
  adjustmentNote?: string;
  saleNote?: string;
} & Partial<API.MroListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.MroListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { isTaxShippingInclusive, isOrderedOnPlatform, isInvoiceReceived, isPaymentReceived } = props.values;
  const isTaxShippingInclusives = isTaxShippingInclusive?'true' : 'false';
  const isOrderedOnPlatforms = isOrderedOnPlatform?'true' : 'false';
  const isInvoiceReceiveds = isInvoiceReceived?'true' : 'false';
  const isPaymentReceiveds = isPaymentReceived?'true' : 'false';
  
  
  const intl = useIntl();
  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={640}
            styles={{
              body: {
                padding: '32px 40px 48px',
              },
            }}
            destroyOnClose
            title={intl.formatMessage({
              id: 'pages.searchmro.updateForm.editInfo',
              defaultMessage: '编辑信息',
            })}
            open={props.updateModalOpen}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
              setCurrentStep(0);
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >
      {/* 第一组字段 */}
      <StepsForm.StepForm
        initialValues={{
          id: props.values.id,
          projectCode: props.values.projectCode,
          salesRep: props.values.salesRep,
          clientName: props.values.clientName,
          orderChannel: props.values.orderChannel,
        }}
        title={intl.formatMessage({
          id: 'pages.searchmro.updateForm.basicInfo',
          defaultMessage: '基本信息',
        })}
      >
        <ProFormText
          name="id"
          hidden={true}
          label={intl.formatMessage({ id: 'pages.searchmro.id', defaultMessage: 'ID' })}
          width="md"
        />
        <ProFormText
          name="projectCode"
          label={intl.formatMessage({ id: 'pages.searchmro.projectCode', defaultMessage: '项目编号' })}
          width="md"
        />
        <ProFormText
          name="salesRep"
          label={intl.formatMessage({ id: 'pages.searchmro.salesRep', defaultMessage: '销售员' })}
          width="md"
        />
        <ProFormText
          name="clientName"
          label={intl.formatMessage({ id: 'pages.searchmro.clientName', defaultMessage: '终端单位名称' })}
          width="md"
        />
        <ProFormText
          name="orderChannel"
          label={intl.formatMessage({ id: 'pages.searchmro.orderChannel', defaultMessage: '平台/线下' })}
          width="md"
        />
      </StepsForm.StepForm>

      {/* 第二组字段 */}
      <StepsForm.StepForm
        initialValues={{
          channelCoefficient: props.values.channelCoefficient,
          orderSummary: props.values.orderSummary,
          orderDate: props.values.orderDate,
          productInquiryDescription: props.values.productInquiryDescription,
          quantity: props.values.quantity,
        }}
        title={intl.formatMessage({
          id: 'pages.searchmro.updateForm.basicInfo',
          defaultMessage: '基本信息',
        })}
      >
        <ProFormText
          name="channelCoefficient"
          label={intl.formatMessage({ id: 'pages.searchmro.channelCoefficient', defaultMessage: '平台系数' })}
          width="md"
        />
        <ProFormText
          name="orderSummary"
          label={intl.formatMessage({ id: 'pages.searchmro.orderSummary', defaultMessage: '下单概况' })}
          width="md"
        />
        <ProFormDatePicker
          name="orderDate"
          label={intl.formatMessage({ id: 'pages.searchmro.orderDate', defaultMessage: '下单日期' })}
          width="md"
        />
        <ProFormText
          name="productInquiryDescription"
          label={intl.formatMessage({ id: 'pages.searchmro.productInquiryDescription', defaultMessage: '客户询价商品描述' })}
          width="md"
        />
        <ProFormText
          name="quantity"
          label={intl.formatMessage({ id: 'pages.searchmro.quantity', defaultMessage: '数量' })}
          width="md"
        />
      </StepsForm.StepForm>

      {/* 第三组字段 */}
      <StepsForm.StepForm
        initialValues={{
          unit: props.values.unit,
          salesPricePerUnit: props.values.salesPricePerUnit,
          salesTotalPrice: props.values.salesTotalPrice,
          settlementPricePerUnit: props.values.settlementPricePerUnit,
          settlementTotalPrice: props.values.settlementTotalPrice,
        }}
        title={intl.formatMessage({
          id: 'pages.searchmro.updateForm.basicInfo',
          defaultMessage: '基本信息',
        })}
      >
        <ProFormText
          name="unit"
          label={intl.formatMessage({ id: 'pages.searchmro.unit', defaultMessage: '单位' })}
          width="md"
        />
        <ProFormText
          name="salesPricePerUnit"
          label={intl.formatMessage({ id: 'pages.searchmro.salesPricePerUnit', defaultMessage: '销售含税单价' })}
          width="md"
          // fieldProps={{
          //   // Use InputNumber to handle number input
          //   addonBefore: intl.formatMessage({
          //     id: 'pages.searchmro.salesPricePerUnit',
          //     defaultMessage: '¥', // Example currency symbol
          //   }),
          //   parser: (value) => value.replace(/^\D+/g, ''), // Remove non-numeric characters
          //   formatter: (value) => {
          //     if (!value) return '';
          //     return `¥ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`; // Format as currency
          //   },
          // }}
        />
        <ProFormText
          name="salesTotalPrice"
          label={intl.formatMessage({ id: 'pages.searchmro.salesTotalPrice', defaultMessage: '销售含税总价' })}
          width="md"
          // fieldProps={{
          //   // Use InputNumber to handle number input
          //   addonBefore: intl.formatMessage({
          //     id: 'pages.searchmro.salesTotalPrice',
          //     defaultMessage: '¥', // Example currency symbol
          //   }),
          //   parser: (value) => value.replace(/^\D+/g, ''), // Remove non-numeric characters
          //   formatter: (value) => {
          //     if (!value) return '';
          //     return `¥ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`; // Format as currency
          //   },
          // }}
        />
        <ProFormText
          name="settlementPricePerUnit"
          label={intl.formatMessage({ id: 'pages.searchmro.settlementPricePerUnit', defaultMessage: '结算含税单价' })}
          width="md"
          // fieldProps={{
          //   // Use InputNumber to handle number input
          //   addonBefore: intl.formatMessage({
          //     id: 'pages.searchmro.settlementPricePerUnit',
          //     defaultMessage: '¥', // Example currency symbol
          //   }),
          //   parser: (value) => value.replace(/^\D+/g, ''), // Remove non-numeric characters
          //   formatter: (value) => {
          //     if (!value) return '';
          //     return `¥ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`; // Format as currency
          //   },
          // }}
        />
        <ProFormText
          name="settlementTotalPrice"
          label={intl.formatMessage({ id: 'pages.searchmro.settlementTotalPrice', defaultMessage: '结算含税总价' })}
          width="md"
          // fieldProps={{
          //   // Use InputNumber to handle number input
          //   addonBefore: intl.formatMessage({
          //     id: 'pages.searchmro.settlementTotalPrice',
          //     defaultMessage: '¥', // Example currency symbol
          //   }),
          //   parser: (value) => value.replace(/^\D+/g, ''), // Remove non-numeric characters
          //   formatter: (value) => {
          //     if (!value) return '';
          //     return `¥ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`; // Format as currency
          //   },
          // }}
        />
      </StepsForm.StepForm>

      {/* 第四组字段 */}
      <StepsForm.StepForm
        initialValues={{
          recipientName: props.values.recipientName,
          recipientPhone: props.values.recipientPhone,
          deliveryAddress: props.values.deliveryAddress,
          requestedDeliveryDate: props.values.requestedDeliveryDate,
          procurementCode: props.values.procurementCode,
        }}
        title={intl.formatMessage({
          id: 'pages.searchmro.updateForm.basicInfo',
          defaultMessage: '基本信息',
        })}
      >
        <ProFormText
          name="recipientName"
          label={intl.formatMessage({ id: 'pages.searchmro.recipientName', defaultMessage: '收货人名称' })}
          width="md"
        />
        <ProFormText
          name="recipientPhone"
          label={intl.formatMessage({ id: 'pages.searchmro.recipientPhone', defaultMessage: '收货人电话' })}
          width="md"
        />
        <ProFormText
          name="deliveryAddress"
          label={intl.formatMessage({ id: 'pages.searchmro.deliveryAddress', defaultMessage: '客户收货地址' })}
          width="md"
        />
        <ProFormDatePicker
          name="requestedDeliveryDate"
          label={intl.formatMessage({ id: 'pages.searchmro.requestedDeliveryDate', defaultMessage: '客户要求交货日期' })}
          width="md"
        />
        <ProFormText
          name="procurementCode"
          label={intl.formatMessage({ id: 'pages.searchmro.procurementCode', defaultMessage: '采购编码' })}
          width="md"
        />
      </StepsForm.StepForm>

      {/* 第五组字段 */}
      <StepsForm.StepForm
        initialValues={{
          platformAmount: props.values.platformAmount,
          supplierName: props.values.supplierName,
          materialCode: props.values.materialCode,
          brand: props.values.brand,
          productName: props.values.productName,
        }}
        title={intl.formatMessage({
          id: 'pages.searchmro.updateForm.basicInfo',
          defaultMessage: '基本信息',
        })}
      >
        <ProFormText
          name="platformAmount"
          label={intl.formatMessage({ id: 'pages.searchmro.platformAmount', defaultMessage: '平台金额' })}
          width="md"
          // fieldProps={{
          //   // Use InputNumber to handle number input
          //   addonBefore: intl.formatMessage({
          //     id: 'pages.searchmro.platformAmount',
          //     defaultMessage: '¥', // Example currency symbol
          //   }),
          //   parser: (value) => value.replace(/^\D+/g, ''), // Remove non-numeric characters
          //   formatter: (value) => {
          //     if (!value) return '';
          //     return `¥ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`; // Format as currency
          //   },
          // }}
        />
        <ProFormText
          name="supplierName"
          label={intl.formatMessage({ id: 'pages.searchmro.supplierName', defaultMessage: '供应商名称' })}
          width="md"
        />
        <ProFormText
          name="materialCode"
          label={intl.formatMessage({ id: 'pages.searchmro.materialCode', defaultMessage: '物料编码' })}
          width="md"
        />
        <ProFormText
          name="brand"
          label={intl.formatMessage({ id: 'pages.searchmro.brand', defaultMessage: '品牌' })}
          width="md"
        />
        <ProFormText
          name="productName"
          label={intl.formatMessage({ id: 'pages.searchmro.productName', defaultMessage: '产品名称' })}
          width="md"
        />
      </StepsForm.StepForm>

      {/* 第六组字段 */}
      <StepsForm.StepForm
        initialValues={{
          productModel: props.values.productModel,
          supplierDeliveryTime: props.values.supplierDeliveryTime,
          purchasePrice: props.values.purchasePrice,
          purchaseTotalPrice: props.values.purchaseTotalPrice,
          isTaxShippingInclusive: isTaxShippingInclusives,
        }}
        title={intl.formatMessage({
          id: 'pages.searchmro.updateForm.basicInfo',
          defaultMessage: '基本信息',
        })}
      >
        <ProFormText
          name="productModel"
          label={intl.formatMessage({ id: 'pages.searchmro.productModel', defaultMessage: '产品型号' })}
          width="md"
        />
        <ProFormDatePicker
          name="supplierDeliveryTime"
          label={intl.formatMessage({ id: 'pages.searchmro.supplierDeliveryTime', defaultMessage: '供货商交货货期' })}
          width="md"
        />
        <ProFormText
          name="purchasePrice"
          label={intl.formatMessage({ id: 'pages.searchmro.purchasePrice', defaultMessage: '采购单价' })}
          width="md"
          // fieldProps={{
          //   // Use InputNumber to handle number input
          //   addonBefore: intl.formatMessage({
          //     id: 'pages.searchmro.purchasePrice',
          //     defaultMessage: '¥', // Example currency symbol
          //   }),
          //   parser: (value) => value.replace(/^\D+/g, ''), // Remove non-numeric characters
          //   formatter: (value) => {
          //     if (!value) return '';
          //     return `¥ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`; // Format as currency
          //   },
          // }}
        />
        <ProFormText
          name="purchaseTotalPrice"
          label={intl.formatMessage({ id: 'pages.searchmro.purchaseTotalPrice', defaultMessage: '采购总价' })}
          width="md"
          // fieldProps={{
          //   // Use InputNumber to handle number input
          //   addonBefore: intl.formatMessage({
          //     id: 'pages.searchmro.purchaseTotalPrice',
          //     defaultMessage: '¥', // Example currency symbol
          //   }),
          //   parser: (value) => value.replace(/^\D+/g, ''), // Remove non-numeric characters
          //   formatter: (value) => {
          //     if (!value) return '';
          //     return `¥ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`; // Format as currency
          //   },
          // }}
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
      </StepsForm.StepForm>

      {/* 第七组字段 */}
      <StepsForm.StepForm
        initialValues={{
          grossProfit: props.values.grossProfit,
          grossMargin: props.values.grossMargin,
          paymentMethod: props.values.paymentMethod,
          platformSku: props.values.platformSku,
          isOrderedOnPlatform: isOrderedOnPlatforms,
        }}
        title={intl.formatMessage({
          id: 'pages.searchmro.updateForm.basicInfo',
          defaultMessage: '基本信息',
        })}
      >
        <ProFormText
          name="grossProfit"
          label={intl.formatMessage({ id: 'pages.searchmro.grossProfit', defaultMessage: '毛利额' })}
          width="md"
          // fieldProps={{
          //   // Use InputNumber to handle number input
          //   addonBefore: intl.formatMessage({
          //     id: 'pages.searchmro.grossProfit',
          //     defaultMessage: '¥', // Example currency symbol
          //   }),
          //   parser: (value) => value.replace(/^\D+/g, ''), // Remove non-numeric characters
          //   formatter: (value) => {
          //     if (!value) return '';
          //     return `¥ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`; // Format as currency
          //   },
          // }}
        />
        <ProFormText
          name="grossMargin"
          label={intl.formatMessage({ id: 'pages.searchmro.grossMargin', defaultMessage: '毛利率' })}
          width="md"
        />
        <ProFormText
          name="paymentMethod"
          label={intl.formatMessage({ id: 'pages.searchmro.paymentMethod', defaultMessage: '付款方式' })}
          width="md"
        />
        <ProFormText
          name="platformSku"
          label={intl.formatMessage({ id: 'pages.searchmro.platformSku', defaultMessage: '平台SKU编码' })}
          width="md"
        />
        <ProFormSelect
          name="isOrderedOnPlatform"
          label={intl.formatMessage({ id: 'pages.searchmro.isOrderedOnPlatform', defaultMessage: '平台是否下单' })}
          width="md"
          valueEnum={{
            true: '是',
            false: '否',
          }}
        />
      </StepsForm.StepForm>

      {/* 第八组字段 */}
      <StepsForm.StepForm
        initialValues={{
          platformOrderNumber: props.values.platformOrderNumber,
          supplierPaymentDate: props.values.supplierPaymentDate,
          purchasePaymentAmount: props.values.purchasePaymentAmount,
          logisticsCompany: props.values.logisticsCompany,
          trackingNumber: props.values.trackingNumber,
        }}
        title={intl.formatMessage({
          id: 'pages.searchmro.updateForm.basicInfo',
          defaultMessage: '基本信息',
        })}
      >
        <ProFormText
          name="platformOrderNumber"
          label={intl.formatMessage({ id: 'pages.searchmro.platformOrderNumber', defaultMessage: '平台订单号' })}
          width="md"
        />
        <ProFormDatePicker
          name="supplierPaymentDate"
          label={intl.formatMessage({ id: 'pages.searchmro.supplierPaymentDate', defaultMessage: '供应商付款时间' })}
          width="md"
        />
        <ProFormText
          name="purchasePaymentAmount"
          label={intl.formatMessage({ id: 'pages.searchmro.purchasePaymentAmount', defaultMessage: '采购付款金额' })}
          width="md"
          // fieldProps={{
          //   // Use InputNumber to handle number input
          //   addonBefore: intl.formatMessage({
          //     id: 'pages.searchmro.purchasePaymentAmount',
          //     defaultMessage: '¥', // Example currency symbol
          //   }),
          //   parser: (value) => value.replace(/^\D+/g, ''), // Remove non-numeric characters
          //   formatter: (value) => {
          //     if (!value) return '';
          //     return `¥ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`; // Format as currency
          //   },
          // }}
        />
        <ProFormText
          name="logisticsCompany"
          label={intl.formatMessage({ id: 'pages.searchmro.logisticsCompany', defaultMessage: '物流公司' })}
          width="md"
        />
        <ProFormText
          name="trackingNumber"
          label={intl.formatMessage({ id: 'pages.searchmro.trackingNumber', defaultMessage: '发货物流单号' })}
          width="md"
        />
      </StepsForm.StepForm>

      {/* 第九组字段 */}
      <StepsForm.StepForm
        initialValues={{
          deliveryStatus: props.values.deliveryStatus,
          arrivalDate: props.values.arrivalDate,
          isInvoiceReceived: isInvoiceReceiveds,
          procurementInvoiceNumber: props.values.procurementInvoiceNumber,
          procurementInvoiceAmount: props.values.procurementInvoiceAmount,
        }}
        title={intl.formatMessage({
          id: 'pages.searchmro.updateForm.basicInfo',
          defaultMessage: '基本信息',
        })}
      >
        <ProFormSelect
          name="deliveryStatus"
          label={intl.formatMessage({ id: 'pages.searchmro.deliveryStatus', defaultMessage: '到货情况' })}
          width="md"
          valueEnum={{
            '已交付': '已交付',
            '运输中': '运输中',
            '待处理': '待处理',
          }}
        />
        <ProFormDatePicker
          name="arrivalDate"
          label={intl.formatMessage({ id: 'pages.searchmro.arrivalDate', defaultMessage: '到货日期' })}
          width="md"
        />
        <ProFormSelect
          name="isInvoiceReceived"
          label={intl.formatMessage({ id: 'pages.searchmro.isInvoiceReceived', defaultMessage: '是否回票' })}
          width="md"
          valueEnum={{
            true: '是',
            false: '否',
          }}
        />
        <ProFormText
          name="procurementInvoiceNumber"
          label={intl.formatMessage({ id: 'pages.searchmro.procurementInvoiceNumber', defaultMessage: '采购发票号' })}
          width="md"
        />
        <ProFormText
          name="procurementInvoiceAmount"
          label={intl.formatMessage({ id: 'pages.searchmro.procurementInvoiceAmount', defaultMessage: '回票金额' })}
          width="md"
          // fieldProps={{
          //   // Use InputNumber to handle number input
          //   addonBefore: intl.formatMessage({
          //     id: 'pages.searchmro.procurementInvoiceAmount',
          //     defaultMessage: '¥', // Example currency symbol
          //   }),
          //   parser: (value) => value.replace(/^\D+/g, ''), // Remove non-numeric characters
          //   formatter: (value) => {
          //     if (!value) return '';
          //     return `¥ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`; // Format as currency
          //   },
          // }}
        />
      </StepsForm.StepForm>

      {/* 第十组字段 */}
      <StepsForm.StepForm
        initialValues={{
          procurementInvoiceDate: props.values.procurementInvoiceDate,
          purchaseNote: props.values.purchaseNote,
          billingDate: props.values.billingDate,
          salesInvoiceNumber: props.values.salesInvoiceNumber,
          invoiceAmount: props.values.invoiceAmount,
        }}
        title={intl.formatMessage({
          id: 'pages.searchmro.updateForm.basicInfo',
          defaultMessage: '基本信息',
        })}
      >
        <ProFormDatePicker
          name="procurementInvoiceDate"
          label={intl.formatMessage({ id: 'pages.searchmro.procurementInvoiceDate', defaultMessage: '回票日期' })}
          width="md"
        />
        <ProFormTextArea
          name="purchaseNote"
          label={intl.formatMessage({ id: 'pages.searchmro.purchaseNote', defaultMessage: '采购备注' })}
          width="md"
        />
        <ProFormDatePicker
          name="billingDate"
          label={intl.formatMessage({ id: 'pages.searchmro.billingDate', defaultMessage: '开票时间' })}
          width="md"
        />
        <ProFormText
          name="salesInvoiceNumber"
          label={intl.formatMessage({ id: 'pages.searchmro.salesInvoiceNumber', defaultMessage: '销售发票号' })}
          width="md"
        />
        <ProFormText
          name="invoiceAmount"
          label={intl.formatMessage({ id: 'pages.searchmro.invoiceAmount', defaultMessage: '开票金额' })}
          width="md"
          // fieldProps={{
          //   // Use InputNumber to handle number input
          //   addonBefore: intl.formatMessage({
          //     id: 'pages.searchmro.invoiceAmount',
          //     defaultMessage: '¥', // Example currency symbol
          //   }),
          //   parser: (value) => value.replace(/^\D+/g, ''), // Remove non-numeric characters
          //   formatter: (value) => {
          //     if (!value) return '';
          //     return `¥ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`; // Format as currency
          //   },
          // }}
        />
      </StepsForm.StepForm>

      {/* 第十一组字段 */}
      <StepsForm.StepForm
        initialValues={{
          receivablesDate: props.values.receivablesDate,
          isPaymentReceived: isPaymentReceiveds,
          paymentReceivedAmount: props.values.paymentReceivedAmount,
          adjustmentNote: props.values.adjustmentNote,
          saleNote: props.values.saleNote,
        }}
        title={intl.formatMessage({
          id: 'pages.searchmro.updateForm.basicInfo',
          defaultMessage: '基本信息',
        })}
      >
        <ProFormDatePicker
          name="receivablesDate"
          label={intl.formatMessage({ id: 'pages.searchmro.receivablesDate', defaultMessage: '应收账款时间' })}
          width="md"
        />
        <ProFormSelect
          name="isPaymentReceived"
          label={intl.formatMessage({ id: 'pages.searchmro.isPaymentReceived', defaultMessage: '是否回款' })}
          width="md"
          valueEnum={{
            true: '是',
            false: '否',
          }}
        />
        <ProFormText
          name="paymentReceivedAmount"
          label={intl.formatMessage({ id: 'pages.searchmro.paymentReceivedAmount', defaultMessage: '回款金额' })}
          width="md"
        />
        <ProFormTextArea
          name="adjustmentNote"
          label={intl.formatMessage({ id: 'pages.searchmro.adjustmentNote', defaultMessage: '红账情况说明' })}
          width="md"
        />
        <ProFormTextArea
          name="saleNote"
          label={intl.formatMessage({ id: 'pages.searchmro.saleNote', defaultMessage: '销售备注' })}
          width="md"
        />
      </StepsForm.StepForm>
    </StepsForm>

  );
};

export default UpdateForm;
