import { fetchGoodsCategoryAll } from '@/services/ant-design-pro/api';
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
  import { Modal } from 'antd';
  import React, { useRef, useState, useEffect } from 'react';
  
  export type FormValueType = {
    id?: string;
    parentCategory?: string;
    category?: string;
    subCategory?: string;
    name?: string;
    attributes?: string;
    others?: string;
    remark?: string;
  } & Partial<API.GoodsCategoryItem>;
  
  export type UpdateFormProps = {
    onCancel: (flag?: boolean, formVals?: FormValueType) => void;
    onSubmit: (values: FormValueType) => Promise<void>;
    updateModalOpen: boolean;
    values: Partial<API.GoodsCategoryItem>;
  };
  
  const UpdateForm: React.FC<UpdateFormProps> = (props) => {

    const [categoryOptions, setCategoryOptions] = useState([]);
    const [filteredCategoryOptions, setFilteredCategoryOptions] = useState([]);
    const [searchCategoryValue, setSearchCategoryValue] = useState('');

    const [parentCategoryOptions, setParentCategoryOptions] = useState([]);
    const [filteredParentCategoryOptions, setFilteredParentCategoryOptions] = useState([]);
    const [searchParentCategoryValue, setSearchParentCategoryValue] = useState('');

    const [subCategoryOptions, setSubCategoryOptions] = useState([]);
    const [filteredSubCategoryOptions, setFilteredSubCategoryOptions] = useState([]);
    const [searchSubCategoryValue, setSearchSubCategoryValue] = useState('');

    useEffect(() => {
      // Fetch Goods initially
      const loadGoodsCategoryAll = async () => {
        const { data, success } = await fetchGoodsCategoryAll(); // Fetch enough data
        if (success) {
          const categoryoptions = data.category.map((items) => ({
            label: items,
            value: items,
          }));
          const parentCategoryoptions = data.parentCategory.map((items) => ({
            label: items,
            value: items,
          }));
          const subCategoryoptions = data.subCategory.map((items) => ({
            label: items,
            value: items,
          }));
          setCategoryOptions(categoryoptions);
          setFilteredCategoryOptions(categoryoptions); // Initialize filtered options
          setParentCategoryOptions(parentCategoryoptions);
          setFilteredParentCategoryOptions(parentCategoryoptions); // Initialize filtered options
          setSubCategoryOptions(subCategoryoptions);
          setFilteredSubCategoryOptions(subCategoryoptions); // Initialize filtered options
        }
      };
      loadGoodsCategoryAll();
    }, []);

    const handleParentCategorySearch = (value) => {
      setSearchParentCategoryValue(value);
      const filtered = parentCategoryOptions.filter(option =>
        option.label.toLowerCase().includes((value || '').toLowerCase())
      );
      setFilteredParentCategoryOptions(filtered);
    };
  
    const handleCategorySearch = (value) => {
      setSearchCategoryValue(value);
      const filtered = categoryOptions.filter(option =>
        option.label.toLowerCase().includes((value || '').toLowerCase())
      );
      setFilteredCategoryOptions(filtered);
    };
  
    const handleSubCategorySearch = (value) => {
      setSearchSubCategoryValue(value);
      const filtered = subCategoryOptions.filter(option =>
        option.label.toLowerCase().includes((value || '').toLowerCase())
      );
      setFilteredSubCategoryOptions(filtered);
    };

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
                id: 'pages.searchgoodsCategory.updateForm.editInfo',
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
            parentCategory: props.values.parentCategory,
            category: props.values.category,
            subCategory: props.values.subCategory,
            name: props.values.name,
          }}
          title={intl.formatMessage({
            id: 'pages.searchgoodsCategory.updateForm.basicConfig',
            defaultMessage: '基本信息',
          })}
        >
          <ProFormText
            name="id"
            // readonly
            disabled
            hidden={true}
            label={intl.formatMessage({
              id: 'pages.searchgoodsCategory.id',
              defaultMessage: 'ID',
              
            })}
            width="md"
          />
          <ProFormSelect
            name="parentCategory"
            label={<FormattedMessage id="pages.searchgoodsCategory.parentCategory" defaultMessage="parentCategory" />}
            fieldProps={{
              showSearch: true,
              filterOption: false,
              onSearch: handleParentCategorySearch,
              options: [
                ...filteredParentCategoryOptions,
                { value: searchParentCategoryValue, label: searchParentCategoryValue },
              ],
              onChange: (value) => {
                setSearchParentCategoryValue(value);
              },
            }}
            rules={[{
              required: true,
              message: (
                <FormattedMessage
                    id="pages.searchgoodsCategory.parentCategory"
                    defaultMessage="请选择大类！"
                />
              )
            }]}
          />
          <ProFormSelect
            name="category"
            label={<FormattedMessage id="pages.searchgoodsCategory.category" defaultMessage="category" />}
            fieldProps={{
              showSearch: true,
              filterOption: false,
              onSearch: handleCategorySearch,
              options: [
                ...filteredCategoryOptions,
                { value: searchCategoryValue, label: searchCategoryValue },
              ],
              onChange: (value) => {
                setSearchCategoryValue(value);
              },
            }}
            rules={[{
              required: true,
              message: (
                <FormattedMessage
                    id="pages.searchgoodsCategory.category"
                    defaultMessage="请选择中类！"
                />
              )
            }]}
          />
          <ProFormSelect
            name="subCategory"
            label={<FormattedMessage id="pages.searchgoodsCategory.subCategory" defaultMessage="subCategory" />}
            fieldProps={{
              showSearch: true,
              filterOption: false,
              onSearch: handleSubCategorySearch,
              options: [
                ...filteredSubCategoryOptions,
                { value: searchSubCategoryValue, label: searchSubCategoryValue },
              ],
              onChange: (value) => {
                setSearchSubCategoryValue(value);
              },
            }}
            rules={[{
              required: true,
              message: (
                <FormattedMessage
                    id="pages.searchgoodsCategory.subCategory"
                    defaultMessage="请选择小类！"
                />
              )
            }]}
          />
          <ProFormText
            name="name"
            label={intl.formatMessage({
              id: 'pages.searchgoodsCategory.name',
              defaultMessage: '名称',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchgoodsCategory.name"
                    defaultMessage="请输入名称！"
                  />
                ),
              },
            ]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          initialValues={{
            attributes: props.values.attributes,
            others: props.values.others,
            remark: props.values.remark,
          }}
          title={intl.formatMessage({
            id: 'pages.searchgoodsCategory.updateForm.basicConfig',
            defaultMessage: '基本信息',
          })}
        >
          <ProFormText
            name="attributes"
            label={intl.formatMessage({
              id: 'pages.searchgoodsCategory.attributes',
              defaultMessage: '分类属性',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchgoodsCategory.attributes"
                    defaultMessage="请输入分类属性！"
                  />
                ),
              },
            ]}
          />
          <ProFormText
            name="others"
            label={intl.formatMessage({
              id: 'pages.searchgoodsCategory.others',
              defaultMessage: '其他',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchgoodsCategory.others"
                    defaultMessage="请输入其他！"
                  />
                ),
              },
            ]}
          />
          <ProFormTextArea
            name="remark"
            width="md"
            label={intl.formatMessage({
              id: 'pages.searchgoodsCategory.remark',
              defaultMessage: '备注',
            })}
            // placeholder={intl.formatMessage({
            //   id: 'pages.searchsupplier.updateForm.remark',
            //   defaultMessage: '请输入备注！',
            // })}
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchgoodsCategory.remark"
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
  