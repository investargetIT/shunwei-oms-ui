import { addGoods, removeGoods, goods, updateGoods, fetchSuppliers, fileUpload, fetchGoodsCategory } from '@/services/ant-design-pro/api';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
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

const Orders: React.FC = () => {
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [GoodsCategoryOptions, setGoodsCategoryOptions] = useState([]);
  const [filteredGoodsCategoryOptions, setFilteredGoodsCategoryOptions] = useState([]);
  const [searchGoodsCategoryValue, setSearchGoodsCategoryValue] = useState('');

  useEffect(() => {
    // Fetch suppliers initially
    const loadSuppliers = async () => {
      const { data, success } = await fetchSuppliers({ current: 1, pageSize: 10000 }); // Fetch enough data
      if (success) {
        const options = data.map(supplier => ({
          label: supplier.name,
          value: supplier.id,
        }));
        setSupplierOptions(options);
        setFilteredOptions(options); // Initialize filtered options
      }
    };
    loadSuppliers();
  }, []);

  useEffect(() => {
    // Fetch GoodsCategory initially
    const loadGoodsCategory = async () => {
      const { data, success } = await fetchGoodsCategory({ current: 1, pageSize: 10000 }); // Fetch enough data
      if (success) {
        // const options = data.map(goodsCategory => ({
        //   label: goodsCategory.parentCategory/goodsCategory.name,
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
            // Create FormData to send file and additional info if needed
            // const fileNameWithExt = file.name;
            // const fileNameWithoutExt = fileNameWithExt.substring(0, fileNameWithExt.lastIndexOf('.')) || fileNameWithExt;
            // const filename = fileNameWithoutExt;
            const filename = file.name;
            // Call your fileUpload function
            const response = await fileUpload({filename,file});
            // console.log(response.data.fileUrl)
            if (response.status) {
                onSuccess(response.data.fileUrl, file); // Notify upload success
                message.success(`${file.name} file uploaded successfully`);
            } else {
                onError(new Error('Upload failed.'));
                message.error('File upload failed.');
            }
        } catch (error) {
            onError(error); // Notify upload failure
            message.error('File upload failed.');
        }
    },
    listType: 'picture',
    maxCount: 1,
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
  const [currentRow, setCurrentRow] = useState<API.GoodsListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.GoodsListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.GoodsListItem>[] = [
    {
      title: <FormattedMessage id="pages.searchorders.code" defaultMessage="Description" />,
      dataIndex: 'code',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchorders.type" defaultMessage="Description" />,
      dataIndex: 'type',
      valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchorders.goods" defaultMessage="Description" />,
        dataIndex: 'goods',
        valueType: 'textarea',
    },
    // {
    //   title: '大类',
    //   dataIndex: ['goodsCategory', 'parentCategory'],
    // },
    // {
    //   title: '中类',
    //   dataIndex: ['goodsCategory', 'category'],
    // },
    // {
    //   title: '小类',
    //   dataIndex: ['goodsCategory', 'subCategory'],
    // },
    // {
    //   title: '品类',
    //   dataIndex: ['goodsCategory', 'name'],
    // },
    // {
    //   title: <FormattedMessage id="pages.searchorders.goodsCategory" defaultMessage="Description" />,
    //   dataIndex: 'goodsCategory',
    //   valueType: 'textarea',
    // },
    // {
    //   title: <FormattedMessage id="pages.searchorders.supplier" defaultMessage="Description" />,
    //   dataIndex: 'supplier',
    //   valueType: 'textarea',
    // },
    {
      title: <FormattedMessage id="pages.searchorders.deliveryNo" defaultMessage="Description" />,
      dataIndex: 'deliveryNo',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchorders.deliveryNoRow" defaultMessage="Description" />,
      dataIndex: 'deliveryNoRow',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchorders.invoiceName" defaultMessage="Description" />,
      dataIndex: 'invoiceName',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchorders.num" defaultMessage="Description" />,
      dataIndex: 'num',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchorders.purchaseMultiple" defaultMessage="Description" />,
      dataIndex: 'purchaseMultiple',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchorders.taxRate" defaultMessage="Description" />,
      dataIndex: 'taxRate',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchorders.priceWithoutTax" defaultMessage="Description" />,
      dataIndex: 'priceWithoutTax',
      valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchorders.price" defaultMessage="Description" />,
        dataIndex: 'price',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchorders.amountBeforeDiscount" defaultMessage="Description" />,
        dataIndex: 'amountBeforeDiscount',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchorders.discount" defaultMessage="Description" />,
        dataIndex: 'discount',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchorders.totalAmountWithoutTax" defaultMessage="Description" />,
        dataIndex: 'totalAmountWithoutTax',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchorders.totalAmount" defaultMessage="Description" />,
        dataIndex: 'totalAmount',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchorders.discountName" defaultMessage="Description" />,
        dataIndex: 'discountName',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchorders.discountType" defaultMessage="Description" />,
        dataIndex: 'discountType',
        valueType: 'textarea',
    },
    // {
    //     title: <FormattedMessage id="pages.searchorders.supplierId" defaultMessage="Description" />,
    //     dataIndex: 'supplier',
    //     render: (supplier) => supplier?.name || 'No name',
    // },
    {
        title: <FormattedMessage id="pages.searchorders.status" defaultMessage="Description" />,
        dataIndex: 'status',
        // sorter: true,
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchorders.reviewTime" defaultMessage="Description" />,
        dataIndex: 'reviewTime',
        sorter: true,
        valueType: 'dateTime',
    },
    {
        title: <FormattedMessage id="pages.searchorders.reviewStatus" defaultMessage="Description" />,
        dataIndex: 'reviewStatus',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchorders.receiveTime" defaultMessage="Description" />,
        dataIndex: 'receiveTime',
        sorter: true,
        valueType: 'dateTime',
    },
    {
        title: <FormattedMessage id="pages.searchorders.returnReceiveTime" defaultMessage="Description" />,
        dataIndex: 'returnReceiveTime',
        sorter: true,
        valueType: 'dateTime',
    },
    {
        title: <FormattedMessage id="pages.searchorders.customer" defaultMessage="Description" />,
        dataIndex: 'customer',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchorders.createTime" defaultMessage="Description" />,
        dataIndex: 'createTime',
        sorter: true,
        valueType: 'dateTime',
    },
    {
        title: <FormattedMessage id="pages.searchorders.takeTime" defaultMessage="Description" />,
        dataIndex: 'takeTime',
        sorter: true,
        valueType: 'dateTime',
    },
    {
        title: <FormattedMessage id="pages.searchorders.deliveryTime" defaultMessage="Description" />,
        dataIndex: 'deliveryTime',
        sorter: true,
        valueType: 'dateTime',
    },
    {
        title: <FormattedMessage id="pages.searchorders.signatureTime" defaultMessage="Description" />,
        dataIndex: 'signatureTime',
        sorter: true,
        valueType: 'dateTime',
    },
    {
        title: <FormattedMessage id="pages.searchorders.commissionRate" defaultMessage="Description" />,
        dataIndex: 'commissionRate',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchorders.commission" defaultMessage="Description" />,
        dataIndex: 'commission',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchorders.paymentMethod" defaultMessage="Description" />,
        dataIndex: 'paymentMethod',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchorders.onlinePaymentTransactionNo" defaultMessage="Description" />,
        dataIndex: 'onlinePaymentTransactionNo',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchorders.offlinePaymentBankInfo" defaultMessage="Description" />,
        dataIndex: 'offlinePaymentBankInfo',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchorders.platformPaymentStatus" defaultMessage="Description" />,
        dataIndex: 'platformPaymentStatus',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchorders.vmiPaymentStatus" defaultMessage="Description" />,
        dataIndex: 'vmiPaymentStatus',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchorders.isGsudaDelivery" defaultMessage="Description" />,
        dataIndex: 'isGsudaDelivery',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchorders.shippingWarehouseType" defaultMessage="Description" />,
        dataIndex: 'shippingWarehouseType',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchorders.services" defaultMessage="Description" />,
        dataIndex: 'services',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchorders.servicePriceAdjust" defaultMessage="Description" />,
        dataIndex: 'servicePriceAdjust',
        valueType: 'textarea',
    },
    {
        title: <FormattedMessage id="pages.searchorders.remark" defaultMessage="Description" />,
        dataIndex: 'remark',
        valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.searchorders.operation" defaultMessage="Operating" />,
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
          <FormattedMessage id="pages.searchorders.operation.edit" defaultMessage="edit" />
        </a>,
        !showDetail && ( // Check if detail view is not open
            <a
              key="details"
              onClick={() => {
                setCurrentRow(record);   // Sets the current row to show details
                setShowDetail(true);     // Displays the details view
              }}
            >
              <FormattedMessage id="pages.searchorders.operation.details" defaultMessage="details" />
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
  const handleAdd = async (fields: API.GoodsListItem) => {
    const hide = message.loading('正在添加');
    // Extract the URL from the picture field
    const picture = fields.picture[0].response; // URL of the uploaded picture
    // Use the URL as needed, e.g., save it to the database or display it
    fields.picture = picture;
    try {
      await addGoods({ ...fields });
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
      id: fields.id,
      code: fields.code,
      type: fields.type,
      goods: fields.goods,
      deliveryNo: fields.deliveryNo,
      deliveryNoRow: fields.deliveryNoRow,
      invoiceName: fields.invoiceName,
      num: fields.num,
      purchaseMultiple: fields.purchaseMultiple,
      taxRate: fields.taxRate,
      priceWithoutTax: fields.priceWithoutTax,
      price: fields.price,
      amountBeforeDiscount: fields.amountBeforeDiscount,
      discount: fields.discount,
      totalAmountWithoutTax: fields.totalAmountWithoutTax,
      totalAmount: fields.totalAmount,
      discountName: fields.discountName,
      discountType: fields.discountType,
      status: fields.status,
      receiveTime: fields.receiveTime,
      reviewStatus: fields.reviewStatus,
      reviewTime: fields.reviewTime,
      returnReceiveTime: fields.returnReceiveTime,
      customer: fields.customer,
      createTime: fields.createTime,
      takeTime: fields.takeTime,
      deliveryTime: fields.deliveryTime,
      signatureTime: fields.signatureTime,
      commissionRate: fields.commissionRate,
      commission: fields.commission,
      paymentMethod: fields.paymentMethod,
      onlinePaymentTransactionNo: fields.onlinePaymentTransactionNo,
      offlinePaymentBankInfo: fields.offlinePaymentBankInfo,
      platformPaymentStatus: fields.platformPaymentStatus,
      vmiPaymentStatus: fields.vmiPaymentStatus,
      isGsudaDelivery: fields.isGsudaDelivery,
      shippingWarehouseType: fields.shippingWarehouseType,
      services: fields.services,
      servicePriceAdjust: fields.servicePriceAdjust,
      remark: fields.remark,
    }
    try {
      await updateGoods(id, values);
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
  const handleRemove = async (selectedRows: API.GoodsListItem[]) => {
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
          await removeGoods(ids);
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
      <ProTable<API.GoodsListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchorders.title',
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
            <PlusOutlined /> <FormattedMessage id="pages.searchorders.new" defaultMessage="New" />
          </Button>,
        ]}
        request={goods}
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
              <FormattedMessage id="pages.searchorders.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchorders.item" defaultMessage="项" />
              {/* &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                <FormattedMessage id="pages.searchorders.tenThousand" defaultMessage="万" />
              </span> */}
            </div>
          }
        >
          <Button onClick={() => handleRemove(selectedRowsState)}>
            <FormattedMessage
              id="pages.searchorders.batchDeletion"
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
            id: 'pages.searchorders.createForm.newInfo',
            defaultMessage: '新建信息',
            })}
            width="400px"
            open={createModalOpen}
            onOpenChange={handleModalOpen}
            onFinish={async (value) => {
            const success = await handleAdd(value as API.GoodsListItem);
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
              name="goods"
              label={<FormattedMessage id="pages.searchorders.goods" defaultMessage="goods" />}
              fieldProps={{
              showSearch: true,
              filterOption: false, // Disable default filtering
              onSearch: (value) => setSearchGoodsCategoryValue(value), // Update search value
              options: filteredGoodsCategoryOptions, // Use filtered options
              }}
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
            rules={[
                {
                // required: true,
                message: (
                    <FormattedMessage
                    id="pages.searchorders.num"
                    defaultMessage="请输入数量！"
                    />
                ),
                },
            ]}
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
            <ProFormText
            name="price"
            label={intl.formatMessage({
                id: 'pages.searchorders.price',
                defaultMessage: '单价',
            })}
            width="md"
            rules={[
                {
                // required: true,
                message: (
                    <FormattedMessage
                    id="pages.searchorders.price"
                    defaultMessage="请输入单价！"
                    />
                ),
                },
            ]}
            />
            <ProFormText
            name="amountBeforeDiscount"
            width="md"
            label={intl.formatMessage({
                id: 'pages.searchorders.amountBeforeDiscount',
                defaultMessage: '折扣前总价',
            })}
            rules={[
                {
                message: (
                    <FormattedMessage
                    id="pages.searchorders.amountBeforeDiscount"
                    defaultMessage="请选择折扣前总价！"
                    />
                ),
                },
            ]}
            />
            <ProFormText
            name="discount"
            width="md"
            label={intl.formatMessage({
                id: 'pages.searchorders.discount',
                defaultMessage: '优惠金额',
            })}
            rules={[
                {
                message: (
                    <FormattedMessage
                    id="pages.searchorders.discount"
                    defaultMessage="请选择优惠金额！"
                    />
                ),
                },
            ]}
            />
            <ProFormText
            name="totalAmountWithoutTax"
            width="md"
            label={intl.formatMessage({
                id: 'pages.searchorders.totalAmountWithoutTax',
                defaultMessage: '不含税最终总价',
            })}
            rules={[
                {
                message: (
                    <FormattedMessage
                    id="pages.searchorders.totalAmountWithoutTax"
                    defaultMessage="请选择不含税最终总价！"
                    />
                ),
                },
            ]}
            />
            <ProFormText
            name="totalAmount"
            width="md"
            label={intl.formatMessage({
                id: 'pages.searchorders.totalAmount',
                defaultMessage: '最终总价',
            })}
            rules={[
                {
                message: (
                    <FormattedMessage
                    id="pages.searchorders.totalAmount"
                    defaultMessage="请选择最终总价！"
                    />
                ),
                },
            ]}
            />
            <ProFormText
            name="discountName"
            width="md"
            label={intl.formatMessage({
                id: 'pages.searchorders.discountName',
                defaultMessage: '促销优惠名称',
            })}
            rules={[
                {
                message: (
                    <FormattedMessage
                    id="pages.searchorders.discountName"
                    defaultMessage="请选择促销优惠名称！"
                    />
                ),
                },
            ]}
            />
            <ProFormText
            name="discountType"
            width="md"
            label={intl.formatMessage({
                id: 'pages.searchorders.discountType',
                defaultMessage: '优惠券类型',
            })}
            rules={[
                {
                message: (
                    <FormattedMessage
                    id="pages.searchorders.discountType"
                    defaultMessage="请选择优惠券类型！"
                    />
                ),
                },
            ]}
            />
            <ProFormText
            name="status"
            width="md"
            label={intl.formatMessage({
                id: 'pages.searchorders.status',
                defaultMessage: '状态',
            })}
            rules={[
                {
                message: (
                    <FormattedMessage
                    id="pages.searchorders.status"
                    defaultMessage="请选择状态！"
                    />
                ),
                },
            ]}
            />
            <ProFormDatePicker
                name="reviewTime"
                width="md"
                fieldProps={{
                    showTime: { format: 'HH:mm:ss' },
                    format: 'YYYY-MM-DD HH:mm:ss',
                }}
                label={intl.formatMessage({
                id: 'pages.searchorders.reviewTime',
                defaultMessage: '复核时间',
                })}
                // rules={[
                //   {
                //     message: (
                //       <FormattedMessage
                //         id="pages.searchorders.receiveTime"
                //         defaultMessage="请选择复核时间！"
                //       />
                //     ),
                //   },
                // ]}
            />
            <ProFormText
            name="reviewStatus"
            width="md"
            label={intl.formatMessage({
                id: 'pages.searchorders.reviewStatus',
                defaultMessage: '复核状态',
            })}
            rules={[
                {
                message: (
                    <FormattedMessage
                    id="pages.searchorders.reviewStatus"
                    defaultMessage="请选择复核状态！"
                    />
                ),
                },
            ]}
            />
            <ProFormDatePicker
                name="receiveTime"
                width="md"
                fieldProps={{
                    showTime: { format: 'HH:mm:ss' },
                    format: 'YYYY-MM-DD HH:mm:ss',
                }}
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
                fieldProps={{
                    showTime: { format: 'HH:mm:ss' },
                    format: 'YYYY-MM-DD HH:mm:ss',
                }}
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
            width="md"
            label={intl.formatMessage({
                id: 'pages.searchorders.customer',
                defaultMessage: '客户',
            })}
            rules={[
                {
                message: (
                    <FormattedMessage
                    id="pages.searchorders.customer"
                    defaultMessage="请选择客户！"
                    />
                ),
                },
            ]}
            />
            <ProFormDatePicker
                name="createTime"
                width="md"
                fieldProps={{
                    showTime: { format: 'HH:mm:ss' },
                    format: 'YYYY-MM-DD HH:mm:ss',
                }}
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
                fieldProps={{
                    showTime: { format: 'HH:mm:ss' },
                    format: 'YYYY-MM-DD HH:mm:ss',
                }}
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
            <ProFormDatePicker
                name="deliveryTime"
                width="md"
                fieldProps={{
                    showTime: { format: 'HH:mm:ss' },
                    format: 'YYYY-MM-DD HH:mm:ss',
                }}
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
                fieldProps={{
                    showTime: { format: 'HH:mm:ss' },
                    format: 'YYYY-MM-DD HH:mm:ss',
                }}
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
            width="md"
            label={intl.formatMessage({
                id: 'pages.searchorders.commissionRate',
                defaultMessage: '佣金率',
            })}
            rules={[
                {
                message: (
                    <FormattedMessage
                    id="pages.searchorders.commissionRate"
                    defaultMessage="请选择佣金率！"
                    />
                ),
                },
            ]}
            />
            <ProFormText
            name="commission"
            width="md"
            label={intl.formatMessage({
                id: 'pages.searchorders.commission',
                defaultMessage: '佣金',
            })}
            rules={[
                {
                message: (
                    <FormattedMessage
                    id="pages.searchorders.commission"
                    defaultMessage="请选择佣金！"
                    />
                ),
                },
            ]}
            />
            <ProFormText
            name="paymentMethod"
            width="md"
            label={intl.formatMessage({
                id: 'pages.searchorders.paymentMethod',
                defaultMessage: '支付方式',
            })}
            rules={[
                {
                message: (
                    <FormattedMessage
                    id="pages.searchorders.paymentMethod"
                    defaultMessage="请选择支付方式！"
                    />
                ),
                },
            ]}
            />
            <ProFormText
            name="onlinePaymentTransactionNo"
            width="md"
            label={intl.formatMessage({
                id: 'pages.searchorders.onlinePaymentTransactionNo',
                defaultMessage: '在线支付银行流水号',
            })}
            rules={[
                {
                message: (
                    <FormattedMessage
                    id="pages.searchorders.onlinePaymentTransactionNo"
                    defaultMessage="请选择在线支付银行流水号！"
                    />
                ),
                },
            ]}
            />
            <ProFormText
            name="offlinePaymentBankInfo"
            width="md"
            label={intl.formatMessage({
                id: 'pages.searchorders.offlinePaymentBankInfo',
                defaultMessage: '线下支付付款银行信息',
            })}
            rules={[
                {
                message: (
                    <FormattedMessage
                    id="pages.searchorders.offlinePaymentBankInfo"
                    defaultMessage="请选择线下支付付款银行信息！"
                    />
                ),
                },
            ]}
            />
            <ProFormText
            name="platformPaymentStatus"
            width="md"
            label={intl.formatMessage({
                id: 'pages.searchorders.platformPaymentStatus',
                defaultMessage: '平台付款状态',
            })}
            rules={[
                {
                message: (
                    <FormattedMessage
                    id="pages.searchorders.platformPaymentStatus"
                    defaultMessage="请选择平台付款状态！"
                    />
                ),
                },
            ]}
            />
            <ProFormText
            name="vmiPaymentStatus"
            width="md"
            label={intl.formatMessage({
                id: 'pages.searchorders.vmiPaymentStatus',
                defaultMessage: 'VMI付款状态',
            })}
            rules={[
                {
                message: (
                    <FormattedMessage
                    id="pages.searchorders.vmiPaymentStatus"
                    defaultMessage="请选择VMI付款状态！"
                    />
                ),
                },
            ]}
            />
            <ProFormText
            name="isGsudaDelivery"
            width="md"
            label={intl.formatMessage({
                id: 'pages.searchorders.isGsudaDelivery',
                defaultMessage: 'G速达配送',
            })}
            rules={[
                {
                message: (
                    <FormattedMessage
                    id="pages.searchorders.isGsudaDelivery"
                    defaultMessage="请选择G速达配送！"
                    />
                ),
                },
            ]}
            />
            <ProFormText
            name="shippingWarehouseType"
            width="md"
            label={intl.formatMessage({
                id: 'pages.searchorders.shippingWarehouseType',
                defaultMessage: '配送单仓库类型',
            })}
            rules={[
                {
                message: (
                    <FormattedMessage
                    id="pages.searchorders.shippingWarehouseType"
                    defaultMessage="请选择配送单仓库类型！"
                    />
                ),
                },
            ]}
            />
            <ProFormText
            name="services"
            width="md"
            label={intl.formatMessage({
                id: 'pages.searchorders.services',
                defaultMessage: '所选服务',
            })}
            rules={[
                {
                message: (
                    <FormattedMessage
                    id="pages.searchorders.services"
                    defaultMessage="请选择所选服务！"
                    />
                ),
                },
            ]}
            />
            <ProFormText
            name="servicePriceAdjust"
            width="md"
            label={intl.formatMessage({
                id: 'pages.searchorders.servicePriceAdjust',
                defaultMessage: '服务项单价调整',
            })}
            rules={[
                {
                message: (
                    <FormattedMessage
                    id="pages.searchorders.servicePriceAdjust"
                    defaultMessage="请选择服务项单价调整！"
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
        </ModalForm>
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
            {currentRow?.name && (
            <ProDescriptions<API.GoodsListItem>
                column={2}
                title={currentRow?.name}
                request={async () => ({
                data: currentRow || {},
                })}
                params={{
                id: currentRow?.name,
                }}
                columns={columns as ProDescriptionsItemProps<API.GoodsListItem>[]}
            />
            )}
        </Drawer>
    </PageContainer>
  );
};

export default Orders;
