export interface RegisterProp {
    setRegister: (val: number) => void;
}

export interface MenuItem {
    icon: React.ReactNode;
    label: string;
    route: string;
}

export interface StateGlobalProviderProps {
    children: JSX.Element
}

export interface AssessmentDataType {
    assessment: string;
    type: string;
    nos: number;
    score: number | null;
    rc: string;
    status: string;
    result: boolean  | null;
}

export interface InputModalProps {
    open: boolean | undefined;
    closeModal: () => void;
}

export interface Assessments {
    assessments: AssessmentDataType[];
}

export interface LSHeader {
    toggleSider: () => void;
}

export interface SSHeader {
    toggleSider: () => void;
    toggleMenu: () => void;
    toggleDataMenu: () => void;
}