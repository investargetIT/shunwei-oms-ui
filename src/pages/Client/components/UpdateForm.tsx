import {
    ProFormDateTimePicker,
    ProFormDatePicker,
    ProFormRadio,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    StepsForm,
  } from '@ant-design/pro-components';
  import { FormattedMessage, useIntl } from '@umijs/max';
  import { Modal } from 'antd';
  import React from 'react';
  
  export type FormValueType = {
    target?: string;
    template?: string;
    type?: string;
    time?: string;
    frequency?: string;
  } & Partial<API.RuleListItem>;
  
  export type UpdateFormProps = {
    onCancel: (flag?: boolean, formVals?: FormValueType) => void;
    onSubmit: (values: FormValueType) => Promise<void>;
    updateModalOpen: boolean;
    values: Partial<API.RuleListItem>;
  };
  
  const UpdateForm: React.FC<UpdateFormProps> = (props) => {
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
                id: 'pages.searchclient.updateForm.editInfo',
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
            code: props.values.code,
            name: props.values.name,
            address: props.values.address,
            contact: props.values.contact,
          }}
          title={intl.formatMessage({
            id: 'pages.searchclient.updateForm.basicConfig',
            defaultMessage: '基本信息',
          })}
        >
          <ProFormText
            name="code"
            // readonly
            disabled
            label={intl.formatMessage({
              id: 'pages.searchclient.code',
              defaultMessage: '编码',
            })}
            width="md"
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
        </StepsForm.StepForm>
        <StepsForm.StepForm
          initialValues={{
            telephone: props.values.telephone,
            status: props.values.status,
            brand: props.values.brand,
            attribute: props.values.attribute,
          }}
          title={intl.formatMessage({
            id: 'pages.searchclient.updateForm.basicConfig',
            defaultMessage: '基本信息',
          })}
        >
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
          <ProFormText
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
                    defaultMessage="请输入性质！"
                  />
                ),
              },
            ]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          initialValues={{
            remark: props.values.remark,
          }}
          title={intl.formatMessage({
            id: 'pages.searchclient.updateForm.basicConfig',
            defaultMessage: '基本信息',
          })}
        >
          <ProFormTextArea
            name="remark"
            width="md"
            label={intl.formatMessage({
              id: 'pages.searchclient.remark',
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
                    id="pages.searchclient.remark"
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
  