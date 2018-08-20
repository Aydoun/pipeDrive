import React from 'react';
import { Form, Input, Button } from 'antd';
import { apiMapping } from '../../utils/config';

const FormItem = Form.Item;

class AddFormClass extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { submitData } = this.props;
        const newValues = {};

        Object.keys(values).forEach(key => {
          if(typeof values[key] !== 'undefined') {
            if(apiMapping.hasOwnProperty(key)) {
              newValues[apiMapping[key]] = values[key];
            } else {
              newValues[key] = values[key];
            }
          }    
        });
        submitData(newValues);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
            {...formItemLayout}
            label="Name"
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: 'Please input your Name',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
            }, {              
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Phone Number"
        >
          {getFieldDecorator('phone', {
            
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Location"
        >
          {getFieldDecorator('Location', {
            
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Assistant"
        >
          {getFieldDecorator('Assistant', {
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Group"
        >
          {getFieldDecorator('Groups', {
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Organization"
        >
          {getFieldDecorator('Organization', {
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={loading} icon="user-add">Add</Button>
        </FormItem>
      </Form>
    );
  }
}

const AddForm = Form.create()(AddFormClass);

export default AddForm;
