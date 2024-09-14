import { fetchSuppliers,fileUpload,fetchGoodsCategory } from '@/services/ant-design-pro/api';
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
import { UploadOutlined } from '@ant-design/icons';

export type FormValueType = {
  id?: string;
    code?: string;
    type?: string;
    goods?: string;
    deliveryNo?: string;
    deliveryNoRow?: string;
    invoiceName?: string;
    num?: string;
    purchaseMultiple?: string;
    taxRate?: string;
    priceWithoutTax?: string;
    price?: string;
    amountBeforeDiscount?: string;
    discount?: string;
    totalAmountWithoutTax?: string;
    totalAmount?: string;
    discountName?: string;
    discountType?: string;
    status?: string;
    receiveTime?: string;
    reviewStatus?: string;
    reviewTime?: string;
    returnReceiveTime?: string;
    customer?: string;
    createTime?: string;
    takeTime?: string;
    deliveryTime?: string;
    signatureTime?: string;
    remark?: string;
    commissionRate?: string;
    commission?: string;
    paymentMethod?: string;
    onlinePaymentTransactionNo?: string;
    offlinePaymentBankInfo?: string;
    platformPaymentStatus?: string;
    vmiPaymentStatus?: string;
    isGsudaDelivery?: string;
    shippingWarehouseType?: string;
    services?: string;
    servicePriceAdjust?: string;
} & Partial<API.OrdersListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.OrdersListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [GoodsCategoryOptions, setGoodsCategoryOptions] = useState([]);
  const [filteredGoodsCategoryOptions, setFilteredGoodsCategoryOptions] = useState([]);
  const [searchGoodsCategoryValue, setSearchGoodsCategoryValue] = useState('');
  // 从 props 中提取数据
  const { supplier, leadTime, moq, remark, picture, goodsCategory } = props.values;

  // 提取 supplier 对象中的 id 和 name
  const supplierId = supplier?.id;
  const supplierName = supplier?.name;
  const goodsCategoryId = goodsCategory?.id;
  const goodsCategoryName = goodsCategory?.name;

  useEffect(() => {
    // Fetch suppliers initially
    const loadSuppliers = async () => {
      const { data, success } = await fetchSuppliers({ current: 1, pageSize: 1000 }); // Adjust pageSize as needed
      if (success) {
        const options = data.map(supplier => ({
          label: supplier.name,
          value: supplier.id, // Ensure this is a number
        }));
        setSupplierOptions(options);
        setFilteredOptions(options); // Initialize filtered options
      }
    };
    loadSuppliers();
  }, []);

  useEffect(() => {
    // Fetch suppliers initially
    const loadGoodsCategory = async () => {
      const { data, success } = await fetchGoodsCategory({ current: 1, pageSize: 10000 }); // Fetch enough data
      if (success) {
        // const options = data.map(goodsCategory => ({
        //   label: goodsCategory.name,
        //   value: goodsCategory.id,
        // }));
        const options = data.map(goodsCategory => ({
          label: `${goodsCategory.parentCategory + '/'}${goodsCategory.category + '/'}${goodsCategory.subCategory + '/'}${goodsCategory.name}`,
          value: goodsCategory.id,
        }));
        setGoodsCategoryOptions(options);
        setFilteredGoodsCategoryOptions(options); // Initialize filtered options
      }
    };
    loadGoodsCategory();
  }, []);

  const uploadProps = {
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const filename = file.name;
          // Call your fileUpload function
        const response = await fileUpload({filename,file});
        if (response && response.data && response.data.fileUrl) {
          onSuccess(response.data.fileUrl, file);
          message.success(`${file.name} file uploaded successfully`);
        } else {
          onError(new Error('Upload failed.'));
          message.error('File upload failed.');
        }
      } catch (error) {
        onError(error);
        message.error('File upload failed.');
      }
    },
    listType: 'picture',
    maxCount: 1,
    showUploadList: {
      showRemoveIcon: false, // Hide remove icon
    },
  };

  useEffect(() => {
    // Filter suppliers based on search value
    const filterOptions = supplierOptions.filter(option =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredOptions(filterOptions);
  }, [searchValue, supplierOptions]);

  useEffect(() => {
    // Filter suppliers based on search value
    const filterGoodsCategoryOptions = GoodsCategoryOptions.filter(option =>
      option.label.toLowerCase().includes(searchGoodsCategoryValue.toLowerCase())
    );
    setFilteredGoodsCategoryOptions(filterGoodsCategoryOptions);
  }, [searchGoodsCategoryValue, GoodsCategoryOptions]);
  
  const intl = useIntl();
  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      // current={currentStep}
      // onChange={(current) => setCurrentStep(current)}
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
              id: 'pages.searchorders.updateForm.editInfo',
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
      <StepsForm.StepForm
          initialValues={{
            id: props.values.id,
            code: props.values.code,
            type: props.values.type,
            goodsCategoryId: goodsCategoryId,
            goodsCategoryName: goodsCategoryName,
            deliveryNo: props.values.deliveryNo,
            deliveryNoRow: props.values.deliveryNoRow,
          }}
          title={intl.formatMessage({
            id: 'pages.searchorders.updateForm.basicConfig',
            defaultMessage: '基本信息',
          })}
        >
        <ProFormText
          name="id"
          hidden={true}
          label={intl.formatMessage({
            id: 'pages.searchorders.id',
            defaultMessage: 'ID',
            
          })}
          width="md"
        />
        <ProFormText
          name="code"
          label={intl.formatMessage({
            id: 'pages.searchorders.code',
            defaultMessage: '订单编号',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchorders.code"
                  defaultMessage="请输入订单编号！"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="type"
          label={intl.formatMessage({
            id: 'pages.searchorders.type',
            defaultMessage: '订单类型',
          })}
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchorders.type"
                  defaultMessage="请输入订单类型！"
                />
              ),
            },
          ]}
        />
        <ProFormSelect
          name='goodsCategoryId'
          label={<FormattedMessage id="pages.searchorders.goods" defaultMessage="goodsCategoryId" />}
          options={GoodsCategoryOptions}
          fieldProps={{
            showSearch: true,
            filterOption: true, // 禁用默认过滤
            onSearch: (value) => setSearchGoodsCategoryValue(value), // 更新搜索值
            // dropdownRender: (menu) => (
            //   <div>
            //     <Input.Search
            //       placeholder="Search goodsCategory"
            //       onSearch={value => setSearchGoodsCategoryValue(value)}
            //       style={{ marginBottom: 8 }}
            //     />
            //     {menu}
            //   </div>
            // ),
          }}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="pages.searchorders.goods" defaultMessage="Please select a goods!" />
              ),
            },
          ]}
      />
      <ProFormText
        name="deliveryNo"
        label={intl.formatMessage({
          id: 'pages.searchorders.deliveryNo',
          defaultMessage: '配送单号',
        })}
        width="md"
        rules={[
          {
            // required: true,
            message: (
              <FormattedMessage
                id="pages.searchorders.deliveryNo"
                defaultMessage="请输入配送单号！"
              />
            ),
          },
        ]}
      />
      <ProFormText
        name="deliveryNoRow"
        label={intl.formatMessage({
          id: 'pages.searchorders.deliveryNoRow',
          defaultMessage: '配送单行',
        })}
        width="md"
        rules={[
          {
            // required: true,
            message: (
              <FormattedMessage
                id="pages.searchorders.deliveryNoRow"
                defaultMessage="请输入配送单行！"
              />
            ),
          },
        ]}
      />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          invoiceName: props.values.invoiceName,
          num: props.values.num,
          purchaseMultiple: props.values.purchaseMultiple,
          taxRate: props.values.taxRate,
          priceWithoutTax: props.values.priceWithoutTax,
        }}
        title={intl.formatMessage({
          id: 'pages.searchorders.updateForm.basicConfig',
          defaultMessage: '基本信息',
        })}
      >
        <ProFormText
          name="invoiceName"
          label={intl.formatMessage({
            id: 'pages.searchorders.invoiceName',
            defaultMessage: '商品开票名称',
          })}
          width="md"
          rules={[
            {
              // required: true,
              message: (
                <FormattedMessage
                  id="pages.searchorders.invoiceName"
                  defaultMessage="请输入商品开票名称！"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="num"
          label={intl.formatMessage({
            id: 'pages.searchorders.num',
            defaultMessage: '数量',
          })}
          width="md"
          // rules={[
          //   {
          //     // required: true,
          //     message: (
          //       <FormattedMessage
          //         id="pages.searchorders.num"
          //         defaultMessage="请输入数量！"
          //       />
          //     ),
          //     type: 'number', // Ensure the value is treated as a number
          //     transform: value => Number(value),
          //   },
          // ]}
        />
        <ProFormText
          name="purchaseMultiple"
          label={intl.formatMessage({
            id: 'pages.searchorders.purchaseMultiple',
            defaultMessage: '采购倍数',
          })}
          width="md"
          rules={[
            {
              // required: true,
              message: (
                <FormattedMessage
                  id="pages.searchorders.purchaseMultiple"
                  defaultMessage="请输入采购倍数！"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="taxRate"
          label={intl.formatMessage({
            id: 'pages.searchorders.taxRate',
            defaultMessage: '税率',
          })}
          width="md"
          rules={[
            {
              // required: true,
              message: (
                <FormattedMessage
                  id="pages.searchorders.taxRate"
                  defaultMessage="请输入税率！"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="priceWithoutTax"
          label={intl.formatMessage({
            id: 'pages.searchorders.priceWithoutTax',
            defaultMessage: '不含税单价',
          })}
          width="md"
          rules={[
            {
              // required: true,
              message: (
                <FormattedMessage
                  id="pages.searchorders.priceWithoutTax"
                  defaultMessage="请输入不含税单价！"
                />
              ),
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          price: props.values.price,
          amountBeforeDiscount: props.values.amountBeforeDiscount,
          totalAmountWithoutTax: props.values.totalAmountWithoutTax,
          totalAmount: props.values.totalAmount,
          discountName: props.values.discountName,
        }}
        title={intl.formatMessage({
          id: 'pages.searchorders.updateForm.basicConfig',
          defaultMessage: '基本信息',
        })}
      >
        <ProFormText
          name="price"
          label={intl.formatMessage({
            id: 'pages.searchorders.price',
            defaultMessage: '单价',
          })}
          width="md"
          fieldProps={{
            // Use InputNumber to handle number input
            addonBefore: intl.formatMessage({
              id: 'pages.searchorders.price',
              defaultMessage: '¥', // Example currency symbol
            }),
            parser: (value) => value.replace(/^\D+/g, ''), // Remove non-numeric characters
            formatter: (value) => {
              if (!value) return '';
              return `¥ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`; // Format as currency
            },
          }}
          rules={[
            {
              // required: true,
              message: (
                <FormattedMessage
                  id="pages.searchorders.price"
                  defaultMessage="请输入单价！"
                />
              ),
              type: 'number', // Ensure the value is treated as a number
              transform: value => Number(value),
            },
          ]}
        />
        <ProFormText
          name="amountBeforeDiscount"
          label={intl.formatMessage({
            id: 'pages.searchorders.amountBeforeDiscount',
            defaultMessage: '折扣前总价',
          })}
          width="md"
          fieldProps={{
            // Use InputNumber to handle number input
            addonBefore: intl.formatMessage({
              id: 'pages.searchorders.amountBeforeDiscount',
              defaultMessage: '¥', // Example currency symbol
            }),
            parser: (value) => value.replace(/^\D+/g, ''), // Remove non-numeric characters
            formatter: (value) => {
              if (!value) return '';
              return `¥ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`; // Format as currency
            },
          }}
          rules={[
            {
              // required: true,
              message: (
                <FormattedMessage
                  id="pages.searchorders.amountBeforeDiscount"
                  defaultMessage="请输入折扣前总价！"
                />
              ),
              type: 'number', // Ensure the value is treated as a number
              transform: value => Number(value),
            },
          ]}
        />
        <ProFormText
          name="discount"
          label={intl.formatMessage({
            id: 'pages.searchorders.discount',
            defaultMessage: '优惠金额',
          })}
          width="md"
          fieldProps={{
            // Use InputNumber to handle number input
            addonBefore: intl.formatMessage({
              id: 'pages.searchorders.discount',
              defaultMessage: '¥', // Example currency symbol
            }),
            parser: (value) => value.replace(/^\D+/g, ''), // Remove non-numeric characters
            formatter: (value) => {
              if (!value) return '';
              return `¥ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`; // Format as currency
            },
          }}
          rules={[
            {
              // required: true,
              message: (
                <FormattedMessage
                  id="pages.searchorders.discount"
                  defaultMessage="请输入优惠金额！"
                />
              ),
              type: 'number', // Ensure the value is treated as a number
              transform: value => Number(value),
            },
          ]}
        />
        <ProFormText
          name="totalAmountWithoutTax"
          label={intl.formatMessage({
            id: 'pages.searchorders.totalAmountWithoutTax',
            defaultMessage: '不含税最终总价',
          })}
          width="md"
          fieldProps={{
            // Use InputNumber to handle number input
            addonBefore: intl.formatMessage({
              id: 'pages.searchorders.totalAmountWithoutTax',
              defaultMessage: '¥', // Example currency symbol
            }),
            parser: (value) => value.replace(/^\D+/g, ''), // Remove non-numeric characters
            formatter: (value) => {
              if (!value) return '';
              return `¥ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`; // Format as currency
            },
          }}
          rules={[
            {
              // required: true,
              message: (
                <FormattedMessage
                  id="pages.searchorders.totalAmountWithoutTax"
                  defaultMessage="请输入不含税最终总价！"
                />
              ),
              type: 'number', // Ensure the value is treated as a number
              transform: value => Number(value),
            },
          ]}
        />
        <ProFormText
          name="totalAmount"
          label={intl.formatMessage({
            id: 'pages.searchorders.totalAmount',
            defaultMessage: '最终总价',
          })}
          width="md"
          fieldProps={{
            // Use InputNumber to handle number input
            addonBefore: intl.formatMessage({
              id: 'pages.searchorders.totalAmount',
              defaultMessage: '¥', // Example currency symbol
            }),
            parser: (value) => value.replace(/^\D+/g, ''), // Remove non-numeric characters
            formatter: (value) => {
              if (!value) return '';
              return `¥ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`; // Format as currency
            },
          }}
          rules={[
            {
              // required: true,
              message: (
                <FormattedMessage
                  id="pages.searchorders.totalAmount"
                  defaultMessage="请输入最终总价！"
                />
              ),
              type: 'number', // Ensure the value is treated as a number
              transform: value => Number(value),
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          discountName: props.values.discountName,
          discountType: props.values.discountType,
          status: props.values.status,
          reviewTime: props.values.reviewTime,
          reviewStatus: props.values.reviewStatus,
        }}
        title={intl.formatMessage({
          id: 'pages.searchorders.updateForm.basicConfig',
          defaultMessage: '基本信息',
        })}
      >
      <ProFormText
        name="discountName"
        label={intl.formatMessage({
          id: 'pages.searchorders.discountName',
          defaultMessage: '促销优惠名称',
        })}
        width="md"
        rules={[
          {
            // required: true,
            message: (
              <FormattedMessage
                id="pages.searchorders.discountName"
                defaultMessage="请输入促销优惠名称！"
              />
            ),
          },
        ]}
      />
      <ProFormText
        name="discountType"
        label={intl.formatMessage({
          id: 'pages.searchorders.discountType',
          defaultMessage: '优惠券类型',
        })}
        width="md"
        rules={[
          {
            // required: true,
            message: (
              <FormattedMessage
                id="pages.searchorders.discountType"
                defaultMessage="请输入优惠券类型！"
              />
            ),
          },
        ]}
      />
      <ProFormText
        name="status"
        label={intl.formatMessage({
          id: 'pages.searchorders.status',
          defaultMessage: '状态',
        })}
        width="md"
        rules={[
          {
            // required: true,
            message: (
              <FormattedMessage
                id="pages.searchorders.status"
                defaultMessage="请输入状态！"
              />
            ),
          },
        ]}
      />
      <ProFormDatePicker
        name="reviewTime"
        width="md"
        label={intl.formatMessage({
          id: 'pages.searchorders.reviewTime',
          defaultMessage: '复核时间',
        })}
        // rules={[
        //   {
        //     message: (
        //       <FormattedMessage
        //         id="pages.searchorders.reviewTime"
        //         defaultMessage="请选择复核时间！"
        //       />
        //     ),
        //   },
        // ]}
      />
      <ProFormText
        name="reviewStatus"
        label={intl.formatMessage({
          id: 'pages.searchorders.reviewStatus',
          defaultMessage: '复核状态',
        })}
        width="md"
        rules={[
          {
            // required: true,
            message: (
              <FormattedMessage
                id="pages.searchorders.reviewStatus"
                defaultMessage="请输入复核状态！"
              />
            ),
          },
        ]}
      />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          receiveTime: props.values.receiveTime,
          returnReceiveTime: props.values.returnReceiveTime,
          customer: props.values.customer,
          createTime: props.values.createTime,
          takeTime: props.values.takeTime,
        }}
        title={intl.formatMessage({
          id: 'pages.searchorders.updateForm.basicConfig',
          defaultMessage: '基本信息',
        })}
      >
      <ProFormDatePicker
        name="receiveTime"
        width="md"
        label={intl.formatMessage({
          id: 'pages.searchorders.receiveTime',
          defaultMessage: '收货时间',
        })}
        // rules={[
        //   {
        //     message: (
        //       <FormattedMessage
        //         id="pages.searchorders.receiveTime"
        //         defaultMessage="请选择收货时间！"
        //       />
        //     ),
        //   },
        // ]}
      />
      <ProFormDatePicker
        name="returnReceiveTime"
        width="md"
        label={intl.formatMessage({
          id: 'pages.searchorders.returnReceiveTime',
          defaultMessage: '退货收货时间',
        })}
        // rules={[
        //   {
        //     message: (
        //       <FormattedMessage
        //         id="pages.searchorders.returnReceiveTime"
        //         defaultMessage="请选择退货收货时间！"
        //       />
        //     ),
        //   },
        // ]}
      />
      <ProFormText
        name="customer"
        label={intl.formatMessage({
          id: 'pages.searchorders.customer',
          defaultMessage: '客户',
        })}
        width="md"
        rules={[
          {
            // required: true,
            message: (
              <FormattedMessage
                id="pages.searchorders.customer"
                defaultMessage="请输入客户！"
              />
            ),
          },
        ]}
      />
      <ProFormDatePicker
        name="createTime"
        width="md"
        label={intl.formatMessage({
          id: 'pages.searchorders.createTime',
          defaultMessage: '订单创建时间',
        })}
        // rules={[
        //   {
        //     message: (
        //       <FormattedMessage
        //         id="pages.searchorders.createTime"
        //         defaultMessage="请选择订单创建时间！"
        //       />
        //     ),
        //   },
        // ]}
      />
      <ProFormDatePicker
        name="takeTime"
        width="md"
        label={intl.formatMessage({
          id: 'pages.searchorders.takeTime',
          defaultMessage: '接单时间',
        })}
        // rules={[
        //   {
        //     message: (
        //       <FormattedMessage
        //         id="pages.searchorders.takeTime"
        //         defaultMessage="请选择接单时间！"
        //       />
        //     ),
        //   },
        // ]}
      />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          deliveryTime: props.values.deliveryTime,
          signatureTime: props.values.signatureTime,
          commissionRate: props.values.commissionRate,
          commission: props.values.commission,
          paymentMethod: props.values.paymentMethod,
        }}
        title={intl.formatMessage({
          id: 'pages.searchorders.updateForm.basicConfig',
          defaultMessage: '基本信息',
        })}
      >
      <ProFormDatePicker
        name="deliveryTime"
        width="md"
        label={intl.formatMessage({
          id: 'pages.searchorders.deliveryTime',
          defaultMessage: '发货时间',
        })}
        // rules={[
        //   {
        //     message: (
        //       <FormattedMessage
        //         id="pages.searchorders.deliveryTime"
        //         defaultMessage="请选择发货时间！"
        //       />
        //     ),
        //   },
        // ]}
      />
      <ProFormDatePicker
        name="signatureTime"
        width="md"
        label={intl.formatMessage({
          id: 'pages.searchorders.signatureTime',
          defaultMessage: '签收时间',
        })}
        // rules={[
        //   {
        //     message: (
        //       <FormattedMessage
        //         id="pages.searchorders.signatureTime"
        //         defaultMessage="请选择签收时间！"
        //       />
        //     ),
        //   },
        // ]}
      />
      <ProFormText
        name="commissionRate"
        label={intl.formatMessage({
          id: 'pages.searchorders.commissionRate',
          defaultMessage: '佣金率',
        })}
        width="md"
        rules={[
          {
            // required: true,
            message: (
              <FormattedMessage
                id="pages.searchorders.commissionRate"
                defaultMessage="请输入佣金率！"
              />
            ),
          },
        ]}
      />
      <ProFormText
        name="commission"
        label={intl.formatMessage({
          id: 'pages.searchorders.commission',
          defaultMessage: '佣金',
        })}
        width="md"
        rules={[
          {
            // required: true,
            message: (
              <FormattedMessage
                id="pages.searchorders.commission"
                defaultMessage="请输入佣金！"
              />
            ),
          },
        ]}
      />
      <ProFormText
        name="paymentMethod"
        label={intl.formatMessage({
          id: 'pages.searchorders.paymentMethod',
          defaultMessage: '支付方式',
        })}
        width="md"
        rules={[
          {
            // required: true,
            message: (
              <FormattedMessage
                id="pages.searchorders.paymentMethod"
                defaultMessage="请输入支付方式！"
              />
            ),
          },
        ]}
      />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          onlinePaymentTransactionNo: props.values.onlinePaymentTransactionNo,
          offlinePaymentBankInfo: props.values.offlinePaymentBankInfo,
          platformPaymentStatus: props.values.platformPaymentStatus,
          vmiPaymentStatus: props.values.vmiPaymentStatus,
          isGsudaDelivery: props.values.isGsudaDelivery,
        }}
        title={intl.formatMessage({
          id: 'pages.searchorders.updateForm.basicConfig',
          defaultMessage: '基本信息',
        })}
      >
      <ProFormText
        name="onlinePaymentTransactionNo"
        label={intl.formatMessage({
          id: 'pages.searchorders.onlinePaymentTransactionNo',
          defaultMessage: '在线支付银行流水号',
        })}
        width="md"
        rules={[
          {
            // required: true,
            message: (
              <FormattedMessage
                id="pages.searchorders.onlinePaymentTransactionNo"
                defaultMessage="请输入在线支付银行流水号！"
              />
            ),
          },
        ]}
      />
      <ProFormText
        name="offlinePaymentBankInfo"
        label={intl.formatMessage({
          id: 'pages.searchorders.offlinePaymentBankInfo',
          defaultMessage: '线下支付付款银行信息',
        })}
        width="md"
        rules={[
          {
            // required: true,
            message: (
              <FormattedMessage
                id="pages.searchorders.offlinePaymentBankInfo"
                defaultMessage="请输入线下支付付款银行信息！"
              />
            ),
          },
        ]}
      />
      <ProFormText
        name="platformPaymentStatus"
        label={intl.formatMessage({
          id: 'pages.searchorders.platformPaymentStatus',
          defaultMessage: '平台付款状态',
        })}
        width="md"
        rules={[
          {
            // required: true,
            message: (
              <FormattedMessage
                id="pages.searchorders.platformPaymentStatus"
                defaultMessage="请输入平台付款状态！"
              />
            ),
          },
        ]}
      />
      <ProFormText
        name="vmiPaymentStatus"
        label={intl.formatMessage({
          id: 'pages.searchorders.vmiPaymentStatus',
          defaultMessage: 'VMI付款状态',
        })}
        width="md"
        rules={[
          {
            // required: true,
            message: (
              <FormattedMessage
                id="pages.searchorders.vmiPaymentStatus"
                defaultMessage="请输入VMI付款状态！"
              />
            ),
          },
        ]}
      />
      <ProFormText
        name="isGsudaDelivery"
        label={intl.formatMessage({
          id: 'pages.searchorders.isGsudaDelivery',
          defaultMessage: 'G速达配送',
        })}
        width="md"
        rules={[
          {
            // required: true,
            message: (
              <FormattedMessage
                id="pages.searchorders.isGsudaDelivery"
                defaultMessage="请输入G速达配送！"
              />
            ),
          },
        ]}
      />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          shippingWarehouseType: props.values.shippingWarehouseType,
          services: props.values.services,
          servicePriceAdjust: props.values.servicePriceAdjust,
          remark: props.values.remark,
        }}
        title={intl.formatMessage({
          id: 'pages.searchorders.updateForm.basicConfig',
          defaultMessage: '基本信息',
        })}
      >
      <ProFormText
        name="shippingWarehouseType"
        label={intl.formatMessage({
          id: 'pages.searchorders.shippingWarehouseType',
          defaultMessage: '配送单仓库类型',
        })}
        width="md"
        rules={[
          {
            // required: true,
            message: (
              <FormattedMessage
                id="pages.searchorders.shippingWarehouseType"
                defaultMessage="请输入配送单仓库类型！"
              />
            ),
          },
        ]}
      />
      <ProFormText
        name="services"
        label={intl.formatMessage({
          id: 'pages.searchorders.services',
          defaultMessage: '所选服务',
        })}
        width="md"
        rules={[
          {
            // required: true,
            message: (
              <FormattedMessage
                id="pages.searchorders.services"
                defaultMessage="请输入所选服务！"
              />
            ),
          },
        ]}
      />
      <ProFormText
        name="servicePriceAdjust"
        label={intl.formatMessage({
          id: 'pages.searchorders.servicePriceAdjust',
          defaultMessage: '服务项单价调整',
        })}
        width="md"
        rules={[
          {
            // required: true,
            message: (
              <FormattedMessage
                id="pages.searchorders.servicePriceAdjust"
                defaultMessage="请输入服务项单价调整！"
              />
            ),
          },
        ]}
      />
      <ProFormTextArea
        name="remark"
        width="md"
        label={intl.formatMessage({
          id: 'pages.searchorders.remark',
          defaultMessage: '备注',
        })}
        // placeholder={intl.formatMessage({
        //   id: 'pages.searchgoods.remark',
        //   defaultMessage: '请输入备注！',
        // })}
        rules={[
          {
            // required: true,
            message: (
              <FormattedMessage
                id="pages.searchorders.remark"
                defaultMessage="请输入备注！"
              />
            ),
            // min: 5,
          },
        ]}
      />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;
