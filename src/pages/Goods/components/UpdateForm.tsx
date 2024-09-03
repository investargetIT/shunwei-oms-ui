  import { fetchSuppliers } from '@/services/ant-design-pro/api';
  import {
    ProFormDateTimePicker,
    ProFormDatePicker,
    DatePicker,
    ProFormRadio,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    StepsForm,
  } from '@ant-design/pro-components';
  import { FormattedMessage, useIntl } from '@umijs/max';
  import { Modal,Input } from 'antd';
  import React, {useEffect, useState } from 'react';
  
  export type FormValueType = {
    id?: string;
    internalCode?: string;
    externalCode?: string;
    name?: string;
    category?: string;
    picture?: string;
    brand?: string;
    details?: string;
    usageLocation?: string;
    unit?: string;
    boxStandards?: string;
    costPrice?: string;
    sellingPrice?: string;
    grossMargin?: string;
    supplierId?: string;
    leadTime?: string;
    moq?: string;
    remark?: string;
  } & Partial<API.GoodsListItem>;
  
  export type UpdateFormProps = {
    onCancel: (flag?: boolean, formVals?: FormValueType) => void;
    onSubmit: (values: FormValueType) => Promise<void>;
    updateModalOpen: boolean;
    values: Partial<API.GoodsListItem>;
  };
  
  const UpdateForm: React.FC<UpdateFormProps> = (props) => {
    const [supplierOptions, setSupplierOptions] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    // 从 props 中提取数据
    const { supplier, leadTime, moq, remark } = props.values;

    // 提取 supplier 对象中的 id 和 name
    const supplierId = supplier?.id;
    const supplierName = supplier?.name;

    // 初始化表单的默认值
    const initialValues = {
      supplierId: supplierId, // 默认选中的供应商 ID
      supplierName: supplierName, // 默认显示的供应商名称（只读）
      leadTime: leadTime,
      moq: moq,
      remark: remark,
    };
  
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
      // Filter suppliers based on search value
      const filterOptions = supplierOptions.filter(option =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredOptions(filterOptions);
    }, [searchValue, supplierOptions]);
    
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
                id: 'pages.searchgoods.updateForm.editInfo',
                defaultMessage: '编辑信息',
              })}
              open={props.updateModalOpen}
              footer={submitter}
              onCancel={() => {
                props.onCancel();
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
            internalCode: props.values.internalCode,
            externalCode: props.values.externalCode,
            name: props.values.name,
            category: props.values.category,
          }}
          title={intl.formatMessage({
            id: 'pages.searchgoods.updateForm.basicConfig',
            defaultMessage: '基本信息',
          })}
        >
          <ProFormText
            name="id"
            // readonly
            disabled
            hidden={true}
            label={intl.formatMessage({
              id: 'pages.searchgoods.id',
              defaultMessage: 'ID',
              
            })}
            width="md"
          />
          <ProFormText
            name="internalCode"
            // readonly
            disabled
            label={intl.formatMessage({
              id: 'pages.searchgoods.internalCode',
              defaultMessage: '内部编码',
            })}
            width="md"
          />
          <ProFormText
            name="externalCode"
            label={intl.formatMessage({
              id: 'pages.searchgoods.externalCode',
              defaultMessage: '外部编码',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchgoods.externalCode"
                    defaultMessage="请输入外部编码！"
                  />
                ),
              },
            ]}
          />
          <ProFormText
            name="name"
            label={intl.formatMessage({
              id: 'pages.searchgoods.name',
              defaultMessage: '名称',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchgoods.name"
                    defaultMessage="请输入名称！"
                  />
                ),
              },
            ]}
          />
          <ProFormText
            name="category"
            label={intl.formatMessage({
              id: 'pages.searchgoods.category',
              defaultMessage: '产品分类',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchgoods.category"
                    defaultMessage="请输入产品分类！"
                  />
                ),
              },
            ]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          initialValues={{
            picture: props.values.picture,
            brand: props.values.brand,
            details: props.values.details,
            usageLocation: props.values.usageLocation,
          }}
          title={intl.formatMessage({
            id: 'pages.searchgoods.updateForm.basicConfig',
            defaultMessage: '基本信息',
          })}
        >
          
          <ProFormText
            name="picture"
            label={intl.formatMessage({
              id: 'pages.searchgoods.picture',
              defaultMessage: '图片',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchgoods.picture"
                    defaultMessage="请输入图片！"
                  />
                ),
              },
            ]}
          />
          <ProFormText
            name="brand"
            label={intl.formatMessage({
              id: 'pages.searchgoods.brand',
              defaultMessage: '品牌',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchgoods.brand"
                    defaultMessage="请输入品牌！"
                  />
                ),
              },
            ]}
          />
          <ProFormText
            name="details"
            label={intl.formatMessage({
              id: 'pages.searchgoods.details',
              defaultMessage: '型号/规格/容量/颜色）',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchgoods.details"
                    defaultMessage="请输入型号/规格/容量/颜色！"
                  />
                ),
              },
            ]}
          />
          <ProFormText
            name="usageLocation"
            label={intl.formatMessage({
              id: 'pages.searchgoods.usageLocation',
              defaultMessage: '使用位置）',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchgoods.usageLocation"
                    defaultMessage="请输入使用位置！"
                  />
                ),
              },
            ]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          initialValues={{
            unit: props.values.unit,
            boxStandards: props.values.boxStandards,
            costPrice: props.values.costPrice,
            sellingPrice: props.values.sellingPrice,
            grossMargin: props.values.grossMargin,
          }}
          title={intl.formatMessage({
            id: 'pages.searchgoods.updateForm.basicConfig',
            defaultMessage: '基本信息',
          })}
        >
          <ProFormText
            name="unit"
            label={intl.formatMessage({
              id: 'pages.searchgoods.unit',
              defaultMessage: '单位',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchgoods.unit"
                    defaultMessage="请输入单位！"
                  />
                ),
              },
            ]}
          />
          <ProFormText
            name="boxStandards"
            label={intl.formatMessage({
              id: 'pages.searchgoods.boxStandards',
              defaultMessage: '箱规',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchgoods.boxStandards"
                    defaultMessage="请输入箱规！"
                  />
                ),
              },
            ]}
          />
          <ProFormText
            name="costPrice"
            label={intl.formatMessage({
              id: 'pages.searchgoods.costPrice',
              defaultMessage: '成本价',
            })}
            width="md"
            fieldProps={{
              // Use InputNumber to handle number input
              addonBefore: intl.formatMessage({
                id: 'pages.searchgoods.costPrice',
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
                    id="pages.searchgoods.costPrice"
                    defaultMessage="请输入成本价！"
                  />
                ),
                type: 'number', // Ensure the value is treated as a number
                transform: value => Number(value),
              },
            ]}
          />
          <ProFormText
            name="sellingPrice"
            label={intl.formatMessage({
              id: 'pages.searchgoods.sellingPrice',
              defaultMessage: '销售价',
            })}
            width="md"
            fieldProps={{
              // Use InputNumber to handle number input
              addonBefore: intl.formatMessage({
                id: 'pages.searchgoods.sellingPrice',
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
                    id="pages.searchgoods.sellingPrice"
                    defaultMessage="请输入销售价！"
                  />
                ),
                type: 'number', // Ensure the value is treated as a number
                transform: value => Number(value),
              },
            ]}
          />
          <ProFormText
            name="grossMargin"
            label={intl.formatMessage({
              id: 'pages.searchgoods.grossMargin',
              defaultMessage: '毛利率',
            })}
            width="md"
            fieldProps={{
              // Use InputNumber to handle number input
              addonBefore: intl.formatMessage({
                id: 'pages.searchgoods.grossMargin',
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
                    id="pages.searchgoods.grossMargin"
                    defaultMessage="请输入毛利率！"
                  />
                ),
                type: 'number', // Ensure the value is treated as a number
                transform: value => Number(value),
              },
            ]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          initialValues={initialValues}
          title={intl.formatMessage({
            id: 'pages.searchgoods.updateForm.basicConfig',
            defaultMessage: '基本信息',
          })}
        >
        <ProFormSelect
          name='supplierId'
          label={<FormattedMessage id="pages.searchgoods.supplierId" defaultMessage="Supplier" />}
          options={supplierOptions}
          fieldProps={{
            showSearch: true,
            filterOption: false, // 禁用默认过滤
            onSearch: (value) => setSearchValue(value), // 更新搜索值
            dropdownRender: (menu) => (
              <div>
                <Input.Search
                  placeholder="Search supplier"
                  onSearch={value => setSearchValue(value)}
                  style={{ marginBottom: 8 }}
                />
                {menu}
              </div>
            ),
          }}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage id="pages.searchgoods.supplierId" defaultMessage="Please select a supplier!" />
              ),
            },
          ]}
        />
        <ProFormText
          name="leadTime"
          label={intl.formatMessage({
            id: 'pages.searchgoods.leadTime',
            defaultMessage: '供货周期',
          })}
          width="md"
          rules={[
            {
              // required: true,
              message: (
                <FormattedMessage
                  id="pages.searchgoods.leadTime"
                  defaultMessage="请输入供货周期！"
                />
              ),
            },
          ]}
        />
        <ProFormText
          name="moq"
          label={intl.formatMessage({
            id: 'pages.searchgoods.moq',
            defaultMessage: '起订量',
          })}
          width="md"
          // rules={[
          //   {
          //     // required: true,
          //     message: (
          //       <FormattedMessage
          //         id="pages.searchgoods.moq"
          //         defaultMessage="请输入起订量！"
          //       />
          //     ),
          //   },
          // ]}
        />
          <ProFormTextArea
            name="remark"
            width="md"
            label={intl.formatMessage({
              id: 'pages.searchgoods.remark',
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
                    id="pages.searchgoods.remark"
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
  