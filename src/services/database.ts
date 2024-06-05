import { get, ref, set } from "firebase/database";
import { AssessmentDataType } from "../@d.types";
import { Database } from "../config/firebase";

export const insertAssessments = async (values: AssessmentDataType[], uid: string) => {
    try {
        const assesmentRef = ref(Database, `assessments/${uid}`);
        await set(assesmentRef, values);
    } catch (error) {
        return error;
    }
}

export const getAssessments = async (uid: string) => {
    const assesmentRef = ref(Database, 'assessments/' + uid);
    try {
        const data = await get(assesmentRef);
        return data.val();
    } catch (error) {
        throw(error);
    }
}