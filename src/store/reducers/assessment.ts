import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AssessmentDataType, Assessments } from '../../@d.types';

const initialState: Assessments = {
    assessments: []
};

const assessments = createSlice({
    name: 'assessments',
    initialState,
    reducers: {
        addAssessment: (state, action: PayloadAction<{ assessment: AssessmentDataType }>) => {
            state.assessments.push(action.payload.assessment);
        },

        setAssessments: (state, action: PayloadAction<{ assessments: AssessmentDataType[] }>) => {
            state.assessments = action.payload.assessments;
        }
    }
});

export const { addAssessment, setAssessments } = assessments.actions;
export default assessments.reducer;
