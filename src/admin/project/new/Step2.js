import React from 'react'
import NewProjectLayout from './NewProjectLayout'
import { object, string } from 'yup'
import { Typography } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import OFButton from '../../baseComponents/OFButton'
import RadioButtonGroup from '../../baseComponents/form/RadioButtonGroup'
import OFRadioButtonFormiked from '../../baseComponents/form/OFRadioButtonFormiked'
import {
    PROJECT_TYPE_HOVERBOARDV2,
    PROJECT_TYPE_JSONURL,
    PROJECT_TYPE_OPENFEEDBACK,
} from '../../../core/setupType/projectApi'
import Box from '@material-ui/core/Box'

const schema = object().shape({
    projectType: string().required(
        'You need to choose how you want to setup the project.'
    ),
})

const Step2 = ({ onCancel, onBack, onSubmit, initialValues }) => {
    return (
        <NewProjectLayout
            stepTitle="Create a new event (step 2/3)"
            title="How do you want to load your data?"
            onCancel={onCancel}>
            <Formik
                validationSchema={schema}
                initialValues={initialValues}
                onSubmit={values => onSubmit(values.projectType)}>
                {({ isSubmitting, values }) => (
                    <Form method="POST">
                        <RadioButtonGroup fieldName="projectType">
                            <Field
                                component={OFRadioButtonFormiked}
                                name="projectType"
                                id={PROJECT_TYPE_OPENFEEDBACK}
                                label={
                                    <div>
                                        <Typography variant="h6">
                                            OpenFeedback Database
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            You can manually enter the
                                            talks/speakers/schedule on
                                            OpenFeedback. It will not be in sync
                                            with another service if you are
                                            using one. No additional
                                            configuration is required.
                                        </Typography>
                                    </div>
                                }
                            />
                            <Field
                                component={OFRadioButtonFormiked}
                                name="projectType"
                                id={PROJECT_TYPE_HOVERBOARDV2}
                                label={
                                    <div>
                                        <Typography variant="h6">
                                            Hoverboard v2 Firestore
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            The talks/speakers/schedule will be
                                            retrieved directly on page load from
                                            your own Firestore database that
                                            follow Hoverboard v2 model.
                                        </Typography>
                                    </div>
                                }
                            />

                            <Field
                                component={OFRadioButtonFormiked}
                                name="projectType"
                                id={PROJECT_TYPE_JSONURL}
                                label={
                                    <div>
                                        <Typography variant="h6">
                                            Link to JSON file
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            By providing a url to a .json that
                                            you’ll either host (on
                                            gist.github.com or another static
                                            server) or a dynamic answer from
                                            your own database/api. The json
                                            model will need to match
                                            OpenFeedback one, you’ll be able to
                                            check it on the next screen.
                                        </Typography>
                                    </div>
                                }
                            />
                        </RadioButtonGroup>

                        <Box justifyContent="space-between" display="flex">
                            <OFButton
                                disabled={isSubmitting}
                                onClick={() => onBack()}
                                style={{
                                    type: 'big',
                                    design: 'text',
                                    marginTop: 64,
                                }}>
                                Back
                            </OFButton>

                            <OFButton
                                disabled={isSubmitting}
                                type="submit"
                                style={{ type: 'big', marginTop: 64 }}>
                                {values.projectType ===
                                PROJECT_TYPE_OPENFEEDBACK
                                    ? 'Create event'
                                    : 'Continue'}
                            </OFButton>
                        </Box>
                    </Form>
                )}
            </Formik>
        </NewProjectLayout>
    )
}

export default Step2
