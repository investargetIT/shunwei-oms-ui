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
                id: 'pages.searchsupplier.updateForm.editInfo',
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
            bank_account: props.values.bank_account,
            case: props.values.case,
          }}
          title={intl.formatMessage({
            id: 'pages.searchsupplier.updateForm.basicConfig',
            defaultMessage: '基本信息',
          })}
        >
          <ProFormText
            name="code"
            // readonly
            disabled
            label={intl.formatMessage({
              id: 'pages.searchsupplier.updateForm.code',
              defaultMessage: '编码',
            })}
            width="md"
          />
          <ProFormText
            name="name"
            label={intl.formatMessage({
              id: 'pages.searchsupplier.updateForm.name',
              defaultMessage: '名称',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchsupplier.updateForm.name"
                    defaultMessage="请输入名称！"
                  />
                ),
              },
            ]}
          />
          <ProFormText
            name="bank_account"
            label={intl.formatMessage({
              id: 'pages.searchsupplier.updateForm.bank_account',
              defaultMessage: '银行账户',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchsupplier.updateForm.bank_account"
                    defaultMessage="请输入银行账户！"
                  />
                ),
              },
            ]}
          />
          <ProFormText
            name="case"
            label={intl.formatMessage({
              id: 'pages.searchsupplier.updateForm.case',
              defaultMessage: '合作案例',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchsupplier.updateForm.case"
                    defaultMessage="请输入合作案例！"
                  />
                ),
              },
            ]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          initialValues={{
            attribute: props.values.attribute,
            mode: props.values.mode,
            hotel: props.values.hotel,
            status: props.values.status,
          }}
          title={intl.formatMessage({
            id: 'pages.searchsupplier.updateForm.basicConfig',
            defaultMessage: '基本信息',
          })}
        >
          
          <ProFormText
            name="attribute"
            label={intl.formatMessage({
              id: 'pages.searchsupplier.updateForm.attribute',
              defaultMessage: '属性',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchsupplier.updateForm.attribute"
                    defaultMessage="请输入属性！"
                  />
                ),
              },
            ]}
          />
          <ProFormText
            name="mode"
            label={intl.formatMessage({
              id: 'pages.searchsupplier.updateForm.mode',
              defaultMessage: '合作模式',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchsupplier.updateForm.mode"
                    defaultMessage="请输入合作模式！"
                  />
                ),
              },
            ]}
          />
          <ProFormText
            name="hotel"
            label={intl.formatMessage({
              id: 'pages.searchsupplier.updateForm.hotel',
              defaultMessage: '销售范围（酒店）',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchsupplier.updateForm.hotel"
                    defaultMessage="请输入销售范围（酒店）！"
                  />
                ),
              },
            ]}
          />
          <ProFormSelect
            name="status"
            label={intl.formatMessage({
              id: 'pages.searchsupplier.updateForm.status',
              defaultMessage: '合作状态',
            })}
            width="md"
            valueEnum={{
              0: '确认合作',
              1: '暂停合作',
              2: '终止合作',
            }}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          initialValues={{
            contact: props.values.contact,
            position: props.values.position,
            telephone: props.values.telephone,
            pic: props.values.pic,
            contract_status: props.values.contract_status,
          }}
          title={intl.formatMessage({
            id: 'pages.searchsupplier.updateForm.basicConfig',
            defaultMessage: '基本信息',
          })}
        >
          <ProFormText
            name="contact"
            label={intl.formatMessage({
              id: 'pages.searchsupplier.updateForm.contact',
              defaultMessage: '联系人',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchsupplier.updateForm.contact"
                    defaultMessage="请输入联系人！"
                  />
                ),
              },
            ]}
          />
          <ProFormText
            name="position"
            label={intl.formatMessage({
              id: 'pages.searchsupplier.updateForm.position',
              defaultMessage: '职位',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchsupplier.updateForm.position"
                    defaultMessage="请输入职位！"
                  />
                ),
              },
            ]}
          />
          <ProFormText
            name="telephone"
            label={intl.formatMessage({
              id: 'pages.searchsupplier.updateForm.telephone',
              defaultMessage: '电话',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchsupplier.updateForm.telephone"
                    defaultMessage="请输入电话！"
                  />
                ),
              },
            ]}
          />
          <ProFormText
            name="pic"
            label={intl.formatMessage({
              id: 'pages.searchsupplier.updateForm.pic',
              defaultMessage: '对接人',
            })}
            width="md"
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchsupplier.updateForm.pic"
                    defaultMessage="请输入对接人！"
                  />
                ),
              },
            ]}
          />
          <ProFormSelect
            name="contract_status"
            label={intl.formatMessage({
              id: 'pages.searchsupplier.updateForm.contract_status',
              defaultMessage: '合同状态',
            })}
            width="md"
            valueEnum={{
              0: '确认',
              1: '暂停',
              2: '终止',
            }}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          initialValues={{
            deal_date: props.values.deal_date,
            start_date: props.values.start_date,
            end_date: props.values.end_date,
            remark: props.values.remark,
          }}
          title={intl.formatMessage({
            id: 'pages.searchsupplier.updateForm.basicConfig',
            defaultMessage: '基本信息',
          })}
        >
          <ProFormDatePicker
            name="deal_date"
            width="md"
            label={intl.formatMessage({
              id: 'pages.searchsupplier.updateForm.deal_date',
              defaultMessage: '签订日期',
            })}
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchsupplier.updateForm.deal_date"
                    defaultMessage="请选择签订日期！"
                  />
                ),
              },
            ]}
          />
          <ProFormDatePicker
            name="start_date"
            width="md"
            label={intl.formatMessage({
              id: 'pages.searchsupplier.updateForm.start_date',
              defaultMessage: '生效日期',
            })}
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchsupplier.updateForm.start_date"
                    defaultMessage="请选择生效日期！"
                  />
                ),
              },
            ]}
          />
          <ProFormDatePicker
            name="end_date"
            width="md"
            label={intl.formatMessage({
              id: 'pages.searchsupplier.updateForm.end_date',
              defaultMessage: '终止日期',
            })}
            rules={[
              {
                // required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchsupplier.updateForm.end_date"
                    defaultMessage="请选择终止日期！"
                  />
                ),
              },
            ]}
          />
          <ProFormTextArea
            name="remark"
            width="md"
            label={intl.formatMessage({
              id: 'pages.searchsupplier.updateForm.remark',
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
                    id="pages.searchsupplier.updateForm.remark"
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
  