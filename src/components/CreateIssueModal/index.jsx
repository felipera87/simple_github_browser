import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Container, Main, Header, FormContainer } from './styles';

import Input from '../Input';
import Textarea from '../Textarea';
import Button from '../Button';

import getValidationErrors from '../../utils/getValidationErrors';

const CreateIssueModal = ({
  setIsModalOpen,
  doAfterSubmit,
  isLoading,
  ...rest
}) => {
  const formRef = useRef(null);

  const handleCreateIssueSubmit = useCallback(
    async data => {
      try {
        if (formRef.current) {
          formRef.current.setErrors({});
        }

        const schema = Yup.object().shape({
          title: Yup.string().required('Title is required.'),
          description: Yup.string().required('Description is required.'),
        });

        await schema.validate(data, { abortEarly: false });

        doAfterSubmit(data);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          if (formRef.current) {
            formRef.current.setErrors(errors);
          }
        }
      }
    },
    [doAfterSubmit],
  );

  return (
    <Container {...rest}>
      <Main>
        <Header>
          <h2>New Issue</h2>
        </Header>
        <FormContainer>
          <Form ref={formRef} onSubmit={handleCreateIssueSubmit}>
            <Input type="text" name="title" placeholder="Title" />
            <Textarea
              type="text"
              name="description"
              placeholder="Description"
              rows="5"
            />
            <div id="create-issue-button-container">
              <Button type="submit" isLoading={isLoading}>
                Create
              </Button>
              <Button type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </Form>
        </FormContainer>
      </Main>
    </Container>
  );
};

export default CreateIssueModal;
