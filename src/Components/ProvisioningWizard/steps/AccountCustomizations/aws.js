import PropTypes from 'prop-types';
import React from 'react';
import { Form, FormGroup, Popover, Title, Text } from '@patternfly/react-core';
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';
import SourcesSelect from '../../../SourcesSelect';
import InstanceCounter from '../../../InstanceCounter';
import InstanceTypesSelect from '../../../InstanceTypesSelect';
import RegionsSelect from '../../../RegionsSelect';
import { useWizardContext } from '../../../Common/WizardContext';

const AccountCustomizationsAWS = ({ setStepValidated }) => {
  const [{ chosenSource, chosenInstanceType }] = useWizardContext();
  const [validations, setValidation] = React.useState({
    sources: chosenSource ? 'success' : 'default',
    types: chosenInstanceType ? 'success' : 'default',
  });

  React.useEffect(() => {
    // This effect checks if the entire step is validated
    const errorExists = Object.values(validations).some(
      (valid) => valid !== 'success'
    );
    setStepValidated(!errorExists);
  }, [validations]);

  return (
    <Form>
      <Title headingLevel="h1" size="xl">
        Account and customizations | AWS
      </Title>
      <Text>
        Configure instances that will run on your AWS. All the instances will
        launch with the same configuration.
      </Text>
      <FormGroup
        label="Select account"
        validated={validations.sources}
        helperTextInvalid="Please pick a value"
        isRequired
        fieldId="aws-select-source"
      >
        <SourcesSelect
          setValidation={(validation) =>
            setValidation((prevValidations) => ({
              ...prevValidations,
              sources: validation,
            }))
          }
        />
      </FormGroup>
      <FormGroup
        label="Select region"
        isRequired
        fieldId="aws-select-region"
        labelIcon={
          <Popover headerContent={<div>AWS regions</div>}>
            <button
              type="button"
              aria-label="More info for regions field"
              onClick={(e) => e.preventDefault()}
              aria-describedby="aws-select-region"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
          </Popover>
        }
      >
        <RegionsSelect />
      </FormGroup>
      <FormGroup
        label="Select instance type"
        isRequired
        helperTextInvalid="Please pick a value"
        fieldId="aws-select-instance-types"
        labelIcon={
          <Popover headerContent={<div>AWS instance types</div>}>
            <button
              type="button"
              aria-label="More info for instance types field"
              onClick={(e) => e.preventDefault()}
              aria-describedby="aws-select-instance-types"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
          </Popover>
        }
      >
        <InstanceTypesSelect
          setValidation={(validation) =>
            setValidation((prevValidations) => ({
              ...prevValidations,
              types: validation,
            }))
          }
        />
      </FormGroup>
      <FormGroup
        label="Count"
        isRequired
        fieldId="aws-select-instance-counter"
        labelIcon={
          <Popover headerContent={<div>Number of ec2 AWS instances</div>}>
            <button
              type="button"
              aria-label="More info for instance counter field"
              onClick={(e) => e.preventDefault()}
              aria-describedby="aws-select-instance-counter"
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
          </Popover>
        }
      >
        <InstanceCounter />
      </FormGroup>
    </Form>
  );
};

AccountCustomizationsAWS.propTypes = {
  setStepValidated: PropTypes.func.isRequired,
};
export default AccountCustomizationsAWS;
